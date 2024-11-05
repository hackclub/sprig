import { Signal, useSignal } from '@preact/signals'
import Button from '../design-system/button'
import Input from '../design-system/input'
import styles from './share-room.module.css'
import { PersistenceState } from '../../lib/state'
import { Game } from '../../lib/game-saving/account'
import { PersistenceStateKind } from '../../lib/state'
import { useEffect } from 'preact/hooks'

export interface RoomPasswordPopupProps {
	persistenceState: Signal<PersistenceState>
}

export default function RoomPasswordPopup(props: RoomPasswordPopupProps) {
	let password = useSignal("");
	let isWrong = useSignal(false);
	function checkPassword(noPassCheck = false) {
		if(props.persistenceState.value.kind !== PersistenceStateKind.COLLAB) return
		fetch("/api/rooms/check-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ roomId: props.persistenceState.value.game, password: password.value }),
		}).then((res) => {
			if (res.status === 200) {
					res.json().then((game) => {
						if(props.persistenceState.value.kind !== PersistenceStateKind.COLLAB) return
						props.persistenceState.value = {
							...props.persistenceState.value,
							game: game as Game,
						}
					}
				)
			} else {
				isWrong.value = !noPassCheck;
			}
		});
	}
	useEffect(() => checkPassword(true), [])
	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>
					<div class={styles.stack}>
						<h2>Enter the room</h2>
						<p>
								Enter the room's password to access it.
						</p>
					</div>
					<form onSubmit={
						async (event) => {
							event.preventDefault();
							checkPassword()
						}
					}>
						<div class={styles.inputRow}>
							<Input onChange={() => undefined} value={password.value} bind={password} placeholder='Enter the room password here' />
							<Button accent type='submit'>
								Enter room
							</Button>
						</div>
					</form>
					{isWrong.value && <p className={styles.error}>Incorrect password!</p>}
			</div>
		</div>
	)
}