const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Handles the response from GitHub API requests.
// Throws an error with a detailed message if the response is not OK (status code 2xx).
async function handleResponse(response: Response): Promise<any> {
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		const errorMessage = `GitHub API Error (${response.status}): ${
			response.statusText
		} - ${JSON.stringify(errorData)}`;
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
	return response.json().catch(() => ({}));
}

// Sends a GitHub API request and retries up to a specified number of times if it fails.
// Includes an exponential backoff between retries (delay increases with each retry).
async function fetchWithRetry(
	url: string,
	options: RequestInit,
	retries: number = 3,
	delayMs: number = 1000
): Promise<Response> {
	let response: Response;
	for (let attempt = 0; attempt < retries; attempt++) {
		response = await fetch(url, options);
		if (response.ok) return response;
		if (attempt < retries - 1) {
			console.warn(
				`Retrying GitHub API request (${attempt + 1}/${retries})`
			); // Log a warning for each retry attempt
			await delay(delayMs * (attempt + 1)); // Exponential backoff before retrying
		}
	}
	throw new Error("Max retries reached, request failed."); // Throw error if all retries fail
}

// Generates authorization headers for GitHub API requests using the provided access token.
function getAuthHeaders(accessToken: string): HeadersInit {
	return {
		Authorization: `Bearer ${accessToken}`,
		Accept: "application/json",
	};
}

// Generates headers for JSON-based API requests, including authorization if an access token is provided.
function getJsonHeaders(accessToken?: string): HeadersInit {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
		Accept: "application/json",
	};
	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`; // Add authorization header if access token is provided
	}
	return headers;
}

// Fetches a GitHub OAuth access token using the provided authorization code.
// Uses the GitHub OAuth flow to exchange a code for an access token.
export async function fetchGitHubAccessToken(
	code: string
): Promise<string | null> {
	try {
		const response = await fetch(
			`https://github.com/login/oauth/access_token`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					client_id: import.meta.env.PUBLIC_GITHUB_CLIENT_ID,
					client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
					code: code,
				}),
			}
		);

		const textResponse = await response.text();

		if (!response.ok) {
			console.error("GitHub OAuth token request failed:", textResponse);
			return null;
		}

		const data = JSON.parse(textResponse);
		return data.access_token || null;
	} catch (error) {
		console.error("Error fetching GitHub access token:", error);
		return null;
	}
}

// Fetches the authenticated GitHub user's details using the provided access token.
export async function fetchGitHubUser(accessToken: string): Promise<any> {
	const response = await fetchWithRetry("https://api.github.com/user", {
		headers: getAuthHeaders(accessToken),
	});

	return handleResponse(response);
}

// Validates if the provided GitHub access token is valid by making a test request to GitHub API.
export async function validateGitHubToken(
	accessToken: string
): Promise<boolean> {
	const response = await fetchWithRetry("https://api.github.com/", {
		headers: getAuthHeaders(accessToken),
	});

	return response.ok; // Return true if the token is valid, otherwise false
}

// Revokes the provided GitHub access token by removing it from the user's authorized applications.
export async function revokeGitHubToken(accessToken: string): Promise<void> {
	const response = await fetchWithRetry(
		`https://github.com/settings/connections/applications/${
			import.meta.env.PUBLIC_GITHUB_CLIENT_ID
		}`,
		{
			method: "DELETE",
			headers: getAuthHeaders(accessToken),
		}
	);

	if (!response.ok) {
		await handleResponse(response); // Handle error if token revocation fails
	}
}

// Forks a specified repository on GitHub using the provided access token.
export async function forkRepository(
	accessToken: string,
	owner: string,
	repo: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/forks`, // GitHub API endpoint to fork a repository
		{
			method: "POST",
			headers: getAuthHeaders(accessToken),
		}
	);

	return handleResponse(response);
}

// Creates a new branch in the specified GitHub repository based on a commit SHA.
export async function createBranch(
	accessToken: string,
	owner: string,
	repo: string,
	branchName: string,
	sha: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/git/refs`, // GitHub API endpoint to create a branch
		{
			method: "POST",
			headers: getAuthHeaders(accessToken),
			body: JSON.stringify({
				ref: `refs/heads/${branchName}`,
				sha: sha,
			}),
		}
	);

	return handleResponse(response);
}

// Creates a new commit in the GitHub repository.
export async function createCommit(
	accessToken: string,
	owner: string,
	repo: string,
	message: string,
	treeSha: string,
	parentSha: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/git/commits`, // GitHub API endpoint to create a commit
		{
			method: "POST",
			headers: getAuthHeaders(accessToken),
			body: JSON.stringify({
				message: message,
				tree: treeSha,
				parents: [parentSha],
			}),
		}
	);

	return handleResponse(response); // Return the created commit
}

// Creates a pull request on a GitHub repository.
export async function createPullRequest(
	accessToken: string,
	owner: string,
	repo: string,
	title: string,
	head: string,
	base: string,
	body: string,
	forkOwner: string,
	gameId: string
): Promise<any> {
	await delay(5000); // Delay to ensure the forked repository is ready
	const fullHead = `${forkOwner}:${head}`;

	try {
		// Create the pull request
		const response = await fetchWithRetry(
			`https://api.github.com/repos/${owner}/${repo}/pulls`, // GitHub API endpoint for creating pull requests
			{
				method: "POST",
				headers: getAuthHeaders(accessToken),
				body: JSON.stringify({
					title: title,
					head: fullHead,
					base: base,
					body: body,
				}),
			}
		);

		const pullRequest = await handleResponse(response);
		const prUrl = pullRequest.html_url; // URL of the created pull request

		const updateGamePRResponse = await fetch(
			`/api/games/github-update-game`, // Endpoint to update game metadata with the pull request
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					gameId,
					githubPR: prUrl,
					isPublished: true,
				}),
			}
		);

		if (!updateGamePRResponse.ok) {
			const errorData = await updateGamePRResponse
				.json()
				.catch(() => ({}));
			throw new Error(
				errorData.message || "Failed to update GitHub PR URL in game"
			);
		}

		return pullRequest;
	} catch (error: any) {
		console.error(
			"Error creating pull request or updating the game:",
			error
		);

		if (error.message.includes("422")) {
			console.error(
				"422 Unprocessable Content: This usually indicates an issue with the 'head' branch. Ensure the branch exists in the fork."
			);
		}
		throw error;
	}
}

// Fetches the latest commit SHA for the specified branch in a GitHub repository.
export async function fetchLatestCommitSha(
	accessToken: string,
	owner: string,
	repo: string,
	branch: string
): Promise<string> {
	const url = `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${branch}`;
	const response = await fetchWithRetry(url, {
		headers: getAuthHeaders(accessToken),
	});
	const data = await handleResponse(response); // Return the commit SHA
	return data.object.sha;
}

// Creates a blob (file) in a GitHub repository, encoding it as base64.
export async function createBlob(
	accessToken: string,
	owner: string,
	repo: string,
	content: Blob
): Promise<string> {
	const url = `https://api.github.com/repos/${owner}/${repo}/git/blobs`; // GitHub API endpoint to create a blob
	const reader = new FileReader(); // Read the file content
	const base64 = await new Promise<string>((resolve) => {
		reader.onloadend = () => resolve(reader.result as string); // Convert file content to base64
		reader.readAsDataURL(content);
	});
	const base64content = base64.split(",")[1];

	const response = await fetchWithRetry(url, {
		method: "POST", // Use POST to create the blob
		headers: getJsonHeaders(accessToken),
		body: JSON.stringify({
			content: base64content,
			encoding: "base64",
		}),
	});
	const data = await handleResponse(response); // Return the blob SHA
	return data.sha;
}

// Fetches the forked repository for the authenticated user.
export async function fetchForkedRepository(
	accessToken: string,
	owner: string,
	repo: string,
	yourGithubUsername: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/forks`, // GitHub API endpoint to fetch forks
		{
			headers: getAuthHeaders(accessToken),
		}
	);

	const forks = await handleResponse(response);
	const forkedRepo = forks.find(
		(fork: any) => fork.owner.login === yourGithubUsername // Find the fork created by the current user
	);
	if (!forkedRepo) {
		throw new Error("Forked repository not found.");
	}

	return forkedRepo;
}

// Creates a Git tree and commits files in a GitHub repository.
export async function createTreeAndCommit(
	accessToken: string,
	owner: string,
	repo: string,
	baseTreeSha: string,
	files: { path: string; content?: string; sha?: string }[]
): Promise<string> {
	const tree = files.map((file) => ({
		path: file.path,
		mode: "100644", // File permissions (100644 represents a non-executable file)
		type: "blob",
		...(file.sha ? { sha: file.sha } : { content: file.content }),
	}));

	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/git/trees`, // GitHub API endpoint to create a tree
		{
			method: "POST",
			headers: getJsonHeaders(accessToken),
			body: JSON.stringify({
				base_tree: baseTreeSha,
				tree,
			}),
		}
	);

	const treeData = await handleResponse(response); // Return the tree SHA
	return treeData.sha;
}

// Updates an existing branch in a GitHub repository by pointing it to a new commit SHA.
export async function updateBranch(
	accessToken: string,
	owner: string,
	repo: string,
	branchName: string,
	commitSha: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branchName}`, // GitHub API endpoint to update a branch
		{
			method: "PATCH",
			headers: getJsonHeaders(accessToken),
			body: JSON.stringify({
				sha: commitSha, // Update the branch to point to the new commit
				force: true, // Force update in case of conflicts
			}),
		}
	);

	return handleResponse(response); // Return the updated branch reference
}

// Creates a blob (file) for an image in a GitHub repository, encoding it as base64.
export async function createBlobForImage(
	accessToken: string,
	repoOwner: string,
	repoName: string,
	base64ImageContent: any
): Promise<string> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${repoOwner}/${repoName}/git/blobs`, // GitHub API endpoint to create a blob for an image
		{
			method: "POST",
			headers: getJsonHeaders(accessToken),
			body: JSON.stringify({
				content: base64ImageContent,
				encoding: "base64",
			}),
		}
	);

	const data = await handleResponse(response); // Return the blob SHA
	return data.sha;
}