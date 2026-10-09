import { useEffect, useRef } from 'preact/hooks'
import SandboxedGameFrame from './sandboxed-game-frame'
import type { SandboxedGameControllerHandle } from '../../lib/engine/sandbox-controller'

interface StandaloneSandboxPlayerProps {
	code: string
	watchFile?: string
	watchMs?: number
	class?: string
}

export default function StandaloneSandboxPlayer(props: StandaloneSandboxPlayerProps) {
	const player = useRef<SandboxedGameControllerHandle | null>(null)
	const lastCode = useRef(props.code)

	const run = (code: string) => {
		lastCode.current = code
		player.current?.run(code)
	}

	useEffect(() => {
		run(props.code)
	}, [props.code])

	useEffect(() => {
		if (!props.watchFile) return

		const interval = window.setInterval(async () => {
			const response = await fetch(props.watchFile!)
			const code = await response.text()
			if (lastCode.current === code) return
			run(code)
		}, props.watchMs ?? 1000)

		return () => window.clearInterval(interval)
	}, [props.watchFile, props.watchMs])

	return (
		<SandboxedGameFrame
			class={props.class}
			onController={(controller) => {
				player.current = controller
				if (controller) run(lastCode.current)
			}}
			onError={(error) => console.error(error.raw)}
		/>
	)
}
