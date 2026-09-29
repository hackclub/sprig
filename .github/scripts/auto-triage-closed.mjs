import {
	getRepository,
	githubPaginated,
	githubRequest,
	readGitHubEvent,
} from "./review-utils.mjs";

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required");

const { owner, repo } = getRepository();
const event = readGitHubEvent();
const pullRequest = event.pull_request;

if (!pullRequest) {
	console.log("No pull request in event; exiting.");
	process.exit(0);
}

const submitterLogin = pullRequest.user?.login;
if (!submitterLogin) {
	console.log("No submitter login found; exiting.");
	process.exit(0);
}

console.log(`PR #${pullRequest.number} closed for user ${submitterLogin}. Checking for sibling submissions.`);
const openPulls = await githubPaginated(token, `/repos/${owner}/${repo}/pulls?state=open`);
const siblingPRs = openPulls.filter((pr) => pr.user?.login === submitterLogin && pr.labels?.some((l) => l.name === "Submission"));

for (const sibling of siblingPRs) {
	console.log(`Triggering auto-triage for sibling PR #${sibling.number}`);
	try {
		await githubRequest(token, "POST", `/repos/${owner}/${repo}/actions/workflows/auto-triage.yml/dispatches`, {
			ref: "main",
			inputs: {
				pr_number: String(sibling.number),
				event_action: "synchronize",
			},
		});
	} catch (err) {
		console.error(`Failed to dispatch for PR #${sibling.number}:`, err);
	}
}
