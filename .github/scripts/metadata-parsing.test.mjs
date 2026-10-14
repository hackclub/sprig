import { describe, expect, it } from "vitest";
import {
	buildMetadataSnippet,
	getMetadataValue,
	inferSubmissionMetadata,
	parseTags,
	validateMetadataHeader,
} from "./review-utils.mjs";

describe("getMetadataValue", () => {
	it("parses fields from standard Sprig comment blocks", () => {
		const content = `/*
@title: SprigClick
@author: CatR3kd
@description: Simple clicker game
@tags: ['endless']
@addedOn: 2023-01-06
*/`;
		expect(getMetadataValue(content, "title")).toBe("SprigClick");
		expect(getMetadataValue(content, "author")).toBe("CatR3kd");
		expect(getMetadataValue(content, "description")).toBe("Simple clicker game");
		expect(getMetadataValue(content, "tags")).toBe("['endless']");
		expect(getMetadataValue(content, "addedOn")).toBe("2023-01-06");
	});

	it("parses fields from JSDoc-style comment blocks with leading asterisks", () => {
		const content = `/**
 * @title: Space Shooter: Galaxy Attack
 * @author: Anonymous
 * @description: A rapid-fire arcade space shooter game where you dodge and destroy incoming enemies.
 * @tags: ['game','space','shooter','arcade','2d']
 * @addedOn: 2026-07-08
 */`;
		expect(getMetadataValue(content, "title")).toBe("Space Shooter: Galaxy Attack");
		expect(getMetadataValue(content, "author")).toBe("Anonymous");
		expect(getMetadataValue(content, "description")).toBe(
			"A rapid-fire arcade space shooter game where you dodge and destroy incoming enemies."
		);
		expect(getMetadataValue(content, "tags")).toBe("['game','space','shooter','arcade','2d']");
		expect(getMetadataValue(content, "addedOn")).toBe("2026-07-08");
	});

	it("strips leading asterisks from multi-line descriptions in JSDoc comments", () => {
		const content = `/**
 * @title: Space Shooter
 * @description: Line 1 of description
 * Line 2 of description
 * @author: Bob
 */`;
		expect(getMetadataValue(content, "description")).toBe(
			"Line 1 of description\nLine 2 of description"
		);

		const mixedContent = `/* @description: Line 1
 * Line 2
 */`;
		expect(getMetadataValue(mixedContent, "description")).toBe(
			"Line 1\nLine 2"
		);
	});

	it("handles CRLF line endings", () => {
		const content = "/**\r\n * @title: Space Shooter\r\n * @author: Anonymous\r\n * @tags: ['space']\r\n */";
		expect(getMetadataValue(content, "title")).toBe("Space Shooter");
		expect(getMetadataValue(content, "author")).toBe("Anonymous");
		expect(getMetadataValue(content, "tags")).toBe("['space']");
	});

	it("handles trailing comment closure on same line", () => {
		const content = `/*
@title: Inline Close
@tags: ['puzzle'] */`;
		expect(getMetadataValue(content, "tags")).toBe("['puzzle']");
	});

	it("returns empty string when key is missing or empty", () => {
		const content = `/*
@title:
@author: Bob
*/`;
		expect(getMetadataValue(content, "title")).toBe("");
		expect(getMetadataValue(content, "nonexistent")).toBe("");
	});
});

describe("parseTags", () => {
	it("parses valid single and double quoted tags arrays", () => {
		expect(parseTags("['maze', 'puzzle']")).toEqual({ tags: ["maze", "puzzle"] });
		expect(parseTags('["arcade", "retro"]')).toEqual({ tags: ["arcade", "retro"] });
		expect(parseTags("[ 'space' ]")).toEqual({ tags: ["space"] });
		expect(parseTags("['point, click', 'puzzle']")).toEqual({ tags: ["point, click", "puzzle"] });
		expect(parseTags('["sprig\'s adventure", "retro"]')).toEqual({ tags: ["sprig's adventure", "retro"] });
	});

	it("explains missing quotes for unquoted tags inside brackets", () => {
		const res = parseTags("[platformer, penguin]");
		expect(res.tags).toBeUndefined();
		expect(res.issue).toContain("Each tag inside the brackets must be surrounded by quotes");
	});

	it("explains missing brackets when tags are not in square brackets", () => {
		const unquoted = parseTags("game, space, shooter");
		expect(unquoted.tags).toBeUndefined();
		expect(unquoted.issue).toContain("Tags must be enclosed in square brackets and quotes");

		const quoted = parseTags("'game', 'space'");
		expect(quoted.tags).toBeUndefined();
		expect(quoted.issue).toContain("Tags must be enclosed in square brackets");
	});

	it("explains empty tags list", () => {
		const empty = parseTags("");
		expect(empty.tags).toBeUndefined();
		expect(empty.issue).toContain("Tags cannot be empty");

		const emptyArr = parseTags("[]");
		expect(emptyArr.tags).toEqual([]);
		expect(emptyArr.issue).toContain("Tags list cannot be empty");
	});

	it("rejects blank string items inside array", () => {
		const res = parseTags("['']");
		expect(res.tags).toBeUndefined();
		expect(res.issue).toContain("Tags cannot be blank");
	});
});

describe("validateMetadataHeader", () => {
	it("consolidates missing header into a single clear check when no metadata exists", () => {
		const rawCode = `// Block Pusher
const player = "p";
setLegend([player, bitmap\`...\`]);`;
		const res = validateMetadataHeader(rawCode, "Vasko-JS-game.js");
		expect(res.hasHeader).toBe(false);
		expect(res.checks).toHaveLength(1);
		expect(res.checks[0].name).toBe("Metadata header");
		expect(res.checks[0].ok).toBe(false);
		expect(res.checks[0].detail).toContain("Missing comment header at the top of `Vasko-JS-game.js`");
	});

	it("provides actionable instructions with examples when individual fields are missing", () => {
		const partial = `/*
@title: Space Maze
@author: Alice
*/
const p = "p";`;
		const res = validateMetadataHeader(partial, "space_maze.js");
		expect(res.hasHeader).toBe(true);

		const titleCheck = res.checks.find((c) => c.name === "Metadata @title");
		expect(titleCheck.ok).toBe(true);
		expect(titleCheck.detail).toBe("@title is filled.");

		const descCheck = res.checks.find((c) => c.name === "Metadata @description");
		expect(descCheck.ok).toBe(false);
		expect(descCheck.detail).toContain("Add a short description of what players do");
		expect(descCheck.detail).toContain("@description:");

		const tagsCheck = res.checks.find((c) => c.name === "Metadata @tags");
		expect(tagsCheck.ok).toBe(false);
		expect(tagsCheck.detail).toContain("Add tags for your game");

		const dateCheck = res.checks.find((c) => c.name === "Metadata @addedOn");
		expect(dateCheck.ok).toBe(false);
		expect(dateCheck.detail).toContain("Add today's date in YYYY-MM-DD format");

		// Suppresses redundant sub-checks when parent fields are missing
		expect(res.checks.some((c) => c.name === "Metadata tags parse")).toBe(false);
		expect(res.checks.some((c) => c.name === "Metadata date")).toBe(false);
	});

	it("runs tags parse and date checks only when those fields are present", () => {
		const content = `/*
@title: My Game
@author: Bob
@description: Cool game
@tags: [broken, tags]
@addedOn: 1999-01-01
*/`;
		const res = validateMetadataHeader(content, "game.js");
		expect(res.hasHeader).toBe(true);

		const tagsParse = res.checks.find((c) => c.name === "Metadata tags parse");
		expect(tagsParse).toBeDefined();
		expect(tagsParse.ok).toBe(false);

		const dateCheck = res.checks.find((c) => c.name === "Metadata date");
		expect(dateCheck).toBeDefined();
		expect(dateCheck.ok).toBe(false);
	});

	it("passes all checks when metadata is complete and valid", () => {
		const today = new Date().toISOString().slice(0, 10);
		const content = `/*
@title: Crystal Quest
@author: Adventurer
@description: Collect all crystals and find the hidden exit.
@tags: ['puzzle', 'adventure']
@addedOn: ${today}
*/`;
		const res = validateMetadataHeader(content, "crystal_quest.js");
		expect(res.hasHeader).toBe(true);
		expect(res.checks.every((c) => c.ok)).toBe(true);
	});
});

describe("buildMetadataSnippet", () => {
	it("generates a complete metadata comment block with defaults", () => {
		const snippet = buildMetadataSnippet();
		expect(snippet).toContain("@title: My Game");
		expect(snippet).toContain("@author: Your Name");
		expect(snippet).toContain("@tags: ['puzzle']");
		expect(snippet.startsWith("/*\n")).toBe(true);
		expect(snippet.endsWith("\n*/")).toBe(true);
	});

	it("pre-fills provided author, title, tags, and date", () => {
		const snippet = buildMetadataSnippet({
			title: "Vasko JS game",
			author: "vask3",
			description: "Push blocks to targets",
			tags: ["sokoban", "puzzle"],
			addedOn: "2026-10-14",
		});
		expect(snippet).toContain("@title: Vasko JS game");
		expect(snippet).toContain("@author: vask3");
		expect(snippet).toContain("@description: Push blocks to targets");
		expect(snippet).toContain("@tags: ['sokoban', 'puzzle']");
		expect(snippet).toContain("@addedOn: 2026-10-14");
	});
});

describe("inferSubmissionMetadata", () => {
	it("infers accurate metadata from PR details and source code comments", () => {
		const content = `// Block Pusher (Sokoban)
const player = "p";
const block = "b";`;
		const pullRequest = {
			title: "[Sprig App] Vasko JS game",
			user: { login: "vask3" },
			body: `### Author name
Author: vask3

### About your game
**What is your game about?**
Hello, thats is my first JS game.

**How do you play your game?**
Objective: Push the block (b) onto the target tile (g).`,
		};

		const inferred = inferSubmissionMetadata({
			content,
			filename: "games/Vasko-JS-game.js",
			pullRequest,
		});

		expect(inferred.title).toBe("Block Pusher");
		expect(inferred.author).toBe("vask3");
		expect(inferred.description).toContain("Hello, thats is my first JS game");
		expect(inferred.tags).toEqual(["puzzle"]);
		expect(inferred.addedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);

		// Guarantee that pasting the generated snippet passes 100% of metadata checks
		const snippet = buildMetadataSnippet(inferred);
		const validation = validateMetadataHeader(`${snippet}\n${content}`, "Vasko-JS-game.js");
		expect(validation.hasHeader).toBe(true);
		expect(validation.checks.every((c) => c.ok)).toBe(true);
	});

	it("falls back to cleaned PR title and author login when comments/body are minimal", () => {
		const content = `const a = 1;`;
		const pullRequest = {
			title: "Add Dungeon Crawler Game",
			user: { login: "gamer123" },
			body: "",
		};

		const inferred = inferSubmissionMetadata({
			content,
			filename: "games/dungeon_crawler.js",
			pullRequest,
		});

		expect(inferred.title).toBe("Dungeon Crawler Game");
		expect(inferred.author).toBe("gamer123");
		expect(inferred.description).toBe("A custom game called Dungeon Crawler Game built for Sprig.");
		expect(inferred.tags).toBeDefined();
		expect(inferred.tags.length).toBeGreaterThan(0);

		const snippet = buildMetadataSnippet(inferred);
		const validation = validateMetadataHeader(`${snippet}\n${content}`, "dungeon_crawler.js");
		expect(validation.hasHeader).toBe(true);
		expect(validation.checks.every((c) => c.ok)).toBe(true);
	});

	it("preserves already valid existing metadata fields", () => {
		const content = `/*
@title: Retro Race
@author: Speedster
*/`;
		const existingMetadata = {
			title: "Retro Race",
			author: "Speedster",
		};
		const pullRequest = {
			title: "[Sprig App] race",
			user: { login: "someone" },
			body: "**What is your game about?** Dodge cars at high speed.",
		};

		const inferred = inferSubmissionMetadata({
			content,
			filename: "games/retro_race.js",
			pullRequest,
			existingMetadata,
		});

		expect(inferred.title).toBe("Retro Race");
		expect(inferred.author).toBe("Speedster");
		expect(inferred.description).toBe("Dodge cars at high speed.");
		expect(inferred.tags).toContain("runner");
	});
});



