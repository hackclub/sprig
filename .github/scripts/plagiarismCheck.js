import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import levenshtein from 'fast-levenshtein';
import { fileURLToPath } from 'url';

const preprocessCode = async (code) => {
	code = await prettier.format(code, { parser: 'babel' });
	return code.split('\n');
};

const calculateSimilarity = (codeLines1, codeLines2) => {
	let totalDistance = 0;
	let totalLength = 0;

	codeLines1.forEach((line1, index) => {
		const line2 = codeLines2[index] || '';
		totalDistance += levenshtein.get(line1.trim(), line2.trim());
		totalLength += Math.max(line1.trim().length, line2.trim().length);
	});

	for (let i = codeLines1.length; i < codeLines2.length; i++) {
		totalDistance += codeLines2[i].trim().length;
		totalLength += codeLines2[i].trim().length;
	}

	const similarity = (1 - totalDistance / totalLength) * 100;
	return similarity;
};

const checkForPlagiarism = async (files, galleryDirPath, overlapThreshold = 0) => {
	let similarityResults = [];

	for (const file of files) {
		try {
			const originalCodeContent = fs.readFileSync(file, 'utf8');
			const originalCodeLines = await preprocessCode(originalCodeContent);

			const galleryFiles = fs.readdirSync(galleryDirPath);
			for (const galleryFile of galleryFiles) {
				const fullGalleryFilePath = path.join(galleryDirPath, galleryFile);
				if (path.extname(galleryFile) === '.js' && fullGalleryFilePath !== file) {
					const galleryCodeContent = fs.readFileSync(fullGalleryFilePath, 'utf8');
					const galleryCodeLines = await preprocessCode(galleryCodeContent);

					const similarity = calculateSimilarity(originalCodeLines, galleryCodeLines);
					if (similarity >= overlapThreshold) {
						similarityResults.push({ similarity, file1: file, file2: galleryFile });
					}
				}
			}
		} catch (readError) {
			console.error(`Error processing file ${file}:`, readError);
		}
	}

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