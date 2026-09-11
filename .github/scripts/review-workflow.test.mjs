import { describe, expect, it } from "vitest";
import { buildSubmissionManifest } from "./submission-manifest.mjs";
import { currentStateFromLabels } from "./review-utils.mjs";
import { autoReviewLabelChanges, duplicateSubmissionNumbers } from "./review-state.mjs";

const file = (filename, status = "added") => ({ filename, status });
const valid = (labels = [], eventAction = "opened") => autoReviewLabelChanges({ labels, validationOk: true, eventAction });
const failed = (labels = [], eventAction = "opened") => autoReviewLabelChanges({ labels, validationOk: false, eventAction });

describe("submission review workflow transitions", () => {
	it("new submission: opened, valid PR becomes ready for playtest", () => {
		expect(valid().state).toBe("Ready for Playtest");
		expect(valid().add).toContain("Verified");
	});

	it("failed submission: opened, invalid PR waits for author", () => {
		const changes = failed();
		expect(changes.state).toBe("Needs Author");
		expect(changes.add).toContain("Failed");
	});

	it("fixed submission: failed PR becomes ready after a valid fix", () => {
		const changes = valid(["Submission", "Failed", "Needs Author"]);
		expect(changes.state).toBe("Ready for Playtest");
		expect(changes.remove).toEqual(expect.arrayContaining(["Failed", "Needs Author"]));
	});

	it("approved submission + new commit: approval is invalidated", () => {
		const changes = valid(["Submission", "Verified", "Ready for Maintainer"], "synchronize");
		expect(changes.approvalInvalidated).toBe(true);
		expect(changes.remove).toContain("Ready for Maintainer");
		expect(changes.state).toBe("Ready for Playtest");
	});

	it("changes requested + new commit: author fix returns to playtest", () => {
		const changes = valid(["Submission", "Failed", "Needs Author"], "synchronize");
		expect(changes.remove).toContain("Needs Author");
		expect(changes.state).toBe("Ready for Playtest");
	});

	it("claimed + new commit: claim remains, approval does not", () => {
		const changes = valid(["Submission", "Claimed", "Ready for Maintainer"], "synchronize");
		expect(changes.add).toContain("Claimed");
		expect(changes.remove).toContain("Ready for Maintainer");
	});

	it("closed + reopened: closed PR wins, reopened PR resumes its label state", () => {
		expect(currentStateFromLabels(["Ready for Maintainer"], { closed_at: "2026-09-01" })).toBe("Closed");
		expect(currentStateFromLabels(["Ready for Playtest"], { closed_at: null })).toBe("Ready for Playtest");
	});

	it("draft + ready_for_review: ready event enters automated review", () => {
		// ready_for_review arrives with draft=false; the same validation transition applies.
		expect(valid([], "ready_for_review").state).toBe("Ready for Playtest");
	});

	it("multiple submissions: open submission PRs by one author are duplicates", () => {
		const pullRequests = [
			{ number: 101, state: "open", user: { login: "author" }, labels: [{ name: "Submission" }] },
			{ number: 102, state: "open", user: { login: "author" }, labels: [{ name: "submission" }] },
			{ number: 103, state: "closed", user: { login: "author" }, labels: [{ name: "Submission" }] },
			{ number: 104, state: "open", user: { login: "someone-else" }, labels: [{ name: "Submission" }] },
		];
		expect(duplicateSubmissionNumbers(pullRequests, "author")).toEqual([101, 102]);
	});
});

describe("submission manifest validation", () => {
	it("renamed game: recognizes the new safe path and previous path", () => {
		const manifest = buildSubmissionManifest([{ ...file("games/new-name.js", "renamed"), previous_filename: "games/old-name.js" }]);
		expect(manifest.gameFiles).toHaveLength(1);
		expect(manifest.disallowedFiles).toHaveLength(0);
		expect(manifest.renamedFiles).toHaveLength(1);
		expect(manifest.files[0].previousFilename).toBe("games/old-name.js");
	});

	it("modified existing game: accepts an in-place game change", () => {
		const manifest = buildSubmissionManifest([file("games/existing-game.js", "modified")]);
		expect(manifest.gameFiles).toHaveLength(1);
		expect(manifest.changedNonAddedFiles).toHaveLength(0);
	});

	it("keeps unrelated files out of the submission manifest", () => {
		const manifest = buildSubmissionManifest([
			file("games/new-game.js"),
			file("README.md", "modified"),
			file("games/img/new-game.png"),
		]);
		expect(manifest.disallowedFiles.map((entry) => entry.filename)).toEqual(["README.md"]);
		expect(manifest.imageFiles).toHaveLength(1);
	});
});
