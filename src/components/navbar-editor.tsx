import { Signal, useSignal } from '@preact/signals'
import type { PersistenceState } from '../lib/state'
import Button from './button'
import DraftSavePrompt from './popups-etc/draft-save-prompt'
import LoginPrompt from './popups-etc/login-prompt'
import styles from './navbar.module.css'
import SprigIcon from './sprig-icon'
import { useEffect } from 'preact/hooks'

interface EditorNavbarProps {
	loggedIn: boolean
	persistenceState: Signal<PersistenceState>
}

export default function EditorNavbar(props: EditorNavbarProps) {
	const showDraftSavePrompt = useSignal(false)
	const showNavPopup = useSignal(false)

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			// Ignore clicks inside popup content (and the logo, so it can be toggled)
			for (const item of event.composedPath()) {
				if (item instanceof HTMLElement && (
					item.classList.contains(styles.navPopup!) ||
					item.classList.contains(styles.logo!)
				)) return
			}
			showNavPopup.value = false
		}
		window.addEventListener('click', listener)
		return () => window.removeEventListener('click', listener)
	}, [])

	let saveState
	if (props.persistenceState.value.kind === 'IN_MEMORY_DRAFT') {
		saveState = 'Your work is unsaved!'
	} else if (props.persistenceState.value.kind === 'SHARED') {
		saveState = 'Your work is unsaved!'
	} else if (props.persistenceState.value.kind === 'PERSISTED') {
		saveState = {
			SAVED: `Saved to ${props.persistenceState.value.saveEmail ?? 'cloud'}`,
			SAVING: props.persistenceState.value.game === 'LOADING' || props.persistenceState.value.game.isDraft
				? 'Saving draft...'
				: 'Saving...',
			ERROR: 'Error saving to cloud'
		}[props.persistenceState.value.cloudSaveState]
	}

	let actionButton
	if (props.persistenceState.value.kind === 'IN_MEMORY_DRAFT') {
		actionButton = <Button onClick={() => showDraftSavePrompt.value = !showDraftSavePrompt.value}>
			Save your work
		</Button>
	} else if (props.persistenceState.value.kind === 'SHARED') {
		actionButton = <Button>Remix</Button>
	} else if (props.persistenceState.value.kind === 'PERSISTED'
		&& props.persistenceState.value.game !== 'LOADING'
		&& props.persistenceState.value.game.isDraft
	) {
		actionButton = <Button onClick={() => {
			if (props.persistenceState.value.kind === 'PERSISTED')
				props.persistenceState.value = {
					...props.persistenceState.value,
					showLoginPrompt: !props.persistenceState.value.showLoginPrompt
				}
		}}>
			Log in to share
		</Button>
	} else {
		actionButton = <Button>Share...</Button>
	}

	return (<>
		<nav class={styles.container}>
			<ul class={styles.editorStats}>
				<li class={`${styles.logo} ${showNavPopup.value ? styles.active : ''}`}>
					<button onClick={() => showNavPopup.value = !showNavPopup.value}>
						<SprigIcon />
					</button>
				</li>
				<li class={styles.filename}>
					{props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.game !== 'LOADING' ? (<>
						{props.persistenceState.value.game.name}
						<span class={styles.attribution}>{' '} by you</span>
					</>) : 'Draft'}
				</li>
				<li class={styles.saveState}>{saveState}</li>
			</ul>
			<li>{actionButton}</li>
		</nav>

		<LoginPrompt persistenceState={props.persistenceState} />
		{showDraftSavePrompt.value && <DraftSavePrompt
			persistenceState={props.persistenceState}
			onClose={() => showDraftSavePrompt.value = false}
		/>}

		{showNavPopup.value && <div class={styles.navPopup}>
			<ul>
				<li><a href='/~'>Your games</a></li>
				<li><a href='/gallery'>Gallery</a></li>
				<li><a href='/get'>Get a Sprig</a></li>
				<li><a href='https://github.com/hackclub/sprig/' target='_blank'>GitHub</a></li>
			</ul>
		</div>}
	</>)
}