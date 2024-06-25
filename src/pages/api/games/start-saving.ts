import type { APIRoute } from "astro";
import {
	getGame,
	getSession,
	updateDocument,
} from "../../../lib/game-saving/account";
import { updateEmailListLastModifiedTime } from "../../../lib/game-saving/email";
import { Timestamp } from "firebase-admin/firestore";

/* This route is used to start saving a game. The way this is done is update some fields on the database,
and another service will listen to these changes and start savin the game code to the db by connecting
to the yjs room */
export const post: APIRoute = async ({ request, cookies }) => {
	let gameId: string;
	let tutorialName: string | undefined;
	try {
		const body = await request.json();
		if (typeof body.gameId !== "string") throw "Missing/invalid game id";
		gameId = body.gameId;
		tutorialName =
			typeof body.tutorialName === "string"
				? body.tutorialName
				: undefined;
	} catch (error) {
		console.log(error)
		return new Response(
			typeof error === "string" ? error : "Bad request body",
			{ status: 400 }
		);
	}

	const game = await getGame(gameId);
	if (!game) return new Response("Game does not exist", { status: 404 });

	let trackingId = game.id;
	let trackingType = "game";

	if (!game.unprotected) {
		const session = await getSession(cookies);
		if (!session) return new Response("Unauthorized", { status: 401 });
		if (session.user.id !== game.ownerId)
			return new Response(`Can't edit a game you don't own`, {
				status: 403,
			});
		trackingId = session.user.id;
		trackingType = "user";

		await updateEmailListLastModifiedTime(session.user, new Date());
	}
	const session = await getSession(cookies);
	if (!session) return new Response("Unauthorized", { status: 401 });
	if (session.user.id !== game.ownerId)
		return new Response(`Can't edit a game you don't own`, {
			status: 403,
		});

	try{
		updateDocument("games", gameId, { 
			tutorialName: tutorialName ?? "",
			modifiedAt: Timestamp.now(),
		});
		return new Response(JSON.stringify({}), { status: 200 })
	} catch (error) {
		return new Response("Internal server error", { status: 500 })
	}
};