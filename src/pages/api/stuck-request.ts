import { APIRoute } from "astro"


export const post: APIRoute = async ({ request }) => {
	const AIRTABLE_PAT = process.env.AIRTABLE_TOKEN;
	const AIRTABLE_BASE = process.env.STUCK_AIRTABLE_BASE;
	const payload = await request.json();
	const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/Stuck%20Data`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${AIRTABLE_PAT}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			records: [
				{
					fields: {
						"Slack Username": payload.name,
						"Error Log": JSON.stringify(payload.error),
						"Session Length": payload.sessionLength,
						Code: payload.code,
						Category: payload.category,
						Description: payload.description
					}
				}
			]
		})
	});

	const records = await response.json();
	return new Response(records)
}
