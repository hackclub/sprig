import { describe, expect, it } from "vitest";
import { getMetadataValue } from "./review-utils.mjs";

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
