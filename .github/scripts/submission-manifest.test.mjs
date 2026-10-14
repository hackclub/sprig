import { describe, expect, it } from "vitest";
import {
	buildSubmissionManifest,
	getImageCountCheck,
	validateImageFiles,
} from "./submission-manifest.mjs";

describe("buildSubmissionManifest", () => {
	it("classifies valid files and separates loose/disallowed paths", () => {
		const manifest = buildSubmissionManifest([
			{ filename: "games/my_game.js", status: "added" },
			{ filename: "games/img/my_game.png", status: "added" },
			{ filename: "games/img/Retro space shooter.png", status: "added" },
			{ filename: "screenshots/my_game.png", status: "added" },
			{ filename: "games/sub/nested.js", status: "added" },
		]);
		expect(manifest.gameFiles).toHaveLength(1);
		expect(manifest.imageFiles).toHaveLength(1);
		expect(manifest.imageFilesLoose).toHaveLength(2);
		expect(manifest.allImageFiles).toHaveLength(3);
		expect(manifest.disallowedFiles.map((f) => f.filename)).toEqual([
			"screenshots/my_game.png",
			"games/sub/nested.js",
		]);
	});
});

describe("getImageCountCheck", () => {
	it.each([
		[[], true],
		[[{ filename: "games/img/a.png" }], true],
		[[{ filename: "games/img/a.png" }, { filename: "games/img/b.png" }], false],
	])("handles %i images (ok: %s)", (files, ok) => {
		const check = getImageCountCheck(files);
		expect(check.ok).toBe(ok);
		if (!ok) {
			expect(check.detail).toContain("Only one image is allowed per game");
			expect(check.detail).toContain("`games/img/a.png`");
		}
	});
});

describe("validateImageFiles", () => {
	it.each([
		{ files: [], base: "my_game", pathOk: true, nameOk: true, match: /gallery thumbnail/ },
		{ files: ["games/img/my_game.png"], base: "my_game", pathOk: true, nameOk: true, match: /matches the game/ },
		{ files: ["games/my_game.png"], base: "my_game", pathOk: false, nameOk: false, match: /Image must be named `games\/img\/my_game\.png`/ },
		{ files: ["screenshots/thumb.png"], base: "my_game", pathOk: false, nameOk: false, match: /Image must be named `games\/img\/my_game\.png`/ },
		{ files: ["games/img/wrong.png"], base: "my_game", pathOk: true, nameOk: false, match: /Image must be named `games\/img\/my_game\.png`/ },
		{ files: ["games/img/my_game.png"], base: null, pathOk: true, nameOk: false, match: /Add exactly one game file/ },
		{ files: ["games/img/Retro space.png"], base: "Retro space", pathOk: true, nameOk: false, match: /rename to `games\/Retro_space\.js` and `games\/img\/Retro_space\.png`/ },
		{ files: ["games/img/dr. mario.png"], base: "dr. mario", pathOk: true, nameOk: false, match: /games\/dr_mario\.js/ },
		{ files: ["games/img/@#$.png"], base: "@#$", pathOk: true, nameOk: false, match: /games\/game\.js/ },
	])("validates files for base '$base'", ({ files, base, pathOk, nameOk, match }) => {
		const imageFiles = files.map((filename) => ({ filename }));
		const checks = validateImageFiles({ imageFiles, gameBase: base });
		expect(checks.find((c) => c.name === "Optional image path")?.ok).toBe(pathOk);
		const nameCheck = checks.find((c) => c.name === "Optional image name");
		expect(nameCheck?.ok).toBe(nameOk);
		expect(nameCheck?.detail).toMatch(match);
	});
});
