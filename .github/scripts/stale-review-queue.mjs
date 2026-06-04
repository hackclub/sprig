import {
	MAINTAINER_REMINDER_MARKER,
	STALE_REMINDER_MARKER,
	daysBetween,
	ensureReviewLabels,
	getIssueLabels,
	getRepository,
	githubPaginated,
	githubRequest,
	hasLabel,
	removeLabel,
	setStateLabel,
} from "./review-utils.mjs";

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required");

const { owner, repo } = getRepository();
await ensureReviewLabels({ owner, repo, token });

const openPulls = await githubPaginated(token, `/repos/${owner}/${repo}/pulls?state=open&sort=updated&direction=asc`);

for (const pullRequest of openPulls) {
	const issueNumber = pullRequest.number;
	const labels = await getIssueLabels({ owner, repo, token, issueNumber });
	if (!hasLabel(labels, "Submission")) continue;
	if (hasLabel(labels, "Keep Open")) continue;

	if (hasLabel(labels, "Needs Author") || hasLabel(labels, "Failed") || hasLabel(labels, "Stale")) {
		await handleNeedsAuthor(pullRequest, labels);
		continue;
	}

	if (hasLabel(labels, "Ready for Maintainer")) {
		await handleReadyForMaintainer(pullRequest);
		continue;
	}

	if (hasLabel(labels, "Claimed")) {
		await handleClaimed(pullRequest);
	}
}

async function handleNeedsAuthor(pullRequest, labels) {
	const dates = [];
	if (hasLabel(labels, "Needs Author")) dates.push(await latestLabelTime(pullRequest.number, "Needs Author"));
	if (hasLabel(labels, "Failed")) dates.push(await latestLabelTime(pullRequest.number, "Failed"));
	if (hasLabel(labels, "Stale")) dates.push(await latestLabelTime(pullRequest.number, "Stale"));
	const since = newestDate(dates.filter(Boolean));
	if (!since) return;

	const age = daysBetween(since);
	if (age >= 14 && !hasLabel(labels, "Plagiarism Risk")) {
		await commentOnce({
			issueNumber: pullRequest.number,
			marker: "<!-- sprig-auto-close -->",
			body: "Closing because this submission has been waiting on author changes for 14 days. Push fixes and ask a reviewer to reopen when ready.",
		});
		await githubRequest(token, "PATCH", `/repos/${owner}/${repo}/issues/${pullRequest.number}`, {
			state: "closed",
		});
		return;
	}

	if (age >= 7) {
		await setStateLabel({ owner, repo, token, issueNumber: pullRequest.number, state: "Stale" });
		await commentOnce({
			issueNumber: pullRequest.number,
			marker: STALE_REMINDER_MARKER,
			body: "This submission has been waiting on author changes for 7 days. Please push fixes soon, or it may be closed after 14 days of no response.",
		});
	}
}

function newestDate(dates) {
	return dates
		.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;
}

async function handleReadyForMaintainer(pullRequest) {
	const since = await latestLabelTime(pullRequest.number, "Ready for Maintainer");
	if (!since || daysBetween(since) < 7) return;
	await commentOnce({
		issueNumber: pullRequest.number,
		marker: MAINTAINER_REMINDER_MARKER,
		body: "This submission has been ready for maintainer review for 7 days.",
	});
}

async function handleClaimed(pullRequest) {
	const since = await latestLabelTime(pullRequest.number, "Claimed");
	if (!since || daysBetween(since) < 3) return;
	await removeLabel({ owner, repo, token, issueNumber: pullRequest.number, label: "Claimed" });
	await commentOnce({
		issueNumber: pullRequest.number,
		marker: "<!-- sprig-unclaim-stale -->",
		body: "Unclaiming because this review has had no activity for 3 days.",
	});
}

async function latestLabelTime(issueNumber, labelName) {
	const events = await githubPaginated(token, `/repos/${owner}/${repo}/issues/${issueNumber}/events`);
	const matching = events
		.filter((event) => event.event === "labeled" && event.label?.name?.toLowerCase() === labelName.toLowerCase())
		.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
	return matching[0]?.created_at ?? null;
}

async function commentOnce({ issueNumber, marker, body }) {
	const comments = await githubPaginated(token, `/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
	const alreadyCommented = comments.some((comment) => comment.body?.includes(marker));
	if (alreadyCommented) return;
	await githubRequest(token, "POST", `/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
		body: `${marker}\n${body}`,
	});
}
