import _sendgrid from '@sendgrid/mail'
import type { Game, User } from './account'
import { lazy } from '../utils/lazy'

export const isValidEmail = (email: string): boolean => /^\S+@\S+\.\S+$/.test(email)

const sendgrid = lazy(() => {
	// Sekurity
	_sendgrid.setApiKey(import.meta.env.SENDGRID_API_KEY)
	return _sendgrid
})

interface EmailSpec {
	subject: string
	html: string
	text: string
}

export const mail = async (to: string, spec: EmailSpec): Promise<void> => {
	await sendgrid.send({
		from: 'Hack Club Sprig <sprig@hackclub.com>',
		replyTo: 'Hack Club <team@hackclub.com>',
		to,
		...spec
	})
}

export const loginCodeTemplate = (code: string): EmailSpec => ({
	subject: `Sprig Login Code: ${code}`,
	html: `
		<p>Here's your Sprig login code:</p>
		<h1>${code}</h1>
		<p><small>(Not you? You can safely ignore this email.)</small></p>
	`,
	text: [
		`Here's your Sprig login code: ${code}`,
		'',
		'(Not you? You can safely ignore this email.)'
	].join('\n')
})

export const tempGameTemplate = (user: User, game: Game): EmailSpec => {
	const loginUrl = `https://sprig.hackclub.com/login?email=${encodeURIComponent(user.email)}&to=${encodeURIComponent(`/~/${game.id}`)}`
	return {
		subject: 'How to access your game | Sprig',
		html: `
			<p>Hi! You started working on a game in <a href="https://sprig.hackclub.com">Sprig</a>, and we made you an account if you ever want to keep working on it.</p>
			<p>Game name: <strong>${game.name ?? 'Untitled'}</strong></p>
			<p>To edit your game in the future, just head to <a href="${loginUrl}">${loginUrl}</a></p>
			<p>Happy hacking!</p>
			<p><small>(Not you? You can safely ignore this email and/or delete the game. Your Sprig account is safe and only you can log in.)</small></p>
		`,
		text: [
			'Hi! You started working on a game in Sprig, and we made you an account if you ever want to keep working on it.',
			'',
			`Game name: ${game.name ?? 'Untitled'}`,
			'',
			`To edit your game in the future, just head to ${loginUrl}`,
			'',
			'Happy hacking!',
			'',
			'(Not you? You can safely ignore this email and/or delete the game. Your Sprig account is safe and only you can log in.)'
		].join('\n')
	}
}