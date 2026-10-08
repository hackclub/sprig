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
		expect(notice).toContain("We suggest keeping your newest PR (**#4248**)");
		expect(notice).toContain("you can keep whichever PR you prefer");
		expect(notice).toContain("close #4248 instead");

		const checkDetail = buildOlderCheckDetail({ number: 4245, latestNumber: 4248 });
		expect(checkDetail).toContain("We suggest keeping #4248");
		expect(checkDetail).toContain("you can keep whichever PR you prefer");

		const warning = buildLatestWarning({ older: [4244, 4245] });
		expect(warning).toContain("We suggest keeping this PR");
		expect(warning).toContain("you can keep whichever PR you prefer");
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
	});
});
