import { describe, expect, it } from "vitest";
import {
	buildLatestWarning,
	buildOlderCheckDetail,
	buildOlderNotice,
	findDuplicateGroup,
	parseOlderNotice,
} from "./duplicate-detection.mjs";
import { daysBetween } from "./review-utils.mjs";

describe("findDuplicateGroup", () => {
	it("keeps the newest PR and supersedes the older ones", () => {
		const group = findDuplicateGroup(4248, [4244, 4245, 4246]);
		expect(group.isLatest).toBe(true);
		expect(group.latestNumber).toBe(4248);
		expect(group.older).toEqual([4244, 4245, 4246]);
	});

	it("marks an older PR as not the latest", () => {
		const group = findDuplicateGroup(4245, [4244, 4248]);
		expect(group.isLatest).toBe(false);
		expect(group.latestNumber).toBe(4248);
		expect(group.older).toEqual([4244, 4245]);
	});

	it("reports no duplicates for a lone PR", () => {
		const group = findDuplicateGroup(10, []);
		expect(group.duplicates).toEqual([]);
		expect(group.isLatest).toBe(true);
	});

	it("ignores the current PR and repeated numbers in the sibling list", () => {
		const group = findDuplicateGroup(5, [5, 3, 3]);
		expect(group.duplicates).toEqual([3]);
	});
});

describe("older notice", () => {
	it("round-trips the kept PR number and start time", () => {
		const since = "2026-09-30T10:00:00.000Z";
		expect(parseOlderNotice(buildOlderNotice({ number: 4245, latestNumber: 4248, since }))).toEqual({
			latestNumber: 4248,
			since,
		});
	});

	it("frames keeping the newest PR as a suggestion rather than an absolute requirement", () => {
		const notice = buildOlderNotice({ number: 4245, latestNumber: 4248, since: "2026-09-30T10:00:00.000Z" });
		expect(notice).toContain("Usually your newer PR (**#4248**) has your latest changes");
		expect(notice).toContain("check which PR has your best version, keep that one, and close the other");
		expect(notice).toContain("close #4248");

		const checkDetail = buildOlderCheckDetail({ number: 4245, latestNumber: 4248 });
		expect(checkDetail).toContain("keep the PR with your best version and close the other");
		expect(checkDetail).toContain("each author can only have one open submission at a time");

		const warning = buildLatestWarning({ older: [4244, 4245] });
		expect(warning).toContain('labeled "Multiple Submissions"');
		expect(warning).toContain("please keep only one game submission open at a time");
		expect(warning).toContain("check which PR has your best version, keep that one, and close the others");
	});

	it("ignores notices without a marker", () => {
		expect(parseOlderNotice("hello")).toBeNull();
	});
});

describe("daysBetween", () => {
	it("returns 0 for invalid date strings or falsy values", () => {
		expect(daysBetween("invalid-date")).toBe(0);
		expect(daysBetween("")).toBe(0);
		expect(daysBetween(null)).toBe(0);
		expect(daysBetween(undefined)).toBe(0);
	});

	it("calculates positive day difference correctly", () => {
		const past = new Date(Date.now() - 3 * 86_400_000).toISOString();
		expect(daysBetween(past)).toBe(3);
		expect(daysBetween("2026-10-01T00:00:00Z", "2026-10-04T00:00:00Z")).toBe(3);
	});
});
