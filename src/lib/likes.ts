const API = 'https://api.airtable.com/v0'
const FIELD_FILENAME = 'Filename'
const FIELD_USER = 'User ID'

const ALL_COUNTS_TTL_MS = 60_000

const config = () => {
	const token = process.env.AIRTABLE_TOKEN
	const base = process.env.LIKES_AIRTABLE_BASE ?? process.env.STUCK_AIRTABLE_BASE
	const table = process.env.LIKES_AIRTABLE_TABLE ?? 'Likes'
	if (!token || !base) throw new Error('Likes: AIRTABLE_TOKEN and LIKES_AIRTABLE_BASE must be set')
	return { token, url: `${API}/${base}/${encodeURIComponent(table)}` }
}

const str = (value: string) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

interface AirtableRecord {
	id: string
	fields: Record<string, string | undefined>
}

async function airtable(path: string, init: RequestInit = {}): Promise<any> {
	const { token, url } = config()
	const res = await fetch(url + path, {
		...init,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			...(init.headers ?? {})
		}
	})
	if (!res.ok) {
		throw new Error(`Likes: Airtable ${init.method ?? 'GET'} failed (${res.status}): ${await res.text()}`)
	}
	return res.json()
}

async function listAll(formula: string | null, fields: string[]): Promise<AirtableRecord[]> {
	const records: AirtableRecord[] = []
	let offset: string | undefined
	do {
		const params = new URLSearchParams({ pageSize: '100' })
		if (formula) params.set('filterByFormula', formula)
		for (const field of fields) params.append('fields[]', field)
		if (offset) params.set('offset', offset)
		const page = await airtable(`?${params}`)
		records.push(...page.records)
		offset = page.offset
	} while (offset)
	return records
}

let allCountsCache: { at: number, counts: Record<string, number> } | null = null
let allCountsInFlight: Promise<Record<string, number>> | null = null

export async function getAllLikeCounts(): Promise<Record<string, number>> {
	if (allCountsCache && Date.now() - allCountsCache.at < ALL_COUNTS_TTL_MS) return allCountsCache.counts
	if (allCountsInFlight) return allCountsInFlight

	allCountsInFlight = (async () => {
		const records = await listAll(null, [FIELD_FILENAME])
		const counts: Record<string, number> = {}
		for (const record of records) {
			const filename = record.fields[FIELD_FILENAME]
			if (filename) counts[filename] = (counts[filename] ?? 0) + 1
		}
		allCountsCache = { at: Date.now(), counts }
		return counts
	})().finally(() => { allCountsInFlight = null })

	return allCountsInFlight
}

const bumpCachedCount = (filename: string, count: number) => {
	if (allCountsCache) allCountsCache.counts[filename] = count
}

export interface GameLikes {
	count: number
	liked: boolean
}

export async function getGameLikes(filename: string, userId?: string | null): Promise<GameLikes> {
	const records = await listAll(`{${FIELD_FILENAME}} = ${str(filename)}`, [FIELD_USER])
	const count = records.length
	bumpCachedCount(filename, count)
	return {
		count,
		liked: !!userId && records.some(record => record.fields[FIELD_USER] === userId)
	}
}

export async function likeGame(filename: string, userId: string): Promise<GameLikes> {
	await airtable('', {
		method: 'PATCH',
		body: JSON.stringify({
			performUpsert: { fieldsToMergeOn: [FIELD_FILENAME, FIELD_USER] },
			records: [{ fields: { [FIELD_FILENAME]: filename, [FIELD_USER]: userId } }]
		})
	})
	return getGameLikes(filename, userId)
}

export async function unlikeGame(filename: string, userId: string): Promise<GameLikes> {
	const records = await listAll(
		`AND({${FIELD_FILENAME}} = ${str(filename)}, {${FIELD_USER}} = ${str(userId)})`,
		[FIELD_FILENAME]
	)
	for (let i = 0; i < records.length; i += 10) {
		const params = new URLSearchParams()
		for (const record of records.slice(i, i + 10)) params.append('records[]', record.id)
		await airtable(`?${params}`, { method: 'DELETE' })
	}
	return getGameLikes(filename, userId)
}