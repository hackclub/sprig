const API = 'https://api.airtable.com/v0'
const FIELD_FILENAME = 'Filename'
const FIELD_USER = 'User ID'

const ALL_COUNTS_TTL_MS = 60_000

export class LikesError extends Error {
	constructor(message: string, public reason: string) { super(message) }
}

const config = () => {
	const token = process.env.AIRTABLE_TOKEN
	const base = process.env.LIKES_AIRTABLE_BASE ?? process.env.STUCK_AIRTABLE_BASE
	const table = process.env.LIKES_AIRTABLE_TABLE ?? 'Likes'
	if (!token || !base) throw new LikesError('Likes: AIRTABLE_TOKEN and LIKES_AIRTABLE_BASE must be set', 'MISSING_CONFIG')
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
		const body = await res.text()
		let type = `HTTP_${res.status}`
		try { type = JSON.parse(body)?.error?.type ?? JSON.parse(body)?.error ?? type } catch {}
		throw new LikesError(`Likes: Airtable ${init.method ?? 'GET'} failed (${res.status}): ${body}`, String(type))
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
		const records = await listAll(null, [FIELD_FILENAME, FIELD_USER])
		const users: Record<string, Set<string>> = {}
		for (const record of records) {
			const filename = record.fields[FIELD_FILENAME]
			const user = record.fields[FIELD_USER]
			if (filename && user) (users[filename] ??= new Set()).add(user)
		}
		const counts: Record<string, number> = {}
		for (const [filename, set] of Object.entries(users)) counts[filename] = set.size
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
	const users = new Set(records.map(record => record.fields[FIELD_USER]).filter(Boolean))
	const count = users.size
	bumpCachedCount(filename, count)
	return { count, liked: !!userId && users.has(userId) }
}

const findUserLikes = (filename: string, userId: string) => listAll(
	`AND({${FIELD_FILENAME}} = ${str(filename)}, {${FIELD_USER}} = ${str(userId)})`,
	[FIELD_FILENAME]
)

export async function likeGame(filename: string, userId: string): Promise<GameLikes> {
	if ((await findUserLikes(filename, userId)).length === 0) {
		await airtable('', {
			method: 'POST',
			body: JSON.stringify({
				records: [{ fields: { [FIELD_FILENAME]: filename, [FIELD_USER]: userId } }]
			})
		})
	}
	return getGameLikes(filename, userId)
}

export async function unlikeGame(filename: string, userId: string): Promise<GameLikes> {
	const records = await findUserLikes(filename, userId)
	for (let i = 0; i < records.length; i += 10) {
		const params = new URLSearchParams()
		for (const record of records.slice(i, i + 10)) params.append('records[]', record.id)
		await airtable(`?${params}`, { method: 'DELETE' })
	}
	return getGameLikes(filename, userId)
}