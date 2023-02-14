import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, indentUnit, syntaxHighlighting } from '@codemirror/language'
import { history, defaultKeymap, historyKeymap, indentWithTab, insertNewlineAndIndent } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import widgets from './widgets'

export function createEditorState(onUpdate = () => {}, onRunShortcut = () => {}): EditorState {
	return EditorState.create({
		extensions: [
			lineNumbers(),
			highlightActiveLineGutter(),
			highlightSpecialChars(),
			history(),
			foldGutter(),
			drawSelection(),
			dropCursor(),
			EditorState.allowMultipleSelections.of(true),
			indentOnInput(),
			syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
			bracketMatching(),
			rectangularSelection(),
			crosshairCursor(),
			highlightActiveLine(),
			highlightSelectionMatches(),
			keymap.of([
				...defaultKeymap.filter(({ key }) => ![ 'Enter', 'Mod-Enter' ].includes(key!)),
				...searchKeymap,
				...historyKeymap,
				...foldKeymap,
				indentWithTab, // TODO: We should put a note about Esc+Tab for accessibility somewhere.
				{
					key: 'Mod-Enter',
					preventDefault: true,
					run: () => { onRunShortcut(); return true }
				},
				{
					key: 'Enter',
					run: insertNewlineAndIndent,
					shift: () => { onRunShortcut(); return true }
				}
			]),
			indentUnit.of('  '),
			javascript(),
			EditorView.updateListener.of(onUpdate),
			widgets
		]
	})
}