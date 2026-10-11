export const DUPLICATE_LABEL = "Multiple Submissions";
export const LEGACY_DUPLICATE_LABEL = "Potential Duplicate";
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
	return `You have multiple open submission PRs (newer: #${latestNumber}). Each author may only have one open submission. If this is the same game, keep the PR with your best version and close the other. If these are different games, keep the one you want reviewed first and close the other. If no action is taken, this older PR will close automatically in ${DUPLICATE_CLOSE_AFTER_DAYS} days.`;
}

export function buildOlderNotice({ number, latestNumber, since }) {
	return `${DUPLICATE_NOTICE_MARKER}
${olderMarker(latestNumber, since)}
### Multiple open PRs

You have multiple open submission PRs (newer: **#${latestNumber}**).

- You may only have one open submission PR at a time.
- If both PRs are for the same game: you do not need a new PR to update your game. Pushing commits or editing files in your existing PR updates it automatically. Usually, your newer PR (**#${latestNumber}**) contains your latest changes, but please check which PR has your best version, keep that one, and close the other.
- If these are different games: you still must choose only one game to submit at a time. Pick which game you want reviewed first, keep that PR open, and close the other. You can submit your next game after this one is merged or closed.
- If no action is taken and both remain open, this older PR will close automatically in ${DUPLICATE_CLOSE_AFTER_DAYS} days. If you prefer to keep this older PR instead, close #${latestNumber}.`;
}

export function buildLatestWarning({ older }) {
	const list = older.map((n) => `#${n}`).join(", ");
	return `You have older open PRs (${list}) labeled "${DUPLICATE_LABEL}". Each author may only submit one game at a time. If these are for the same game, check which PR has your best version, keep that one, and close the others. If these are different games, keep only the game you want reviewed first and close the others. Older inactive duplicates will close automatically after ${DUPLICATE_CLOSE_AFTER_DAYS} days.`;
}
