import type { APIRoute } from 'astro'
import { getUser } from '../../lib/account'

export const post: APIRoute = async ({}) => {
	const user = await getUser()
	if (!user) return new Response('Unauthorized', { status: 401 })
	return new Response(JSON.stringify({ id: 'test123' }), { status: 200 })
}