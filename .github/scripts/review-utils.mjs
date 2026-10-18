import { readFileSync } from "node:fs";
import path from "node:path";

export const LABELS = {
	Submission: {
		color: "6f42c1",
		description: "Game submission that should be processed by review automation",
		aliases: ["submission"],
	},
	Verified: {
		color: "2da44e",
		description: "Automated submission checks passed",
		aliases: ["submission:verified"],
	},
	Failed: {
		color: "d1242f",
		description: "Automated submission checks failed",
		aliases: ["submission:failed"],
	},
	"Ready for Playtest": {
		color: "0969da",
		description: "Ready for a reviewer to playtest",
		aliases: ["queue:playtest"],
	},
	"Needs Author": {
		color: "fbca04",
		description: "Waiting for the PR author to make changes",
		aliases: ["needs:author"],
	},
	Triaged: {
		color: "bf8700",
		description: "A human reviewer has looked at this submission",
		aliases: ["triaged"],
	},
	"Ready for Maintainer": {
		color: "2da44e",
		description: "Human review passed; maintainer should check and merge",
		aliases: ["ready:maintainer"],
	},
	"Plagiarism Risk": {
		color: "cf222e",
		description: "Similarity checker or reviewer found possible plagiarism",
		aliases: ["plagiarism:risk"],
	},
	"AI Concern": {
		color: "bf3989",
		description: "Reviewer needs author to explain AI usage",
		aliases: ["review:ai-concern"],
	},
	"Multiple Submissions": {
		color: "8250df",
		description: "Author has more than one open submission PR",
		aliases: ["multiple-submissions", "Potential Duplicate", "potential-duplicate"],
	},
	"Keep Open": {
		color: "8c959f",
		description: "Stale automation should not close this PR",
		aliases: ["keep-open"],
	},
	Stale: {
		color: "6e7781",
		description: "No activity for long enough that the PR needs attention",
		aliases: ["stale"],
	},
	Claimed: {
		color: "54aeff",
		description: "A reviewer has claimed this submission",
		aliases: ["review:claimed"],
	},
};

export const STATE_LABELS = [
	"Ready for Playtest",
	"Needs Author",
	"Ready for Maintainer",
	"Stale",
];

export const REVIEW_BOT_MARKER = "<!-- sprig-auto-review -->";
export const STALE_REMINDER_MARKER = "<!-- sprig-stale-reminder -->";
export const MAINTAINER_REMINDER_MARKER = "<!-- sprig-maintainer-reminder -->";

export function getRepository() {
	const value = process.env.GITHUB_REPOSITORY;
	if (typeof value !== "string" || value.split("/").length !== 2) {
		throw new Error("GITHUB_REPOSITORY must be set to owner/repo");
	}
	const [owner, repo] = value.split("/");
	return { owner, repo };
}

export function readGitHubEvent() {
	const eventPath = process.env.GITHUB_EVENT_PATH;
	if (!eventPath) return {};
	return JSON.parse(readFileSync(eventPath, "utf8"));
}

export async function githubRequest(token, method, route, body) {
	const response = await fetch(`https://api.github.com${route}`, {
		method,
		headers: {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			"X-GitHub-Api-Version": "2022-11-28",
		},
		body: body === undefined ? undefined : JSON.stringify(body),
	});

	if (response.status === 204) return null;

	const text = await response.text();
	let data = null;
	try {
		data = text ? JSON.parse(text) : null;
	} catch {}
	if (!response.ok) {
		const message = data?.message ?? text ?? `${response.status}`;
		throw new Error(`${method} ${route} failed: ${message}`);
	}
	return data;
}

export async function githubPaginated(token, route) {
	const results = [];
	let page = 1;
	for (;;) {
		const joiner = route.includes("?") ? "&" : "?";
		const data = await githubRequest(token, "GET", `${route}${joiner}per_page=100&page=${page}`);
		if (!Array.isArray(data) || data.length === 0) break;
		results.push(...data);
		if (data.length < 100) break;
		page += 1;
	}
	return results;
}

export async function ensureReviewLabels({ owner, repo, token }) {
	const existing = await githubPaginated(token, `/repos/${owner}/${repo}/labels`);
	const byLowerName = new Map(existing.map((label) => [label.name.toLowerCase(), label]));

	for (const [name, config] of Object.entries(LABELS)) {
		const exact = byLowerName.get(name.toLowerCase());
		if (exact) {
			await updateLabelIfNeeded({ owner, repo, token, currentLabel: exact, name, config });
			continue;
		}

		const alias = config.aliases
			.map((aliasName) => byLowerName.get(aliasName.toLowerCase()))
			.find(Boolean);

		if (alias) {
			await updateLabelIfNeeded({ owner, repo, token, currentLabel: alias, name, config });
			continue;
		}

		try {
			const created = await githubRequest(token, "POST", `/repos/${owner}/${repo}/labels`, {
				name,
				color: config.color,
				description: config.description,
			});
			byLowerName.set(created.name.toLowerCase(), created);
		} catch (error) {
			if (!String(error.message).includes("already_exists")) throw error;
		}
	}
}

async function updateLabelIfNeeded({ owner, repo, token, currentLabel, name, config }) {
	const currentName = currentLabel.name;
	const colorMatches = (currentLabel.color ?? "").toLowerCase() === config.color.toLowerCase();
	const descMatches = (currentLabel.description ?? "") === (config.description ?? "");
	if (currentName === name && colorMatches && descMatches) return;

	try {
		await githubRequest(token, "PATCH", `/repos/${owner}/${repo}/labels/${encodeURIComponent(currentName)}`, {
			new_name: name,
			color: config.color,
			description: config.description,
		});
	} catch (error) {
		if (!String(error.message).includes("already_exists")) throw error;
	}
}

export async function getIssueLabels({ owner, repo, token, issueNumber }) {
	const issue = await githubRequest(token, "GET", `/repos/${owner}/${repo}/issues/${issueNumber}`);
	return (issue.labels ?? []).map((label) => typeof label === "string" ? label : label.name);
}

export function hasLabel(labels, name) {
	return labels.some((label) => label.toLowerCase() === name.toLowerCase());
}

export async function addLabels({ owner, repo, token, issueNumber, labels }) {
	if (!labels.length) return;
	await githubRequest(token, "POST", `/repos/${owner}/${repo}/issues/${issueNumber}/labels`, { labels });
}

export async function removeLabel({ owner, repo, token, issueNumber, label }) {
	try {
		await githubRequest(token, "DELETE", `/repos/${owner}/${repo}/issues/${issueNumber}/labels/${encodeURIComponent(label)}`);
	} catch (error) {
		if (!String(error.message).includes("Label does not exist")) throw error;
	}
}

export async function removeLabels({ owner, repo, token, issueNumber, labels }) {
	for (const label of labels) {
		await removeLabel({ owner, repo, token, issueNumber, label });
	}
}

export async function setStateLabel({ owner, repo, token, issueNumber, state }) {
	const labels = await getIssueLabels({ owner, repo, token, issueNumber });
	const labelsToRemove = STATE_LABELS.filter((label) => label !== state && hasLabel(labels, label));
	await removeLabels({ owner, repo, token, issueNumber, labels: labelsToRemove });
	await addLabels({ owner, repo, token, issueNumber, labels: [state] });
}

export function currentStateFromLabels(labels, pullRequest) {
	if (pullRequest?.merged_at) return "Merged";
	if (pullRequest?.closed_at) return "Closed";
	if (hasLabel(labels, "Claimed")) return "Claimed";
	for (const state of STATE_LABELS) {
		if (hasLabel(labels, state)) return state;
	}
	if (hasLabel(labels, "Failed")) return "Needs Author";
	if (hasLabel(labels, "Verified")) return "Verified";
	return "Unsorted";
}

export function nextActionFromState(state, labels) {
	if (hasLabel(labels, "Plagiarism Risk")) return "Lead plagiarism review";
	if (hasLabel(labels, "AI Concern")) return "Lead AI review";
	switch (state) {
		case "Ready for Playtest":
			return "Reviewer playtest";
		case "Claimed":
			return "Reviewer playtest";
		case "Needs Author":
		case "Failed":
			return "Author fix";
		case "Ready for Maintainer":
			return "Maintainer merge";
		case "Stale":
			return "Close or reopen";
		default:
			return "None";
	}
}

export async function upsertBotComment({ owner, repo, token, issueNumber, marker, body }) {
	const comments = await githubPaginated(token, `/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
	const existing = comments.find((comment) => comment.user?.type === "Bot" && comment.body?.includes(marker));
	const fullBody = body.includes(marker) ? body : `${marker}\n${body}`;
	if (existing) {
		await githubRequest(token, "PATCH", `/repos/${owner}/${repo}/issues/comments/${existing.id}`, { body: fullBody });
		return existing.id;
	}

	const created = await githubRequest(token, "POST", `/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
		body: fullBody,
	});
	return created.id;
}

export function daysBetween(start, end = new Date()) {
	if (!start) return 0;
	const startTime = new Date(start).getTime();
	if (Number.isNaN(startTime)) return 0;
	const endTime = new Date(end).getTime();
	if (Number.isNaN(endTime)) return 0;
	return Math.floor((endTime - startTime) / 86_400_000);
}

export async function isReviewCommitOutdated({ owner, repo, token, prNumber, commitId, headSha, submissionFiles }) {
	if (!commitId || !headSha || commitId === headSha) return false;
	try {
		const files = submissionFiles ?? (await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${prNumber}/files`));
		const submissionFileObjects = files.filter((f) => {
			const fn = typeof f === "string" ? f : f.filename;
			return fn.toLowerCase().startsWith("games/");
		});
		if (submissionFileObjects.length === 0) return true;

		for (const file of submissionFileObjects) {
			const filename = typeof file === "string" ? file : file.filename;
			const targetHeadSha =
				typeof file === "object" && file?.sha
					? file.sha
					: await getFileBlobSha({ owner, repo, token, path: filename, ref: headSha });
			if (!targetHeadSha) return true;

			const commitBlobSha = await getFileBlobSha({ owner, repo, token, path: filename, ref: commitId });
			if (!commitBlobSha || commitBlobSha !== targetHeadSha) {
				return true;
			}
		}

		return false;
	} catch {
		return true;
	}
}

async function getFileBlobSha({ owner, repo, token, path: filePath, ref }) {
	try {
		const data = await githubRequest(
			token,
			"GET",
			`/repos/${owner}/${repo}/contents/${filePath.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(ref)}`
		);
		return data?.sha ?? null;
	} catch {
		return null;
	}
}

export function getMetadataValue(content, key) {
	const match = content.match(new RegExp(String.raw`@${key}:[^\S\r\n]*([\s\S]*?)(?=\r?\n\s*\*?\s*@|\r?\n\s*\*\/|\*\/)`, "i"));
	if (!match?.[1]) return "";
	const hasLeadingAsterisk = new RegExp(String.raw`(?:\r?\n|^)\s*\*\s*@${key}:`, "i").test(content);
	let value = match[1]
		.split(/\r?\n/)
		.map((line, index) => {
			if (index === 0 && !hasLeadingAsterisk) return line.trimEnd();
			return line.replace(/^\s*\*\s?/, "").trimEnd();
		})
		.join("\n");
	return value.trim();
}

export function parseTags(raw) {
	const trimmed = raw?.trim() ?? "";
	if (!trimmed) {
		return { issue: "Tags cannot be empty. Wrap tags in quotes inside brackets, for example: `@tags: ['maze', 'puzzle']`." };
	}

	if (trimmed === "[]" || /^\[\s*\]$/.test(trimmed)) {
		return {
			tags: [],
			issue: "Tags list cannot be empty. Please include at least one tag describing your game, for example: `@tags: ['maze']`.",
		};
	}

	if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
		const hasQuotes = /["']/.test(trimmed);
		return {
			issue: hasQuotes
				? "Tags must be enclosed in square brackets `[` and `]`, for example: `@tags: ['maze', 'puzzle']`."
				: "Tags must be enclosed in square brackets and quotes, for example: `@tags: ['maze', 'puzzle']`.",
		};
	}

	try {
		const parsed = JSON.parse(trimmed);
		if (Array.isArray(parsed)) {
			if (parsed.length === 0) {
				return { tags: [], issue: "Tags list cannot be empty. Please include at least one tag describing your game, for example: `@tags: ['maze']`." };
			}
			if (parsed.some((tag) => typeof tag !== "string")) {
				return { issue: "Tags must be text surrounded by quotes, for example: `@tags: ['maze', 'puzzle']`." };
			}
			if (parsed.some((tag) => !tag.trim())) {
				return { issue: "Tags cannot be blank, for example: `@tags: ['maze', 'puzzle']`." };
			}
			return { tags: parsed };
		}
	} catch {}

	const inner = trimmed.slice(1, -1).trim();
	const tags = [];
	const itemRegex = /^\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*(?:,\s*|$)/;
	let rest = inner;
	while (rest.length > 0) {
		const match = rest.match(itemRegex);
		if (!match) {
			return {
				issue: "Each tag inside the brackets must be surrounded by quotes, for example: `@tags: ['maze', 'puzzle']`.",
			};
		}
		const val = (match[1] !== undefined ? match[1] : match[2]).replace(/\\(['"\\])/g, "$1").trim();
		if (!val) {
			return { issue: "Tags cannot be blank, for example: `@tags: ['maze', 'puzzle']`." };
		}
		tags.push(val);
		rest = rest.slice(match[0].length);
	}

	if (tags.length === 0) {
		return {
			tags: [],
			issue: "Tags list cannot be empty. Please include at least one tag describing your game, for example: `@tags: ['maze']`.",
		};
	}

	return { tags };
}

export function stripTemplateNoise(value) {
	return (value ?? "")
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/^>\s?.*$/gm, "")
		.trim();
}

export function normalizeFieldValue(value) {
	return (value ?? "")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/^[*`_~]+|[*`_~]+$/g, "")
		.trim();
}

export function getSectionBlocks(body, heading) {
	const pattern = new RegExp(String.raw`(?:^|\n)#+\s*${heading}[^\n]*\n([\s\S]*?)(?=\n#+\s|$)`, "i");
	const match = (body ?? "").match(pattern);
	if (!match) return [];
	const clean = stripTemplateNoise(match[1]);
	return clean
		.split(/\n\s*\n+/)
		.map((p) => normalizeFieldValue(p))
		.filter(Boolean);
}

export function extractBoldField(body, label) {
	const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

	const boldPattern = new RegExp(String.raw`\*\*${escaped}:?\*\*\s*([\s\S]*?)(?=\n\s*(?:\*\*|#{1,6})|$)`, "i");
	const boldMatch = (body ?? "").match(boldPattern);
	if (boldMatch) {
		const value = normalizeFieldValue(stripTemplateNoise(boldMatch[1]));
		if (value) return value;
	}

	const fullBoldPattern = new RegExp(String.raw`(?:\*\*|\*)${escaped}\s*:\s*(.+?)(?:\*\*|\*)(?:\r?\n|$)`, "i");
	const fullBoldMatch = (body ?? "").match(fullBoldPattern);
	if (fullBoldMatch) {
		const value = normalizeFieldValue(stripTemplateNoise(fullBoldMatch[1]));
		if (value) return value;
	}

	const plainPattern = new RegExp(String.raw`(?:^|\n)\s*(?:[-*]|\d+\.)*\s*(?:\*\*|\*)?${escaped}\s*:\s*([^\n]+)`, "i");
	const plainMatch = (body ?? "").match(plainPattern);
	if (plainMatch) {
		const value = normalizeFieldValue(stripTemplateNoise(plainMatch[1]));
		if (value) return value;
	}

	return "";
}

export function extractAuthor(body) {
	const direct = extractBoldField(body, "Author");
	if (direct) return direct;
	const blocks = getSectionBlocks(body, "Author(?:\\s+name)?");
	for (const block of blocks) {
		if (/^author:?$/i.test(block)) continue;
		const clean = block.replace(/^author:\s*/i, "").trim();
		if (clean) return clean;
	}
	return "";
}

export function extractAboutAndGameplay(body) {
	let about = extractBoldField(body, "What is your game about?");
	let gameplay = extractBoldField(body, "How do you play your game?");
	if (about && gameplay) return { about, gameplay };

	const isPrompt = (text) =>
		/what is your game about/i.test(text) ||
		/how do you play your game/i.test(text);

	const blocks = getSectionBlocks(body, "About your game").filter((b) => !isPrompt(b));

	if (!about && blocks.length > 0) about = blocks[0];
	if (!gameplay && blocks.length > 1) gameplay = blocks[1];

	return { about, gameplay };
}

export const TAG_KEYWORDS = [
	{ tag: "arcade", pattern: /\b(?:casino|roulette|slot|slots|payout|bet|betting)\b/i },
	{ tag: "strategy", pattern: /\b(?:chess|checkmate|tic[- ]?tac(?:[- ]?toe)?)\b/i },
	{ tag: "music", pattern: /\b(?:music|tune|rhythm|audio|beat|melody)\b/i },
	{ tag: "runner", pattern: /\b(?:runner|running|dodge|dodging|dino)\b/i },
	{ tag: "shooter", pattern: /\b(?:shooter|shoot|bullet|laser|spaceships?|asteroid|asteroids|invader)\b/i },
	{ tag: "multiplayer", pattern: /\b(?:multiplayer|2[- ]?player|two[- ]?player|versus|1v1|pvp)\b/i },
	{ tag: "maze", pattern: /\b(?:maze|labyrinth)\b/i },
	{ tag: "platformer", pattern: /\b(?:platformer|platform|jump|jumping)\b/i },
	{ tag: "strategy", pattern: /\b(?:strategy|tactics|tower|dispatcher)\b/i },
	{ tag: "card", pattern: /\b(?:card|blackjack|poker|deck)\b/i },
	{ tag: "adventure", pattern: /\b(?:adventure|quest|rpg|explore|dungeon)\b/i },
	{ tag: "puzzle", pattern: /\b(?:puzzle|sokoban|boxes?|block|push|slide|tiles?|logic|minesweeper|mine\s*sweeper)\b/i },
	{ tag: "action", pattern: /\b(?:action|fight|battle|bomb|bomberman|blast)\b/i },
	{ tag: "endless", pattern: /\b(?:endless|infinite|high score)\b/i },
	{ tag: "retro", pattern: /\b(?:retro|pixel|8[- ]?bit)\b/i },
	{ tag: "arcade", pattern: /\b(?:arcade|classic)\b/i },
	{ tag: "simulation", pattern: /\b(?:simulation|sim|tycoon|farm|gravity)\b/i },
];

export function cleanGameTitle(rawTitle) {
	if (!rawTitle) return "";
	let title = rawTitle
		.replace(/^(?:\[|\()\s*sprig\s*(?:app|game|submission)?\s*[\]\)]\s*[:\-–—]?\s*/i, "")
		.replace(/^sprig\s+(?:app|game|submission)\s*[:\-–—]?\s*/i, "")
		.replace(/^sprig\s*[:\-–—]\s*/i, "")
		.replace(/^(?:add|upload)?\s*(?:files?\s+via\s+upload|uploaded\s+files?)\s*[:\-–—]?\s*/i, "")
		.replace(/^(?:add|create|new game:?)\s+/i, "")
		.replace(/\.js$/i, "")
		.replace(/[-_]v\d+.*$/i, "")
		.replace(/[-–—]\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+$/g, "")
		.replace(/["`]/g, "")
		.replace(/^'+|'+$/g, "")
		.replace(/^[:\-–—\s]+/, "")
		.trim();

	if (/^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)+$/.test(title)) {
		title = title.replace(/[-_]+/g, " ");
	}

	return title.trim();
}

export function inferSubmissionMetadata({ content, filename, pullRequest, existingMetadata } = {}) {
	// 1. Title
	let title = "";
	if (existingMetadata?.title && !/^getting(_|\s)started$/i.test(existingMetadata.title.trim()) && !/^template$/i.test(existingMetadata.title.trim()) && !/^my game$/i.test(existingMetadata.title.trim())) {
		title = existingMetadata.title.trim();
	} else {
		if (pullRequest?.title) {
			const cleanedPr = cleanGameTitle(pullRequest.title);
			if (cleanedPr && cleanedPr.length >= 2 && !/^my game$/i.test(cleanedPr)) {
				title = cleanedPr;
			}
		}
		if (!title && filename) {
			const basename = cleanGameTitle(path.basename(filename, ".js"));
			if (basename && !/^my game$/i.test(basename)) {
				title = basename;
			}
		}
		if (!title && content) {
			const firstLine = content.split("\n").find((line) => line.trim().length > 0) || "";
			const commentMatch = firstLine.match(/^\s*(?:\/\/|\/\*)\s*([A-Za-z0-9][A-Za-z0-9\s-_']{2,40})(?:\s*\([^)]*\))?\s*(?:\*\/|$)/);
			if (commentMatch) {
				const candidate = cleanGameTitle(commentMatch[1]);
				if (!candidate.startsWith("@") && !/^eslint/i.test(candidate) && !/^prettier/i.test(candidate) && !/^sprig/i.test(candidate)) {
					title = candidate;
				}
			}
		}
		if (!title) title = "Sprig Game";
	}

	// 2. Author
	let author = "";
	if (existingMetadata?.author && !/leo,\s*edits/i.test(existingMetadata.author) && !/^my name$/i.test(existingMetadata.author.trim())) {
		author = existingMetadata.author.trim();
	} else {
		const prAuthor = extractAuthor(pullRequest?.body ?? "");
		if (prAuthor && !/^my name$/i.test(prAuthor.trim())) {
			author = prAuthor.trim();
		} else if (pullRequest?.user?.login && !/^my name$/i.test(pullRequest.user.login.trim())) {
			author = pullRequest.user.login.trim();
		} else {
			author = "Sprig Developer";
		}
	}
	author = author.replace(/[:;\s]+$/, "").replace(/^["'`]|["'`]$/g, "").trim();

	// 3. Description
	let description = "";
	if (existingMetadata?.description && !/short description about the game/i.test(existingMetadata.description.trim())) {
		description = existingMetadata.description.trim();
	} else {
		const { about, gameplay } = extractAboutAndGameplay(pullRequest?.body ?? "");
		const cleanAbout = about ? stripTemplateNoise(about).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";
		const cleanGameplay = gameplay ? stripTemplateNoise(gameplay).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";

		let descCandidate = cleanAbout;
		if (cleanAbout && cleanAbout.length < 25 && cleanGameplay) {
			const sep = /[.!?]$/.test(cleanAbout) ? " " : ". ";
			descCandidate = `${cleanAbout}${sep}${cleanGameplay}`;
		} else if (!cleanAbout && cleanGameplay) {
			descCandidate = cleanGameplay;
		}

		descCandidate = descCandidate.replace(/^objective:\s*/i, "").trim();
		const firstSentence = descCandidate.split(/(?<=[.!?])\s+/)[0]?.trim() ?? "";
		if (firstSentence.length >= 5 && !/short description/i.test(firstSentence)) {
			description = firstSentence.length > 140 ? `${firstSentence.slice(0, 137)}...` : firstSentence;
		} else {
			description = `A custom game called ${title} built for Sprig.`;
		}
	}
	description = description.replace(/[\r\n]+/g, " ").replace(/^["'`]|["'`]$/g, "").trim();

	// 4. Tags
	let tags = [];
	if (Array.isArray(existingMetadata?.tags) && existingMetadata.tags.length > 0) {
		const filtered = existingMetadata.tags.filter((t) => !["tag1", "tag2", "example", "another-example"].includes(t.toLowerCase()));
		if (filtered.length > 0) tags = filtered;
	}
	if (tags.length === 0) {
		const cleanBody = stripTemplateNoise(pullRequest?.body ?? "");
		const text = `${filename ?? ""} ${pullRequest?.title ?? ""} ${cleanBody} ${(content ?? "").slice(0, 3000)}`.toLowerCase();
		for (const { tag, pattern } of TAG_KEYWORDS) {
			if (pattern.test(text) && !tags.includes(tag)) {
				tags.push(tag);
				if (tags.length >= 2) break;
			}
		}
		if (tags.length === 0) tags = ["puzzle"];
	}

	// 5. AddedOn
	let addedOn = "";
	if (existingMetadata?.addedOn && /^\d{4}-\d{2}-\d{2}$/.test(existingMetadata.addedOn)) {
		const parsed = new Date(`${existingMetadata.addedOn}T00:00:00Z`);
		if (!Number.isNaN(parsed.getTime()) && Math.abs(Date.now() - parsed.getTime()) <= 183 * 86_400_000) {
			addedOn = existingMetadata.addedOn;
		}
	}
	if (!addedOn) {
		addedOn = new Date().toISOString().slice(0, 10);
	}

	return { title, author, description, tags, addedOn };
}

export function checkMetadataDate(addedOn, add) {
	const validFormat = /^\d{4}-\d{2}-\d{2}$/.test(addedOn);
	const parsedDate = validFormat ? new Date(`${addedOn}T00:00:00Z`) : null;
	const isRealDate = Boolean(
		validFormat &&
		parsedDate &&
		!Number.isNaN(parsedDate.getTime()) &&
		parsedDate.toISOString().slice(0, 10) === addedOn
	);
	const now = new Date();
	const tooOld = isRealDate ? Math.abs(now.getTime() - parsedDate.getTime()) > 183 * 86_400_000 : true;
	const ok = isRealDate && !tooOld;
	let detail = "Date looks current.";
	if (!ok) {
		if (isRealDate && tooOld) {
			detail = "Set `@addedOn:` to a recent date in `YYYY-MM-DD` format (must be within the last 6 months).";
		} else if (/\n/.test(addedOn) || /\b\d{4}-\d{2}-\d{2}\b/.test(addedOn)) {
			detail = "Set `@addedOn:` to a recent date in `YYYY-MM-DD` format. Close the metadata header with `*/` immediately after `@addedOn` before any instructions or other comments.";
		} else {
			detail = "Set `@addedOn:` to a valid recent date in `YYYY-MM-DD` format.";
		}
	}
	add("Metadata date", ok, detail);
}

export function buildMetadataSnippet({ title, author, description, tags, addedOn } = {}) {
	const gameTitle = title || "My Game";
	const gameAuthor = author || "Your Name";
	const gameDesc = description || "A short description of what players do in your game";
	let gameTags = "['puzzle']";
	if (Array.isArray(tags) && tags.length > 0) {
		gameTags = `[${tags.map((t) => `'${t.replace(/'/g, "\\'")}'`).join(", ")}]`;
	} else if (typeof tags === "string" && tags.trim()) {
		gameTags = tags.trim();
	}
	const gameDate = addedOn || new Date().toISOString().slice(0, 10);

	return `/*
@title: ${gameTitle}
@author: ${gameAuthor}
@description: ${gameDesc}
@tags: ${gameTags}
@addedOn: ${gameDate}
*/`;
}

export function validateMetadataHeader(content, filename) {
	const checks = [];
	const values = {
		title: getMetadataValue(content, "title"),
		author: getMetadataValue(content, "author"),
		description: getMetadataValue(content, "description"),
		tags: getMetadataValue(content, "tags"),
		addedOn: getMetadataValue(content, "addedOn"),
	};

	const hasAnyMetadata = Boolean(values.title || values.author || values.description || values.tags || values.addedOn);
	if (!hasAnyMetadata) {
		checks.push({
			name: "Metadata header",
			ok: false,
			detail: `Missing comment header at the top of \`${filename}\`. Sprig games require a \`/* ... */\` comment block with game details at line 1.`,
		});
		return { checks, values: { ...values, tags: [] }, hasHeader: false };
	}

	const today = new Date().toISOString().slice(0, 10);
	const missingDetails = {
		title: `Add a title for your game (e.g. \`@title: My Game\`) to the comment header at the top of \`${filename}\`.`,
		author: `Add your name or handle (e.g. \`@author: Your Name\`) to the comment header at the top of \`${filename}\`.`,
		description: `Add a short description of what players do (e.g. \`@description: A fun puzzle game\`) to the comment header at the top of \`${filename}\`.`,
		tags: `Add tags for your game (e.g. \`@tags: ['puzzle']\`) to the comment header at the top of \`${filename}\`.`,
		addedOn: `Add today's date in YYYY-MM-DD format (e.g. \`@addedOn: ${today}\`) to the comment header at the top of \`${filename}\`.`,
	};

	for (const [key, value] of Object.entries(values)) {
		checks.push({
			name: `Metadata @${key}`,
			ok: Boolean(value),
			detail: value ? `@${key} is filled.` : missingDetails[key],
		});
	}

	let parsedTags = { tags: [] };
	if (values.tags) {
		parsedTags = parseTags(values.tags);
		const tagsValid = Boolean(parsedTags.tags && parsedTags.tags.length > 0);
		checks.push({
			name: "Metadata tags parse",
			ok: tagsValid,
			detail: tagsValid
				? "Tags are formatted correctly."
				: `Format \`@tags:\` as a list of tags in quotes and brackets, for example \`@tags: ['maze', 'puzzle']\`.\nReason: ${parsedTags.issue ?? "Tags list cannot be empty."}`,
		});
	}

	if (values.addedOn) {
		checkMetadataDate(values.addedOn, (name, ok, detail) => checks.push({ name, ok, detail }));
	}

	const titleLooksLikeTemplate = /^getting(_|\s)started$/i.test(values.title?.trim()) || /^template$/i.test(values.title?.trim()) || /^my game$/i.test(values.title?.trim());
	const authorLooksLikeTemplate = /leo,\s*edits/i.test(values.author) || /^my name$/i.test(values.author?.trim());
	const descriptionLooksLikeTemplate = /short description about the game/i.test(values.description?.trim());
	const hasExampleTags = parsedTags.tags?.some((t) => ["tag1", "tag2", "example", "another-example"].includes(t.toLowerCase()));

	const hasTemplateValues = titleLooksLikeTemplate || authorLooksLikeTemplate || descriptionLooksLikeTemplate || hasExampleTags;

	checks.push({
		name: "Metadata template values",
		ok: !hasTemplateValues,
		detail: !hasTemplateValues
			? "No template metadata values found."
			: "Replace example/template values in the metadata header (like 'MY GAME', 'MY NAME', 'Short description...', or placeholder tags).",
	});

	return { checks, values: { ...values, tags: parsedTags.tags ?? values.tags }, hasHeader: true };
}


