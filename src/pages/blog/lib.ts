import {AstroGlobal, MarkdownContent} from "astro";
import {LoopsClient} from "loops";
import {Octokit} from "octokit";

export const octokit = new Octokit({
	auth: import.meta.env.GITHUB_KEY
})

export const getPostMetadata = async (post: MarkdownContent) => {
	const slug = post.file.split("/").pop().split(".md")[0]

	let img;
	try {
		img = await import(`../../../blog/images/${slug}.png`).then(file => file.default)
	} catch {
		img = "https://cloud-i203j2e6a-hack-club-bot.vercel.app/1confused_dinosaur.png"
	}
	
	let date = new Date(post.frontmatter.date).toLocaleDateString(
		undefined, {
			timeZone: "UTC",
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}
	)

	return {
		img, slug, date
	}
}

export const getNameFromUsername = async (username: string) => {
	const { name } = await octokit.request('GET /users/{username}', {
		username,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	}).then((resp: any) => resp.data)

	return name
}

export const handleMailingListSubmission = async (Astro: AstroGlobal) => {
	if (Astro.request.method !== "POST") return false
	try {
		const email: string = await Astro.request.formData().then(data => data.get("email")) as string

		const loops = new LoopsClient(import.meta.env.LOOPS_API_KEY)

		const foundContacts = await loops.findContact(email)

		if (foundContacts.length == 0) {
			await loops.createContact(email, {
				source: 'Sprig blog',
				userGroup: "Hack Clubber"
			})
		}

		await loops.updateContact(email, {
			sprigBlogSignedUpAt: new Date().getTime()
		})

		return true
	} catch (e) {
		console.error(e)
		return false
	}

}