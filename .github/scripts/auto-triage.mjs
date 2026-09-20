import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
	REVIEW_BOT_MARKER,
	addLabels,
	ensureReviewLabels,
	getIssueLabels,
	getRepository,
	githubPaginated,
	githubRequest,
	hasLabel,
	readGitHubEvent,
	removeLabel,
	setStateLabel,
	upsertBotComment,
} from "./review-utils.mjs";
import { buildSubmissionManifest } from "./submission-manifest.mjs";
import { autoReviewLabelChanges } from "./review-state.mjs";

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required");

const { owner, repo } = getRepository();
let event = readGitHubEvent();
let pullRequest = event.pull_request || event.issue;

let reviewers = new Set();
try {
	const reviewRoles = JSON.parse(readFileSync(path.resolve(process.cwd(), ".github/review-roles.json"), "utf8"));
	reviewers = new Set([...(reviewRoles.maintainers ?? []), ...(reviewRoles.triagers ?? [])]);
} catch {
	console.warn("review-roles.json not found or invalid; review state changes will be skipped.");
}

const dispatchedPrNumber = process.env.REVIEW_PR_NUMBER;
if (!pullRequest && dispatchedPrNumber) {
	pullRequest = await githubRequest(token, "GET", `/repos/${owner}/${repo}/pulls/${encodeURIComponent(dispatchedPrNumber)}`);
	event = { ...event, action: process.env.REVIEW_EVENT_ACTION ?? "workflow_dispatch", pull_request: pullRequest };
}

if (!pullRequest || (!event.pull_request && !event.issue?.pull_request)) {
	console.log("No pull request in event; skipping auto triage.");
	process.exit(0);
}

const prNumber = pullRequest.number;

if (pullRequest.draft) {
	console.log("PR is a draft. Skipping triage.");
	process.exit(0);
}

if (event.action === "closed") {
	console.log("PR closed. Dispatching re-validation for other open submissions from the same user.");
	const submitterLogin = pullRequest.user?.login;
	if (submitterLogin) {
		const openPulls = await githubPaginated(token, `/repos/${owner}/${repo}/pulls?state=open`);
		const siblingPRs = openPulls.filter((pr) => pr.user?.login === submitterLogin && pr.labels?.some((l) => l.name === "Submission"));
		for (const sibling of siblingPRs) {
			console.log(`Triggering auto-triage for sibling PR #${sibling.number}`);
			try {
				await githubRequest(token, "POST", `/repos/${owner}/${repo}/actions/workflows/auto-triage.yml/dispatches`, {
					ref: "main",
					inputs: {
						pr_number: String(sibling.number),
						event_action: "synchronize"
					}
				});
			} catch (err) {
				console.error(`Failed to dispatch for PR #${sibling.number}:`, err);
			}
		}
	}
	process.exit(0);
}

if (event.action === "assigned") {
	await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Claimed"] });
	console.log(`PR assigned, added "Claimed" label.`);
	process.exit(0);
}

if (event.action === "unassigned") {
	const issueData = await githubRequest(token, "GET", `/repos/${owner}/${repo}/issues/${prNumber}`);
	if ((issueData.assignees ?? []).length === 0) {
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Claimed" });
		console.log(`PR has no assignees left, removed "Claimed" label.`);
	}
	process.exit(0);
}

if (event.review && event.action === "submitted") {
	const reviewState = event.review.state.toLowerCase();
	const reviewerLogin = event.review.user?.login;
	const authorLogin = pullRequest.user?.login;

	if (reviewerLogin && authorLogin && reviewerLogin === authorLogin) {
		console.log(`Review submitted by PR author (${reviewerLogin}). Ignoring state change to prevent self-approval.`);
		process.exit(0);
	}

	if (!reviewerLogin || !reviewers.has(reviewerLogin)) {
		console.log(`Review submitted by ${reviewerLogin ?? "unknown reviewer"}. Ignoring state change because reviewer is not listed.`);
		process.exit(0);
	}
	
	if (reviewState === "changes_requested") {
		await setStateLabel({ owner, repo, token, issueNumber: prNumber, state: "Needs Author" });
		console.log(`Review requested changes, set "Needs Author".`);
	} else if (reviewState === "approved") {
		await setStateLabel({ owner, repo, token, issueNumber: prNumber, state: "Ready for Maintainer" });
		console.log(`Review approved, set "Ready for Maintainer".`);
	} else {
		console.log(`Review state is ${reviewState}, ignoring.`);
	}
	process.exit(0);
}
const workspace = path.resolve(process.env.SUBMISSION_PATH ?? process.cwd());
const reviewBaseUrl = process.env.SPRIG_REVIEW_BASE_URL ?? "https://sprig.hackclub.com/editor";

await ensureReviewLabels({ owner, repo, token });

const pullFiles = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${prNumber}/files`);
const modifiesGames = pullFiles.some((f) => f.filename.startsWith("games/"));
const labels = await getIssueLabels({ owner, repo, token, issueNumber: prNumber });

if (!modifiesGames && !hasLabel(labels, "Submission")) {
	console.log("Not a submission PR (no games/ files modified and no Submission label); skipping.");
	process.exit(0);
}

await materializeSubmittedGameFiles(pullRequest, pullFiles, workspace);
const result = await validateSubmission({
	pullRequest,
	pullFiles,
	workspace,
	reviewBaseUrl,
	owner,
	repo,
});

await applyLabels(result);
await upsertBotComment({
	owner,
	repo,
	token,
	issueNumber: prNumber,
	marker: REVIEW_BOT_MARKER,
	body: buildComment(result),
});

console.log("Validation Result:", JSON.stringify(result, null, 2));
console.log("\nBot Comment Body:\n", buildComment(result));

if (!result.ok) process.exit(1);

async function materializeSubmittedGameFiles(pullRequest, pullFiles, workspace) {
	const headRepo = pullRequest.head.repo?.full_name ?? `${owner}/${repo}`;
	const headSha = pullRequest.head.sha;
	const gameFiles = pullFiles.filter((file) => /^games\/[^/]+\.js$/.test(file.filename));

	for (const file of gameFiles) {
		const contentFile = await githubRequest(
			token,
			"GET",
			`/repos/${headRepo}/contents/${file.filename.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(headSha)}`
		);
		if (typeof contentFile?.content !== "string" || contentFile.encoding !== "base64") {
			throw new Error(`Unable to read submitted file ${file.filename} from GitHub contents API.`);
		}

		writeFileSync(path.join(workspace, file.filename), Buffer.from(contentFile.content, "base64"));
	}
}

async function validateSubmission({ pullRequest, pullFiles, workspace, reviewBaseUrl, owner, repo }) {
	const checks = [];
	const problems = [];
	const warnings = [];

	const addCheck = (name, ok, detail) => {
		checks.push({ name, ok, detail });
		if (!ok && detail) problems.push(detail);
	};

	const { jsFiles, imageFiles } = validateSubmissionFiles(pullFiles, addCheck);

	const bodyChecks = validatePullRequestBody(pullRequest.body ?? "");
	for (const check of bodyChecks.checks) addCheck(check.name, check.ok, check.detail);

	// Check for duplicate open PRs from the same user, regardless of filename validity
	const submitterLogin = pullRequest.user?.login;
	if (submitterLogin) {
		const openPulls = await githubPaginated(token, `/repos/${owner}/${repo}/pulls?state=open`);
		const duplicatePR = openPulls.find(
			(pr) => pr.number !== prNumber && pr.user?.login === submitterLogin && pr.labels?.some((l) => l.name === "Submission")
		);
		addCheck(
			"No duplicate open submission",
			!duplicatePR,
			duplicatePR
				? `You already have an open submission (PR #${duplicatePR.number}). Please close one of them.`
				: "No other open submissions from this user."
		);
	}

	let gameFile = null;
	let metadata = null;
	let rawUrl = null;
	let playUrl = null;
	let screenshotUrl = null;
	let similarity = { score: 0, match: null };

	if (jsFiles.length === 1) {
		gameFile = jsFiles[0];
		const result = await validateSingleGameFile(gameFile, workspace, addCheck, warnings);
		metadata = result.metadata;
		similarity = result.similarity;

		rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${pullRequest.head.sha}/${gameFile.filename}`;
		
		const buildReviewUrl = (base) => {
			const u = new URL(base);
			u.searchParams.set("review", "true");
			u.searchParams.set("raw", rawUrl);
			u.searchParams.set("pr", String(prNumber));
			u.searchParams.set("repo", `${owner}/${repo}`);
			return u.toString();
		};

		playUrl = buildReviewUrl(reviewBaseUrl);
	}

	if (gameFile) {
		const gameBase = path.basename(gameFile.filename, ".js");
		screenshotUrl = validateImages(imageFiles, gameBase, owner, repo, pullRequest, addCheck);
	}

	const ok = checks.every((check) => check.ok);
	return {
		ok,
		checks,
		problems,
		warnings,
		metadata: metadata?.values ?? null,
		gameFile: gameFile?.filename ?? null,
		rawUrl,
		playUrl,
		screenshotUrl,
		similarity,
	};
}

function validatePullRequestBody(body) {
	const checks = [];
	const add = (name, ok, detail) => checks.push({ name, ok, detail });

	const author = extractBoldField(body, "Author");
	const about = extractBoldField(body, "What is your game about?");
	const gameplay = extractBoldField(body, "How do you play your game?");

	add("PR author name", Boolean(author), author ? "Author field is filled." : "Fill in the `Author:` field in the PR description.");
	add("PR about blurb", Boolean(about), about ? "About blurb is filled." : "Fill in `What is your game about?` in the PR description.");
	add("PR gameplay description", Boolean(gameplay), gameplay ? "Gameplay description is filled." : "Fill in `How do you play your game?` in the PR description.");

	return { checks };
}

function extractBoldField(body, label) {
	const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

	// Try **Label:** value (original bold format)
	const boldPattern = new RegExp(String.raw`\*\*${escaped}:?\*\*\s*([\s\S]*?)(?=\n\s*(?:\*\*|#{1,6})|$)`, "i");
	const boldMatch = body.match(boldPattern);
	if (boldMatch) {
		const value = normalizeFieldValue(stripTemplateNoise(boldMatch[1]));
		if (value) return value;
	}

	// Try **Label: value** (entire field/line bolded)
	const fullBoldPattern = new RegExp(String.raw`(?:\*\*|\*)${escaped}\s*:\s*(.+?)(?:\*\*|\*)(?:\r?\n|$)`, "i");
	const fullBoldMatch = body.match(fullBoldPattern);
	if (fullBoldMatch) {
		const value = normalizeFieldValue(stripTemplateNoise(fullBoldMatch[1]));
		if (value) return value;
	}

	// Fallback: plain "Label: value" on its own line
	// Handles unbolded fields, bulleted lists, heading-style descriptions, etc.
	const plainPattern = new RegExp(String.raw`(?:^|\n)\s*(?:[-*]|\d+\.)*\s*(?:\*\*|\*)?${escaped}\s*:\s*([^\n]+)`, "i");
	const plainMatch = body.match(plainPattern);
	if (plainMatch) {
		const value = normalizeFieldValue(stripTemplateNoise(plainMatch[1]));
		if (value) return value;
	}

	return "";
}

function normalizeFieldValue(value) {
	// Unwrap markdown links: [@foo](url) or [foo](url) -> foo, and strip surrounding formatting
	return value
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/^[*`_~]+|[*`_~]+$/g, "")
		.trim();
}

function stripTemplateNoise(value) {
	return value
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/^>\s?.*$/gm, "")
		.trim();
}

async function validateMetadata(content, filename, workspace) {
	const checks = [];
	const values = {
		title: getMetadataValue(content, "title"),
		author: getMetadataValue(content, "author"),
		description: getMetadataValue(content, "description"),
		tags: getMetadataValue(content, "tags"),
		addedOn: getMetadataValue(content, "addedOn"),
	};

	const add = (name, ok, detail) => checks.push({ name, ok, detail });

	for (const [key, value] of Object.entries(values)) {
		add(
			`Metadata @${key}`,
			Boolean(value),
			value ? `@${key} is filled.` : `Metadata in \`${filename}\` is missing or has empty \`@${key}:\`.`
		);
	}

	const parsedTags = parseTags(values.tags);
	add(
		"Metadata tags parse",
		parsedTags.tags !== undefined && parsedTags.tags.length > 0,
		parsedTags.tags !== undefined && parsedTags.tags.length > 0
			? "Tags are a non-empty array."
			: `Set \`@tags:\` to a non-empty array, for example \`@tags: ['maze']\`.\nReason: ${parsedTags.issue}`
	);

	checkMetadataDate(values.addedOn, add);
	const dateMatch = values.addedOn.match(/\b\d{4}-\d{2}-\d{2}\b/);
	if (dateMatch) values.addedOn = dateMatch[0];

	const titleLooksLikeTemplate = /^getting(_|\s)started$/i.test(values.title?.trim()) || /^template$/i.test(values.title?.trim()) || /^my game$/i.test(values.title?.trim());
	const authorLooksLikeTemplate = /leo,\s*edits/i.test(values.author) || /^my name$/i.test(values.author?.trim());
	const descriptionLooksLikeTemplate = /short description about the game/i.test(values.description?.trim());
	const hasExampleTags = parsedTags.tags?.some(t => ["tag1", "tag2", "example", "another-example"].includes(t.toLowerCase()));

	const hasTemplateValues = titleLooksLikeTemplate || authorLooksLikeTemplate || descriptionLooksLikeTemplate || hasExampleTags;

	add(
		"Metadata template values",
		!hasTemplateValues,
		!hasTemplateValues
			? "No template metadata values found."
			: "Replace example/template values in the metadata header (like 'MY GAME', 'MY NAME', 'Short description...', or placeholder tags)."
	);

	// Detect tutorial/starter games by comparing code body to known tutorial files
	const TUTORIAL_FILES = ["getting_started.js", "maze_game_starter.js"];
	const isTutorial = TUTORIAL_FILES.some((tutFile) => {
		try {
			const tutContent = readFileSync(path.join(workspace, "games", tutFile), "utf8");
			const stripMeta = (s) => s.replace(/\/\*[\s\S]*?\*\//m, "").replace(/\s+/g, " ").trim();
			return stripMeta(content) === stripMeta(tutContent);
		} catch { return false; }
	});
	add(
		"Not a tutorial game",
		!isTutorial,
		isTutorial
			? "This looks like an unmodified tutorial or starter game. Submit your own original game instead."
			: "Game does not appear to be an unmodified tutorial."
	);

	const titleConflict = values.title ? await findTitleConflict(values.title, filename, workspace) : null;
	add(
		"Unique game title",
		!titleConflict,
		titleConflict
			? `Game title \`${values.title}\` already appears in \`${titleConflict}\`; choose a unique title.`
			: "Game title appears unique."
	);

	return { checks, values: { ...values, tags: parsedTags.tags ?? values.tags } };
}

function getMetadataValue(content, key) {
	if (key === "addedOn" || key === "title" || key === "author") {
		const match = content.match(new RegExp(String.raw`@${key}:\s*([^\n]*)`));
		return match?.[1]?.trim() ?? "";
	}
	const match = content.match(new RegExp(String.raw`@${key}:\s*([\s\S]*?)(?=\n\s*@|\n\s*\*\/)`));
	return match?.[1]?.trim() ?? "";
}

function parseTags(raw) {
	if (!raw?.trim()) return { issue: "is empty (expected a JSON-ish array like ['maze','puzzle'])." };

	try {
		const match = raw.match(/\[[\s\S]*?\]/);
		const toParse = match ? match[0] : raw;
		const parsed = JSON.parse(toParse.replaceAll("'", '"'));
		if (!Array.isArray(parsed)) return { issue: "must be an array (example: ['maze','puzzle'])." };
		if (parsed.some((tag) => typeof tag !== "string")) {
			return { issue: "must be an array of strings (example: ['maze','puzzle'])." };
		}

		return { tags: parsed };
	} catch (error) {
		if (error instanceof SyntaxError) {
			return { issue: "is not valid JSON (example: ['maze','puzzle'])." };
		}

		return { issue: "could not be parsed." };
	}
}

async function findTitleConflict(title, filename, workspace) {
	const gamesDir = path.join(workspace, "games");
	const normalizedTitle = normalize(title);
	for (const gameFile of readdirSync(gamesDir).filter((file) => file.endsWith(".js"))) {
		if (gameFile === filename) continue;
		const content = readFileSafe(path.join(gamesDir, gameFile));
		if (!content) continue;
		const existingTitle = getMetadataValue(content, "title");
		if (normalize(existingTitle) === normalizedTitle) return `games/${gameFile}`;
	}

	const openPulls = await githubPaginated(token, `/repos/${owner}/${repo}/pulls?state=open`);
	const submissionPRs = openPulls.filter((pr) => pr.labels?.some((l) => l.name === "Submission"));
	for (const pr of submissionPRs) {
		if (pr.number === prNumber) continue;
		const prFiles = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${pr.number}/files`);
		for (const file of prFiles) {
			if (file.filename.startsWith("games/") && file.filename.endsWith(".js")) {
				const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${pr.head.sha}/${file.filename}`);
				if (res.ok) {
					const content = await res.text();
					const existingTitle = getMetadataValue(content, "title");
					if (normalize(existingTitle) === normalizedTitle) return `PR #${pr.number} (${file.filename})`;
				}
			}
		}
	}
	return null;
}

function normalize(value) {
	return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function findMostSimilarGame(content, submittedFilename, workspace) {
	const gamesDir = path.join(workspace, "games");
	const gameFiles = readdirSync(gamesDir).filter((file) => file.endsWith(".js"));
	let best = { score: 0, match: null };
	for (const gameFile of gameFiles) {
		const relativePath = `games/${gameFile}`;
		if (relativePath === submittedFilename) continue;
		const other = readFileSafe(path.join(gamesDir, gameFile));
		if (!other) continue;
		const score = checkSimilarity(content, other);
		if (score > best.score) best = { score, match: relativePath };
	}
	return best;
}

function analyze(code) {
	return code
		.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
		.replace(/bitmap`[\s\S]*?`/g, "")
		.replace(/map`[\s\S]*?`/g, "")
		.replace(/tune`[\s\S]*?`/g, "")
		.replace(/\b(let|const|var)\s+\w+/g, "$1 VAR")
		.replace(/\s+/g, "")
		.toLowerCase();
}

function stripComments(code) {
	return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
}

function checkSimilarity(a, b) {
	const s1 = analyze(a);
	const s2 = analyze(b);
	const chunks = (value) => {
		const set = new Set();
		for (let i = 0; i <= value.length - 10; i += 1) set.add(value.slice(i, i + 10));
		return set;
	};
	const c1 = chunks(s1);
	const c2 = chunks(s2);
	if (!c1.size || !c2.size) return 0;
	let overlap = 0;
	for (const chunk of c1) {
		if (c2.has(chunk)) overlap += 1;
	}
	return (2 * overlap) / (c1.size + c2.size);
}

function readFileSafe(filePath) {
	try {
		return readFileSync(filePath, "utf8");
	} catch {
		return null;
	}
}

async function applyLabels(result) {
	await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Submission"] });
	const currentLabels = await getIssueLabels({ owner, repo, token, issueNumber: prNumber });
	const changes = autoReviewLabelChanges({ labels: currentLabels, validationOk: result.ok, eventAction: event.action });

	if (result.ok) {
		await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Verified"] });
		await setStateLabel({ owner, repo, token, issueNumber: prNumber, state: changes.state });
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Failed" });
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Needs Author" });
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Ready for Maintainer" });
	} else {
		await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Failed"] });
		await setStateLabel({ owner, repo, token, issueNumber: prNumber, state: "Needs Author" });
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Verified" });
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Ready for Playtest" });
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Ready for Maintainer" });
	}

	if (result.similarity.score >= 0.5) {
		await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Plagiarism Risk"] });
	} else {
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Plagiarism Risk" });
	}
}

function buildComment(result) {
	const status = result.ok ? "✅ Auto Review: Verified" : "❌ Auto Review: Needs Fixes";
	const metadata = result.metadata ?? {};

	const categories = {
		file: { name: "📂 Files & Directories", checks: [] },
		pr: { name: "📝 PR Description & Checklists", checks: [] },
		metadata: { name: "🏷️ Game Metadata Header", checks: [] },
		code: { name: "💻 Code & Assets", checks: [] },
		other: { name: "🔍 Other Checks", checks: [] },
	};

	const categoryMap = {
		"Valid filenames and folders": "file",
		"Exactly one game file": "file",
		"Only new files added": "file",
		"Filename uses safe characters": "file",
		"Game file is directly inside games/": "file",

		"PR author name": "pr",
		"PR about blurb": "pr",
		"PR gameplay description": "pr",
		"Code checklist": "pr",
		"Image checklist": "pr",

		"Metadata @title": "metadata",
		"Metadata @author": "metadata",
		"Metadata @description": "metadata",
		"Metadata @tags": "metadata",
		"Metadata @addedOn": "metadata",
		"Metadata tags parse": "metadata",
		"Metadata date": "metadata",
		"Metadata template values": "metadata",
		"Not a tutorial game": "metadata",
		"Unique game title": "metadata",

		"No duplicate open submission": "other",
		"Sprig-only APIs": "code",
		"Optional image path": "code",
		"Optional image name": "code",
	};

	for (const check of result.checks) {
		const catKey = categoryMap[check.name] ?? "other";
		categories[catKey].checks.push(check);
	}

	const failedChecks = result.checks.filter((c) => !c.ok);

	let checksSection = "";
	if (failedChecks.length > 0) {
		checksSection += `> [!WARNING]\n> **Failed Checks (${failedChecks.length}):**\n`;
		for (const check of failedChecks) {
			checksSection += `> - ❌ **${check.name}:** ${check.detail}\n`;
		}
		checksSection += "\n";
	}

	checksSection += "#### Checks Status\n";
	for (const [key, cat] of Object.entries(categories)) {
		if (cat.checks.length === 0) continue;
		const total = cat.checks.length;
		const passed = cat.checks.filter((c) => c.ok).length;
		const allPassed = passed === total;
		const lines = cat.checks.map((c) => {
			const icon = c.ok ? "✅" : "❌";
			return `- ${icon} **${c.name}:** ${c.detail}`;
		}).join("\n");

		if (allPassed) {
			checksSection += `<details>\n<summary><b>${cat.name} (${passed}/${total} passed)</b></summary>\n\n${lines}\n</details>\n`;
		} else {
			checksSection += `<details open>\n<summary><b>${cat.name} (${passed}/${total} passed) - Needs Attention ⚠️</b></summary>\n\n${lines}\n</details>\n`;
		}
	}

	const headRepo = pullRequest.head.repo?.full_name ?? `${owner}/${repo}`;
	const headRef = pullRequest.head.ref;
	const editUrl = `https://github.com/${headRepo}/edit/${headRef}/${result.gameFile ?? ""}`;

	const links = [];
	if (result.playUrl) links.push(`- ${externalLink("Play in Sprig Editor", result.playUrl)}`);
	if (result.gameFile) links.push(`- ${externalLink("Edit Game File", editUrl)}`);
	if (result.similarity?.match) {
		const similarName = result.similarity.match.replace(/^games\//, "").replace(/\.js$/, "");
		links.push(`- ${externalLink("Play Similar Game (Gallery)", `https://sprig.hackclub.com/gallery/${similarName}`)}`);
	}
	if (result.rawUrl) links.push(`- ${externalLink("View Raw", result.rawUrl)}`);
	if (result.screenshotUrl) links.push(`- ${externalLink("View Screenshot", result.screenshotUrl)}`);
	links.push(`- ${externalLink("PR Files", `${pullRequest.html_url}/files`)}`);

	const warningLines = result.warnings.length
		? ["", "#### Review Flags", ...result.warnings.map((warning) => `- ⚠️ ${warning}`)]
		: [];

	return `${REVIEW_BOT_MARKER}
### ${status}

${result.ok ? "This submission is ready for human playtest." : "This submission needs author fixes before normal review."}

#### Submission
- Game: ${metadata.title ? `\`${metadata.title}\`` : "unknown"}
- Author: ${metadata.author ? `\`${metadata.author}\`` : "unknown"}
- File: ${result.gameFile ? `\`${result.gameFile}\`` : "not found"}
- Similarity: ${formatPercent(result.similarity.score)}${result.similarity.match ? ` against \`${result.similarity.match}\`` : ""}

#### Links
${links.join("\n")}

${checksSection}${warningLines.join("\n")}

${result.ok ? `Reviewers: please use the ${result.playUrl ? externalLink("play link", result.playUrl) : "play link"} to playtest, then approve or request changes.` : `@${pullRequest.user.login}: push fixes to this PR (${externalLink("edit file", editUrl)}). These checks rerun automatically.`}
`;
}

function externalLink(label, url) {
	return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a><!-- [${label}](${url}) -->`;
}

function formatPercent(value) {
	return `${Math.round(value * 100)}%`;
}

function checkMetadataDate(addedOn, add) {
	const dateMatch = addedOn.match(/\b\d{4}-\d{2}-\d{2}\b/);
	const dateStr = dateMatch ? dateMatch[0] : addedOn.trim();
	const validDate = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
	const parsedDate = validDate ? new Date(`${dateStr}T00:00:00Z`) : null;
	const now = new Date();
	const tooOld = parsedDate ? Math.abs(now.getTime() - parsedDate.getTime()) > 183 * 86_400_000 : true;
	add(
		"Metadata date",
		validDate && parsedDate && !Number.isNaN(parsedDate.getTime()) && !tooOld,
		validDate && parsedDate && !Number.isNaN(parsedDate.getTime()) && !tooOld
			? "Date looks current."
			: `Set \`@addedOn:\` to a recent date in \`YYYY-MM-DD\` format.`
	);
}

function validateSubmissionFiles(pullFiles, addCheck) {
	const manifest = buildSubmissionManifest(pullFiles);
	const { gameFiles: jsFiles, gameFilesLoose, imageFiles, disallowedFiles, uppercaseGames, changedNonAddedFiles } = manifest;
	// jsFiles = strict valid filenames; gameFilesLoose = in games/*.js (may have bad chars)
	// Use loose for "how many game files" count so bad filename doesn't cascade into false errors
	const effectiveGameFiles = jsFiles.length > 0 ? jsFiles : gameFilesLoose;
	if (uppercaseGames.length > 0) {
		const badNames = uppercaseGames.map((file) => `\`${file.filename}\``).join(", ");
		addCheck("Directory must be lowercase", false, `Your file must be in the lowercase \`games/\` directory. Found ${badNames}.`);
	}

	const disallowedNames = disallowedFiles.map((file) => `\`${file.filename}\``).join(", ");
	addCheck(
		"Valid filenames and folders",
		disallowedFiles.length === 0,
		disallowedFiles.length
			? `Only game files in \`games/\` and optional images in \`games/img/\` are allowed. Filenames may only contain letters, numbers, hyphens, and underscores (no spaces, apostrophes, or special characters). Images must be .png. Found ${disallowedNames}.`
			: "Only submission files changed."
	);

	const jsNames = effectiveGameFiles.map((file) => `\`${file.filename}\``).join(", ");
	// If the only "extra" JS files are bad-named ones already caught by the filename check,
	// don't double-report them as extra game files — the filename error is enough.
	const extraBadNameOnly = effectiveGameFiles === gameFilesLoose && gameFilesLoose.length > 1;
	addCheck(
		"Exactly one game file",
		effectiveGameFiles.length === 1 || extraBadNameOnly,
		effectiveGameFiles.length === 0
			? "Add exactly one JavaScript game file in `games/`."
			: extraBadNameOnly
				? "Fix the filename(s) above — each must use only letters, numbers, hyphens, and underscores."
				: `Only one game file is allowed per submission. Found ${jsNames}.`
	);

	const changedNames = changedNonAddedFiles.map((file) => `\`${file.filename}\``).join(", ");
	addCheck(
		"Only new or game files changed",
		changedNonAddedFiles.length === 0,
		changedNonAddedFiles.length
			? `Submissions should only add new game files or modify existing ones in \`games/\`. These files outside \`games/\` were modified: ${changedNames}.`
			: "All submitted files are new or inside \`games/\`."
	);
	return { jsFiles: effectiveGameFiles, imageFiles };
}

function validateImages(imageFiles, gameBase, owner, repo, pullRequest, addCheck) {
	const badImagePaths = imageFiles.filter((file) => !file.filename.startsWith("games/img/"));
	const badImgNames = badImagePaths.map((file) => `\`${file.filename}\``).join(", ");
	let imgPathDetail = "No image provided; this is OK.";
	if (badImagePaths.length) imgPathDetail = `Move images into \`games/img/\`: ${badImgNames}.`;
	else if (imageFiles.length) imgPathDetail = "Image files are in `games/img/`.";
	addCheck("Optional image path", badImagePaths.length === 0, imgPathDetail);

	const mismatchedImages = imageFiles.filter((file) => path.basename(file.filename, path.extname(file.filename)) !== gameBase);
	const mismatchNames = mismatchedImages.map((file) => `\`${file.filename}\``).join(", ");
	let imgNameDetail = "No image provided; gallery thumbnail can be generated/default.";
	if (mismatchedImages.length) imgNameDetail = `Image filename must match \`${gameBase}.js\`. Found ${mismatchNames}.`;
	else if (imageFiles.length) imgNameDetail = "Image filename matches the game file.";
	addCheck("Optional image name", mismatchedImages.length === 0, imgNameDetail);

	if (imageFiles.length > 0) {
		const image = imageFiles.find((file) => path.basename(file.filename, path.extname(file.filename)) === gameBase) ?? imageFiles[0];
		return `https://raw.githubusercontent.com/${owner}/${repo}/${pullRequest.head.sha}/${image.filename}`;
	}
	return null;
}

async function validateSingleGameFile(gameFile, workspace, addCheck, warnings) {
	let metadata = null;
	let similarity = { score: 0, match: null };

	const filename = path.basename(gameFile.filename);
	const gamePath = path.join(workspace, gameFile.filename);
	const content = readFileSafe(gamePath);

	if (content === null) {
		addCheck("Game file readable", false, `Unable to read \`${gameFile.filename}\` from the checked-out PR.`);
		return { metadata, similarity };
	}

	const maxFileSize = 2 * 1024 * 1024;
	if (content.length > maxFileSize) {
		addCheck("File size limit", false, `The file \`${filename}\` is too large (${(content.length / 1024 / 1024).toFixed(2)}MB). Maximum allowed size is 2MB.`);
		return { metadata, similarity };
	}

	addCheck(
		"Filename uses safe characters",
		/^[a-zA-Z0-9_-]+\.js$/.test(filename),
		/^[a-zA-Z0-9_-]+\.js$/.test(filename)
			? "Filename is safe."
			: `Rename \`${filename}\` to use only letters, numbers, \`-\`, and \`_\`.`
	);

	addCheck(
		"Game file is directly inside games/",
		path.dirname(gameFile.filename) === "games",
		path.dirname(gameFile.filename) === "games"
			? "Game file is in `games/`."
			: `Move \`${gameFile.filename}\` directly into \`games/\`, not a nested folder.`
	);

	metadata = await validateMetadata(content, filename, workspace);
	for (const check of metadata.checks) addCheck(check.name, check.ok, check.detail);

	const codeWithoutComments = stripComments(content);
	const unsupportedApis = [/document\./i, /window\./i, /alert\(/i, /fetch\(/i].filter((regex) => regex.test(codeWithoutComments));
	addCheck(
		"Sprig-only APIs",
		unsupportedApis.length === 0,
		unsupportedApis.length
			? `Remove browser APIs like \`window\`, \`document\`, \`alert\`, or \`fetch\` from \`${filename}\`.`
			: "No unsupported browser APIs found."
	);

	similarity = findMostSimilarGame(content, gameFile.filename, workspace);
	if (similarity.score >= 0.5) {
		warnings.push(`Similarity is ${formatPercent(similarity.score)} against \`${similarity.match}\`. A reviewer or lead should compare both games.`);
	}

	return { metadata, similarity };
}
