import assert from "node:assert";
import { isEditorPullRequest, EDITOR_BRANCH_PREFIX } from "../src/lib/game-saving/github.ts";

// 1. Open editor PR matches
assert.strictEqual(
	isEditorPullRequest(
		{ state: "open", head: { repo: { owner: { login: "testuser" } }, ref: `${EDITOR_BRANCH_PREFIX}12345` } },
		"testuser"
	),
	true
);

// 2. Closed editor PR does not match if allowClosed is false
assert.strictEqual(
	isEditorPullRequest(
		{ state: "closed", head: { repo: { owner: { login: "testuser" } }, ref: `${EDITOR_BRANCH_PREFIX}12345` } },
		"testuser",
		false
	),
	false
);

// 3. Closed unmerged editor PR matches when allowClosed is true
assert.strictEqual(
	isEditorPullRequest(
		{ state: "closed", head: { repo: { owner: { login: "testuser" } }, ref: `${EDITOR_BRANCH_PREFIX}12345` } },
		"testuser",
		true
	),
	true
);

// 4. Merged editor PR never matches even when allowClosed is true
assert.strictEqual(
	isEditorPullRequest(
		{
			state: "closed",
			merged_at: "2026-10-01T00:00:00Z",
			head: { repo: { owner: { login: "testuser" } }, ref: `${EDITOR_BRANCH_PREFIX}12345` },
		},
		"testuser",
		true
	),
	false
);

// 5. Non-editor branch never matches
assert.strictEqual(
	isEditorPullRequest(
		{ state: "open", head: { repo: { owner: { login: "testuser" } }, ref: "patch-1" } },
		"testuser"
	),
	false
);

console.log("All editor PR matching checks passed.");
