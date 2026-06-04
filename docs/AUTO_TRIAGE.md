# Sprig Auto Triage Workflow

The Auto Triage workflow (`.github/workflows/auto-triage.yml`) is an automated system designed to validate and review game submissions on the Sprig repository. It runs automatically when Pull Requests are opened or synchronized.

## Core Features

1. **Fully Automated Triggering**  
   The workflow listens to the `pull_request_target` event (`opened` and `synchronize`). It no longer requires a maintainer to manually apply a `submission` label to run.

2. **Smart Skipping for Non-Game PRs**  
   To prevent noise on PRs that modify the engine, site layout, or documentation, the bot checks if any files in the `games/` directory were modified. If no `games/` files are touched, the script silently exits without posting comments or applying labels.

3. **Plagiarism & Similarity Checking**  
   The script compares the submitted game's code against all existing games in the `games/` folder by extracting logic chunks (ignoring whitespace and variable names). If the similarity score is 50% or higher, the PR is flagged with the `Plagiarism Risk` label.

4. **Malware Prevention**  
   Sprig games must be self-contained. The workflow scans the javascript file for potentially malicious or unauthorized browser APIs:
   - `document.`
   - `window.`
   - `alert(`
   - `fetch(`
   
   If any are found, the submission fails automatically.

## Edge Cases Handled

The triage script is strictly enforced to maintain the integrity of the games gallery. It handles the following edge cases:

- **Subdirectories:** Games must be placed directly in `/games/`. Subdirectories (e.g. `games/my-folder/game.js`) are rejected.
- **Non-JS Files:** Only `.js` files are permitted in the `/games/` folder. Submitting images, text files, or markdown will explicitly fail the check.
- **Multiple Games per PR:** If an author attempts to submit more than one game in a single PR, the bot will fail the check and request them to split it up to make reviewing easier.
- **Modifying Existing Games:** By default, contributors can only *add* new games. Modifying existing games will fail the check. However, **Maintainers** (users with `OWNER`, `MEMBER`, or `COLLABORATOR` associations) bypass this restriction and can freely edit existing games.
- **API Pagination:** The script uses `github.paginate` to fetch all files modified in a PR, bypassing the default 30-file limit of the GitHub REST API.

## Labels & Review State

Depending on the results of the validation checks, the bot manages the following labels to help human reviewers:

- **✅ Success:** Applies `Verified` and `Ready for Playtest` (removes `Failed` and `Needs Author`).
- **❌ Failure:** Applies `Failed` and `Needs Author` (removes `Verified` and `Ready for Playtest`).
- **⚠️ Plagiarism:** Applies `Plagiarism Risk` if similarity score >= 0.5.

**Note on Review Links:**  
The bot posts a comment containing a "Play in Sprig Editor" link. This link points to the official production server (`https://sprig.hackclub.com/editor`). If you are testing changes to the editor's URL parsing on a fork, the link may not behave correctly until your engine changes are deployed to production.
