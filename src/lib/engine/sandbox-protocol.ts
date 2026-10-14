import type { NormalizedError } from '../state'

export type SerializableLogArg = string | number | boolean | null

export type ParentToSandboxMessage =
	| { type: 'INIT', channelId: string }
	| { type: 'RUN_GAME', channelId: string, code: string, muted: boolean }
	| { type: 'STOP_GAME', channelId: string }
	| { type: 'KEY_DOWN', channelId: string, key: string }
	| { type: 'MUTE_CHANGED', channelId: string, muted: boolean }

export type SandboxToParentMessage =
	| { type: 'READY' }
	| { type: 'STOPPED', channelId: string }
	| { type: 'GAME_ERROR', channelId: string, error: NormalizedError }
	| { type: 'CONSOLE_LOG', channelId: string, args: SerializableLogArg[], nums: number[], isErr: false }
	| { type: 'CONSOLE_ERROR', channelId: string, args: SerializableLogArg[], nums: number[], isErr: true }
	| { type: 'BITMAPS_CHANGED', channelId: string, bitmaps: [string, string][] }

export const isParentToSandboxMessage = (value: unknown): value is ParentToSandboxMessage => {
	if (!value || typeof value !== 'object') return false

	const message = value as Record<string, unknown>
	if (typeof message.type !== 'string') return false

	if (message.type === 'INIT') return typeof message.channelId === 'string'
	if (typeof message.channelId !== 'string') return false

	switch (message.type) {
		case 'RUN_GAME':
			return typeof message.code === 'string' && typeof message.muted === 'boolean'
		case 'STOP_GAME':
			return true
		case 'KEY_DOWN':
			return typeof message.key === 'string'
		case 'MUTE_CHANGED':
			return typeof message.muted === 'boolean'
		default:
			return false
	}
}

export const isSandboxToParentMessage = (value: unknown): value is SandboxToParentMessage => {
	if (!value || typeof value !== 'object') return false

	const message = value as Record<string, unknown>
	if (message.type === 'READY') return true
	if (typeof message.type !== 'string' || typeof message.channelId !== 'string') return false

	switch (message.type) {
		case 'STOPPED':
			return true
		case 'GAME_ERROR':
			return !!message.error && typeof message.error === 'object'
		case 'CONSOLE_LOG':
			return Array.isArray(message.args) && Array.isArray(message.nums) && message.isErr === false
		case 'CONSOLE_ERROR':
			return Array.isArray(message.args) && Array.isArray(message.nums) && message.isErr === true
		case 'BITMAPS_CHANGED':
			return Array.isArray(message.bitmaps)
		default:
			return false
	}
}
