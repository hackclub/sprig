import { useRef, useEffect } from 'preact/hooks'
import { bitmapTextToImageData } from '../../../engine/src/image-data'
import styles from './bitmap-preview.module.css'

interface BitmapPreviewProps {
	text: string
	class?: string | undefined
}

export default function BitmapPreview(props: BitmapPreviewProps) {
	const canvas = useRef<HTMLCanvasElement>(null)
	useEffect(() => {
		if (!canvas.current) return
		const ctx = canvas.current.getContext('2d')!
		ctx.imageSmoothingEnabled = false
		try {
			const data = bitmapTextToImageData('.', props.text)
			canvas.current.width = data.width
			canvas.current.height = data.height
			ctx.clearRect(0, 0, data.width, data.height)
			ctx.putImageData(data, 0, 0)
		} catch {
			canvas.current.width = 1
			canvas.current.height = 1
			ctx.clearRect(0, 0, 1, 1)
		}
	}, [ props.text ])

	return (
		<canvas ref={canvas} class={`${styles.canvas} ${props.class ?? ''}`} width={1} height={1}>
			{props.text}
		</canvas>
	)
}
