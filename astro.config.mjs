import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/edge'
import prefresh from '@prefresh/vite'

export default defineConfig({
	integrations: [ preact({ compat: true }) ],
	output: 'server',
	adapter: vercel(),
	vite: {
		plugins: [ prefresh() ]
	}
})