import { hasLabel } from "./review-utils.mjs";

export function autoReviewLabelChanges({ labels, validationOk, eventAction }) {
	const add = new Set(["Submission"]);
	const remove = new Set();

	if (validationOk) {
		add.add("Verified");
		add.add("Ready for Playtest");
		remove.add("Failed");
		remove.add("Needs Author");
		remove.add("Ready for Maintainer");
	} else {
		add.add("Failed");
		add.add("Needs Author");
		remove.add("Verified");
		remove.add("Ready for Playtest");
		remove.add("Ready for Maintainer");
	}

	// "Claimed" is owned by the assigned/unassigned handlers, which run in their own concurrency lane.
	// Never copy it from this label snapshot: a concurrent unassign would be undone by a stale read.

	return {
		add: [...add],
		remove: [...remove].filter((label) => hasLabel(labels, label)),
		state: validationOk ? "Ready for Playtest" : "Needs Author",
		approvalInvalidated: eventAction === "synchronize" && hasLabel(labels, "Ready for Maintainer"),
	};
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
