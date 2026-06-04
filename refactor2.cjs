const fs = require('fs');

let code = fs.readFileSync('/Users/maaren/sprig/.github/scripts/auto-triage.mjs', 'utf8');

const target = `	if (jsFiles.length === 1) {
		gameFile = jsFiles[0];
		const filename = path.basename(gameFile.filename);
		const gamePath = path.join(workspace, gameFile.filename);
		const content = readFileSafe(gamePath);

		addCheck(
			"Filename uses safe characters",
			/^[a-zA-Z0-9_-]+\\.js$/.test(filename),
			/^[a-zA-Z0-9_-]+\\.js$/.test(filename)
				? "Filename is safe."
				: \`Rename \\\`\${filename}\\\` to use only letters, numbers, \\\`-\\\`, and \\\`_\\\`.\`
		);

		addCheck(
			"Game file is directly inside games/",
			path.dirname(gameFile.filename) === "games",
			path.dirname(gameFile.filename) === "games"
				? "Game file is in \`games/\`."
				: \`Move \\\`\${gameFile.filename}\\\` directly into \\\`games/\\\`, not a nested folder.\`
		);

		if (content === null) {
			addCheck("Game file readable", false, \`Unable to read \\\`\${gameFile.filename}\\\` from the checked-out PR.\`);
		} else {
			metadata = validateMetadata(content, filename, workspace);
			for (const check of metadata.checks) addCheck(check.name, check.ok, check.detail);

			const codeWithoutComments = stripComments(content);
			const unsupportedApis = [/document\\./i, /window\\./i, /alert\\(/i, /fetch\\(/i].filter((regex) => regex.test(codeWithoutComments));
			addCheck(
				"Sprig-only APIs",
				unsupportedApis.length === 0,
				unsupportedApis.length
					? \`Remove browser APIs like \\\`window\\\`, \\\`document\\\`, \\\`alert\\\`, or \\\`fetch\\\` from \\\`\${filename}\\\`.\`
					: "No unsupported browser APIs found."
			);

			similarity = findMostSimilarGame(content, gameFile.filename, workspace);
			if (similarity.score >= 0.5) {
				warnings.push(\`Similarity is \${formatPercent(similarity.score)} against \\\`\${similarity.match}\\\`. A reviewer or lead should compare both games.\`);
			}
		}

		rawUrl = \`https://raw.githubusercontent.com/\${owner}/\${repo}/\${pullRequest.head.sha}/\${gameFile.filename}\`;
		const reviewUrl = new URL(reviewBaseUrl);
		reviewUrl.searchParams.set("review", "true");
		reviewUrl.searchParams.set("raw", rawUrl);
		reviewUrl.searchParams.set("pr", String(prNumber));
		reviewUrl.searchParams.set("repo", \`\${owner}/\${repo}\`);
		playUrl = reviewUrl.toString();
	}

	if (gameFile) {
		const gameBase = path.basename(gameFile.filename, ".js");
		const badImagePaths = imageFiles.filter((file) => !file.filename.startsWith("games/img/"));
		const badImgNames = badImagePaths.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
		let imgPathDetail = "No image provided; this is OK.";
		if (badImagePaths.length) imgPathDetail = \`Move images into \\\`games/img/\\\`: \${badImgNames}.\`;
		else if (imageFiles.length) imgPathDetail = "Image files are in \`games/img/\`.";
		addCheck("Optional image path", badImagePaths.length === 0, imgPathDetail);

		const mismatchedImages = imageFiles.filter((file) => path.basename(file.filename, path.extname(file.filename)) !== gameBase);
		const mismatchNames = mismatchedImages.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
		let imgNameDetail = "No image provided; gallery thumbnail can be generated/default.";
		if (mismatchedImages.length) imgNameDetail = \`Image filename must match \\\`\${gameBase}.js\\\`. Found \${mismatchNames}.\`;
		else if (imageFiles.length) imgNameDetail = "Image filename matches the game file.";
		addCheck("Optional image name", mismatchedImages.length === 0, imgNameDetail);

		if (imageFiles.length > 0) {
			const image = imageFiles.find((file) => path.basename(file.filename, path.extname(file.filename)) === gameBase) ?? imageFiles[0];
			screenshotUrl = \`https://raw.githubusercontent.com/\${owner}/\${repo}/\${pullRequest.head.sha}/\${image.filename}\`;
		}
	}`;

const replacement = `	if (jsFiles.length === 1) {
		gameFile = jsFiles[0];
		const result = validateSingleGameFile(gameFile, workspace, addCheck, warnings);
		metadata = result.metadata;
		similarity = result.similarity;

		rawUrl = \`https://raw.githubusercontent.com/\${owner}/\${repo}/\${pullRequest.head.sha}/\${gameFile.filename}\`;
		const reviewUrl = new URL(reviewBaseUrl);
		reviewUrl.searchParams.set("review", "true");
		reviewUrl.searchParams.set("raw", rawUrl);
		reviewUrl.searchParams.set("pr", String(prNumber));
		reviewUrl.searchParams.set("repo", \`\${owner}/\${repo}\`);
		playUrl = reviewUrl.toString();
	}

	if (gameFile) {
		const gameBase = path.basename(gameFile.filename, ".js");
		screenshotUrl = validateImages(imageFiles, gameBase, owner, repo, pullRequest, addCheck);
	}`;

code = code.replace(target, replacement);

const helperFunctions = `
function validateImages(imageFiles, gameBase, owner, repo, pullRequest, addCheck) {
	const badImagePaths = imageFiles.filter((file) => !file.filename.startsWith("games/img/"));
	const badImgNames = badImagePaths.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	let imgPathDetail = "No image provided; this is OK.";
	if (badImagePaths.length) imgPathDetail = \`Move images into \\\`games/img/\\\`: \${badImgNames}.\`;
	else if (imageFiles.length) imgPathDetail = "Image files are in \`games/img/\`.";
	addCheck("Optional image path", badImagePaths.length === 0, imgPathDetail);

	const mismatchedImages = imageFiles.filter((file) => path.basename(file.filename, path.extname(file.filename)) !== gameBase);
	const mismatchNames = mismatchedImages.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	let imgNameDetail = "No image provided; gallery thumbnail can be generated/default.";
	if (mismatchedImages.length) imgNameDetail = \`Image filename must match \\\`\${gameBase}.js\\\`. Found \${mismatchNames}.\`;
	else if (imageFiles.length) imgNameDetail = "Image filename matches the game file.";
	addCheck("Optional image name", mismatchedImages.length === 0, imgNameDetail);

	if (imageFiles.length > 0) {
		const image = imageFiles.find((file) => path.basename(file.filename, path.extname(file.filename)) === gameBase) ?? imageFiles[0];
		return \`https://raw.githubusercontent.com/\${owner}/\${repo}/\${pullRequest.head.sha}/\${image.filename}\`;
	}
	return null;
}

function validateSingleGameFile(gameFile, workspace, addCheck, warnings) {
	let metadata = null;
	let similarity = { score: 0, match: null };

	const filename = path.basename(gameFile.filename);
	const gamePath = path.join(workspace, gameFile.filename);
	const content = readFileSafe(gamePath);

	addCheck(
		"Filename uses safe characters",
		/^[a-zA-Z0-9_-]+\\.js$/.test(filename),
		/^[a-zA-Z0-9_-]+\\.js$/.test(filename)
			? "Filename is safe."
			: \`Rename \\\`\${filename}\\\` to use only letters, numbers, \\\`-\\\`, and \\\`_\\\`.\`
	);

	addCheck(
		"Game file is directly inside games/",
		path.dirname(gameFile.filename) === "games",
		path.dirname(gameFile.filename) === "games"
			? "Game file is in \`games/\`."
			: \`Move \\\`\${gameFile.filename}\\\` directly into \\\`games/\\\`, not a nested folder.\`
	);

	if (content === null) {
		addCheck("Game file readable", false, \`Unable to read \\\`\${gameFile.filename}\\\` from the checked-out PR.\`);
	} else {
		metadata = validateMetadata(content, filename, workspace);
		for (const check of metadata.checks) addCheck(check.name, check.ok, check.detail);

		const codeWithoutComments = stripComments(content);
		const unsupportedApis = [/document\\./i, /window\\./i, /alert\\(/i, /fetch\\(/i].filter((regex) => regex.test(codeWithoutComments));
		addCheck(
			"Sprig-only APIs",
			unsupportedApis.length === 0,
			unsupportedApis.length
				? \`Remove browser APIs like \\\`window\\\`, \\\`document\\\`, \\\`alert\\\`, or \\\`fetch\\\` from \\\`\${filename}\\\`.\`
				: "No unsupported browser APIs found."
		);

		similarity = findMostSimilarGame(content, gameFile.filename, workspace);
		if (similarity.score >= 0.5) {
			warnings.push(\`Similarity is \${formatPercent(similarity.score)} against \\\`\${similarity.match}\\\`. A reviewer or lead should compare both games.\`);
		}
	}
	return { metadata, similarity };
}
`;

code += helperFunctions;

fs.writeFileSync('/Users/maaren/sprig/.github/scripts/auto-triage.mjs', code);
