import type { Signal } from "@preact/signals";
import { persist, useAuthHelper } from "../../lib/game-saving/auth-helper";
import { useNeedsManualMigration } from "../../lib/game-saving/legacy-migration";
import type { PersistenceState } from "../../lib/state";
import LinkButton from "../design-system/link-button";
import styles from "./draft-warning.module.css";
import { useEffect } from "preact/hooks";
import tinykeys from "tinykeys";

export interface DraftWarningModalProps {
	persistenceState: Signal<PersistenceState>;
	showAiModal: Signal<boolean>;
}

export default function AiDiffModal(props: DraftWarningModalProps) {
	const auth = useAuthHelper("EMAIL_ENTRY");
	const needsManualMigration = useNeedsManualMigration();

	useEffect(
		() =>
			tinykeys(window, {
				Escape: () => (props.showAiModal.value = false),
			}),
		[]
	);

	return (
		<div class={styles.overlay}>
			<div class={styles.modal}>
				{needsManualMigration.value ? (
					<div class={styles.warning}>
						<strong>Where did my games go?</strong> If you've used
						Sprig before on this browser, you may want to{" "}
						<a href="/migrate">migrate your games</a>.
					</div>
				) : null}

				<div class={styles.stack}>
					<h2>Start building right away</h2>
					<p>
						Enter your email and we will save your code and send you
						a link. We'll never use this for marketing purposes.
					</p>
				</div>

				<form
					onSubmit={async (event) => {
						event.preventDefault();
						await auth.submitEmail();
						if (auth.state.value === "EMAIL_INCORRECT")
							persist(props.persistenceState, auth.email.value);
					}}
					class={styles.stack}
				>
					<p class={styles.muted}>
						<LinkButton
							onClick={() => {
								if (
									props.persistenceState.value.kind !==
									"IN_MEMORY"
								)
									return;
								props.persistenceState.value = {
									...props.persistenceState.value,
									showInitialWarning: false,
								};
							}}
							disabled={auth.isLoading.value}
						>
							or continue without saving your work
						</LinkButton>
					</p>
				</form>
			</div>
		</div>
	);
}
