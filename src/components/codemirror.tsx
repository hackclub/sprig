import { createEditorState } from '../lib/codemirror/init'
import { useEffect, useRef } from 'preact/hooks'
import { EditorView } from '@codemirror/view'
import styles from './codemirror.module.css'

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
	useEffect(() => { onCodeChangeRef.current = props.onCodeChange }, [ props.onCodeChange ])

	// Run button
	const onRunShortcutRef = useRef(props.onRunShortcut)
	useEffect(() => { onRunShortcutRef.current = props.onRunShortcut }, [ props.onRunShortcut ])

	useEffect(() => {
		if (!parent.current) throw new Error('Oh golly! The editor parent ref is null')
		let lastCode: string = props.initialCode ?? ''
		const editor = new EditorView({
			state: createEditorState(() => {
				if (editor.state.doc.toString() === lastCode) return
				lastCode = editor.state.doc.toString()
				onCodeChangeRef.current?.()
			}, () => onRunShortcutRef.current?.()),
			parent: parent.current
		})
		if (props.initialCode) editor.dispatch({ changes: { from: 0, insert: props.initialCode } })
		props.onEditorView?.(editor)
	}, [])

	return (
		<div class={`${styles.container} ${props.class ?? ''}`} ref={parent} />
	)
}