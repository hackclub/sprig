import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import esprima from 'esprima';
import { fileURLToPath } from 'url';

const tokenizeCode = (code) => {
	try {
		const tokens = esprima.tokenize(code);
		return new Set(tokens.map(token => token.value));
	} catch (error) {
		console.error('Error tokenizing code:', error);
		return new Set();
	}
};

const calculateSimilarity = (tokens1, tokens2) => {
	const totalTokens = new Set([...tokens1, ...tokens2]);
	const commonTokens = new Set([...tokens1].filter(x => tokens2.has(x)));

	if (totalTokens.size === 0) return 0;
	const similarity = (commonTokens.size / totalTokens.size) * 100;
	return similarity;
};

const checkForPlagiarism = async (files, galleryDirPath, overlapThreshold = 0) => {
	let similarityResults = [];

	for (const file of files) {
		try {
			const originalCodeContent = fs.readFileSync(file, 'utf8');
			const originalTokens = tokenizeCode(originalCodeContent);

			const galleryFiles = fs.readdirSync(galleryDirPath);
			for (const galleryFile of galleryFiles) {
				const fullGalleryFilePath = path.join(galleryDirPath, galleryFile);
				if (path.extname(galleryFile) === '.js' && fullGalleryFilePath !== file) {
					const galleryCodeContent = fs.readFileSync(fullGalleryFilePath, 'utf8');
					const galleryTokens = tokenizeCode(galleryCodeContent);

					const similarity = calculateSimilarity(originalTokens, galleryTokens);
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