/**
 * Astro integration that generatest the game/metadata.json
 *
 * How it works:
 * 1. It walks/scans the ./games/ directory
 * 2. It searches each file for metadata, if anything isn't found it halts the build/dev
 * 3. If found it checks if everything is valid
 * 4. Write metadata.json
 */
import fs from "fs";

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
 * Checks if the metadata is valid
 *
 * TODO!
 */
const isMetadataValid = (_) => {
	return true;
};

const metadata = [];
/**
 * Walks the ./games/ directory and returns all of the .js files
 */
const walk = () => {
	const files = fs.readdirSync("./games/");
	return files.filter((file) => file.endsWith(".js"));
};

// Loop for each game
walk().forEach((gameFile) => {
	process.stdout.write(`[${gameFile}] Looking for metadata...`);

	const fileData = fs.readFileSync(`./games/${gameFile}`).toString();

	// Extract the file data
	const title = regexExpr.title.exec(fileData);
	const author = regexExpr.author.exec(fileData);
	const tags = regexExpr.tags.exec(fileData);
	const addedOn = regexExpr.addedOn.exec(fileData);
	const description = regexExpr.description.exec(fileData);

	// Check if all of the fields are defined
	if (title && author && tags && addedOn && description && tags[1]) {
		// Create a meta entry
		const metaEntry = {
			filename: gameFile.replace(".js", ""),
			title: title[1],
			author: author[1],
			tags: JSON.parse(tags[1].replaceAll("'", '"')), // Replace all ' with " in order for compatibility issues
			addedOn: addedOn[1],
			description: description[1],
		};

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
