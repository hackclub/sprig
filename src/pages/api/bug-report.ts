import { APIRoute } from "astro"


export const post: APIRoute = async ({ request }) => {
	const AIRTABLE_PAT = process.env.AIRTABLE_TOKEN; // get the airtable base personal access token
	const AIRTABLE_BASE = process.env.STUCK_AIRTABLE_BASE; // get the airtable base id

	const payload = await request.json();

	// create a new record in airtable with the payload data
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
						Selection: payload.selection,
						Email: payload.email,
						"Error Log": JSON.stringify(payload.error),
						"Session Length": payload.sessionLength,
						Code: payload.code,
						"Bug category": payload.category,
						Description: payload.description
					}
				}
			]
		})
	});

	if (response.status != 200) {
		console.log(response)
		console.log("Failed uploading to bug airtable db!")
	}
	const data = await response.json();
	const resp = new Response(JSON.stringify(data), { status: response.status })
	return resp
}
