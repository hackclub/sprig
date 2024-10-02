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
import { generateImageJson } from "./thumbnail";

/**
 * An object containing all of the regex expressions that can be used
 */
const regexExpr = {
	title: /@title: (.+)/,
	author: /@author: (.+)/,
	tags: /@tags: (.+)/,
	addedOn: /@addedOn: (.+)/,
};

/**
 * An array containing all of the valid strings
 */

const allowedTags = ["tutorial", "maze", "puzzle", "strategy", "endless", "multiplayer", "action", "sandbox", "adventure", "memory", "timed", "music", "role-playing", "turn-based", "real-time", "exploration", "survival", "simulation", "utility", "sports", "retro", "platformer", "humor", "3d"];


/**
 * Checks if the metadata is valid
 *
 * TODO!
 */
const isMetadataValid = (metadata: any): boolean => {
	for (let tag of metadata.tags) {
		if (!allowedTags.includes(tag)) {
			return false;
		}
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
	integration.hooks["astro:config:done"] = () => {
		const metadata: any = [];
		walk().forEach((gameFile) => {
			process.stdout.write(`[${gameFile}] Looking for metadata...`);

			const fileData = fs.readFileSync(`./games/${gameFile}`).toString();

			// Extract the file data
			const title = regexExpr.title.exec(fileData);
			const author = regexExpr.author.exec(fileData);
			const tags = regexExpr.tags.exec(fileData);
			const addedOn = regexExpr.addedOn.exec(fileData);

			// Check if all of the fields are defined
			if (title && author && tags && addedOn && tags[1]) {
				// Create a meta entry
				const metaEntry = {
					filename: gameFile.replace(".js", ""),
					title: title[1],
					author: author[1],
					tags: JSON.parse(tags[1].replaceAll("'", '"')), // Replace all ' with " in order for compatibility issues
					addedOn: addedOn[1],
				};

				if (!isMetadataValid(metaEntry)) {
					throw Error("Metadata is not valid in " + metaEntry.filename);
				}


				// generate game image json data
				generateImageJson(metaEntry.filename);

				metadata.push(metaEntry);
				console.log(" OK!");
			} else {
				console.log(" ERR!");
				throw Error(`A game metadata field is undefined! ${gameFile}`);
			}
		});

		process.stdout.write("[METADATA] Writing metadata file...");
		fs.writeFileSync("./games/metadata.json", JSON.stringify(metadata));
		console.log(" OK!");
	};

	// Return the astro integration
	return integration;
};

export default setup;
