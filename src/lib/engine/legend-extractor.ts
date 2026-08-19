const identifierPattern = /^[A-Za-z_$][\w$]*$/

const getStringConstants = (code: string): Record<string, string> => {
	const constants: Record<string, string> = {}
	const stringAssignment = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(['"`])([\s\S]*?)\2/g
	let match: RegExpExecArray | null

	while ((match = stringAssignment.exec(code))) {
		const [, name, , value] = match
		if (name && value && value.length === 1) constants[name] = value
	}

	return constants
}

const readCallBody = (code: string, start: number): string | null => {
	let depth = 1
	let quote: string | null = null
	let escaping = false

	for (let i = start; i < code.length; i++) {
		const char = code[i]!
		if (quote) {
			if (escaping) {
				escaping = false
				continue
			}
			if (char === '\\') {
				escaping = true
				continue
			}
			if (char === quote) quote = null
			continue
		}

		if (char === '"' || char === "'" || char === '`') {
			quote = char
			continue
		}

		if (char === '(') depth++
		if (char === ')') depth--
		if (depth === 0) return code.slice(start, i)
	}

	return null
}

const resolveSpriteKey = (expression: string, constants: Record<string, string>): string | null => {
	const value = expression.trim()
	const quoted = value.match(/^(['"`])(.+)\1$/)
	if (quoted?.[2]?.length === 1) return quoted[2]
	if (identifierPattern.test(value) && constants[value]) return constants[value]
	return null
}

export const extractLegendBitmaps = (code: string): [string, string][] => {
	const constants = getStringConstants(code)
	const bitmaps: [string, string][] = []
	let searchIndex = 0

	while (searchIndex < code.length) {
		const callIndex = code.indexOf('setLegend(', searchIndex)
		if (callIndex === -1) break

		const bodyStart = callIndex + 'setLegend('.length
		const body = readCallBody(code, bodyStart)
		searchIndex = bodyStart + (body?.length ?? 0) + 1
		if (!body) continue

		const entryPattern = /\[\s*([^,\]]+)\s*,\s*bitmap`([\s\S]*?)`\s*\]/g
		let entry: RegExpExecArray | null
		while ((entry = entryPattern.exec(body))) {
			const key = resolveSpriteKey(entry[1]!, constants)
			if (key) bitmaps.push([key, entry[2]!])
		}
	}

	return bitmaps
}
