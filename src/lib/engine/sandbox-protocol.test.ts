import { expect, test } from 'vitest'
import { isParentToSandboxMessage, isSandboxToParentMessage, serializeLogArg } from './sandbox-protocol'

test('validates parent to sandbox messages', () => {
	expect(isParentToSandboxMessage({ type: 'RUN_GAME', channelId: 'abc', code: 'setMap(map``)', muted: false })).toBe(true)
	expect(isParentToSandboxMessage({ type: 'KEY_DOWN', channelId: 'abc', key: 'w' })).toBe(true)
	expect(isParentToSandboxMessage({ type: 'EXTRACT_BITMAPS', channelId: 'abc', code: 'setLegend([p, bitmap``])' })).toBe(true)
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
	expect(isSandboxToParentMessage({ type: 'SHORTCUT_KEY', channelId: 'abc', key: 'Enter', ctrlKey: false, metaKey: true, shiftKey: false, altKey: false })).toBe(true)
	expect(isSandboxToParentMessage({ type: 'OPEN_POPUP', channelId: 'abc' })).toBe(false)
})

test('serializes console log arguments safely', () => {
	expect(serializeLogArg('hello')).toBe('hello')
	expect(serializeLogArg(42)).toBe(42)
	expect(serializeLogArg(true)).toBe(true)
	expect(serializeLogArg(null)).toBe(null)
	expect(serializeLogArg(undefined)).toBe('undefined')
	expect(serializeLogArg({ a: 1 })).toBe('{"a":1}')
	expect(serializeLogArg(() => {})).toContain('() =>')
})
