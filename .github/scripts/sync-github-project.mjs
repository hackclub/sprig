import {
	currentStateFromLabels,
	daysBetween,
	getRepository,
	githubPaginated,
	githubRequest,
	hasLabel,
	nextActionFromState,
} from "./review-utils.mjs";

const token = process.env.GITHUB_TOKEN || process.env.PROJECT_GITHUB_TOKEN;
const projectUrl = process.env.GITHUB_PROJECT_URL;

if (!token) throw new Error("GITHUB_TOKEN or PROJECT_GITHUB_TOKEN is required");
if (!projectUrl) {
	console.log("GITHUB_PROJECT_URL not configured; skipping Project sync.");
	process.exit(0);
}

const { owner, repo } = getRepository();

// Extract project owner and number from URL: e.g. https://github.com/users/SSoggyTacoMan/projects/1
const match = projectUrl.match(/github\.com\/(users|orgs)\/([^/]+)\/projects\/(\d+)/);
if (!match) throw new Error("Invalid GITHUB_PROJECT_URL format");
const projectOwnerType = match[1]; // users or orgs
const projectOwnerLogin = match[2];
const projectNumber = parseInt(match[3], 10);

async function runGraphQL(query, variables) {
	const response = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
	});
	const data = await response.json();
	if (data.errors) {
		throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
	}
	return data.data;
}

async function getProjectDetails() {
	const queryType = projectOwnerType === "users" ? "user" : "organization";
	const query = `
		query($owner: String!, $number: Int!) {
			${queryType}(login: $owner) {
				projectV2(number: $number) {
					id
					fields(first: 50) {
						nodes {
							... on ProjectV2Field { id name dataType }
							... on ProjectV2SingleSelectField { id name dataType options { id name } }
							... on ProjectV2IterationField { id name dataType }
						}
					}
				}
			}
		}
	`;
	const data = await runGraphQL(query, { owner: projectOwnerLogin, number: projectNumber });
	const project = data[queryType].projectV2;
	if (!project) throw new Error("Project not found");
	
	const fields = {};
	for (const field of project.fields.nodes) {
		if (!field.name) continue;
		fields[field.name] = field;
	}
	return { projectId: project.id, fields };
}

async function addItemToProject(projectId, contentId) {
	const query = `
		mutation($projectId: ID!, $contentId: ID!) {
			addProjectV2ItemById(input: { projectId: $projectId, contentId: $contentId }) {
				item { id }
			}
		}
	`;
	const data = await runGraphQL(query, { projectId, contentId });
	return data.addProjectV2ItemById.item.id;
}

async function updateItemField(projectId, itemId, field, value) {
	if (!field || !value) return;
	
	let valueInput;
	if (field.dataType === "TEXT") {
		valueInput = { text: value.toString() };
	} else if (field.dataType === "NUMBER") {
		valueInput = { number: Number(value) };
	} else if (field.dataType === "SINGLE_SELECT") {
		const option = field.options?.find(o => o.name === value);
		if (!option) return; // Invalid option
		valueInput = { singleSelectOptionId: option.id };
	} else {
		return; // Unsupported for now
	}

	const query = `
		mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: ProjectV2FieldValue!) {
			updateProjectV2ItemFieldValue(input: {
				projectId: $projectId,
				itemId: $itemId,
				fieldId: $fieldId,
				value: $value
			}) {
				projectV2Item { id }
			}
		}
	`;
	await runGraphQL(query, { projectId, itemId, fieldId: field.id, value: valueInput });
}

// Reusing logic from sync-review-sheet.mjs
async function collectPullRequests() {
	const openPulls = await githubPaginated(token, `/repos/${owner}/${repo}/pulls?state=open&sort=created&direction=asc`);
	
	// Fetch the last 100 closed PRs (merged or unmerged)
	const closedPulls = await githubRequest(token, "GET", `/repos/${owner}/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=100`);
	
	return [...openPulls, ...(closedPulls || [])];
}

function isBot(user) {
	if (!user || !user.login) return true;
	const login = user.login.toLowerCase();
	return login.endsWith("[bot]") || login === "chatgpt-codex-connector" || login.includes("github-actions");
}

function latestReview(reviews) {
	return [...reviews]
		.filter((review) => !isBot(review.user))
		.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
		.find((review) => ["APPROVED", "CHANGES_REQUESTED", "COMMENTED"].includes(review.state));
}

function formatReviewDecision(state) {
	switch (state) {
		case "APPROVED": return "Approved";
		case "CHANGES_REQUESTED": return "Changes Requested";
		case "COMMENTED": return "Commented";
		default: return "";
	}
}



function parseAutoReview(comments) {
	const comment = [...comments]
		.reverse()
		.find((item) => item.body?.includes("<!-- sprig-auto-review -->"));
	const body = comment?.body ?? "";
	return {
		playLink: firstMarkdownLink(body, "Play in Sprig Editor"),
		rawLink: firstMarkdownLink(body, "View Raw"),
		screenshotLink: firstMarkdownLink(body, "View Screenshot"),
		similarity: body.match(/Similarity:\s*(\d+%)/)?.[1] ?? "",
	};
}

function firstMarkdownLink(markdown, label) {
	const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
	return markdown.match(new RegExp(String.raw`\[${escaped}\]\(([^)]+)\)`))?.[1] ?? "";
}

async function main() {
	console.log("Fetching project details...");
	const { projectId, fields } = await getProjectDetails();
	
	console.log("Collecting pull requests...");
	const pulls = await collectPullRequests();

	for (const pullRequest of pulls) {
		// EC10 fix: use labels already on the PR object instead of making a redundant /issues/{n} API call
		const labels = (pullRequest.labels ?? []).map((label) => typeof label === "string" ? label : label.name);
		
		// Only sync valid submissions
		if (!hasLabel(labels, "Submission")) continue;

		console.log(`Syncing PR #${pullRequest.number}...`);
		const reviews = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${pullRequest.number}/reviews`);
		const comments = await githubPaginated(token, `/repos/${owner}/${repo}/issues/${pullRequest.number}/comments`);
		
		const state = currentStateFromLabels(labels, pullRequest);
		const lastReview = latestReview(reviews);
		const autoReview = parseAutoReview(comments);

		const customNote = lastReview?.body || "";
		const nextAction = nextActionFromState(state, labels);
		const displayAction = customNote ? `${nextAction}: ${customNote}` : nextAction;

		const mappedData = {
			"PR #": pullRequest.number,
			"PR URL": pullRequest.html_url,
			"Submitter": pullRequest.user.login,
			"Review State": state,
			"Next Action": displayAction,
			"Triager": lastReview?.user?.login ?? "",
			"Review Decision": formatReviewDecision(lastReview?.state ?? ""),
			"Triage Note": customNote,
			"Age Days": daysBetween(pullRequest.created_at),
			"Play Link": autoReview.playLink ?? "",
			"Raw Link": autoReview.rawLink ?? "",
		};

		try {
			// Get node ID for PR
			const prNodeId = pullRequest.node_id;
			const itemId = await addItemToProject(projectId, prNodeId);

			for (const [key, value] of Object.entries(mappedData)) {
				await updateItemField(projectId, itemId, fields[key], value);
			}
			console.log(`Successfully synced PR #${pullRequest.number}`);
		} catch (err) {
			console.error(`Failed to sync PR #${pullRequest.number}:`, err.message);
		}
	}
	console.log("Done!");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
