import type { NormalizedError } from '../state'
import {
	type ParentToSandboxMessage,
	type SandboxToParentMessage,
	isSandboxReadyMessage,
	isSandboxToParentMessage,
} from './sandbox-protocol'

interface SandboxedGameControllerOptions {
	onError?: (error: NormalizedError) => void
	onConsole?: (message: Extract<SandboxToParentMessage, { type: 'CONSOLE_LOG' | 'CONSOLE_ERROR' }>) => void
	onBitmaps?: (bitmaps: [string, string][]) => void
	onStopped?: () => void
	onReady?: () => void
}

export interface SandboxedGameControllerHandle {
	run(code: string): void
	stop(): void
	sendKey(key: string): void
	setMuted(muted: boolean): void
	focus(): void
	extractBitmaps(code: string): void
	destroy(): void
}

export const SANDBOX_PATH = '/game-sandbox'

const randomHex = (bytes: number): string => {
	const buffer = new Uint8Array(bytes)
	crypto.getRandomValues(buffer)
	return Array.from(buffer, byte => byte.toString(16).padStart(2, '0')).join('')
}

export class SandboxedGameController implements SandboxedGameControllerHandle {
	private readonly channelId = randomHex(16)
	private readonly secret = randomHex(32)
	private readonly frameWindow: Window
	private readonly queuedMessages: ParentToSandboxMessage[] = []
	private port: MessagePort | null = null
	private bound = false
	private destroyed = false
	private muted = false

	constructor(
		private readonly iframe: HTMLIFrameElement,
		private readonly options: SandboxedGameControllerOptions = {}
	) {
		const frameWindow = iframe.contentWindow
		if (!frameWindow) throw new Error('Sandbox iframe is not attached')
		this.frameWindow = frameWindow
		window.addEventListener('message', this.handleWindowMessage)
		iframe.src = `${SANDBOX_PATH}#${this.secret}`
	}

	run(code: string): void {
		this.send({ type: 'RUN_GAME', channelId: this.channelId, code, muted: this.muted })
		this.focus()
	}

	stop(): void {
		this.send({ type: 'STOP_GAME', channelId: this.channelId })
	}

	sendKey(key: string): void {
		this.send({ type: 'KEY_DOWN', channelId: this.channelId, key })
	}

	setMuted(muted: boolean): void {
		this.muted = muted
		this.send({ type: 'MUTE_CHANGED', channelId: this.channelId, muted })
	}

	focus(): void {
		this.iframe.focus()
	}

	extractBitmaps(code: string): void {
		this.send({ type: 'EXTRACT_BITMAPS', channelId: this.channelId, code })
	}

	destroy(): void {
		if (this.destroyed) return
		this.stop()
		this.destroyed = true
		window.removeEventListener('message', this.handleWindowMessage)
		this.queuedMessages.length = 0
		if (this.port) {
			this.port.onmessage = null
			this.port.close()
			this.port = null
		}
	}

	private send(message: ParentToSandboxMessage): void {
		if (this.destroyed) return
		if (!this.port) {
			this.queuedMessages.push(message)
			return
		}
		this.port.postMessage(message)
	}

	private handleWindowMessage = (event: MessageEvent): void => {
		if (this.bound || this.destroyed) return
		if (event.source !== this.frameWindow) return
		if (!isSandboxReadyMessage(event.data)) return
		if (event.data.secret !== this.secret) return

		const port = event.ports[0]
		if (!port) return

		this.bound = true
		window.removeEventListener('message', this.handleWindowMessage)

		this.port = port
		port.onmessage = this.handlePortMessage
		port.postMessage({ type: 'INIT', channelId: this.channelId } satisfies ParentToSandboxMessage)
		port.postMessage({ type: 'MUTE_CHANGED', channelId: this.channelId, muted: this.muted } satisfies ParentToSandboxMessage)
		while (this.queuedMessages.length > 0) port.postMessage(this.queuedMessages.shift()!)
		this.options.onReady?.()
	}

	private handlePortMessage = (event: MessageEvent): void => {
		if (!isSandboxToParentMessage(event.data)) return
		if (event.data.channelId !== this.channelId) return

		switch (event.data.type) {
			case 'GAME_ERROR':
				this.options.onError?.(event.data.error)
				break
			case 'CONSOLE_LOG':
			case 'CONSOLE_ERROR':
				this.options.onConsole?.(event.data)
				break
			case 'BITMAPS_CHANGED':
				this.options.onBitmaps?.(event.data.bitmaps)
				break
			case 'SHORTCUT_KEY': {
				const syntheticEvent = new KeyboardEvent('keydown', {
					key: event.data.key,
					code: event.data.code,
					ctrlKey: event.data.ctrlKey,
					metaKey: event.data.metaKey,
					shiftKey: event.data.shiftKey,
					altKey: event.data.altKey,
					bubbles: true,
					cancelable: true,
				})
				window.dispatchEvent(syntheticEvent)
				break
			}
			case 'STOPPED':
				this.options.onStopped?.()
				break
		}
	}
}
