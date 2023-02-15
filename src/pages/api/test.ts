import type { APIRoute } from 'astro'

export const get: APIRoute = async ({}) => {
	return new Response(JSON.stringify({ hi: true }), { status: 200 })
}

export const post: APIRoute = async ({ request }) => {
	const json = await request.json()
	return new Response(JSON.stringify(json), { status: 200 })
}