import type { APIRoute } from 'astro'
import { firestore, getUserByEmail, makeSession } from '../../lib/account'
import { isValidEmail } from '../../lib/email'

export const post: APIRoute = async ({ request, cookies }) => {
	let code: string
	let email: string
	try {
		const body = await request.json()

		if (typeof body.email !== 'string' || !isValidEmail(body.email)) throw 'Missing/invalid email'
		email = body.email

		if (typeof body.code !== 'string') throw 'Missing/invalid code'
		const trimmed = body.code.replace(/[^0-9]/g, '')
		if (trimmed.length !== 6) throw 'Code must be 6 digits long'
		code = trimmed
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const user = await getUserByEmail(email)
	if (!user) return new Response('Invalid email', { status: 401 })

	const _codes = await firestore.collection('loginCodes')
		.where('code', '==', code)
		.where('userId', '==',  user.id)
		.limit(1).get()
	if (_codes.empty) return new Response('Invalid login code', { status: 401 })

	const session = await makeSession(user.id)
	cookies.set('sprigSession', session.id, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		httpOnly: true,
		sameSite: 'strict'
	})
	await firestore.collection('loginCodes').doc(_codes.docs[0]!.id).delete()
	return new Response(JSON.stringify({ user, session }), { status: 200 })
}