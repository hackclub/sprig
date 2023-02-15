import type { Signal } from '@preact/signals'
import { useAuthHelper } from '../../lib/auth-helper'
import type { PersistenceState } from '../../lib/state'
import Button from '../design-system/button'
import Input from '../design-system/input'
import LinkButton from '../design-system/link-button'
import popupStyles from './navbar-popup.module.css'

interface LoginPromptProps {
	persistenceState: Signal<PersistenceState>
}

export default function LoginPrompt(props: LoginPromptProps) {
	const initialEmail = (props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.saveEmail) || ''
	const auth = useAuthHelper('IDLE', initialEmail)

	if (props.persistenceState.value.kind !== 'PERSISTED' || !props.persistenceState.value.showLoginPrompt) return null

	let content
	if (auth.stage.value === 'IDLE') {
		content = (<>
			<p>Finish logging in to share your work and view your other games. We'll email you a code.</p>
			<div class={popupStyles.inputRow}>
				<Button accent loading={auth.isLoading.value} onClick={() => {
					if (initialEmail) {
						auth.sendCodeOverride(initialEmail)
					} else {
						auth.startEmailEntry()
					}
				}}>
					Let's go
				</Button>
				<Button disabled={auth.isLoading.value} onClick={() => {
					if (props.persistenceState.value.kind === 'PERSISTED')
						props.persistenceState.value = {
							...props.persistenceState.value,
							showLoginPrompt: false
						}
				}}>Later</Button>
			</div>
		</>)
	} else if (auth.stage.value === 'EMAIL') {
		content = (
			<form onSubmit={async (event) => {
				event.preventDefault()
				await auth.submitEmail()
			}}>
				<p>Enter your email:</p>
				<div class={popupStyles.inputRow}>
					<Input type='email' placeholder='fiona@hackclub.com' autoComplete='email' bind={auth.email} />
					<Button accent type='submit' disabled={!auth.emailValid.value} loading={auth.isLoading.value}>
						Next
					</Button>
				</div>
				{auth.state.value === 'EMAIL_INCORRECT' && <p class={popupStyles.error}>Failed sending login code. Did you enter the right email?</p>}
			</form>
		)
	} else if (auth.stage.value === 'CODE' || auth.stage.value === 'LOGGED_IN') {
		content = (
			<form onSubmit={async (event) => {
				event.preventDefault()
				await auth.submitCode()
				if (auth.state.value === 'LOGGED_IN' && props.persistenceState.value.kind === 'PERSISTED') {
					window.location.reload()
				}
			}}>
				<p>Enter the code we just emailed to you at {auth.email}:</p>
				<div class={popupStyles.inputRow}>
					<Input type='text' maxLength={6} placeholder='123456' bind={auth.code} />
					<Button accent type='submit' disabled={!auth.codeValid.value} loading={auth.isLoading.value}>
						Finish logging in
					</Button>
				</div>
				{auth.state.value === 'CODE_INCORRECT' && <p class={popupStyles.error}>Incorrect login code.</p>}
				<p class={popupStyles.muted}>
					Wrong email?{' '}
					<LinkButton onClick={() => auth.wrongEmail()} disabled={auth.isLoading.value}>
						Go back
					</LinkButton>
				</p>
			</form>
		)
	}
	
	return (
		<div class={popupStyles.popup}>
			{content}
		</div>
	)
}