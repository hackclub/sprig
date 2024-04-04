import { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
	const payload = await request.json();

	const data = {
		Selection: payload.selection,
		Email: payload.email,
		"Error Log": JSON.stringify(payload.error),
		"Session Length": payload.sessionLength,
		Code: payload.code,
		Category: payload.category,
		Description: payload.description,
	};

	// GENERATE AI HERE

	const response = {
		code: 'const abc = "hello world";\nconsole.log(abc);',
		description: "This code will print 'hello world' to the console",
	};

	return new Response(JSON.stringify(response), { status: 200 });
};
