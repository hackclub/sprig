import { hasLabel } from "./review-utils.mjs";

export function autoReviewLabelChanges({ labels, validationOk, eventAction, reviewStatus = "unknown" }) {
	const add = new Set(["Submission"]);
	const remove = new Set();

	if (validationOk) {
		add.add("Verified");
		remove.add("Failed");

		let targetState = "Ready for Playtest";
		if (reviewStatus === "approved") {
			targetState = "Ready for Maintainer";
		} else if (reviewStatus === "changes_requested") {
			targetState = "Needs Author";
		} else if ((reviewStatus === "unknown" || reviewStatus === "none") && hasLabel(labels, "Ready for Maintainer") && eventAction !== "synchronize") {
			targetState = "Ready for Maintainer";
		}

		add.add(targetState);
		if (targetState !== "Needs Author") remove.add("Needs Author");
		if (targetState !== "Ready for Playtest") remove.add("Ready for Playtest");
		if (targetState !== "Ready for Maintainer") remove.add("Ready for Maintainer");

		// "Claimed" is owned by assignment handlers in a separate concurrency lane.
		// Never copy it from this label snapshot.

		return {
			add: [...add],
			remove: [...remove].filter((label) => hasLabel(labels, label)),
			state: targetState,
			approvalInvalidated: eventAction === "synchronize" && hasLabel(labels, "Ready for Maintainer") && reviewStatus !== "approved",
		};
	} else {
		add.add("Failed");
		add.add("Needs Author");
		remove.add("Verified");
		remove.add("Ready for Playtest");
		remove.add("Ready for Maintainer");

		return {
			add: [...add],
			remove: [...remove].filter((label) => hasLabel(labels, label)),
			state: "Needs Author",
			approvalInvalidated: false,
		};
	}
}

export function reconcileReviewStatus({ reviews, reviewers, authorLogin, headSha }) {
	if (!reviewers || reviewers.size === 0) return "unknown";
	const lowerReviewers = new Set([...reviewers].map((u) => u.toLowerCase()));
	const lowerAuthor = authorLogin?.toLowerCase();

	const latestByReviewer = new Map();
	for (const review of reviews) {
		const login = review.user?.login?.toLowerCase();
		if (!login || !lowerReviewers.has(login) || login === lowerAuthor) continue;
		if (!["APPROVED", "CHANGES_REQUESTED", "DISMISSED"].includes(review.state)) continue;
		const previous = latestByReviewer.get(login);
		if (!previous || new Date(review.submitted_at).getTime() >= new Date(previous.submitted_at).getTime()) {
			latestByReviewer.set(login, review);
		}
	}

	const active = [...latestByReviewer.values()];
	if (active.some((r) => r.state === "CHANGES_REQUESTED" && (!headSha || r.commit_id === headSha))) {
		return "changes_requested";
	}
	if (active.some((r) => r.state === "APPROVED" && Boolean(headSha) && r.commit_id === headSha)) {
		return "approved";
	}
	if (active.some((r) => r.state === "DISMISSED")) {
		return "dismissed";
	}
	return "none";
}

export function duplicateSubmissionNumbers(pullRequests, authorLogin) {
	return pullRequests
		.filter((pullRequest) => pullRequest.state === "open")
		.filter((pullRequest) => pullRequest.user?.login?.toLowerCase() === authorLogin.toLowerCase())
		.filter((pullRequest) => pullRequest.labels?.some((label) => {
			const name = typeof label === "string" ? label : label.name;
			return name?.toLowerCase() === "submission";
		}))
		.map((pullRequest) => pullRequest.number);
}
