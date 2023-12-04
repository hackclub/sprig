import type { NormalizedError } from '../state'

export type EsprimaError = Error & {
	description: string
	index: number
	lineNumber: number
	column: number
}

export type GameError =
	| { kind: 'parse', error: EsprimaError }
	| { kind: 'runtime', error: unknown }
	| { kind: 'page', error: unknown }

interface StackItem {
	callSite: string
	fileUrl: string
	lineNumber: number | null
	column: number | null
}

const firefoxStackRegex = /^(.*)@(.*?)(:(\d+):(\d+))?$/
const chromeStackRegex = /^\s+at ([^()]+) \((.+?):(\d+):(\d+)\)$/
const chromeStackOnlyUrlRegex = /^\s+at (.+?):(\d+):(\d+)$/
const chromeAsRegex = /\[as (.+)\]/
const chromeStackUrlRegex = /\((.+?):(\d+):(\d+)\)/
const normalizeStack = (stack: string): StackItem[] | null => {
	const lines = stack.trim().split('\n')

	if (lines.every(line => firefoxStackRegex.test(line))) {
		return lines.map(line => {
			const match = line.match(firefoxStackRegex)!
			return {
				callSite: match[1]!.split('/<')[0]! || '<unknown>',
				fileUrl: match[2]!.split(' ')[0]!,
				lineNumber: match[4] ? Number(match[4]) : null,
				column: match[5] ? Number(match[5]) : null
			}
		})
	} else if (lines.slice(1).every(
		line => chromeStackRegex.test(line) || chromeStackOnlyUrlRegex.test(line)
	)) {
		lines.shift()
		return lines.map(line => {
			const match = line.match(chromeStackRegex)
			if (match) {
				let callSite = match[1]!
				const as = callSite.match(chromeAsRegex)
				if (as) callSite = as[1]!
				callSite = callSite.split('.').at(-1)!

				let fileUrl = match[2]!
				while (chromeStackUrlRegex.test(fileUrl))
					fileUrl = fileUrl.match(chromeStackUrlRegex)![1]!

				return {
					callSite,
					fileUrl,
					lineNumber: Number(match[3]),
					column: Number(match[4])
				}
			}

			const match2 = line.match(chromeStackOnlyUrlRegex)!
			return {
				callSite: '<unknown>',
				fileUrl: match2[1]!,
				lineNumber: Number(match2[2]),
				column: Number(match2[3])
			}
		})
	} else {
		return null
	}
}

export const normalizeGameError = (gameError: GameError): NormalizedError => {
	const lineOffset = 3

	if (gameError.kind === 'parse') {
		const { description, lineNumber, column } = gameError.error
		const line = lineNumber - 1
		return {
			description: `SyntaxError: ${description}\n    at <game>:${line}:${column}`,
			raw: gameError.error,
			line: line,
			column: column
		}
	} else if (gameError.error instanceof Error) {
		const descriptionLines: string[] = []

		const stack = (gameError.error.stack ? normalizeStack(gameError.error.stack) : null) ?? []

		let [line, col] = findErrorLineCol(gameError.error.stack)

		stack.reverse()

		let foundEval = false
		for (const item of stack) {
			if (!foundEval && ['eval', 'anonymous'].includes(item.callSite)) {
				foundEval = true
				if (item.lineNumber) item.lineNumber -= lineOffset
			}
			if (!foundEval) continue

			let fileName
			try {
				const url = new URL(item.fileUrl)
				fileName = url.pathname.split('/').at(-1)!
			} catch {
				fileName = item.fileUrl
			}

			if (fileName && item.lineNumber && item.column) {
				descriptionLines.unshift(`    at ${item.callSite} (${fileName}:${item.lineNumber}:${item.column})`)
			} else if (fileName) {
				descriptionLines.unshift(`    at ${item.callSite} (${fileName})`)
			} else {
				descriptionLines.unshift(`    at ${item.callSite}`)
			}
		}

		descriptionLines.unshift(`${gameError.error.name}: ${gameError.error.message}`)
		return {
			description: descriptionLines.join('\n'),
			raw: gameError.error,
			line: line,
			column: col
		}
	} else {
		return { description: `Runtime Error: ${gameError.error}`, raw: gameError.error }
	}
}

/*
 * Finds the line and column of innermost error from a stack.
 * This is modified code from V1.
 */
function findErrorLineCol(stack: string | undefined): [number | null, number | null] {
	if (!stack) return [null, null]

	let line = null
	let col = null

	// Get the most outer (first) error that is part of ther user's code (not part of the engine and anonymous)
	let location = stack.match(/<anonymous>:(.+)\)/) 

	if (location) {
		let lineCol = location[1]!.split(":").map(Number)
		line = lineCol[0]! - 2 - 1
		col = lineCol[1]!
	}

	return [line, col]
}

/*
 * Highlights the line gutter of the speciefied line number to indicate an error.
 * This uses a custom attribute to style the gutter.
 * This is modified code from V1.
 */
export function highlightError(line: number) {
	const cmLineGutters = document.querySelectorAll(".cm-lineNumbers > .cm-gutterElement") // Get all the line gutters
	// Find the gutter that matches the line number and is not hidden
	for (let i = 0; i < cmLineGutters.length; i++) {
		const cmLineGutter = cmLineGutters[i] as HTMLElement;
		const innerNumber = cmLineGutter.innerText;
		const height = cmLineGutter.style.height;
		if (Number(innerNumber) !== line || height === "0px") {
			cmLineGutter.removeAttribute("err-line");
			continue;
		};
		// not good: codemirror removes the lines that are out of the viewport
		// meaning that once the highlighted line goes out of view
		// it is no longer rendered on the DOM
		// and codemirror will display the line corresponding in the current view
		cmLineGutter.setAttribute("err-line", "");
		console.log("highliting line", innerNumber);
	}
}

/*
 * Clears all exsisting error highlighted from the gutter
 */
export function clearErrorHighlight() {
	const cmLineGutters = document.querySelectorAll(".cm-lineNumbers > .cm-gutterElement")
	for (let i = 0; i < cmLineGutters.length; i++) {
		const cmLineGutter = cmLineGutters[i] as HTMLElement;
		cmLineGutter.removeAttribute("err-line");
	}
}