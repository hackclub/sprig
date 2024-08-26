import { EditorView, Decoration } from '@codemirror/view'
import { type EditorState, StateField, type Range } from '@codemirror/state'
import { syntaxTree, foldService } from '@codemirror/language'
import { palette } from '../../../engine/src/base'
import { FromTo, getTag, makeWidget } from './util'
import OpenButton from '../../components/codemirror-widgets/open-button'
import Swatch from '../../components/codemirror-widgets/swatch'
import { editorKinds, editors, _foldRanges, _widgets } from '../state'

const OpenButtonWidget = makeWidget(OpenButton)
const SwatchWidget = makeWidget(Swatch)

// editor state -> state field value (set of decorations and fold ranges)
function makeValue(state: EditorState) {
	const widgets: Range<Decoration>[] = []
	const foldRanges: FromTo[] = []

	const syntax = syntaxTree(state)
	syntax.iterate({
		enter(node) {
			for (const kind of editorKinds) {
				const tag = getTag(editors[kind].label, node, syntax, state.doc)
				if (!tag) continue

				if (tag.nameFrom === tag.nameTo) continue

				widgets.push(Decoration.replace({
					widget: new OpenButtonWidget({ kind, text: tag.text, range: { from: tag.textFrom, to: tag.textTo } })
				}).range(tag.nameFrom, tag.nameTo))

				if (kind === 'palette') {
					const color = palette.find(([ key ]) => key === tag.text)
					if (color) {
						widgets.push(Decoration.widget({ widget: new SwatchWidget({ rgba: color[1] }), side: 1 }).range(tag.textFrom))
					}
				} else if (tag.textFrom !== tag.textTo) {
					foldRanges.push({ from: tag.textFrom, to: tag.textTo })
				}

				break
			}
		}
	})

	_foldRanges.value = foldRanges;
	_widgets.value = widgets;
	return {
		decorations: Decoration.set(widgets),
		foldRanges
	}
}

export default StateField.define({
	create: (state) => makeValue(state),
	update: (_, transaction) => makeValue(transaction.state),
	provide: (field) => [
		EditorView.decorations.from(field, value => value.decorations),
		foldService.from(field, value => (_, lineStart, lineEnd) => (
			value.foldRanges.find(range => range.from >= lineStart && range.from <= lineEnd) ?? null
		))
	]
})
