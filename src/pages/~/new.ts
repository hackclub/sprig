import type { APIRoute } from 'astro'
import { getSession, makeGame } from '../../lib/game-saving/account'
import { defaultExampleCode } from '../../lib/examples'

export const get: APIRoute = async ({ cookies, redirect }) => {
	const session = await getSession(cookies)
	if (!session || !session.session.full) return redirect('/editor', 302)
	const game = await makeGame(session.user.id, false, undefined, defaultExampleCode)
	return redirect(`/~/${game.id}`, 302)
}