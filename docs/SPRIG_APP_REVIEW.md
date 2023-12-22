# Sprig App Review

### Triage
1. Determine if there is a new app to review via ```/slacker gimme sprig games```.  If there are no new Sprig games, triage is complete and you should start ```Review``` below.
2. Click the github link to the Sprig game.
3. Add the 'submission' tag to the PR.
4. Assign the issue to yourself in github.
5. Welcome the game author with an encouraging/congratulatory comment.
6. Resolve the Slacker action item
7. Repeat step #1

### Review
1. Perform your checklist
  * Ensure that the author has provided their name
  * Ensure that the author has provided an "about" blurb for their game.
  * Ensure that the author has provided a brief gameplay description ("How do you play your game?")
  * Ensure that the title of the game is unique (see the top of )
  * Ensure that the author has checked on ALL of the checkboxes in the PR template.
  * Ensure that name of the game file contains only alphanumeric characters (or -, or _), and does not conflict with any other game.
  * Ensure that the game is placed in the /games directory.
  * Ensure that the game screenshot is placed in the /games/img directory, and that the name of the image matches the name of the game file.
  * Check plagiarism script (it should comment on PRs every time code is changed).  Ensure that it reports no overlaps greater than 50% with other games.
  * Navigate to the preview deployment of the game and ensure that the game is able to launch and displays (and is discoverable) as expected in the gallery.
  * Run the game.  Ensure that it has >= 1 minute of novel gameplay.


2. Communicate your review decision to the PR author via a code review
  * If you found an issue during your checklist, **Request changes** on the PR, and clearly communicate the issue or issues that the author needs to resolve before being able to land their changes.  After requesting changes, add the author to the current assignees.  Stop here.
  * If you determine that the game is ready to be landed, **Approve** the PR with a congratulatory comment.
  * Merge the PR to main.
  * Add a comment stating that if the author is a teen, they can request their Sprig device at https://sprig-order.hackclub.dev/.  You can also suggest to them to share a few sentences in our #ship Slack channel.

