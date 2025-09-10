import Button from '../design-system/button'
import styles from './draft-warning.module.css'
import {VersionState} from "../../lib/upload";
import {Signal} from "@preact/signals";

export default function VersionWarningModal({ versionState }: {versionState: Signal<VersionState>}) {
	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>
					<div class={styles.stack}>
						{versionState.value == "LEGACY"
						&& <h2>Your console is running a legacy version of Sprig.<br/>Please update to continue.</h2>
						}
						{versionState.value == "OLD"
						&& <h2>Your console is running an old version of Sprig.<br/>You may encounter unexpected behavior.</h2>}

						<div  style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
							<div>
							<a href="https://hack.club/sprig-upload"><Button accent={true}>Update Console</Button></a>
							</div>
							<div>
						<Button onClick={() => {
							versionState.value = "OK"
						}}>Exit</Button>
							</div>
						</div>
					</div>
		</div>
		</div>
	)
}