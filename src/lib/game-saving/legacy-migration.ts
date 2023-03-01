export const getPuzzleLabFromLocalStorage = (): Promise<string> => new Promise((resolve) => {
	if (window.localStorage.getItem('puzzleLab'))
		resolve(window.localStorage.getItem('puzzleLab')!)

	let iframe: HTMLIFrameElement
	const listener = (event: MessageEvent<unknown>) => {
		if (event.data
		&& typeof event.data === 'object'
		&& 'sprig' in event.data 
		&& event.data.sprig === true
		&& 'puzzleLab' in event.data
		&& typeof event.data.puzzleLab === 'string'
		) {
			if (iframe) iframe.remove()
			window.removeEventListener('message', listener)
			resolve(event.data.puzzleLab)
		}
	}
	window.addEventListener('message', listener)
	iframe = document.createElement('iframe')
	iframe.src = 'https://editor.sprig.hackclub.com/migration-helper.html'
	iframe.style.display = 'none'
	document.body.appendChild(iframe)
})