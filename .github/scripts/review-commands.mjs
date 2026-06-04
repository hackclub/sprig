import {
	addLabels,
	ensureReviewLabels,
	getIssueLabels,
	getRepository,
	githubRequest,
	hasLabel,
	readGitHubEvent,
	removeLabel,
	setStateLabel,
} from "./review-utils.mjs";

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required");

const event = readGitHubEvent();
const issue = event.issue;
const comment = event.comment;

if (!issue || !comment || !issue.pull_request) {
	console.log("No pull request comment found; skipping commands.");
	process.exit(0);
}

const body = comment.body.trim();
if (!body.startsWith("/")) {
	console.log("No review command found.");
	process.exit(0);
}

const { owner, repo } = getRepository();
const issueNumber = issue.number;
const actor = comment.user.login;

await ensureReviewLabels({ owner, repo, token });

const [command, ...rest] = body.split(/\s+/);
const text = rest.join(" ").trim();

switch (command.toLowerCase()) {
	case "/claim":
		await claim();
		break;
	case "/unclaim":
		await unclaim();
		break;
	case "/triage-note":
		await triageNote(text);
		break;
	case "/needs-author":
		await needsAuthor(text);
		break;
	case "/ready-maintainer":
		await readyMaintainer(text);
		break;
	case "/ai-concern":
		await aiConcern(text);
		break;
	case "/plagiarism-risk":
		await plagiarismRisk(text);
		break;
	default:
		console.log(`Unknown review command: ${command}`);
}

async function claim() {
	await githubRequest(token, "POST", `/repos/${owner}/${repo}/issues/${issueNumber}/assignees`, {
		assignees: [actor],
	});
	await addLabels({ owner, repo, token, issueNumber, labels: ["Claimed"] });
	await reply(`Claimed by @${actor}.`);
}

async function unclaim() {
	await githubRequest(token, "DELETE", `/repos/${owner}/${repo}/issues/${issueNumber}/assignees`, {
		assignees: [actor],
	});
	const issueData = await githubRequest(token, "GET", `/repos/${owner}/${repo}/issues/${issueNumber}`);
	if ((issueData.assignees ?? []).length === 0) {
		await removeLabel({ owner, repo, token, issueNumber, label: "Claimed" });
	}
	await reply(`Unclaimed by @${actor}.`);
}

async function triageNote(text) {
	if (!text) {
		await reply("Add note text after `/triage-note`.");
		return;
	}
	await addLabels({ owner, repo, token, issueNumber, labels: ["Triaged"] });
	await reply(`Triage note saved for Sheet sync.`);
}

async function needsAuthor(text) {
	await addLabels({ owner, repo, token, issueNumber, labels: ["Triaged"] });
	await setStateLabel({ owner, repo, token, issueNumber, state: "Needs Author" });
	await removeLabel({ owner, repo, token, issueNumber, label: "Claimed" });
	const suffix = text ? `\n\nReason: ${text}` : "";
	await reply(`Marked as Needs Author.${suffix}`);
}

async function readyMaintainer(text) {
	const labels = await getIssueLabels({ owner, repo, token, issueNumber });
	if (hasLabel(labels, "Failed")) {
		await reply("Cannot mark Ready for Maintainer while Failed label is present. Fix auto-review issues first.");
		return;
	}
	await addLabels({ owner, repo, token, issueNumber, labels: ["Triaged"] });
	await setStateLabel({ owner, repo, token, issueNumber, state: "Ready for Maintainer" });
	await removeLabel({ owner, repo, token, issueNumber, label: "Claimed" });
	const suffix = text ? `\n\nNote: ${text}` : "";
	await reply(`Marked as Ready for Maintainer.${suffix}`);
}

async function aiConcern(text) {
	await addLabels({ owner, repo, token, issueNumber, labels: ["AI Concern", "Triaged"] });
	await setStateLabel({ owner, repo, token, issueNumber, state: "Needs Author" });
	const suffix = text ? `\n\nReason: ${text}` : "";
	await reply(`Marked with AI Concern.${suffix}`);
}

async function plagiarismRisk(text) {
	await addLabels({ owner, repo, token, issueNumber, labels: ["Plagiarism Risk", "Triaged"] });
	const suffix = text ? `\n\nReason: ${text}` : "";
	await reply(`Marked with Plagiarism Risk.${suffix}`);
}

async function reply(message) {
	await githubRequest(token, "POST", `/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
		body: `<!-- sprig-review-command -->\n${message}`,
	});
}
