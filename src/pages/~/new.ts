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

export const post: APIRoute = async ({ request, cookies, redirect }) => {
	console.log("Got post here")
		console.log("Did have session")
    let name: string | undefined;
    let code: string | undefined;

    try {
        // Use request.text() for large form data instead of formData()
        if (request.headers.get('content-type')?.includes('application/json')) {
					console.log("Got here")
            const body = await request.json();
            name = body.name || undefined;
            code = body.code || undefined;
        } else {
            // Fallback to traditional form parsing for smaller form data
            const formData = await request.formData();
            name = formData.get("name") as string | undefined;
            code = formData.get("code") as string | undefined;
        }

        console.log("Received name:", name);
        console.log("Received code (truncated):", code?.slice(0, 100)); // Log first 100 chars
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Bad request body' }), { status: 400 });
    }

		globalThis.code = code
		globalThis.name = name
		return new Response("Not Found", { status: 404 });
};
