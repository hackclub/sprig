import type { Signal } from '@preact/signals'
import { persist, useAuthHelper } from '../../lib/game-saving/auth-helper'
import { useNeedsManualMigration } from '../../lib/game-saving/legacy-migration'
import type { PersistenceState, RoomState } from '../../lib/state'
import Button from '../design-system/button'
import Input from '../design-system/input'
import LinkButton from '../design-system/link-button'
import styles from './share-room.module.css'
<<<<<<< HEAD
=======
import { IoClose } from 'react-icons/io5'

>>>>>>> baf2326542f189a9aff3005de6d042f5c21c2b4f



const conditional = false; //This conditional need to be if there has been a room created or not

<<<<<<< HEAD


export interface ShareRoomPopup {
	roomState?: Signal<RoomState>;
	persistenceState: Signal<PersistenceState>
}

export default function ShareRoomPopup(props: ShareRoomPopup) {
	const needsManualMigration = useNeedsManualMigration()
if (conditional) {
	return (

		<div class={styles.overlay}>
			<div class={styles.modal}>
=======
export interface ShareRoomPopupProps {
	roomState: Signal<RoomState> | undefined;
	persistenceState: Signal<PersistenceState>
	onClose: () => void
}


export default function ShareRoomPopup(props: ShareRoomPopupProps) {
	const needsManualMigration = useNeedsManualMigration()
	var roomLink = "sprig.hackclub.com/~/beta/" + props.roomState?.value.roomId;

if (conditional) {
	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>

				<button class={styles.close} onClick={props.onClose}><IoClose /></button> 	


>>>>>>> baf2326542f189a9aff3005de6d042f5c21c2b4f
					<div class={styles.stack}>
						<h2>Create a new room</h2>
						<p>
								Create a new room to collaborate with others.
						</p>
					</div>

					<form onSubmit={async (event) => {
						
					}} class={styles.stack}>
						<div class={styles.inputRow}>
							<Input onChange={() => undefined} value = {""} placeholder='Enter a room password here' />
							<Button accent type='submit' disabled={false}>
								Create Room
							</Button>
						</div>

						<p class={styles.muted}>
							<LinkButton
								onClick={() => {
									if (props.persistenceState.value.kind !== 'IN_MEMORY') return
									props.persistenceState.value = {
										...props.persistenceState.value,
										showInitialWarning: false
									}

								}}
								
							>Create room without password</LinkButton>
						</p>
					</form>
			</div>
		</div>
		)

} else {
	return (

		<div class={styles.overlay}>
<<<<<<< HEAD
			<div class={styles.modal}>
=======

			<div class={styles.modal}>

			<button class={styles.close} onClick={props.onClose}><IoClose /></button> 	

>>>>>>> baf2326542f189a9aff3005de6d042f5c21c2b4f
					<div class={styles.stack}>
						<h2>Share your room</h2>
						<p>
								Send this link to your friends to share your project with them. They'll be able to view and edit it.
						</p>
					</div>
<<<<<<< HEAD

=======
					
>>>>>>> baf2326542f189a9aff3005de6d042f5c21c2b4f
					<div class={styles.info}>
						<p>Room ID: {props.roomState?.value.roomId}</p>
						<p>Participants: {props.roomState?.value.participants.length}</p>
						<p>Room Password: {props.roomState?.value.password}</p>	
					</div>

					<div class={styles.inputRow}>
					<Input onChange={() => undefined} 
<<<<<<< HEAD
					value="www.example.com" 
=======
					value={roomLink}
>>>>>>> baf2326542f189a9aff3005de6d042f5c21c2b4f
					readonly
					/>
					<Button accent type='submit' disabled={false}
					onClick={() => {
<<<<<<< HEAD
						const textToCopy = "www.example.com";
   						 navigator.clipboard.writeText(textToCopy)
    					  .then(() => {
      						  console.log('Text copied to clipboard');
     						 })
     					 .catch(err => {
       						 console.error('Failed to copy text: ', err);
   						   });
						}}>
=======
   						 navigator.clipboard.writeText(roomLink)}}>
>>>>>>> baf2326542f189a9aff3005de6d042f5c21c2b4f
								Copy
							</Button>
					</div>

					
					<form onSubmit={async (event) => {
						
					}} class={styles.stack}>
						<div class={styles.inputRow}>
							<Input onChange={() => undefined} value={""} placeholder='Enter a room password here'/> 
							

							<Button accent type='submit' disabled={false}>
								Change Password
							</Button>
						</div>




						<p class={styles.muted}>
							<LinkButton
								onClick={() => {	
<<<<<<< HEAD
								//closes the popup
								
=======
									//Cosmin implements removing password from room
>>>>>>> baf2326542f189a9aff3005de6d042f5c21c2b4f

								}}
							>Remove the password from your room</LinkButton>
						</p>
					</form>
			</div>
		</div>
		

		
	)
}
	
}