import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'
import prefresh from '@prefresh/vite'
import svelte from '@astrojs/svelte'
import rehypeExternalLinks from 'rehype-external-links'

import generateMetadata from "./src/integrations/generate-metadata"

export default defineConfig({
	site: 'https://sprig.hackclub.com',
	integrations: [
		preact({ compat: true }),
		svelte(),
		generateMetadata()
	],
	output: 'server',
	adapter: vercel(),
	vite: {
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