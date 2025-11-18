import { type Signal, useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
	
// const helperUrl = 'http://localhost:3001/migration-helper.html'
const helperUrl = 'https://editor.sprig.hackclub.com/migration-helper.html'

export const getPuzzleLabFromLocalStorage = (allowRedirect: boolean): Promise<string> => new Promise((resolve) => {
	if (sessionStorage.getItem('migratedPuzzleLab')) {
		const puzzleLab = sessionStorage.getItem('migratedPuzzleLab')!
		sessionStorage.removeItem('migratedPuzzleLab')
		return resolve(puzzleLab)
	}

	// Query param is deprecated or something, we should maybe eventually remove it.
	// 
	// (For context, before sessionStorage and a POST redirect was used, the value
	// was passed as a query param.)
	const params = new URLSearchParams(window.location.search)
	if (params.get('puzzleLab') !== null) {
		// Remove the query param, it's cleaner for the user and means
		// reloading the page refreshes the localStorage data.
		const url = new URL(window.location.toString())
		url.searchParams.delete('puzzleLab')
		history.replaceState({}, '', url.toString())

		return resolve(params.get('puzzleLab')!)
	}

	let iframe: HTMLIFrameElement
	const listener = (event: MessageEvent<unknown>) => {
		if (event.data
		&& typeof event.data === 'object'
		&& 'sprig' in event.data 
		&& event.data.sprig === true
		&& 'puzzleLab' in event.data
		&& typeof event.data.puzzleLab === 'string'
		&& 'storageAccessDenied' in event.data
		&& typeof event.data.storageAccessDenied === 'boolean'
		) {
			if (iframe) iframe.remove()
			window.removeEventListener('message', listener)

			if (event.data.storageAccessDenied) {
				// document.requestStorageAccess() errored in the frame, we need to
				// redirect through the helper to get data.
				if (!allowRedirect) {
					console.warn('Storage access denied, but a redirect would be bad for UX')
					return resolve('')
				}
				const parsedHelperUrl = new URL(helperUrl)
				parsedHelperUrl.searchParams.set('redirect', window.location.href.toString())
				window.location.replace(parsedHelperUrl.toString())
			} else {
				resolve(event.data.puzzleLab)
			}
		}
	}
	window.addEventListener('message', listener)
	iframe = document.createElement('iframe')
	iframe.src = helperUrl
	iframe.style.display = 'none'
	document.body.appendChild(iframe)
})

export const useNeedsManualMigration = (): Signal<boolean> => {
	const needsManualMigration = useSignal(false)

	useEffect(() => {
		let iframe: HTMLIFrameElement
		const listener = (event: MessageEvent<unknown>) => {
			if (event.data
			&& typeof event.data === 'object'
			&& 'sprig' in event.data 
			&& event.data.sprig === true
			&& 'storageAccessDenied' in event.data
			&& typeof event.data.storageAccessDenied === 'boolean'
			) {
				if (iframe) iframe.remove()
				window.removeEventListener('message', listener)
				needsManualMigration.value = event.data.storageAccessDenied
			}
		}
		window.addEventListener('message', listener)
		iframe = document.createElement('iframe')
		iframe.src = helperUrl
		iframe.style.display = 'none'
		document.body.appendChild(iframe)

		return () => {
			if (iframe) iframe.remove()
			window.removeEventListener('message', listener)
		}
	}, [])

	return needsManualMigration
}