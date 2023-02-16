import type { Signal } from '@preact/signals'
import type { PersistenceState } from '../../lib/state'
import popupStyles from './navbar-popup.module.css'

interface SharePopupProps {
	persistenceState: Signal<PersistenceState>
}

export default function SharePopup(props: SharePopupProps) {
	return (
		<div class={popupStyles.popup}>
			yo yo YOOO time to share your sick game my bestie (can you tell this is unimplemented?)
		</div>
	)
}