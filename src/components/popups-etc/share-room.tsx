import { useSignal, useSignalEffect, type Signal } from '@preact/signals'
import { type PersistenceState, type RoomState } from '../../lib/state'
import Button from '../design-system/button'
import Input from '../design-system/input'
import LinkButton from '../design-system/link-button'
import styles from './share-room.module.css'
import { IoClose } from 'react-icons/io5'
import { PersistenceStateKind } from '../../lib/state'

export interface ShareRoomPopupProps {
	roomState: Signal<RoomState>;
	persistenceState: Signal<PersistenceState>
	onClose: () => void
}

export default function ShareRoomPopup(props: ShareRoomPopupProps) {
	var roomLink = "sprig.hackclub.com/~/beta/" + props.roomState?.value.roomId;
	let password = useSignal("");
	let showChangeConfirmation = useSignal(false);

	const openCloseRoom = async (roomId: string, isRoomOpen: boolean) => {
		try {
			const res = await fetch("/api/rooms/change-status", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ roomId, isRoomOpen }),
			});
			if (!res.ok)
				throw new Error(`Error renaming game: ${await res.text()}`);
			if(isRoomOpen){
				const res2 = await fetch("/api/rooms/change-password", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ roomId, password: password.value }),
				});
				if (!res2.ok)
					throw new Error(`Error renaming game: ${await res.text()}`);
			}
		} catch (error) {
			console.error(error);
		}
	}
	
	const onOpenCloseRoom = (
		persistenceState: Signal<PersistenceState>,
		roomOpen: boolean
	) => {
		if (
			persistenceState.value.kind !== PersistenceStateKind.PERSISTED ||
			persistenceState.value.game === "LOADING"
		)
			return;
		openCloseRoom(persistenceState.value.game.id, roomOpen);
		persistenceState.value = {
			...persistenceState.value,
			game: {
				...persistenceState.value.game,
				isRoomOpen: roomOpen,
			},
		};
	};

	useSignalEffect(() => {
		password.value
		showChangeConfirmation.value = true;
		setTimeout(() => {
			showChangeConfirmation.value = false;
		}, 2000);
	})

if (!(props.persistenceState.value.kind == PersistenceStateKind.PERSISTED && props.persistenceState.value.game !== "LOADING" && props.persistenceState.value.game.isRoomOpen)) {
	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>

				<button class={styles.close} onClick={props.onClose}><IoClose /></button> 	


					<div class={styles.stack}>
						<h2>Create a new room</h2>
						<p>
								Create a new room to collaborate with others.
						</p>
					</div>
					<form onSubmit={
						async (event) => {
							event.preventDefault();
							onOpenCloseRoom(props.persistenceState, true);
						}
					}>
						<div class={styles.inputRow}>
							<Input onChange={() => undefined} value={password.value} bind={password} placeholder='Enter a room password here' />
							<Button accent type='submit' disabled={password.value.length == 0}>
								Create Room
							</Button>
						</div>
					</form>	

					<p class={styles.muted}>
						<LinkButton
							onClick={() => {	
								password.value = "";
								onOpenCloseRoom(props.persistenceState, true);
							}}
							
						>Create room without password</LinkButton>
					</p>
			</div>
		</div>
		)

} else {
	return (

		<div class={styles.overlay}>

			<div class={styles.modal}>

			<button class={styles.close} onClick={props.onClose}><IoClose /></button> 	

					<div class={styles.stack}>
						<h2>Share your room</h2>
						<p>
								Send this link to your friends to share your project with them. They'll be able to view and edit it.
						</p>
					</div>
					
					<div class={styles.info}>
						<p>Room ID: {props.roomState?.value.roomId}</p>
						<p>Participants: {props.roomState?.value.participants.length}</p>
					</div>

					<div class={styles.inputRow}>
					<Input onChange={() => undefined} 
					value={roomLink}
					readonly
					/>
					<Button accent type='submit' disabled={false}
					onClick={() => {
   						 navigator.clipboard.writeText(roomLink)}}>
								Copy
							</Button>
					</div>

					
					<form onSubmit={
						async (event) => {
							event.preventDefault();
							onOpenCloseRoom(props.persistenceState, true);
						}
					} class={styles.stack}>
						<div class={styles.inputRow}>
							<Input onChange={() => undefined} value={password.value} bind={password} placeholder='Enter a room password here' />
							<Button accent type='submit' disabled={password.value.length == 0}>
								Change password
							</Button>
						</div>
						<p class={styles.muted}>
							<LinkButton
								onClick={() => {	
									password.value = "";
									onOpenCloseRoom(props.persistenceState, true);
								}}
							>Remove the password from your room</LinkButton>
						</p>
					</form>
			</div>
		</div>
		

		
	)
}
	
}