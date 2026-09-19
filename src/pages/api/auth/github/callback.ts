import type { APIRoute } from "astro";
import {
	fetchGitHubAccessToken,
	fetchGitHubUser,
} from "../../../../lib/game-saving/github";
import {
	getSession,
} from "../../../../lib/game-saving/account";

const safe = (value: unknown): string =>
	JSON.stringify(value)
		.replace(/</g, "\\u003c")
		.replace(/>/g, "\\u003e")
		.replace(/&/g, "\\u0026")
		.replace(/\u2028/g, "\\u2028")
		.replace(/\u2029/g, "\\u2029");

const renderResponse = (origin: string, payload: Record<string, unknown>): Response =>
	new Response(
		`<script>window.opener && window.opener.postMessage(${safe(payload)}, ${safe(origin)}); window.close();</script>`,
		{ headers: { "Content-Type": "text/html" } }
	);

export const GET: APIRoute = async ({ request, cookies }) => {
	const url = new URL(request.url);
	const origin = url.origin;
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const e = cookies.get("githubOAuthState")?.value ?? null;
	cookies.delete("githubOAuthState", { path: "/" });

	let userId: string | null = null;
	let nonce: string | null = null;
	try {
		const stateObj = JSON.parse(decodeURIComponent(state as string));
		userId = stateObj.userId ?? null;
		nonce = stateObj.nonce ?? null;
	} catch (error) {
		console.error("State parsing error:", error);
	}

	if (!code || !userId || !nonce) {
		return renderResponse(origin, {
			status: "error",
			message: "Missing authorization code or invalid state",
		});
	}

	if (!e || e !== nonce) {
		console.error("OAuth state nonce mismatch");
		return renderResponse(origin, {
			status: "error",
			message: "Invalid OAuth state",
		});
	}

	try {
		const accessToken = await fetchGitHubAccessToken(code);
		if (!accessToken) {
			throw new Error("Failed to retrieve GitHub access token");
		}

		const githubUser = await fetchGitHubUser(accessToken);
		if (!githubUser) {
			throw new Error("Failed to retrieve GitHub user");
		}

		const sessionInfo = await getSession(cookies);
		if (!sessionInfo) {
			console.error("No active session found");
			return renderResponse(origin, {
				status: "error",
				message: "No active session",
			});
		} else if (sessionInfo.user.id !== userId) {
			console.error(
				`Session user ID mismatch: expected ${userId}, got ${sessionInfo.user.id}`
			);
			return renderResponse(origin, {
				status: "error",
				message: "Session mismatch",
			});
		}

		return renderResponse(origin, {
			status: "success",
			message: "GitHub authorization successful",
			accessToken,
			githubUsername: githubUser.login,
		});
	} catch (error) {
		console.error("GitHub OAuth callback error:", error);
		return renderResponse(origin, {
			status: "error",
			message: "Error during GitHub OAuth callback: " + (error as Error).message,
		});
	}
};
