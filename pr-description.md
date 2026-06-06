this pr introduces a fully automated node.js backend to triage, track, and manage game submissions, replacing the old manual google sheets tracking and fragile one-off yaml scripts. everything described here runs automatically on github actions — no human needs to press anything to trigger any of it.

the main focus is the massive overhaul to the ci workflow. here is exactly how the new pipeline works from start to finish:

---

### 1. the core workflow (`auto-triage.mjs`)

the workflow triggers on: `opened`, `synchronize`, `assigned`, `unassigned`, `edited`, `reopened`, `ready_for_review`, `pull_request_review: submitted`, `issue_comment: created`.

when a game submission pr is opened or updated, the `auto-triage` bot immediately kicks in:

- **validation**: it checks the pr body, validates the metadata block (`@title`, `@author`, `@tags`, `@addedOn`, etc.), ensures files are placed correctly in `games/`, checks file size, and runs the python plagiarism checker against the existing game library.
- **instant feedback**: it posts a formatted comment on the pr with:
  - submission info: game name, author, file path, similarity score against the closest existing game.
  - quick action links to **Play in Sprig Editor**, Edit Game File, Play Similar Game, View Raw, and PR Files.
  - expandable `<details>` sections for each check category that passed or failed: "Files & Directories", "PR Description", "Game Metadata Header", and "Code & Assets".
- **state management**: based on check results or human reviews, the bot automatically assigns labels to move the pr through its lifecycle (see below).
- **draft pr handling**: if a pr is opened as a draft, the bot skips triage entirely. it correctly listens for the `ready_for_review` event to kick off triage when the author marks it ready.
- **concurrency**: `auto-triage.yml` has a `concurrency` block that cancels older in-progress triage runs if a new event fires for the same pr, so rapid-fire commits don't produce duplicate bot comments.

*see it in action:* https://github.com/SSoggyTacoMan/sprig/pull/15#issuecomment-4632461597

---

### 2. all submission labels & their meanings (`review-utils.mjs`)

the entire system is state-driven by github labels. all label definitions, colors, and descriptions are centralized in `review-utils.mjs` and automatically created on the repo if they don't exist yet (via `ensureReviewLabels`). here is what each label means and when it gets applied:

- **`Submission`**: added to any pr that modifies a file inside `games/`. this is the core gate — the sync script and stale tracker only look at prs with this label.
- **`Verified`**: automated checks passed. the pr is structurally valid.
- **`Failed`**: one or more automated checks failed (wrong directory, missing metadata, file too large, etc.). the bot's comment will list exactly what failed.
- **`Ready for Playtest`**: checks passed and the game is waiting for a human reviewer to actually download and play it.
- **`Claimed`**: a reviewer assigned themselves to the pr (via the github assignees ui). they are actively testing it. if there is 0 activity for 3 days, the bot fully unassigns them and removes this label so someone else can pick it up.
- **`Needs Author`**: automated checks failed, OR a human reviewer requested changes. the pr author needs to push fixes. has a 14-day auto-close timer.
- **`Ready for Maintainer`**: a reviewer approved the pr. a maintainer now needs to do a final check and merge it. if it sits untouched for 7 days, the bot drops a @-mention reminder to the maintainers listed in `.github/review-roles.json`.
- **`Stale`**: no meaningful activity for a set number of days (7 days in `Needs Author`, 30 days for any open pr with no activity at all).
- **`Plagiarism Risk`**: the similarity checker found high overlap (above threshold) with an existing game in the library.
- **`AI Concern`**: a reviewer flagged the game for potential undisclosed ai usage.
- **`Potential Duplicate`**: the pr author already has another open submission. the bot also drops a comment explaining they can edit their existing pr instead of opening a new one.
- **`Keep Open`**: a manual override label. if any pr has this label, the stale tracker completely skips it and will never auto-close it — useful for known-good PRs that are just waiting on something external.

---

### 3. full state lifecycle

here is the exact path a submission takes through the pipeline from open to close:

1. **pr opened** → bot runs checks → if pass: `Verified` + `Ready for Playtest`. if fail: `Failed` + `Needs Author`.
2. **reviewer assigns self** → `Claimed`.
3. **reviewer requests changes** → `Needs Author`. 14-day clock starts.
4. **author pushes a fix** → bot re-runs all checks → if pass: `Ready for Playtest` again. state is reset, 14-day clock restarts.
5. **reviewer approves** → `Ready for Maintainer`. bot skips this transition if the reviewer is the same person as the pr author (self-review bypass).
6. **author pushes a whitespace/typo fix after approval** → state stays at `Ready for Maintainer`. the bot previously stomped this back to `Ready for Playtest`, now fixed.
7. **maintainer merges** → pr closes. sync script updates the project board to `Merged`.

---

### 4. edge cases & automated tracking (`stale-review-queue.mjs`, `duplicate-submission-labeler.yml`)

cron jobs and secondary workflows handle all the edge cases that the main bot can't cover inline:

- **the 14-day clock**: if a pr is in `Needs Author` (failed checks or changes requested) with no activity:
  - *day 7*: bot posts a stale warning comment with a unique date-stamped marker so it always posts a fresh comment on a new cycle.
  - *day 14*: bot posts a final closing notice and auto-closes the pr.
  - **`Keep Open` escape hatch**: any maintainer can add the `Keep Open` label to permanently exempt a pr from this timer.

- **auto-reopen on author comment**: if the pr is closed (by the 14-day timer or manually) and the original author leaves any comment on it, the bot instantly reopens the pr and bumps it back to `Ready for Playtest`. no maintainer action needed.

- **forgotten maintainer approvals**: if a pr sits in `Ready for Maintainer` for 7 days with no activity, the bot posts a reminder comment that @-mentions the maintainers by name (pulled from `.github/review-roles.json`).

- **abandoned claims**: if a reviewer assigns themselves (`Claimed`) but there is 0 activity on the pr for 3 days, the bot fully unassigns them from the github ui (removing them from the assignees list, not just the label) and removes `Claimed` so someone else can pick it up. the 3-day timer is based on the pr's `updated_at` field so any activity (comments, commits, reviews) resets it.

- **completely untouched submissions**: if any open pr with `Submission` label has had 0 activity for 30 days, the bot flags it with `Stale` to get a reviewer's attention.

- **persistent duplicates** (`duplicate-submission-labeler.yml`): if a user has more than one open submission at once, the newer pr gets flagged with `Potential Duplicate` and the bot drops a helpful comment explaining how to update their existing pr instead of opening a new one. if the user closes the extra pr, the workflow automatically removes the label from their surviving pr.

- **ghost prs on project board**: the sync script fetches the 100 most recently updated prs (including closed/merged) so prs that get merged don't get stuck in their old state on the project board forever.

- **synchronize stomps approval**: when an author pushes a fix commit after a reviewer has approved, the bot previously reset the state back to `Ready for Playtest`. now fixed — `synchronize` events check for an existing valid approval and preserve `Ready for Maintainer` if one is found.

- **self-review bypass**: the review handler checks that the reviewer is not the same person as the pr author before accepting a `CHANGES_REQUESTED` or `APPROVED` review as a state transition.

- **stale marker collision**: both the 7-day stale warning and the auto-close comment now use unique date-stamped html markers (e.g. `<!-- sprig-stale-reminder-2026-06-01 -->`) so a pr that recovers and re-enters the stale state will always get a fresh comment instead of silently doing nothing because the old marker is still in the thread.

- **plagiarism risk auto-close**: `Plagiarism Risk` prs now follow the same 14-day auto-close as all other stale submissions. the previous exception that kept them open forever has been removed.

- **fix commits penalized**: the "only new files" check now only flags files added *outside* of `games/`. modifications to an existing file inside `games/` are allowed, so authors pushing fixes to address requested changes aren't penalized.

- **deleted/unreadable file crash**: fixed a null-pointer crash in `validateSingleGameFile` where trying to check `content.length` on a null file (e.g. a deleted game file) would crash the entire action. now it safely logs a failed check and continues.

- **sync script rate limit**: removed a redundant `GET /issues/{number}` api call per pr in the board sync script by using the labels already present on the pr object from the pulls list. this roughly halves the api call count per sync run.

---

### 5. reviewer roles (`review-roles.json`)

added `.github/review-roles.json` to define which github usernames are maintainers and which are triagers:

```json
{
  "maintainers": ["lachlanjc", "maxwofford", "sampoder"],
  "triagers": []
}
```

this file is read by `stale-review-queue.mjs` to @-mention the right people in the "7-day waiting on maintainer" reminder comment. update this file to add or remove team members — no code changes needed.

---

### 6. github projects integration (`sync-github-project.mjs`)

as a replacement for the manual google sheets tracking, the state logic is hooked up to a native github project board. (this is optional and can be skipped if the team prefers a different setup.)

- a script runs on schedule to calculate the current state of every open submission (based on labels) and pushes the data into custom columns via graphql: Review State, Next Action, Triager, Age Days, Play Link, Raw Link.
- the project board requires two repo secrets to work: `PROJECT_PAT` (a personal access token with `project` scope) and `GITHUB_PROJECT_URL` (the url of the project board to sync to).
- `setup-project.mjs` is included to automatically create all the required custom fields on any new github project board from scratch.

---

### 7. bug fixes

- **astro build fix** (`src/integrations/generate-metadata.ts`): one malformed game file used to crash the entire site build. it now catches errors per-game, logs them, and skips the bad file instead of failing the whole build. also made the space after the colon in metadata headers optional (`@description:text` and `@description: text` both parse correctly now).
- **plagiarism script regex** (`plagiarism_check.py`): fixed regex patterns that were incorrectly matching or failing on certain game files.
- **generate-metadata.js**: updated to use `node:fs` instead of the bare `fs` import.
- **sprig web editor**: frontend ui updates and css tweaks across `editor.tsx`, `editor.astro`, `editor.module.css`, and `navbar-editor.tsx`.

---

### 8. what maintainers need to do after merging

1. the automated workflows will start running immediately on the next event (pr opened, cron trigger, etc.). no manual bootstrapping needed.
2. **labels**: `ensureReviewLabels` will automatically create all required labels on `hackclub/sprig` the first time a workflow runs.
3. **project board (optional)**: if you want the github projects sync, add `PROJECT_PAT` (project-scoped personal access token) and `GITHUB_PROJECT_URL` as repository secrets, then run `node setup-project.mjs` once to scaffold the board columns.
4. **review roles**: update `.github/review-roles.json` to reflect the actual maintainer and triager github usernames.
