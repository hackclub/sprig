const getStringConstants = (code: string): Record<string, string> => {
	const constants: Record<string, string> = {}
	const stringAssignment = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(['"`])([\s\S]*?)\2/g
	let match: RegExpExecArray | null

	while ((match = stringAssignment.exec(code))) {
		const [, name, , value] = match
		if (name && value && value.length === 1) constants[name] = value
	}

	const objectAssignment = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*\{([\s\S]*?)\}/g
	while ((match = objectAssignment.exec(code))) {
		const [, objName, body] = match
		const propPattern = /([A-Za-z_$][\w$]*)\s*:\s*(['"`])([\s\S]*?)\2/g
		let propMatch: RegExpExecArray | null
		while ((propMatch = propPattern.exec(body!))) {
			const [, propName, , val] = propMatch
			if (propName && val && val.length === 1) {
				constants[`${objName}.${propName}`] = val
			}
		}
	}

	return constants
}

const getBitmapConstants = (code: string): Record<string, string> => {
	const bitmaps: Record<string, string> = {}
	const bitmapAssignment = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*bitmap\s*`([\s\S]*?)`/g
	let match: RegExpExecArray | null
	while ((match = bitmapAssignment.exec(code))) {
		const [, name, content] = match
		if (name && content) bitmaps[name] = content
	}
	return bitmaps
}

const readCallBody = (code: string, start: number): string | null => {
	let depth = 1
	let quote: string | null = null
	let escaping = false
	let inLineComment = false
	let inBlockComment = false

	for (let i = start; i < code.length; i++) {
		const char = code[i]!
		const nextChar = code[i + 1]

		if (inLineComment) {
			if (char === '\n') inLineComment = false
			continue
		}

		if (inBlockComment) {
			if (char === '*' && nextChar === '/') {
				inBlockComment = false
				i++
			}
			continue
		}

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

		if (char === '/' && nextChar === '/') {
			inLineComment = true
			i++
			continue
		}

		if (char === '/' && nextChar === '*') {
			inBlockComment = true
			i++
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
	if (constants[value]) return constants[value]
	return null
}

export const extractLegendBitmaps = (code: string): [string, string][] => {
	const constants = getStringConstants(code)
	const bitmapVars = getBitmapConstants(code)
	const bitmaps: [string, string][] = []
	const seenKeys = new Set<string>()

	const setLegendRegex = /\bsetLegend\s*\(/g
	let match: RegExpExecArray | null

	while ((match = setLegendRegex.exec(code))) {
		const bodyStart = match.index + match[0].length
		const body = readCallBody(code, bodyStart)
		setLegendRegex.lastIndex = bodyStart + (body?.length ?? 0) + 1
		if (!body) continue

		const entryPattern = /\[\s*([^,\]]+)\s*,\s*(?:bitmap\s*`([\s\S]*?)`|([A-Za-z_$][\w$]*))\s*\]/g
		let entry: RegExpExecArray | null
		while ((entry = entryPattern.exec(body))) {
			const key = resolveSpriteKey(entry[1]!, constants)
			const inlineContent = entry[2]
			const varName = entry[3]?.trim()
			const content = inlineContent !== undefined ? inlineContent : (varName ? bitmapVars[varName] : undefined)

			if (key && content !== undefined && !seenKeys.has(key)) {
				seenKeys.add(key)
				bitmaps.push([key, content])
			}
		}
	}

	return bitmaps
}
