import type { Signal } from '@preact/signals'
import { saveGhostDraft, useAuthHelper } from '../../lib/auth-helper'
import type { PersistenceState } from '../../lib/state'
import Button from '../button'
import Input from '../input'
import LinkButton from '../link-button'
import styles from './draft-warning.module.css'

export interface DraftWarningModalProps {
	persistenceState: Signal<PersistenceState>
}

export default function DraftWarningModal(props: DraftWarningModalProps) {
	const auth = useAuthHelper('EMAIL_ENTRY')

	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>
				{auth.stage.value === 'EMAIL' ? (<>
					<div class={styles.stack}>
						<h2>Start building right away</h2>
						<p>
							Enter your email and we will save your code and send you a link.
							We'll never use this for marketing purposes.
						</p>
					</div>

					<form onSubmit={async (event) => {
						event.preventDefault()
						await auth.submitEmail()
						if (auth.state.value === 'EMAIL_INCORRECT') saveGhostDraft(auth, props.persistenceState)
					}} class={styles.stack}>
						<div class={styles.inputRow}>
							<Input type='email' autoComplete='email' placeholder='fiona@hackclub.com' bind={auth.email} />
							<Button accent type='submit' disabled={!auth.emailValid.value} loading={auth.isLoading.value}>
								Start coding
							</Button>
						</div>

						<p class={styles.muted}>
							<LinkButton
								onClick={() => {
									if (props.persistenceState.value.kind !== 'IN_MEMORY_DRAFT') return
									props.persistenceState.value = {
										...props.persistenceState.value,
										showInitialWarning: false
									}
								}}
								disabled={auth.isLoading.value}
							>
								or continue without saving your work
							</LinkButton>
						</p>
					</form>
				</>) : (<>
					<form onSubmit={async (event) => {
						event.preventDefault()
						await auth.submitCode()
						if (auth.state.value === 'LOGGED_IN') window.location.href = '/~'
					}} class={styles.stack}>
						<h2>Welcome back!</h2>
						<p>You've used Sprig before, so we emailed you a code to log in and access all your games. Enter login code:</p>

						<div class={`${styles.inputRow} ${styles.limited}`}>
							<Input maxLength={6} class={styles.center} type='text' bind={auth.code} placeholder='123456' />
							<Button accent type='submit' disabled={!auth.codeValid.value} loading={auth.isLoading.value}>
								Log in
							</Button>
						</div>
						{auth.state.value === 'CODE_INCORRECT' && <p class={styles.error}>Incorrect login code.</p>}
					</form>

					<p class={styles.muted}>
						Can't log in right now?{' '}
						<LinkButton onClick={() => saveGhostDraft(auth, props.persistenceState)} disabled={auth.isLoading.value}>
							Skip and just get coding
						</LinkButton>
					</p>
				</>)}
			</div>
		</div>
	)
}