import type { NormalizedError } from '../state'
import { runGame } from '.'
import {
	type ParentToSandboxMessage,
	type SandboxToParentMessage,
	type SerializableLogArg,
	isParentToSandboxMessage,
} from './sandbox-protocol'

const canvas = document.getElementById('sprig-sandbox-screen') as HTMLCanvasElement | null

if (!canvas) throw new Error('Missing Sprig sandbox canvas')

let channelId: string | null = null
let cleanup: (() => void) | undefined
let isMuted = false

const serializeError = (error: NormalizedError): NormalizedError => ({
	description: error.description,
	line: error.line,
	column: error.column,
	raw: error.raw instanceof Error
		? {
			name: error.raw.name,
			message: error.raw.message,
			stack: error.raw.stack,
		}
		: String(error.raw),
})

const serializeLogArg = (arg: unknown): SerializableLogArg => {
	if (arg === null) return null
	if (['string', 'number', 'boolean'].includes(typeof arg)) return arg as SerializableLogArg

	try {
		return JSON.stringify(arg)
	} catch {
		return String(arg)
	}
}

const post = (message: SandboxToParentMessage): void => {
	window.parent.postMessage(message, '*')
}

const stopGame = (): void => {
	cleanup?.()
	cleanup = undefined
	if (channelId) post({ type: 'STOPPED', channelId })
}

const run = (message: Extract<ParentToSandboxMessage, { type: 'RUN_GAME' }>): void => {
	stopGame()
	isMuted = message.muted

	const result = runGame(
		message.code,
		canvas,
		(error) => post({ type: 'GAME_ERROR', channelId: message.channelId, error: serializeError(error) }),
		{
			onConsole: ({ args, nums, isErr }) => post({
				type: isErr ? 'CONSOLE_ERROR' : 'CONSOLE_LOG',
				channelId: message.channelId,
				args: args.map(serializeLogArg),
				nums,
				isErr,
			}),
			onBitmaps: (bitmaps) => post({ type: 'BITMAPS_CHANGED', channelId: message.channelId, bitmaps }),
			isMuted: () => isMuted,
		}
	)

	canvas.focus()
	cleanup = result?.cleanup
	if (result?.error) post({ type: 'GAME_ERROR', channelId: message.channelId, error: serializeError(result.error) })
}

window.addEventListener('message', (event) => {
	if (event.source !== window.parent) return
	if (!isParentToSandboxMessage(event.data)) return

	const message = event.data
	if (message.type === 'INIT') {
		channelId = message.channelId
		return
	}

	if (!channelId || message.channelId !== channelId) return

	switch (message.type) {
		case 'RUN_GAME':
			run(message)
			break
		case 'STOP_GAME':
			stopGame()
			break
		case 'KEY_DOWN':
			canvas.dispatchEvent(new KeyboardEvent('keydown', { key: message.key }))
			break
		case 'MUTE_CHANGED':
			isMuted = message.muted
			break
	}
})

post({ type: 'READY' })
