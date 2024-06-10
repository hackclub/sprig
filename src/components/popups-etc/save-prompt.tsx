import { Signal, useComputed, useSignal } from '@preact/signals'
import { persist } from '../../lib/game-saving/auth-helper'
import { isValidEmail } from '../../lib/game-saving/email'
import { usePopupCloseClick } from '../../lib/utils/popup-close-click'
import type { PersistenceState } from '../../lib/state'
import Button from '../design-system/button'
import Input from '../design-system/input'
import popupStyles from './navbar-popup.module.css'

interface SavePromptProps {
	kind: 'email' | 'instant'
	persistenceState: Signal<PersistenceState>
	onClose: () => void
}

export default function SavePrompt(props: SavePromptProps) {
	const email = useSignal(props.persistenceState.value.session?.user.email ?? '')
	const emailValid = useComputed(() => isValidEmail(email.value))
	const done = useSignal(false)

	usePopupCloseClick(popupStyles.popup!, props.onClose)

	let content
	if (props.kind === 'email') {
		if (done.value) {
			content = (<>
				<p>
					Your work is {props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.cloudSaveState === 'SAVED' ? 'saved' : 'saving'} to the cloud and you have been emailed a link to access it!
				</p>
				<Button accent onClick={() => props.onClose()}>Done</Button>
			</>)
		} else {
			content = (
				<form onSubmit={async (event) => {
					event.preventDefault()
					persist(props.persistenceState, email.value)
					done.value = true
				}}>
					<p>Enter your email to save your work, we'll send you a link for later:</p>
					<div class={popupStyles.inputRow}>
						<Input onChange={() => undefined} value={email.value} type='email' autoComplete='email' placeholder='fiona@hackclub.com' bind={email} />
						<Button accent type='submit' disabled={!emailValid.value}>
							Save
						</Button>
					</div>
				</form>
			)
		}
	} else {
		content = (<>
			<p>
				Your work is {props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.cloudSaveState === 'SAVED' ? 'saved' : 'saving'} to the cloud.
			</p>
			<Button accent onClick={() => props.onClose()}>Done</Button>
		</>)
	}

	return (
		<div class={popupStyles.popup}>
			{content}
		</div>
	)
}
