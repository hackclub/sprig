# Sprig App Review Automation

This workflow keeps GitHub as the source of truth and keeps Google Sheets as the team dashboard.

## Reviewer Flow

1. Open the `Ready for Playtest` Sheet tab or this GitHub search:
   `is:pr is:open label:"Ready for Playtest" -label:"Plagiarism Risk" sort:created-asc`
2. Comment `/claim` on the PR.
3. Use the bot's `Play in Sprig Editor` link.
4. Play for at least one minute.
5. Leave a GitHub review:
   - Request changes if the author needs to fix something.
   - Approve if it is ready.
6. Add a note when useful:
   `/triage-note controls are confusing on mobile`
7. If approved, comment `/ready-maintainer`.
8. If changes are needed, comment `/needs-author <reason>`.

## Reviewer Commands

| Command | Result |
| --- | --- |
| `/claim` | Assigns the commenter and adds `Claimed`. |
| `/unclaim` | Removes the commenter from assignees and removes `Claimed` if nobody is assigned. |
| `/triage-note <text>` | Saves reviewer context for the Sheet. |
| `/needs-author <reason>` | Moves the PR to `Needs Author` and marks it triaged. |
| `/ready-maintainer <note>` | Moves the PR to `Ready for Maintainer` and marks it triaged. |
| `/ai-concern <reason>` | Adds `AI Concern` and moves the PR to `Needs Author`. |
| `/plagiarism-risk <reason>` | Adds `Plagiarism Risk` for lead review. |

## Labels

Human labels are used so the queue is readable in GitHub.

| Label | Meaning |
| --- | --- |
| `Submission` | Game submission automation should process. |
| `Verified` | Automated checks passed. |
| `Failed` | Automated checks failed. |
| `Ready for Playtest` | Reviewer can playtest. |
| `Needs Author` | Author needs to change something. |
| `Triaged` | Human review happened at least once. |
| `Ready for Maintainer` | Reviewer thinks it can merge. |
| `Plagiarism Risk` | Similarity or reviewer concern needs lead review. |
| `AI Concern` | Author should explain AI usage. |
| `Potential Duplicate` | Author has multiple open submissions. |
| `Keep Open` | Stale automation should not close this PR. |
| `Stale` | PR needs queue cleanup. |
| `Claimed` | Reviewer is actively handling this PR. |

Only one main queue label should be active at a time:

- `Ready for Playtest`
- `Needs Author`
- `Ready for Maintainer`
- `Stale`

`Failed` is a validation flag, not a queue state. Failed submissions should also have `Needs Author`.

## Automated Checks

The auto-triage workflow checks:

- PR body author field
- PR body about blurb
- PR body gameplay description
- required checklist boxes
- exactly one new `games/*.js` file
- no changed files outside the allowed submission paths
- optional image path under `games/img/`
- optional image basename matching the game file
- filename using only letters, numbers, `-`, and `_`
- metadata fields: `@title`, `@author`, `@description`, `@tags`, `@addedOn`
- parseable non-empty tag array
- recent `YYYY-MM-DD` date
- unique game title
- no obvious browser-only APIs
- rough similarity against existing games

Images are optional. If no image is added, the check passes and the comment says the gallery can use a generated/default thumbnail.

## Google Sheets Setup

Create a Google Cloud service account and enable the Google Sheets API.

1. Create a service account.
2. Create a JSON key.
3. Share the review Sheet with the service account email as an editor.
4. Add these repository secrets:
   - `GOOGLE_SERVICE_ACCOUNT_JSON`
   - `GOOGLE_SHEET_ID`

The sync workflow creates these tabs:

- `All`
- `Ready for Playtest`
- `Claimed`
- `Needs Author`
- `Ready for Maintainer`
- `Stale`
- `Merged`
- `Metrics`

The `All` tab is the database. Other tabs are filtered views.

Manual notes should go in `Internal Note`. Bot-owned columns may be overwritten on every sync.

## Stale Rules

- `Needs Author` or `Failed` for 7 days: mark `Stale` and remind the author.
- `Needs Author` or `Failed` for 14 days: close unless `Keep Open` or `Plagiarism Risk`.
- `Ready for Maintainer` for 7 days: remind maintainers.
- `Claimed` for 3 days without movement: unclaim.

## Review Link

Bot comments include:

`/editor?review=true&raw=<raw-github-url>&pr=<number>&repo=<owner/repo>`

The editor fetches the raw GitHub file, loads it without login, shows review controls, and avoids saving review code into the reviewer's local game.
