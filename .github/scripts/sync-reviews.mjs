import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
	ensureReviewLabels,
	getIssueLabels,
	getRepository,
	githubPaginated,
	githubRequest,
	hasLabel,
	readGitHubEvent,
	setStateLabel,
} from "./review-utils.mjs";
import { reconcileReviewStatus } from "./review-state.mjs";

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required");

const { owner, repo } = getRepository();
const event = readGitHubEvent();

if (event.comment && !event.issue?.pull_request) {
	console.log("Issue comment is not on a pull request; skipping review sync.");
	process.exit(0);
}

const rolesPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../review-roles.json");
let reviewers = new Set();
try {
	const roles = JSON.parse(readFileSync(rolesPath, "utf8"));
	reviewers = new Set([...(roles.maintainers ?? []), ...(roles.triagers ?? [])].map((u) => u.toLowerCase()));
} catch {
	console.warn("review-roles.json not found or invalid; review sync skipped.");
	process.exit(0);
}

if (event.comment && event.issue?.pull_request) {
	const issueNumber = event.issue.number;
	if (event.issue.state !== "open") {
		console.log(`PR #${issueNumber} is not open; skipping review command/sync.`);
		process.exit(0);
	}
	if (event.issue.draft) {
		console.log(`PR #${issueNumber} is a draft; skipping review command/sync.`);
		process.exit(0);
	}

	const commenter = event.comment.user?.login;
	const authorLogin = event.issue.user?.login;
	const body = event.comment.body?.trim() ?? "";
	const labels = (event.issue.labels ?? []).map((l) => (typeof l === "string" ? l : l.name));

	if (!hasLabel(labels, "Submission")) {
		console.log(`PR #${issueNumber} is not labeled "Submission"; skipping.`);
		process.exit(0);
	}

	await ensureReviewLabels({ owner, repo, token });

	if (commenter && reviewers.has(commenter.toLowerCase())) {
		if (authorLogin && commenter.toLowerCase() === authorLogin.toLowerCase()) {
			console.log(`Comment by PR author (${commenter}); ignoring commands to prevent self-approval.`);
		} else {
			if (/^\s*\/(?:needs-author|request-changes)\s*$/im.test(body)) {
				await setStateLabel({ owner, repo, token, issueNumber, state: "Needs Author" });
				console.log(`Reviewer ${commenter} commanded "Needs Author" on #${issueNumber}.`);
				process.exit(0);
			}
			if (/^\s*\/(?:approve|ready-maintainer)\s*$/im.test(body)) {
				if (!hasLabel(labels, "Failed")) {
					await setStateLabel({ owner, repo, token, issueNumber, state: "Ready for Maintainer" });
					console.log(`Reviewer ${commenter} commanded "Ready for Maintainer" on #${issueNumber}.`);
				} else {
					console.log(`PR #${issueNumber} has failed checks; ignoring approve command.`);
				}
				process.exit(0);
			}
			if (/^\s*\/ready-playtest\s*$/im.test(body)) {
				if (!hasLabel(labels, "Failed")) {
					await setStateLabel({ owner, repo, token, issueNumber, state: "Ready for Playtest" });
					console.log(`Reviewer ${commenter} commanded "Ready for Playtest" on #${issueNumber}.`);
				} else {
					console.log(`PR #${issueNumber} has failed checks; ignoring ready-playtest command.`);
				}
				process.exit(0);
			}
		}
	}

	await syncSinglePR(issueNumber);
	process.exit(0);
}

await ensureReviewLabels({ owner, repo, token });

const rawDispatched = process.env.SYNC_PR_NUMBER;
const dispatchedPr = rawDispatched ? parseInt(String(rawDispatched).replace(/\D/g, ""), 10) : null;
if (dispatchedPr && !Number.isNaN(dispatchedPr)) {
	await syncSinglePR(dispatchedPr);
	process.exit(0);
}

await syncAllOpenSubmissions();

async function syncSinglePR(prNumber) {
	const pull = await githubRequest(token, "GET", `/repos/${owner}/${repo}/pulls/${prNumber}`);
	if (pull.state !== "open" || pull.draft) return;
	const labels = await getIssueLabels({ owner, repo, token, issueNumber: prNumber });
	if (!hasLabel(labels, "Submission")) return;

	const reviews = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${prNumber}/reviews`);
	const status = reconcileReviewStatus({
		reviews,
		reviewers,
		authorLogin: pull.user?.login,
		headSha: pull.head?.sha,
	});

	await applyReviewStatus({ issueNumber: prNumber, status });
}

async function syncAllOpenSubmissions() {
	let cursor = null;
	let hasNextPage = true;

	while (hasNextPage) {
		const query = `
			query($owner: String!, $repo: String!, $cursor: String) {
				repository(owner: $owner, name: $repo) {
					pullRequests(states: OPEN, first: 50, after: $cursor, labels: ["Submission"]) {
						pageInfo {
							hasNextPage
							endCursor
						}
						nodes {
							number
							headRefOid
							isDraft
							author { login }
							labels(first: 20) {
								nodes { name }
							}
							reviews(last: 50) {
								nodes {
									state
									author { login }
									commit { oid }
									submittedAt
								}
							}
						}
					}
				}
			}
		`;

		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				"X-GitHub-Api-Version": "2022-11-28",
			},
			body: JSON.stringify({ query, variables: { owner, repo, cursor } }),
		});

		if (!response.ok) {
			throw new Error(`GraphQL request failed: ${response.status} ${await response.text()}`);
		}

		const data = await response.json();
		if (data.errors?.length) {
			throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
		}

		const prsData = data.data?.repository?.pullRequests;
		const nodes = prsData?.nodes ?? [];
		hasNextPage = prsData?.pageInfo?.hasNextPage ?? false;
		cursor = prsData?.pageInfo?.endCursor ?? null;

		for (const node of nodes) {
			if (node.isDraft) continue;
			const issueNumber = node.number;
			const labels = (node.labels?.nodes ?? []).map((l) => l.name);
			const reviews = (node.reviews?.nodes ?? []).map((r) => ({
				state: r.state,
				user: { login: r.author?.login },
				commit_id: r.commit?.oid,
				submitted_at: r.submittedAt,
			}));

			const status = reconcileReviewStatus({
				reviews,
				reviewers,
				authorLogin: node.author?.login,
				headSha: node.headRefOid,
			});

			try {
				await applyReviewStatus({ issueNumber, status });
			} catch (err) {
				console.error(`Failed to reconcile #${issueNumber}:`, err.message);
			}
		}
	}
}

async function applyReviewStatus({ issueNumber, status }) {
	const labels = await getIssueLabels({ owner, repo, token, issueNumber });
	if (status === "changes_requested" && !hasLabel(labels, "Needs Author") && !hasLabel(labels, "Stale")) {
		await setStateLabel({ owner, repo, token, issueNumber, state: "Needs Author" });
		console.log(`Reconciled #${issueNumber}: set "Needs Author".`);
	} else if (status === "approved" && !hasLabel(labels, "Failed") && !hasLabel(labels, "Ready for Maintainer")) {
		await setStateLabel({ owner, repo, token, issueNumber, state: "Ready for Maintainer" });
		console.log(`Reconciled #${issueNumber}: set "Ready for Maintainer".`);
	} else if (status === "dismissed") {
		if (hasLabel(labels, "Ready for Maintainer") || (hasLabel(labels, "Needs Author") && !hasLabel(labels, "Failed"))) {
			await setStateLabel({ owner, repo, token, issueNumber, state: "Ready for Playtest" });
			console.log(`Reconciled #${issueNumber}: review dismissed, reset to "Ready for Playtest".`);
		}
	}
}
