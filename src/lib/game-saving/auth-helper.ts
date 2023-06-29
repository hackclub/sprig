import { Signal, useComputed, useSignal, useSignalEffect } from '@preact/signals'
import { Game, SessionInfo } from './account'
import { isValidEmail } from './email'
import { codeMirror, PersistenceState } from '../state'
import { executeCaptcha } from '../recaptcha'

export type AuthState =
	| 'IDLE'
	| 'EMAIL_ENTRY'
	| 'EMAIL_CHECKING'
	| 'EMAIL_INCORRECT'
	| 'CODE_SENT'
	| 'CODE_CHECKING'
	| 'CODE_INCORRECT'
	| 'LOGGED_IN'

export type AuthStage = 'IDLE' | 'EMAIL' | 'CODE' | 'LOGGED_IN'
	
export const useAuthHelper = (initialState: AuthState = 'IDLE', initialEmail: string = '') => {
	const state = useSignal(initialState)
	const readonlyState = useComputed(() => state.value)
	const stage = useComputed(() => {
		if (state.value.startsWith('EMAIL_')) return 'EMAIL'
		if (state.value.startsWith('CODE_')) return 'CODE'
		if (state.value === 'LOGGED_IN') return 'LOGGED_IN'
		return 'IDLE'
	})
	const isLoading = useComputed(() => state.value.endsWith('_CHECKING'))
	
	const email = useSignal(initialEmail)
	const emailValid = useComputed(() => isValidEmail(email.value))

	const code = useSignal('')
	const codeValid = useComputed(() => code.value.length === 6)
	useSignalEffect(() => { code.value = code.value.replace(/[^0-9]/g, '') })

	const startEmailEntry = () => { state.value = 'EMAIL_ENTRY' }

	const submitEmail = async () => {
		if (![ 'EMAIL_ENTRY', 'EMAIL_INCORRECT' ].includes(state.value)) return
		state.value = 'EMAIL_CHECKING'

		const res = await fetch('/api/auth/email-login-code', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email.value })
		})
		if (res.ok) {
			state.value = 'CODE_SENT'
		} else {
			state.value = 'EMAIL_INCORRECT'
			console.error(await res.text())
		}
	}

	const submitCode = async () => {
		if (![ 'CODE_SENT', 'CODE_INCORRECT' ].includes(state.value)) return
		state.value = 'CODE_CHECKING'

		const res = await fetch('/api/auth/submit-code', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email.value, code: code.value })
		})
		if (res.ok) {
			state.value = 'LOGGED_IN'
		} else {
			state.value = 'CODE_INCORRECT'
			console.error(await res.text())
		}
	}

	const wrongEmail = () => {
		if (stage.value !== 'CODE') return
		email.value = ''
		code.value = ''
		state.value = 'EMAIL_ENTRY'
	}

	const sendCodeOverride = async (emailIn: string) => {
		email.value = emailIn
		state.value = 'EMAIL_ENTRY'
		await submitEmail()
	}

	return {
		state: readonlyState,
		stage,
		isLoading,
		email,
		emailValid,
		code,
		codeValid,
		startEmailEntry,
		submitEmail,
		submitCode,
		sendCodeOverride,
		wrongEmail
	}
}

export const persist = async (persistenceState: Signal<PersistenceState>, email?: string) => {
	const isShared = persistenceState.value.kind === 'SHARED'
	const gameName: string | undefined = persistenceState.value.kind === 'SHARED' ? persistenceState.value.name : undefined
	const tutorialName = persistenceState.value.kind === 'SHARED' ? persistenceState.value.tutorialName : undefined
	const tutorial = persistenceState.value.kind === 'SHARED' ? persistenceState.value.tutorial : undefined
	persistenceState.value = {
		kind: 'PERSISTED',
		cloudSaveState: 'SAVING',
		game: 'LOADING',
		stale: persistenceState.value.stale,
		session: persistenceState.value.session,
		tutorial: tutorial
	}

	try {
		const recaptchaToken = await executeCaptcha('PERSIST_GAME')

		const res = await fetch('/api/games/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				partialSessionEmail: email,
				code: codeMirror.value?.state.doc.toString() ?? '',
				name: gameName,
				tutorialName,
				recaptchaToken
			})
		})
		if (!res.ok) throw new Error(await res.text())
		const { game, sessionInfo } = await res.json() as { game: Game, sessionInfo: SessionInfo }
		if (!isShared) document.cookie = `sprigTempGame=${game.id};path=/;max-age=${60 * 60 * 24 * 365}`

		if (persistenceState.value.kind === 'PERSISTED')
			persistenceState.value = {
				...persistenceState.value,
				cloudSaveState: 'SAVED',
				game,
				session: sessionInfo
			}
		
		window.history.replaceState(null, '', `/~/${game.id}`)
	} catch (error) {
		console.error(error)
		if (persistenceState.value.kind === 'PERSISTED')
			persistenceState.value = {
				...persistenceState.value,
				cloudSaveState: 'ERROR'
			}
	}
}