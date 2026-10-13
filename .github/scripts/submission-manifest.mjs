const GAME_FILE_RE = /^games\/[A-Za-z0-9_-]+\.js$/;
const GAME_FILE_LOOSE_RE = /^games\/[^/]+\.js$/;
const IMAGE_FILE_RE = /^games\/img\/[A-Za-z0-9_-]+\.png$/i;
const IMAGE_FILE_LOOSE_RE = /^games\/img\/[^/]+$/;

export function buildSubmissionManifest(pullFiles) {
	const files = pullFiles.map((file) => ({
		filename: file.filename,
		previousFilename: file.previous_filename ?? null,
		status: file.status,
		isGame: GAME_FILE_RE.test(file.filename),
		isGameLoose: GAME_FILE_LOOSE_RE.test(file.filename),
		isImage: IMAGE_FILE_RE.test(file.filename),
		isImageLoose: IMAGE_FILE_LOOSE_RE.test(file.filename),
		isAllowed: GAME_FILE_LOOSE_RE.test(file.filename) || IMAGE_FILE_LOOSE_RE.test(file.filename),
	}));

	return {
		files,
		gameFiles: files.filter((file) => file.isGame),
		gameFilesLoose: files.filter((file) => file.isGameLoose),
		imageFiles: files.filter((file) => file.isImage),
		imageFilesLoose: files.filter((file) => file.isImageLoose),
		disallowedFiles: files.filter((file) => !file.isAllowed),
		changedNonAddedFiles: files.filter((file) => file.status !== "added" && !file.filename.startsWith("games/")),
		uppercaseGames: files.filter((file) => file.filename.toLowerCase().startsWith("games/") && !file.filename.startsWith("games/")),
		renamedFiles: files.filter((file) => file.status === "renamed" || file.previousFilename),
	};
}

export function getImageCountCheck(imageFiles) {
	const ok = imageFiles.length <= 1;
	const imgNames = imageFiles.map((file) => `\`${file.filename}\``).join(", ");
	const detail = ok
		? imageFiles.length === 1
			? "Exactly one image file provided."
			: "No image provided; this is OK."
		: `Only one image is allowed per game (used as the gallery thumbnail). Found ${imageFiles.length} images: ${imgNames}. Please delete the extra image(s).`;
	return { name: "At most one image file", ok, detail };
}

export function validateImageFiles({ imageFiles, gameBase }) {
	const checks = [];
	const badImagePaths = imageFiles.filter((file) => !file.filename.startsWith("games/img/"));
	const badImgNames = badImagePaths.map((file) => `\`${file.filename}\``).join(", ");
	let imgPathDetail = "No image provided; this is OK.";
	if (badImagePaths.length) imgPathDetail = `Move images into \`games/img/\`: ${badImgNames}.`;
	else if (imageFiles.length) imgPathDetail = "Image files are in `games/img/`.";
	checks.push({ name: "Optional image path", ok: badImagePaths.length === 0, detail: imgPathDetail });

	let imgNameOk = true;
	let imgNameDetail = "No image provided; gallery thumbnail can be generated/default.";

	if (imageFiles.length > 0) {
		if (!gameBase) {
			imgNameOk = false;
			imgNameDetail = "Add exactly one game file in `games/` so the image filename can match it.";
		} else if (!/^[a-zA-Z0-9_-]+$/.test(gameBase)) {
			imgNameOk = false;
			const suggestedBase = gameBase.trim().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "") || "game";
			imgNameDetail = `Both your game file and image filename must match and use only letters, numbers, '-', and '_'. For example, rename to \`games/${suggestedBase}.js\` and \`games/img/${suggestedBase}.png\`.`;
		} else {
			const expectedImage = `games/img/${gameBase}.png`;
			const mismatchedImages = imageFiles.filter((file) => file.filename !== expectedImage);
			if (mismatchedImages.length > 0) {
				imgNameOk = false;
				const mismatchNames = mismatchedImages.map((file) => `\`${file.filename}\``).join(", ");
				imgNameDetail = `Image must be named \`${expectedImage}\` to match \`games/${gameBase}.js\`. Found ${mismatchNames}.`;
			} else {
				imgNameDetail = "Image filename matches the game file.";
			}
		}
	}

	checks.push({ name: "Optional image name", ok: imgNameOk, detail: imgNameDetail });
	return checks;
}
