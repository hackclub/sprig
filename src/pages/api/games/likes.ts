import type { APIRoute } from 'astro'
import { getAllLikeCounts } from '../../../lib/likes'

export const GET: APIRoute = async () => {
	try {
		const counts = await getAllLikeCounts()
		return new Response(JSON.stringify(counts), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
			}
		})
	} catch (error) {
		console.error(error)
		return new Response(JSON.stringify({}), { status: 502, headers: { 'Content-Type': 'application/json' } })
	}
}