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
	reviewers = new Set([...(roles.maintainers ?? []), ...(roles.triagers ?? [])]);
} catch {
	console.warn("review-roles.json not found or invalid; review sync skipped.");
	process.exit(0);
}

await ensureReviewLabels({ owner, repo, token });

if (event.comment && event.issue?.pull_request) {
	const issueNumber = event.issue.number;
	const commenter = event.comment.user?.login;
	const body = event.comment.body?.trim() ?? "";
	const labels = (event.issue.labels ?? []).map((l) => (typeof l === "string" ? l : l.name));

	if (!hasLabel(labels, "Submission")) {
		console.log(`PR #${issueNumber} is not labeled "Submission"; skipping.`);
		process.exit(0);
	}

	if (commenter && reviewers.has(commenter)) {
		if (/^\/needs-author\b/i.test(body) || /^\/request-changes\b/i.test(body)) {
			await setStateLabel({ owner, repo, token, issueNumber, state: "Needs Author" });
			console.log(`Reviewer ${commenter} commanded "Needs Author" on #${issueNumber}.`);
			process.exit(0);
		}
		if (/^\/approve\b/i.test(body) || /^\/ready-maintainer\b/i.test(body)) {
			await setStateLabel({ owner, repo, token, issueNumber, state: "Ready for Maintainer" });
			console.log(`Reviewer ${commenter} commanded "Ready for Maintainer" on #${issueNumber}.`);
			process.exit(0);
		}
		if (/^\/ready-playtest\b/i.test(body)) {
			await setStateLabel({ owner, repo, token, issueNumber, state: "Ready for Playtest" });
			console.log(`Reviewer ${commenter} commanded "Ready for Playtest" on #${issueNumber}.`);
			process.exit(0);
		}
	}

	await syncSinglePR(issueNumber);
	process.exit(0);
}

const dispatchedPr = process.env.SYNC_PR_NUMBER;
if (dispatchedPr) {
	await syncSinglePR(Number(dispatchedPr));
	process.exit(0);
}

await syncAllOpenSubmissions();

async function syncSinglePR(prNumber) {
	const pull = await githubRequest(token, "GET", `/repos/${owner}/${repo}/pulls/${prNumber}`);
	if (pull.state !== "open") return;
	const labels = await getIssueLabels({ owner, repo, token, issueNumber: prNumber });
	if (!hasLabel(labels, "Submission")) return;

	const reviews = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${prNumber}/reviews`);
	const status = reconcileReviewStatus({
		reviews,
		reviewers,
		authorLogin: pull.user?.login,
		headSha: pull.head?.sha,
	});

	await applyReviewStatus({ issueNumber: prNumber, labels, status });
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
							author { login }
							labels(first: 20) {
								nodes { name }
							}
							latestReviews(first: 20) {
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
			const issueNumber = node.number;
			const labels = (node.labels?.nodes ?? []).map((l) => l.name);
			const reviews = (node.latestReviews?.nodes ?? []).map((r) => ({
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

			await applyReviewStatus({ issueNumber, labels, status });
		}
	}
}

async function applyReviewStatus({ issueNumber, labels, status }) {
	if (status === "changes_requested" && !hasLabel(labels, "Needs Author")) {
		await setStateLabel({ owner, repo, token, issueNumber, state: "Needs Author" });
		console.log(`Reconciled #${issueNumber}: set "Needs Author".`);
	} else if (status === "approved" && !hasLabel(labels, "Ready for Maintainer")) {
		await setStateLabel({ owner, repo, token, issueNumber, state: "Ready for Maintainer" });
		console.log(`Reconciled #${issueNumber}: set "Ready for Maintainer".`);
	} else if (status === "none" && hasLabel(labels, "Ready for Maintainer")) {
		await setStateLabel({ owner, repo, token, issueNumber, state: "Ready for Playtest" });
		console.log(`Reconciled #${issueNumber}: approval revoked/dismissed, reset to "Ready for Playtest".`);
	}
}
