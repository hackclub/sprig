import type { APIRoute } from 'astro'
import { getSession, makeGame, getGame } from '../../lib/game-saving/account'
import { defaultExampleCode } from '../../lib/examples'
import { getGalleryGames } from '../../lib/game-saving/gallery'
import fs from 'fs'
import path from 'path'

const SPRIG_BASE_URL = import.meta.env.SPRIG_BASE_URL || 'http://localhost:3000'

const createDefaultWithTitle = (title:string) =>{
	return defaultExampleCode.replace("@title: ", `@title: ${title}`)
}

export const get: APIRoute = async ({request, cookies, redirect }) => {
	const session = await getSession(cookies)

	if (!session) return redirect('/editor', 302)

	let name: string|undefined;
	let remixId: string|undefined;
	try {
		const urlParams = new URL(request.url).searchParams;
		if(urlParams.get("name")){
			name = urlParams.get("name") || undefined;
			console.log("Game name:", name)
		}
		if(urlParams.get("remix")){
			remixId = urlParams.get("remix") || undefined;
			console.log("Remixing game:", remixId)
		}

	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	let code: string;
	if (remixId) {
		// Try to find the game in the gallery first
		const games = getGalleryGames()
		const foundGame = games.find(g => g.filename === remixId)
		if (foundGame) {
			// Read the game code from the gallery
			const gameContentPath = path.resolve(`./games/${remixId}.js`)
			try {
				code = fs.readFileSync(gameContentPath).toString()
				console.log("Successfully loaded gallery game code for remix")
			} catch (error) {
				console.error("Failed to read gallery game code:", error)
				return new Response('Failed to load game code', { status: 500 })
			}
		} else {
			// Try to find the game in the database
			const originalGame = await getGame(remixId)
			if (!originalGame) {
				console.error("Game not found for remix:", remixId)
				return new Response('Game not found', { status: 404 })
			}
			code = originalGame.code
			console.log("Successfully loaded database game code for remix")
		}
	} else {
		code = createDefaultWithTitle(name || "")
	}

	const game = await makeGame(session.user.id, !session.session.full, name, code)
	return redirect(`/~/${game.id}`, 302)
}

export const post: APIRoute = async ({ request, redirect }) => {
    let name: string | undefined;
    let code: string | undefined;

    try {
        console.log("Received request to create new game");
        
        if (request.headers.get('content-type')?.includes('application/json')) {
            const body = await request.json();
            name = body.name || undefined;
            code = body.code || undefined;
            console.log(`Creating game with name: ${name || 'unnamed'}, code length: ${code?.length || 0} characters`);
        } else {
            const formData = await request.formData();
            name = formData.get("name") as string | undefined;
            code = formData.get("code") as string | undefined;
            console.log(`Creating game with name: ${name || 'unnamed'}, code length: ${code?.length || 0} characters`);
        }

        if (!code) {
            console.log("Error: No code provided in request");
            return new Response(JSON.stringify({ error: 'No code provided' }), { status: 400 });
        }

        // Create an unprotected game that anyone can access
        console.log("Creating game document...");
        const game = await makeGame("review-user", true, name, code)
        console.log(`Successfully created game with ID: ${game.id}`);

        // Verify the game was actually created in the database
        console.log("Verifying game creation in database...");
        const createdGame = await getGame(game.id);
        if (!createdGame) {
            console.error("Error: Game was not found in database after creation");
            return new Response(JSON.stringify({ error: 'Game creation failed' }), { status: 500 });
        }
        console.log("Game verified in database");

        const redirectUrl = new URL(`/gallery/play/${game.id}`, SPRIG_BASE_URL).toString();
        console.log(`Redirecting to play URL: ${redirectUrl}`);
        return redirect(redirectUrl, 302)
    } catch (error) {
        console.error("Failed to create game:", error);
        if (error instanceof Error) {
            console.error("Error details:", {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }
        return new Response(JSON.stringify({ error: 'Failed to create game' }), { status: 500 });
    }
};
