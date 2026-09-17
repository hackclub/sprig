const GAME_FILE_RE = /^games\/[A-Za-z0-9_-]+\.js$/;
const GAME_FILE_LOOSE_RE = /^games\/[^/]+\.js$/; // in games/, ends in .js, but may have invalid chars
const IMAGE_FILE_RE = /^games\/img\/[A-Za-z0-9_-]+\.png$/i;

export function buildSubmissionManifest(pullFiles) {
	const files = pullFiles.map((file) => ({
		filename: file.filename,
		previousFilename: file.previous_filename ?? null,
		status: file.status,
		isGame: GAME_FILE_RE.test(file.filename),
		isGameLoose: GAME_FILE_LOOSE_RE.test(file.filename), // right place, may have bad chars
		isImage: IMAGE_FILE_RE.test(file.filename),
		isAllowed: GAME_FILE_RE.test(file.filename) || IMAGE_FILE_RE.test(file.filename),
	}));

	return {
		files,
		gameFiles: files.filter((file) => file.isGame),
		gameFilesLoose: files.filter((file) => file.isGameLoose), // includes bad-char filenames
		imageFiles: files.filter((file) => file.isImage),
		disallowedFiles: files.filter((file) => !file.isAllowed),
		changedNonAddedFiles: files.filter((file) => file.status !== "added" && !file.filename.startsWith("games/")),
		uppercaseGames: files.filter((file) => file.filename.toLowerCase().startsWith("games/") && !file.filename.startsWith("games/")),
		renamedFiles: files.filter((file) => file.status === "renamed" || file.previousFilename),
	};
}
