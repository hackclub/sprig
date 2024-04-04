import type { APIRoute } from 'astro'
import { getUserByEmail, makeLoginCode, makeUser } from '../../../lib/game-saving/account'
import { isValidEmail, loginCodeTemplate, mail, addToEmailList } from '../../../lib/game-saving/email'

export const post: APIRoute = async ({ request }) => {
	let email: string
	try {
		const body = await request.json()
		if (typeof body.email !== 'string' || !isValidEmail(body.email)) throw 'Missing/invalid email'
		email = body.email
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const user = await getUserByEmail(email) ?? await makeUser(email, null)
	const code = await makeLoginCode(user.id)
	await mail(user.email, loginCodeTemplate(code))
	await addToEmailList(user.email, user.id)
	return new Response(JSON.stringify({}), { status: 200 })
}