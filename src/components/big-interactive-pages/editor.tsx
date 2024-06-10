import styles from "./editor.module.css";
import CodeMirror from "../codemirror";
import Navbar from "../navbar-editor";
import {
	IoClose,
	IoPlayCircleOutline,
	IoStopCircleOutline,
	IoVolumeHighOutline,
	IoVolumeMuteOutline,
} from "react-icons/io5";
import {
	Signal,
	useComputed,
	useSignal,
	useSignalEffect,
} from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { codeMirror, errorLog, muted, PersistenceState } from "../../lib/state";
import EditorModal from "../popups-etc/editor-modal";
import { runGame } from "../../lib/engine";
import DraftWarningModal from "../popups-etc/draft-warning";
import Button from "../design-system/button";
import { debounce } from "throttle-debounce";
import Help from "../popups-etc/help";
import { collapseRanges } from "../../lib/codemirror/util";
import { defaultExampleCode } from "../../lib/examples";
import MigrateToast from "../popups-etc/migrate-toast";
import { nanoid } from "nanoid";
import TutorialWarningModal from "../popups-etc/tutorial-warning";
import { editSessionLength, switchTheme, ThemeType } from "../../lib/state";
import {versionState} from "../../lib/upload";
import VersionWarningModal from "../popups-etc/version-warning";

interface EditorProps {
	persistenceState: Signal<PersistenceState>;
	cookies: {
		outputAreaSize: number | null;
		helpAreaSize: number | null;
		hideHelp: boolean;
	};
}

interface ResizeState {
	startMousePos: number;
	startValue: number;
}

// Output area is the area with the game view and help
const minOutputAreaWidth = 380;
const defaultOutputAreaWidth = 400;
const outputAreaWidthMargin = 130; // The margin between the editor and output area

const minHelpAreaHeight = 32;
let defaultHelpAreaHeight = 350;
const helpAreaHeightMargin = 0; // The margin between the screen and help area

const foldAllTemplateLiterals = () => {
	if (!codeMirror.value) return;
	const code = codeMirror.value.state.doc.toString() ?? "";
	const matches = [...code.matchAll(/(map|bitmap|tune)`[\s\S]*?`/g)];
	collapseRanges(
		codeMirror.value,
		matches.map((match) => [match.index!, match.index! + 1])
	);
};

let lastSavePromise = Promise.resolve();
let saveQueueSize = 0;
export const saveGame = debounce(
	800,
	(persistenceState: Signal<PersistenceState>, code: string) => {
		const doSave = async () => {
			const attemptSaveGame = async () => {
				try {
					const game =
						persistenceState.value.kind === "PERSISTED" &&
						persistenceState.value.game !== "LOADING"
							? persistenceState.value.game
							: null;
					const res = await fetch("/api/games/save", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							code,
							gameId: game?.id,
							tutorialName: game?.tutorialName,
							tutorialIndex: game?.tutorialIndex,
						}),
					});
					if (!res.ok)
						throw new Error(
							`Error saving game: ${await res.text()}`
						);
					return true;
				} catch (error) {
					console.error(error);

					persistenceState.value = {
						...persistenceState.value,
						cloudSaveState: "ERROR",
					} as any;
					return false;
				}
			};

			while (!(await attemptSaveGame())) {
				await new Promise((resolve) => setTimeout(resolve, 2000)); // retry saving the game every 2 seconds
			}

			saveQueueSize--;
			if (
				saveQueueSize === 0 &&
				persistenceState.value.kind === "PERSISTED"
			) {
				persistenceState.value = {
					...persistenceState.value,
					cloudSaveState: "SAVED",
				};
			}
		};

		saveQueueSize++;
		lastSavePromise = (lastSavePromise ?? Promise.resolve()).then(doSave);
	}
);

const exitTutorial = (persistenceState: Signal<PersistenceState>) => {
	if (persistenceState.value.kind === "PERSISTED") {
		delete persistenceState.value.tutorial;
		if (typeof persistenceState.value.game !== "string") {
			delete persistenceState.value.game.tutorialName;
		}
		persistenceState.value = {
			...persistenceState.value,
			stale: true,
			cloudSaveState: "SAVING",
		};
		saveGame(persistenceState, codeMirror.value!.state.doc.toString());
	} else {
		if (persistenceState.value.kind == "SHARED")
			delete persistenceState.value.tutorial;
	}
};

export default function Editor({ persistenceState, cookies }: EditorProps) {
	const outputArea = useRef<HTMLDivElement>(null);
	const screenContainer = useRef<HTMLDivElement>(null);
	const screenControls = useRef<HTMLDivElement>(null);

	// Resize state storage
	const outputAreaSize = useSignal(
		Math.max(
			minOutputAreaWidth,
			cookies.outputAreaSize ?? defaultOutputAreaWidth
		)
	);

	// this is initially setting the helpAreaSize
	const helpAreaSize = useSignal(
		Math.max(
			minHelpAreaHeight,
			cookies.helpAreaSize ?? defaultHelpAreaHeight
		)
	);

	const canvasScreenSize = useSignal({
		height: outputArea.current?.clientHeight! - helpAreaSize.value - screenControls.current?.clientHeight!,
		maxHeight: screenContainer.current?.clientHeight
	});

	// this runs when the screenContainer and the outputArea refs change
	useEffect(() => {
		if (!outputArea.current || !screenContainer.current) return;
		defaultHelpAreaHeight =
			outputArea.current.clientHeight -
			screenContainer.current.clientHeight;
		helpAreaSize.value =
			outputArea.current.clientHeight -
			screenContainer.current.clientHeight;
	}, [outputArea.current, screenContainer.current]);

	useSignalEffect(() => {
		document.cookie = `outputAreaSize=${
			outputAreaSize.value
		};path=/;max-age=${60 * 60 * 24 * 365}`;
	});

	useSignalEffect(() => {
		document.cookie = `helpAreaSize=${helpAreaSize.value};path=/;max-age=${
			60 * 60 * 24 * 365
		}`;
	});

	// Exit tutorial warning modal
	const showingTutorialWarning = useSignal(false);

	// Max width of the output area
	const maxOutputAreaSize = useSignal(outputAreaSize.value);

	// Max height of help area
	const maxHelpAreaSize = useSignal(helpAreaSize.value);

	useEffect(() => {
		// re-intialize the value of the editing session length to since the editor was opened
		editSessionLength.value = new Date();

		try {
			const themeStr = localStorage.getItem("theme") ?? "light"
			let theme : ThemeType = themeStr as ThemeType
			switchTheme(theme)
		} catch (e) {
			console.log('Weird theme error (unknown theme?): ' + e)
			switchTheme("light" as ThemeType)
		}


		const updateMaxSize = () => {
			maxOutputAreaSize.value =
				window.innerWidth - outputAreaWidthMargin - 100;
			maxHelpAreaSize.value = window.innerHeight - helpAreaHeightMargin;
		};
		window.addEventListener("resize", updateMaxSize, { passive: true });
		updateMaxSize();
		return () => window.removeEventListener("resize", updateMaxSize);
	}, []);

	const realOutputAreaSize = useComputed(() =>
		Math.min(
			maxOutputAreaSize.value,
			Math.max(minOutputAreaWidth, outputAreaSize.value)
		)
	);

	const realHelpAreaSize = useComputed(() =>
		Math.min(
			maxHelpAreaSize.value,
			Math.max(minHelpAreaHeight, helpAreaSize.value)
		)
	);

	// compute the height and max height of the canvas screen
	function computeCanvasScreenHeights() {
		// compute the new canvas screen height
		const canvasScreenHeight = outputArea.current?.clientHeight! - realHelpAreaSize.value - screenControls.current?.clientHeight!;

		// calculate canvas screen max height
		// the max height is such that (width/height) == 1.25
		// that is to respect the 1000 / 800 aspect ratio
		const canvasScreenMaxHeight = outputArea.current?.clientWidth! / 1.25;

		canvasScreenSize.value = {
			height: canvasScreenHeight,
			maxHeight: canvasScreenMaxHeight
		};
	}

	// Resize bar logic
	const resizeState = useSignal<ResizeState | null>(null);
	const horizontalResizeState = useSignal<ResizeState | null>(null);
	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			if (!resizeState.value) return;
			event.preventDefault();
			outputAreaSize.value =
				resizeState.value.startValue +
				resizeState.value.startMousePos -
				event.clientX;
			computeCanvasScreenHeights();
		};
		window.addEventListener("mousemove", onMouseMove);
		return () => window.removeEventListener("mousemove", onMouseMove);
	}, []);

	// this reacts to change of the helpArea resizes and adjusts things accordingly
	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			if (!horizontalResizeState.value) return;
			event.preventDefault();
			helpAreaSize.value =
				horizontalResizeState.value.startValue +
				horizontalResizeState.value.startMousePos -
				event.clientY;

		computeCanvasScreenHeights();
	};
		window.addEventListener("mousemove", onMouseMove);
		return () => window.removeEventListener("mousemove", onMouseMove);
	}, []);

	// We like running games!
	const screen = useRef<HTMLCanvasElement>(null);
	const cleanup = useRef<(() => void) | null>(null);
	const screenShake = useSignal(0);
	const onRun = async () => {
		foldAllTemplateLiterals();
		if (!screen.current) return;

		if (cleanup.current) cleanup.current();
		errorLog.value = [];

		const code = codeMirror.value?.state.doc.toString() ?? "";
		const res = runGame(code, screen.current, (error) => {
			errorLog.value = [...errorLog.value, error];
		});

		screen.current.focus();
		screenShake.value++;
		setTimeout(() => screenShake.value--, 200);

		cleanup.current = res.cleanup;
		if (res.error) {
			console.error(res.error.raw);
			errorLog.value = [...errorLog.value, res.error];
		}
	};

	const onStop = async () => {
		if (!screen.current) return;

		if (cleanup.current) cleanup.current();
	};

	useEffect(() => () => cleanup.current?.(), []);

	// Warn before leave
	useSignalEffect(() => {
		let needsWarning = false;
		if (["SHARED", "IN_MEMORY"].includes(persistenceState.value.kind)) {
			needsWarning = persistenceState.value.stale;
		} else if (
			persistenceState.value.kind === "PERSISTED" &&
			persistenceState.value.stale &&
			persistenceState.value.game !== "LOADING"
		) {
			needsWarning = persistenceState.value.cloudSaveState !== "SAVED";
		}

		if (needsWarning) {
			const onBeforeUnload = (event: BeforeUnloadEvent) => {
				event.preventDefault();
				event.returnValue = "";
				return "";
			};
			window.addEventListener("beforeunload", onBeforeUnload);
			return () =>
				window.removeEventListener("beforeunload", onBeforeUnload);
		} else {
			return () => {};
		}
	});

	// Disable native save shortcut
	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key === "s" && (event.metaKey || event.ctrlKey))
				event.preventDefault();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);

	let initialCode = "";
	if (
		persistenceState.value.kind === "PERSISTED" &&
		persistenceState.value.game !== "LOADING"
	)
		initialCode = persistenceState.value.game.code;
	else if (persistenceState.value.kind === "SHARED")
		initialCode = persistenceState.value.code;
	else if (persistenceState.value.kind === "IN_MEMORY")
		initialCode = localStorage.getItem("sprigMemory") ?? defaultExampleCode;
	// Firefox has weird tab restoring logic. When you, for example, Ctrl-Shift-T, it opens
	// a kinda broken cached version of the page. And for some reason this reverts the CM
	// state. Seems like manipulating Preact state is unpredictable, but sessionStorage is
	// saved, so we use a random token to detect if the page is being restored and force a
	// reload.
	//
	// See https://github.com/hackclub/sprig/issues/919 for a bug report this fixes.
	useEffect(() => {
		const pageId = nanoid();
		window.addEventListener("unload", () => {
			sessionStorage.setItem(pageId, pageId);
		});
		window.addEventListener("load", () => {
			if (sessionStorage.getItem(pageId)) {
				sessionStorage.removeItem("pageId");
				window.location.reload();
			}
		});
	}, [initialCode]);

	return (
		<div class={styles.page}>
			<Navbar persistenceState={persistenceState} />

			<div class={styles.pageMain}>
				<div className={styles.codeContainer}>
					<CodeMirror
						class={styles.code}
						initialCode={initialCode}
						onEditorView={(editor) => {
							codeMirror.value = editor;
							setTimeout(() => foldAllTemplateLiterals(), 100); // Fold after the document is parsed (gross)
						}}
						onRunShortcut={onRun}
						onCodeChange={() => {
							persistenceState.value = {
								...persistenceState.value,
								stale: true,
							};
							if (persistenceState.value.kind === "PERSISTED") {
								persistenceState.value = {
									...persistenceState.value,
									cloudSaveState: "SAVING",
								};
								saveGame(
									persistenceState,
									codeMirror.value!.state.doc.toString()
								);
							}

							if (persistenceState.value.kind === "IN_MEMORY") {
								localStorage.setItem(
									"sprigMemory",
									codeMirror.value!.state.doc.toString()
								);
							}
						}}
					/>
					{errorLog.value.length > 0 && (
						<div class={styles.errors}>
							<button
								class={styles.errorClose}
								onClick={() => (errorLog.value = [])}
							>
								<IoClose />
							</button>

							{errorLog.value.map((error, i) => (
								<div key={`${i}-${error.description}`}>
									{error.description}
								</div>
							))}
						</div>
					)}
					<Button
						accent
						icon={IoPlayCircleOutline}
						bigIcon
						iconSide="right"
						class={styles.playButton}
						onClick={onRun}
					>
						Run
					</Button>
				</div>

				<div
					class={`${styles.resizeBar} ${
						resizeState.value ? styles.resizing : ""
					}`}
					onMouseDown={(event) => {
						document.documentElement.style.cursor = "col-resize";
						resizeState.value = {
							startMousePos: event.clientX,
							startValue: realOutputAreaSize.value,
						};
						window.addEventListener(
							"mouseup",
							() => {
								resizeState.value = null;
								document.documentElement.style.cursor = "";
							},
							{ once: true }
						);
					}}
				/>

				<div
					class={styles.outputArea}
					ref={outputArea}
					style={{ width: realOutputAreaSize.value }}
				>
					<div ref={screenContainer}>
						<div class={styles.canvasWrapper}>
							<canvas
								class={`${styles.screen} ${
									screenShake.value > 0 ? "shake" : ""
								}`}
								style={ outputArea.current ? { height: canvasScreenSize.value.height, maxHeight:  canvasScreenSize.value.maxHeight }: { } }
								ref={screen}
								tabIndex={0}
								width="1000"
								height="800"
							/>
						</div>
						<div ref={screenControls} class={styles.screenControls}>
							<button
								className={styles.mute}
								onClick={() => (muted.value = !muted.value)}
							>
								{muted.value ? (
									<>
										<IoVolumeMuteOutline />{" "}
										<span>Unmute</span>
									</>
								) : (
									<>
										<IoVolumeHighOutline />{" "}
										<span>Mute</span>
									</>
								)}
							</button>
							<button
								className={styles.stop}
								onClick={() => onStop()}
							>
								<IoStopCircleOutline />
								<span>Stop</span>
							</button>
							<div class={styles.screenSize}>
								(Sprig screen is 1/8" / 160&times;128 px)
							</div>
						</div>
					</div>
					<div class={styles.helpContainer}>
						<div
							class={`${styles.horizontalResizeBar} ${
								horizontalResizeState.value
									? styles.resizing
									: ""
							}`}
							onMouseDown={(event) => {
								document.documentElement.style.cursor =
									"col-resize";
								horizontalResizeState.value = {
									startMousePos: event.clientY,
									startValue: realHelpAreaSize.value,
								};
								window.addEventListener(
									"mouseup",
									() => {
										horizontalResizeState.value = null;
										document.documentElement.style.cursor =
											"";
									},
									{ once: true }
								);
							}}
						/>
						<div
							class={styles.helpContainer}
							style={{ height: realHelpAreaSize.value, maxHeight: outputArea.current?.clientHeight! - (screenControls.current?.clientHeight! + screenContainer.current?.clientHeight!) }}
						>
							{!(
								(persistenceState.value.kind === "SHARED" ||
									persistenceState.value.kind ===
										"PERSISTED") &&
								persistenceState.value.tutorial
							) && (
								<Help
									defaultHelpAreaHeight={
										defaultHelpAreaHeight
									}
									helpAreaSize={helpAreaSize}
									persistenceState={persistenceState}
									initialVisible={!cookies.hideHelp}
								/>
							)}

							{(persistenceState.value.kind === "SHARED" ||
								persistenceState.value.kind === "PERSISTED") &&
								persistenceState.value.tutorial && (
									<Help
										defaultHelpAreaHeight={
											defaultHelpAreaHeight
										}
										helpAreaSize={helpAreaSize}
										tutorialContent={
											persistenceState.value.tutorial
										}
										persistenceState={persistenceState}
										showingTutorialWarning={
											showingTutorialWarning
										}
									/>
								)}
						</div>
					</div>
				</div>
			</div>

			<EditorModal />
			{persistenceState.value.kind === "IN_MEMORY" &&
				persistenceState.value.showInitialWarning && (
					<DraftWarningModal persistenceState={persistenceState} />
				)}

			{versionState.value != "OK" && (
				<VersionWarningModal versionState={versionState} />
			)}

			{showingTutorialWarning.value && (
				<TutorialWarningModal
					exitTutorial={() => exitTutorial(persistenceState)}
					showingTutorialWarning={showingTutorialWarning}
				/>
			)}
			<MigrateToast persistenceState={persistenceState} />
		</div>
	);
}