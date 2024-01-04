import type { AstroIntegration } from "astro";
import fs from "fs";

const rTitle = /@title: (.+)/;
const rAuthor = /@author: (.+)/;
const rTags = /@tags: (.+)/;
const rImg = /@img: (.+)/;
const rAddedOn = /@addedOn: (.+)/;

const walk = () => {
	const files = fs.readdirSync("./games/");
	return files.filter((file) => file.endsWith(".js"));
};

const setup = () => {
	const integration: AstroIntegration = {
		name: "generate-metadata",
		hooks: {},
	};

	integration.hooks["astro:config:done"] = () => {
		const metadata: any = [];

		walk().forEach((gameFile) => {
			process.stdout.write(`[${gameFile}] Looking for metadata...`);

			const fileData = fs.readFileSync(`./games/${gameFile}`).toString();

			const title = rTitle.exec(fileData);
			const author = rAuthor.exec(fileData);
			const tags = rTags.exec(fileData);
			const img = rImg.exec(fileData);
			const addedOn = rAddedOn.exec(fileData);
			if (title && author && tags && img && addedOn && tags[1]) {
				const metaEntry = {
					filename: gameFile.replace(".js", ""),
					title: title[1],
					author: author[1],
					tags: JSON.parse(tags[1].replaceAll("'", '"')),
					img: img[1] == '""' ? "" : img[1],
					addedOn: addedOn[1],
				};

				metadata.push(metaEntry);
				console.log(" OK!");

				process.stdout.write("[METADATA] Writing metadata file...");
				fs.writeFileSync(
					"./games/metadata.json",
					JSON.stringify(metadata)
				);
				console.log(" OK!");
			} else {
				console.log(" ERR!");
				throw Error("A game metadata field is undefined!");
			}
		});
	};

	return integration;
};

export default setup;
