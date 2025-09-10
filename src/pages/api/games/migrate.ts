import type { APIRoute } from 'astro'
import { Timestamp } from 'firebase-admin/firestore'
import { firestore, getSession, getUserByEmail, makeOrUpdateSession, makeUser, User } from '../../../lib/game-saving/account'
import { isValidEmail } from '../../../lib/game-saving/email'

export const post: APIRoute = async ({ request, cookies }) => {
	let partialSessionEmail: string | null
	let games: { name: string, code: string }[]
	try {
		const body = await request.json()

		if (body.partialSessionEmail && (typeof body.partialSessionEmail !== 'string' || !isValidEmail(body.partialSessionEmail))) throw 'Invalid email'
		partialSessionEmail = body.partialSessionEmail

		if (!Array.isArray(body.games)) throw 'Games must be an array'
		games = body.games
		if (games.length === 0) throw 'Games must not be empty'
		for (const game of games) {
			if (typeof game.name !== 'string') throw 'Invalid game name'
			if (typeof game.code !== 'string') throw 'Invalid game code'
		}
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const session = await getSession(cookies)
	let user: User
	let unprotected: boolean
	if (partialSessionEmail) {
		user = await getUserByEmail(partialSessionEmail) ?? await makeUser(partialSessionEmail, null)
		unprotected = true
		if (!session) await makeOrUpdateSession(cookies, user.id, 'email')
	} else if (session && session.session.full) {
		user = session.user
		unprotected = false
	} else {
		return new Response('Unauthorized', { status: 401 })
	}

	const gameIds: Record<string, string> = {}
	const batch = firestore.batch()
	for (const game of games) {
		const gameRef = firestore.collection('games').doc()
		batch.set(gameRef, {
			ownerId: user.id,
			createdAt: Timestamp.now(),
			modifiedAt: Timestamp.now(),
			unprotected,
			name: game.name,
			code: game.code
		})
		gameIds[game.name] = gameRef.id
	}
	await batch.commit()
	return new Response(JSON.stringify(gameIds), { status: 200 })
}