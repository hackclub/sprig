import type { APIRoute } from 'astro'
import { getFullSession } from '../../../lib/game-saving/account'
import { getGalleryGames } from '../../../lib/game-saving/gallery'
import { getGameLikes, likeGame, unlikeGame } from '../../../lib/likes'

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
	status,
	headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
})

const isGalleryGame = (filename: string) => getGalleryGames().some(game => game.filename === filename)

export const GET: APIRoute = async ({ url, cookies }) => {
	const filename = url.searchParams.get('filename')
	if (!filename || !isGalleryGame(filename)) return json({ error: 'Unknown game' }, 404)

	const session = await getFullSession(cookies)
	try {
		return json(await getGameLikes(filename, session?.user.id))
	} catch (error) {
		console.error(error)
		return json({ error: 'Could not load likes' }, 502)
	}
}

export const POST: APIRoute = async ({ request, cookies }) => {
	let filename: string
	let action: 'like' | 'unlike'
	try {
		const body = await request.json()
		if (typeof body.filename !== 'string') throw 'Missing/invalid filename'
		if (body.action !== 'like' && body.action !== 'unlike') throw 'Invalid action'
		filename = body.filename
		action = body.action
	} catch (error) {
		return json({ error: typeof error === 'string' ? error : 'Bad request body' }, 400)
	}

	const session = await getFullSession(cookies)
	if (!session) return json({ error: 'You must be logged in to like games' }, 401)
	if (!isGalleryGame(filename)) return json({ error: 'Unknown game' }, 404)

	try {
		const result = action === 'like'
			? await likeGame(filename, session.user.id)
			: await unlikeGame(filename, session.user.id)
		return json(result)
	} catch (error) {
		console.error(error)
		return json({ error: 'Could not save like' }, 502)
	}
}