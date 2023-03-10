import { useSignal, useSignalEffect } from '@preact/signals'
import { IoClose } from 'react-icons/io5'
import { codeMirror, editors, openEditor } from '../../lib/state'
import styles from './editor-modal.module.css'

export default function EditorModal() {
	if (!openEditor.value) return null
	const Content = editors[openEditor.value.kind].modalContent

	const text = useSignal(openEditor.value.text)

	// Sync editor changes with text
	useSignalEffect(() => {
		if (openEditor.value) text.value = openEditor.value.text
	})

	// Sync text changes with editor
	useSignalEffect(() => {
		const _openEditor = openEditor.peek() // Gotta peek to avoid cycles
		if (!_openEditor || !codeMirror.value) return

		codeMirror.value.dispatch({
			changes: {
				..._openEditor.editRange,
				insert: text.value
			}
		})
		
		openEditor.value = {
			..._openEditor,
			text: text.value,
			editRange: {
				from: _openEditor.editRange.from,
				to: _openEditor.editRange.from + text.value.length
			}
		}
	})

	return (
		<div
			class={styles.overlay}
			onClick={(event) => {
				// Ignore clicks inside modal content
				for (const item of event.composedPath()) {
					if (item instanceof HTMLElement && item.classList.contains(styles.content!)) return
				}
				openEditor.value = null
			}}
		>
			<div class={`${styles.container} ${editors[openEditor.value.kind].fullsizeModal ? styles.fullsize : ''}`}>
				<button class={styles.close}><IoClose /></button>
				<div class={styles.content}><Content text={text} /></div>
			</div>
		</div>
	)
}