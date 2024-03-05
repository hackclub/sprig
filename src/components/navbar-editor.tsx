import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import { codeMirror, PersistenceState, isDark, toggleTheme, errorLog, editSessionLength } from '../lib/state'
import Button from './design-system/button'
import Textarea from './design-system/textarea'
import SavePrompt from './popups-etc/save-prompt'
import styles from './navbar.module.css'
import { persist } from '../lib/game-saving/auth-helper'
import InlineInput from './design-system/inline-input'
import { throttle } from 'throttle-debounce'
import SharePopup from './popups-etc/share-popup'
import { IoChevronDown, IoLogoGithub, IoPlay, IoSaveOutline, IoShareOutline, IoShuffle, IoWarning } from 'react-icons/io5'
import { usePopupCloseClick } from '../lib/utils/popup-close-click'
import { upload, uploadState } from '../lib/upload'
import { VscLoading } from 'react-icons/vsc'
import { defaultExampleCode } from '../lib/examples'
import { js_beautify } from 'js-beautify';

const saveName = throttle(500, async (gameId: string, newName: string) => {
	try {
		const res = await fetch('/api/games/rename', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ gameId, newName })
		})
		if (!res.ok) throw new Error(`Error renaming game: ${await res.text()}`)
	} catch (error) {
		console.error(error)
	}
})

const onNameEdit = (persistenceState: Signal<PersistenceState>, newName: string) => {
	if (persistenceState.value.kind !== 'PERSISTED' || persistenceState.value.game === 'LOADING') return
	saveName(persistenceState.value.game.id, newName)
	persistenceState.value = {
		...persistenceState.value,
		game: {
			...persistenceState.value.game,
			name: newName
		}
	}
}

const canDelete = (persistenceState: Signal<PersistenceState>) => {
	return true
		&& persistenceState.value.kind === 'PERSISTED'
		&& persistenceState.value.game !== 'LOADING'
		&& !persistenceState.value.game.unprotected
}

interface EditorNavbarProps {
	persistenceState: Signal<PersistenceState>
}

type StuckCategory = "Logic Error" | "Syntax Error" | "Other";

type StuckData = {
	category: StuckCategory
	description: string
}

const stripWhitespaceAndUpdate = () => {
    // Check if the CodeMirror editor is empty to avoid unnecessary processing
    if (!codeMirror.value) return;

    // Retrieve the current text from the CodeMirror editor
    const currentText = codeMirror.value.state.doc.toString();

    // Configuration options for beautifying JavaScript code
    const beautifyOptions = {
        indent_size: 2, // Sets indentation to 2 spaces for readability
        space_in_empty_paren: true, // Adds a space inside empty parentheses for clarity
        end_with_newline: true, // Ensures the file ends with a newline, a common coding standard
        wrap_line_length: 0, // No wrapping, to avoid breaking code into unintended lines
        preserve_newlines: false, // Removes extra newlines to tidy up the code
        max_preserve_newlines: 2, // Limits consecutive newlines to 2 for spacing consistency
        brace_style: "end-expand", // Places closing braces on a new line for blocks, improving readability
        space_after_anon_function: true, // Adds a space after anonymous function declarations
    };

    // Beautify the current text using the configured options
    const formattedText = js_beautify(currentText, beautifyOptions);

    // Update the CodeMirror editor with the beautified text
    const updateTransaction = codeMirror.value.state.update({
        changes: { from: 0, to: codeMirror.value.state.doc.length, insert: formattedText }
    });

    // Apply the update to the editor
    codeMirror.value.dispatch(updateTransaction);
};
export default function EditorNavbar(props: EditorNavbarProps) {
	const showNavPopup = useSignal(false)
	const showStuckPopup = useSignal(false)

	// we will accept the current user's
	// - name,
	// - the category of issue they
	// - their description of the issue
	const stuckData = useSignal<StuckData>({
		category: "Other",
		description: ""
	});
	// keep track of the submit status for "I'm stuck" requests
	const isSubmitting = useSignal<boolean>(false);

	const isLoggedIn = props.persistenceState.value.session ? true : false;

	const showSavePrompt = useSignal(false)
	const showSharePopup = useSignal(false)

	const deleteState = useSignal<'idle' | 'confirm' | 'deleting'>('idle')
	const resetState = useSignal<'idle' | 'confirm'>('idle')
	useSignalEffect(() => {
		const _showNavPopup = showNavPopup.value
		const _deleteState = deleteState.value
		const _resetState = resetState.value
		if (!_showNavPopup && _deleteState === 'confirm') deleteState.value = 'idle'
		if (!_showNavPopup && _resetState === 'confirm') resetState.value = 'idle'
	})

	// usePopupCloseClick closes a popup when you click outside of its area
	usePopupCloseClick(styles.navPopup!, () => showNavPopup.value = false, showNavPopup.value)
	usePopupCloseClick(styles.stuckPopup!, () => showStuckPopup.value = false, showStuckPopup.value)

	let saveState
	let actionButton
	let errorBlink = false
	if (props.persistenceState.value.kind === 'IN_MEMORY') {
		saveState = 'Your work is unsaved!'

		actionButton = <Button icon={IoSaveOutline} onClick={() => showSavePrompt.value = !showSavePrompt.value}>
			Save your work
		</Button>
	} else if (props.persistenceState.value.kind === 'SHARED') {
		saveState = props.persistenceState.value.stale
			? 'Your changes are unsaved!'
			: 'No changes to save'

		actionButton = <Button icon={IoShuffle} onClick={() => {
			if (props.persistenceState.value.session?.session.full)
				persist(props.persistenceState)
			showSavePrompt.value = true
		}}>
			Remix to save edits
		</Button>
	} else if (props.persistenceState.value.kind === 'PERSISTED') {
		saveState = {
			SAVED: `Saved to ${props.persistenceState.value.session?.user.email ?? '???'}`,
			SAVING: 'Saving...',
			ERROR: 'Error saving to cloud'
		}[props.persistenceState.value.cloudSaveState]
		if (props.persistenceState.value.cloudSaveState === 'ERROR')
			errorBlink = true

		actionButton = <Button icon={IoShareOutline} onClick={() => showSharePopup.value = !showSharePopup.value}>
			Share
		</Button>
	}

	return (<>
		<nav class={styles.container}>
			<ul class={styles.editorStats}>
				<li class={`${styles.logo} ${showNavPopup.value ? styles.active : ''}`}>
					<button onClick={() => showNavPopup.value = !showNavPopup.value}>
						{/* <SprigIcon /> */}
						<img class={styles.dino} src='/SPRIGDINO.png' height={38} />
						<div class={styles.caret}><IoChevronDown /></div>
					</button>
				</li>
				<li class={styles.filename}>
					{props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.game !== 'LOADING' ? (<>
						<InlineInput
							placeholder='Untitled'
							value={props.persistenceState.value.game.name}
							onChange={newName => onNameEdit(props.persistenceState, newName)}
						/>
						<span class={styles.attribution}>{' '} by you</span>
					</>) : props.persistenceState.value.kind === 'SHARED' ? (<>
						{props.persistenceState.value.name}
						<span class={styles.attribution}>
							{props.persistenceState.value.authorName
								? ` by ${props.persistenceState.value.authorName}`
								: ' (shared with you)'}
						</span>
					</>) : 'Unsaved Game'}
				</li>
				<li class={`${styles.saveState} ${errorBlink ? styles.error : ''}`}>
					{saveState}
				</li>
			</ul>

			<li class={styles.actionIcon}>
				<a href='https://github.com/hackclub/sprig/' target='_blank'>
					<IoLogoGithub />
				</a>
			</li>

			<li>
				<Button class={styles.stuckBtn} onClick={() => showStuckPopup.value = !showStuckPopup.value} disabled={!isLoggedIn}>
					I'm stuck
				</Button>
			</li>

			<li>
				<Button onClick={toggleTheme}>
					{isDark.value ? "Light" : "Dark"}
				</Button>
			</li>

			<li>
				<Button
					accent
					icon={{
						IDLE: IoPlay,
						LOADING: VscLoading,
						ERROR: IoWarning
					}[uploadState.value]}
					spinnyIcon={uploadState.value === 'LOADING'}
					loading={uploadState.value === 'LOADING'}
					onClick={() => upload(codeMirror.value?.state.doc.toString() ?? '')}
				>
					Run on Device
				</Button>
			</li>

			<li>{actionButton}</li>
		</nav>

		{/* <LoginPrompt persistenceState={props.persistenceState} /> */}
		{showSavePrompt.value && <SavePrompt
			kind={props.persistenceState.value.session?.session.full
				? 'instant'
				: 'email'}
			persistenceState={props.persistenceState}
			onClose={() => showSavePrompt.value = false}
		/>}
		{showSharePopup.value && <SharePopup
			persistenceState={props.persistenceState}
			onClose={() => showSharePopup.value = false}
		/>}

		{showStuckPopup.value && (
			<div class={styles.stuckPopup}>
				<form class={styles.stuckForm} onSubmit={async (event) => {
					event.preventDefault(); // prevent the browser from reloading after form submit

					isSubmitting.value = true;

					// 'from' and 'to' represent the index of character where the selection is started to where it's ended
					// if 'from' and 'to' are equal, then it's the cursor position
					// from && to being -1 means the cursor is not in the editor
					const selectionRange = codeMirror.value?.state.selection.ranges[0] ?? { from: -1, to: -1 };

					// Store a copy of the user's code, currently active errors and the length of their editing session
					// along with their description of the issue
					const payload = {
					  selection: JSON.stringify({ from: selectionRange.from, to: selectionRange.to }),
					  email: props.persistenceState.value.session?.user.email,
						code: codeMirror.value?.state.doc.toString(),
						error: errorLog.value,
						sessionLength: (new Date().getTime() - editSessionLength.value.getTime()) / 1000, // calculate the session length in seconds
						...stuckData.value
					};

					try {
						const response = await fetch("/api/stuck-request", {
							method: "POST",
							body: JSON.stringify(payload)
						})
						// Let the user know we'll get back to them after we've receive their complaint
						if (response.ok) {
							alert("We received your request and will get back to you via email.")
						} else alert("We couldn't send your request. Please make sure you're connected and try again.")

					} catch (err) {
						console.error(err);
					} finally {
						isSubmitting.value = false;
					}
			}}>
					<label htmlFor="issue category">What is the type of issue you're facing?</label>
					<select value={stuckData.value.category} onChange={(event) => {
						stuckData.value = { ...stuckData.value, category: (event.target! as HTMLSelectElement).value as StuckCategory }
					}} name="" id="">
						<option value={"Logic Error"}>Logic Error</option>
						<option value={"Syntax Error"}>Syntax Error</option>
						<option value={"Other"}>Other</option>
					</select>
					<label htmlFor="Description">Please describe the issue you're facing below</label>
					<Textarea required value={stuckData.value.description} onChange={event => {
						stuckData.value = { ...stuckData.value, description: event.target.value }
					}} placeholder='Example: After 2 seconds, the browser tab suddenly freezes and I do not know why.' />
					<br />
					<Button type='submit' disabled={isSubmitting.value}>
						{isSubmitting.value ? "Sending..." : "Send"}
					</Button>
				</form>
			</div>
		)}
		{showNavPopup.value && <div class={styles.navPopup}>
			<ul>
				{props.persistenceState.value.session?.session.full
					? (<>
						<li><a href='/~'>Your games</a></li>
						<li><a href='/~/new'>New game</a></li>
					</>)
					: (<>
						<li><a href='/~'>Your games (log in)</a></li>
						<li>
							<a href='javascript:void' role='button' onClick={() => {
								if (resetState.value === 'idle') {
									resetState.value = 'confirm'
								} else {
									codeMirror.value?.dispatch({
										changes: {
											from: 0,
											to: codeMirror.value.state.doc.length,
											insert: defaultExampleCode
										}
									})
									resetState.value = 'idle'
								}
							}}>
								{resetState.value === 'idle'
									? 'Reset game code'
									: 'Are you sure?'}
							</a>
						</li>
					</>)}
				<li><a href='/gallery'>Gallery</a></li>
				<li><a href='/get'>Get a Sprig</a></li>
				<li><a href='javascript:void' role='button' onClick={stripWhitespaceAndUpdate}>Prettify code</a></li>
			</ul>
			<div class={styles.divider} />
			<ul>
				<li>
					<a href='javascript:void' role='button' onClick={() => {
						const a = document.createElement('a')
						const name = props.persistenceState.value.kind === 'PERSISTED' && props.persistenceState.value.game !== 'LOADING'
							? props.persistenceState.value.game.name
							: props.persistenceState.value.kind === 'SHARED'
								? props.persistenceState.value.name
								: 'sprig-game'
						const code = codeMirror.value?.state.doc.toString() ?? ''
						const url = URL.createObjectURL(new Blob([ code ], { type: 'application/javascript' }))
						a.href = url
						a.download = `${name}.js`
						a.click()
					}}>
						Download
					</a>
				</li>
				{canDelete(props.persistenceState) ? (
					<li>
						<a href='javascript:void' role='button' onClick={async () => {
							if (deleteState.value === 'idle') {
								deleteState.value = 'confirm'
							} else if (deleteState.value === 'confirm') {
								deleteState.value = 'deleting'
								const res = await fetch(`/api/games/delete`, {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({
										gameId: props.persistenceState.value.kind === 'PERSISTED'
											&& props.persistenceState.value.game !== 'LOADING'
											&& props.persistenceState.value.game.id
									})
								})
								if (!res.ok) console.error(`Error deleting game: ${await res.text()}`)
								window.location.replace('/~')
							}
						}}>
							{{
								idle: 'Delete',
								confirm: 'Are you sure?',
								deleting: 'Deleting...'
							}[deleteState.value]}
						</a>
					</li>
				) : null}
				{props.persistenceState.value.session?.session.full && 
				(<li>
					<a href="/logout">Log out</a>
				</li>)}
			</ul>
		</div>}
	</>)
}
