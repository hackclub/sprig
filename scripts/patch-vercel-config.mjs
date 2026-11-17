import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const configPath = new URL('../.vercel/output/config.json', import.meta.url)

if (!existsSync(configPath)) {
	console.log('[patch-vercel-config] no .vercel/output/config.json, skipping')
	process.exit(0)
}

const config = JSON.parse(readFileSync(configPath, 'utf8'))
const routes = Array.isArray(config.routes) ? config.routes : []

const corsRoute = {
	src: '^/_astro/(.*)$',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Cross-Origin-Resource-Policy': 'cross-origin',
	},
	continue: true,
}

const isOurs = (route) =>
	route?.src === corsRoute.src &&
	route?.continue === true &&
	route?.headers?.['Access-Control-Allow-Origin'] === '*' &&
	Object.keys(route).length === 3
const withoutOurs = routes.filter((route) => !isOurs(route))

withoutOurs.unshift(corsRoute)

config.routes = withoutOurs
writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`)

console.log('[patch-vercel-config] added CORS headers for /_astro/*')
