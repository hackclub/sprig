import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { runGame } from '../../lib/engine'
import styles from './mobile-player.module.css'

interface MobilePlayerProps {
	code: string
	gameName: string
	authorName: string
}

export default function MobilePlayer(props: MobilePlayerProps) {
	const screen = useRef<HTMLCanvasElement>(null)

	const run = () => {
		const res = runGame(props.code, screen.current!, (_) => { })
		if (res.error) console.error(res.error.raw)
		return res.cleanup
	}

	useEffect(() => {
		return run()
	}, [props.code])

	const pressKey = (key: string) => {
		screen.current!.dispatchEvent(new KeyboardEvent('keydown', { key }))
	}

	const keyTouches = useSignal<Record<string, number>>({})

	return (
		<div class={styles.root}>
			<div class={styles.meta}>
				{props.gameName}
				{props.authorName ? (
					<span class={styles.author}>
						{' '}by @{props.authorName}
					</span>
				) : null}
			</div>

			<div class={styles.actionItems}>
				<a href="#fullscreen" class={styles.action} id="toggle-fullscreen">Fullscreen</a>
				<div class={styles.disclaimer}>This is a playable preview. </div>
				<a href="#reset" class={styles.action} onClick={run}>Reset</a>
			</div>

			<div class={styles.player} id="player">
				<div class={styles.screenContainer}>
					<canvas class={styles.screen} ref={screen} width='1000' height='800' />
				</div>


				{['i', 'j', 'k', 'l', 'w', 'a', 's', 'd'].map(key => (
					<div
						role='button'
						class={`${styles.key} ${styles[key]} ${keyTouches.value[key]! > 0 ? styles.pressing : ''}`}
						onTouchStart={() => {
							keyTouches.value = { ...keyTouches.value, [key]: (keyTouches.value[key] ?? 0) + 1 }
							pressKey(key)
						}}
						onTouchEnd={() => {
							keyTouches.value = { ...keyTouches.value, [key]: (keyTouches.value[key] ?? 0) - 1 }
						}}
					>
						<div class={styles.keyInner}>{key}</div>
					</div>
				))}
			</div>
		</div>
	)
}