export type Rgba = [number, number, number, number]
export type PaletteItem = [string, Rgba]

export const palette: PaletteItem[] = [
	// Grey
	['0', [0, 0, 0, 255]],
	['L', [73, 80, 87, 255]],
	['1', [145, 151, 156, 255]],
	['2', [248, 249, 250, 255]],

	// Red
	['3', [235, 44, 71, 255]],
	['C', [139, 65, 46, 255]],

	// Blue
	['7', [25, 177, 248, 255]],
	['5', [19, 21, 224, 255]],

	// Yellow
	['6', [254, 230, 16, 255]],
	['F', [149, 140, 50, 255]],

	// Green
	['4', [45, 225, 62, 255]],
	['D', [29, 148, 16, 255]],
	
	// Pink and purple
	['8', [245, 109, 187, 255]],
	['H', [170, 58, 197, 255]],

	// Orange
	['9', [245, 113, 23, 255]],

	// Transparent
	['.', [0, 0, 0, 0]]
]
export const transparent = palette.at(-1)!

export const hexToRgba = (hex: string): Rgba => {
	const [ r, g, b, a ] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) ?? []
	return [ r!, g!, b!, a ?? 255 ]
}

export const rgbaToHex = (rgba: Rgba): string => {
	return '#' + rgba.map(n => n.toString(16).padStart(2, '0')).join('')
}

export const transparentBgUrl = `data:image/svg+xml,%0A%3Csvg width='23' height='23' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='8' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 0H4V4H0V0ZM4 4H8V8H4V4Z' fill='%23DCEFFC'/%3E%3C/svg%3E%0A`