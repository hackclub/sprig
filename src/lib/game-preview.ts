const decode = ({ data, width }: { data: string, width: number }) => {
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

export const loadImageUrl = async (key: string): Promise<string> => {
	const res = await fetch(`https://editor.sprig.hackclub.com/api/thumbnail/${key}`)
	const json = await res.json()

	if (json.image.kind === 'png') {
		return `data:image/png;base64,${json.image.data}`
	} else {
		// Raw, hopefully
		const imageData = decode(json.image)
		const c = document.createElement('canvas')
		c.width = imageData.width
		c.height = imageData.height
		c.getContext('2d')!.putImageData(imageData, 0, 0)
		c.style.imageRendering = 'pixelated'
		return c.toDataURL()
	}
}