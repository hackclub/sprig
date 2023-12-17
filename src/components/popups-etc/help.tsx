import { useRef } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import styles from "./help.module.css";
import { compiledContent } from "../../../docs/docs.md";
import { codeMirror, PersistenceState } from "../../lib/state";
import Button from "../design-system/button";
import { saveGame } from "../big-interactive-pages/editor";
import { isDark } from "../../lib/state";

interface HelpProps {
	initialVisible?: boolean;
	tutorialContent?: string[];
	persistenceState?: Signal<PersistenceState>;
	showingTutorialWarning?: Signal<boolean>;
}
const helpHtml = compiledContent();

export default function Help(props: HelpProps) {
	const showingTutorial = useSignal(props.tutorialContent !== undefined);
	const toolkitScroll = useSignal(0);
	const tutorialScroll = useSignal(0);

	const toolkitContentRef = useRef<HTMLDivElement>(null);
	const tutorialContentRef = useRef<HTMLDivElement>(null);

	const tutorialHtml =
		props.tutorialContent &&
		(props.persistenceState?.value.kind == "PERSISTED" ||
			props.persistenceState?.value.kind == "SHARED") &&
		props.tutorialContent[props.persistenceState?.value.tutorialIndex || 0];

	const setTutorialIndex = (tutorialIndex: number) => {
		if (props.persistenceState?.value.kind == "PERSISTED") {
			props.persistenceState.value = {
				...props.persistenceState.value,
				stale: true,
				cloudSaveState: "SAVING",
				tutorialIndex,
			};
			saveGame(
				props.persistenceState,
				codeMirror.value!.state.doc.toString()
			);
		} else if (props.persistenceState?.value.kind == "SHARED") {
			props.persistenceState.value = {
				...props.persistenceState.value,
				tutorialIndex,
			};
		}
	};

	const nextPage = () => {
		const tutorialIndex =
			((props.persistenceState?.value.kind == "PERSISTED" ||
				props.persistenceState?.value.kind == "SHARED") &&
				props.persistenceState.value.tutorialIndex) ||
			0;
		setTutorialIndex(tutorialIndex + 1);
	};

	const previousPage = () => {
		const tutorialIndex =
			((props.persistenceState?.value.kind == "PERSISTED" ||
				props.persistenceState?.value.kind == "SHARED") &&
				props.persistenceState.value.tutorialIndex) ||
			0;
		setTutorialIndex(tutorialIndex - 1);
	};
	return (
		<div class={styles.container}>
			<div class={styles.tabs}>
				{tutorialHtml && (
					<div
						role="button"
						className={`${styles.tab} ${
							showingTutorial.value ? styles.selected : ""
						}`}
						onClick={() => {
							showingTutorial.value = true;
							tutorialContentRef.current!.scrollTop =
								tutorialScroll.value;
						}}
					>
						Tutorial
					</div>
				)}
				{tutorialHtml && (
					<div
						role="button"
						className={`${styles.tab} ${
							showingTutorial.value ? "" : styles.selected
						}`}
						onClick={() => {
							showingTutorial.value = false;
							toolkitContentRef.current!.scrollTop =
								toolkitScroll.value;
						}}
					>
						Help
					</div>
				)}
			</div>

			<div
				class={isDark.value ? styles.content_dark : styles.content}
				style={{
					display:
						tutorialHtml &&
						props.persistenceState &&
						showingTutorial.value
							? "block"
							: "none",
				}}
			>
				<div
					dangerouslySetInnerHTML={{ __html: tutorialHtml || "" }}
					onScroll={(e) => {
						tutorialScroll.value = e.currentTarget.scrollTop;
					}}
					ref={tutorialContentRef}
				/>

				{(props.persistenceState?.value.kind == "PERSISTED" ||
					props.persistenceState?.value.kind == "SHARED") && (
					<>
						<br />
						<div class={styles.paginationContainer}>
							<div class={styles.backContainer}>
								{props.persistenceState.value.tutorialIndex !=
									undefined &&
									props.persistenceState.value.tutorialIndex >
										0 && (
										<Button
											onClick={previousPage}
											class={`${styles.paginationButton} ${styles.backButton}`}
										>
											<IoCaretBack /> Back
										</Button>
									)}
							</div>

							<div class={styles.centerContainer}>
								{props.persistenceState.value.tutorial &&
									props.persistenceState.value.tutorial
										.length > 1 && (
										<div class={styles.pageIndicator}>
											Page{" "}
											{(props.persistenceState.value
												.tutorialIndex || 0) + 1}
											/
											{props.persistenceState.value
												.tutorial &&
												props.persistenceState.value
													.tutorial.length}
										</div>
									)}
							</div>
							<div class={styles.forwardContainer}>
								{props.persistenceState.value.tutorialIndex !=
									undefined &&
									props.persistenceState.value.tutorial &&
									props.persistenceState.value.tutorialIndex <
										props.persistenceState.value.tutorial
											.length -
											1 && (
										<Button
											onClick={nextPage}
											class={styles.paginationButton}
											accent
										>
											Next <IoCaretForward />
										</Button>
									)}

								{props.persistenceState.value.tutorialIndex !=
									undefined &&
									props.persistenceState.value.tutorial &&
									props.persistenceState.value
										.tutorialIndex ==
										props.persistenceState.value.tutorial
											.length -
											1 && (
										<Button
											class={styles.paginationButton}
											onClick={() => {
												props.showingTutorialWarning!.value =
													true;
											}}
											accent
										>
											Exit Tutorial
										</Button>
									)}
							</div>
						</div>
					</>
				)}
			</div>
			<div
				class={isDark.value ? styles.content_dark : styles.content}
				style={{
					display: !showingTutorial.value ? "block" : "none",
				}}
				ref={toolkitContentRef}
				dangerouslySetInnerHTML={{ __html: helpHtml }}
				onScroll={(e) => {
					toolkitScroll.value = e.currentTarget.scrollTop;
				}}
			/>
		</div>
	);
}
