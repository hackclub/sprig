import { useEffect } from 'preact/hooks'

export const usePopupCloseClick = (popupClass: string | string[], close: () => void, isVisible: boolean = true) => {
	useEffect(() => {
		if (!isVisible) return () => {}
		const listener = (event: MouseEvent) => {
			if (!Array.isArray(popupClass)) popupClass = [ popupClass ]
			for (const item of event.composedPath()) {
				if (item instanceof HTMLElement && popupClass.some(name => item.classList.contains(name))) return
			}
			close()
		}
		window.addEventListener('click', listener)
		return () => window.removeEventListener('click', listener)
	}, [ isVisible ])
}