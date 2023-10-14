import type { APIRoute } from 'astro'
import { getSession, getUserByEmail, makeGame, makeOrUpdateSession, makeUser, User } from '../../../lib/game-saving/account'
import { isValidEmail, mail, tempGameTemplate } from '../../../lib/game-saving/email'
import { assessCaptcha } from '../../../lib/recaptcha'

export const post: APIRoute = async ({ request, cookies }) => {
	let name: string
	let code: string
	let partialSessionEmail: string | null // For temp games
	let recaptchaToken: string
	let tutorialName: string | undefined
	let tutorialIndex: number | undefined
	try {
		const body = await request.json()
		if (body.name && typeof body.name !== 'string') throw 'Invalid game name'
		name = body.name
		if (body.code && typeof body.code !== 'string') throw 'Invalid game code'
		code = body.code
		if (body.partialSessionEmail && (typeof body.partialSessionEmail !== 'string' || !isValidEmail(body.partialSessionEmail))) throw 'Invalid email'
		partialSessionEmail = body.partialSessionEmail
		if (body.recaptchaToken && typeof body.recaptchaToken !== 'string') throw 'Invalid recaptcha token'
		recaptchaToken = body.recaptchaToken
		tutorialName = typeof body.tutorialName === 'string' ? body.tutorialName : undefined
		tutorialIndex = typeof body.tutorialIndex === 'number' ? body.tutorialIndex : undefined
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}
	
	let sessionInfo = await getSession(cookies)
	let user: User
	let unprotected: boolean
	if (partialSessionEmail) {
		const recaptchaScore = await assessCaptcha(recaptchaToken, 'PERSIST_GAME')
		if (recaptchaScore < 0.3) return new Response(`Recaptcha score too low (${recaptchaScore})`, { status: 400 })

		user = await getUserByEmail(partialSessionEmail) ?? await makeUser(partialSessionEmail, null)
		unprotected = true
		sessionInfo = await makeOrUpdateSession(cookies, user.id, 'email')
	} else if (sessionInfo && sessionInfo.session.full) {
		user = sessionInfo.user
		unprotected = false
	} else {
		return new Response('Unauthorized', { status: 401 })
	}

	const game = await makeGame(user.id, unprotected, name ?? undefined, code ?? undefined, tutorialName, tutorialIndex)
	if (unprotected) await mail(user.email, tempGameTemplate(user, game))
	return new Response(JSON.stringify({ game, sessionInfo }), { status: 200 })
}