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
          <h2 style={{ textAlign: 'center' }}>Oops, there's a hiccup!</h2>
          <p style={{ textAlign: 'left' }}>
            It seems like your game upload to Sprig might have stalled. This can occasionally happen due to connection issues.
          </p>
          <p style={{ textAlign: 'left' }}>
            Try reconnecting your Sprig device and then reload this page. In most cases, this will resolve the issue and you can continue where you left off.
          </p>
        </div>
        <div class={styles.stack} style={{ textAlign: 'left' }}>
          <Button accent onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
}