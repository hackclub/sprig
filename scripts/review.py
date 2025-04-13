import argparse
import sys
from datetime import datetime, timezone, timedelta

import pytz as pytz
import webbrowser
import readchar as readchar
import requests as requests
from github import Github
import subprocess

EST = pytz.timezone("EST")

parser = argparse.ArgumentParser(description="Filter items based on type (games or non-games).")

# Add a choice-based argument
parser.add_argument(
    "--type",
    choices=["games", "non-games"],
    help="Filter results to only show 'games' or 'non-games'."
)

# Add an optional argument that accepts a freeform text input
parser.add_argument(
    "--skip",
    type=str,
    nargs="?",  # Makes it optional
    default=None,  # Defaults to an empty string if not provided
    help="Skips all PRs that have commentary containing a string"
)


args = parser.parse_args()

def is_plagiarized(doc_string):
    with open("/Users/graham/Work/sprig/games/game.js", "w") as f:
        f.write(doc_string)

    command = ["python", "plagiarism_check.py", "/Users/graham/Work/sprig/games", "0.5", "/Users/graham/Work/sprig/games/game.js"]
    process = subprocess.run(command, capture_output=True, text=True)
    return process.returncode != 0

# Replace with your personal access token (PAT)
GITHUB_TOKEN = "YOU_NEED_TO_REPLACE_THIS"

# Replace with your target repository (e.g., "owner/repo_name")
REPO_NAME = "hackclub/sprig"

# Authenticate with GitHub
g = Github(GITHUB_TOKEN, timeout=10)

# Get the repository
repo = g.get_repo(REPO_NAME)

# Fetch all open pull requests
# Get open PRs
prs = list(repo.get_pulls(state='open'))

# Sort by created_at (oldest first)
open_prs = sorted(prs, key=lambda pr: pr.created_at)


def get_user_activity(user, days=30):
    """
    Fetches account creation date, recent commits, and PRs for a given GitHub user.

    :param user: GitHub user object
    :param days: Number of days to look back for commits and PRs (default: 30)
    :return: Dictionary with user details
    """
    since_date = datetime.now(timezone.utc) - timedelta(days=days)

    # Initialize counters
    commit_count = 0
    pr_count = 0

    # Fetch user events (public events only)
    events = user.get_events()

    for event in events:
        if event.created_at.replace(tzinfo=timezone.utc) < since_date:
            break  # Stop when reaching events older than `days`

        # Count commits (PushEvent)
        if event.type == "PushEvent":
            commit_count += len(event.payload.get("commits", []))

        # Count PRs (PullRequestEvent)
        if event.type == "PullRequestEvent" and event.payload["action"] in ["opened", "merged"]:
            pr_count += 1

    # Return collected data
    return {
        "username": user.login,
        "account_created": user.created_at,
        "recent_commits": commit_count,
        "recent_prs": pr_count,
        "lookback_days": days
    }

def get_char():
    return readchar.readchar().lower()


def ask_yes_no(prompt="Continue?"):
    print(prompt + " (y/n): ", end="", flush=True)
    while True:
        key = get_char()
        if key in ["y", "n"]:
            print(key)  # Print selection on the same line
            return key == "y"


def get_file_contents(pr, file):
    file_path = file.filename  # File path in the repo
    raw_url = file.raw_url  # Direct raw URL to the file content

    # Get the full content from the repo
    try:
        return repo.get_contents(file_path, ref=pr.head.sha).decoded_content.decode()
    except Exception as e:
        print(e)
        return None


def get_sprig_game_code(pr):
    found_first = False
    loaded_code = None
    for file in pr.get_files():
        if file.filename.endswith("js") and "games" in file.filename:
            loaded_code = get_file_contents(pr, file)
            if found_first:
                print("Multiple game files found...")
                return None
            found_first = True
    return loaded_code

def has_valid_game_files(pr):
    valid_img = True
    for file in pr.get_files():
        if file.filename.endswith("png"):
            if "games/img" not in file.filename:
                valid_img = False

    return valid_img

def actually_close_pr_with_comment(pr, comment):
    pr.create_issue_comment(comment)
    pr.edit(state="closed")

def get_last_commit_timestamp(pr):
    # Get the list of commits on the PR
    commits = pr.get_commits()
    all_commits = list(commits)

    # Get the last commit's timestamp
    if commits.totalCount > 0:
        last_commit = all_commits[-1]  # Last commit in the list
        last_commit_time = last_commit.commit.author.date  # Timestamp of the last commit
        return last_commit_time
    else:
        return None

def is_outdated(pr):
    """
    Check if a PR is outdated based on GitHub's merging rules.
    """
    while 1:
        pr.update()  # Ensure we have the latest PR status
        if pr.rebaseable is not None:
            break

    try:
        comparison = pr.base.repo.compare(pr.base.ref, pr.head.ref)

        return pr.rebaseable and comparison.behind_by > 0
    except Exception as e:
        return False

def merge_and_grant(pr):
    pr.create_issue_comment("Congratulations!  If you're a teenager, please fill out the following form to receive a Sprig device of your very own!  Also, feel free to join Hack Club's Slack and share your creation in the #sprig channel!  https://sprig-order.hackclub.dev/")
    merge_result = pr.merge(merge_method="rebase")
    if merge_result.merged:
        print("Game successfully rebased!")
    else:
        print("Error merging game!")

def comment(pr):
    print("Please add a comment for this PR: ", end = "", flush = True)
    comment = sys.stdin.readline().strip()
    if len(comment) == 0:
        comment = "Please add more complexity to this game to justify a Sprig device grant"
        print("WARNING!  Using default message: " + comment)
    while 1:

        print("Would you like to request changes to the PR with the following comment?")
        print("\"%s\"" % (comment))
        print("(y/n) ", end="", flush=True)
        match get_char():
            case "n":
                return
            case "y":
                pr.create_review(
                    body=comment,
                    event="REQUEST_CHANGES"  # This marks the PR as "Changes Requested"
                )
                return
            case _:
                continue

def close_pr(pr):
    print("Please add a comment for the closing of this PR: ", end = "", flush = True)
    comment = sys.stdin.readline().strip()
    if len(comment) == 0:
        comment = "Closing this as it has unresolved commentary, and is also very old."
        print("WARNING!  Using default message: " + comment)
    while 1:

        print("Would you like to close the PR with the following comment?")
        print("\"%s\"" % (comment))
        print("(y/n) ", end="", flush=True)
        match get_char():
            case "n":
                return
            case "y":
                actually_close_pr_with_comment(pr, comment)
                return
            case _:
                continue


def show_comments(pr):
    # Get all comments on the PR
    comments = pr.get_issue_comments()  # General PR comments
    review_comments = pr.get_review_comments()  # Inline review comments
    reviews = pr.get_reviews()
    should_skip = False

    if len(list(comments)) > 0:
        # Print general comments
        print("General Comments:")
        for comment in comments:
            if "bot" not in comment.user.login:
                print(f"[{comment.created_at}]{comment.user.login}: {comment.body}")
            if args.skip is not None and args.skip in comment.user.login:
                should_skip = True
    else:
        print("No general commentary.")

    if len(list(review_comments)) > 0:
        # Print review comments
        print("\nReview Comments:")
        for comment in review_comments:
            print(f"[{comment.created_at}] {comment.created_atcomment.user.login} (line {comment.path}): {comment.body}")
            if args.skip is not None and args.skip in comment.created_atcomment.user.login:
                should_skip = True
    else:
        print("No review commentary.")

    print("\n--- Reviews (Request Changes, Approvals) ---")
    if reviews:
        for review in reviews:
            print(f"[{review.submitted_at}] - {review.user.login}: {review.body} (State: {review.state})")
            if args.skip is not None and args.skip in review.user.login:
                should_skip = True
    else:
        print("No review requests or approvals.")

    return should_skip

def is_mergeable(pr):
    pr.update()

    try:
        # Check if PR is behind
        comparison = pr.base.repo.compare(pr.base.ref, pr.head.ref)
        is_up_to_date = comparison.behind_by == 0

        # Check if GitHub marks it as mergeable (None means GitHub hasn't calculated it yet)
        return is_up_to_date and pr.mergeable is not False
    except Exception as e:
        return False

def review(pr):
    code = get_sprig_game_code(pr)
    userinfo = get_user_activity(pr.user)
    print("Username: %s\nCreated: %d days ago\nRecent commits: %d\nRecent PRs: %d" % (userinfo["username"], (
                datetime.today().replace(tzinfo=None) - userinfo["account_created"].astimezone(EST).replace(tzinfo=None)).days,
                                                                                      userinfo["recent_commits"],
                                                                                      userinfo["recent_prs"]))
    if not has_valid_game_files(pr):
        print("WARNING!  This PR seems to have invalid game files, should prompt to add commentary")
        return

    print("Length of game file: %d" % (len(code)))
    if is_plagiarized(code):
        print("PLAGIARISM DETECTED!")
    else:
        print("NO PLAGIARISM DETECTED!")

    while 1:
        print("Would you like to play the game? (y/n) ", end = "", flush = True)
        match get_char():
            case "y":
                upload_code_and_play("test", code)
                return
            case "n":
                return
            case _:
                print("Invalid option.")


def show_game_code(pr):
    code = get_sprig_game_code(pr)
    if code is None:
        print("NO GAME CODE!  Are you sure this is a Sprig game?")
    else:
        print()
        print()
        print(code)
        print()
        print()

def upload_code_and_play(game_name, code):
    post_data = {
        "name": game_name,
        "code": code
    }
    requests.post("http://localhost:3000/~/new", data=post_data)
    webbrowser.get("chrome").open("http://localhost:3000/~/new?name=null")


def show_high_level_metadata(pr, code):
    is_game = ("NO" if code is None else "YES")
    todaytime = datetime.now().astimezone(EST).replace(tzinfo=None)
    created_at = pr.created_at.astimezone(EST).replace(tzinfo=None)
    days = (todaytime - created_at).days
    mergeable = is_mergeable(pr)
    outdated = is_outdated(pr)
    last_commit_time = get_last_commit_timestamp(pr).astimezone(EST).replace(tzinfo=None)
    last_commit_days = (datetime.today().replace(tzinfo=None) - last_commit_time).days
    print(f"[{pr.html_url} - {pr.title} - {days:.2f} days old (isGame: {is_game}, isMergeable: {mergeable}, isOutdated: {outdated}) - last commit time: {last_commit_days} days old")


def open_url(url):
    webbrowser.get("chrome").open(url)


def show_commands():
    print("d - show code")
    print("r - autoreview")
    print("o - open pr in browser")
    print("t - show threaded commentary")
    print("x - close PR with comment")
    print("c - add commentary")
    print("g - grant PR")
    print("n - next PR")


def process_pr(pr):
    show_commands()
    first = True
    while 1:
        code = get_sprig_game_code(pr)
        should_filter = False
        if args.type == "games" and code is None:
            should_filter = True
        if args.type == "non-games" and code is not None:
            should_filter = True
        if should_filter:
            print("Skipping (filtered)")
            return

        show_high_level_metadata(pr, code)

        if first:
            if show_comments(pr):
                print("Skipping to next PR (skip user encountered)")
                return
            first = False
        print("What would you like to do? (c/r/o/t/x/y/n) ", end="", flush=True)
        key = get_char()
        print(" " + key + "\n")
        match key:
            # Show game code
            case 'd':
                show_game_code(pr)
            case 'c':
                comment(pr)
            # Open PR in browser
            case 'o':
                open_url(pr.html_url)
            # Info
            case 'r':
                review(pr)
            # Next
            case 'n':
                print("Skipping to next PR...")
                return
            # Review comments
            case 't':
                show_comments(pr)
            # Close PR with comment
            case 'x':
                close_pr(pr)
                print("Skipping to next PR...")
                return
            case 'g':
                merge_and_grant(pr)
                print("Skipping to next PR...")
                return
            case _:
                print("Invalid option!\n")
                show_commands()
                continue



# Print PR details
for pr in open_prs:
    process_pr(pr)
    print()
