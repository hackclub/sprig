import type { APIRoute } from 'astro'
import { Timestamp } from 'firebase-admin/firestore'
import { getGame, getSession, updateDocument } from '../../../lib/game-saving/account'
import bcrypt from 'bcryptjs'

export const post: APIRoute = async ({ request, cookies }) => {
	let roomId: string
	let password: string
	try {
		const body = await request.json()
		if (typeof body.roomId !== 'string') throw 'Missing/invalid room id'
		roomId = body.roomId
		if (typeof body.password !== 'string') throw 'Missing/invalid room status'
		password = body.password
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
	const hashedPassword = password.length == 0 ? "" : bcrypt.hashSync(password, 10)

	await updateDocument('games', roomId, {
		password: hashedPassword
	});
	console.log(hashedPassword)

	return new Response(JSON.stringify({}), { status: 200 })
}