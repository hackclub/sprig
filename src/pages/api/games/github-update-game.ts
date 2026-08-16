import type { APIRoute } from "astro";
import { getFullSession, getGame, updateDocument } from "../../../lib/game-saving/account";

export const POST: APIRoute = async ({ request, cookies }) => {
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

		const game = await getGame(gameId);
		if (!game) return new Response("Game does not exist", { status: 404 });

		const session = await getFullSession(cookies);
		if (!session) return new Response("Unauthorized", { status: 401 });
		if (session.user.id !== game.ownerId) {
			return new Response("Can't update a game you don't own", {
				status: 403,
			});
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
