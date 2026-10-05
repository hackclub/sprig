import { describe, expect, it } from "vitest";
import { autoReviewLabelChanges } from "./review-state.mjs";

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
