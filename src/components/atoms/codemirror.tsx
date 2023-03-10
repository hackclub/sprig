import { createEditorState } from '../../lib/codemirror/init'
import { useEffect, useRef } from 'preact/hooks'
import { EditorView } from '@codemirror/view'
import styles from './codemirror.module.css'

interface CodeMirrorProps {
	class?: string | undefined
	initialCode?: string
	onCodeChange?: () => void
	onEditorView?: (editor: EditorView) => void
}

export default function CodeMirror(props: CodeMirrorProps) {
	const parent = useRef<HTMLDivElement>(null)

	// Alert the parent to code changes (not reactive)
	const onCodeChangeRef = useRef(props.onCodeChange)
	useEffect(() => { onCodeChangeRef.current = props.onCodeChange }, [props.onCodeChange])

	useEffect(() => {
		if (!parent.current) throw new Error('Oh golly! The editor parent ref is null')
		const editor = new EditorView({
			state: createEditorState(() => {
				onCodeChangeRef.current?.()
			}),
			parent: parent.current
		})
		if (props.initialCode) editor.dispatch({ changes: { from: 0, insert: props.initialCode } })
		props.onEditorView?.(editor)
	}, [])

	return (
		<div class={`${styles.container} ${props.class ?? ''}`} ref={parent} />
	)
}