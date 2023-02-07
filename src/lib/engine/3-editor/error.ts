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

export const normalizeGameError = (gameError: GameError): NormalizedError => {
	const lineOffset = 2

	if (gameError.kind === 'parse') {
		const { description, lineNumber, column } = gameError.error
		const line = lineNumber - 1
		return { line, column, description, raw: gameError.error }
	} else if (gameError.error instanceof Error) {
		let line: number | null = null
		let column: number | null = null
		
		if ('lineno' in gameError.error && 'colno' in gameError.error) {
			line = (Number(gameError.error.lineno) - 1 - lineOffset) || null
			column = Number(gameError.error.colno) || null
		} else {
			const location = gameError.error.stack?.match(/<anonymous>:(.+)\)/)
			if (location) {
				const lineCol = location[1]!.split(':')
				line = (Number(lineCol[0]) - 1 - lineOffset) || null
				column = Number(lineCol[1]) || null
			}
		}

		return { line, column, description: gameError.error.message, raw: gameError.error }
	} else {
		return { line: null, column: null, description: String(gameError.error), raw: gameError.error }
	}
}