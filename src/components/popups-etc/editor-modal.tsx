import { useSignal, useSignalEffect } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { IoClose } from 'react-icons/io5'
import tinykeys from 'tinykeys'
import { usePopupCloseClick } from '../../lib/utils/popup-close-click'
import { codeMirror, editors, openEditor, codeMirrorEditorText, _foldRanges, _widgets, OpenEditor } from '../../lib/state'
import styles from './editor-modal.module.css'
import levenshtein from 'js-levenshtein'
import { runGameHeadless } from '../../lib/engine'

export default function EditorModal() {
	const Content = openEditor.value ? editors[openEditor.value.kind].modalContent : () => null
	const text = useSignal(openEditor.value?.text ?? '')

	useSignalEffect(() => {
		if (openEditor.value) text.value = openEditor.value.text
	})

	// Sync editor text changes with code
	useSignalEffect(() => {
		// Signals are killing me but useEffect was broken and I need to ship this
		// This is probably bad practice
		const _openEditor = openEditor.peek() // Gotta peek to avoid cycles
		const _text = text.value // But we want to sub to this

		// Sync only if there's an active CodeMirror editor and an open editor
		if (!codeMirror.value || !_openEditor) return;

		// Differentiate between map and palette updates
		if (_openEditor.kind === 'palette' || _openEditor.kind === 'map') {
			console.log('dispatching', _openEditor.editRange, _text);

			codeMirror.value.dispatch({
				changes: {
					from: _openEditor.editRange.from,
					to: _openEditor.editRange.to,
					insert: _text
				}
			})

			// Update openEditor with new text and correct range
			openEditor.value = {
				..._openEditor,
				text: _text,
				editRange: {
					from: _openEditor.editRange.from,
					to: _openEditor.editRange.from + _text.length
				}
			};
		}
	});

	// the challenge now is making the editor keep track of what map editor it's currently focused on and streaming the changes in the map editor
	// it's tricky because maps can grow and shrink

	useEffect(() => {
		// just do this to sync the editor text with the code mirror text

		if (!openEditor.value) return;

		const code = codeMirror.value?.state.doc.toString() ?? '';
		const levenshtainDistances = _foldRanges.value.map((foldRange, index) => {
			const widgetKind = _widgets.value[index]?.value.spec.widget.props.kind;

			// Filter out unrelated widgets
			if (!openEditor.value || widgetKind !== openEditor.value.kind) return -1;

			const foldCode = code.slice(foldRange.from, foldRange.to);
			return levenshtein(text.value, foldCode);
		});

		// Find closest matching fold range
		const validDistances = levenshtainDistances.filter(d => d >= 0);
		if (validDistances.length === 0) return;

		const indexOfMinDistance = validDistances.indexOf(Math.min(...validDistances));
		const editRange = _foldRanges.value[indexOfMinDistance];

		// Update the open editor range and content
		if (editRange) {
			const openEditorCode = code.slice(editRange.from, editRange.to);

			// If it's a map editor, update bitmaps based on headless game logic
			if (openEditor.value.kind === 'map') {
				runGameHeadless(code);
			}

			openEditor.value = {
				...openEditor.value as OpenEditor,
				editRange: {
					from: editRange.from,
					to: editRange.to
				},
				text: openEditorCode
			}
		}
	}, [codeMirrorEditorText.value]);

	// Handle closing modal on escape key press or outside click
	usePopupCloseClick(styles.content!, () => openEditor.value = null, !!openEditor.value)
	useEffect(() => {
		const unsubscribe = tinykeys(window, {
			'Escape': () => openEditor.value = null
		});
		return () => unsubscribe()
	}, [])

	// Render only when there's an open editor
	if (!openEditor.value) return null

	return (
		<div class={styles.overlay}>
			<div class={`${styles.container} ${editors[openEditor.value.kind].fullsizeModal ? styles.fullsize : ''}`}>
				<button class={styles.close}><IoClose /></button>
				<div class={styles.content}><Content text={text} /></div>
			</div>
		</div>
	)
}