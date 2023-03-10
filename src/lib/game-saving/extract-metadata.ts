export interface ExtractedMetadata {
	name: string | null
	authorName: string | null
	cleanedCode: string
}

export const extractMetadata = (code: string): ExtractedMetadata => {
	const nameRegex = /@title: (.+)/
	const authorRegex = /@author: (.+)/
	const name = code.match(nameRegex)?.[1] ?? null
	const authorName = code.match(authorRegex)?.[1] ?? null
	const cleanedCode = code
		// .replace(nameRegex, '')
		// .replace(authorRegex, '')
		// .replace(/^\/\*\n+(.+)?\n+\*\//s, '/*\n$1\n*/')
		// .replace(/^\/\*\s*\*\/\s*/s, '')
	return { name, authorName, cleanedCode }
}