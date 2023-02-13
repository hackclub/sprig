import type { Signal } from '@preact/signals'
import { useAuthHelper } from '../../lib/auth-helper'
import type { PersistenceState } from '../../lib/state'
import Button from '../button'
import popupStyles from './navbar-popup.module.css'

interface LoginPromptProps {
	persistenceState: Signal<PersistenceState>
}

export default function LoginPrompt(props: LoginPromptProps) {
	const auth = useAuthHelper()

	if (props.persistenceState.value.kind !== 'PERSISTED' || !props.persistenceState.value.showLoginPrompt) return null

	let content
	if (auth.stage.value === 'IDLE') {
		content = (<>
			^ Finish logging in to make multiple games and stuff whatever
			<Button accent onClick={() => auth.startEmailEntry()}>
				Heck yes
			</Button>
			<Button onClick={() => {
				if (props.persistenceState.value.kind === 'PERSISTED')
					props.persistenceState.value = {
						...props.persistenceState.value,
						showLoginPrompt: false
					}
			}}>No</Button>
		</>)
	} else if (auth.stage.value === 'EMAIL') {
		content = (
			<form onSubmit={async (event) => {
				event.preventDefault()
				await auth.submitEmail()
			}}>
				<p>Enter your email:</p>
				<input
					type='email'
					autocomplete='email'
					value={auth.email}
					onInput={event => auth.email.value = event.currentTarget.value}
				/>
				{auth.state.value === 'EMAIL_INCORRECT' && <p>Failed sending login code, check your email</p>}
				<Button accent type='submit' disabled={!auth.emailValid.value} loading={auth.isLoading.value}>
					Next
				</Button>
			</form>
		)
	} else if (auth.stage.value === 'CODE') {
		content = (
			<form onSubmit={async (event) => {
				event.preventDefault()
				await auth.submitCode()
				if (auth.state.value === 'LOGGED_IN' && props.persistenceState.value.kind === 'PERSISTED') {
					window.location.href = props.persistenceState.value.game === 'LOADING'
						? '/~'
						: `/~/${props.persistenceState.value.game.id}`
				}
			}}>
				<p>Welcome back! Enter the code we sent to your email:</p>
				<input
					type='text'
					value={auth.code}
					onInput={event => auth.code.value = event.currentTarget.value}
				/>
				{auth.state.value === 'CODE_INCORRECT' && <p>Incorrect login code</p>}
				<Button accent type='submit' disabled={!auth.codeValid.value} loading={auth.isLoading.value}>
					Log in
				</Button>
			</form>
		)
	}
	
	return (
		<div class={popupStyles.popup}>
			{content}
		</div>
	)
}