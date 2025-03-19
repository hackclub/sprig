import type { APIRoute } from 'astro'
import { Timestamp } from 'firebase-admin/firestore'
import { getGame, getSession, setDocument, updateDocument } from '../../../lib/game-saving/account'
import { updateEmailListLastModifiedTime } from '../../../lib/game-saving/email'

export const post: APIRoute = async ({ request, cookies }) => {
	let code: string
	let gameId: string
	let tutorialName: string | undefined
	try {
		const body = await request.json()
		if (typeof body.code !== 'string') throw 'Missing/invalid code'
		code = body.code
		if (typeof body.gameId !== 'string') throw 'Missing/invalid game id'
		gameId = body.gameId
		tutorialName = typeof body.tutorialName === 'string' ? body.tutorialName : undefined
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const game = await getGame(gameId)
	if (!game) return new Response('Game does not exist', { status: 404 })

	let trackingId = game.id
	let trackingType = 'game'
	const trackingDate = new Date().toDateString()

	if (!game.unprotected) {
		const session = await getSession(cookies)
		if (!session) return new Response('Unauthorized', { status: 401 })
		if (session.user.id !== game.ownerId) return new Response(`Can't edit a game you don't own`, { status: 403 })
		trackingId = session.user.id
		trackingType = 'user'

		//await updateEmailListLastModifiedTime(session.user, new Date())
	}

	await updateDocument('games', gameId, {
		code,
		modifiedAt: Timestamp.now(),
		tutorialName: tutorialName ?? null
	});
	await setDocument('daily-edits', `${trackingId}-${trackingDate}`, {
		type: trackingType,
		id: trackingId,
		date: Timestamp.now()
	});

	return new Response(JSON.stringify({}), { status: 200 })
}
