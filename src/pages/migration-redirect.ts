import type { APIRoute } from 'astro'

export const post: APIRoute = async ({ request }) => {
	let puzzleLab
	try {
		const body = await request.formData()
		puzzleLab = body.get('puzzle-lab')
		if (typeof puzzleLab !== 'string') throw 'Invalid form data'
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	return new Response(`
		<script>
			const puzzleLab = ${JSON.stringify(puzzleLab)}
			window.localStorage.setItem('puzzle-lab', puzzleLab)
			window.location.replace('/migrate')
		</script>
	`, {
		status: 200,
		headers: { 'Content-Type': 'text/html' }
	})
}