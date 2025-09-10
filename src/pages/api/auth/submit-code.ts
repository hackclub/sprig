import type { APIRoute } from 'astro'
import { getSession, getUserByEmail, makeOrUpdateSession, findDocument, updateDocument } from '../../../lib/game-saving/account'
import { isValidEmail } from '../../../lib/game-saving/email'
import {DevEmail} from "../../../lib/game-saving/auth-helper";
import { Timestamp } from 'firebase-admin/firestore';

export const post: APIRoute = async ({ request, cookies }) => {
	const session = await getSession(cookies)

	let code: string
	let email: string | null
	try {
		const body = await request.json()

		if (!session && (typeof body.email !== 'string' || !isValidEmail(body.email)))
			throw 'Missing/invalid email'
		email = body.email ?? null

		if (typeof body.code !== 'string') throw 'Missing/invalid code'
		const trimmed = body.code.replace(/[^0-9]/g, '')
		if (trimmed.length !== 6 && email !== DevEmail) throw 'Code must be 6 digits long'
		code = trimmed
	} catch (error) {
		return new Response(typeof error === 'string' ? error : 'Bad request body', { status: 400 })
	}

	const user = await getUserByEmail(email!) ?? session?.user
	if (!user) return new Response('Invalid email or session', { status: 401 })
 
	const now = Timestamp.now();

	const failedLoginAttempts = user.failedLoginAttempts ?? 0;
	const lockoutUntil = user.lockoutUntil ?? null;

	if (lockoutUntil && lockoutUntil.toMillis() > now.toMillis()) {
		const lockoutMinutes = Math.ceil(
			(lockoutUntil.toMillis() - now.toMillis()) / 60000
		);
		return new Response(
			`Account locked. Try again in ${lockoutMinutes} minute(s).`,
			{ status: 429 }
		);
	}

	if (email === DevEmail && code == import.meta.env.DEV_CODE) {
		await makeOrUpdateSession(cookies, user.id, 'code')
		return new Response(JSON.stringify({ user }), { status: 200 })
	}

	const _codes = await findDocument('loginCodes', [
		['code', '==', code],
		['userId', '==', user.id]
	], 1);

    if (_codes.empty) {
		const newFailedAttempts = failedLoginAttempts + 1;

		if (newFailedAttempts >= +import.meta.env.MAX_ATTEMPTS) {
			const lockoutUntil = Timestamp.fromMillis(
				now.toMillis() + parseInt(import.meta.env.PUBLIC_LOCKOUT_DURATION_MS)
			);
			await updateDocument("users", user.id, {
				failedLoginAttempts: newFailedAttempts,
				lockoutUntil: lockoutUntil,
			});
			return new Response(
				`Too many attempts. Account locked for ${
					import.meta.env.LOCKOUT_DURATION_MS / 60000
				} minutes.`,
				{ status: 429 }
			);
		} else {
			await updateDocument("users", user.id, {
				failedLoginAttempts: newFailedAttempts,
			});
			return new Response("Invalid login code", { status: 401 });
		}
	}

	await updateDocument("users", user.id, {
		failedLoginAttempts: 0,
		lockoutUntil: null,
	});

	await makeOrUpdateSession(cookies, user.id, "code");
	
	const snap = await findDocument('loginCodes', ['userId', '==', user.id]);
	// const snap = await firestore.collection('loginCodes').where('userId', '==', user.id).get()
	await Promise.all(snap.docs.map((doc: any) => doc.ref.delete()))

	return new Response(JSON.stringify({ user }), { status: 200 })
}