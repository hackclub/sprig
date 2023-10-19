import { createEditorState, initialExtensions } from '../lib/codemirror/init'
import { useEffect, useRef, useState } from 'preact/hooks'
import { StateEffect } from '@codemirror/state'
import styles from './codemirror.module.css'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'

interface CodeMirrorProps {
	class?: string | undefined
	initialCode?: string
	onCodeChange?: () => void
	onRunShortcut?: () => void
	onEditorView?: (editor: EditorView) => void
}

export default function CodeMirror(props: CodeMirrorProps) {
	const parent = useRef<HTMLDivElement>(null)

	// Alert the parent to code changes (not reactive)
	const onCodeChangeRef = useRef(props.onCodeChange)
	useEffect(() => { onCodeChangeRef.current = props.onCodeChange }, [props.onCodeChange])

	// Run button
	const onRunShortcutRef = useRef(props.onRunShortcut)
	useEffect(() => { onRunShortcutRef.current = props.onRunShortcut }, [props.onRunShortcut])

	useEffect(() => {
		if (!parent.current) throw new Error('Oh golly! The editor parent ref is null')
		let lastCode: string = props.initialCode ?? ''

		const editor = new EditorView({
			state: createEditorState(props.initialCode ? props.initialCode : '', () => {
				if (editor.state.doc.toString() === lastCode) return
				lastCode = editor.state.doc.toString()
				onCodeChangeRef.current?.()
			}, () => onRunShortcutRef.current?.()),
			parent: parent.current,
		})

		// serves to restore config before dark mode was added
		const restoreInitialConfig = () => initialExtensions(() => {
				if (editor.state.doc.toString() === lastCode) return
				lastCode = editor.state.doc.toString()
				onCodeChangeRef.current?.()
			}, () => onRunShortcutRef.current?.());

		// adds dark mode to the editor
		setTimeout(() => {
			editor.dispatch({
				effects: StateEffect.appendConfig.of(oneDark)
			});
		}, 2000);

		setTimeout(() => {
			editor.dispatch({
				effects: StateEffect.reconfigure.of(restoreInitialConfig())
			});
		}, 5000);

		props.onEditorView?.(editor)
	}, [])

	return (
		<div class={`${styles.container} ${props.class ?? ''}`} ref={parent} />
	)
}
