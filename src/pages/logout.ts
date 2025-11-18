import type { APIRoute } from 'astro'
import { firestore } from '../lib/game-saving/account'

export const get: APIRoute = async ({ redirect, cookies }) => {
	const sessionId = cookies.get('sprigSession').value
	if (sessionId) await firestore.collection('sessions').doc(sessionId).delete()
	cookies.delete('sprigSession', { path: '/' })
	cookies.delete('sprigTempGame', { path: '/' })
	return redirect('/', 302)
}