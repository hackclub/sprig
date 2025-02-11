import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import prefresh from '@prefresh/vite'
import svelte from '@astrojs/svelte'
import rehypeExternalLinks from 'rehype-external-links'
import fs from "node:fs";
import generateMetadata from "./src/integrations/generate-metadata"
import node from "@astrojs/node"
const gameFiles = fs.readdirSync("games").filter(f => f.endsWith(".js")).map(game => `./games/${game}`);

export default defineConfig({
	site: 'https://sprig.hackclub.com',
	integrations: [
		preact({ compat: true }),
		svelte(),
		generateMetadata()
	],
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	vite: {
		server: {
      allowedHosts: [
				"sprig.hackclub.com",
        "d444gocccow80c8wkgsg4sss.a.selfhosted.hackclub.com"
      ],
      host: true, // Allow access from non-localhost domains
      cors: true, // Allow CORS (optional)
    },
		optimizeDeps: {
			exclude: ['https']
		},
		plugins: [ prefresh() ],
		ssr: {
			// If an import is broken in the Vercel deployment, adding it here might fix it!
			noExternal: [ 'react-icons', 'tinykeys' ]
		}
	},
	markdown: {
		shikiConfig: { theme: 'github-light' },
		rehypePlugins: [
			[ rehypeExternalLinks, { target: '_blank' } ]
		]
	}
})
