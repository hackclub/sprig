import { EditorState } from '@codemirror/state'
import { getSearchQuery, highlightSelectionMatches, search, searchKeymap, setSearchQuery } from '@codemirror/search'
import widgets from './widgets'
import { effect, signal } from '@preact/signals'
import { h, render } from 'preact'
import { bracketMatching, defaultHighlightStyle, foldedRanges, foldEffect, unfoldEffect, foldGutter, foldKeymap, indentOnInput, indentUnit, syntaxHighlighting } from '@codemirror/language'
import { history, defaultKeymap, historyKeymap, indentWithTab, insertNewlineAndIndent } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import SearchBox from '../../components/search-box'
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine } from '@codemirror/view'
import { lintGutter } from "@codemirror/lint";
import type { NormalizedError } from '../state'
import { codeMirrorEditorText, codeMirror } from '../state'
import { foldTemplateLiteral } from '../../components/big-interactive-pages/editor'

export function diagnosticsFromErrorLog(view: EditorView, errorLog: NormalizedError[]) {
	return errorLog.filter(error => error.line)
		.map(error => {
			const targetLine = view.state.doc.line(error.line!);
			return {
				from: targetLine.from,
				to: targetLine.to,
				severity: "error",
				message: error.description
			};
		});
}

export const initialExtensions = (onUpdate: any, onRunShortcut: any, yCollab?: any) => ([
	EditorView.updateListener.of(update => {
		update.transactions.forEach(transaction => {
			// if it's a simple fold/unfold command, resolve
			const isFoldOrUnfoldEffect = transaction.effects.map(stateEffect => {
				return stateEffect.is(unfoldEffect) || stateEffect.is(foldEffect)
			});

			if (isFoldOrUnfoldEffect.includes(true)) return;

			const previousFoldedRanges = foldedRanges(transaction.startState);
			const currentFoldedRanges = foldedRanges(codeMirror.value!.state);
			function arrayFromFoldRangeIter(foldRanges: any) {
				const iter = foldRanges.iter();
				const out: any[] = [];
				while (iter.value != null) {
					out.push({ from: iter.from, to: iter.to });
					iter.next();
				}
				return out;
			}

			const previousFoldRanges = arrayFromFoldRangeIter(previousFoldedRanges);
			const currentFoldRanges = arrayFromFoldRangeIter(currentFoldedRanges);

			const foldRangeDiffs = [
				...previousFoldRanges.filter(range => {
					return !currentFoldRanges.some(oRange => (oRange.from === range.from && oRange.to === range.to))
				}),
				...currentFoldRanges.filter(range => {
					return !previousFoldRanges.some(oRange => (oRange.from === range.from && oRange.to === range.to))
				}),
			];

			foldRangeDiffs.forEach(range => foldTemplateLiteral(range.from, range.to));

		});

		const newEditorText = update.state.doc.toString();
		codeMirrorEditorText.value = newEditorText;
	}),
	lintGutter(),
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
	search({
		top: true,
		createPanel(view) {
			const dom = document.createElement('div')
			const query = signal(getSearchQuery(view.state))
			const cursor = signal({ index: 0, count: 0 })

			let _firstUpdate = true
			effect(() => {
				const update = view.state.update({ effects: setSearchQuery.of(query.value) })
				if (_firstUpdate) {
					_firstUpdate = false
					return
				}
				view.dispatch(update)
			})

			render(h(SearchBox, {
				query,
				cursor,
				runCommand(command) { command(view) }
			}), dom)

			return {
				dom,
				update(update) {
					query.value = getSearchQuery(update.state)

					let [index, count] = [0, 0]
					if (query.value.valid) {
						const iter = query.value.getCursor(update.state)
						for (let item = iter.next(); !item.done; item = iter.next()) {
							count++
							if (item.value.from <= update.state.selection.main.from && item.value.to >= update.state.selection.main.to)
								index = count
						}
					}
					cursor.value = { index, count }
				},
				unmount() { render(null, dom) }
			}
		}
	}),
	keymap.of([
		...defaultKeymap.filter(({ key }) => !['Enter', 'Mod-Enter'].includes(key!)),
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
	widgets,
	yCollab ? yCollab : []
]
)

export function createEditorState(initialCode: string, onUpdate = () => { }, onRunShortcut = () => { }, yCollab?: any): EditorState {
	return EditorState.create({
		doc: initialCode,
		extensions: [
			initialExtensions(onUpdate, onRunShortcut, yCollab)
		]
	})
}
