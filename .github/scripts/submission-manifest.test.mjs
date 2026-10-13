import { describe, expect, it } from "vitest";
import {
	buildSubmissionManifest,
	getImageCountCheck,
	validateImageFiles,
} from "./submission-manifest.mjs";

describe("buildSubmissionManifest", () => {
	it("classifies standard valid game and thumbnail image files", () => {
		const manifest = buildSubmissionManifest([
			{ filename: "games/my_game.js", status: "added" },
			{ filename: "games/img/my_game.png", status: "added" },
		]);

		expect(manifest.gameFiles).toHaveLength(1);
		expect(manifest.gameFilesLoose).toHaveLength(1);
		expect(manifest.imageFiles).toHaveLength(1);
		expect(manifest.imageFilesLoose).toHaveLength(1);
		expect(manifest.disallowedFiles).toHaveLength(0);
	});

	it("keeps images with spaces in imageFilesLoose without flagging as disallowed folder", () => {
		const manifest = buildSubmissionManifest([
			{ filename: "games/Retro space shooter.js", status: "added" },
			{ filename: "games/img/Retro space shooter.png", status: "added" },
			{ filename: "games/img/retro_space_shooter_thumbnail.png", status: "added" },
		]);

		expect(manifest.gameFilesLoose).toHaveLength(1);
		expect(manifest.imageFilesLoose).toHaveLength(2);
		expect(manifest.disallowedFiles).toHaveLength(0);
	});

	it("flags files outside games/ or games/img/ as disallowed", () => {
		const manifest = buildSubmissionManifest([
			{ filename: "games/my_game.js", status: "added" },
			{ filename: "screenshots/my_game.png", status: "added" },
			{ filename: "games/subfolder/nested.js", status: "added" },
		]);

		expect(manifest.disallowedFiles.map((f) => f.filename)).toEqual([
			"screenshots/my_game.png",
			"games/subfolder/nested.js",
		]);
	});
});

describe("getImageCountCheck", () => {
	it("passes when zero images are provided", () => {
		const check = getImageCountCheck([]);
		expect(check.ok).toBe(true);
		expect(check.detail).toBe("No image provided; this is OK.");
	});

	it("passes when exactly one image is provided", () => {
		const check = getImageCountCheck([{ filename: "games/img/my_game.png" }]);
		expect(check.ok).toBe(true);
		expect(check.detail).toBe("Exactly one image file provided.");
	});

	it("fails when more than one image is provided", () => {
		const check = getImageCountCheck([
			{ filename: "games/img/Retro space shooter.png" },
			{ filename: "games/img/retro_space_shooter_thumbnail.png" },
		]);
		expect(check.ok).toBe(false);
		expect(check.detail).toContain("Only one image is allowed per game");
		expect(check.detail).toContain("Found 2 images");
		expect(check.detail).toContain("`games/img/Retro space shooter.png`");
		expect(check.detail).toContain("`games/img/retro_space_shooter_thumbnail.png`");
	});
});

describe("validateImageFiles", () => {
	it("passes when no images are provided", () => {
		const checks = validateImageFiles({ imageFiles: [], gameBase: "my_game" });
		expect(checks).toEqual([
			{ name: "Optional image path", ok: true, detail: "No image provided; this is OK." },
			{
				name: "Optional image name",
				ok: true,
				detail: "No image provided; gallery thumbnail can be generated/default.",
			},
		]);
	});

	it("passes when the single image matches the game filename", () => {
		const checks = validateImageFiles({
			imageFiles: [{ filename: "games/img/my_game.png" }],
			gameBase: "my_game",
		});
		expect(checks.find((c) => c.name === "Optional image path")?.ok).toBe(true);
		expect(checks.find((c) => c.name === "Optional image name")?.ok).toBe(true);
		expect(checks.find((c) => c.name === "Optional image name")?.detail).toBe(
			"Image filename matches the game file."
		);
	});

	it("gives a unified rename recommendation when the game file has spaces", () => {
		const checks = validateImageFiles({
			imageFiles: [
				{ filename: "games/img/Retro space shooter.png" },
				{ filename: "games/img/retro_space_shooter_thumbnail.png" },
			],
			gameBase: "Retro space shooter",
		});

		const nameCheck = checks.find((c) => c.name === "Optional image name");
		expect(nameCheck?.ok).toBe(false);
		expect(nameCheck?.detail).toBe(
			"Both your game file and image filename must match and use only letters, numbers, '-', and '_'. For example, rename to `games/Retro_space_shooter.js` and `games/img/Retro_space_shooter.png`."
		);
	});

	it("identifies mismatched image names when game filename is already valid", () => {
		const checks = validateImageFiles({
			imageFiles: [{ filename: "games/img/retro_space_shooter_thumbnail.png" }],
			gameBase: "retro_space_shooter",
		});

		const nameCheck = checks.find((c) => c.name === "Optional image name");
		expect(nameCheck?.ok).toBe(false);
		expect(nameCheck?.detail).toBe(
			"Image must be named `games/img/retro_space_shooter.png` to match `games/retro_space_shooter.js`. Found `games/img/retro_space_shooter_thumbnail.png`."
		);
	});

	it("fails image name check if no game file was submitted", () => {
		const checks = validateImageFiles({
			imageFiles: [{ filename: "games/img/my_game.png" }],
			gameBase: null,
		});

		const nameCheck = checks.find((c) => c.name === "Optional image name");
		expect(nameCheck?.ok).toBe(false);
		expect(nameCheck?.detail).toBe(
			"Add exactly one game file in `games/` so the image filename can match it."
		);
	});
});
