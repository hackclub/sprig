import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
	REVIEW_BOT_MARKER,
	addLabels,
	buildMetadataSnippet,
	ensureReviewLabels,
	extractAboutAndGameplay,
	extractAuthor,
	getIssueLabels,
	getMetadataValue,
	getRepository,
	githubPaginated,
	githubRequest,
	hasLabel,
	inferSubmissionMetadata,
	parseTags,
	readGitHubEvent,
	removeLabel,
	setStateLabel,
	upsertBotComment,
	validateMetadataHeader,
} from "./review-utils.mjs";
import { buildSubmissionManifest, getImageCountCheck, validateImageFiles } from "./submission-manifest.mjs";
import {
	DUPLICATE_LABEL,
	LEGACY_DUPLICATE_LABEL,
	DUPLICATE_NOTICE_MARKER,
	buildLatestWarning,
	buildOlderCheckDetail,
	buildOlderNotice,
	findDuplicateGroup,
	parseOlderNotice,
} from "./duplicate-detection.mjs";
import { autoReviewLabelChanges, reconcileReviewStatus } from "./review-state.mjs";

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required");

const { owner, repo } = getRepository();
let event = readGitHubEvent();
let pullRequest = event.pull_request || event.issue;
// keep it in this order pls or the entire thing explodes and fails. thanks
let cachedOpenPulls = null;
let duplicateGroupNumbers = new Set();

let reviewers = new Set();
try {
	const reviewRoles = JSON.parse(readFileSync(path.resolve(process.env.SUBMISSION_PATH ?? process.cwd(), ".github/review-roles.json"), "utf8"));
	reviewers = new Set([...(reviewRoles.maintainers ?? []), ...(reviewRoles.triagers ?? [])].map((u) => u.toLowerCase()));
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
	console.log("PR is closed. Skipping auto triage.");
	process.exit(0);
}

if (event.action === "assigned") {
	await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Claimed"] });
	console.log(`PR assigned, added "Claimed" label.`);
	process.exit(0);
}

if (event.action === "labeled" && event.label?.name !== "Submission") {
	console.log(`PR labeled with "${event.label?.name ?? "unknown"}", not "Submission". Skipping auto triage.`);
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

const workspace = path.resolve(process.env.SUBMISSION_PATH ?? process.cwd());
const reviewBaseUrl = process.env.SPRIG_REVIEW_BASE_URL ?? "https://sprig.hackclub.com/editor";

await ensureReviewLabels({ owner, repo, token });

const pullFiles = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${prNumber}/files`);
const modifiesGames = pullFiles.some((f) => f.filename.toLowerCase().startsWith("games/"));
const labels = await getIssueLabels({ owner, repo, token, issueNumber: prNumber });
const isLabeledSubmission = hasLabel(labels, "Submission");

const body = pullRequest.body ?? "";
const isSubmissionPR = modifiesGames || isLabeledSubmission || isMisplacedGameSubmission(pullFiles, body);

if (!isSubmissionPR) {
	console.log("Not a submission PR (no games/ files, no Submission label, and not a misplaced game submission); skipping.");
	process.exit(0);
}

try {
	await materializeSubmittedGameFiles(pullRequest, pullFiles, workspace);
	const duplicates = await detectDuplicateSubmissions(pullFiles);
	duplicateGroupNumbers = new Set(duplicates.group?.duplicates ?? []);
	const result = await validateSubmission({
		pullRequest,
		pullFiles,
		workspace,
		reviewBaseUrl,
		owner,
		repo,
		duplicates,
	});

	await applyLabels(result);
	await applyDuplicateActions(duplicates);
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
} catch (error) {
	console.error("Auto triage validation failed with error:", error);
	await upsertBotComment({
		owner,
		repo,
		token,
		issueNumber: prNumber,
		marker: REVIEW_BOT_MARKER,
		body: `${REVIEW_BOT_MARKER}
### ❌ Auto Review Encountered an Error

Auto triage could not complete validation for this submission:
> ${error.message}

Please check that submitted files can be accessed, or ask in #sprig on Slack (with your PR number) or tag \`@LucasHT22\` here for assistance.`,
	});
	process.exit(1);
}

async function materializeSubmittedGameFiles(pullRequest, pullFiles, workspace) {
	const headRepo = pullRequest.head.repo?.full_name ?? `${owner}/${repo}`;
	const headSha = pullRequest.head.sha;
	const gameFiles = pullFiles.filter((file) => /^games\/[^/]+\.js$/.test(file.filename));

	for (const file of gameFiles) {
		const targetPath = path.join(workspace, file.filename);
		if (file.status === "removed") {
			try {
				rmSync(targetPath, { force: true });
			} catch {}
			continue;
		}

		const response = await fetch(
			`https://api.github.com/repos/${headRepo}/contents/${file.filename.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(headSha)}`,
			{
				headers: {
					Accept: "application/vnd.github.raw",
					Authorization: `Bearer ${token}`,
					"X-GitHub-Api-Version": "2022-11-28",
				},
			}
		);
		if (!response.ok) {
			throw new Error(`Unable to read submitted file ${file.filename} from GitHub API (${response.status}).`);
		}

		const content = await response.text();
		mkdirSync(path.dirname(targetPath), { recursive: true });
		writeFileSync(targetPath, content, "utf8");
	}
}

function isMisplacedGameSubmission(files, body) {
	const touchesNonGamePaths = files.some((f) =>
		!f.filename.toLowerCase().startsWith("games/") &&
		(f.status !== "added" || (!f.filename.endsWith(".js") && !/\.(png)$/i.test(f.filename)))
	);
	const addedJsFiles = files.filter((f) => f.status === "added" && f.filename.endsWith(".js"));
	const bodyLooksLikeSubmission =
		/what is your game about|how do you play your game/i.test(body) ||
		/^#+\s*(about your game|pre apply checklist)\b/im.test(body);
	return !touchesNonGamePaths &&
		addedJsFiles.length > 0 &&
		(bodyLooksLikeSubmission || addedJsFiles.some((f) => /^\+\s*(?:\*\s*)?@title:/m.test(f.patch ?? "")));
}

function addsGame(files, body) {
	return files.some((f) => f.status === "added" && /^games\/.+\.js$/i.test(f.filename)) ||
		isMisplacedGameSubmission(files, body);
}

async function detectDuplicateSubmissions(pullFiles) {
	const login = pullRequest.user?.login;
	if (!login || reviewers.has(login) || !addsGame(pullFiles, pullRequest.body ?? "")) return { group: null };
	try {
		const openPulls = await getOpenPulls();
		const targetLogin = login.toLowerCase();
		const siblings = openPulls
			.filter((pr) => pr.number !== prNumber && pr.user?.login?.toLowerCase() === targetLogin && !pr.draft)
			.slice(0, 20);

		const siblingNumbers = [];
		for (const pr of siblings) {
			const prFiles = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${pr.number}/files`);
			if (addsGame(prFiles, pr.body ?? "")) siblingNumbers.push(pr.number);
		}

		const group = findDuplicateGroup(prNumber, siblingNumbers);
		return { group: group.duplicates.length ? group : null };
	} catch (error) {
		console.warn(`Duplicate detection failed, continuing without it: ${error.message}`);
		return { group: null, failed: true };
	}
}

async function applyDuplicateActions({ group, failed }) {
	if (failed) return;
	if (!group) {
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: DUPLICATE_LABEL });
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: LEGACY_DUPLICATE_LABEL });
		await removeOlderNotice(prNumber);
		return;
	}

	await removeLabel({ owner, repo, token, issueNumber: prNumber, label: LEGACY_DUPLICATE_LABEL });
	await addLabels({ owner, repo, token, issueNumber: prNumber, labels: [DUPLICATE_LABEL] });
	if (!group.isLatest) {
		await syncOlderNotice({ issueNumber: prNumber, latestNumber: group.latestNumber, restart: event.action === "reopened" });
		return;
	}

	for (const olderNumber of group.older) {
		try {
			await removeLabel({ owner, repo, token, issueNumber: olderNumber, label: LEGACY_DUPLICATE_LABEL });
			await addLabels({ owner, repo, token, issueNumber: olderNumber, labels: [DUPLICATE_LABEL] });
			await syncOlderNotice({ issueNumber: olderNumber, latestNumber: prNumber, restart: false });
		} catch (error) {
			console.warn(`Could not notify duplicate PR #${olderNumber}: ${error.message}`);
		}
	}
}

async function removeOlderNotice(issueNumber) {
	const comments = await githubPaginated(token, `/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
	for (const comment of comments) {
		if (comment.user?.type === "Bot" && comment.body?.includes(DUPLICATE_NOTICE_MARKER)) {
			await githubRequest(token, "DELETE", `/repos/${owner}/${repo}/issues/comments/${comment.id}`);
		}
	}
}

async function syncOlderNotice({ issueNumber, latestNumber, restart }) {
	const comments = await githubPaginated(token, `/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
	const existing = comments.find((comment) => comment.body?.includes(DUPLICATE_NOTICE_MARKER));
	if (!restart && parseOlderNotice(existing?.body)?.latestNumber === latestNumber) return;

	await upsertBotComment({
		owner,
		repo,
		token,
		issueNumber,
		marker: DUPLICATE_NOTICE_MARKER,
		body: buildOlderNotice({ number: issueNumber, latestNumber, since: new Date().toISOString() }),
	});
}

async function getOpenPulls() {
	if (!cachedOpenPulls) {
		cachedOpenPulls = await githubPaginated(token, `/repos/${owner}/${repo}/pulls?state=open`);
	}
	return cachedOpenPulls;
}

async function validateSubmission({ pullRequest, pullFiles, workspace, reviewBaseUrl, owner, repo, duplicates }) {
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

	if (duplicates.group && !duplicates.group.isLatest) {
		addCheck(
			"No duplicate open submission",
			false,
			buildOlderCheckDetail({ number: prNumber, latestNumber: duplicates.group.latestNumber })
		);
	} else {
		addCheck(
			"No duplicate open submission",
			true,
			duplicates.group ? "This is your newest open submission PR." : "No other open submission PRs from you."
		);
		if (duplicates.group?.older.length) {
			warnings.push(buildLatestWarning({ older: duplicates.group.older }));
		}
	}

	let gameFile = null;
	let metadata = null;
	let content = null;
	let rawUrl = null;
	let playUrl = null;
	let screenshotUrl = null;
	let similarity = { score: 0, match: null };

	if (jsFiles.length === 1) {
		gameFile = jsFiles[0];
		const result = await validateSingleGameFile(gameFile, workspace, addCheck, warnings);
		metadata = result.metadata;
		similarity = result.similarity;
		content = result.content ?? null;

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

	const gameBase = gameFile ? path.basename(gameFile.filename, ".js") : null;
	screenshotUrl = validateImages(imageFiles, gameBase, owner, repo, pullRequest, addCheck);

	const ok = checks.every((check) => check.ok);
	return {
		ok,
		checks,
		problems,
		warnings,
		metadata: metadata?.values ?? null,
		gameFile: gameFile?.filename ?? null,
		content,
		rawUrl,
		playUrl,
		screenshotUrl,
		similarity,
	};
}

function validatePullRequestBody(body) {
	const checks = [];
	const add = (name, ok, detail) => checks.push({ name, ok, detail });

	const author = extractAuthor(body);
	const { about, gameplay } = extractAboutAndGameplay(body);

	add("PR author name", Boolean(author), author ? "Author field is filled." : "Fill in the `Author:` field in the PR description.");
	add("PR about blurb", Boolean(about), about ? "About blurb is filled." : "Fill in `What is your game about?` in the PR description.");
	add("PR gameplay description", Boolean(gameplay), gameplay ? "Gameplay description is filled." : "Fill in `How do you play your game?` in the PR description.");

	return { checks };
}

async function validateMetadata(content, filename, workspace) {
	const { checks, values, hasHeader } = validateMetadataHeader(content, filename);

	const TUTORIAL_FILES = ["getting_started.js", "maze_game_starter.js", "sprig_dodge.js"];
	const isTutorial = TUTORIAL_FILES.some((tutFile) => {
		try {
			const tutContent = readFileSync(path.join(workspace, "games", tutFile), "utf8");
			const normalizeCode = (s) => stripComments(s).replace(/\s+/g, " ").trim();
			return normalizeCode(content) === normalizeCode(tutContent);
		} catch { return false; }
	});
	checks.push({
		name: "Not a tutorial game",
		ok: !isTutorial,
		detail: isTutorial
			? "This looks like an unmodified tutorial or starter game. Submit your own original game instead."
			: "Game does not appear to be an unmodified tutorial.",
	});

	if (!hasHeader) {
		return { checks, values };
	}

	const safeTitle = values.title ? values.title.replace(/`/g, "'") : "";
	const titleConflict = values.title ? await findTitleConflict(values.title, filename, workspace) : null;
	checks.push({
		name: "Unique game title",
		ok: !titleConflict,
		detail: titleConflict
			? `Game title \`${safeTitle}\` already appears in \`${titleConflict}\`; choose a unique title.`
			: "Game title appears unique.",
	});

	return { checks, values };
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

	const openPulls = await getOpenPulls();
	const submissionPRs = openPulls.filter((pr) => pr.labels?.some((l) => l.name === "Submission"));
	for (const pr of submissionPRs) {
		if (pr.number === prNumber || duplicateGroupNumbers.has(pr.number)) continue;
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
	const c1 = chunks(analyze(content));
	if (!c1.size) return { score: 0, match: null };

	let best = { score: 0, match: null };
	for (const gameFile of gameFiles) {
		const relativePath = `games/${gameFile}`;
		if (relativePath === submittedFilename) continue;
		const other = readFileSafe(path.join(gamesDir, gameFile));
		if (!other) continue;
		const score = compareChunks(c1, other);
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

function chunks(value) {
	const set = new Set();
	for (let i = 0; i <= value.length - 10; i += 1) set.add(value.slice(i, i + 10));
	return set;
}

function compareChunks(c1, code) {
	if (!c1.size) return 0;
	const c2 = chunks(analyze(code));
	if (!c2.size) return 0;
	let overlap = 0;
	for (const chunk of c1) {
		if (c2.has(chunk)) overlap += 1;
	}
	return (2 * overlap) / (c1.size + c2.size);
}

function checkSimilarity(a, b) {
	const c1 = chunks(analyze(a));
	return compareChunks(c1, b);
}

function readFileSafe(filePath) {
	try {
		return readFileSync(filePath, "utf8");
	} catch {
		return null;
	}
}

async function getLatestReviewStatus({ owner, repo, token, prNumber, reviewers, authorLogin, headSha }) {
	if (!reviewers || reviewers.size === 0) return "unknown";
	try {
		const reviews = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${prNumber}/reviews`);
		return reconcileReviewStatus({ reviews, reviewers, authorLogin, headSha });
	} catch (e) {
		console.warn("Unable to fetch reviews; skipping review reconciliation:", e.message);
		return "unknown";
	}
}

async function applyLabels(result) {
	await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Submission"] });
	const currentLabels = await getIssueLabels({ owner, repo, token, issueNumber: prNumber });
	const reviewStatus = await getLatestReviewStatus({
		owner,
		repo,
		token,
		prNumber,
		reviewers,
		authorLogin: pullRequest.user?.login,
		headSha: pullRequest.head?.sha,
	});
	const changes = autoReviewLabelChanges({
		labels: currentLabels,
		validationOk: result.ok,
		eventAction: event.action,
		reviewStatus,
	});

	if (result.ok) {
		await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Verified"] });
		await setStateLabel({ owner, repo, token, issueNumber: prNumber, state: changes.state });
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Failed" });
	} else {
		await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Failed"] });
		await setStateLabel({ owner, repo, token, issueNumber: prNumber, state: "Needs Author" });
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Verified" });
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
		"Files stay in allowed folders": "file",
		"Exactly one game file": "file",
		"At most one image file": "file",
		"Only new files added": "file",
		"Filename uses safe characters": "file",
		"Game file is directly inside games/": "file",

		"PR author name": "pr",
		"PR about blurb": "pr",
		"PR gameplay description": "pr",
		"Code checklist": "pr",
		"Image checklist": "pr",

		"Metadata header": "metadata",
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

	const headRepo = pullRequest.head.repo?.full_name ?? `${owner}/${repo}`;
	const headRef = pullRequest.head.ref;
	const editUrl = `https://github.com/${headRepo}/edit/${headRef}/${result.gameFile ?? ""}`;

	const failedChecks = result.checks.filter((c) => !c.ok);

	let checksSection = "";
	if (failedChecks.length > 0) {
		checksSection += `> [!WARNING]\n> **Failed Checks (${failedChecks.length}):**\n`;
		for (const check of failedChecks) {
			checksSection += `> - ❌ **${check.name}:** ${check.detail}\n`;
		}
		checksSection += "\n";

		const hasMetadataFailure = failedChecks.some((c) => categoryMap[c.name] === "metadata");
		if (hasMetadataFailure && result.gameFile) {
			const inferred = inferSubmissionMetadata({
				content: result.content,
				filename: result.gameFile,
				pullRequest,
				existingMetadata: metadata,
			});
			const snippet = buildMetadataSnippet(inferred);

			const hasMissingHeader = failedChecks.some((c) => c.name === "Metadata header");
			const actionStep = hasMissingHeader
				? `Paste the header below at line 1 of \`${result.gameFile}\`.`
				: `Replace the comment header at the top of \`${result.gameFile}\` with the block below.`;

			checksSection += `> [!TIP]\n> **How to fix metadata:**\n> 1. Click **[Edit Game File](${editUrl})**.\n> 2. ${actionStep}\n> 3. Check the details, then commit your changes.\n\n> [!IMPORTANT]\n> **Auto-generated header: please review before committing!**\n> We drafted this header from your PR details, but it may not be 100% accurate. Verify that \`@title\`, \`@description\`, and \`@tags\` match your actual game before saving.\n\n\`\`\`javascript\n${snippet}\n\`\`\`\n\n`;
		}
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

	const links = [];
	if (result.playUrl) links.push(`- [Play in Sprig Editor](${result.playUrl})`);
	if (result.gameFile) links.push(`- [Edit Game File](${editUrl})`);
	if (result.similarity?.match) {
		const similarName = result.similarity.match.replace(/^games\//, "").replace(/\.js$/, "");
		links.push(`- [Play Similar Game (Gallery)](https://sprig.hackclub.com/gallery/${similarName})`);
	}
	if (result.rawUrl) links.push(`- [View Raw](${result.rawUrl})`);
	if (result.screenshotUrl) links.push(`- [View Screenshot](${result.screenshotUrl})`);
	links.push(`- [PR Files](${pullRequest.html_url}/files)`);

	const warningLines = result.warnings.length
		? ["", "#### Review Flags", ...result.warnings.map((warning) => `- ⚠️ ${warning}`)]
		: [];

	return `${REVIEW_BOT_MARKER}
### ${status}

${result.ok ? "All automated checks passed! Your game is ready for a reviewer to playtest." : "Thanks for submitting! There are just a few quick fixes needed before we can playtest your game."}

#### Submission
- Game: ${metadata.title ? `\`${metadata.title}\`` : "unknown"}
- Author: ${metadata.author ? `\`${metadata.author}\`` : "unknown"}
- File: ${result.gameFile ? `\`${result.gameFile}\`` : "not found"}
- Similarity: ${formatPercent(result.similarity.score)}${result.similarity.match ? ` against \`${result.similarity.match}\`` : ""}

#### Links
${links.join("\n")}

${checksSection}${warningLines.join("\n")}

${result.ok ? "Reviewers: please use the play link to playtest, then approve or request changes.\n\nAuthor: if your PR has been waiting for review for more than a few days, ask in #sprig on Slack (with your PR number) or tag `@LucasHT22` here." : `@${pullRequest.user.login}: you can update your game right here ([edit file](${editUrl})) or push new commits. Once you do, these checks will rerun automatically! If you get stuck or have questions, ask in #sprig on Slack (with your PR number) or tag \`@LucasHT22\` here.`}
`;
}

function formatPercent(value) {
	return `${Math.round(value * 100)}%`;
}

function validateSubmissionFiles(pullFiles, addCheck) {
	const manifest = buildSubmissionManifest(pullFiles);
	const { gameFiles: jsFiles, gameFilesLoose, allImageFiles, disallowedFiles, uppercaseGames, changedNonAddedFiles } = manifest;
	const effectiveGameFiles = gameFilesLoose;
	const effectiveImageFiles = allImageFiles;
	if (uppercaseGames.length > 0) {
		const badNames = uppercaseGames.map((file) => `\`${file.filename}\``).join(", ");
		addCheck("Directory must be lowercase", false, `Your file must be in the lowercase \`games/\` directory. Found ${badNames}.`);
	}

	const disallowedNames = disallowedFiles.map((file) => `\`${file.filename}\``).join(", ");
	addCheck(
		"Files stay in allowed folders",
		disallowedFiles.length === 0,
		disallowedFiles.length
			? `Only game files in \`games/\` and optional images in \`games/img/\` are allowed. Images must be .png. Found ${disallowedNames}.`
			: "Only submission files changed."
	);

	const jsNames = effectiveGameFiles.map((file) => `\`${file.filename}\``).join(", ");
	addCheck(
		"Exactly one game file",
		effectiveGameFiles.length === 1,
		effectiveGameFiles.length === 0
			? "Add exactly one JavaScript game file in `games/`."
			: jsFiles.length === 0 && gameFilesLoose.length > 1
				? `Only one game file is allowed per submission (and filenames must be fixed). Found ${jsNames}.`
				: `Only one game file is allowed per submission. Found ${jsNames}.`
	);

	const imgCountCheck = getImageCountCheck(effectiveImageFiles);
	addCheck(imgCountCheck.name, imgCountCheck.ok, imgCountCheck.detail);

	const changedNames = changedNonAddedFiles.map((file) => `\`${file.filename}\``).join(", ");
	addCheck(
		"Only new or game files changed",
		changedNonAddedFiles.length === 0,
		changedNonAddedFiles.length
			? `Submissions should only add new game files or modify existing ones in \`games/\`. These files outside \`games/\` were modified: ${changedNames}.`
			: "All submitted files are new or inside \`games/\`."
	);
	return { jsFiles: effectiveGameFiles, imageFiles: effectiveImageFiles };
}

function validateImages(imageFiles, gameBase, owner, repo, pullRequest, addCheck) {
	const checks = validateImageFiles({ imageFiles, gameBase });
	for (const check of checks) {
		addCheck(check.name, check.ok, check.detail);
	}

	if (imageFiles.length > 0 && pullRequest?.head?.sha) {
		const matchingImage = gameBase ? imageFiles.find((file) => file.filename === `games/img/${gameBase}.png`) : null;
		const image = matchingImage ?? imageFiles[0];
		return `https://raw.githubusercontent.com/${owner}/${repo}/${pullRequest.head.sha}/${image.filename.split("/").map(encodeURIComponent).join("/")}`;
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
		return { metadata, similarity, content: null };
	}

	const maxFileSize = 2 * 1024 * 1024;
	if (content.length > maxFileSize) {
		addCheck("File size limit", false, `The file \`${filename}\` is too large (${(content.length / 1024 / 1024).toFixed(2)}MB). Maximum allowed size is 2MB.`);
		return { metadata, similarity, content };
	}

	const safeFilename = /^[a-zA-Z0-9_-]+\.js$/.test(filename);
	const base = path.basename(filename, ".js");
	const suggestedBase = base.trim().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "") || "game";
	const suggestedFilename = `${suggestedBase}.js`;
	addCheck(
		"Filename uses safe characters",
		safeFilename,
		safeFilename
			? "Filename is safe."
			: `Rename \`${filename}\` to use only letters, numbers, \`-\`, and \`_\`${suggestedFilename !== filename ? ` (for example: \`${suggestedFilename}\`)` : ""}.`
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

	return { metadata, similarity, content };
}
