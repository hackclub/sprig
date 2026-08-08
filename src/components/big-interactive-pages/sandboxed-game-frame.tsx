import { useEffect, useRef } from 'preact/hooks'
import type { JSX } from 'preact'
import { bitmaps, muted, type NormalizedError } from '../../lib/state'
import { SandboxedGameController, type SandboxedGameControllerHandle } from '../../lib/engine/sandbox-controller'
import { logInfo } from '../popups-etc/help'

interface SandboxedGameFrameProps {
	class?: string
	style?: JSX.CSSProperties
	title?: string
	onController?: (controller: SandboxedGameControllerHandle | null) => void
	onError?: (error: NormalizedError) => void
}

export default function SandboxedGameFrame(props: SandboxedGameFrameProps) {
	const iframe = useRef<HTMLIFrameElement>(null)
	const controller = useRef<SandboxedGameController | null>(null)
	const sandboxFlags = import.meta.env.DEV ? 'allow-scripts allow-same-origin' : 'allow-scripts'

	useEffect(() => {
		if (!iframe.current) return

		controller.current = new SandboxedGameController(iframe.current, {
			onError: props.onError,
			onConsole: ({ args, nums, isErr }) => {
				logInfo.value = [...logInfo.value, { args, nums, isErr }]
			},
			onBitmaps: (_bitmaps) => {
				bitmaps.value = _bitmaps
			},
		})
		props.onController?.(controller.current)

		return () => {
			controller.current?.destroy()
			controller.current = null
			props.onController?.(null)
		}
	}, [])

	useEffect(() => {
		controller.current?.setMuted(muted.value)
	}, [muted.value])

	return (
		<iframe
			ref={iframe}
			class={props.class}
			style={props.style}
			src="/game-sandbox"
			title={props.title ?? 'Sprig game sandbox'}
			sandbox={sandboxFlags}
			referrerPolicy="no-referrer"
			onLoad={() => controller.current?.markReady()}
		/>
	)
}
