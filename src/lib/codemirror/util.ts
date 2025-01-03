import { foldable, foldEffect } from '@codemirror/language'
import type { Text } from '@codemirror/state'
import { EditorView, WidgetType } from '@codemirror/view'
import type { SyntaxNodeRef, Tree } from '@lezer/common'
import { ComponentType, h, render } from 'preact'

export function getTag(name: string, node: SyntaxNodeRef, syntax: Tree, doc: Text) {
	if (node.name !== 'TaggedTemplateExpression') return

	const identifier = syntax.resolve(node.from, 1)
	if (identifier?.name !== 'VariableName') return
	const identifierName = doc.sliceString(identifier.from, identifier.to)
	if (identifierName !== name) return

	const templateString = identifier.nextSibling
	if (templateString?.name !== 'TemplateString') return
	const templateStringText = doc.sliceString(templateString.from, templateString.to)
	if (!templateStringText.endsWith('`') || !templateStringText.startsWith('`') || templateStringText.length < 2) return

	return {
		text: templateStringText.slice(1, -1),
		nameFrom: identifier.from,
		nameTo: identifier.to,
		textFrom: templateString.from + 1,
		textTo: templateString.to - 1
	}
}


export interface FromTo {
	from: number
	to: number
}

export const makeWidget = <T extends {}>(Component: ComponentType<T>) => class extends WidgetType {
	props: T

	constructor(props: T) {
		super()
		this.props = props
	}

	override eq(other: this) {
		for (const key in this.props) {
			if (this.props[key] !== other.props[key]) return false
		}
		return true
	}
	override ignoreEvent() { return true }

	toDOM() {
		const container = document.createElement('span')
		render(h(Component, this.props), container)
		return container
	}
	override updateDOM(container: HTMLElement) {
		render(h(Component, this.props), container)
		return true
	}
}

export const collapseRanges = (view: EditorView, ranges: [number, number][]) => {
	const effects = []

	for (const [ start, end ] of ranges) {
		for (let pos = start; pos < end;) {
			const line = view.lineBlockAt(pos)
			const range = foldable(view.state, line.from, line.to)
			if (!range) break;
			
			effects.push(foldEffect.of(range))
			pos = view.lineBlockAt(range.to).to + 1
		}
	}

	if (effects.length) view.dispatch({ effects })
	return !!effects.length
}

export async function sha256Hash(message: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
