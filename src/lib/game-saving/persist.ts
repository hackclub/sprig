import type { Signal } from '@preact/signals'
import type { Game, SessionInfo } from './account-types'
import { codeMirror, type PersistenceState, PersistenceStateKind } from '../state'
import { executeCaptcha } from '../recaptcha'

export const persist = async (persistenceState: Signal<PersistenceState>, email?: string) => {
	const isShared = persistenceState.value.kind === 'SHARED'
	const gameName: string | undefined = persistenceState.value.kind === 'SHARED' ? persistenceState.value.name : undefined
	const tutorialName = persistenceState.value.kind === 'SHARED' ? persistenceState.value.tutorialName : undefined
	const tutorial = persistenceState.value.kind === 'SHARED' ? persistenceState.value.tutorial : undefined
	const tutorialIndex = persistenceState.value.kind === 'SHARED' ? persistenceState.value.tutorialIndex : undefined
	persistenceState.value = {
		kind: PersistenceStateKind.PERSISTED,
		cloudSaveState: 'SAVING',
		game: 'LOADING',
		stale: persistenceState.value.stale,
		session: persistenceState.value.session,
		tutorial: tutorial,
		tutorialIndex: tutorialIndex
	}

	try {
		const recaptchaToken = await executeCaptcha('PERSIST_GAME')

		const res = await fetch('/api/games/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				partialSessionEmail: email,
				code: codeMirror.value?.state.doc.toString() ?? '',
				name: gameName,
				tutorialName,
				tutorialIndex,
				recaptchaToken
			})
		})
		if (!res.ok) throw new Error(await res.text())
		const { game, sessionInfo } = await res.json() as { game: Game, sessionInfo: SessionInfo }
		if (!isShared) document.cookie = `sprigTempGame=${game.id};path=/;max-age=${60 * 60 * 24 * 365}`

		if (persistenceState.value.kind === 'PERSISTED')
			persistenceState.value = {
				...persistenceState.value,
				cloudSaveState: 'SAVED',
				game,
				session: sessionInfo
			}
		
		window.history.replaceState(null, '', `/~/${game.id}`)
	} catch (error) {
		console.error(error)
		if (persistenceState.value.kind === 'PERSISTED')
			persistenceState.value = {
				...persistenceState.value,
				cloudSaveState: 'ERROR'
			}
	}
}
