import type { APIRoute } from 'astro'
import { getGame } from '../../../lib/game-saving/account'
import bcrypt from 'bcryptjs'

export const post: APIRoute = async ({ request }) => {
	let roomId: string
	let password: string
	try {
		const body = await request.json()
		if (typeof body.roomId !== 'string') throw 'Missing/invalid room id'
		roomId = body.roomId
		if (typeof body.password !== 'string') throw 'Missing/invalid room status'
		password = body.password
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const game = await getGame(roomId)
	if (!game) return new Response('Room does not exist', { status: 404 })
	if(game.password === "" && password === "") return new Response(JSON.stringify({game}), { status: 200 })
	if(game.password && bcrypt.compareSync(password, game.password)) 
		return new Response(JSON.stringify({game}), { status: 200 })
	return new Response('Incorrect password', { status: 401 })
}