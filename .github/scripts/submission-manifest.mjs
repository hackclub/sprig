const GAME_FILE_RE = /^games\/[A-Za-z0-9_-]+\.js$/;
const IMAGE_FILE_RE = /^games\/img\/[A-Za-z0-9_-]+\.png$/i;

// One data-only source of truth for submission file validation.
export function buildSubmissionManifest(pullFiles) {
	const files = pullFiles.map((file) => ({
		filename: file.filename,
		previousFilename: file.previous_filename ?? null,
		status: file.status,
		isGame: GAME_FILE_RE.test(file.filename),
		isImage: IMAGE_FILE_RE.test(file.filename),
		isAllowed: GAME_FILE_RE.test(file.filename) || IMAGE_FILE_RE.test(file.filename),
	}));

	return {
		files,
		gameFiles: files.filter((file) => file.isGame),
		imageFiles: files.filter((file) => file.isImage),
		disallowedFiles: files.filter((file) => !file.isAllowed),
		changedNonAddedFiles: files.filter((file) => file.status !== "added" && !file.filename.startsWith("games/")),
		uppercaseGames: files.filter((file) => file.filename.toLowerCase().startsWith("games/") && !file.filename.startsWith("games/")),
		renamedFiles: files.filter((file) => file.status === "renamed" || file.previousFilename),
	};
}
