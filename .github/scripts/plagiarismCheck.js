import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const preprocessCode = (code) => {
    code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    code = code.replace(/map`[\s\S]*?`/g, '');
    code = code.replace(/bitmap`[\s\S]*?`/g, '');
    return code;
};

const calculateSimilarity = (code1, code2) => {
    const words1 = new Set(code1.split(' '));
    const words2 = new Set(code2.split(' '));
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    return (intersection.size / union.size) * 100;
};

const checkForPlagiarism = (files, galleryDirPath, overlapThreshold = 30) => {
    let similarityResults = [];

    files.forEach(file => {
        const originalCode = preprocessCode(fs.readFileSync(file, 'utf8'));
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
    });

    similarityResults.sort((a, b) => b.similarity - a.similarity);

    let output = 'Here are your results for plagiarism:\n';

    similarityResults.forEach(({ similarity, file1, file2 }) => {
        output += `Similarity: ${similarity.toFixed(2)}% between ${file1} and ${file2}\n`;
    });

    console.log(output);
    fs.writeFileSync('plagiarism-results.txt', output);

    if(similarityResults.length > 0) {
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