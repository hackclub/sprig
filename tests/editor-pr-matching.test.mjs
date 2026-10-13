import { describe, expect, it } from "vitest";
import { isEditorPullRequest, EDITOR_BRANCH_PREFIX } from "../src/lib/game-saving/github.ts";

describe("isEditorPullRequest", () => {
	it("matches open editor PR", () => {
		expect(
			isEditorPullRequest(
				{ state: "open", head: { repo: { owner: { login: "testuser" } }, ref: `${EDITOR_BRANCH_PREFIX}12345` } },
				"testuser"
			)
		).toBe(true);
	});

	it("does not match closed editor PR if allowClosed is false", () => {
		expect(
			isEditorPullRequest(
				{ state: "closed", head: { repo: { owner: { login: "testuser" } }, ref: `${EDITOR_BRANCH_PREFIX}12345` } },
				"testuser",
				false
			)
		).toBe(false);
	});

	it("matches closed unmerged editor PR when allowClosed is true", () => {
		expect(
			isEditorPullRequest(
				{ state: "closed", head: { repo: { owner: { login: "testuser" } }, ref: `${EDITOR_BRANCH_PREFIX}12345` } },
				"testuser",
				true
			)
		).toBe(true);
	});

	it("never matches merged editor PR even when allowClosed is true", () => {
		expect(
			isEditorPullRequest(
				{
					state: "closed",
					merged_at: "2026-10-01T00:00:00Z",
					head: { repo: { owner: { login: "testuser" } }, ref: `${EDITOR_BRANCH_PREFIX}12345` },
				},
				"testuser",
				true
			)
		).toBe(false);
	});

	it("never matches non-editor branches", () => {
		expect(
			isEditorPullRequest(
				{ state: "open", head: { repo: { owner: { login: "testuser" } }, ref: "patch-1" } },
				"testuser"
			)
		).toBe(false);
	});
});
