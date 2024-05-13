import Button from '../design-system/button';
import styles from './session-conflict-warning.module.css';
import { showSaveConflictModal, continueSaving } from '../../lib/state';

interface SessionConflictWarningModalProps {
    sessionId: string;
	gameId: string;
}

export default function SessionConflictWarningModal({ sessionId, gameId }: SessionConflictWarningModalProps) {
    const close = () => {
        showSaveConflictModal.value = false;
    };

	const handleOverwrite = () => {
		localStorage.setItem('lastSavedSessionId', JSON.stringify({ sessionId, gameId: gameId }));
		console.log(localStorage.getItem('lastSavedSessionId'));
		showSaveConflictModal.value = false;
		continueSaving.value = true;
	};	

    return (
        <div className={styles.overlay} style={{ display: showSaveConflictModal.value ? 'flex' : 'none' }}>
            <div className={styles.modal}>
                <h2>Session Conflict!</h2>
                <p>
                    It seems you have another session open with changes. Would you like to overwrite the changes from the other session or reload to retrieve those changes to this tab?
                </p>
                <div className={styles.buttonGroup}>
                    <Button onClick={close}>Cancel</Button>
                    <Button accent onClick={handleOverwrite}>Overwrite</Button>
                    <Button accent onClick={() => {
                        window.location.reload();
                    }}>Reload</Button>
                </div>
            </div>
        </div>
    );
}