import { IoArrowForward } from 'react-icons/io5'
import Button from '../design-system/button'
import styles from './mobile-unsupported.module.css'

export default function MobileUnsupported() {
	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>
				<p>The Sprig editor doesn't work very well on mobile yet. You can still play games shared with you and in the gallery.</p>

				<div class={styles.buttons}>
					<a href='/gallery'>
						<Button accent icon={IoArrowForward} iconSide='right'>
							Open gallery
						</Button>
					</a>
				</div>
			</div>
		</div>
	)
}