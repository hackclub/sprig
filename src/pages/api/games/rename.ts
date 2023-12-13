import type { APIRoute } from 'astro'
import { Timestamp } from 'firebase-admin/firestore'
import { getGame, getSession, updateDocument } from '../../../lib/game-saving/account'

export const post: APIRoute = async ({ request, cookies }) => {
	let gameId: string
	let newName: string
	try {
		const body = await request.json()
		if (typeof body.gameId !== 'string') throw 'Missing/invalid game id'
		gameId = body.gameId
		if (typeof body.newName !== 'string') throw 'Missing/invalid new name'
		newName = body.newName
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const game = await getGame(gameId)
	if (!game) return new Response('Game does not exist', { status: 404 })

	if (!game.unprotected) {
		const session = await getSession(cookies)
		if (!session) return new Response('Unauthorized', { status: 401 })
		if (session.user.id !== game.ownerId) return new Response(`Can't rename a game you don't own`, { status: 403 })
	}

	await updateDocument('games', gameId, {
		name: newName,
		modifiedAt: Timestamp.now()
	});

	return new Response(JSON.stringify({}), { status: 200 })
}