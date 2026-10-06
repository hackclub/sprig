import { describe, expect, it } from "vitest";
import { autoReviewLabelChanges, reconcileReviewStatus } from "./review-state.mjs";

describe("autoReviewLabelChanges", () => {
	it("sets Ready for Playtest on passing validation for new submissions", () => {
		const changes = autoReviewLabelChanges({
			labels: [],
			validationOk: true,
			eventAction: "opened",
		});
		expect(changes.state).toBe("Ready for Playtest");
		expect(changes.add).toContain("Ready for Playtest");
		expect(changes.add).toContain("Verified");
		expect(changes.remove).not.toContain("Ready for Maintainer");
		expect(changes.approvalInvalidated).toBe(false);
	});

	it("preserves Ready for Maintainer on passing validation for non-synchronize events", () => {
		const changes = autoReviewLabelChanges({
			labels: ["Submission", "Verified", "Ready for Maintainer"],
			validationOk: true,
			eventAction: "workflow_dispatch",
		});
		expect(changes.state).toBe("Ready for Maintainer");
		expect(changes.add).toContain("Ready for Maintainer");
		expect(changes.add).not.toContain("Ready for Playtest");
		expect(changes.remove).not.toContain("Ready for Maintainer");
		expect(changes.approvalInvalidated).toBe(false);
	});

	it("invalidates Ready for Maintainer and resets to Ready for Playtest on synchronize", () => {
		const changes = autoReviewLabelChanges({
			labels: ["Submission", "Verified", "Ready for Maintainer"],
			validationOk: true,
			eventAction: "synchronize",
		});
		expect(changes.state).toBe("Ready for Playtest");
		expect(changes.add).toContain("Ready for Playtest");
		expect(changes.remove).toContain("Ready for Maintainer");
		expect(changes.approvalInvalidated).toBe(true);
	});

	it("removes Ready for Maintainer and sets Needs Author on failed validation", () => {
		const changes = autoReviewLabelChanges({
			labels: ["Submission", "Verified", "Ready for Maintainer"],
			validationOk: false,
			eventAction: "workflow_dispatch",
		});
		expect(changes.state).toBe("Needs Author");
		expect(changes.remove).toContain("Ready for Maintainer");
		expect(changes.add).toContain("Needs Author");
		expect(changes.add).toContain("Failed");
	});

	it("does not preserve Claimed from label snapshot in either branch", () => {
		const passing = autoReviewLabelChanges({
			labels: ["Submission", "Claimed"],
			validationOk: true,
			eventAction: "workflow_dispatch",
		});
		expect(passing.add).not.toContain("Claimed");

		const failing = autoReviewLabelChanges({
			labels: ["Submission", "Claimed"],
			validationOk: false,
			eventAction: "workflow_dispatch",
		});
		expect(failing.add).not.toContain("Claimed");
	});
});

describe("reconcileReviewStatus", () => {
	it("matches reviewer case-insensitively when reviewers set is lowercase", () => {
		const reviewers = new Set(["lucasht22", "ssoggytacoman"]);
		const reviews = [
			{
				user: { login: "LucasHT22" },
				state: "APPROVED",
				submitted_at: "2026-10-01T12:00:00Z",
				commit_id: "sha123",
			},
		];
		const status = reconcileReviewStatus({
			reviews,
			reviewers,
			authorLogin: "contributor",
			headSha: "sha123",
		});
		expect(status).toBe("approved");
	});

	it("ignores author self-review case-insensitively", () => {
		const reviewers = new Set(["lucasht22", "contributor"]);
		const reviews = [
			{
				user: { login: "Contributor" },
				state: "APPROVED",
				submitted_at: "2026-10-01T12:00:00Z",
				commit_id: "sha123",
			},
		];
		const status = reconcileReviewStatus({
			reviews,
			reviewers,
			authorLogin: "contributor",
			headSha: "sha123",
		});
		expect(status).toBe("none");
	});

	it("prioritizes changes requested over earlier approvals", () => {
		const reviewers = new Set(["reviewer1"]);
		const reviews = [
			{
				user: { login: "Reviewer1" },
				state: "APPROVED",
				submitted_at: "2026-10-01T10:00:00Z",
				commit_id: "sha123",
			},
			{
				user: { login: "reviewer1" },
				state: "CHANGES_REQUESTED",
				submitted_at: "2026-10-01T11:00:00Z",
				commit_id: "sha123",
			},
		];
		const status = reconcileReviewStatus({
			reviews,
			reviewers,
			authorLogin: "contributor",
			headSha: "sha123",
		});
		expect(status).toBe("changes_requested");
	});

	it("returns none when review is dismissed or not matching head SHA", () => {
		const reviewers = new Set(["reviewer1"]);
		const reviews = [
			{
				user: { login: "reviewer1" },
				state: "APPROVED",
				submitted_at: "2026-10-01T10:00:00Z",
				commit_id: "oldSha",
			},
		];
		const status = reconcileReviewStatus({
			reviews,
			reviewers,
			authorLogin: "contributor",
			headSha: "newSha",
		});
		expect(status).toBe("none");
	});
});
