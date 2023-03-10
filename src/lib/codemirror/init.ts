import { basicSetup as basicSetupOriginal } from 'codemirror'
import { EditorView, keymap } from '@codemirror/view'
import { EditorState, type Extension } from '@codemirror/state'
import { indentUnit } from '@codemirror/language'
import { indentWithTab } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import widgets from './widgets'

// This is a terrible hack but strange bugs are about this one.
// Remove autocomplete and suggestions:
const basicSetup = (basicSetupOriginal as Extension[]).filter((_, i) => ![11, 12].includes(i))

export function createEditorState(onUpdate = () => {}): EditorState {
	return EditorState.create({
		extensions: [
			basicSetup,
			keymap.of([ indentWithTab ]), // TODO: We should put a note about Esc+Tab for accessibility somewhere.
			indentUnit.of('  '),
			javascript(),
			EditorView.updateListener.of(onUpdate),
			widgets
		]
	})
}
