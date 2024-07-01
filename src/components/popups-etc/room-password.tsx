import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import Button from '../design-system/button'
import Input from '../design-system/input'
import styles from './share-room.module.css'
import { PersistenceState } from '../../lib/state'
import { Game } from '../../lib/game-saving/account'
import { useEffect } from 'preact/hooks'

export interface RoomPasswordPopupProps {
	persistenceState: Signal<PersistenceState>
}

export default function RoomPasswordPopup(props: RoomPasswordPopupProps) {
	if(props.persistenceState.value.kind !== "COLLAB") return
	let password = useSignal("");
	function checkPassword() {
		fetch("/api/rooms/check-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ roomId: props.persistenceState.value.game, password: password.value }),
		}).then((res) => {
			if (res.status === 200) {
					res.json().then((game) => {
						if(props.persistenceState.value.kind !== "COLLAB") return
						console.log(game)
						props.persistenceState.value = {
							...props.persistenceState.value,
							game: game as Game,
						}
					}
				)
			}
		});
	}
	useEffect(() => {
		console.log("FJAKFALKF")
	}, [])
	useSignalEffect(() => {
		console.log(password.value)
	})
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
							<Input onChange={() => console.log("A")} value={password.value} bind={password} placeholder='Enter the room password here' />
							<Button accent type='submit' disabled={password.value.length == 0}>
								Enter room
							</Button>
						</div>
					</form>	
			</div>
		</div>
	)
}