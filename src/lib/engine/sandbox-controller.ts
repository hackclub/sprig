import type { NormalizedError } from '../state'
import {
	type ParentToSandboxMessage,
	type SandboxToParentMessage,
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
	destroy(): void
}

const makeChannelId = (): string => {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()

	const bytes = new Uint8Array(16)
	crypto.getRandomValues(bytes)
	return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
}

export class SandboxedGameController implements SandboxedGameControllerHandle {
	private readonly channelId = makeChannelId()
	private readonly frameWindow: Window
	private readonly queuedMessages: ParentToSandboxMessage[] = []
	private ready = false
	private muted = false

	constructor(
		private readonly iframe: HTMLIFrameElement,
		private readonly options: SandboxedGameControllerOptions = {}
	) {
		const frameWindow = iframe.contentWindow
		if (!frameWindow) throw new Error('Sandbox iframe is not ready')
		this.frameWindow = frameWindow
		window.addEventListener('message', this.handleMessage)
	}

	markReady(): void {
		if (this.ready) return
		this.ready = true
		this.post({ type: 'INIT', channelId: this.channelId })
		while (this.queuedMessages.length > 0) this.post(this.queuedMessages.shift()!)
		this.options.onReady?.()
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

	destroy(): void {
		this.stop()
		window.removeEventListener('message', this.handleMessage)
		this.queuedMessages.length = 0
	}

	private send(message: ParentToSandboxMessage): void {
		if (!this.ready) {
			this.queuedMessages.push(message)
			return
		}
		this.post(message)
	}

	private post(message: ParentToSandboxMessage): void {
		// Sandboxed iframes without allow-same-origin have an opaque origin, so
		// targetOrigin must be '*'. The receiving window and channel id are still
		// validated on both sides.
		this.frameWindow.postMessage(message, '*')
	}

	private handleMessage = (event: MessageEvent): void => {
		if (event.source !== this.frameWindow) return
		if (!isSandboxToParentMessage(event.data)) return

		if (event.data.type === 'READY') {
			this.markReady()
			return
		}

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
			case 'STOPPED':
				this.options.onStopped?.()
				break
		}
	}
}
