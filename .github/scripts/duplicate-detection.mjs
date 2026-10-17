export const DUPLICATE_LABEL = "Multiple Submissions";
// ponytail: temporary alias for legacy "Potential Duplicate" label on pre-existing PRs; remove once all PRs opened before October 2026 are closed
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
	return `You have multiple open submission PRs (newer: #${latestNumber}). To keep reviews fair and fast, each author can only have one open submission at a time. If this is the same game, please keep the PR with your best version and close the other. If these are different games, choose the one you would like reviewed first and close the other. If no action is taken, this older PR will close automatically in ${DUPLICATE_CLOSE_AFTER_DAYS} days.`;
}

export function buildOlderNotice({ number, latestNumber, since }) {
	return `${DUPLICATE_NOTICE_MARKER}
${olderMarker(latestNumber, since)}
### Multiple open PRs

Thanks for submitting! We noticed you have multiple open submission PRs (newer: **#${latestNumber}**).

To keep reviews fair and fast for everyone, authors can only have one submission PR open at a time:

- **Same game?** You do not need to open a new PR to update your game! Pushing commits or editing files in your existing PR updates it automatically. Usually your newer PR (**#${latestNumber}**) has your latest changes, but please check which PR has your best version, keep that one, and close the other.
- **Different games?** That is awesome, but our review team can only review one game per author at a time. Please choose which game you would like reviewed first, keep that PR open, and close the other. You can submit your next game once this one is merged!
- **Next steps:** If no action is taken, this older PR will close automatically in ${DUPLICATE_CLOSE_AFTER_DAYS} days so your newest PR can move forward. If you prefer to keep this older PR instead, please close #${latestNumber}. If you need any help, feel free to ask in #sprig on Slack (with your PR number) or tag @LucasHT22 here!`;
}

export function buildLatestWarning({ older }) {
	const list = older.map((n) => `#${n}`).join(", ");
	return `You have older open PRs (${list}) labeled "${DUPLICATE_LABEL}". To keep review times fast for everyone, please keep only one game submission open at a time. If these are for the same game, check which PR has your best version, keep that one, and close the others. If these are different games, please keep only the game you want reviewed first and close the others (you can submit your next game once this one merges). Older inactive duplicates will close automatically after ${DUPLICATE_CLOSE_AFTER_DAYS} days.`;
}
