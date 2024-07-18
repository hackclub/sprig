import { useSignal, useSignalEffect } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { IoClose } from 'react-icons/io5'
import tinykeys from 'tinykeys'
import { usePopupCloseClick } from '../../lib/utils/popup-close-click'
import { codeMirror, editors, openEditor, codeMirrorEditorText, _foldRanges, _widgets } from '../../lib/state'
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

	// the challenge now is making the editor keep track of what map editor it's currently focused on and streaming the changes in the map editor
	// it's tricky because maps can grow and shrink

	useEffect(() => {
		// just do this to sync the editor text with the code mirror text

		const code = codeMirror.value?.state.doc.toString() ?? '';
		const levenshtainDistances = _foldRanges.value.map((foldRange, foldRangeIndex) => {
			const widgetKind = _widgets.value[foldRangeIndex]?.value.spec.widget.props.kind;

			// if the widget kind is not the same as the open editor kind, don't do anything
			if (widgetKind !== openEditor.value?.kind) return -1;

			const theCode = code.slice(foldRange?.from, foldRange?.to);

			const distance = levenshtein(text.value, theCode)
			return distance;
		});



		// if (levenshtainDistances.length === 0) alert(`You are currently editing a deleted ${openEditor.value?.kind}`);
		if (levenshtainDistances.length === 0) return;

		// compute the index of the min distance
		let indexOfMinDistance = 0;
		levenshtainDistances.forEach((distance, didx) => {
			if (levenshtainDistances[indexOfMinDistance]! < 0) indexOfMinDistance = didx;
			const min = levenshtainDistances[indexOfMinDistance]!;
			if (distance >= 0 && distance <= min) indexOfMinDistance = didx;
		});

		// update the open editor if the index is not -1
		if (indexOfMinDistance !== -1) {
			const editRange = _foldRanges.value[indexOfMinDistance]
			const openEditorCode = code.slice(editRange?.from, editRange?.to)

			// the map editor needs to get the bitmaps after running the code
			if (openEditor.value?.kind === 'map') runGameHeadless(code ?? '');

			openEditor.value = {
				...openEditor.value,
				editRange: {
					from: editRange!.from,
					to: editRange!.to
				},
				text: openEditorCode
			}
		}

	}, [codeMirrorEditorText.value]);


	usePopupCloseClick(styles.content!, () => openEditor.value = null, !!openEditor.value)
	useEffect(() => tinykeys(window, {
		'Escape': () => openEditor.value = null
	}), [])
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
