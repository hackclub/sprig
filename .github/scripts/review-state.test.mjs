import { describe, expect, it, vi } from "vitest";
import { autoReviewLabelChanges, getActiveReviews, reconcileReviewStatus } from "./review-state.mjs";
import { isReviewCommitOutdated } from "./review-utils.mjs";

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

	it("resets Ready for Maintainer to Ready for Playtest when reviewStatus is none", () => {
		const changes = autoReviewLabelChanges({
			labels: ["Submission", "Verified", "Ready for Maintainer"],
			validationOk: true,
			eventAction: "edited",
			reviewStatus: "none",
		});
		expect(changes.state).toBe("Ready for Playtest");
		expect(changes.remove).toContain("Ready for Maintainer");
	});

	it("resets Ready for Maintainer to Ready for Playtest when reviewStatus is dismissed", () => {
		const changes = autoReviewLabelChanges({
			labels: ["Submission", "Verified", "Ready for Maintainer"],
			validationOk: true,
			eventAction: "edited",
			reviewStatus: "dismissed",
		});
		expect(changes.state).toBe("Ready for Playtest");
		expect(changes.remove).toContain("Ready for Maintainer");
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

	it("resets Needs Author to Ready for Playtest on synchronize when reviewStatus is none", () => {
		const changes = autoReviewLabelChanges({
			labels: ["Submission", "Verified", "Needs Author"],
			validationOk: true,
			eventAction: "synchronize",
			reviewStatus: "none",
		});
		expect(changes.state).toBe("Ready for Playtest");
		expect(changes.add).toContain("Ready for Playtest");
		expect(changes.remove).toContain("Needs Author");
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

	it("returns none when changes were requested on an earlier commit", () => {
		const reviews = [
			{ user: { login: "SSoggyTacoMan" }, state: "CHANGES_REQUESTED", commit_id: "olderSha", submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("none");
	});

	it("returns approved when approval is on headSha and changes were requested on an earlier commit", () => {
		const reviews = [
			{ user: { login: "SSoggyTacoMan" }, state: "CHANGES_REQUESTED", commit_id: "olderSha", submitted_at: "2026-10-04T09:00:00Z" },
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: headSha, submitted_at: "2026-10-04T09:05:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("approved");
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

	it("returns dismissed even when a dismissal was on an older commit", () => {
		const reviews = [
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: "olderSha", submitted_at: "2026-10-04T09:00:00Z" },
			{ user: { login: "LucasHT22" }, state: "DISMISSED", commit_id: "olderSha", submitted_at: "2026-10-04T09:10:00Z" },
		];
		const status = reconcileReviewStatus({ reviews, reviewers, authorLogin: "author1", headSha });
		expect(status).toBe("dismissed");
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

	it("preserves changes_requested across non-game commits when isCommitOutdated is false", () => {
		const reviews = [
			{ user: { login: "SSoggyTacoMan" }, state: "CHANGES_REQUESTED", commit_id: "mergeSha", submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({
			reviews,
			reviewers,
			authorLogin: "author1",
			headSha,
			isCommitOutdated: (cid) => cid !== "mergeSha",
		});
		expect(status).toBe("changes_requested");
	});

	it("preserves approved across non-game commits when isCommitOutdated is false", () => {
		const reviews = [
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: "mergeSha", submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({
			reviews,
			reviewers,
			authorLogin: "author1",
			headSha,
			isCommitOutdated: (cid) => cid !== "mergeSha",
		});
		expect(status).toBe("approved");
	});

	it("resets changes_requested to none when isCommitOutdated is true", () => {
		const reviews = [
			{ user: { login: "SSoggyTacoMan" }, state: "CHANGES_REQUESTED", commit_id: "olderSha", submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({
			reviews,
			reviewers,
			authorLogin: "author1",
			headSha,
			isCommitOutdated: () => true,
		});
		expect(status).toBe("none");
	});

	it("treats null or missing commit_id as outdated even with custom isCommitOutdated", () => {
		const reviews = [
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: null, submitted_at: "2026-10-04T09:00:00Z" },
		];
		const status = reconcileReviewStatus({
			reviews,
			reviewers,
			authorLogin: "author1",
			headSha,
			isCommitOutdated: () => false,
		});
		expect(status).toBe("none");
	});
});

describe("getActiveReviews", () => {
	it("filters out non-reviewers, author, and non-actionable review states", () => {
		const reviews = [
			{ user: { login: "random" }, state: "APPROVED", commit_id: "sha1", submitted_at: "2026-10-04T09:00:00Z" },
			{ user: { login: "author1" }, state: "APPROVED", commit_id: "sha1", submitted_at: "2026-10-04T09:00:00Z" },
			{ user: { login: "SSoggyTacoMan" }, state: "COMMENTED", commit_id: "sha1", submitted_at: "2026-10-04T09:00:00Z" },
			{ user: { login: "SSoggyTacoMan" }, state: "CHANGES_REQUESTED", commit_id: "sha2", submitted_at: "2026-10-04T10:00:00Z" },
			{ user: { login: "LucasHT22" }, state: "APPROVED", commit_id: "sha3", submitted_at: "2026-10-04T11:00:00Z" },
		];
		const active = getActiveReviews({ reviews, reviewers: new Set(["ssoggytacoman", "lucasht22"]), authorLogin: "author1" });
		expect(active).toHaveLength(2);
		expect(active.map((r) => r.user.login)).toEqual(["SSoggyTacoMan", "LucasHT22"]);
	});
});

describe("isReviewCommitOutdated", () => {
	it("returns false when commitId matches headSha or either is missing", async () => {
		expect(await isReviewCommitOutdated({ commitId: "abc", headSha: "abc" })).toBe(false);
		expect(await isReviewCommitOutdated({ commitId: null, headSha: "abc" })).toBe(false);
		expect(await isReviewCommitOutdated({ commitId: "abc", headSha: null })).toBe(false);
	});

	it("returns false when compare diff does not touch submission game files", async () => {
		const originalFetch = globalThis.fetch;
		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			text: async () => JSON.stringify({ files: [{ filename: "README.md" }, { filename: "games/other.js" }] }),
		});

		try {
			const outdated = await isReviewCommitOutdated({
				owner: "hackclub",
				repo: "sprig",
				token: "token",
				prNumber: 123,
				commitId: "sha1",
				headSha: "sha2",
				submissionFiles: [{ filename: "games/my-game.js" }],
			});
			expect(outdated).toBe(false);
		} finally {
			globalThis.fetch = originalFetch;
		}
	});

	it("returns true when compare diff touches submission game files", async () => {
		const originalFetch = globalThis.fetch;
		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			text: async () => JSON.stringify({ files: [{ filename: "games/my-game.js" }] }),
		});

		try {
			const outdated = await isReviewCommitOutdated({
				owner: "hackclub",
				repo: "sprig",
				token: "token",
				prNumber: 123,
				commitId: "sha1",
				headSha: "sha2",
				submissionFiles: [{ filename: "games/my-game.js" }],
			});
			expect(outdated).toBe(true);
		} finally {
			globalThis.fetch = originalFetch;
		}
	});

	it("returns true as safe fallback when compare request throws", async () => {
		const originalFetch = globalThis.fetch;
		globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

		try {
			const outdated = await isReviewCommitOutdated({
				owner: "hackclub",
				repo: "sprig",
				token: "token",
				prNumber: 123,
				commitId: "sha1",
				headSha: "sha2",
				submissionFiles: [{ filename: "games/my-game.js" }],
			});
			expect(outdated).toBe(true);
		} finally {
			globalThis.fetch = originalFetch;
		}
	});
});
