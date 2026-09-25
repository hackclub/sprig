import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const configPath = new URL('../.vercel/output/config.json', import.meta.url)

if (!existsSync(configPath)) process.exit(0)

const config = JSON.parse(readFileSync(configPath, 'utf8'))
const routes = Array.isArray(config.routes) ? config.routes : []
const astroAssetsRouteIndex = routes.findIndex((route) => route.src === '^/_astro/(.*)$')
const astroAssetsRoute = astroAssetsRouteIndex >= 0 ? routes[astroAssetsRouteIndex] : null

if (astroAssetsRoute) {
	astroAssetsRoute.headers = {
		...astroAssetsRoute.headers,
		'Access-Control-Allow-Origin': 'null',
		'Access-Control-Allow-Credentials': 'true',
		'Cross-Origin-Resource-Policy': 'cross-origin',
	}

	routes.splice(astroAssetsRouteIndex, 1)

	const filesystemIndex = routes.findIndex((route) => route.handle === 'filesystem')
	if (filesystemIndex >= 0) {
		routes.splice(filesystemIndex, 0, astroAssetsRoute)
	} else {
		routes.unshift(astroAssetsRoute)
	}
}

writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`)
