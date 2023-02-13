import { Signal, useComputed, useSignal, useSignalEffect } from '@preact/signals'
import { isValidEmail } from './email'
import { codeMirror, PersistenceState } from './state'

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
	
export const useAuthHelper = (initialState: AuthState = 'IDLE') => {
	const state = useSignal(initialState)
	const readonlyState = useComputed(() => state.value)
	const stage = useComputed(() => {
		if (state.value.startsWith('EMAIL_')) return 'EMAIL'
		if (state.value.startsWith('CODE_')) return 'CODE'
		if (state.value === 'LOGGED_IN') return 'LOGGED_IN'
		return 'IDLE'
	})
	const isLoading = useComputed(() => state.value.endsWith('_CHECKING'))
	
	const email = useSignal('')
	const emailValid = useComputed(() => isValidEmail(email.value))

	const code = useSignal('')
	const codeValid = useComputed(() => code.value.length === 6)
	useSignalEffect(() => { code.value = code.value.replace(/[^0-9]/g, '') })

	const startEmailEntry = () => { state.value = 'EMAIL_ENTRY' }

	const submitEmail = async () => {
		if (![ 'EMAIL_ENTRY', 'EMAIL_INCORRECT' ].includes(state.value)) return
		state.value = 'EMAIL_CHECKING'

		const res = await fetch('/api/email-login-code', {
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

		const res = await fetch('/api/submit-code', {
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
		submitCode
	}
}

export const saveGhostDraft = async (auth: ReturnType<typeof useAuthHelper>, persistenceState: Signal<PersistenceState>, showLoginPrompt: boolean = false) => {
	persistenceState.value = {
		kind: 'PERSISTED',
		showLoginPrompt,
		cloudSaveState: 'SAVING',
		game: 'LOADING',
		saveEmail: auth.email.value
	}

	try {
		const res = await fetch('/api/new-ghost-draft', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: auth.email.value,
				code: codeMirror.value?.state.doc.toString() ?? ''
			})
		})
		if (!res.ok) throw new Error(await res.text())
		const { game } = await res.json()

		if (persistenceState.value.kind === 'PERSISTED')
			persistenceState.value = {
				...persistenceState.value,
				cloudSaveState: 'SAVED',
				game
			}
	} catch (error) {
		console.error(error)
		if (persistenceState.value.kind === 'PERSISTED')
			persistenceState.value = {
				...persistenceState.value,
				cloudSaveState: 'ERROR'
			}
	}
}