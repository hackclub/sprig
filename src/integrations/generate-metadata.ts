/**
 * Astro integration that generates ./games/metadata.json.

 */
import type { AstroIntegration } from "astro";
import { availableParallelism } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { generateImageJson } from "./thumbnail";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, "../..");
const GAMES_DIR = join(ROOT_DIR, "games");
const GAMES_IMG_DIR = join(GAMES_DIR, "img");
const PUBLIC_DIR = join(ROOT_DIR, "public");
const ASTRO_DIR = join(ROOT_DIR, ".astro");
const METADATA_PATH = join(GAMES_DIR, "metadata.json");
const CACHE_PATH = join(ASTRO_DIR, "generate-metadata-cache.json");
const CACHE_VERSION = 1;
const CONCURRENCY = Math.max(1, Math.min(availableParallelism(), 8));

type BunRuntime = {
	file: (path: string) => {
		text: () => Promise<string>;
	};
	write: (path: string, data: string) => Promise<unknown>;
};

const bun = (globalThis as typeof globalThis & { Bun?: BunRuntime }).Bun;

const regexExpr = {
	title: /@title: (.+)/,
	author: /@author: (.+)/,
	tags: /@tags: (.+)/,
	addedOn: /@addedOn: (.+)/,
	description: /@description: (.+)/,
};

type ParsedMetaEntry = {
	filename: string;
	title: string;
	author: string;
	tags: string[];
	addedOn: string;
	description: string;
};

type MetadataIssue = {
	field: keyof Omit<ParsedMetaEntry, "filename">;
	message: string;
};

type CacheEntry = {
	metadataFingerprint: string;
	thumbnailFingerprint: string;
	metadata: ParsedMetaEntry;
};

type CacheFile = {
	version: number;
	entries: Record<string, CacheEntry>;
};

type ProcessedGame = {
	metadata: ParsedMetaEntry;
	cacheEntry: CacheEntry;
	metadataCacheHit: boolean;
	thumbnailUpdated: boolean;
};

const getMatchValue = (match: RegExpExecArray | null) => match?.[1]?.trim() ?? "";

const isValidDateString = (value: string) => {
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return true;
	return Number.isFinite(Date.parse(value));
};

const parseTags = (raw: string): { tags?: string[]; issue?: string } => {
	if (!raw.trim()) return { issue: "is empty (expected a JSON-ish array like ['maze','puzzle'])." };

	try {
		const parsed = JSON.parse(raw.replaceAll("'", '"'));
		if (!Array.isArray(parsed)) return { issue: "must be an array (example: ['maze','puzzle'])." };
		if (parsed.some((tag) => typeof tag !== "string")) {
			return { issue: "must be an array of strings (example: ['maze','puzzle'])." };
		}

		return { tags: parsed as string[] };
	} catch (error) {
		if (error instanceof SyntaxError) {
			return { issue: "is not valid JSON (example: ['maze','puzzle'])." };
		}

		return { issue: "could not be parsed." };
	}
};

const validateAndBuildMetadata = (
	gameFile: string,
	raw: Record<string, RegExpExecArray | null>,
): { entry?: ParsedMetaEntry; issues: MetadataIssue[] } => {
	const issues: MetadataIssue[] = [];
	const title = getMatchValue(raw.title ?? null);
	const author = getMatchValue(raw.author ?? null);
	const tagsRaw = getMatchValue(raw.tags ?? null);
	const addedOn = getMatchValue(raw.addedOn ?? null);
	const description = getMatchValue(raw.description ?? null);

	if (!raw.title) issues.push({ field: "title", message: "is missing (expected a line like `@title: My Game`)." });
	else if (!title) issues.push({ field: "title", message: "is empty." });

	if (!raw.author) issues.push({ field: "author", message: "is missing (expected `@author: Name`)." });
	else if (!author) issues.push({ field: "author", message: "is empty." });

	if (!raw.tags) issues.push({ field: "tags", message: "is missing (expected `@tags: ['tag1','tag2', ... ]`)." });
	const parsedTags = raw.tags ? parseTags(tagsRaw) : { issue: undefined as string | undefined, tags: [] as string[] };
	if (raw.tags && parsedTags.issue) issues.push({ field: "tags", message: parsedTags.issue });

	if (!raw.addedOn) issues.push({ field: "addedOn", message: "is missing (expected `@addedOn: YYYY-MM-DD`)." });
	else if (!addedOn) issues.push({ field: "addedOn", message: "is empty." });
	else if (!isValidDateString(addedOn)) issues.push({ field: "addedOn", message: "is not a valid date (recommended `YYYY-MM-DD`)." });

	if (!raw.description) issues.push({ field: "description", message: "is missing (expected `@description: ...`)." });
	else if (!description) issues.push({ field: "description", message: "is empty." });

	if (issues.length) return { issues };

	return {
		issues,
		entry: {
			filename: gameFile.replace(".js", ""),
			title,
			author,
			tags: parsedTags.tags ?? [],
			addedOn,
			description,
		},
	};
};

const readTextFile = async (filePath: string) => {
	if (bun) return bun.file(filePath).text();
	return readFile(filePath, "utf8");
};

const writeTextIfChanged = async (filePath: string, contents: string) => {
	const existing = await safeReadText(filePath);
	if (existing === contents) return false;

	await mkdir(dirname(filePath), { recursive: true });
	if (bun) await bun.write(filePath, contents);
	else await writeFile(filePath, contents, "utf8");
	return true;
};

const safeReadText = async (p: string) => readTextFile(p).catch(() => null);
const safeStat = async (p: string) => stat(p).catch(() => null);

const parseMetadataFromSource = (gameFile: string, fileData: string) => {
	const raw = Object.fromEntries(
		Object.entries(regexExpr).map(([k, re]) => [k, re.exec(fileData)]),
	);
	const { entry, issues } = validateAndBuildMetadata(gameFile, raw);

	if (issues.length || !entry) {
		const msg = issues.map((i) => `- ${i.field}: ${i.message}`).join("\n");
		throw new Error(`Metadata issues in ./games/${gameFile}:\n${msg}\n`);
	}

	return entry;
};

const emptyCache = (): CacheFile => ({ version: CACHE_VERSION, entries: {} });

const loadCache = async (): Promise<CacheFile> => {
	const raw = await safeReadText(CACHE_PATH);
	if (!raw) return emptyCache();
	try {
		const c = JSON.parse(raw) as CacheFile;
		return c.version === CACHE_VERSION && c.entries && typeof c.entries === "object" ? c : emptyCache();
	} catch {
		return emptyCache();
	}
};

const mapWithConcurrency = async <T, R>(
	items: T[], n: number, fn: (item: T, i: number) => Promise<R>,
) => {
	const out = new Array<R>(items.length);
	let idx = 0;
	await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
		while (idx < items.length) {
			const i = idx++;
			out[i] = await fn(items[i] as T, i);
		}
	}));
	return out;
};

const fingerprint = (s: { size: number; mtimeMs: number }) => `${s.size}:${Math.trunc(s.mtimeMs)}`;

const processGame = async (gameFile: string, cached?: CacheEntry): Promise<ProcessedGame> => {
	const name = gameFile.replace(/\.js$/, "");
	const gamePath = join(GAMES_DIR, gameFile);
	const imgPath = join(GAMES_IMG_DIR, `${name}.png`);
	const outPath = join(PUBLIC_DIR, `${name}.json`);

	const [gameStats, imgStats, outStats] = await Promise.all([
		safeStat(gamePath), safeStat(imgPath), safeStat(outPath),
	]);
	if (!gameStats) throw new Error(`Unable to read fingerprint for ./games/${gameFile}`);

	const metaFp = fingerprint(gameStats);
	const thumbFp = `${metaFp}|${imgStats ? fingerprint(imgStats) : "no-image"}`;
	const needsThumb = cached
		? cached.thumbnailFingerprint !== thumbFp
		: !outStats || outStats.mtimeMs < Math.max(gameStats.mtimeMs, imgStats?.mtimeMs ?? 0);

	let src: string | undefined;
	let metadata: ParsedMetaEntry;
	let metadataCacheHit = false;

	if (cached?.metadataFingerprint === metaFp) {
		metadata = cached.metadata;
		metadataCacheHit = true;
	} else {
		src = await readTextFile(gamePath);
		metadata = parseMetadataFromSource(gameFile, src);
	}

	const thumbnailUpdated = !outStats || needsThumb
		? await generateImageJson({ name, gameContentString: src, imagePath: imgPath, outputPath: outPath })
		: false;

	return {
		metadata,
		cacheEntry: { metadataFingerprint: metaFp, thumbnailFingerprint: thumbFp, metadata },
		metadataCacheHit,
		thumbnailUpdated,
	};
};

const generateMetadataArtifacts = async () => {
	const files = (await readdir(GAMES_DIR)).filter((f) => f.endsWith(".js"));
	const prev = await loadCache();
	const results = await mapWithConcurrency(files, CONCURRENCY, (f) => processGame(f, prev.entries[f]));

	const metaOut = await writeTextIfChanged(METADATA_PATH, JSON.stringify(results.map((r) => r.metadata)));
	const cacheOut = await writeTextIfChanged(CACHE_PATH, JSON.stringify({
		version: CACHE_VERSION,
		entries: Object.fromEntries(results.map((r) => [`${r.metadata.filename}.js`, r.cacheEntry])),
	} satisfies CacheFile));

	const hits = results.filter((r) => r.metadataCacheHit).length;
	const thumbs = results.filter((r) => r.thumbnailUpdated).length;
	console.log(
		`[generate-metadata] ${files.length} games, ${hits} cache hits, ${thumbs} thumbnails regenerated, ` +
		`metadata ${metaOut ? "updated" : "unchanged"}, cache ${cacheOut ? "updated" : "unchanged"}`,
	);
};

export default (): AstroIntegration => ({
	name: "generate-metadata",
	hooks: {
		"astro:config:done": async () => {
			await mkdir(ASTRO_DIR, { recursive: true });
			await generateMetadataArtifacts();
		},
	},
});
