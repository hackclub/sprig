import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import styles from './mobile-player.module.css'
import {exitFullscreen, fullscreenElement, requestFullscreen} from "../../lib/utils/fullscreen";
import SandboxedGameFrame from './sandboxed-game-frame'
import type { SandboxedGameControllerHandle } from '../../lib/engine/sandbox-controller'

interface MobilePlayerProps {
	code: string
	gameName: string
	authorName: string
}

export default function MobilePlayer(props: MobilePlayerProps) {
	const player = useRef<SandboxedGameControllerHandle | null>(null)
	const cleanup = useRef<(() => void) | null>(null);
	const playerVersion = useSignal(0);
	
	const run = () => {
		if (cleanup.current) cleanup.current();
		player.current?.run(props.code)
		cleanup.current = () => player.current?.stop();
		return cleanup.current
	}

	useEffect(() => {
		return run()
	}, [props.code, playerVersion.value])

	const pressKey = (key: string) => {
		player.current?.sendKey(key)
	}

	const keyTouches = useSignal<Record<string, number>>({})

	// There is no clear guidance there when it comes to handling device and browser-specific differentiations on mobile browsers,as such we need to do a custom implementation of vh
	const calculateCSS = () => {
		document.documentElement.style.setProperty(
			"--vh",
			`${window.innerHeight * 0.01}px`
		);
		document.documentElement.style.setProperty(
			"--vw",
			`${window.innerWidth * 0.01}px`
		);
	};
	
	const toggleFullscreen = async () => {
		if (fullscreenElement()) {
			exitFullscreen();
		} else {
			requestFullscreen(document.documentElement);
		}
	};
	
	useEffect(() => {
		calculateCSS();
		window.addEventListener("resize", calculateCSS);
		document
			.getElementById("toggle-fullscreen")
			?.addEventListener("click", toggleFullscreen);
	}, []);

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
					<SandboxedGameFrame
						class={styles.screen}
						onController={(controller) => {
							player.current = controller;
							playerVersion.value++;
						}}
						onError={(error) => console.error(error.raw)}
					/>
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
