import { hasLabel } from "./review-utils.mjs";

export function autoReviewLabelChanges({ labels, validationOk, eventAction }) {
	const add = new Set(["Submission"]);
	const remove = new Set();

	if (validationOk) {
		add.add("Verified");
		remove.add("Failed");
		remove.add("Needs Author");

		const keepApproval = hasLabel(labels, "Ready for Maintainer") && eventAction !== "synchronize";
		const state = keepApproval ? "Ready for Maintainer" : "Ready for Playtest";

		add.add(state);
		if (state !== "Ready for Playtest") remove.add("Ready for Playtest");
		if (state !== "Ready for Maintainer") remove.add("Ready for Maintainer");

		if (hasLabel(labels, "Claimed")) add.add("Claimed");

		return {
			add: [...add],
			remove: [...remove].filter((label) => hasLabel(labels, label)),
			state,
			approvalInvalidated: eventAction === "synchronize" && hasLabel(labels, "Ready for Maintainer"),
		};
	} else {
		add.add("Failed");
		add.add("Needs Author");
		remove.add("Verified");
		remove.add("Ready for Playtest");
		remove.add("Ready for Maintainer");

		if (hasLabel(labels, "Claimed")) add.add("Claimed");

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
