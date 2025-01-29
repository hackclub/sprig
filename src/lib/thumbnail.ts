export interface PngThumbnail {
	kind: 'png'
	data: string
}

export interface RawThumbnail {
	kind: 'raw'
	data: string
	width: number
	height: number
}

export type Thumbnail = PngThumbnail | RawThumbnail

const decode = ({ data, width }: RawThumbnail) => {
	const decodedString = window.atob(data)
	const l = decodedString.length
	const buf = new Uint8ClampedArray(l)
	for (let i = 0; i < l; i++) {
		const char = decodedString[i]!
		const byte = char.charCodeAt(0)
		buf[i] = byte
	}
	return new ImageData(buf, width)
}

export const loadThumbnailUrl = async (key: string): Promise<string> => {
	const res = await fetch(`/${key}.json`)
	const json = await res.json() as Thumbnail

	if (json.kind === 'png') {
		return `data:image/png;base64,${json.data}`
	} else {
		// Raw, hopefully
		const imageData = decode(json)
		const c = document.createElement('canvas')
		c.width = imageData.width
		c.height = imageData.height
		c.getContext('2d')!.putImageData(imageData, 0, 0)
		c.style.imageRendering = 'pixelated'
		return c.toDataURL()
	}
}