const { exec } = require('child_process');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

function log(message) {
	const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	console.log(`[${timestamp}] ${message}`);
}

function parseArguments() {
	const args = process.argv.slice(2);

	const suspectFile = args[0];
	const gamesFolder = 'games';
	const resultFolder = '.github/moss_results';
	const splitFolders = ['.github/split1','.github/split2'];

	return { suspectFile, gamesFolder, resultFolder, splitFolders };
}

async function splitFilesAsync(gamesFolder, splitFolders) {
	log(`Splitting files into ${splitFolders.length} groups...`);

	const jsFiles = await fsPromises.readdir(gamesFolder);
	const jsFilesFiltered = jsFiles.filter(file => file.endsWith('.js'));
	const filesPerGroup = Math.ceil(jsFilesFiltered.length / splitFolders.length);

	await Promise.all(splitFolders.map(folder => fsPromises.mkdir(folder, { recursive: true })));

	const promises = [];

	splitFolders.forEach((folder, index) => {
		const filesForThisGroup = jsFilesFiltered.slice(index * filesPerGroup, (index + 1) * filesPerGroup);
		promises.push(...filesForThisGroup.map(file => {
			const sourceFile = path.join(gamesFolder, file);
			const destinationFile = path.join(folder, file);
			return fsPromises.copyFile(sourceFile, destinationFile);
		}));
	});

	await Promise.all(promises);

	log(`Files successfully split into ${splitFolders.length} groups.`);
}

function submitToMoss(suspectFile, folder) {
	return new Promise((resolve, reject) => {
		log(`Submitting files to MOSS for ${folder}...`);

		const mossCommand = `perl moss.pl -l javascript ${suspectFile} ${folder}/*.js`;

		exec(mossCommand, (error, stdout, stderr) => {
			if (error) {
				log(`Error: ${error.message}`);
				reject(`Failed to submit files to MOSS: ${error.message}`);
				return;
			}
			if (stderr) {
				log(`Perl STDERR: ${stderr}`);
			}

			const urlMatch = stdout.match(/http:\/\/moss\.stanford\.edu\/results\/\S+/);
			if (urlMatch) {
				const mossUrl = urlMatch[0];
				log(`MOSS Report URL: ${mossUrl}`);
				resolve(mossUrl);
			} else {
				log(`No valid MOSS URL found in output: ${stdout}`);
				reject('No valid MOSS URL found');
			}
		});
	});
}

async function downloadMossReport(reportUrl, outputFolder, fileName) {
	log(`Downloading MOSS report from ${reportUrl}...`);

	try {
		const response = await axios({
			url: reportUrl,
			method: 'GET',
			responseType: 'stream'
		});

		if (!fs.existsSync(outputFolder)) {
			log(`Creating folder: ${outputFolder}`);
			fs.mkdirSync(outputFolder, { recursive: true });
		}

		const filePath = path.join(outputFolder, fileName);
		const writer = fs.createWriteStream(filePath);

		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on('finish', () => {
				log(`MOSS report saved to ${filePath}`);
				resolve();
			});
			writer.on('error', (err) => {
				log(`Error writing file: ${err}`);
				reject(`Error writing file: ${err.message}`);
			});
		});

	} catch (error) {
		log(`Failed to download report: ${error.message}`);
	}
}

function extractMossReportData(reportPath, suspectFile) {
	const htmlContent = fs.readFileSync(reportPath, 'utf-8');
	const $ = cheerio.load(htmlContent);

	const matches = [];

	$('tr').each((index, element) => {
		const file1 = $(element).find('td').eq(0).text().trim();
		const file2 = $(element).find('td').eq(1).text().trim();
		const linesMatched = $(element).find('td').eq(2).text().trim();

		if (file1.includes(suspectFile) || file2.includes(suspectFile)) {
			const matchData = {
				file1,
				file2,
				linesMatched,
			};
			matches.push(matchData);
		}
	});

	return matches;
}

function countFileLines(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8');
	return content.split('\n').length;
}

function calculatePlagiarismPercentage(matchedLines, totalLines) {
	return ((matchedLines / totalLines) * 100).toFixed(2);
}

async function writeToMarkdown(filePath, lines) {
	const content = lines.join('\n');
	await fsPromises.writeFile(filePath, content);
	log(`Plagiarism report written to ${filePath}`);
}

function processReports(resultFolder, suspectFile) {
	const reportFile1 = path.join(resultFolder, 'report_split1.html');
	const reportFile2 = path.join(resultFolder, 'report_split2.html');

	const reportFiles = [reportFile1, reportFile2];

	let highestPercentage = 0;
	let highestPercentageFile = '';
	let markdownLines = ["# Plagiarism Report"];
	reportFiles.forEach((reportFile, index) => {
		if (fs.existsSync(reportFile)) {
			const reportMatches = extractMossReportData(reportFile, suspectFile);
			reportMatches.forEach(match => {
				const matchedLines = parseInt(match.linesMatched);
				const file2Path = match.file2.match(/\S+\.js/)[0];
				const file2FullPath = path.join(__dirname, file2Path);

				const file2Lines = countFileLines(file2FullPath);

				const file2Percentage = calculatePlagiarismPercentage(matchedLines, file2Lines);

				log(`Plagiarism: ${file2Percentage}% of ${file2Path}`);

				markdownLines.push(`- **${file2Path}**: ${file2Percentage}% plagiarism`);

				if (file2Percentage > highestPercentage) {
					highestPercentage = file2Percentage;
					highestPercentageFile = file2Path;
				}
			});
		} else {
			log(`Warning: Report file ${reportFile} does not exist.`);
		}
	});

	markdownLines.push(`\n## The highest plagiarism is ${highestPercentage}% from ${highestPercentageFile}\n`);

	writeToMarkdown(path.join(resultFolder, 'plagiarism-report.md'), markdownLines);
}

async function main() {
	const { suspectFile, gamesFolder, resultFolder, splitFolders } = parseArguments();

	console.time('File Splitting');

	await splitFilesAsync(gamesFolder, splitFolders);

	console.timeEnd('File Splitting');

	try {
		log(`Submitting files to MOSS concurrently for ${splitFolders.length} splits...`);

		console.time('MOSS Submission');

		const submissionPromises = splitFolders.map((splitFolder, index) =>
			submitToMoss(suspectFile, splitFolder)
		);

		const reportUrls = await Promise.all(submissionPromises);

		console.timeEnd('MOSS Submission');

		log(`Downloading MOSS reports concurrently for ${splitFolders.length} splits...`);

		const downloadPromises = reportUrls.map((reportUrl, index) => {
			if (reportUrl) {
				return downloadMossReport(reportUrl, resultFolder, `report_split${index + 1}.html`);
			}
		});

		console.time('MOSS Report Download');

		await Promise.all(downloadPromises);

		console.timeEnd('MOSS Report Download');

		log('MOSS submission and download completed for all splits.');

		processReports(resultFolder, suspectFile);

	} catch (error) {
		log(`MOSS submission failed: ${error}`);
	}
}

main();