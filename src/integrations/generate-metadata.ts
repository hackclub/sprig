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
	img: /@img: (.+)/,
	addedOn: /@addedOn: (.+)/,
};

/**
 * Checks if the metadata is valid
 *
 * TODO!
 */
const isMetadataValid = (_: any): boolean => {
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

		// Loop for each game
		walk().forEach((gameFile) => {
			process.stdout.write(`[${gameFile}] Looking for metadata...`);

			const fileData = fs.readFileSync(`./games/${gameFile}`).toString();

			// Extract the file data
			const title = regexExpr.title.exec(fileData);
			const author = regexExpr.author.exec(fileData);
			const tags = regexExpr.tags.exec(fileData);
			const img = regexExpr.img.exec(fileData);
			const addedOn = regexExpr.addedOn.exec(fileData);

			// Check if all of the fields are defined
			if (title && author && tags && img && addedOn && tags[1]) {
				// Create a meta entry
				const metaEntry = {
					filename: gameFile.replace(".js", ""),
					title: title[1],
					author: author[1],
					tags: JSON.parse(tags[1].replaceAll("'", '"')), // Replace all ' with " in order for compatibility issues
					img: img[1] == '""' ? "" : img[1],
					addedOn: addedOn[1],
				};

				// generate game image json data
				generateImageJson(metaEntry.filename);

				metadata.push(metaEntry);
				console.log(" OK!");
			} else {
				console.log(" ERR!");
				throw Error("A game metadata field is undefined!");
			}
		});

		process.stdout.write("[METADATA] Writing metadata file...");
		if (isMetadataValid(metadata)) {
			fs.writeFileSync("./games/metadata.json", JSON.stringify(metadata));
			console.log(" OK!");
		} else {
			console.log(" ERR!");
		}
	};

	// Return the astro integration
	return integration;
};

export default setup;
