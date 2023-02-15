import { Signal, useSignal } from '@preact/signals'
import type { PersistenceState } from '../lib/state'
import Button from './design-system/button'
import SavePrompt from './popups-etc/save-prompt'
import LoginPrompt from './popups-etc/login-prompt'
import styles from './navbar.module.css'
import SprigIcon from './design-system/sprig-icon'
import { useEffect } from 'preact/hooks'
import { persist } from '../lib/auth-helper'

interface EditorNavbarProps {
	loggedIn: 'full' | 'partial' | 'none'
	persistenceState: Signal<PersistenceState>
}

export default function EditorNavbar(props: EditorNavbarProps) {
	const showSavePrompt = useSignal(false)
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
	if (props.persistenceState.value.kind === 'IN_MEMORY') {
		saveState = 'Your work is unsaved!'
	} else if (props.persistenceState.value.kind === 'SHARED') {
		saveState = props.persistenceState.value.stale
			? 'Your changes are unsaved!'
			: 'No changes to save'
	} else if (props.persistenceState.value.kind === 'PERSISTED') {
		saveState = {
			SAVED: `Saved to ${props.persistenceState.value.saveEmail ?? 'cloud'}`,
			SAVING: 'Saving...',
			ERROR: 'Error saving to cloud'
		}[props.persistenceState.value.cloudSaveState]
	}

	let actionButton
	if (props.persistenceState.value.kind === 'IN_MEMORY') {
		actionButton = <Button onClick={() => showSavePrompt.value = !showSavePrompt.value}>
			Save your work
		</Button>
	} else if (props.persistenceState.value.kind === 'SHARED') {
		actionButton = <Button onClick={() => {
			if (props.loggedIn !== 'full') persist(props.persistenceState)
			showSavePrompt.value = true
		}}>
			Clone to save edits
		</Button>
	} else if (props.loggedIn !== 'full') {
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
					</>) : props.persistenceState.value.kind === 'SHARED' ? (<>
						{props.persistenceState.value.name}
						{props.persistenceState.value.authorName && (
							<span class={styles.attribution}>
								{' '} by @{props.persistenceState.value.authorName}
							</span>
						)}
					</>) : 'Unsaved Game'}
				</li>
				<li class={styles.saveState}>{saveState}</li>
			</ul>
			<li>{actionButton}</li>
		</nav>

		<LoginPrompt persistenceState={props.persistenceState} />
		{showSavePrompt.value && <SavePrompt
			loggedIn={props.loggedIn}
			persistenceState={props.persistenceState}
			onClose={() => showSavePrompt.value = false}
		/>}

		{showNavPopup.value && <div class={styles.navPopup}>
			<ul>
				{props.loggedIn === 'none'
					? <li><a href='/'>Home</a></li>
					: <li><a href='/~'>Your games</a></li>}
				<li><a href='/gallery'>Gallery</a></li>
				<li><a href='/get'>Get a Sprig</a></li>
				<li><a href='https://github.com/hackclub/sprig/' target='_blank'>GitHub</a></li>
			</ul>
		</div>}
	</>)
}