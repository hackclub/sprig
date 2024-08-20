import { useSignalEffect } from '@preact/signals'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { SessionInfo } from '../../lib/game-saving/account'
import {DevEmail, useAuthHelper} from '../../lib/game-saving/auth-helper'
import Button from '../design-system/button'
import Input from '../design-system/input'
import LinkButton from '../design-system/link-button'
import MainNavbar from '../navbar-main'
import styles from './login.module.css'

interface LoginProps {
	session: SessionInfo | null
	to: string
	email: string
}

export default function Login({ session, email, to }: LoginProps) {
	const auth = useAuthHelper('EMAIL_ENTRY', email)
	useSignalEffect(() => {
		if (auth.stage.value === 'LOGGED_IN') window.location.replace(to)
	})

	return (
		<div class={styles.page}>
			<MainNavbar session={session} />

			<div class={styles.pageMain}>
				<form onSubmit={(event) => {
					event.preventDefault()
					if (auth.stage.value === 'EMAIL') {
						auth.submitEmail()
					} else if (auth.stage.value === 'CODE') {
						auth.submitCode()
					}
				}}>
					<h1>Log In to Sprig</h1>
					{auth.stage.value === 'EMAIL' ? (<>
						<p>Please enter your email address below. We'll send you a code to access all your games.</p>

						<Input onChange={() => undefined} value={auth.email.value} type='email' id='email' autoComplete='email' placeholder='fiona@hackclub.com' bind={auth.email} />
						{auth.state.value === 'EMAIL_INCORRECT' && <p class={styles.error}>Failed sending login code. Did you enter the right email?</p>}

						<Button class={styles.submit} icon={IoPaperPlaneOutline} iconSide='right' accent type='submit' disabled={!auth.emailValid.value} loading={auth.isLoading.value}>
							Send code
						</Button>
					</>) : (<>
						<p>
							Please enter the auth code we just emailed to you at {auth.email}.{' '}
						</p>
						<p>
							<span class={styles.muted}>
								Wrong email?{' '}
								<LinkButton onClick={() => auth.wrongEmail()} disabled={auth.isLoading.value}>
									Go back
								</LinkButton>
							</span>
						</p>
						<Input onChange={() => undefined} value={auth.code.value} id='code' type='text' maxLength={auth.email.value == DevEmail ? 70 : 6} placeholder='123456'  bind={auth.code} />
						{auth.state.value === 'CODE_INCORRECT' && <p class={styles.error}>Incorrect login code.</p>}
						{auth.state.value === 'ACCOUNT_LOCKED' && <p class={styles.error}>Account locked due to too many failed attempts. Please try again in {+import.meta.env.PUBLIC_LOCKOUT_DURATION_MS / 60000} minutes.</p>}

                        <Button class={styles.submit} accent type='submit' disabled={!auth.codeValid.value || auth.state.value === 'ACCOUNT_LOCKED'} loading={auth.isLoading.value}>
							Finish logging in
						</Button>
					</>)}
				</form>
			</div>
		</div>
	)
}
