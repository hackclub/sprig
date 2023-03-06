import { Signal, useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { IoOpenOutline } from 'react-icons/io5'
import { getPuzzleLabFromLocalStorage } from '../../lib/game-saving/legacy-migration'
import { PersistenceState } from '../../lib/state'
import Button from '../design-system/button'
import styles from './migrate-toast.module.css'

interface MigrateToastProps {
	persistenceState?: Signal<PersistenceState>
}

export default function MigrateToast(props: MigrateToastProps) {
	const showPopup = useSignal(false)

	useEffect(() => {
		if (localStorage.getItem('seenMigration') !== 'true') {
			getPuzzleLabFromLocalStorage(false).then(data => {
				if (data.length > 0) showPopup.value = true
			})
		}
	}, [])

	if (!showPopup.value) return null
	return (
		<div className={styles.container}>
			<p>You have some games from the old Sprig editor! Would you like to copy them to an account?</p>

			<div class={styles.buttons}>
				<Button accent icon={IoOpenOutline} iconSide='right' class={styles.bold} onClick={() => {
					localStorage.setItem('seenMigration', 'true')
					showPopup.value = false
					if (props.persistenceState?.value.kind === 'IN_MEMORY' && props.persistenceState.value.showInitialWarning) {
						window.location.assign('/migrate')
					} else {
						window.open('/migrate', '_blank')
					}
				}}>
					Migrate
				</Button>
				<Button onClick={() => {
					localStorage.setItem('seenMigration', 'true')
					showPopup.value = false
				}}>
					Later
				</Button>
			</div>
		</div>
	)
}