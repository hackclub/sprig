import type { APIRoute } from 'astro'
import { Timestamp } from 'firebase-admin/firestore'
import { getGame, getSession, updateDocument } from '../../../lib/game-saving/account'

export const post: APIRoute = async ({ request, cookies }) => {
	let roomId: string
	let isRoomOpen: boolean
	try {
		const body = await request.json()
		if (typeof body.roomId !== 'string') throw 'Missing/invalid room id'
		roomId = body.roomId
		if (typeof body.isRoomOpen !== 'boolean') throw 'Missing/invalid room status'
		isRoomOpen = body.isRoomOpen
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const game = await getGame(roomId)
	if (!game) return new Response('Room does not exist', { status: 404 })

	if (!game.unprotected) {
		const session = await getSession(cookies)
		if (!session) return new Response('Unauthorized', { status: 401 })
		if (session.user.id !== game.ownerId) return new Response(`Can't open a room you don't own`, { status: 403 })
	}

	await updateDocument('games', roomId, {
		isRoomOpen: isRoomOpen,
		modifiedAt: Timestamp.now()
	});

	return new Response(JSON.stringify({}), { status: 200 })
}