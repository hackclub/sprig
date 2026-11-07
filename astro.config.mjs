import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'

import svelte from '@astrojs/svelte'
import rehypeExternalLinks from 'rehype-external-links'
import fs from "node:fs";
import generateMetadata from "./src/integrations/generate-metadata"
import vercel from "@astrojs/vercel"
const gameFiles = fs.readdirSync("games").filter(f => f.endsWith(".js")).map(game => `./games/${game}`);

export default defineConfig({
	site: 'https://sprig.hackclub.com',
	devToolbar: { enabled: false },
	integrations: [
		preact({ compat: true }),
		svelte(),
		generateMetadata()
	],
	output: 'server',
	adapter: vercel(),
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern'
				}
			}
		},
		server: {
      allowedHosts: [
				"sprig.hackclub.com",
        "d444gocccow80c8wkgsg4sss.a.selfhosted.hackclub.com"
      ],
      host: true, // Allow access from non-localhost domains
      cors: true, // Allow CORS (optional)
    },
		resolve: {
			// CodeMirror breaks silently when more than one copy of these is bundled:
			// extensions registered by one copy (syntax parsing, highlighting, themes)
			// are invisible to the EditorView from another copy, so the editor ends up
			// with no syntax tree -> grey text and no bitmap/tune/map widgets.
			dedupe: [
				'@codemirror/state',
				'@codemirror/view',
				'@codemirror/language',
				'@codemirror/lint',
				'@codemirror/autocomplete',
				'@lezer/common',
				'@lezer/highlight',
				'@lezer/lr'
			]
		},
		optimizeDeps: {
			exclude: ['https']
		},
		plugins: [],
		ssr: {
			// If an import is broken in the Vercel deployment, adding it here might fix it!
			noExternal: [ 'tinykeys' ]
		}
	},
	markdown: {
		shikiConfig: { theme: 'github-light' },
		rehypePlugins: [
			[ rehypeExternalLinks, { target: '_blank' } ]
		]
	}
})
