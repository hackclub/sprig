import { useSignal, useSignalEffect } from '@preact/signals'
import { useEffect, useState } from 'preact/hooks'
import { IoClose } from 'react-icons/io5'
import tinykeys from 'tinykeys'
import { usePopupCloseClick } from '../../lib/utils/popup-close-click'
import { codeMirror, editors, openEditor, codeMirrorEditorText, _foldRanges, _widgets, OpenEditor } from '../../lib/state'
import styles from './editor-modal.module.css'
import levenshtein from 'js-levenshtein'
import { runGameHeadless } from '../../lib/engine'

const enum UpdateCulprit {
	RESET,
	OpenEditor,
	CodeMirror		
}
export default function EditorModal() {
	const Content = openEditor.value ? editors[openEditor.value.kind].modalContent : () => null
	const text = useSignal(openEditor.value?.text ?? '');
	const [updateCulprit, setUpdateCulprit] = useState<UpdateCulprit>(UpdateCulprit.RESET);

	useSignalEffect(() => {
		if (openEditor.value) text.value = openEditor.value.text
	})

	/**
	 * @Josias
	 * The two useEffect's below can be naughty but they help ensure two things
	 * 1. If an update comes from the underlying codemirror document, the first effect doesn't run as we're already updating the editor modal from there
	 * 2. If an update was originally made from the currently open editor modal, the changes to the codemirror document will
	 * not trigger an update to the open editor modal
	 * 
	 * Both of these help us avoid Out-of-order errors or Cycles
	 */

	// Sync editor text changes with code
	useEffect(() => { // useEffect #1
		// if update comes from codemirror doc (probably from a collab session)
		// this ensures that updates are not triggered from this effect which may cause an 
		// Out-of-order / Cycles
		if (updateCulprit === UpdateCulprit.CodeMirror) {
			setUpdateCulprit(UpdateCulprit.RESET);
			return;
		}
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
		setUpdateCulprit(UpdateCulprit.OpenEditor);
	}, [text.value]);


	useEffect(() => {
		// if update comes from codemirror doc (probably from a collab session)
		// this ensures that updates are not triggered from this effect which may cause an 
		// Out-of-order / Cycles
		if (updateCulprit === UpdateCulprit.OpenEditor) {
			setUpdateCulprit(UpdateCulprit.RESET);
			return;
		}
		// just do this to sync the editor text with the code mirror text
		computeAndUpdateModalEditor();
		setUpdateCulprit(UpdateCulprit.CodeMirror);
		// updateCulprit.value = UPDATE_CULPRIT.CodeMirror;
	}, [codeMirrorEditorText.value]);


	// the challenge now is making the editor keep track of what map editor it's currently focused on and streaming the changes in the map editor
	// it's tricky because maps can grow and shrink
	function computeAndUpdateModalEditor() {
		if (!openEditor.value) return;

		const code = codeMirror.value?.state.doc.toString() ?? '';
		const levenshteinDistances = _foldRanges.value.map((foldRange, foldRangeIndex) => {
			const widgetKind = _widgets.value[foldRangeIndex]?.value.spec.widget.props.kind;

			// if the widget kind is not the same as the open editor kind, don't do anything
			if (widgetKind !== openEditor.value?.kind) return -1;

			const theCode = code.slice(foldRange?.from, foldRange?.to);

			const distance = levenshtein(text.value, theCode)
			return distance;
		});

		// if (levenshtainDistances.length === 0) alert(`You are currently editing a deleted ${openEditor.value?.kind}`);
		if (levenshteinDistances.length === 0) return;

		// compute the index of the min distance
		let indexOfMinDistance = 0;
		levenshteinDistances.forEach((distance, didx) => {
			if (levenshteinDistances[indexOfMinDistance]! < 0) indexOfMinDistance = didx;
			const min = levenshteinDistances[indexOfMinDistance]!;
			if (distance >= 0 && distance <= min) indexOfMinDistance = didx;
		});

		// update the open editor if the index is not -1
		if (indexOfMinDistance !== -1) {
			const editRange = _foldRanges.value[indexOfMinDistance]
			const openEditorCode = code.slice(editRange?.from, editRange?.to)

			// the map editor needs to get the bitmaps after running the code
			if (openEditor.value?.kind === 'map') runGameHeadless(code ?? '');

				text.value = openEditorCode;

				openEditor.value = {
					...openEditor.value as OpenEditor,
					editRange: {
						from: editRange!.from,
						to: editRange!.to 
					},
					text: openEditorCode
				}
		
		} 
	}

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
