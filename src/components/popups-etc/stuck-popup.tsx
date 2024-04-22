import { Signal, useSignal } from "@preact/signals";
import {
	PersistenceState,
	codeMirror,
	editSessionLength,
	errorLog,
} from "../../lib/state";
import Button from "../design-system/button";
import Textarea from "../design-system/textarea";
import styles from "../navbar.module.css";

interface StuckPopupProps {
	persistenceState: Signal<PersistenceState>;
	showStuckPopup: Signal<boolean>;
	showAiModal: Signal<boolean>;
	aiContent: Signal<{ code: string; description: string }>;
}

type StuckCategory = "Logic Error" | "Syntax Error" | "Other";

type StuckData = {
	category: StuckCategory;
	description: string;
};

export default function StuckPopup(props: StuckPopupProps) {
	// we will accept the current user's
	// - name,
	// - the category of issue they
	// - their description of the issue
	const stuckData = useSignal<StuckData>({
		category: "Other",
		description: "",
	});
	// keep track of the submit status for "I'm stuck" requests
	const isSubmitting = useSignal<boolean>(false);

	return (
		<>
			<div class={styles.stuckPopup}>
				<form
					class={styles.stuckForm}
					onSubmit={async (event) => {
						event.preventDefault(); // prevent the browser from reloading after form submit

						isSubmitting.value = true;

						// 'from' and 'to' represent the index of character where the selection is started to where it's ended
						// if 'from' and 'to' are equal, then it's the cursor position
						// from && to being -1 means the cursor is not in the editor
						const selectionRange = codeMirror.value?.state.selection
							.ranges[0] ?? { from: -1, to: -1 };

						// Store a copy of the user's code, currently active errors and the length of their editing session
						// along with their description of the issue
						const payload = {
							selection: JSON.stringify({
								from: selectionRange.from,
								to: selectionRange.to,
							}),
							email: props.persistenceState.value.session?.user
								.email,
							code: codeMirror.value?.state.doc.toString(),
							error: errorLog.value,
							sessionLength:
								(new Date().getTime() -
									editSessionLength.value.getTime()) /
								1000, // calculate the session length in seconds
							...stuckData.value,
						};

						try {
							const response = await fetch("/api/generate-ai", {
								method: "POST",
								body: JSON.stringify(payload),
							});
							// Let the user know we'll get back to them after we've receive their complaint
							if (response.ok) {
								const data = await response.json();
								props.aiContent.value.code = data.code;
								props.aiContent.value.description =
									data.description;
								props.showStuckPopup.value = false;
								props.showAiModal.value = true;
							} else
								alert(
									"We couldn't send your request. Please make sure you're connected and try again."
								);
						} catch (err) {
							console.error(err);
						} finally {
							isSubmitting.value = false;
						}
					}}
				>
					<label htmlFor="issue category">
						What is the type of issue you're facing?
					</label>
					<select
						value={stuckData.value.category}
						onChange={(event) => {
							stuckData.value = {
								...stuckData.value,
								category: (event.target! as HTMLSelectElement)
									.value as StuckCategory,
							};
						}}
						name=""
						id=""
					>
						<option value={"Logic Error"}>Logic Error</option>
						<option value={"Syntax Error"}>Syntax Error</option>
						<option value={"Other"}>Other</option>
					</select>
					<label htmlFor="Description">
						Please describe the issue you're facing below
					</label>
					<Textarea
						required
						value={stuckData.value.description}
						onChange={(event) => {
							stuckData.value = {
								...stuckData.value,
								description: event.target.value,
							};
						}}
						placeholder="Example: After 2 seconds, the browser tab suddenly freezes and I do not know why."
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "1rem",
						}}
					>
						<Button type="submit" disabled={isSubmitting.value}>
							Get Help
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
