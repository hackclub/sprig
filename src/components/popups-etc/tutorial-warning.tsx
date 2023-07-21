import { Signal } from '@preact/signals'
import Button from '../design-system/button'
import styles from './tutorial-warning.module.css'

export interface TutorialWarningModalProps {
	showingTutorialWarning: Signal<boolean>
	exitTutorial: () => void
}

export default function TutorialWarningModal(props: TutorialWarningModalProps) {
	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>
					<div class={styles.stack}>
						<h2>Are you sure?</h2>
						<p>
							Your code will be saved and will be accessible to you.
							Only the tutorial tab will be removed and cannot be restored.
						</p>
					</div>

					<div class={styles.inputRow}>
						<Button onClick={() => {
							props.showingTutorialWarning.value = false
						}}>
							Cancel
						</Button>
						<Button accent onClick={() => {
							props.exitTutorial()
							props.showingTutorialWarning.value = false
						}}>
							End tutorial
						</Button>
					</div>
			</div>
		</div>

	)
}
