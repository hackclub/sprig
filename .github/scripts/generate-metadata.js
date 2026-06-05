import fs from "node:fs";

const regexExpr = {
	title: /@title: (.+)/,
	author: /@author: (.+)/,
	tags: /@tags: (.+)/,
	addedOn: /@addedOn: (.+)/,
	description: /@description: (.+)/,
};

const isMetadataValid = (_) => {
	return true;
};

const metadata = [];

const walk = () => {
	const files = fs.readdirSync("./games/");
	return files.filter((file) => file.endsWith(".js"));
};

walk().forEach((gameFile) => {
	process.stdout.write(`[${gameFile}] Looking for metadata...`);

	const fileData = fs.readFileSync(`./games/${gameFile}`).toString();

	const title = regexExpr.title.exec(fileData);
	const author = regexExpr.author.exec(fileData);
	const tags = regexExpr.tags.exec(fileData);
	const addedOn = regexExpr.addedOn.exec(fileData);
	const description = regexExpr.description.exec(fileData);

	if (title && author && tags && addedOn && description && tags[1]) {
		const metaEntry = {
			filename: gameFile.replace(".js", ""),
			title: title[1],
			author: author[1],
			tags: JSON.parse(tags[1].replaceAll("'", '"')),
			addedOn: addedOn[1],
			description: description[1],
		};

		metadata.push(metaEntry);
		console.log(" OK!");
	} else {
		console.log(" ERR!");
		throw new Error("A game metadata field is undefined!");
	}
});

process.stdout.write("[METADATA] Writing metadata file...");
if (isMetadataValid(metadata)) {
	fs.writeFileSync("./games/metadata.json", JSON.stringify(metadata));
	console.log(" OK!");
} else {
	console.log(" ERR!");
}
