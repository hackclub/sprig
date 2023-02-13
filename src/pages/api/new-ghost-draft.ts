import type { APIRoute } from 'astro'
import { getUserByEmail, makeGame, makeUser } from '../../lib/account'
import { ghostDraftTemplate, isValidEmail, mail } from '../../lib/email'

export const post: APIRoute = async ({ request, cookies }) => {
	let email: string
	let code: string
	try {
		const body = await request.json()
		if (typeof body.email !== 'string' || !isValidEmail(body.email)) throw 'Missing/invalid email'
		email = body.email
		if (typeof body.code !== 'string') throw 'Missing/invalid code'
		code = body.code
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const user = await getUserByEmail(email) ?? await makeUser(email, null)
	const game = await makeGame(user.id, true, undefined, code)
	await mail(user.email, ghostDraftTemplate(user, game)) 
	cookies.set('sprigDraft', game.id, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365
	})
	return new Response(JSON.stringify({ game }), { status: 200 })
}