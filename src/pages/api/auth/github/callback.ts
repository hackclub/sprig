import { APIRoute } from "astro";
import {
	fetchGitHubAccessToken,
	fetchGitHubUser,
} from "../../../../lib/game-saving/github";
import {
	getSession,
	updateUserGitHubToken,
} from "../../../../lib/game-saving/account";

export const get: APIRoute = async ({ request, cookies }) => {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	let userId = null;
	try {
		const stateObj = JSON.parse(decodeURIComponent(state as string));
		userId = stateObj.userId;
	} catch (error) {
		console.error("State parsing error:", error);
	}

	if (!code || !userId) {
		return new Response(
			'<script>window.opener.postMessage({ status: "error", message: "Missing authorization code or invalid state" }, "*"); window.close();</script>',
			{
				headers: { "Content-Type": "text/html" },
			}
		);
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
			return new Response(
				'<script>window.opener.postMessage({ status: "error", message: "No active session" }, "*"); window.close();</script>',
				{
					headers: { "Content-Type": "text/html" },
				}
			);
		} else if (sessionInfo.user.id !== userId) {
			console.error(
				`Session user ID mismatch: expected ${userId}, got ${sessionInfo.user.id}`
			);
			return new Response(
				'<script>window.opener.postMessage({ status: "error", message: "Session mismatch" }, "*"); window.close();</script>',
				{
					headers: { "Content-Type": "text/html" },
				}
			);
		}

		await updateUserGitHubToken(
			userId,
			accessToken,
			githubUser.id,
			githubUser.login
		);

		return new Response(
			`<script>window.opener.postMessage({
				status: "success",
				message: "GitHub authorization successful",
				accessToken: "${accessToken}"
			}, "*"); window.close();</script>`,
			{
				headers: { "Content-Type": "text/html" },
			}
		);
	} catch (error) {
		console.error("GitHub OAuth callback error:", error);
		return new Response(
			'<script>window.opener.postMessage({ status: "error", message: "Error during GitHub OAuth callback: ' +
				(error as Error).message +
				'" }, "*"); window.close();</script>',
			{
				headers: { "Content-Type": "text/html" },
			}
		);
	}
};