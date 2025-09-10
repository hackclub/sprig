import type { APIRoute } from 'astro'
import { getGame, getSession, makeSnapshot } from '../../../lib/game-saving/account'

export const post: APIRoute = async ({ request, cookies }) => {
	let gameId: string
	try {
		const body = await request.json()
		if (typeof body.gameId !== 'string') throw 'Missing/invalid game id'
		gameId = body.gameId
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const game = await getGame(gameId)
	if (!game) return new Response('Game does not exist', { status: 404 })

	const session = await getSession(cookies)
	if (!session) return new Response('Unauthorized', { status: 401 })
	if (session.user.id !== game.ownerId) return new Response(`Can't snapshot a game you don't own`, { status: 403 })

	const snapshot = await makeSnapshot(game)
	return new Response(JSON.stringify({
		snapshotId: snapshot.id,
	}), { status: 200 })
}