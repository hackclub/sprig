import { Signal } from '@preact/signals';
import Button from '../design-system/button'
import styles from './draft-warning.module.css'

export interface UploadWarningModalProps {
  showWarning: Signal<boolean>;
}

export default function UploadWarningModal(props: UploadWarningModalProps) {
  return (
    <div class={styles.overlay} style={{ display: props.showWarning.value ? 'block' : 'none' }}>
      <div class={styles.modal}>
        <div class={styles.stack}>
          <h2>Oops, there's a hiccup!</h2>
          <p>
            It seems like your game upload to Sprig might have stalled. This can occasionally happen due to connection issues.
          </p>
          <p>
            Try reconnecting your Sprig device and then reload this page. In most cases, this will resolve the issue and you can continue where you left off.
          </p>
        </div>
        <div class={styles.stack}>
          <Button accent onClick={() => window.location.reload()}>
            Reload Page
          </Button>
          <p class={styles.muted}>If this doesn't solve the problem, please check your internet connection or try again later.</p>
        </div>
      </div>
    </div>
  )
}