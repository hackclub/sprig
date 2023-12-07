import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import diff from 'fast-diff';
import { fileURLToPath } from 'url';

const preprocessCode = async (code) => {
	console.log("Type of code before any operation:", typeof code);

	if (typeof code !== 'string') {
		console.error("Code is not a string. Skipping preprocessing.");
		return '';
	}

	console.log("Code content before Prettier formatting:", code);

	try {
		code = await prettier.format(code, { parser: "babel" });
	} catch (error) {
		console.error("Error formatting code with Prettier:", error);
		return code;
	}

	console.log("Code content after Prettier formatting:", code);

	try {
		code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
		code = code.replace(/map`[\s\S]*?`/g, '');
		code = code.replace(/bitmap`[\s\S]*?`/g, '');
	} catch (replaceError) {
		console.error("Error in replace operations:", replaceError);
		return code;
	}

	return code;
};

const calculateSimilarity = (code1, code2) => {
	const diffs = diff(code1, code2);
	const commonChars = diffs
		.filter(part => part[0] === 0)
		.reduce((sum, part) => sum + part[1].length, 0);

	const totalChars = Math.max(code1.length, code2.length);
	return (commonChars / totalChars) * 100;
};

const checkForPlagiarism = (files, galleryDirPath, overlapThreshold = 50) => {
	let similarityResults = [];

	files.forEach(file => {
		try {

			const originalCodeContent = fs.readFileSync(file, 'utf8');
			const originalCode = preprocessCode(originalCodeContent.toString());
			fs.readdirSync(galleryDirPath).forEach(galleryFile => {
				const fullGalleryFilePath = path.join(galleryDirPath, galleryFile);
				if (path.extname(galleryFile) === '.js' && fullGalleryFilePath !== file) {
					const galleryCode = preprocessCode(fs.readFileSync(fullGalleryFilePath, 'utf8'));
					const similarity = calculateSimilarity(originalCode, galleryCode);
					if (similarity >= overlapThreshold) {
						similarityResults.push({ similarity, file1: file, file2: galleryFile });
					}
				}
			});
		} catch (readError) {
			console.error(`Error processing file ${file}:`, readError);
		}
	});

	similarityResults.sort((a, b) => b.similarity - a.similarity);

	let output = 'Here are your results for plagiarism:\n';

	similarityResults.forEach(({ similarity, file1, file2 }) => {
		output += `Similarity: ${similarity.toFixed(2)}% between ${file1} and ${file2}\n`;
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