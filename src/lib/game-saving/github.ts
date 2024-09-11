const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
			);
			await delay(delayMs * (attempt + 1));
		}
	}
	throw new Error("Max retries reached, request failed.");
}

function getAuthHeaders(accessToken: string): HeadersInit {
	return {
		Authorization: `Bearer ${accessToken}`,
		Accept: "application/json",
	};
}

function getJsonHeaders(accessToken?: string): HeadersInit {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
		Accept: "application/json",
	};
	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}
	return headers;
}

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

export async function fetchGitHubUser(accessToken: string): Promise<any> {
	const response = await fetchWithRetry("https://api.github.com/user", {
		headers: getAuthHeaders(accessToken),
	});

	return handleResponse(response);
}

export async function validateGitHubToken(
	accessToken: string
): Promise<boolean> {
	const response = await fetchWithRetry("https://api.github.com/", {
		headers: getAuthHeaders(accessToken),
	});

	return response.ok;
}

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
		await handleResponse(response);
	}
}

export async function forkRepository(
	accessToken: string,
	owner: string,
	repo: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/forks`,
		{
			method: "POST",
			headers: getAuthHeaders(accessToken),
		}
	);

	return handleResponse(response);
}

export async function createBranch(
	accessToken: string,
	owner: string,
	repo: string,
	branchName: string,
	sha: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/git/refs`,
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

export async function createCommit(
	accessToken: string,
	owner: string,
	repo: string,
	message: string,
	treeSha: string,
	parentSha: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/git/commits`,
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

	return handleResponse(response);
}

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
	await delay(5000);
	const fullHead = `${forkOwner}:${head}`;

	try {
		const response = await fetchWithRetry(
			`https://api.github.com/repos/${owner}/${repo}/pulls`,
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
		const prUrl = pullRequest.html_url;

		const updateGamePRResponse = await fetch(
			`/api/games/github-update-game`,
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
	const data = await handleResponse(response);
	return data.object.sha;
}

export async function createBlob(
	accessToken: string,
	owner: string,
	repo: string,
	content: Blob
): Promise<string> {
	const url = `https://api.github.com/repos/${owner}/${repo}/git/blobs`;
	const reader = new FileReader();
	const base64 = await new Promise<string>((resolve) => {
		reader.onloadend = () => resolve(reader.result as string);
		reader.readAsDataURL(content);
	});
	const base64content = base64.split(",")[1];

	const response = await fetchWithRetry(url, {
		method: "POST",
		headers: getJsonHeaders(accessToken),
		body: JSON.stringify({
			content: base64content,
			encoding: "base64",
		}),
	});
	const data = await handleResponse(response);
	return data.sha;
}

export async function fetchForkedRepository(
	accessToken: string,
	owner: string,
	repo: string,
	yourGithubUsername: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/forks`,
		{
			headers: getAuthHeaders(accessToken),
		}
	);

	const forks = await handleResponse(response);
	const forkedRepo = forks.find(
		(fork: any) => fork.owner.login === yourGithubUsername
	);
	if (!forkedRepo) {
		throw new Error("Forked repository not found.");
	}

	return forkedRepo;
}

export async function createTreeAndCommit(
	accessToken: string,
	owner: string,
	repo: string,
	baseTreeSha: string,
	files: { path: string; content?: string; sha?: string }[]
): Promise<string> {
	const tree = files.map((file) => ({
		path: file.path,
		mode: "100644",
		type: "blob",
		...(file.sha ? { sha: file.sha } : { content: file.content }),
	}));

	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/git/trees`,
		{
			method: "POST",
			headers: getJsonHeaders(accessToken),
			body: JSON.stringify({
				base_tree: baseTreeSha,
				tree,
			}),
		}
	);

	const treeData = await handleResponse(response);
	return treeData.sha;
}

export async function updateBranch(
	accessToken: string,
	owner: string,
	repo: string,
	branchName: string,
	commitSha: string
): Promise<any> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branchName}`,
		{
			method: "PATCH",
			headers: getJsonHeaders(accessToken),
			body: JSON.stringify({
				sha: commitSha,
				force: true,
			}),
		}
	);

	return handleResponse(response);
}

export async function createBlobForImage(
	accessToken: string,
	repoOwner: string,
	repoName: string,
	base64ImageContent: any
): Promise<string> {
	const response = await fetchWithRetry(
		`https://api.github.com/repos/${repoOwner}/${repoName}/git/blobs`,
		{
			method: "POST",
			headers: getJsonHeaders(accessToken),
			body: JSON.stringify({
				content: base64ImageContent,
				encoding: "base64",
			}),
		}
	);

	const data = await handleResponse(response);
	return data.sha;
}