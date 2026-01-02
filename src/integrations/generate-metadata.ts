/**
 * Astro integration that generatest the game/metadata.json
 *
 * How it works:
 * 1. It walks/scans the ./games/ directory
 * 2. It searches each file for metadata, if anything isn't found it halts the build/dev
 * 3. If found it checks if everything is valid
 * 4. Write metadata.json
 */
import type { AstroIntegration } from "astro";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateImageJson } from "./thumbnail";

/**
 * An object containing all of the regex expressions that can be used
 */
const regexExpr = {
	title: /@title: (.+)/,
	author: /@author: (.+)/,
	tags: /@tags: (.+)/,
	addedOn: /@addedOn: (.+)/,
	description: /@description: (.+)/,
};

/**
 * An array containing all of the valid strings
 */

// const allowedTags = ["tutorial", "maze", "puzzle", "strategy", "endless", "multiplayer", "action", "sandbox", "adventure", "memory", "timed", "music", "role-playing", "turn-based", "real-time", "exploration", "survival", "simulation", "utility", "sports", "retro", "platformer", "humor", "3d"];

type ParsedMetaEntry = {
	filename: string;
	title: string;
	author: string;
	tags: string[];
	addedOn: string;
	description: string;
};

type RawMetaMatches = {
	title: RegExpExecArray | null;
	author: RegExpExecArray | null;
	tags: RegExpExecArray | null;
	addedOn: RegExpExecArray | null;
	description: RegExpExecArray | null;
};

type MetadataIssue = {
	field: keyof Omit<ParsedMetaEntry, "filename">;
	message: string;
};

const getMatchValue = (match: RegExpExecArray | null) => match?.[1]?.trim() ?? "";

const isValidDateString = (value: string) => {
	// Accepts YYYY-MM-DD (recommended) but allows anything Date can parse as a fallback.
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return true;
	const t = Date.parse(value);
	return Number.isFinite(t);
};

const parseTags = (raw: string): { tags?: string[]; issue?: string } => {
	if (!raw.trim()) return { issue: "is empty (expected a JSON-ish array like ['maze','puzzle'])." };
	try {
		// Replace all ' with " for compatibility with common tag formats in games/*.js
		const parsed = JSON.parse(raw.replaceAll("'", '"'));
		if (!Array.isArray(parsed)) return { issue: "must be an array (example: ['maze','puzzle'])." };
		const nonStrings = parsed.filter((t) => typeof t !== "string");
		if (nonStrings.length) return { issue: "must be an array of strings (example: ['maze','puzzle'])." };
		return { tags: parsed as string[] };
	} catch (e) {
		if (e instanceof SyntaxError) {
			return { issue: "is not valid JSON (example: ['maze','puzzle'])." };
		}
		return { issue: "could not be parsed." };
	}
};

const validateAndBuildMetadata = (
	gameFile: string,
	raw: RawMetaMatches,
): { entry?: ParsedMetaEntry; issues: MetadataIssue[] } => {
	const issues: MetadataIssue[] = [];

	const title = getMatchValue(raw.title);
	const author = getMatchValue(raw.author);
	const tagsRaw = getMatchValue(raw.tags);
	const addedOn = getMatchValue(raw.addedOn);
	const description = getMatchValue(raw.description);

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

/**
 * Checks if the metadata is valid
 *
 * TODO!
 */
const isMetadataValid = (metadata: any): boolean => {
	// Check tags
	// for (let tag of metadata.tags) {
	// 	if (!allowedTags.includes(tag)) {
	// 		return false;
	// 	}
	// }

	// Check description
	if (!metadata.description || metadata.description.trim() === "") {
		return false;
	}

	return true;
};

/**
 * Walks the ./games/ directory and returns all of the .js files
 */
const walk = () => {
	const files = fs.readdirSync("./games/");
	return files.filter((file) => file.endsWith(".js"));
};

export async function generateMetadataJson(options?: { generateThumbnails?: boolean }) {
	const generateThumbnails = options?.generateThumbnails ?? true;

	const metadata: ParsedMetaEntry[] = [];

	for (const gameFile of walk()) {
		process.stdout.write(`[${gameFile}] Looking for metadata...`);

		const fileData = fs.readFileSync(`./games/${gameFile}`).toString();

		// Extract the file data
		const gamePath = "./games/" + gameFile;

		const rawMatches: RawMetaMatches = {
			title: regexExpr.title.exec(fileData),
			author: regexExpr.author.exec(fileData),
			tags: regexExpr.tags.exec(fileData),
			addedOn: regexExpr.addedOn.exec(fileData),
			description: regexExpr.description.exec(fileData),
		};

		const { entry: metaEntry, issues } = validateAndBuildMetadata(gameFile, rawMatches);

		if (issues.length || !metaEntry) {
			console.log(" ERR!");
			const formattedIssues = issues.map((i) => `- ${i.field}: ${i.message}`).join("\n");
			throw new Error(`Metadata issues in ${gamePath}:\n${formattedIssues}\n`);
		}

		// Keep legacy validation as a final guardrail (should be redundant with validateAndBuildMetadata).
		if (!isMetadataValid(metaEntry)) {
			console.log(" ERR!");
			throw new Error(`Metadata is not valid in: \n${gamePath}`);
		}

		if (generateThumbnails) {
			// generate game image json data
			await generateImageJson(metaEntry.filename);
		}

		metadata.push(metaEntry);
		console.log(" OK!");
	}

	process.stdout.write("[METADATA] Writing metadata file...");
	fs.writeFileSync("./games/metadata.json", JSON.stringify(metadata));
	console.log(" OK!");
}

/**
 * The function that runs on integration setup
 */
const setup = () => {
	// Create an astro integration
	const integration: AstroIntegration = {
		name: "generate-metadata",
		hooks: {},
	};

	// Hook a function on the config:done integration
	// More info: https://docs.astro.build/en/reference/integrations-reference/#astroconfigdone
	integration.hooks["astro:config:done"] = async () => {
		await generateMetadataJson({ generateThumbnails: true });
	};

	// Return the astro integration
	return integration;
};

export default setup;

// Allow running this file directly (useful for CI / local validation).
const isDirectRun = (() => {
	const argv1 = process.argv[1];
	if (!argv1) return false;
	try {
		return path.resolve(argv1) === path.resolve(fileURLToPath(import.meta.url));
	} catch {
		return false;
	}
})();

if (isDirectRun) {
	const generateThumbnails =
		process.argv.includes("--thumbnails") ? true
		: process.argv.includes("--no-thumbnails") ? false
		: process.env.CI ? false
		: true;

	generateMetadataJson({ generateThumbnails }).catch((err) => {
		console.error(err);
		process.exitCode = 1;
	});
}
