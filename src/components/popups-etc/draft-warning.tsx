import type { Signal } from '@preact/signals'
import { persist, useAuthHelper } from '../../lib/game-saving/auth-helper'
import { useNeedsManualMigration } from '../../lib/game-saving/legacy-migration'
import type { PersistenceState } from '../../lib/state'
import Button from '../design-system/button'
import Input from '../design-system/input'
import LinkButton from '../design-system/link-button'
import styles from './draft-warning.module.css'

export interface DraftWarningModalProps {
	persistenceState: Signal<PersistenceState>
}

export default function DraftWarningModal(props: DraftWarningModalProps) {
	const auth = useAuthHelper('EMAIL_ENTRY')
	const needsManualMigration = useNeedsManualMigration()

	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>
				{auth.stage.value === 'EMAIL' ? (<>
					{needsManualMigration.value ? (
						<div class={styles.warning}>
							<strong>Where did my games go?</strong> If you've used Sprig before on this browser, you may want to <a href='/migrate'>migrate your games</a>.
						</div>
					) : null}

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
						if (auth.state.value === 'EMAIL_INCORRECT') persist(props.persistenceState, auth.email.value)
					}} class={styles.stack}>
						<div class={styles.inputRow}>
							<Input onChange={() => undefined} value={auth.email.value} type='email' autoComplete='email' placeholder='fiona@hackclub.com' bind={auth.email} />
							<Button accent type='submit' disabled={!auth.emailValid.value} loading={auth.isLoading.value}>
								Start coding
							</Button>
						</div>

						<p class={styles.muted}>
							<LinkButton
								onClick={() => {
									if (props.persistenceState.value.kind !== 'IN_MEMORY') return
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
						if (auth.state.value === 'LOGGED_IN') window.location.replace('/~')
					}} class={styles.stack}>
						<h2>Welcome back!</h2>
						<p>You've used Sprig before, so we emailed you a code to log in and access all your games. Enter login code:</p>

						<div class={`${styles.inputRow} ${styles.limited}`}>
							<Input onChange={() => undefined} value={auth.code.value} maxLength={6} class={styles.center} type='text' bind={auth.code} placeholder='123456' />
							<Button accent type='submit' disabled={!auth.codeValid.value || auth.state.value === 'ACCOUNT_LOCKED'} loading={auth.isLoading.value}>
								Log in
							</Button>
						</div>
						{auth.state.value === 'CODE_INCORRECT' && <p class={styles.error}>Incorrect login code.</p>}
						{auth.state.value === 'ACCOUNT_LOCKED' && <p class={styles.error}>Account locked due to too many failed attempts. Please try again in {+import.meta.env.PUBLIC_LOCKOUT_DURATION_MS / 60000} minutes.</p>}
					</form>

					<p class={styles.muted}>
						Can't log in right now?{' '}
						<LinkButton onClick={() => persist(props.persistenceState, auth.email.value)} disabled={auth.isLoading.value}>
							Skip and just get coding
						</LinkButton>
					</p>
				</>)}
			</div>
		</div>
	)
}
