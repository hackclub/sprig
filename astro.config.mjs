import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'
import prefresh from '@prefresh/vite'

export default defineConfig({
	integrations: [ preact({ compat: true }) ],
	output: 'server',
	adapter: vercel(),
	vite: {
		plugins: [ prefresh() ],
		ssr: {
			// If an import is broken in the Vercel deployment, adding it here might fix it!
			noExternal: [ 'react-icons', 'tinykeys' ]
		}
	},
	markdown: {
		shikiConfig: { theme: 'github-light' }
	}
})