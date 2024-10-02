import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import {
	codeMirror,
	PersistenceState,
	errorLog,
	editSessionLength,
	themes,
	theme,
	switchTheme,
	isNewSaveStrat,
	screenRef,
} from "../lib/state";
import type { RoomState, ThemeType } from "../lib/state";
import Button from "./design-system/button";
import Textarea from "./design-system/textarea";
import SavePrompt from "./popups-etc/save-prompt";
import styles from "./navbar.module.css";
import { persist } from "../lib/game-saving/auth-helper";
import InlineInput from "./design-system/inline-input";
import { throttle } from "throttle-debounce";
import SharePopup from "./popups-etc/share-popup";
import ShareRoomPopup from "./popups-etc/share-room";
import { PersistenceStateKind } from "../lib/state";

import {
	IoChevronDown,
	IoLogoGithub,
	IoPlay,
	IoSaveOutline,
	IoShareOutline,
	IoShuffle,
	IoWarning,
} from "react-icons/io5";
import { FaBrush } from "react-icons/fa";
import { usePopupCloseClick } from "../lib/utils/popup-close-click";
import { upload, uploadState } from "../lib/upload";
import { VscLoading } from "react-icons/vsc";
import { defaultExampleCode } from "../lib/examples";
import beautifier from "js-beautify";
import { collapseRanges } from "../lib/codemirror/util";
import { foldAllTemplateLiterals, onRun} from "./big-interactive-pages/editor";
import { showKeyBinding } from '../lib/state';
import { validateGitHubToken, forkRepository, createBranch, createCommit, fetchLatestCommitSha, createTreeAndCommit, createPullRequest, fetchForkedRepository, updateBranch, createBlobForImage } from "../lib/game-saving/github";

const saveName = throttle(500, async (gameId: string, newName: string) => {
	try {
		const res = await fetch("/api/games/rename", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ gameId, newName }),
		});
		if (!res.ok)
			throw new Error(`Error renaming game: ${await res.text()}`);
	} catch (error) {
		console.error(error);
	}
});

const onNameEdit = (
	persistenceState: Signal<PersistenceState>,
	newName: string
) => {
	if (
		persistenceState.value.kind !== PersistenceStateKind.PERSISTED ||
		persistenceState.value.game === "LOADING"
	)
		return;
	saveName(persistenceState.value.game.id, newName);
	persistenceState.value = {
		...persistenceState.value,
		game: {
			...persistenceState.value.game,
			name: newName,
		},
	};
};

const canDelete = (persistenceState: Signal<PersistenceState>) => {
	return (
		true &&
		persistenceState.value.kind === PersistenceStateKind.PERSISTED &&
		persistenceState.value.game !== "LOADING" &&
		!persistenceState.value.game.unprotected
	);
};

interface EditorNavbarProps {
	persistenceState: Signal<PersistenceState>
	roomState: Signal<RoomState> | undefined
}

type StuckCategory =
	| "Logic Error"
	| "Syntax Error"
	| "Other"
	| "UI"
	| "Code Compilation"
	| "Bitmap Editor"
	| "Tune Editor"
	| "Help/Tutorial Window"
	| "AI Chat"
	| "Website";
type StuckData = {
	category: StuckCategory;
	description: string;
};

const openGitHubAuthPopup = async (userId: string | null, publishDropdown: any, readyPublish: any, isPublish: any, publishSuccess: any) => {
	try {
		const githubSession = document.cookie
			.split('; ')
			.find(row => row.startsWith('githubSession='))
			?.split('=')[1];

		if (isPublish) {
			publishDropdown.value = true;
			publishSuccess.value = true;
			return
		}

		if (githubSession) {
			publishDropdown.value = true;
			readyPublish.value = true;
			return;
		}
		const clientId = import.meta.env.PUBLIC_GITHUB_CLIENT_ID;
		const redirectUri = import.meta.env.PUBLIC_GITHUB_REDIRECT_URI;
		const scope = 'repo';

		const state = encodeURIComponent(JSON.stringify({ userId }));

		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

		const width = 600, height = 700;
		const left = (screen.width - width) / 2;
		const top = (screen.height - height) / 2;

		const authWindow = window.open(
			githubAuthUrl,
			'GitHub Authorization',
			`width=${width},height=${height},top=${top},left=${left}`
		);

		if (!authWindow || authWindow.closed || typeof authWindow.closed === 'undefined') {
            alert('Popup blocked. Please allow popups for this site.');
            return;
        }

		authWindow?.focus();

		window.addEventListener('message', (event) => {

			if (event.origin !== window.location.origin) {
				return;
			}

			const { status, message, accessToken } = event.data;

			if (status === 'success') {
				const expires = new Date(Date.now() + 7 * 864e5).toUTCString();
                document.cookie = `githubSession=${encodeURIComponent(accessToken)}; expires=${expires}; path=/; SameSite=None; Secure`;
				publishDropdown.value = true;
				readyPublish.value = true;
			}
			else if (status === 'error') {
				console.error('Error during GitHub authorization:', message);
				alert('An error occurred: ' + message);
			}
		});
	} catch (error) {
		console.error('Error during GitHub authorization:', error);
		alert('An error occurred: ' + (error as Error).message);
	}
};

const prettifyCode = () => {
	// Check if the codeMirror is ready
	if (!codeMirror.value) return;

	// Get the code
	const code = codeMirror.value.state.doc.toString();

	// Set the options for js_beautify
	const options = {
		indent_size: 2, // Indent by 2 spaces
		brace_style: "collapse,preserve-inline" as any, // Collapse braces and preserve inline
	};

	const { js_beautify } = beautifier;
	// Format the code
	const formattedCode = js_beautify(code, options);

	// Create an update transaction with the formatted code
	const updateTransaction = codeMirror.value.state.update({
		changes: {
			from: 0,
			to: codeMirror.value.state.doc.length,
			insert: formattedCode,
		},
	});

	// Find all the matches of the code, bitmap and tune blocks
	const matches = [...formattedCode.matchAll(/(map|bitmap|tune)`[\s\S]*?`/g)];

	// Apply the update to the editor
	codeMirror.value.dispatch(updateTransaction);

	// Collapse the ranges of the matches
	collapseRanges(
		codeMirror.value,
		matches.map((match) => [match.index!, match.index! + 1])
	);
};

export default function EditorNavbar(props: EditorNavbarProps) {
	const showNavPopup = useSignal(false);
	const showStuckPopup = useSignal(false);
	const showThemePicker = useSignal(false);
	const shareRoomPopup = useSignal(false);
	const thumbnailPreview = useSignal<string | null>(null);

	const readyPublish = useSignal(false);
	const isPublishing = useSignal(false);
    const publishSuccess = useSignal(false);
    const publishError = useSignal(false);
	const githubPRUrl = useSignal<string | null>(null);

	let hasError = false;
	const githubUsername = useSignal<string | null>(null);

	useSignalEffect(() => {
		const session = props.persistenceState.value.session;
		if (session && session.user && session.user.githubUsername) {
			githubUsername.value = session.user.githubUsername;
		} else {
			githubUsername.value = "user";
		}
	});

	useSignalEffect(() => {
		const persistenceState = props.persistenceState.value;

		if (persistenceState.kind === "PERSISTED" && persistenceState.game !== "LOADING" && persistenceState.game.githubPR) {
			githubPRUrl.value = persistenceState.game.githubPR;
		} else {
			githubPRUrl.value = null;
		}
	});

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

	const isLoggedIn = props.persistenceState.value.session ? true : false;

	const showSavePrompt = useSignal(false);
	const showSharePopup = useSignal(false);

	const deleteState = useSignal<"idle" | "confirm" | "deleting">("idle");
	const resetState = useSignal<"idle" | "confirm">("idle");
	const showDropdown = useSignal(false);
	const publishDropdown = useSignal(false);

	useSignalEffect(() => {
		const _showNavPopup = showNavPopup.value;
		const _deleteState = deleteState.value;
		const _resetState = resetState.value;
		if (!_showNavPopup && _deleteState === "confirm")
			deleteState.value = "idle";
		if (!_showNavPopup && _resetState === "confirm")
			resetState.value = "idle";
	});

	// We're listening to changes in screenRef because the game will only run if the screenRef is defined
	// So we want to re-render the editor navbar when the screenRef changes so the game can actually run when it's defined
  useSignalEffect(() => {
    screenRef.value;
  });

	// usePopupCloseClick closes a popup when you click outside of its area
	usePopupCloseClick(
		styles.dropdown!,
		() => (showNavPopup.value = false),
		showNavPopup.value
	);
	usePopupCloseClick(
		styles.stuckPopup!,
		() => (showStuckPopup.value = false),
		showStuckPopup.value
	);
	usePopupCloseClick(
		styles.themePicker!,
		() => (showThemePicker.value = false),
		showThemePicker.value
	);

	usePopupCloseClick(
		styles.dropdown!,
	    () => (showDropdown.value = false),
		showDropdown.value
	);

	usePopupCloseClick(
		styles.publishPopup!,
		() => (publishDropdown.value = false),
		publishDropdown.value
	);

	const handleFileDrop = (e: DragEvent) => {
		e.preventDefault();
		const file = e.dataTransfer?.files[0];
		if (file) {
			handleFileUpload(file);
		} else {
			displayError("thumbnail", "Please upload a valid image file.");
		}
	};

	const handleFileChange = (e: Event) => {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (file) {
			handleFileUpload(file);
		} else {
			displayError("thumbnail", "Please upload a valid image file.");
		}
	};

	const handleFileUpload = (file: File) => {
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (event) => {
				thumbnailPreview.value = event.target?.result as string;
				clearError("thumbnail");
			};
			reader.readAsDataURL(file);
		} else {
			displayError("thumbnail", "Please upload a valid image file.");
		}
	};

	const displayError = (fieldId: string, message: string) => {
		const errorElement = document.getElementById(`error-${fieldId}`);
		if (errorElement) {
			errorElement.textContent = message;
			errorElement.style.display = 'block';
			errorElement.style.color = 'red';
		}
	};

	const handleError = (field: string, condition: any, message: string) => {
		if (condition) {
			displayError(field, message);
			hasError = true;
		}
	};

	const clearError = (fieldId: string) => {
		const errorElement = document.getElementById(`error-${fieldId}`);
		if (errorElement) {
			errorElement.style.display = 'none';
			errorElement.textContent = '';
		}
	};

	async function validateGameName(gameName: string): Promise<{ valid: boolean; message: string }> {

		let existingGames: any[] = [];
		try {
			const response = await fetch(import.meta.env.PUBLIC_GALLERY_API);
			if (response.ok) {
				existingGames = await response.json();
			} else {
				throw new Error('Failed to fetch gallery games');
			}
		} catch (error) {
			console.error('Error fetching gallery games:', error);
			return { valid: false, message: "Failed to fetch gallery games. Please try again later." };
		}

		const validNamePattern = /^[a-zA-Z0-9_-]+$/;
		if (!validNamePattern.test(gameName)) {
			return { valid: false, message: "The game name can only contain alphanumeric characters, dashes, or underscores." };
		}

		const lowerCaseGameName = gameName.toLowerCase();
		const isUnique = !existingGames.some(game => game.lowerCaseTitle === lowerCaseGameName);
		if (!isUnique) {
			return { valid: false, message: "The game name already exists in the gallery. Please choose a different name." };
		}

		return { valid: true, message: "The game name is valid and unique." };
	}

	const publishToGithub = async (accessToken: string | null | undefined, yourGithubUsername: string | undefined, gameID: string | undefined) => {
		try {

			const gameTitleElement = document.getElementById('gameTitle') as HTMLInputElement | null;
			const authorNameElement = document.getElementById('authorName') as HTMLInputElement | null;
			const gameDescriptionElement = document.getElementById('gameDescription') as HTMLTextAreaElement | null;
			const gameControlsDescriptionElement = document.getElementById('gameControlsDescription') as HTMLTextAreaElement | null;

			if (!gameTitleElement || !authorNameElement || !gameDescriptionElement || !gameControlsDescriptionElement) {
				console.error("Required elements are missing.");
				return;
			}

			const gameTitle = gameTitleElement.value.trim();
			const authorName = authorNameElement.value;
			const gameDescription = gameDescriptionElement.value;
			const gameCode = codeMirror.value?.state.doc.toString() ?? "";
			const image = thumbnailPreview.value;
			const gameControlsDescription = gameControlsDescriptionElement.value;

			clearError("gameDescription");
			clearError("thumbnail");
			clearError("gameControlsDescription");
			clearError("gameTitle");

			hasError = false;

			const { valid, message: gameNameMessage } = await validateGameName(gameTitle);
			handleError("gameTitle", !valid, gameNameMessage);
			handleError("gameDescription", !gameDescription, "Please provide a game description.");
			handleError("thumbnail", !image, "Please upload a thumbnail image.");
			handleError("gameControlsDescription", !gameControlsDescription, "Please provide game controls description.");

			if (hasError) {
				return;
			}

			if (!accessToken) {
				throw new Error("GitHub access token not found.");
			}

			let isValidToken = await validateGitHubToken(accessToken);
			if (!isValidToken) {
				console.warn("Token invalid or expired. Attempting re-authentication...");
				if (
					(props.persistenceState.value.kind === 'PERSISTED' ||
						props.persistenceState.value.kind === 'COLLAB') &&
					props.persistenceState.value.game !== 'LOADING'
				) {
					if (typeof props.persistenceState.value.game !== 'string') {
						await openGitHubAuthPopup(
							props.persistenceState.value.session?.user?.id ?? null,
							publishDropdown,
							readyPublish,
							props.persistenceState.value.game.isPublished,
							publishSuccess
						);
					}
				}
				accessToken = sessionStorage.getItem("githubAccessToken");
				if (!accessToken || !(await validateGitHubToken(accessToken))) {
					throw new Error("Failed to re-authenticate with GitHub.");
				}
			}

			isPublishing.value = true;
			readyPublish.value = false;
			publishError.value = false;
			publishSuccess.value = false;

			let forkedRepo;
			try {
				forkedRepo = await forkRepository(accessToken, "hackclub", "sprig");
			} catch {
				console.warn("Fork might already exist. Fetching existing fork...");
				forkedRepo = await fetchForkedRepository(accessToken, "hackclub", "sprig", yourGithubUsername || "");
			}

			const latestCommitSha = await fetchLatestCommitSha(accessToken, forkedRepo.owner.login, forkedRepo.name, forkedRepo.default_branch);
			if (!latestCommitSha) {
				throw new Error("Failed to fetch the latest commit SHA.");
			}

			const newBranchName = `Automated-PR-${Date.now()}`;

			await createBranch(accessToken, forkedRepo.owner.login, forkedRepo.name, newBranchName, latestCommitSha);

			const imageBase64 = thumbnailPreview.value || null;
			const imageBlobSha = imageBase64 ? await createBlobForImage(accessToken, forkedRepo.owner.login, forkedRepo.name, imageBase64.split(',')[1]) : null;

			const treeSha = await createTreeAndCommit(
				accessToken,
				forkedRepo.owner.login,
				forkedRepo.name,
				latestCommitSha,
				[
					{ path: `games/${gameTitle}.js`, content: gameCode },
					...(imageBlobSha ? [{ path: `games/img/${gameTitle}.png`, sha: imageBlobSha }] : [])
				]
			);

			const newCommit = await createCommit(accessToken, forkedRepo.owner.login, forkedRepo.name, `Automated Commit - ${gameTitle}`, treeSha, latestCommitSha);

			await updateBranch(accessToken, forkedRepo.owner.login, forkedRepo.name, newBranchName, newCommit.sha);

			const pr = await createPullRequest(
				accessToken,
				"hackclub",
				"sprig",
				`[Automated] ${gameTitle}`,
				newBranchName,
				"main",
				`### Author name\nAuthor: ${authorName}\n\n### About your game\n\n**What is your game about?**\n${gameDescription}\n\n**How do you play your game?**\n${gameControlsDescription}`,
				forkedRepo.owner.login,
				gameID ?? ''
			);

			githubPRUrl.value = pr.html_url;

			publishSuccess.value = true;
		} catch (error) {
			console.error("Publishing failed:", error);
			publishError.value = true;
		} finally {
			isPublishing.value = false;
		}
	};

	let saveState;
	let actionButton;
	let errorBlink = false;
	if (props.persistenceState.value.kind === PersistenceStateKind.IN_MEMORY) {
		saveState = "Your work is unsaved!";

		actionButton = (
			<Button
				icon={IoSaveOutline}
				onClick={() => (showSavePrompt.value = !showSavePrompt.value)}
			>
				Save your work
			</Button>
		);
	} else if (props.persistenceState.value.kind === PersistenceStateKind.SHARED) {
		saveState = props.persistenceState.value.stale
			? "Your changes are unsaved!"
			: "No changes to save";

		actionButton = (
			<Button
				icon={IoShuffle}
				onClick={() => {
					if (props.persistenceState.value.session?.session.full)
						persist(props.persistenceState);
					showSavePrompt.value = true;
				}}
			>
				Remix to save edits
			</Button>
		);
	} else if (props.persistenceState.value.kind === PersistenceStateKind.PERSISTED || (isNewSaveStrat.value && props.persistenceState.value.kind === PersistenceStateKind.COLLAB)) {
		const userEmail = props.persistenceState.value.session?.user.email
		saveState = {
			SAVED: `Saved to ${
				!isNewSaveStrat.value ?
					userEmail ?? "???"
				:
					props.roomState?.value.participants.filter((participant) => {
						if(participant.isHost) return true
						return false
					})[0]?.userEmail === userEmail ? userEmail : "the host"
			}`,
			SAVING: "Saving...",
			ERROR: "Error saving to cloud",
		}[props.persistenceState.value.cloudSaveState];
		if (props.persistenceState.value.cloudSaveState === "ERROR")
			errorBlink = true;

		actionButton = (
			<Button
				icon={IoShareOutline}
				onClick={() => (showSharePopup.value = !showSharePopup.value)}
			>
				Share
			</Button>
		);
	}

	return (
		<>
			<nav class={styles.container}>
				<ul class={styles.editorStats}>
					<li
						class={`${styles.logo} ${
							showNavPopup.value ? styles.active : ""
						}`}
					>
						<button
							onClick={() =>
								(showNavPopup.value = !showNavPopup.value)
							}
						>
							{/* <SprigIcon /> */}
							<img
								class={styles.dino}
								src={
									themes[theme.value]?.navbarIcon ??
									"/SPRIGDINO.png"
								}
								height={38}
							/>
							<div class={styles.caret}>
								<IoChevronDown />
							</div>
						</button>
					</li>
					<li class={styles.filename}>
						{props.persistenceState.value.kind === PersistenceStateKind.PERSISTED &&
						props.persistenceState.value.game !== "LOADING" ? (
							<>
								<InlineInput
									placeholder="Untitled"
									value={
										props.persistenceState.value.game.name
									}
									onChange={(newName) =>
										onNameEdit(
											props.persistenceState,
											newName
										)
									}
								/>
								<span class={styles.attribution}>by you</span>
							</>
						) : props.persistenceState.value.kind === PersistenceStateKind.SHARED ? (
							<>
								{props.persistenceState.value.name}
								<span class={styles.attribution}>
									{props.persistenceState.value.authorName
										? ` by ${props.persistenceState.value.authorName}`
										: " (shared with you)"}
								</span>
							</>
						) : props.persistenceState.value.kind === PersistenceStateKind.COLLAB && typeof props.persistenceState.value.game !== "string"? (
							<>
								<InlineInput 
									placeholder="Untitled"
									// @ts-ignore idk why i need to .game.game but if i just .game.name it's undefined
									value={props.persistenceState.value.game.game.name}
									onChange={() => {}}
									disabled={true}
								/>
							</>
						) : (
							"Unsaved Game"
						)}
					</li>
					<li
						class={`${styles.saveState} ${
							errorBlink ? styles.error : ""
						}`}
					>
						{saveState}
					</li>
				</ul>

				<li class={styles.actionIcon}>
					<a
						href="https://github.com/hackclub/sprig/"
						target="_blank"
					>
						<IoLogoGithub />
					</a>
				</li>

				<li class={styles.actionIcon}>
					<a
						onClick={() =>
							(showThemePicker.value = !showThemePicker.value)
						}
						target="_blank"
					>
						<FaBrush />
					</a>
				</li>

				<li>
					<Button
						class={styles.stuckBtn}
						onClick={() =>
							(showStuckPopup.value = !showStuckPopup.value)
						}
						disabled={!isLoggedIn}
					>
						Report a bug
					</Button>
				</li>
				<li>
					{props.persistenceState.value.kind === "PERSISTED" && (
						<Button
							onClick={async () => {
								if (
									(props.persistenceState.value.kind === 'PERSISTED' ||
										props.persistenceState.value.kind === 'COLLAB') &&
									props.persistenceState.value.game !== 'LOADING'
								) {
									if (typeof props.persistenceState.value.game !== 'string') {
										await openGitHubAuthPopup(
											props.persistenceState.value.session?.user?.id ?? null,
											publishDropdown,
											readyPublish,
											props.persistenceState.value.game.isPublished,
											publishSuccess
										);
									}
								} else {
									console.warn('Game is not ready or is a restricted game');
								}
							}}
							disabled={!isLoggedIn}
						>
							Publish To GitHub
						</Button>
					)}

					{publishDropdown.value && (
						<div className={styles.publishPopup}>
							{readyPublish.value && (
								<>
									<div className={styles.popupHeader}>
										<h2>Connected to GitHub</h2>
										<p className={styles.successMessage}>
											Awesome! You're now connected to GitHub as {props.persistenceState.value.session?.user?.githubUsername || githubUsername.value}.
										</p>
									</div>

									<div className={styles.inputGroup}>
										<div className={styles.inputField}>
											<label htmlFor="gameTitle">Game Title</label>
											{props.persistenceState.value.kind === "PERSISTED" &&
												props.persistenceState.value.game !== "LOADING" ? (
												<input
													id="gameTitle"
													value={props.persistenceState.value.game.name ?? githubUsername.value}
													type="text"
													placeholder="Enter your game title"
													disabled
												/>
											) : (
												<span>Fetching Name...</span>
											)}
											<div id="error-gameTitle" class="error-message" style="display: none;"></div>
										</div>

										<div className={styles.inputField}>
											<label htmlFor="authorName">Author Name</label>
											<input
												id="authorName"
												value={props.persistenceState.value.session?.user?.githubUsername ?? ""}
												type="text"
												placeholder="Enter author name"
												disabled
											/>
										</div>

										<div className={styles.inputField}>
											<label htmlFor="gameDescription">About Your Game</label>
											<textarea
												id="gameDescription"
												v-model="gameDescription"
												placeholder="Describe the key objectives, gameplay mechanics, and what makes your game unique."
												rows={4}
											/>
											<div id="error-gameDescription" class="error-message" style="display: none;"></div>
										</div>

										<div className={styles.inputField}>
											<label htmlFor="gameControlsDescription">How to Play Your Game</label>
											<textarea
												id="gameControlsDescription"
												v-model="gameControlsDescription"
												placeholder="Describe how to play your game here (e.g., controls)..."
												rows={4}
											/>
											<div id="error-gameControlsDescription" class="error-message" style="display: none;"></div>
										</div>

										<div className={styles.inputField}>
											<label htmlFor="thumbnailUpload">Game Thumbnail</label>
											<div
												id="thumbnailUpload"
												className={styles.dragDropArea}
												onDragOver={(e) => e.preventDefault()}
												onDrop={handleFileDrop}
												onClick={() => document.getElementById("fileInput")?.click()}
											>
												<p>Drag and drop your thumbnail image here, or click to upload</p>
												<input
													id="fileInput"
													type="file"
													accept="image/*"
													className={styles.fileInput}
													onChange={handleFileChange}
												/>
											</div>
											{thumbnailPreview.value && (
												<img
													src={thumbnailPreview.value}
													alt="Thumbnail Preview"
													className={styles.thumbnailPreview}
												/>
											)}
											<div id="error-thumbnail" class="error-message" style="display: none;"></div>
										</div>
									</div>
									<div className={styles.buttonGroup}>
										<Button
											accent
											icon={uploadState.value === "LOADING" ? VscLoading : IoPlay}
											spinnyIcon={uploadState.value === "LOADING"}
											loading={uploadState.value === "LOADING"}
											onClick={async () => {
												try {
													const game = props.persistenceState.value.kind === 'PERSISTED' && typeof props.persistenceState.value.game === 'object'
														? props.persistenceState.value.game
														: null;

													const gameId = game?.id || null;
													await publishToGithub(
														props.persistenceState.value.session?.user?.githubAccessToken,
														props.persistenceState.value.session?.user?.githubUsername,
														gameId ?? ''
													);
												} catch (error) {
													console.error("Publishing failed:", error);
												}
											}}
										>
											Publish The Game
										</Button>
									</div>
								</>
							)}

							{isPublishing.value && (
								<div className={styles.popupHeader}>
									<h2>Publishing...</h2>
									<p className={styles.successMessage}>
										Your game is being published to GitHub. Please wait...
									</p>
								</div>
							)}

							{publishSuccess.value && (
								<div className={styles.popupHeader}>
									<h2>Success!</h2>
									<p className={styles.successMessage}>
										Your game has been successfully published to GitHub.
									</p>
									<Button onClick={() => { githubPRUrl.value && window.open(githubPRUrl.value, "_blank") }}>
										View on GitHub
									</Button>
								</div>
							)}

							{publishError.value && (
								<div className={styles.popupHeader}>
									<h2>Error</h2>
									<p className={styles.successMessage}>
										Something went wrong while publishing your game. Please try again.
									</p>
									<Button onClick={() => { publishError.value = false; publishDropdown.value = true; readyPublish.value = true; publishSuccess.value = false; }}>
										Try Again
									</Button>
								</div>
							)}
						</div>
					)}
				</li>

				<li>
					<div class={styles.runButtonContainer}>
						<button className={styles.runButton} onClick={() => onRun()}>
							Run
						</button>
						<button className={styles.dropdownButton} onClick={() => (showDropdown.value = !showDropdown.value)}>
							<IoChevronDown />
						</button>

						{showDropdown.value && (
							<div class={styles.playPopup}>
								<Button
									accent
									icon={
										{
											IDLE: IoPlay,
											LOADING: VscLoading,
											ERROR: IoWarning,
										}[uploadState.value]
									}
									spinnyIcon={uploadState.value === "LOADING"}
									loading={uploadState.value === "LOADING"}
									onClick={() => upload(codeMirror.value?.state.doc.toString() ?? "",
										props.persistenceState.value.kind == "PERSISTED"
											&& props.persistenceState.value.game != "LOADING"
											? props.persistenceState.value.game.name
											: props.persistenceState.value.kind == "SHARED" ? props.persistenceState.value.name
												: "Untitled Game"
									)}
								>
									Run on Device
								</Button>
							</div>
						)}
					</div>
				</li>

				<li>{actionButton}</li>
			</nav>

			{/* <LoginPrompt persistenceState={props.persistenceState} /> */}
			{showSavePrompt.value && (
				<SavePrompt
					kind={
						props.persistenceState.value.session?.session.full
							? "instant"
							: "email"
					}
					persistenceState={props.persistenceState}
					onClose={() => (showSavePrompt.value = false)}
				/>
			)}
			{showSharePopup.value && (
				<SharePopup
					persistenceState={props.persistenceState}
					onClose={() => (showSharePopup.value = false)}
				/>
			)}

			{shareRoomPopup.value && props.roomState && (
				<ShareRoomPopup
					persistenceState={props.persistenceState}
					roomState={props.roomState}
					onClose={() => shareRoomPopup.value = false}
				/>
			)}

			{showThemePicker.value && (
				<ul class={styles.themePicker}>
					{Object.keys(themes).map((themeKey) => {
						const themeValue = themes[themeKey as ThemeType];
						return (
							<li
								onClick={() => {
									theme.value = themeKey as ThemeType;
									switchTheme(theme.value);
								}}
							>
								<span
									style={{
										display: "inline-block",
										backgroundColor: themeValue?.background,
										border: "solid 2px",
										borderColor: themeValue?.accent,
										width: "25px",
										height: "25px",
										borderRadius: "50%",
									}}
								></span>
								{themeKey}
							</li>
						);
					})}
				</ul>
			)}

			{showStuckPopup.value && (
				<div class={styles.stuckPopup}>
					<form
						class={styles.stuckForm}
						onSubmit={async (event) => {
							event.preventDefault(); // prevent the browser from reloading after form submit

							isSubmitting.value = true;

							// 'from' and 'to' represent the index of character where the selection is started to where it's ended
							// if 'from' and 'to' are equal, then it's the cursor position
							// from && to being -1 means the cursor is not in the editor
							const selectionRange = codeMirror.value?.state
								.selection.ranges[0] ?? { from: -1, to: -1 };

							// Store a copy of the user's code, currently active errors and the length of their editing session
							// along with their description of the issue
							const payload = {
								selection: JSON.stringify({
									from: selectionRange.from,
									to: selectionRange.to,
								}),
								email: props.persistenceState.value.session
									?.user.email,
								code: codeMirror.value?.state.doc.toString(),
								error: errorLog.value,
								sessionLength:
									(new Date().getTime() -
										editSessionLength.value.getTime()) /
									1000, // calculate the session length in seconds
								...stuckData.value,
							};

							try {
								const response = await fetch(
									"/api/bug-report",
									{
										method: "POST",
										body: JSON.stringify(payload),
									}
								);
								// Let the user know we'll get back to them after we've receive their complaint
								if (response.ok) {
									alert(
										"We received your bug report!  Thanks!"
									);
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
									category: (
										event.target! as HTMLSelectElement
									).value as StuckCategory,
								};
							}}
							name=""
							id=""
						>
							<option value={"Other"}>Other</option>
							<option value={"UI"}>UI</option>
							<option value={"Code Compilation"}>
								Code Compilation
							</option>
							<option value={"Bitmap Editor"}>
								Bitmap Editor
							</option>
							<option value={"Tune Editor"}>Tune Editor</option>
							<option value={"Help/Tutorial Window"}>
								Help/Tutorial Window
							</option>
							<option value={"AI Chat"}>AI Chat</option>
							<option value={"Website"}>Website</option>
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
						<br />
						<Button type="submit" disabled={isSubmitting.value}>
							{isSubmitting.value ? "Sending..." : "Send"}
						</Button>
					</form>
				</div>
			)}
			{showNavPopup.value && (
				<div class={styles.navPopup}>
					<ul>
						{props.persistenceState.value.session?.session.full ? (
							<>
								<li>
									<a href="/~">Your games</a>
								</li>
								<li>
									<a href="/~/new-game">New game</a>
								</li>
							</>
						) : (
							<>
								<li>
									<a href="/~">Your games (log in)</a>
								</li>
								<li>
									<a
										href="javascript:void"
										role="button"
										onClick={() => {
											if (resetState.value === "idle") {
												resetState.value = "confirm";
											} else {
												codeMirror.value?.dispatch({
													changes: {
														from: 0,
														to: codeMirror.value
															.state.doc.length,
														insert: defaultExampleCode,
													},
												});
												resetState.value = "idle";
											}
										}}
									>
										{resetState.value === "idle"
											? "Reset game code"
											: "Are you sure?"}
									</a>
								</li>
							</>
						)}

						{(props.persistenceState.value.session?.session.full && isNewSaveStrat.value) ?(
							<>
								<li>
								<a
								href="javascript:void(0)"
								role="button"

								onClick={() => (shareRoomPopup.value = true)}
							>
								{!(props.persistenceState.value.kind == PersistenceStateKind.PERSISTED && props.persistenceState.value.game !== "LOADING" && props.persistenceState.value.game.isRoomOpen) ? "Create a room" : "Share room"}
							</a>
								</li>
							</>
						) : null}
						<li>
							<a href="/gallery">Gallery</a>
						</li>
						<li>
							<a href="/get">Get a Sprig</a>
						</li>
						<li>
							<a
								href="javascript:void(0);"
								role="button"
								onClick={() => {
									showNavPopup.value = false;
									prettifyCode();
								}}
							>
								{" "}
								Prettify code{" "}
							</a>
						</li>
						<li>
							<a
								href="javascript:void(0);"
								role="button"
								onClick={() => {
									showKeyBinding.value = true;
									showNavPopup.value = false;
								}}
							>
								Rebinding key
							</a>
						</li>
						<li>
							<a href={"javascript:void"}
							role="button"
							onClick={
								foldAllTemplateLiterals
							}>
								Collapse all bitmaps
							</a>
						</li>
					</ul>
					<div class={styles.divider} />
					<ul>
						<li>
							<a
								href="javascript:void(0)"
								role="button"
								onClick={() => {
									const a = document.createElement("a");
									const name =
										props.persistenceState.value.kind ===
											PersistenceStateKind.PERSISTED &&
										props.persistenceState.value.game !==
											"LOADING"
											? props.persistenceState.value.game
													.name
											: props.persistenceState.value
													.kind === PersistenceStateKind.SHARED
											? props.persistenceState.value.name
											: "sprig-game";
									const code =
										codeMirror.value?.state.doc.toString() ??
										"";
									const url = URL.createObjectURL(
										new Blob([code], {
											type: "application/javascript",
										})
									);
									a.href = url;
									a.download = `${name}.js`;
									a.click();
								}}
							>
								Download
							</a>
						</li>
						{canDelete(props.persistenceState) ? (
							<li>
								<a
									href="javascript:void(0)"
									role="button"
									onClick={async () => {
										if (deleteState.value === "idle") {
											deleteState.value = "confirm";
										} else if (
											deleteState.value === "confirm"
										) {
											deleteState.value = "deleting";
											const res = await fetch(
												`/api/games/delete`,
												{
													method: "POST",
													headers: {
														"Content-Type":
															"application/json",
													},
													body: JSON.stringify({
														gameId:
															props
																.persistenceState
																.value.kind ===
																PersistenceStateKind.PERSISTED &&
															props
																.persistenceState
																.value.game !==
																"LOADING" &&
															props
																.persistenceState
																.value.game.id,
													}),
												}
											);
											if (!res.ok)
												console.error(
													`Error deleting game: ${await res.text()}`
												);
											window.location.replace("/~");
										}
									}}
								>
									{
										{
											idle: "Delete",
											confirm: "Are you sure?",
											deleting: "Deleting...",
										}[deleteState.value]
									}
								</a>
							</li>
						) : null}
						{props.persistenceState.value.session?.session.full && (
							<li>
								<a href="/logout">Log out</a>
							</li>
						)}
					</ul>
				</div>
			)}
		</>
	);
}