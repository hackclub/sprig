import type { APIRoute } from 'astro'
import { getSession, makeGame } from '../../lib/game-saving/account'
import { defaultExampleCode } from '../../lib/examples'


const createDefaultWithTitle = (title:string) =>{
	return defaultExampleCode.replace("@title: ", `@title: ${title}`)
}

export const post: APIRoute = async ({request, cookies, redirect }) => {
	const session = await getSession(cookies)

	if (!session || !session.session.full) return redirect('/editor', 302)
	
	
	let name: string;
	try {
		const body = await request.json()
		if (typeof body.name !== 'string') throw 'Missing/invalid name'
		name = body.name
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const game = await makeGame(session.user.id, false, name, createDefaultWithTitle(name))
	return redirect(`/~/${game.id}`, 302)
}