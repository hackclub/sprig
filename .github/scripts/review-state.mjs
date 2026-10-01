import { hasLabel } from "./review-utils.mjs";

// reviewStatus: "approved" | "changes_requested" | "none" (reviews read, none active) | "unknown" (reviews unreadable).
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
		} else if (hasLabel(labels, "Ready for Maintainer") && eventAction !== "synchronize") {
			targetState = "Ready for Maintainer";
		}

		add.add(targetState);
		if (targetState !== "Needs Author") remove.add("Needs Author");
		if (targetState !== "Ready for Playtest") remove.add("Ready for Playtest");
		if (targetState !== "Ready for Maintainer") remove.add("Ready for Maintainer");

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
