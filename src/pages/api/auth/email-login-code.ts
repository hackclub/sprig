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

	try {
		const user = await getUserByEmail(email) ?? await makeUser(email, null)
		const code = await makeLoginCode(user.id)
		console.log("user: " + JSON.stringify(user))
		console.log("code: " + code)
		await mail(user.email, loginCodeTemplate(code))
		//await addToEmailList(user)
		return new Response(JSON.stringify({}), { status: 200 })
	} catch (error) {
		console.error("error attempting to send mail")
		console.error(error)
		return new Response(
			JSON.stringify({ error: "Internal Server Error", details: error instanceof Error ? error.message : error }),
			{ status: 500 }
		);
	}
}
