import { createEditorState, initialExtensions, diagnosticsFromErrorLog } from '../lib/codemirror/init'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Extension, StateEffect } from '@codemirror/state'
import styles from './codemirror.module.css'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { theme, errorLog, PersistenceState, isNewSaveStrat, RoomState, RoomParticipant } from '../lib/state'
import { Diagnostic, setDiagnosticsEffect } from '@codemirror/lint'
import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import { Awareness } from 'y-protocols/awareness'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import { saveGame, startSavingGame } from './big-interactive-pages/editor'
import { yCollab } from 'y-codemirror.next'

interface CodeMirrorProps {
	class?: string | undefined
	persistenceState?: Signal<PersistenceState>
	roomState?: Signal<RoomState>
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
	let yDoc: Y.Doc
	let provider: WebrtcProvider

	const waitInitialUpdate = function (initialUpdate: boolean) {
		return new Promise<void>((resolve) => {
			let timer: NodeJS.Timeout;
			const checkUpdated = () => {
				if (initialUpdate === false) {
					console.log("Fjsakfjsa")
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

	// Alert the parent to code changes (not reactive)
	const onCodeChangeRef = useRef(props.onCodeChange)
	useEffect(() => { onCodeChangeRef.current = props.onCodeChange }, [props.onCodeChange])

	// Run button
	const onRunShortcutRef = useRef(props.onRunShortcut)
	useEffect(() => { onRunShortcutRef.current = props.onRunShortcut }, [props.onRunShortcut])

	let lastCode: string | undefined = props.initialCode ?? ''
	// serves to restore config before dark mode was added
	const restoreInitialConfig = () => initialExtensions(() => {
		if (editorRef?.state.doc.toString() === lastCode) return
		lastCode = editorRef?.state.doc.toString()
		onCodeChangeRef.current?.()
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
		if(!isNewSaveStrat.value) return
		if(yProviderAwarenessSignal.value === undefined) return;
		yProviderAwarenessSignal.value.on("change", () => {
			yProviderAwarenessSignal.value?.getStates().forEach((state) => {
				try{
					if(props.persistenceState === undefined) throw new Error("Persistence state is undefined");
					if(state.saved == "saved"){
						let persistenceState = props.persistenceState.peek();
						if(persistenceState.kind === "PERSISTED" && persistenceState.game !== "LOADING"){
							props.persistenceState.value = {...persistenceState, cloudSaveState: "SAVED"};
						}
					} else if(state.saved == "error"){
						let persistenceState = props.persistenceState.peek();
						if(persistenceState.kind === "PERSISTED" && persistenceState.game !== "LOADING"){
							props.persistenceState.value = {...persistenceState, cloudSaveState: "ERROR"};
						}
					}
				} catch(e){
					// DO something
				}
			});
		});
	});


	useSignalEffect(() => {
		if(editorRef !== undefined) {
			editorRef.destroy()
		}
		if (!parent.current) throw new Error('Oh golly! The editor parent ref is null')

		if (!isNewSaveStrat.value || (props.roomState?.peek().roomId === "" || props.persistenceState?.peek().session === null)) {
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

		if(!props.roomState) return
		if(!props.persistenceState) return
		try{
			if(yDoc !== undefined){
				yDoc.destroy();
			}
			if(provider !== undefined){
				provider.destroy();
			}
			yDoc = new Y.Doc();
			console.log(import.meta.env.PUBLIC_SIGNALING_SERVER_HOST)
			provider = new WebrtcProvider(props.roomState.peek().roomId, yDoc, {
				signaling: [
					import.meta.env.PUBLIC_SIGNALING_SERVER_HOST,
				],
			});
			//get yjs document from provider
			let ytext = yDoc.getText("codemirror");
			const yUndoManager = new Y.UndoManager(ytext);

			yProviderAwarenessSignal.value = provider.awareness
			console.log(props.persistenceState.peek().session?.user)
			const isHost = ((props.persistenceState.peek().kind == "PERSISTED" && props.persistenceState.peek().game != "LOADING") && props.persistenceState.peek().session?.user.id === props.persistenceState.peek().game.ownerId)
			provider.awareness.setLocalStateField("user", {
				name:
					props.persistenceState.peek().session?.user.email ??
					"Anonymous",
				host: isHost
			});
			let yCollabExtension = yCollab(ytext, provider.awareness, {
				undoManager: yUndoManager,
			});
			yCollabSignal.value = yCollabExtension;

			//get the initial code from the yjs document
			// Wait for document state to be received from provider
			let initialUpdate = true;

			waitInitialUpdate(initialUpdate).then(() => {
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
			});
			yDoc.on("update", () => {
				if(!props.persistenceState) return;
				if (!initialUpdate) return;
				let participants: RoomParticipant[] = [];
				provider.awareness.getStates().forEach((state) => {
					try{
						participants.push({
							userEmail: state.user.name,
							isHost: state.user.host
						})
					} catch(e){
						return
					}
				});
				if(props.roomState)
					props.roomState.value.participants = participants;
				let persistenceState = props.persistenceState.peek();
				if(persistenceState.kind === "PERSISTED" && persistenceState.game !== "LOADING"){
					if(persistenceState.game.ownerId === persistenceState.session?.user.id){
						startSavingGame(props.persistenceState);
					}
				}
				ytext = yDoc.getText("codemirror");
				initialUpdate = false;
			});
		} catch(e){
			window.location.reload();
		}
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
