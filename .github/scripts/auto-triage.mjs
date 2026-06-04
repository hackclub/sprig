import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import {
	REVIEW_BOT_MARKER,
	addLabels,
	ensureReviewLabels,
	getIssueLabels,
	getRepository,
	githubPaginated,
	hasLabel,
	readGitHubEvent,
	removeLabel,
	setStateLabel,
	upsertBotComment,
} from "./review-utils.mjs";

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required");

const { owner, repo } = getRepository();
const event = readGitHubEvent();
const pullRequest = event.pull_request;

if (!pullRequest) {
	console.log("No pull request in event; skipping auto triage.");
	process.exit(0);
}

const prNumber = pullRequest.number;
const workspace = path.resolve(process.env.SUBMISSION_PATH ?? process.cwd());
const reviewBaseUrl = process.env.SPRIG_REVIEW_BASE_URL ?? "https://sprig.hackclub.com/editor";

await ensureReviewLabels({ owner, repo, token });

const labels = await getIssueLabels({ owner, repo, token, issueNumber: prNumber });
if (!hasLabel(labels, "Submission")) {
	console.log("Submission label missing; validation not needed yet.");
	process.exit(0);
}

const pullFiles = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${prNumber}/files`);
const result = validateSubmission({
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

if (!result.ok) process.exit(1);

function validateSubmission({ pullRequest, pullFiles, workspace, reviewBaseUrl, owner, repo }) {
	const checks = [];
	const problems = [];
	const warnings = [];

	const addCheck = (name, ok, detail) => {
		checks.push({ name, ok, detail });
		if (!ok && detail) problems.push(detail);
	};

	const jsFiles = pullFiles.filter((file) => file.filename.startsWith("games/") && file.filename.endsWith(".js"));
	const imageFiles = pullFiles.filter((file) => /\.(png|jpe?g|webp)$/i.test(file.filename));
	const disallowedFiles = pullFiles.filter((file) => !isAllowedSubmissionFile(file.filename));

	addCheck(
		"Files stay in allowed folders",
		disallowedFiles.length === 0,
		disallowedFiles.length
			? `Only game files in \`games/\` and optional images in \`games/img/\` are allowed. Found ${disallowedFiles.map((file) => `\`${file.filename}\``).join(", ")}.`
			: "Only submission files changed."
	);

	addCheck(
		"Exactly one game file",
		jsFiles.length === 1,
		jsFiles.length === 0
			? "Add exactly one JavaScript game file in `games/`."
			: `Only one game file is allowed per submission. Found ${jsFiles.map((file) => `\`${file.filename}\``).join(", ")}.`
	);

	const changedNonAdded = pullFiles.filter((file) => file.status !== "added");
	addCheck(
		"Only new files added",
		changedNonAdded.length === 0,
		changedNonAdded.length
			? `Submissions should add new files only. These files were not added: ${changedNonAdded.map((file) => `\`${file.filename}\``).join(", ")}.`
			: "All submitted files are new."
	);

	const bodyChecks = validatePullRequestBody(pullRequest.body ?? "", imageFiles.length > 0);
	for (const check of bodyChecks.checks) addCheck(check.name, check.ok, check.detail);

	let gameFile = null;
	let metadata = null;
	let rawUrl = null;
	let playUrl = null;
	let screenshotUrl = null;
	let similarity = { score: 0, match: null };

	if (jsFiles.length === 1) {
		gameFile = jsFiles[0];
		const filename = path.basename(gameFile.filename);
		const gamePath = path.join(workspace, gameFile.filename);
		const content = readFileSafe(gamePath);

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

		if (content === null) {
			addCheck("Game file readable", false, `Unable to read \`${gameFile.filename}\` from the checked-out PR.`);
		} else {
			metadata = validateMetadata(content, filename, workspace);
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
		}

		rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${pullRequest.head.sha}/${gameFile.filename}`;
		const reviewUrl = new URL(reviewBaseUrl);
		reviewUrl.searchParams.set("review", "true");
		reviewUrl.searchParams.set("raw", rawUrl);
		reviewUrl.searchParams.set("pr", String(prNumber));
		reviewUrl.searchParams.set("repo", `${owner}/${repo}`);
		playUrl = reviewUrl.toString();
	}

	if (gameFile) {
		const gameBase = path.basename(gameFile.filename, ".js");
		const badImagePaths = imageFiles.filter((file) => !file.filename.startsWith("games/img/"));
		const mismatchedImages = imageFiles.filter((file) => path.basename(file.filename, path.extname(file.filename)) !== gameBase);

		addCheck(
			"Optional image path",
			badImagePaths.length === 0,
			badImagePaths.length
				? `Move images into \`games/img/\`: ${badImagePaths.map((file) => `\`${file.filename}\``).join(", ")}.`
				: imageFiles.length ? "Image files are in `games/img/`." : "No image provided; this is OK."
		);

		addCheck(
			"Optional image name",
			mismatchedImages.length === 0,
			mismatchedImages.length
				? `Image filename must match \`${gameBase}.js\`. Found ${mismatchedImages.map((file) => `\`${file.filename}\``).join(", ")}.`
				: imageFiles.length ? "Image filename matches the game file." : "No image provided; gallery thumbnail can be generated/default."
		);

		if (imageFiles.length > 0) {
			const image = imageFiles.find((file) => path.basename(file.filename, path.extname(file.filename)) === gameBase) ?? imageFiles[0];
			screenshotUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${pullRequest.head.sha}/${image.filename}`;
		}
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

function isAllowedSubmissionFile(filename) {
	if (/^games\/[A-Za-z0-9_-]+\.js$/.test(filename)) return true;
	if (/^games\/img\/[^/]+\.(png|jpe?g|webp)$/i.test(filename)) return true;
	return false;
}

function validatePullRequestBody(body, imageProvided) {
	const checks = [];
	const add = (name, ok, detail) => checks.push({ name, ok, detail });

	const author = extractBoldField(body, "Author");
	const about = extractBoldField(body, "What is your game about?");
	const gameplay = extractBoldField(body, "How do you play your game?");

	add("PR author name", Boolean(author), author ? "Author field is filled." : "Fill in the `Author:` field in the PR description.");
	add("PR about blurb", Boolean(about), about ? "About blurb is filled." : "Fill in `What is your game about?` in the PR description.");
	add("PR gameplay description", Boolean(gameplay), gameplay ? "Gameplay description is filled." : "Fill in `How do you play your game?` in the PR description.");

	const imageHeaderIndex = body.search(/^##\s+Image/im);
	const codeSection = imageHeaderIndex >= 0 ? body.slice(0, imageHeaderIndex) : body;
	const imageSection = imageHeaderIndex >= 0 ? body.slice(imageHeaderIndex) : "";

	const codeBoxes = getCheckboxes(codeSection);
	const uncheckedCodeBoxes = codeBoxes.filter((box) => !box.checked);
	add(
		"Code checklist",
		codeBoxes.length > 0 && uncheckedCodeBoxes.length === 0,
		codeBoxes.length === 0
			? "Keep the PR checklist and check every required code box."
			: uncheckedCodeBoxes.length
				? `Check every required code box. Still unchecked: ${uncheckedCodeBoxes.map((box) => `\`${box.text}\``).join(", ")}.`
				: "All required code boxes are checked."
	);

	if (imageProvided) {
		const imageBoxes = getCheckboxes(imageSection);
		const uncheckedImageBoxes = imageBoxes.filter((box) => !box.checked);
		add(
			"Image checklist",
			imageBoxes.length > 0 && uncheckedImageBoxes.length === 0,
			imageBoxes.length === 0
				? "An image was added, so keep and complete the image checklist."
				: uncheckedImageBoxes.length
					? `Image was added, so check the image checklist boxes. Still unchecked: ${uncheckedImageBoxes.map((box) => `\`${box.text}\``).join(", ")}.`
					: "Image checklist is checked."
		);
	} else {
		add("Image checklist", true, "No image was added, so image checklist is optional.");
	}

	return { checks };
}

function extractBoldField(body, label) {
	const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const pattern = new RegExp(`\\*\\*${escaped}:?\\*\\*\\s*([\\s\\S]*?)(?=\\n\\s*(?:\\*\\*|##|#)|$)`, "i");
	const match = body.match(pattern);
	if (!match) return "";
	return stripTemplateNoise(match[1]);
}

function stripTemplateNoise(value) {
	return value
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/^>\s?.*$/gm, "")
		.trim();
}

function getCheckboxes(markdown) {
	return [...markdown.matchAll(/^\s*-\s+\[([ xX])\]\s+(.+)$/gm)].map((match) => ({
		checked: match[1].toLowerCase() === "x",
		text: match[2].replace(/<!--[\s\S]*?-->/g, "").trim(),
	}));
}

function validateMetadata(content, filename, workspace) {
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

	const validDate = /^\d{4}-\d{2}-\d{2}$/.test(values.addedOn);
	const parsedDate = validDate ? new Date(`${values.addedOn}T00:00:00Z`) : null;
	const now = new Date();
	const tooOld = parsedDate ? Math.abs(now.getTime() - parsedDate.getTime()) > 183 * 86_400_000 : true;
	add(
		"Metadata date",
		validDate && parsedDate && !Number.isNaN(parsedDate.getTime()) && !tooOld,
		validDate && parsedDate && !Number.isNaN(parsedDate.getTime()) && !tooOld
			? "Date looks current."
			: `Set \`@addedOn:\` to a recent date in \`YYYY-MM-DD\` format.`
	);

	const titleLooksLikeTemplate = /getting_started/i.test(values.title) || /template/i.test(values.title);
	const authorLooksLikeTemplate = /leo,\s*edits/i.test(values.author);
	add(
		"Metadata template values",
		!titleLooksLikeTemplate && !authorLooksLikeTemplate,
		!titleLooksLikeTemplate && !authorLooksLikeTemplate
			? "No template metadata values found."
			: "Replace example/template values in the metadata header."
	);

	const titleConflict = values.title ? findTitleConflict(values.title, filename, workspace) : null;
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
	const match = content.match(new RegExp(`@${key}:\\s*([^\\r\\n]*)`));
	return match?.[1]?.trim() ?? "";
}

function parseTags(raw) {
	if (!raw || !raw.trim()) return { issue: "is empty (expected a JSON-ish array like ['maze','puzzle'])." };

	try {
		const parsed = JSON.parse(raw.replaceAll("'", '"'));
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

function findTitleConflict(title, filename, workspace) {
	const gamesDir = path.join(workspace, "games");
	const normalizedTitle = normalize(title);
	for (const gameFile of readdirSync(gamesDir).filter((file) => file.endsWith(".js"))) {
		if (gameFile === filename) continue;
		const content = readFileSafe(path.join(gamesDir, gameFile));
		if (!content) continue;
		const existingTitle = getMetadataValue(content, "title");
		if (normalize(existingTitle) === normalizedTitle) return `games/${gameFile}`;
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
	const preserveReviewState = result.ok &&
		["edited", "labeled", "unlabeled"].includes(event.action) &&
		(hasLabel(currentLabels, "Claimed") || hasLabel(currentLabels, "Ready for Maintainer"));

	if (result.ok) {
		await addLabels({ owner, repo, token, issueNumber: prNumber, labels: ["Verified"] });
		if (!preserveReviewState) {
			await setStateLabel({ owner, repo, token, issueNumber: prNumber, state: "Ready for Playtest" });
		}
		await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Failed" });
		if (!preserveReviewState) {
			await removeLabel({ owner, repo, token, issueNumber: prNumber, label: "Needs Author" });
		}
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
	const checkLines = result.checks.map((check) => {
		const icon = check.ok ? "✅" : "❌";
		return `- ${icon} ${check.name}: ${check.detail}`;
	});

	const links = [];
	if (result.playUrl) links.push(`- [Play in Sprig Editor](${result.playUrl})`);
	if (result.rawUrl) links.push(`- [View Raw](${result.rawUrl})`);
	if (result.screenshotUrl) links.push(`- [View Screenshot](${result.screenshotUrl})`);
	links.push(`- [PR Files](${pullRequest.html_url}/files)`);

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

#### Checks
${checkLines.join("\n")}${warningLines.join("\n")}

${result.ok ? "Reviewers: claim this PR, use the play link, then approve or request changes." : "Authors: push fixes to this PR. These checks rerun automatically."}
`;
}

function formatPercent(value) {
	return `${Math.round(value * 100)}%`;
}
