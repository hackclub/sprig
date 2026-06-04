const fs = require('fs');

let code = fs.readFileSync('/Users/maaren/sprig/.github/scripts/auto-triage.mjs', 'utf8');

// 1. Extract validateSubmissionFiles
code = code.replace(
`	const jsFiles = pullFiles.filter((file) => file.filename.startsWith("games/") && file.filename.endsWith(".js"));
	const imageFiles = pullFiles.filter((file) => /\\.(png|jpe?g|webp)$/i.test(file.filename));
	const disallowedFiles = pullFiles.filter((file) => !isAllowedSubmissionFile(file.filename));

	addCheck(
		"Files stay in allowed folders",
		disallowedFiles.length === 0,
		disallowedFiles.length
			? \`Only game files in \\\`games/\\\` and optional images in \\\`games/img/\\\` are allowed. Found \${disallowedFiles.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ")}.\`
			: "Only submission files changed."
	);

	addCheck(
		"Exactly one game file",
		jsFiles.length === 1,
		jsFiles.length === 0
			? "Add exactly one JavaScript game file in \`games/\`."
			: \`Only one game file is allowed per submission. Found \${jsFiles.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ")}.\`
	);

	const changedNonAdded = pullFiles.filter((file) => file.status !== "added");
	addCheck(
		"Only new files added",
		changedNonAdded.length === 0,
		changedNonAdded.length
			? \`Submissions should add new files only. These files were not added: \${changedNonAdded.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ")}.\`
			: "All submitted files are new."
	);`,
`	const jsFiles = pullFiles.filter((file) => file.filename.startsWith("games/") && file.filename.endsWith(".js"));
	const imageFiles = pullFiles.filter((file) => /\\.(png|jpe?g|webp)$/i.test(file.filename));
	const disallowedFiles = pullFiles.filter((file) => !isAllowedSubmissionFile(file.filename));

	const disallowedNames = disallowedFiles.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	addCheck(
		"Files stay in allowed folders",
		disallowedFiles.length === 0,
		disallowedFiles.length
			? \`Only game files in \\\`games/\\\` and optional images in \\\`games/img/\\\` are allowed. Found \${disallowedNames}.\`
			: "Only submission files changed."
	);

	const jsNames = jsFiles.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	addCheck(
		"Exactly one game file",
		jsFiles.length === 1,
		jsFiles.length === 0
			? "Add exactly one JavaScript game file in \`games/\`."
			: \`Only one game file is allowed per submission. Found \${jsNames}.\`
	);

	const changedNonAdded = pullFiles.filter((file) => file.status !== "added");
	const changedNames = changedNonAdded.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	addCheck(
		"Only new files added",
		changedNonAdded.length === 0,
		changedNonAdded.length
			? \`Submissions should add new files only. These files were not added: \${changedNames}.\`
			: "All submitted files are new."
	);`
);

// 2. Fix Optional image path & Optional image name (nested ternary and literals)
code = code.replace(
`		addCheck(
			"Optional image path",
			badImagePaths.length === 0,
			badImagePaths.length
				? \`Move images into \\\`games/img/\\\`: \${badImagePaths.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ")}.\`
				: imageFiles.length ? "Image files are in \`games/img/\`." : "No image provided; this is OK."
		);

		addCheck(
			"Optional image name",
			mismatchedImages.length === 0,
			mismatchedImages.length
				? \`Image filename must match \\\`\${gameBase}.js\\\`. Found \${mismatchedImages.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ")}.\`
				: imageFiles.length ? "Image filename matches the game file." : "No image provided; gallery thumbnail can be generated/default."
		);`,
`		const badImgNames = badImagePaths.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
		let imgPathDetail = "No image provided; this is OK.";
		if (badImagePaths.length) imgPathDetail = \`Move images into \\\`games/img/\\\`: \${badImgNames}.\`;
		else if (imageFiles.length) imgPathDetail = "Image files are in \`games/img/\`.";
		addCheck("Optional image path", badImagePaths.length === 0, imgPathDetail);

		const mismatchNames = mismatchedImages.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
		let imgNameDetail = "No image provided; gallery thumbnail can be generated/default.";
		if (mismatchedImages.length) imgNameDetail = \`Image filename must match \\\`\${gameBase}.js\\\`. Found \${mismatchNames}.\`;
		else if (imageFiles.length) imgNameDetail = "Image filename matches the game file.";
		addCheck("Optional image name", mismatchedImages.length === 0, imgNameDetail);`
);

// 3. Fix String.raw usages in regexes
code = code.replace(
`function extractBoldField(body, label) {
	const escaped = label.replace(/[.*+?^$\{}()|[\\]\\\\]/g, "\\\\$&");
	const pattern = new RegExp(\`\\\\*\\\\*\${escaped}:?\\\\*\\\\*\\\\s*([\\\\s\\\\S]*?)(?=\\\\n\\\\s*(?:\\\\*\\\\*|##|#)|$)\`, "i");`,
`function extractBoldField(body, label) {
	const escaped = label.replace(/[.*+?^$\{}()|[\\]\\\\]/g, String.raw\`\\$&\`);
	const pattern = new RegExp(String.raw\`\\*\\*\${escaped}:?\\*\\*\\s*([\\s\\S]*?)(?=\\n\\s*(?:\\*\\*|##|#)|$)\`, "i");`
);
code = code.replace(
`	const match = content.match(new RegExp(\`@\${key}:\\\\s*([^\\\\r\\\\n]*)\`));`,
`	const match = content.match(new RegExp(String.raw\`@\${key}:\\s*([^\\r\\n]*)\`));`
);

// 4. Reduce Cognitive Complexity of validatePullRequestBody & fix ternary/literals inside
code = code.replace(
`	const imageHeaderIndex = body.search(/^##\\s+Image/im);
	const codeSection = imageHeaderIndex >= 0 ? body.slice(0, imageHeaderIndex) : body;
	const imageSection = imageHeaderIndex >= 0 ? body.slice(imageHeaderIndex) : "";

	const codeBoxes = getCheckboxes(codeSection);
	const uncheckedCodeBoxes = codeBoxes.filter((box) => !box.checked);
	add(
		"Code checklist",
		codeBoxes.length > 0 && uncheckedCodeBoxes.length === 0,
		codeBoxes.length === 0
			? "Keep the PR checklist and check every required code box."
			: uncheckedCodeBoxes.length
				? \`Check every required code box. Still unchecked: \${uncheckedCodeBoxes.map((box) => \`\\\`\${box.text}\\\`\`).join(", ")}.\`
				: "All required code boxes are checked."
	);

	if (imageProvided) {
		const imageBoxes = getCheckboxes(imageSection);
		const uncheckedImageBoxes = imageBoxes.filter((box) => !box.checked);
		add(
			"Image checklist",
			imageBoxes.length > 0 && uncheckedImageBoxes.length === 0,
			imageBoxes.length === 0
				? "An image was added, so keep and complete the image checklist."
				: uncheckedImageBoxes.length
					? \`Image was added, so check the image checklist boxes. Still unchecked: \${uncheckedImageBoxes.map((box) => \`\\\`\${box.text}\\\`\`).join(", ")}.\`
					: "Image checklist is checked."
		);
	} else {
		add("Image checklist", true, "No image was added, so image checklist is optional.");
	}

	return { checks };
}`,
`	validateChecklists(body, imageProvided, add);

	return { checks };
}

function validateChecklists(body, imageProvided, add) {
	const imageHeaderIndex = body.search(/^##\\s+Image/im);
	const codeSection = imageHeaderIndex >= 0 ? body.slice(0, imageHeaderIndex) : body;
	const imageSection = imageHeaderIndex >= 0 ? body.slice(imageHeaderIndex) : "";

	const codeBoxes = getCheckboxes(codeSection);
	const uncheckedCodeBoxes = codeBoxes.filter((box) => !box.checked);
	const uncheckedCodeNames = uncheckedCodeBoxes.map((box) => \`\\\`\${box.text}\\\`\`).join(", ");
	let codeBoxDetail = "All required code boxes are checked.";
	if (codeBoxes.length === 0) codeBoxDetail = "Keep the PR checklist and check every required code box.";
	else if (uncheckedCodeBoxes.length) codeBoxDetail = \`Check every required code box. Still unchecked: \${uncheckedCodeNames}.\`;
	add(
		"Code checklist",
		codeBoxes.length > 0 && uncheckedCodeBoxes.length === 0,
		codeBoxDetail
	);

	if (imageProvided) {
		const imageBoxes = getCheckboxes(imageSection);
		const uncheckedImageBoxes = imageBoxes.filter((box) => !box.checked);
		const uncheckedImgNames = uncheckedImageBoxes.map((box) => \`\\\`\${box.text}\\\`\`).join(", ");
		let imgBoxDetail = "Image checklist is checked.";
		if (imageBoxes.length === 0) imgBoxDetail = "An image was added, so keep and complete the image checklist.";
		else if (uncheckedImageBoxes.length) imgBoxDetail = \`Image was added, so check the image checklist boxes. Still unchecked: \${uncheckedImgNames}.\`;
		add(
			"Image checklist",
			imageBoxes.length > 0 && uncheckedImageBoxes.length === 0,
			imgBoxDetail
		);
	} else {
		add("Image checklist", true, "No image was added, so image checklist is optional.");
	}
}`
);

// 5. Reduce Cognitive Complexity of validateMetadata
code = code.replace(
`	const validDate = /^\\d{4}-\\d{2}-\\d{2}$/.test(values.addedOn);
	const parsedDate = validDate ? new Date(\`\${values.addedOn}T00:00:00Z\`) : null;
	const now = new Date();
	const tooOld = parsedDate ? Math.abs(now.getTime() - parsedDate.getTime()) > 183 * 86_400_000 : true;
	add(
		"Metadata date",
		validDate && parsedDate && !Number.isNaN(parsedDate.getTime()) && !tooOld,
		validDate && parsedDate && !Number.isNaN(parsedDate.getTime()) && !tooOld
			? "Date looks current."
			: \`Set \\\`@addedOn:\\\` to a recent date in \\\`YYYY-MM-DD\\\` format.\`
	);`,
`	checkMetadataDate(values.addedOn, add);`
);

code += `
function checkMetadataDate(addedOn, add) {
	const validDate = /^\\d{4}-\\d{2}-\\d{2}$/.test(addedOn);
	const parsedDate = validDate ? new Date(\`\${addedOn}T00:00:00Z\`) : null;
	const now = new Date();
	const tooOld = parsedDate ? Math.abs(now.getTime() - parsedDate.getTime()) > 183 * 86_400_000 : true;
	add(
		"Metadata date",
		validDate && parsedDate && !Number.isNaN(parsedDate.getTime()) && !tooOld,
		validDate && parsedDate && !Number.isNaN(parsedDate.getTime()) && !tooOld
			? "Date looks current."
			: \`Set \\\`@addedOn:\\\` to a recent date in \\\`YYYY-MM-DD\\\` format.\`
	);
}
`;

// Extract validateSubmission files part to reduce complexity further
code = code.replace(
`	const jsFiles = pullFiles.filter((file) => file.filename.startsWith("games/") && file.filename.endsWith(".js"));
	const imageFiles = pullFiles.filter((file) => /\\.(png|jpe?g|webp)$/i.test(file.filename));
	const disallowedFiles = pullFiles.filter((file) => !isAllowedSubmissionFile(file.filename));

	const disallowedNames = disallowedFiles.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	addCheck(
		"Files stay in allowed folders",
		disallowedFiles.length === 0,
		disallowedFiles.length
			? \`Only game files in \\\`games/\\\` and optional images in \\\`games/img/\\\` are allowed. Found \${disallowedNames}.\`
			: "Only submission files changed."
	);

	const jsNames = jsFiles.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	addCheck(
		"Exactly one game file",
		jsFiles.length === 1,
		jsFiles.length === 0
			? "Add exactly one JavaScript game file in \`games/\`."
			: \`Only one game file is allowed per submission. Found \${jsNames}.\`
	);

	const changedNonAdded = pullFiles.filter((file) => file.status !== "added");
	const changedNames = changedNonAdded.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	addCheck(
		"Only new files added",
		changedNonAdded.length === 0,
		changedNonAdded.length
			? \`Submissions should add new files only. These files were not added: \${changedNames}.\`
			: "All submitted files are new."
	);`,
`	const { jsFiles, imageFiles } = validateSubmissionFiles(pullFiles, addCheck);`
);

code += `
function validateSubmissionFiles(pullFiles, addCheck) {
	const jsFiles = pullFiles.filter((file) => file.filename.startsWith("games/") && file.filename.endsWith(".js"));
	const imageFiles = pullFiles.filter((file) => /\\.(png|jpe?g|webp)$/i.test(file.filename));
	const disallowedFiles = pullFiles.filter((file) => !isAllowedSubmissionFile(file.filename));

	const disallowedNames = disallowedFiles.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	addCheck(
		"Files stay in allowed folders",
		disallowedFiles.length === 0,
		disallowedFiles.length
			? \`Only game files in \\\`games/\\\` and optional images in \\\`games/img/\\\` are allowed. Found \${disallowedNames}.\`
			: "Only submission files changed."
	);

	const jsNames = jsFiles.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	addCheck(
		"Exactly one game file",
		jsFiles.length === 1,
		jsFiles.length === 0
			? "Add exactly one JavaScript game file in \`games/\`."
			: \`Only one game file is allowed per submission. Found \${jsNames}.\`
	);

	const changedNonAdded = pullFiles.filter((file) => file.status !== "added");
	const changedNames = changedNonAdded.map((file) => \`\\\`\${file.filename}\\\`\`).join(", ");
	addCheck(
		"Only new files added",
		changedNonAdded.length === 0,
		changedNonAdded.length
			? \`Submissions should add new files only. These files were not added: \${changedNames}.\`
			: "All submitted files are new."
	);
	return { jsFiles, imageFiles };
}
`;

fs.writeFileSync('/Users/maaren/sprig/.github/scripts/auto-triage.mjs', code);
