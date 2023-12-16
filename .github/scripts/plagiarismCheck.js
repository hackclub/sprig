import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import diff from 'fast-diff'
import { fileURLToPath } from 'url';

const preprocessCode = async (code) => {

	code = prettier.format(code, { parser: 'babel' });
	// ignore filter for now!
	return code.split('\n');;
};

const calculateSimilarity = (codeLines1, codeLines2) => {
	let matchingLines = 0;

	codeLines1.forEach((line1, index) => {
		if (codeLines2.length > index && line1.trim() === codeLines2[index].trim()) {
			matchingLines++;
		}
	});

	const totalLines = codeLines1.length;
	const similarity = (matchingLines / totalLines) * 100;
	return similarity;
};

const checkForPlagiarism = async (files, galleryDirPath, overlapThreshold = 10) => {
	let similarityResults = [];

	for (const file of files) {
		try {
			const originalCodeContent = fs.readFileSync(file, 'utf8');
			const originalCodeLines = await preprocessCode(originalCodeContent.toString());

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