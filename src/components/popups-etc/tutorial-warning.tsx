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
						<h2>Permanently Close Tutorial?</h2>
						<p>
							Make sure you're finished with this tutorial or don't want to complete it!
							You won't be able to re-open the tutorial. None of your code will be touched.
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
