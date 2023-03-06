export const getPuzzleLabFromLocalStorage = (allowRedirect: boolean): Promise<string> => new Promise((resolve) => {
	const params = new URLSearchParams(window.location.search)
	if (params.get('puzzleLab') !== null) return resolve(params.get('puzzleLab')!)
	
	// const helperUrl = 'http://localhost:3001/migration-helper.html'
	const helperUrl = 'https://editor.sprig.hackclub.com/migration-helper.html'

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