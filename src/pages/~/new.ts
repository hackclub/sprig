import type { APIRoute } from 'astro'
import { getSession, makeGame } from '../../lib/game-saving/account'
import { defaultExampleCode } from '../../lib/examples'


const createDefaultWithTitle = (title:string) =>{
	return defaultExampleCode.replace("@title: ", `@title: ${title}`)
}

export const get: APIRoute = async ({request, cookies, redirect }) => {
	const session = await getSession(cookies)

	if (!session) return redirect('/editor', 302)
	
	let name: string|undefined;
	try {
		const urlParams = new URL(request.url).searchParams;
		if(urlParams.get("name")){
			name = urlParams.get("name") || undefined;
			console.log(name)
		}
		
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const game = await makeGame(session.user.id, !session.session.full, name, createDefaultWithTitle(name || ""))
	return redirect(`/~/${game.id}`, 302)
}