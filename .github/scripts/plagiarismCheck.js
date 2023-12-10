import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import diff from 'fast-diff';
import { fileURLToPath } from 'url';

const preprocessCode = async (code, isOriginal = false) => {
	console.log("Type of code before any operation:", typeof code);

	if (typeof code !== 'string') {
		console.error("Code is not a string. Skipping preprocessing.");
		return '';
	}

	try {
		code = await prettier.format(code, { parser: "babel" });
	} catch (error) {
		console.error("Error formatting code with Prettier:", error);
		return code;
	}

	if (isOriginal) {
		try {
			code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
			code = code.replace(/map`[\s\S]*?`/g, '');
			code = code.replace(/bitmap`[\s\S]*?`/g, '');
		} catch (replaceError) {
			console.error("Error in replace operations:", replaceError);
			return code;
		}
	}

	return code;
};

const calculateSimilarity = (code1, code2) => {
	const normalizeCode = (code) => code.replace(/\s+/g, ' ').trim();

	code1 = normalizeCode(code1);
	code2 = normalizeCode(code2);

	const diffs = diff(code1, code2);
	let commonChars = 0;
	let totalChars = 0;
	let detailedDiff = [];

	diffs.forEach(([operation, text], index) => {
		totalChars += text.length;
		if (operation === 0) {
			commonChars += text.length;
		} else {
			let type = operation === -1 ? "removed" : "added";
			detailedDiff.push({ index, type, text });
		}
	});

	const similarity = (commonChars / totalChars) * 100;
	return { similarity, detailedDiff };
};

const checkForPlagiarism = async (files, galleryDirPath, overlapThreshold = 10) => {
	let similarityResults = [];

	for (const file of files) {
		try {
			const originalCodeContent = fs.readFileSync(file, 'utf8');
			const originalCode = await preprocessCode(originalCodeContent.toString(), true);

			const galleryFiles = fs.readdirSync(galleryDirPath);
			for (const galleryFile of galleryFiles) {
				const fullGalleryFilePath = path.join(galleryDirPath, galleryFile);
				if (path.extname(galleryFile) === '.js' && fullGalleryFilePath !== file) {
					const galleryCodeContent = fs.readFileSync(fullGalleryFilePath, 'utf8');
					const galleryCode = await preprocessCode(galleryCodeContent);

					const { similarity, detailedDiff } = calculateSimilarity(originalCode, galleryCode);
					if (similarity >= overlapThreshold) {
						similarityResults.push({ similarity, detailedDiff, file1: file, file2: galleryFile });
					}
				}
			}
		} catch (readError) {
			console.error(`Error processing file ${file}:`, readError);
		}
	}

	similarityResults.sort((a, b) => b.similarity - a.similarity);

	let output = 'Here are your results for plagiarism:\n';

	similarityResults.forEach(({ similarity, detailedDiff, file1, file2 }) => {
		output += `Similarity: ${similarity.toFixed(2)}% between ${file1} and ${file2}\n`;
		detailedDiff.forEach(({ index, type, text }) => {
			output += `Diff #${index + 1}: ${type}, Text: "${text}"\n`;
		});
		output += '\n';
	});

	console.log(output);
	fs.writeFileSync('plagiarism-results.txt', output);

	if (similarityResults.length > 0) {
		process.exit(1);
	}
};

const __filename = fileURLToPath(import.meta.url);
const isDirectRun = process.argv[1] === __filename;

if (isDirectRun) {
	const galleryDirPath = process.argv[process.argv.length - 1];
	const files = process.argv.slice(2, -1);
	checkForPlagiarism(files, galleryDirPath);
}

export { checkForPlagiarism };