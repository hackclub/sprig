import type { APIRoute } from 'astro'

export const get: APIRoute = async ({}) => {
	return new Response(JSON.stringify({ hi: true }), { status: 200 })
}

export const post: APIRoute = async ({ request }) => {
	console.log('got here')
	const text = await request.text()
	return new Response(text, { status: 200 })
}