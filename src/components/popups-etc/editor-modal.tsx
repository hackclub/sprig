import { useSignal, useSignalEffect } from '@preact/signals'
import { IoClose } from 'react-icons/io5'
import { codeMirror, editors, openEditor } from '../../lib/state'
import styles from './editor-modal.module.css'

export default function EditorModal() {
	const Content = openEditor.value ? editors[openEditor.value.kind].modalContent : () => null
	const text = useSignal(openEditor.value?.text ?? '')

	// Sync code changes with editor text
	useSignalEffect(() => {
		if (openEditor.value) text.value = openEditor.value.text
	})

	// Sync editor text changes with code
	useSignalEffect(() => {
		// Signals are killing me but useEffect was broken and I need to ship this
		// This is probably bad practice
		const _openEditor = openEditor.peek() // Gotta peek to avoid cycles
		const _text = text.value // But we want to sub to this
		if (!codeMirror.value || !_openEditor) return

		codeMirror.value.dispatch({
			changes: {
				..._openEditor.editRange,
				insert: _text
			}
		})
		
		openEditor.value = {
			..._openEditor,
			text: _text,
			editRange: {
				from: _openEditor.editRange.from,
				to: _openEditor.editRange.from + _text.length
			}
		}
	})

	if (!openEditor.value) return null
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