import {
	currentStateFromLabels,
	daysBetween,
	getRepository,
	githubPaginated,
	githubRequest,
	hasLabel,
	nextActionFromState,
} from "./review-utils.mjs";

const token = process.env.GITHUB_TOKEN;
const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const mainTab = process.env.SPRIG_REVIEW_SHEET_TAB || "All";

if (!token) throw new Error("GITHUB_TOKEN is required");
if (!spreadsheetId || !serviceAccountJson) {
	console.log("Google Sheet secrets not configured; skipping Sheet sync.");
	process.exit(0);
}

const { owner, repo } = getRepository();
const sheets = await makeSheetsClient(serviceAccountJson);

const columns = [
	"PR #",
	"PR URL",
	"Title",
	"Submitter",
	"State",
	"Next Action",
	"Triager",
	"Reviewer",
	"Review Decision",
	"Triage Note",
	"Internal Note",
	"Age Days",
	"Last Activity",
	"Play Link",
	"Raw Link",
	"Screenshot Link",
	"Similarity %",
	"Labels",
	"Merged At",
	"Closed At",
];

let sheetIdMap = {};

await ensureSheets();
const existingRows = await readExistingRows();
const syncedRows = await buildRows(existingRows);
await writeRows(syncedRows);
await writeFilteredTabs();
await writeMetrics();

async function makeSheetsClient(rawCredentials) {
	const { google } = await import("googleapis");
	const credentials = parseCredentials(rawCredentials);
	const auth = new google.auth.GoogleAuth({
		credentials,
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});
	return google.sheets({ version: "v4", auth });
}

function parseCredentials(value) {
	try {
		return JSON.parse(value);
	} catch {
		return JSON.parse(Buffer.from(value, "base64").toString("utf8"));
	}
}

async function ensureSheets() {
	const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
	const existing = new Set(spreadsheet.data.sheets.map((sheet) => sheet.properties.title));
	const requiredTabs = [
		mainTab,
		"Ready for Playtest",
		"Claimed",
		"Needs Author",
		"Ready for Maintainer",
		"Stale",
		"Merged",
		"Metrics",
	];
	const requests = requiredTabs
		.filter((title) => !existing.has(title))
		.map((title) => ({ addSheet: { properties: { title } } }));

	if (requests.length) {
		await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
		spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
	}

	sheetIdMap = Object.fromEntries(spreadsheet.data.sheets.map((s) => [s.properties.title, s.properties.sheetId]));

	await sheets.spreadsheets.values.update({
		spreadsheetId,
		range: quoteRange(mainTab, "A1"),
		valueInputOption: "RAW",
		requestBody: { values: [columns] },
	});
}

async function readExistingRows() {
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId,
		range: quoteRange(mainTab, `A2:${columnLetter(columns.length)}10000`),
	});
	const rows = response.data.values ?? [];
	const map = new Map();
	for (const row of rows) {
		const prNumber = Number(row[0]);
		if (!Number.isFinite(prNumber)) continue;
		map.set(prNumber, rowToObject(row));
	}
	return map;
}

function rowToObject(row) {
	return Object.fromEntries(columns.map((column, index) => [column, row[index] ?? ""]));
}

async function buildRows(existingRows) {
	const pulls = await collectPullRequests(existingRows);
	const nextRows = new Map(existingRows);

	for (const pullRequest of pulls) {
		const issue = await githubRequest(token, "GET", `/repos/${owner}/${repo}/issues/${pullRequest.number}`);
		const labels = (issue.labels ?? []).map((label) => label.name);
		if (!hasLabel(labels, "Submission") && !existingRows.has(pullRequest.number)) continue;

		const reviews = await githubPaginated(token, `/repos/${owner}/${repo}/pulls/${pullRequest.number}/reviews`);
		const comments = await githubPaginated(token, `/repos/${owner}/${repo}/issues/${pullRequest.number}/comments`);
		const state = currentStateFromLabels(labels, pullRequest);
		const lastReview = latestReview(reviews);
		const commandNote = latestReviewerNote(comments);
		const autoReview = parseAutoReview(comments);
		const existing = existingRows.get(pullRequest.number) ?? {};

		nextRows.set(pullRequest.number, {
			"PR #": pullRequest.number,
			"PR URL": pullRequest.html_url,
			Title: pullRequest.title,
			Submitter: pullRequest.user.login,
			State: state,
			"Next Action": nextActionFromState(state, labels),
			Triager: commandNote?.user ?? lastReview?.user?.login ?? existing.Triager ?? "",
			Reviewer: (issue.assignees ?? []).filter(u => !isBot(u)).map((user) => user.login).join(", "),
			"Review Decision": formatReviewDecision(lastReview?.state ?? ""),
			"Triage Note": commandNote?.text ?? existing["Triage Note"] ?? "",
			"Internal Note": existing["Internal Note"] ?? "",
			"Age Days": daysBetween(pullRequest.created_at),
			"Last Activity": pullRequest.updated_at,
			"Play Link": autoReview.playLink ?? existing["Play Link"] ?? "",
			"Raw Link": autoReview.rawLink ?? existing["Raw Link"] ?? "",
			"Screenshot Link": autoReview.screenshotLink ?? existing["Screenshot Link"] ?? "",
			"Similarity %": autoReview.similarity ?? existing["Similarity %"] ?? "",
			Labels: labels.join(", "),
			"Merged At": pullRequest.merged_at ?? "",
			"Closed At": pullRequest.closed_at ?? "",
		});
	}

	return [...nextRows.values()].sort((a, b) => Number(a["PR #"]) - Number(b["PR #"]));
}

async function collectPullRequests(existingRows) {
	const openPulls = await githubPaginated(token, `/repos/${owner}/${repo}/pulls?state=open&sort=created&direction=asc`);
	const recentCutoff = Date.now() - 90 * 86_400_000;
	const pullMap = new Map();

	for (const pullRequest of openPulls) pullMap.set(pullRequest.number, pullRequest);

	let page = 1;
	for (;;) {
		const closedPage = await githubRequest(
			token,
			"GET",
			`/repos/${owner}/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=100&page=${page}`
		);
		if (!Array.isArray(closedPage) || closedPage.length === 0) break;

		for (const pullRequest of closedPage) {
			const updatedAt = new Date(pullRequest.updated_at).getTime();
			if (updatedAt <= recentCutoff) continue;
			pullMap.set(pullRequest.number, pullRequest);
		}

		const lastUpdated = new Date(closedPage.at(-1).updated_at).getTime();
		if (lastUpdated <= recentCutoff) break;
		if (closedPage.length < 100) break;
		page += 1;
	}

	return [...pullMap.values()];
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
		case "APPROVED":
			return "Approved";
		case "CHANGES_REQUESTED":
			return "Changes Requested";
		case "COMMENTED":
			return "Commented";
		default:
			return "";
	}
}

function latestReviewerNote(comments) {
	const notes = comments
		.map((comment) => {
			const match = comment.body?.match(/^\/(triage-note|needs-author|ready-maintainer|ai-concern|plagiarism-risk)\s*([\s\S]*)/i);
			if (!match) return null;
			const text = match[2].trim();
			if (!text) return null;
			return {
				text,
				user: comment.user?.login ?? "",
				createdAt: comment.created_at,
			};
		})
		.filter(Boolean);

	return notes.filter(note => !isBot({ login: note.user })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] ?? null;
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

async function writeRows(rows) {
	await sheets.spreadsheets.values.clear({
		spreadsheetId,
		range: quoteRange(mainTab, `A2:${columnLetter(columns.length)}10000`),
	});
	if (!rows.length) return;
	await sheets.spreadsheets.values.update({
		spreadsheetId,
		range: quoteRange(mainTab, "A2"),
		valueInputOption: "USER_ENTERED",
		requestBody: { values: rows.map((row) => columns.map((column) => row[column] ?? "")) },
	});
}

async function writeFilteredTabs() {
	const filters = {
		"Ready for Playtest": `E = 'Ready for Playtest'`,
		Claimed: `E = 'Claimed'`,
		"Needs Author": `E = 'Needs Author'`,
		"Ready for Maintainer": `E = 'Ready for Maintainer'`,
		Stale: `E = 'Stale'`,
		Merged: `E = 'Merged'`,
	};
	const lastColumn = columnLetter(columns.length);
	
	for (const [tab, condition] of Object.entries(filters)) {
		const formula = `=QUERY('${mainTab}'!A1:${lastColumn}, "SELECT A, G, E, H, F WHERE ${condition} label F 'Action'", 1)`;
		await sheets.spreadsheets.values.update({
			spreadsheetId,
			range: quoteRange(tab, "A1"),
			valueInputOption: "USER_ENTERED",
			requestBody: { values: [[formula]] },
		});
	}

	const requests = [];
	for (const tab of Object.keys(filters)) {
		const sheetId = sheetIdMap[tab];
		if (sheetId === undefined) continue;

		requests.push({
			repeatCell: {
				range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 5 },
				cell: {
					userEnteredFormat: {
						backgroundColor: { red: 0.176, green: 0.443, blue: 0.302 },
						textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 }, fontFamily: "Roboto" },
					}
				},
				fields: "userEnteredFormat(backgroundColor,textFormat)"
			}
		});

		requests.push({
			repeatCell: {
				range: { sheetId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 5 },
				cell: {
					userEnteredFormat: {
						verticalAlignment: "MIDDLE",
						wrapStrategy: "WRAP",
						textFormat: { fontFamily: "Roboto" }
					}
				},
				fields: "userEnteredFormat(verticalAlignment,wrapStrategy,textFormat)"
			}
		});

		requests.push({
			repeatCell: {
				range: { sheetId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 },
				cell: {
					userEnteredFormat: {
						textFormat: { fontSize: 24, bold: true, fontFamily: "Roboto" }
					}
				},
				fields: "userEnteredFormat(textFormat)"
			}
		});

		requests.push({
			setDataValidation: {
				range: { sheetId, startRowIndex: 1, startColumnIndex: 2, endColumnIndex: 3 },
				rule: {
					condition: {
						type: "ONE_OF_LIST",
						values: [
							{ userEnteredValue: "Ready for Playtest" },
							{ userEnteredValue: "Needs Author" },
							{ userEnteredValue: "Ready for Maintainer" },
							{ userEnteredValue: "Claimed" },
							{ userEnteredValue: "Merged" },
							{ userEnteredValue: "Stale" },
							{ userEnteredValue: "Triaged" },
						]
					},
					showCustomUi: true,
					strict: false
				}
			}
		});

		const widths = [100, 200, 180, 150, 400];
		for (let i = 0; i < widths.length; i++) {
			requests.push({
				updateDimensionProperties: {
					range: { sheetId, dimension: "COLUMNS", startIndex: i, endIndex: i + 1 },
					properties: { pixelSize: widths[i] },
					fields: "pixelSize"
				}
			});
		}
	}

	if (requests.length) {
		await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
	}
}

async function writeMetrics() {
	const values = [
		["Metric", "Value"],
		["Ready for Playtest", `=COUNTIF('${mainTab}'!E:E,"Ready for Playtest")`],
		["Claimed", `=COUNTIF('${mainTab}'!E:E,"Claimed")`],
		["Needs Author", `=COUNTIF('${mainTab}'!E:E,"Needs Author")`],
		["Ready for Maintainer", `=COUNTIF('${mainTab}'!E:E,"Ready for Maintainer")`],
		["Stale", `=COUNTIF('${mainTab}'!E:E,"Stale")`],
		["Merged", `=COUNTIF('${mainTab}'!E:E,"Merged")`],
		["Oldest Active PR Age", `=MAX(FILTER('${mainTab}'!L:L,'${mainTab}'!E:E<>"Merged",'${mainTab}'!E:E<>"Closed"))`],
	];
	await sheets.spreadsheets.values.update({
		spreadsheetId,
		range: quoteRange("Metrics", "A1"),
		valueInputOption: "USER_ENTERED",
		requestBody: { values },
	});
}

function quoteRange(sheetName, a1) {
	return `'${sheetName.replaceAll("'", "''")}'!${a1}`;
}

function columnLetter(index) {
	let value = "";
	let current = index;
	while (current > 0) {
		const remainder = (current - 1) % 26;
		value = String.fromCodePoint(65 + remainder) + value;
		current = Math.floor((current - 1) / 26);
	}
	return value;
}
