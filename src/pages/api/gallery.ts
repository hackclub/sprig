import type { APIRoute } from "astro";
import {
	GameMetadata,
	getGalleryGames,
} from "../../lib/game-saving/gallery";

export const get: APIRoute = async ({ request }) => {
	const params = new URL(request.url).searchParams;

	let games = getGalleryGames().map((game) => ({
		...game,
		title: game.title.trim(),
		lowerCaseTitle: game.title.trim().toLowerCase(),
		lowerCaseAuthor: game.author.toLowerCase(),
	}));

	games = games
		.sort((a, b) => Date.parse(b.addedOn) - Date.parse(a.addedOn))
		.slice(0, 10)
		.map((game) => ({ ...game, isNew: true } as GameMetadata))
		.concat(games.slice(10));

	if (params.has("new")) {
		games = games.filter((game) => game.isNew);
	}

	if (params.has("query")) {
		const query = params.get("query")!.toLowerCase() || "";

		games = games.filter(
			(game) =>
				game.lowerCaseTitle.includes(query) ||
				game.lowerCaseAuthor.includes(query)
		);
	}

	if (params.has("tags")) {
		const tags = params.get("tags")!.split(",") || [];

		games = games.filter((game) => {
			for (const tag of tags) {
				if (game.tags.indexOf(tag) === -1) return false;
			}
			return true;
		});
	}

	return new Response(JSON.stringify(games), { status: 200 });
};
