import { Signal, useSignal } from '@preact/signals'
import { saveGhostDraft, useAuthHelper } from '../../lib/auth-helper'
import type { PersistenceState } from '../../lib/state'
import Button from '../button'
import popupStyles from './navbar-popup.module.css'

interface DraftSavePromptProps {
	persistenceState: Signal<PersistenceState>
	onClose: () => void
}

export default function DraftSavePrompt(props: DraftSavePromptProps) {
	const auth = useAuthHelper('EMAIL_ENTRY')
	const ghostStage = useSignal(false)

	let content
	if (ghostStage.value) {
		content = (<>
			<p>Your work is {props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.cloudSaveState === 'SAVED' ? 'saved' : 'saving'} to the cloud and you have been emailed a link to access it!</p>
			<Button accent onClick={() => props.onClose()}>Done</Button>
		</>)
	} else if (auth.stage.value === 'EMAIL') {
		content = (
			<form onSubmit={async (event) => {
				event.preventDefault()
				await auth.submitEmail()
				if (auth.state.value === 'EMAIL_INCORRECT') saveGhostDraft(auth, props.persistenceState)
			}}>
				<p>Enter your email to save your work, we'll send you a link for later:</p>
				<input
					type='email'
					autocomplete='email'
					value={auth.email}
					onInput={event => auth.email.value = event.currentTarget.value}
				/>
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
				if (auth.state.value === 'LOGGED_IN') {
					ghostStage.value = true
					await saveGhostDraft(auth, props.persistenceState)
					props.persistenceState.subscribe(() => {
						if (props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.cloudSaveState === 'SAVED')
							window.location.reload()
					})
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

				<p>Can't log in right now?</p>
				<Button disabled={auth.isLoading.value} onClick={() => {
					ghostStage.value = true
					saveGhostDraft(auth, props.persistenceState)
				}}>
					Skip and just get coding
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