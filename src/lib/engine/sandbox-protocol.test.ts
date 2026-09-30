import { expect, test } from 'vitest'
import { isParentToSandboxMessage, isSandboxToParentMessage } from './sandbox-protocol'

test('validates parent to sandbox messages', () => {
	expect(isParentToSandboxMessage({ type: 'RUN_GAME', channelId: 'abc', code: 'setMap(map``)', muted: false })).toBe(true)
	expect(isParentToSandboxMessage({ type: 'KEY_DOWN', channelId: 'abc', key: 'w' })).toBe(true)
	expect(isParentToSandboxMessage({ type: 'RUN_GAME', channelId: 'abc', muted: false })).toBe(false)
	expect(isParentToSandboxMessage({ type: 'MUTE_CHANGED', channelId: 'abc', muted: 'false' })).toBe(false)
	expect(isParentToSandboxMessage({ type: 'NAVIGATE_TOP', channelId: 'abc' })).toBe(false)
})

test('validates sandbox to parent messages', () => {
	expect(isSandboxToParentMessage({ type: 'READY' })).toBe(true)
	expect(isSandboxToParentMessage({
		type: 'GAME_ERROR',
		channelId: 'abc',
		error: { raw: 'Error: no', description: 'Error: no' },
	})).toBe(true)
	expect(isSandboxToParentMessage({ type: 'CONSOLE_LOG', channelId: 'abc', args: ['hi'], nums: [1, 2], isErr: false })).toBe(true)
	expect(isSandboxToParentMessage({ type: 'CONSOLE_LOG', channelId: 'abc', args: ['hi'], nums: [1, 2], isErr: true })).toBe(false)
	expect(isSandboxToParentMessage({ type: 'OPEN_POPUP', channelId: 'abc' })).toBe(false)
})
