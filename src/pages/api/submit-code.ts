import type { APIRoute } from 'astro'
import { firestore, getSession, getUserByEmail, makeOrUpdateSession } from '../../lib/account'
import { isValidEmail } from '../../lib/email'

export const post: APIRoute = async ({ request, cookies }) => {
	const session = await getSession(cookies)

	let code: string
	let email: string | null
	try {
		const body = await request.json()

		if (!session && (typeof body.email !== 'string' || !isValidEmail(body.email)))
			throw 'Missing/invalid email'
		email = body.email ?? null

		if (typeof body.code !== 'string') throw 'Missing/invalid code'
		const trimmed = body.code.replace(/[^0-9]/g, '')
		if (trimmed.length !== 6) throw 'Code must be 6 digits long'
		code = trimmed
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const user = await getUserByEmail(email!) ?? session?.user
	if (!user) return new Response('Invalid email or session', { status: 401 })

	const _codes = await firestore.collection('loginCodes')
		.where('code', '==', code)
		.where('userId', '==',  user.id)
		.limit(1).get()
	if (_codes.empty) return new Response('Invalid login code', { status: 401 })

	await makeOrUpdateSession(cookies, user.id, 'code')
	
	const snap = await firestore.collection('loginCodes').where('userId', '==', user.id).get()
	await Promise.all(snap.docs.map(doc => doc.ref.delete()))

	return new Response(JSON.stringify({ user }), { status: 200 })
}