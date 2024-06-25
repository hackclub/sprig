import {useRef} from "preact/hooks";
import {signal, Signal, useSignal} from "@preact/signals";
import {IoCaretBack, IoCaretForward} from "react-icons/io5";
import styles from "./help.module.css";
import {compiledContent} from "../../../docs/docs.md";
import {codeMirror, isNewSaveStrat, PersistenceState} from "../../lib/state";
import Button from "../design-system/button";
import {saveGame, startSavingGame} from "../big-interactive-pages/editor";
import ChatComponent from "./chat-component";

interface HelpProps {
	sessionId: string;
	initialVisible?: boolean;
	tutorialContent?: string[];
	persistenceState: Signal<PersistenceState>;
	defaultHelpAreaHeight: number;
	helpAreaSize: Signal<number>;
	showingTutorialWarning?: Signal<boolean>;
	sessionId: string
}
const helpHtml = compiledContent();

export const logInfo = signal<Array<{
	args: any[];
	nums: number[];
}>>([]);

export default function Help(props: HelpProps) {
	const showingTutorial = useSignal(props.tutorialContent !== undefined);
	const showingChat = useSignal(false);
	const showingLog = useSignal(false);
	const toolkitScroll = useSignal(0);
	const tutorialScroll = useSignal(0);

	const toolkitContentRef = useRef<HTMLDivElement>(null);
	const logContentRef = useRef<HTMLDivElement>(null);
	const tutorialContentRef = useRef<HTMLDivElement>(null);
	const chatContentRef = useRef<HTMLDivElement>(null);

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
			if(isNewSaveStrat.value)
				startSavingGame(props.persistenceState)
			else
				saveGame(
					props.persistenceState,
					codeMirror.value!.state.doc.toString(),
					props.sessionId
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

	// @ts-ignore
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
							showingChat.value = false;
							showingTutorial.value = true;
							showingLog.value = false;
							tutorialContentRef.current!.scrollTop =
								tutorialScroll.value;
						}}
					>
						Tutorial
					</div>
				)}
					<div
						role="button"
						className={`${styles.tab} ${
							showingTutorial.value || showingChat.value || showingLog.value
								? ""
								: styles.selected
						}`}
						onClick={() => {
							showingChat.value = false;
							showingTutorial.value = false;
							showingLog.value = false;
							toolkitContentRef.current!.scrollTop =
								toolkitScroll.value;
						}}
					>
						Toolkit
					</div>

				<div className={styles.tooltipContainer}>
					<Button
						accent
						class={`${styles.tab} ${
							showingChat.value ? styles.selected : ""
						}`}
						disabled={
							props.persistenceState?.value.session === null
						}
						onClick={() => {
							showingChat.value = true;
							showingTutorial.value = false;
							showingLog.value = false;
						}}
					>
						Get AI Help
					</Button>
					<span className={styles.tooltipText}>
						{!props.persistenceState?.value.session?.user
							? "You must be logged in to use this feature!"
							: "Ask AI for help with your code"}
					</span>
				</div>
				<div className={styles.tooltipContainer}>
					<Button
						accent
						class={`${styles.tab} ${
							showingLog.value ? styles.selected : ""
						}`}
						onClick={() => {
							showingChat.value = false
							showingTutorial.value = false;
							showingLog.value = true;
						}}
					>
						Log
					</Button>
				</div>
				<Button
					accent
					class={styles.tab}
					onClick={() => {
						if (!props.helpAreaSize) return;
						props.helpAreaSize.value =
							props.helpAreaSize.value == 0
								? props.defaultHelpAreaHeight
								: 0;
					}}
				>
					{props.helpAreaSize?.value == 0 ? "Show" : "Hide"}
				</Button>
			</div>
			<div
				class={styles.content}
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
					dangerouslySetInnerHTML={{__html: tutorialHtml || ""}}
					onScroll={(e) => {
						tutorialScroll.value = e.currentTarget.scrollTop;
					}}
					ref={tutorialContentRef}
				/>

				{(props.persistenceState?.value.kind == "PERSISTED" ||
					props.persistenceState?.value.kind == "SHARED") && (
					<>
						<br/>
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
			{!showingChat.value && !showingLog.value && (
				<div
					class={styles.content}
					style={{
						display: !showingTutorial.value ? "block" : "none",
					}}
					ref={toolkitContentRef}
					dangerouslySetInnerHTML={{ __html: helpHtml }}
					onScroll={(e) => {
						toolkitScroll.value = e.currentTarget.scrollTop;
					}}
				/>
			)}
			{showingChat.value && !showingLog.value && (
				<div class={styles.chatContent} ref={chatContentRef}>
					<ChatComponent persistenceState={props.persistenceState} />
				</div>
			)}
			{showingLog.value && (
				<div class={styles.content} ref={logContentRef}>
					<ul style={
						{
							overflowY: 'scroll',
							height: '100%',
							listStyleType: 'none',
							padding: 0,
							margin: 0,
						}
					}>
						{logInfo.value.map((log) => (
							<>
								<li>{
									log.args.join(' ')
								}
								<span style={{
									color: 'gray',
									float: 'right',
								}}>
									{"[" + log.nums.join(':') + "]"}
								</span>
								</li>
								<hr style={{
									margin: '0.5em 0',
									border: '0.5px solid #ccc',
								}}></hr>
							</>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
