import styles from "./editor.module.css";
import CodeMirror from "../codemirror";
import Navbar from "../navbar-editor";
import {
	IoClose,
	IoCopyOutline,
	IoOpenOutline,
	IoReloadOutline,
	IoStopCircleOutline,
	IoVolumeHighOutline,
	IoVolumeMuteOutline,
} from "react-icons/io5";
import {
	signal,
	type Signal,
	useComputed,
	useSignal,
	useSignalEffect,
} from "@preact/signals";
import { useEffect, useRef, useState, useMemo} from "preact/hooks";
import { codeMirror, errorLog, isNewSaveStrat, muted, type PersistenceState, type RoomState,  screenRef, cleanupRef } from "../../lib/state";
import EditorModal from "../popups-etc/editor-modal";
import { runGame, _performSyntaxCheck } from "../../lib/engine";
import DraftWarningModal from "../popups-etc/draft-warning";
import { debounce } from "throttle-debounce";
import Help from "../popups-etc/help";
import { collapseRanges } from "../../lib/codemirror/util";
import { defaultExampleCode } from "../../lib/examples";
import MigrateToast from "../popups-etc/migrate-toast";
import { nanoid } from "nanoid";
import TutorialWarningModal from "../popups-etc/tutorial-warning";
import { editSessionLength, switchTheme, type ThemeType, continueSaving, LAST_SAVED_SESSION_ID, showSaveConflictModal } from '../../lib/state'
import SessionConflictWarningModal from '../popups-etc/session-conflict-warning-modal'
import {eotMessage, versionState} from "../../lib/upload";
import VersionWarningModal from "../popups-etc/version-warning";
import OutOfSpaceModal from "../popups-etc/out-of-space";
import RoomPasswordPopup from "../popups-etc/room-password";
import KeyBindingsModal from '../popups-etc/KeyBindingsModal'
import { PersistenceStateKind } from "../../lib/state";

let screenShakeSignal: Signal<number> | null = null;

const performSyntaxCheck = () => {
	const code = codeMirror.value?.state.doc.toString() ?? "";
	const res = _performSyntaxCheck(code);
	if (res.error) {
		errorLog.value = [];
		errorLog.value = [res.error];
	}
}

export const onRun = async () => {
	foldAllTemplateLiterals();
	if (!screenRef.value) return;

	if (cleanupRef.value) cleanupRef.value();
	errorLog.value = [];
	const code = codeMirror.value?.state.doc.toString() ?? "";
	const res = runGame(code, screenRef.value, (error) => {
		errorLog.value = [...errorLog.value, error];
	});

	screenRef.value.focus();
	if (screenShakeSignal) {
		screenShakeSignal.value++;
	}
	setTimeout(() => {
		if (screenShakeSignal) {
			screenShakeSignal.value--;
		}
	}, 200);

	cleanupRef.value = res?.cleanup;
	if (res && res.error) {
		console.error(res.error.raw);
		errorLog.value = [...errorLog.value, res.error];
	}
};

interface EditorProps {
	persistenceState: Signal<PersistenceState>;
	roomState?: Signal<RoomState> | undefined;
	review?: {
		code?: string;
		rawUrl?: string;
		prUrl?: string;
		repo?: string;
		pr?: string;
		error?: string;
	};
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

export const foldTemplateLiteral = (from: number, to: number) => {
	if (!codeMirror.value) return;
	collapseRanges(
		codeMirror.value,
		[[from, to]]
	);
}

export const foldAllTemplateLiterals = () => {
	if (!codeMirror.value) return;
	const code = codeMirror.value.state.doc.toString() ?? "";
	const matches = [...code.matchAll(/(map|bitmap|tune)`[\s\S]*?`/g)];
	collapseRanges(
		codeMirror.value,
		matches.map((match) => [match.index!, match.index! + 1])
	);
};

const shouldShowConflict = (persistenceState: Signal<PersistenceState>, sessionId: string) => {
	const game = (persistenceState.value.kind === 'PERSISTED' && persistenceState.value.game !== 'LOADING') ? persistenceState.value.game : null;
	if (!game) return false;

	const lastSavedSessionInfo = localStorage.getItem(LAST_SAVED_SESSION_ID);
	const lastSavedData = lastSavedSessionInfo ? JSON.parse(lastSavedSessionInfo) : null;
	const lastSavedSessionId = lastSavedData ? lastSavedData.sessionId : null;
	const lastSavedGameId = lastSavedData ? lastSavedData.gameId : null;

	return lastSavedGameId === game.id && lastSavedSessionId !== sessionId;
};

const showConflict = () => {
	showSaveConflictModal.value = true;
	continueSaving.value = false;
};

const performSave = async (persistenceState: Signal<PersistenceState>, code: string, game: any, sessionId: string) => {
	try {
		const res = await fetch("/api/games/save", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				code,
				gameId: game.id,
				tutorialName: game.tutorialName,
				tutorialIndex: game.tutorialIndex,
			}),
		});

		if (!res.ok) throw new Error(`Error saving game: ${await res.text()}`);

		localStorage.setItem(LAST_SAVED_SESSION_ID, JSON.stringify({ sessionId: sessionId, gameId: game.id }));
		console.log('Game saved successfully.');
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

let lastSavePromise = Promise.resolve();
let saveQueueSize = 0;

export const saveGame = debounce(
	800,
	(persistenceState: Signal<PersistenceState>, code: string, sessionId: string) => {
		const doSave = async () => {
			const attemptSaveGame = async () => {
				const game = (persistenceState.value.kind === 'PERSISTED' && persistenceState.value.game !== 'LOADING') ? persistenceState.value.game : null;

				if (!game) return false;

				if (shouldShowConflict(persistenceState, sessionId)) {
					showConflict();
					return false;
				}

				return await performSave(persistenceState, code, game, sessionId);
			};

			while (continueSaving.value && !(await attemptSaveGame())) {
				await new Promise((resolve) => setTimeout(resolve, 2000)); // retry saving the game every 2 seconds
			}

			saveQueueSize--;
			if (
				saveQueueSize === 0 &&
				persistenceState.value.kind === PersistenceStateKind.PERSISTED
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

export async function startSavingGame(persistenceState: Signal<PersistenceState>, roomState: Signal<RoomState> | undefined) {
	const attemptSaveGame = async () => {
		try {
			const game =
				persistenceState.value.kind === PersistenceStateKind.PERSISTED &&
				persistenceState.value.game !== "LOADING"
					? persistenceState.value.game
					: null;
			const res = await fetch("/api/games/start-saving", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					gameId: game?.id,
					tutorialName: game?.tutorialName,
					roomParticipants: roomState?.value.participants
				}),
			});
			if (!res.ok)
				throw new Error(`Error saving game: ${await res.text()}`);
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
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
	console.log("SUCCESS SAVE")
	if (persistenceState.value.kind === PersistenceStateKind.PERSISTED)
		persistenceState.value = {
			...persistenceState.value,
			cloudSaveState: "SAVED",
		};
}

const exitTutorial = (persistenceState: Signal<PersistenceState>, sessionId: string) => {
	if (persistenceState.value.kind === PersistenceStateKind.PERSISTED) {
		delete persistenceState.value.tutorial;
		if (typeof persistenceState.value.game !== "string") {
			delete persistenceState.value.game.tutorialName;
		}
		persistenceState.value = {
			...persistenceState.value,
			stale: true,
			cloudSaveState: "SAVING",
		};
		if(isNewSaveStrat.value)
			startSavingGame(persistenceState, undefined);
		else
        	saveGame(persistenceState, codeMirror.value!.state.doc.toString(), sessionId);

	} else {
		if (persistenceState.value.kind == PersistenceStateKind.SHARED)
			delete persistenceState.value.tutorial;
	}
};

export default function Editor({ persistenceState: persistenceStateProp, cookies, roomState: roomStateProp, review }: EditorProps) {
	const persistenceState = useMemo(() => {
		if (persistenceStateProp && ('value' in (persistenceStateProp as any))) {
			return persistenceStateProp;
		}
		return signal(persistenceStateProp);
	}, [persistenceStateProp]);

	const roomState = useMemo(() => {
		if (!roomStateProp) return undefined;
		if ('value' in (roomStateProp as any)) {
			return roomStateProp;
		}
		return signal(roomStateProp);
	}, [roomStateProp]);
	const outputArea = useRef<HTMLDivElement>(null);
	const screenContainer = useRef<HTMLDivElement>(null);
	const screenControls = useRef<HTMLDivElement>(null);
	const reviewAutoRun = useRef(false);
	const isReviewMode = !!review;

	const [copiedLink, setCopiedLink] = useState(false);

	const copyReviewLink = () => {
		if (!navigator.clipboard) return;
		navigator.clipboard.writeText(window.location.href)
			.then(() => {
				setCopiedLink(true);
				setTimeout(() => setCopiedLink(false), 2000);
			})
			.catch(() => {});
	};


	const [sessionId] = useState(nanoid());

	const [triageComment, setTriageComment] = useState<string | null>(null);
	const [loadingChecks, setLoadingChecks] = useState(false);
	const [showChecks, setShowChecks] = useState(false);

	useEffect(() => {
		if (!review?.repo || !review?.pr) return;
		setLoadingChecks(true);
		fetch(`https://api.github.com/repos/${review.repo}/issues/${review.pr}/comments`)
			.then(res => {
				if (!res.ok) throw new Error("Failed to fetch comments");
				return res.json();
			})
			.then(data => {
				if (Array.isArray(data)) {
					const botComment = data.find(c => c.body && c.body.includes("<!-- sprig-auto-review -->"));
					if (botComment) {
						setTriageComment(botComment.body);
					}
				}
			})
			.catch(err => {
				console.error("Error fetching PR comments:", err);
			})
			.finally(() => {
				setLoadingChecks(false);
			});
	}, [review?.repo, review?.pr]);

	const failedLines: string[] = [];
	let similarity: string | null = null;
	let similarityText = "";
	let similarGameLink = "";
	let similarGameName = "";
	if (triageComment) {
		const lines = triageComment.split("\n");
		for (const line of lines) {
			const trimmed = line.trim();
			if (trimmed.startsWith("> - ❌") || trimmed.startsWith("- ❌")) {
				const cleaned = trimmed
					.replace(/^>\s*-\s*❌\s*/, "")
					.replace(/^-\s*❌\s*/, "")
					.replace(/\*\*/g, "");
				failedLines.push(cleaned);
			}
		}
		const similarityMatch = triageComment.match(/Similarity:\s*([^\n]+)/);
		if (similarityMatch) {
			similarity = similarityMatch[1].replace(/\*\*/g, "").trim();
			const gameFileMatch = similarity.match(/(?:games\/)?([^.`\s]+)\.js/);
			if (gameFileMatch) {
				similarGameName = gameFileMatch[1];
				similarGameLink = `https://sprig.hackclub.com/gallery/${similarGameName}`;
				similarityText = similarity.replace(`games/${similarGameName}.js`, "").replace(`${similarGameName}.js`, "").replace(/\s+/g, " ").trim();
			} else {
				similarityText = similarity;
			}
		}
	}

	let editFileUrl = "";
	if (triageComment) {
		const editUrlMatch = triageComment.match(/\[Edit Game File\]\(([^)]+)\)/) || triageComment.match(/\[edit file\]\(([^)]+)\)/);
		if (editUrlMatch) {
			editFileUrl = editUrlMatch[1];
		}
	}


	useEffect(() => {
		setInterval(() => {
			performSyntaxCheck();
		}, 2000);
	}, []);

	useEffect(() => {
		const channel = new BroadcastChannel('session_channel');
		channel.onmessage = (event) => {
			if (event.data.type === 'SESSION_UPDATE' && event.data.sessionId !== sessionId) {
				console.log('New session detected:', event.data.sessionId);
			}
		};
		channel.postMessage({ type: 'SESSION_UPDATE', sessionId });
		return () => channel.close();
	}, [sessionId]);

	useEffect(() => {

		const handleUnload = () => {
			localStorage.removeItem(LAST_SAVED_SESSION_ID);
			console.log('Session ID removed from localStorage');
		};

		window.addEventListener('unload', handleUnload);

		return () => {
			window.removeEventListener('unload', handleUnload);
		};
	}, []);

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
		height: outputArea.current?.clientHeight! - helpAreaSize.value, // - screenControls.current?.clientHeight!,
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

	useEffect(() => {
		screenRef.value = screen.current;

		screenShakeSignal = screenShake;
	});
	useEffect(() => () => cleanupRef.value?.(), []);
	// We like running games!
	const screen = useRef<HTMLCanvasElement>(null);
	const screenShake = useSignal(0);

	const onStop = async () => {
		if (!screen.current) return;
		if (cleanupRef.value) cleanupRef.value?.();
	};

	// Warn before leave
	useSignalEffect(() => {
		let needsWarning = false;
		if ([PersistenceStateKind.SHARED, PersistenceStateKind.IN_MEMORY].includes(persistenceState.value.kind)) {
			needsWarning = persistenceState.value.stale;
		} else if (
			persistenceState.value.kind === PersistenceStateKind.PERSISTED &&
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
		if(!isNewSaveStrat.value){
			const handler = (event: KeyboardEvent) => {
				if (event.key === "s" && (event.metaKey || event.ctrlKey)) {
					event.preventDefault();
					if (!continueSaving.value) {
						continueSaving.value = true;
						saveGame(persistenceState, codeMirror.value!.state.doc.toString(), sessionId);
					}
				}
			};
			window.addEventListener("keydown", handler);
			return () => window.removeEventListener("keydown", handler);
		}
		return
	}, [continueSaving.value]);

	let initialCode = "";
	let gameId = '';
	if (
		persistenceState.value.kind === PersistenceStateKind.PERSISTED &&
		persistenceState.value.game !== "LOADING"
	){
		initialCode = persistenceState.value.game.code;
		gameId = persistenceState.value.game?.id ?? '';

	}
	else if (persistenceState.value.kind === PersistenceStateKind.SHARED)
		initialCode = persistenceState.value.code;
	else if (review?.code)
		initialCode = review.code;
	else if (persistenceState.value.kind === PersistenceStateKind.IN_MEMORY)
		initialCode = localStorage.getItem("sprigMemory") ?? defaultExampleCode;
	else if (isNewSaveStrat.value && persistenceState.value.kind === PersistenceStateKind.COLLAB){
		if(typeof persistenceState.value.game !== 'string')
			// @ts-ignore
			initialCode = persistenceState.value.game.game.code;
	}
	
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
		roomState != undefined && persistenceState.value.kind === PersistenceStateKind.COLLAB && typeof persistenceState.value.game === 'string' 
		? 
			(<>
				<RoomPasswordPopup persistenceState={persistenceState} />
			</>) 
		:
			(
		<div class={styles.page}>
			<Navbar persistenceState={persistenceState} roomState={roomState}/>

			<div class={styles.pageMain}>
				<div className={styles.codeContainer}>
					{isReviewMode && (
						<div class={styles.reviewBanner} style={{ flexDirection: "column", alignItems: "stretch" }}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", width: "100%" }}>
								<div>
									<strong>Review Mode</strong>
									<span>{review?.error ?? "Loaded from pull request source. Edits here stay local."}</span>
								</div>
								<div class={styles.reviewLinks}>
									{review?.prUrl && (
										<a href={review.prUrl} target="_blank" rel="noreferrer">
											<IoOpenOutline /> PR
										</a>
									)}
									{review?.rawUrl && (
										<a href={review.rawUrl} target="_blank" rel="noreferrer">
											<IoOpenOutline /> Raw
										</a>
									)}
									<button type="button" onClick={onRun}>
										<IoReloadOutline /> Restart
									</button>
									<button type="button" onClick={copyReviewLink}>
										<IoCopyOutline /> {copiedLink ? "Copied!" : "Copy Link"}
									</button>
								</div>
							</div>

							{loadingChecks && (
								<div class={styles.reviewStatusPanel} style={{ fontSize: "0.8rem", color: "#666", textAlign: "center" }}>
									Loading review status from GitHub...
								</div>
							)}

							{!loadingChecks && triageComment && (
								<div class={styles.reviewStatusPanel}>
									<div class={styles.reviewStatusHeader} onClick={() => setShowChecks(!showChecks)}>
										<span class={styles.statusBadge} data-ok={!triageComment.includes("❌")}>
											{triageComment.includes("❌") ? "❌ Needs Fixes" : "✅ Verified"}
										</span>
										{similarity && (
											<span class={styles.similarityBadge}>
												🔍 Similarity: {similarGameLink ? (
													<>
														{similarityText}{" "}
														<a
															href={similarGameLink}
															target="_blank"
															rel="noreferrer"
															style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}
															onClick={(e) => e.stopPropagation()}
														>
															{similarGameName}
														</a>
													</>
												) : similarity}
											</span>
										)}
										<button class={styles.toggleChecksBtn}>
											{showChecks ? "Hide Checks ▲" : "Show Checks ▼"}
										</button>
									</div>
									
									{showChecks && (
										<div class={styles.checksList}>
											{failedLines.length > 0 ? (
												<div class={styles.failedChecksBlock}>
													<strong>Requires Attention:</strong>
													<ul>
														{failedLines.map(line => (
															<li>{line}</li>
														))}
													</ul>
												</div>
											) : (
												<div class={styles.allPassedBlock}>
													All automated checks passed successfully! 🎉
												</div>
											)}
										</div>
									)}
								</div>
							)}
						</div>
					)}
					<CodeMirror
						persistenceState={persistenceState}
						roomState={roomState}
						class={styles.code}
						initialCode={initialCode}
						onEditorView={(editor) => {
							codeMirror.value = editor;
							setTimeout(() => foldAllTemplateLiterals(), 100); // Fold after the document is parsed (gross)
							if (isReviewMode && review?.code && !reviewAutoRun.current) {
								reviewAutoRun.current = true;
								setTimeout(() => onRun(), 500);
							}
						}}
						onRunShortcut={onRun}
						onCodeChange={() => {
							if (isReviewMode) return;

							persistenceState.value = {
								...persistenceState.value,
								stale: true,
							};
							if (persistenceState.value.kind === PersistenceStateKind.PERSISTED || persistenceState.value.kind === PersistenceStateKind.COLLAB) {
								persistenceState.value = {
									...persistenceState.value,
									cloudSaveState: "SAVING",
								};
								console.log("SAVING")
								if(!isNewSaveStrat.value)
									saveGame(persistenceState, codeMirror.value!.state.doc.toString(), sessionId);
							}

							if (persistenceState.value.kind === PersistenceStateKind.IN_MEMORY) {
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
					<div ref={screenContainer} style={ outputArea.current ? {
					height: canvasScreenSize.value.height,
						maxHeight: canvasScreenSize.value.maxHeight,
					} : {} }>
						<div class={styles.canvasWrapper}>
							<canvas
								class={`${styles.screen} ${
									screenShake.value > 0 ? "shake" : ""
								}`}
								style={ outputArea.current ? {
								height: canvasScreenSize.value.height,
								maxHeight:  canvasScreenSize.value.maxHeight,
									width: (1.25 * canvasScreenSize.value.height),
									maxWidth: "100%",
								}: { } }
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
								onClick={onStop}
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
							// style={{ height: realHelpAreaSize.value, maxHeight: outputArea.current?.clientHeight! - (screenControls.current?.clientHeight! + screenContainer.current?.clientHeight!) }}
							style={{ height: realHelpAreaSize.value, maxHeight: outputArea.current?.clientHeight! - (screenContainer.current?.clientHeight! - screenControls.current?.clientHeight!) }}
						>
							{!(
								(persistenceState.value.kind === PersistenceStateKind.SHARED ||
									persistenceState.value.kind ===
										PersistenceStateKind.PERSISTED) &&
								persistenceState.value.tutorial
							) && (
								<Help
									sessionId={sessionId}
									defaultHelpAreaHeight={
										defaultHelpAreaHeight
									}
									helpAreaSize={helpAreaSize}
									persistenceState={persistenceState}
									initialVisible={!cookies.hideHelp}
								/>
							)}

							{(persistenceState.value.kind === PersistenceStateKind.SHARED ||
								persistenceState.value.kind === PersistenceStateKind.PERSISTED) &&
								persistenceState.value.tutorial && (
									<Help
										sessionId={sessionId}
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
			{persistenceState.value.kind === PersistenceStateKind.IN_MEMORY &&
				persistenceState.value.showInitialWarning && (
					<DraftWarningModal persistenceState={persistenceState} />
				)}

			{versionState.value != "OK" && (
				<VersionWarningModal versionState={versionState} />
			)}

			{eotMessage.value && eotMessage.value.status != "ALL_GOOD" && (
				<OutOfSpaceModal eotMessage={eotMessage} />
			)}

			{showingTutorialWarning.value && (
				<TutorialWarningModal
					exitTutorial={() => exitTutorial(persistenceState, sessionId)}
					showingTutorialWarning={showingTutorialWarning}
				/>
			)}
			<MigrateToast persistenceState={persistenceState} />
			<SessionConflictWarningModal sessionId={sessionId} gameId={gameId} />
			<KeyBindingsModal />
		</div>
	));
}
