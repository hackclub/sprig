import type { APIRoute } from 'astro'
import { getSession, makeGame } from '../../lib/account'

export const post: APIRoute = async ({ cookies }) => {
	const session = await getSession(cookies)
	if (!session) return new Response('Unauthorized', { status: 401 })
	const game = await makeGame(session.user.id, false)
	return new Response(JSON.stringify(game), { status: 200 })
}