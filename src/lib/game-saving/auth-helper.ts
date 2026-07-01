import { type Signal, useComputed, useSignal, useSignalEffect } from '@preact/signals'
import { isValidEmail } from './account-types'

export type AuthState =
	| 'IDLE'
	| 'EMAIL_ENTRY'
	| 'EMAIL_CHECKING'
	| 'EMAIL_INCORRECT'
	| 'CODE_SENT'
	| 'CODE_CHECKING'
	| 'CODE_INCORRECT'
	| 'ACCOUNT_LOCKED'
	| 'LOGGED_IN'

export type AuthStage = 'IDLE' | 'EMAIL' | 'CODE' | 'LOGGED_IN'

export const DevEmail = "development@hackclub.com"
	
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
	const codeValid = useComputed(() => code.value.length === 6 || email.value === DevEmail)
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
		} else if (res.status === 429) {
			state.value = 'ACCOUNT_LOCKED'
			console.error('Account locked due to too many failed attempts.')
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
