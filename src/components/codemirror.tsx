import { createEditorState, initialExtensions, diagnosticsFromErrorLog } from '../lib/codemirror/init'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Extension, StateEffect } from '@codemirror/state'
import styles from './codemirror.module.css'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { theme, errorLog, PersistenceState } from '../lib/state'
import { Diagnostic, setDiagnosticsEffect } from '@codemirror/lint'
import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import { yCollab } from "y-codemirror.next";
import { foldAllTemplateLiterals, saveGame } from './big-interactive-pages/editor'
import { Awareness } from 'y-protocols/awareness'
interface CodeMirrorProps {
	persistenceState: Signal<PersistenceState>
	roomId: Signal<string>
	class?: string | undefined
	initialCode?: string
	onCodeChange?: () => void
	onRunShortcut?: () => void
	onEditorView?: (editor: EditorView) => void
}

export default function CodeMirror(props: CodeMirrorProps) {
	const parent = useRef<HTMLDivElement>(null)
	const [editorRef, setEditorRef] = useState<EditorView>();
	const yCollabSignal = useSignal<Extension | undefined>(undefined);
	const yProviderAwarenessSignal = useSignal<Awareness | undefined>(undefined); 
	let yDoc: Y.Doc;
	let provider: WebrtcProvider;

	// Alert the parent to code changes (not reactive)
	const onCodeChangeRef = useRef(props.onCodeChange)
	useEffect(() => { onCodeChangeRef.current = props.onCodeChange }, [props.onCodeChange])

	// Run button
	const onRunShortcutRef = useRef(props.onRunShortcut)
	useEffect(() => { onRunShortcutRef.current = props.onRunShortcut }, [props.onRunShortcut])

	useEffect(() => { if (props.persistenceState.value.kind === "PERSISTED" && props.persistenceState.value.game !== "LOADING") props.roomId.value = props.persistenceState.value.game.id })

	let lastCode: string | undefined = props.initialCode ?? ''
	// serves to restore config before dark mode was added
	const restoreInitialConfig = () => initialExtensions(() => {
		if (editorRef?.state.doc.toString() === lastCode) return
		lastCode = editorRef?.state.doc.toString()
		onCodeChangeRef.current?.(),
		yCollabSignal.value
	}, () => onRunShortcutRef.current?.());

	const setEditorTheme = () => {
		if (theme.value === "dark") {
			editorRef?.dispatch({
				effects: StateEffect.appendConfig.of(oneDark)
			});
		} else editorRef?.dispatch({
			effects: StateEffect.reconfigure.of(restoreInitialConfig())
		});
	};

	useSignalEffect(() => {
		if(yProviderAwarenessSignal.value === undefined) return;
		yProviderAwarenessSignal.value.on("change", () => {
			yProviderAwarenessSignal.value?.getStates().forEach((state) => {
				try{
					if(state.saved == "saved"){
						let persistenceState = props.persistenceState.peek();
						console.log(persistenceState)
						if(persistenceState.kind === "PERSISTED" && persistenceState.game !== "LOADING"){
							props.persistenceState.value = {...props.persistenceState.peek(), cloudSaveState: "SAVED"};
						}
					} else if(state.saved == "error"){
						let persistenceState = props.persistenceState.peek();
						if(persistenceState.kind === "PERSISTED" && persistenceState.game !== "LOADING"){
							props.persistenceState.value = {...props.persistenceState.peek(), cloudSaveState: "ERROR"};
						}
					}
				} catch(e){
					console.log(e)
				}	
			});
		});
	});

	useSignalEffect(() => {
		if (!parent.current) throw new Error('Oh golly! The editor parent ref is null')
		if (editorRef !== undefined) {
			editorRef.destroy();
		}
		if (props.roomId.value === "" || props.persistenceState.peek().session === null) {
			const editor = new EditorView({
				state: createEditorState(props.initialCode ? props.initialCode : '', () => {
					if (editor.state.doc.toString() === lastCode) return
					lastCode = editor.state.doc.toString()
					onCodeChangeRef.current?.()
				}, () => onRunShortcutRef.current?.()),
				parent: parent.current,
			})

			setEditorRef(editor);
			props.onEditorView?.(editor)
			return
		}
		
		if(yDoc !== undefined){
			yDoc.destroy();
		}
		if(provider !== undefined){
			provider.destroy();
		}
		yDoc = new Y.Doc();
		provider = new WebrtcProvider(props.roomId.value, yDoc, {
			signaling: [
				"wss://yjs-signaling-server-5fb6d64b3314.herokuapp.com",
			],
		});
		//get yjs document from provider
		let ytext = yDoc.getText("codemirror");
		const yUndoManager = new Y.UndoManager(ytext);

		yProviderAwarenessSignal.value = provider.awareness

		provider.awareness.setLocalStateField("user", {
			name:
				props.persistenceState.peek().session?.user.username ??
				"Anonymous",
		});
		let yCollabExtension = yCollab(ytext, provider.awareness, {
			undoManager: yUndoManager,
		});
		yCollabSignal.value = yCollabExtension;
		
		//get the initial code from the yjs document
		// Wait for document state to be received from provider
		let initialUpdate = true;
		const waitInitialUpdate = function () {
			return new Promise<void>((resolve) => {
				let timer: NodeJS.Timeout;
				const checkUpdated = () => {
					if (initialUpdate === false) {
						clearTimeout(timer);
						resolve();
					} else {
						setTimeout(checkUpdated, 500);
					}
				};
				timer = setTimeout(() => {
					clearTimeout(timer);
					resolve();
				}, 1500);

				checkUpdated();
			});
		};
		waitInitialUpdate().then(() => {
			if (ytext.toString() === "") {
				ytext.insert(0, lastCode ?? "");
			}
			if (!parent.current)
				throw new Error("Oh golly! The editor parent ref is null");
			const editor = new EditorView({
				state: createEditorState(ytext.toString(), () => {
					if (editor.state.doc.toString() === lastCode) return
					lastCode = editor.state.doc.toString()
					onCodeChangeRef.current?.()
				}, () => onRunShortcutRef.current?.(), yCollabSignal.peek() as Extension),
				parent: parent.current,
			})

			setEditorRef(editor);
			props.onEditorView?.(editor)
			foldAllTemplateLiterals();
		});
		yDoc.on("update", () => {
			if (!initialUpdate) return;
			saveGame(props.persistenceState);
			ytext = yDoc.getText("codemirror");
			initialUpdate = false;
		});
	})
	

	useEffect(() => {
		setEditorTheme();
	}, [theme.value, editorRef]);

	useEffect(() => {
		errorLog.subscribe(value => {
			const diagnostics = diagnosticsFromErrorLog(editorRef as EditorView, value);
			editorRef?.dispatch({
				effects: setDiagnosticsEffect.of(diagnostics as Diagnostic[])
			});
		});
	}, [editorRef]);

	return (
		<div
			class={`${styles.container} ${
				editorRef === undefined
					? styles.containerSkeleton
					: ""
			} ${props.class ?? ""}`}
			ref={parent}
		/>
	)
}
