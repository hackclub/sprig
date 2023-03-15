import { Signal, useSignal } from '@preact/signals'
import { IoLink } from 'react-icons/io5'
import { usePopupCloseClick } from '../../lib/utils/popup-close-click'
import type { PersistenceState } from '../../lib/state'
import Button from '../design-system/button'
import popupStyles from './navbar-popup.module.css'

interface SharePopupProps {
	persistenceState: Signal<PersistenceState>
	onClose: () => void
}

export default function SharePopup(props: SharePopupProps) {
	const loading = useSignal(false)
	const message = useSignal('')
	const shareLink = useSignal('')
	
	usePopupCloseClick(popupStyles.popup!, props.onClose)

	return (
		<div class={popupStyles.popup}>
			<p>Want to share your game? We'll generate a link to a snapshot of your current code.</p>
			<Button loading={loading.value} icon={IoLink} accent onClick={async () => {
				if (props.persistenceState.value.kind !== 'PERSISTED' || props.persistenceState.value.game === 'LOADING') return
				loading.value = true

				try {
					const res = await fetch('/api/games/snapshot', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ gameId: props.persistenceState.value.game.id })
					})
					if (!res.ok) throw new Error(`Error sharing game: ${await res.text()}`)

					const json = await res.json()
					const url = new URL(window.location.href)
					url.pathname = `/share/${json.snapshotId}`

					try {
						await navigator.clipboard.writeText(url.toString())
						message.value = `Share link copied to clipboard!`
					} catch (error) {
						console.warn(error)
						message.value = `Couldn't copy link to clipboard:`
					}
					shareLink.value = url.toString()
				} catch (error) {
					console.error(error)
					message.value = `Unexpected error sharing game!`
					shareLink.value = ''
				}

				loading.value = false
			}}>
				Generate share link
			</Button>

			{message.value ? (
				<p style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
					{message}
				</p>
			) : null}
			{shareLink.value ? (
				<p style={{ color: 'var(--fg-muted)', marginTop: -8, wordBreak: 'break-all' }}>
					{shareLink.value}
				</p>
			) : null}
		</div>
	)
}