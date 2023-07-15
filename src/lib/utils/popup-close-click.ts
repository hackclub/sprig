import { useEffect } from 'preact/hooks'
import { leftDown } from './events'

export const usePopupCloseClick = (popupClass: string | string[], close: () => void, isVisible: boolean = true) => {
	useEffect(() => {
		if (!isVisible) return () => {}

		const isValid = (event: MouseEvent): boolean => {
			if (!Array.isArray(popupClass)) popupClass = [ popupClass ]
			for (const item of event.composedPath()) {
				if (item instanceof HTMLElement && popupClass.some(name => item.classList.contains(name))) return false
			}
			return true
		}
		
		let validDown = false
		const downListener = (event: MouseEvent) => {
			if (leftDown(event)) validDown = isValid(event)
		}

		const clickListener = (event: MouseEvent) => {
			if (isValid(event) && validDown) {
				close()
				validDown = false
			}
		}

		window.addEventListener('mousedown', downListener)
		window.addEventListener('click', clickListener)

		return () => {
			window.removeEventListener('mousedown', downListener)
			window.removeEventListener('click', clickListener)
		}
	}, [ isVisible ])
}