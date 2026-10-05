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

	it("preserves Ready for Maintainer on passing validation for non-synchronize events when status unknown", () => {
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

	it("sets Ready for Maintainer when reviewStatus is approved", () => {
		const changes = autoReviewLabelChanges({
			labels: ["Submission", "Verified"],
			validationOk: true,
			eventAction: "synchronize",
			reviewStatus: "approved",
		});
		expect(changes.state).toBe("Ready for Maintainer");
		expect(changes.add).toContain("Ready for Maintainer");
		expect(changes.approvalInvalidated).toBe(false);
	});

	it("sets Needs Author when reviewStatus is changes_requested", () => {
		const changes = autoReviewLabelChanges({
			labels: ["Submission", "Verified", "Ready for Playtest"],
			validationOk: true,
			eventAction: "workflow_dispatch",
			reviewStatus: "changes_requested",
		});
		expect(changes.state).toBe("Needs Author");
		expect(changes.add).toContain("Needs Author");
		expect(changes.remove).toContain("Ready for Playtest");
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
});

describe("reconcileReviewStatus", () => {
	const reviewers = new Set(["LucasHT22", "SSoggyTacoMan", "Swamstick911"]);
	const headSha = "abc1234";

	it("returns changes_requested when a reviewer requested changes on current head", () => {
		const reviews = [
			{ user: { login: "SSoggyTacoMan" }, state: "CHANGES_REQUESTED", commit_id: headSha, submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("changes_requested");
	});

	it("prioritizes changes_requested over approval from another reviewer", () => {
		const reviews = [
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: headSha, submitted_at: "2026-10-04T09:05:00Z" },
			{ user: { login: "SSoggyTacoMan" }, state: "CHANGES_REQUESTED", commit_id: headSha, submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("changes_requested");
	});

	it("returns approved when a reviewer approved current head and no changes requested", () => {
		const reviews = [
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: headSha, submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("approved");
	});

	it("returns none when approval was on an older commit", () => {
		const reviews = [
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: "olderSha", submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("none");
	});

	it("ignores reviews from PR author and unlisted users", () => {
		const reviews = [
			{ user: { login: "author1" }, state: "APPROVED", commit_id: headSha, submitted_at: "2026-10-04T09:00:00Z" },
			{ user: { login: "randomUser" }, state: "CHANGES_REQUESTED", commit_id: headSha, submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("none");
	});

	it("returns dismissed when approval was dismissed", () => {
		const reviews = [
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: headSha, submitted_at: "2026-10-04T09:00:00Z" },
			{ user: { login: "LucasHT22" }, state: "DISMISSED", commit_id: headSha, submitted_at: "2026-10-04T09:10:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("dismissed");
	});

	it("returns none when a dismissal was on an older commit", () => {
		const reviews = [
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: "olderSha", submitted_at: "2026-10-04T09:00:00Z" },
			{ user: { login: "LucasHT22" }, state: "DISMISSED", commit_id: "olderSha", submitted_at: "2026-10-04T09:10:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("none");
	});

	it("matches reviewer and author logins case-insensitively", () => {
		const reviews = [
			{ user: { login: "ssoggytacoman" }, state: "CHANGES_REQUESTED", commit_id: headSha, submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "AUTHOR1", headSha });
		expect(status).toBe("changes_requested");
	});

	it("returns unknown when reviewers set is empty or undefined", () => {
		expect(reconcileReviewStatus({ reviews: [], reviewers: null, authorLogin: "author1", headSha })).toBe("unknown");
	});
});
