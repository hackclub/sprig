import type { APIRoute } from 'astro'
import { getSession, getUserByEmail, makeGame, makeOrUpdateSession, makeUser, User } from '../../lib/account'
import { isValidEmail, mail, tempGameTemplate } from '../../lib/email'

export const post: APIRoute = async ({ request, cookies }) => {
	let name: string | null
	let code: string | null
	let saveEmail: string | null // For temp games
	try {
		const body = await request.json()
		if (body.name && typeof body.name !== 'string') throw 'Invalid game code'
		name = body.name
		if (body.code && typeof body.code !== 'string') throw 'Invalid game code'
		code = body.code
		if (body.saveEmail && (typeof body.saveEmail !== 'string' || !isValidEmail(body.saveEmail))) throw 'Invalid email'
		saveEmail = body.saveEmail
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}
	
	let user: User
	let unprotected: boolean
	
	const session = await getSession(cookies)
	if (!session) {
		if (!saveEmail) return new Response('Unauthorized', { status: 401 })
		user = await getUserByEmail(saveEmail) ?? await makeUser(saveEmail, null)
		unprotected = true
		await makeOrUpdateSession(cookies, user.id, 'email')
	} else if (saveEmail && session.user.email !== saveEmail) {
		user = await getUserByEmail(saveEmail) ?? await makeUser(saveEmail, null)
		unprotected = true
	} else {
		user = session.user
		unprotected = !session.session.full
	}

	const game = await makeGame(user.id, unprotected, name ?? undefined, code ?? undefined)
	if (unprotected) await mail(user.email, tempGameTemplate(user, game))
	return new Response(JSON.stringify(game), { status: 200 })
}