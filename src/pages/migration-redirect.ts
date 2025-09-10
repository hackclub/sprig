import type { APIRoute } from 'astro'

export const post: APIRoute = async ({ request }) => {
	let puzzleLab
	let redirect
	try {
		const body = await request.formData()
		puzzleLab = body.get('puzzle-lab')
		if (typeof puzzleLab !== 'string') throw 'Invalid puzzle lab'
		redirect = body.get('redirect')
		if (typeof redirect !== 'string' && redirect !== null) throw 'Invalid redirect'
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	return new Response(`
		<script>
			const puzzleLab = ${JSON.stringify(puzzleLab)}
			const redirect = ${JSON.stringify(redirect)}
			sessionStorage.setItem('migratedPuzzleLab', puzzleLab)
			window.location.replace(redirect || '/migrate')
		</script>
	`, {
		status: 200,
		headers: { 'Content-Type': 'text/html' }
	})
}