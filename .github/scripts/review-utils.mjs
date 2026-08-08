import { readFileSync } from "node:fs";

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
	"Potential Duplicate": {
		color: "8250df",
		description: "Author has more than one open submission",
		aliases: ["potential-duplicate"],
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
			await updateLabelIfNeeded({ owner, repo, token, currentName: exact.name, name, config });
			continue;
		}

		const alias = config.aliases
			.map((aliasName) => byLowerName.get(aliasName.toLowerCase()))
			.find(Boolean);

		if (alias) {
			await updateLabelIfNeeded({ owner, repo, token, currentName: alias.name, name, config });
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

async function updateLabelIfNeeded({ owner, repo, token, currentName, name, config }) {
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
	return Math.floor((end.getTime() - new Date(start).getTime()) / 86_400_000);
}
