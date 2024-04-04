import type { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import tinykeys from "tinykeys";
import type { PersistenceState } from "../../lib/state";
import Button from "../design-system/button";
import styles from "./ai-diff.module.css";

export interface AiDiffModalProps {
	persistenceState: Signal<PersistenceState>;
	showAiModal: Signal<boolean>;
	aiContent: Signal<{ code: string; description: string }>;
}

export default function AiDiffModal(props: AiDiffModalProps) {
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
				<div class={styles.stack}>
					<div class={styles.colContainer}>
						<div class={styles.section}>
							<h3>Your code</h3>
							<div class={styles.code}>
								<pre>
									<code>
										{`import { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
	const payload = await request.json();

	const data = {
		Selection: payload.selection,
		Email: payload.email,
		"Error Log": JSON.stringify(payload.error),
		"Session Length": payload.sessionLength,
		Code: payload.code,
		Category: payload.category,
		Description: payload.description,
	};

	// GENERATE AI HERE

	const response = {
		content: "Some AI generated content",
	};

	return new Response(JSON.stringify(response), { status: 200 });
};`}
									</code>
								</pre>
							</div>
						</div>
						<div class={styles.section}>
							<h3>Suggested code</h3>
							<div class={styles.code}>
								<pre>
									<code>{props.aiContent.value.code}</code>
								</pre>
							</div>
						</div>
					</div>
					<p>Description: {props.aiContent.value.description}</p>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							width: "100%",
						}}
					>
						<Button accent>Accept</Button>
						<Button
							class={styles.rejectBtn}
							onClick={() => (props.showAiModal.value = false)}
						>
							Reject
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
