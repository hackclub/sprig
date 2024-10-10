import type { APIRoute } from 'astro'
import {addDocument, deleteDocument, findDocument, getSession} from '../../../lib/game-saving/account'

export const post: APIRoute = async ({ request, cookies }) => {
	let filename: string
	let action: "upvote" | "remove";
	try {
		const body = await request.json()
		if (typeof body.filename !== 'string') throw 'Missing/invalid game id'
		filename = body.filename
		if (typeof body.action !== 'string') throw 'Missing action'
		if (body.action !== 'remove' && body.action !== 'upvote') throw 'Invalid action'
		action = body.action
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const session = await getSession(cookies)
	if (!session) return new Response('Unauthorized', { status: 401 })

	const existingRecords = await findDocument('upvotes', [
		['filename', '==', filename],
		['userId', '==', session.user.id]
	])
	
	if (action == "upvote") {
		if (existingRecords.empty) await addDocument('upvotes', {
			filename: filename,
			userId: session.user.id
		})
		console.log(filename)
	} else {
		if (existingRecords.empty) return new Response("User hasn't upvoted game", { status: 400 })
		await deleteDocument('upvotes', existingRecords.docs[0].id)
	}

	
	return new Response(JSON.stringify({}), { status: 200 })
}