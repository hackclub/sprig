import type { Signal } from '@preact/signals'
import { saveGhostDraft, useAuthHelper } from '../../lib/auth-helper'
import type { PersistenceState } from '../../lib/state'
import Button from '../button'
import styles from './draft-warning.module.css'

export interface DraftWarningModalProps {
	persistenceState: Signal<PersistenceState>
}

export default function DraftWarningModal(props: DraftWarningModalProps) {
	const auth = useAuthHelper('EMAIL_ENTRY')

	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>
				<h2>You're gonna lose all your work! This is horrible!</h2>

				{auth.stage.value === 'EMAIL' ? (<>
					<p>Continue without saving anything</p>
					<Button
						accent
						disabled={auth.isLoading.value}
						onClick={() => {
							if (props.persistenceState.value.kind !== 'IN_MEMORY_DRAFT') return
							props.persistenceState.value = {
								...props.persistenceState.value,
								showInitialWarning: false
							}
						}}
					>
						Yeah
					</Button>

					<form onSubmit={async (event) => {
						event.preventDefault()
						await auth.submitEmail()
						if (auth.state.value === 'EMAIL_INCORRECT') saveGhostDraft(auth, props.persistenceState)
					}}>
						<p>Enter your email, we'll save your work and email you a link to edit it</p>
						<input
							type='email'
							autocomplete='email'
							value={auth.email}
							onInput={event => auth.email.value = event.currentTarget.value}
						/>
						<Button type='submit' disabled={!auth.emailValid.value} loading={auth.isLoading.value}>
							Continue
						</Button>
					</form>
				</>) : (<>
					<form onSubmit={async (event) => {
						event.preventDefault()
						await auth.submitCode()
						if (auth.state.value === 'LOGGED_IN') window.location.href = '/~'
					}}>
						<p>You've used Sprig before! Enter the code we mailed you to log in:</p>
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
						<Button disabled={auth.isLoading.value} onClick={() => saveGhostDraft(auth, props.persistenceState)}>
							Skip and just get coding
						</Button>
					</form>
				</>)}
			</div>
		</div>
	)
}