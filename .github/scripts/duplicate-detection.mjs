export const DUPLICATE_LABEL = "Potential Duplicate";
export const DUPLICATE_NOTICE_MARKER = "<!-- sprig-duplicate-notice -->";
export const DUPLICATE_CLOSE_AFTER_DAYS = 3;

export function findDuplicateGroup(currentNumber, siblingNumbers) {
	const others = [...new Set(siblingNumbers)].filter((n) => n !== currentNumber).sort((a, b) => a - b);
	const latestNumber = Math.max(currentNumber, ...others);
	return {
		duplicates: others,
		latestNumber,
		isLatest: latestNumber === currentNumber,
		older: [currentNumber, ...others].filter((n) => n !== latestNumber).sort((a, b) => a - b),
	};
}

export function olderMarker(latestNumber, since) {
	return `<!-- sprig-latest-pr:${latestNumber} since:${since} -->`;
}

export function parseOlderNotice(body) {
	const match = String(body ?? "").match(/<!-- sprig-latest-pr:(\d+) since:(\S+) -->/);
	return match ? { latestNumber: Number(match[1]), since: match[2] } : null;
}

export function buildOlderCheckDetail({ number, latestNumber }) {
	return `You have multiple open submission PRs (newer: #${latestNumber}). Newer PRs usually have your latest updates, but you can keep whichever PR you want (just close the others). If no action is taken, this older PR will be closed automatically in ${DUPLICATE_CLOSE_AFTER_DAYS} days.`;
}

export function buildOlderNotice({ number, latestNumber, since }) {
	return `${DUPLICATE_NOTICE_MARKER}
${olderMarker(latestNumber, since)}
### Multiple open PRs

You have multiple open submission PRs (newer: **#${latestNumber}**).

- Each author should only have one open submission PR at a time.
- You don't need a new PR to update your game: pushing commits (or editing files) in an existing PR updates it automatically.
- Newer PRs usually have your latest updates, but choose whichever PR you want to keep and close the other one(s).
- If no action is taken and both remain open, this older PR will be closed automatically in ${DUPLICATE_CLOSE_AFTER_DAYS} days. If you want to keep this PR instead of #${latestNumber}, close #${latestNumber} (or leave a comment if you need help).`;
}

export function buildLatestWarning({ older }) {
	const list = older.map((n) => `#${n}`).join(", ");
	return `You have older open PRs (${list}) labeled "${DUPLICATE_LABEL}". Newer PRs usually have your latest updates, but choose whichever PR you want to keep and close the other(s). Older inactive duplicates will be closed automatically after ${DUPLICATE_CLOSE_AFTER_DAYS} days.`;
}
