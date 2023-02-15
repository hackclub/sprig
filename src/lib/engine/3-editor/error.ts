import type { NormalizedError } from '../../state'

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
const chromeAsRegex = /\[as (.+)\]/
const chromeStackUrlRegex = /\((.+?):(\d+):(\d+)\)/
const normalizeStack = (stack: string): StackItem[] | null => {
	const lines = stack.trim().split('\n')
	console.log(lines)

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
	} else if (lines.slice(1).every(line => chromeStackRegex.test(line))) {
		lines.shift()
		return lines.map(line => {
			const match = line.match(chromeStackRegex)!

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
			raw: gameError.error
		}
	} else if (gameError.error instanceof Error) {
		const descriptionLines: string[] = []

		const stack = (gameError.error.stack ? normalizeStack(gameError.error.stack) : null) ?? []
		stack.reverse()

		let foundEval = false
		for (const item of stack) {
			if (!foundEval && [ 'eval', 'anonymous' ].includes(item.callSite)) {
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
			raw: gameError.error
		}
	} else {
		return { description: `Runtime Error: ${gameError.error}`, raw: gameError.error }
	}
}