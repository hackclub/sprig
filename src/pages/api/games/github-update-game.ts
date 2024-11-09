import type { APIRoute } from "astro";
import { updateDocument } from "../../../lib/game-saving/account";

export const post: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();
		const { gameId, githubPR, isPublished } = body;

		const errors: string[] = [];

		if (typeof gameId !== "string")
			errors.push(`Invalid gameId: ${gameId}`);
		if (typeof githubPR !== "string")
			errors.push(`Invalid githubPR: ${githubPR}`);
		if (typeof isPublished !== "boolean")
			errors.push(`Invalid isPublished: ${isPublished}`);

		if (errors.length > 0) {
			console.error("Validation errors:", errors);
			return new Response(
				JSON.stringify({
					error: "Missing or invalid fields",
					details: errors,
				}),
				{ status: 400 }
			);
		}

		await updateDocument("games", gameId, {
			githubPR,
			isPublished,
		});

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error: any) {
		console.error("Error in API request:", error);
		return new Response(
			JSON.stringify({ error: error.message || "Bad request body" }),
			{ status: 400 }
		);
	}
};