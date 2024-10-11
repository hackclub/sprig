import {useEffect, useRef} from 'preact/hooks'
import { runGame } from '../../lib/engine'
import styles from './desktop-player.module.css'
import {
	IoExpandOutline,
	IoHeart,
	IoHeartOutline, IoLink, IoLogoFacebook, IoLogoLinkedin,
	IoLogoTwitter,
	IoOpen,
	IoPlay,
	IoShareOutline,
	IoStopCircleOutline
	,
	IoSyncCircleOutline,
	IoVolumeHighOutline,
	IoVolumeMuteOutline,
	IoWarning
} from "react-icons/io5";
import {muted, cleanupRef, errorLog} from "../../lib/state";
import {useSignal, useSignalEffect} from "@preact/signals";
import {exitFullscreen, fullscreenElement, requestFullscreen} from "../../lib/utils/fullscreen";
import Button from "../design-system/button";
import {VscLoading} from "react-icons/vsc";
import {upload, uploadState} from "../../lib/upload";

interface DesktopPlayerProps {
	code: string
	gameName: string
	authorName: string
	filename: string
	isLoggedIn: boolean
	hearted: boolean
}

export default function DesktopPlayer(props: DesktopPlayerProps) {
	const screen = useRef<HTMLCanvasElement>(null)
	const outputArea = useRef<HTMLDivElement>(null);
	const screenContainer = useRef<HTMLDivElement>(null);
	const screenControls = useRef<HTMLDivElement>(null);
	
	// acts a bit like a timer; if >0, shake game canvas
	// activated when a game is run to show it's being run
	const screenShake = useSignal(0);

	const onStop = async () => {
		if (!screen.current) return;
		if (cleanupRef.value) cleanupRef.value?.();
	};

	const canvasScreenSize = useSignal({
		height: outputArea.current?.clientHeight!, // - screenControls.current?.clientHeight!,
		maxHeight: screenContainer.current?.clientHeight
	});

	const onRun = async () => {
		if (!screen.current) return;
		if (cleanupRef.value) cleanupRef.value?.();
		errorLog.value = [];
		const res = runGame(props.code, screen.current!, (error) => {
			errorLog.value = [...errorLog.value, error];
		});

		screen.current!.focus();
		if (screenShake) {
			screenShake.value++;
		}
		setTimeout(() => {
			if (screenShake) {
				screenShake.value--;
			}
		}, 200);

		cleanupRef.value = res?.cleanup;
		if (res && res.error) {
			console.error(res.error.raw);
			errorLog.value = [...errorLog.value, res.error];
		}
	};

	useEffect(() => {
		onRun()
	}, [props.code])
	
	// mouse move timeout for auto-hiding fullscreen controls
	const mouseMoveTimeout = useSignal(0);
	const showFullscreenControls = useSignal(false);
	
	// show fullscreen controls code + timers
	useEffect(() => {
		window.addEventListener("mousemove", () => {
			clearTimeout(mouseMoveTimeout.value)
			showFullscreenControls.value= true;
			if (fullscreenElement())
			 mouseMoveTimeout.value = window.setTimeout(() => {
				 showFullscreenControls.value = false;
				mouseMoveTimeout.value = 0;
			}, 2000) 
		})
	}, []);

	const toggleFullscreen = async () => {
		if (fullscreenElement()) {
			exitFullscreen();
		} else {
			requestFullscreen(screenContainer.current!);
		}
	};
	
	const hearted = useSignal(props.hearted)
	
	const upvoteGame = () => {
		hearted.value = true
		return fetch("/api/games/upvote", {
			method: "POST",
			body: JSON.stringify({
				action: "upvote",
				filename: props.filename
			})
		})
	}
	
	const removeUpvote = () => {
		hearted.value = false
		return fetch("/api/games/upvote", {
			method: "POST",
			body: JSON.stringify({
				action: "remove",
				filename: props.filename
			})
		})
	}
	
	const shareMenuOpen = useSignal(false)
	const shareMenuRef = useRef<HTMLDivElement>(null);
	
	const closeOpenMenus = (e: MouseEvent) => {
			if (shareMenuOpen.value && !shareMenuRef.current?.contains(e.target as Element)) {
					shareMenuOpen.value = false;
				}
	}
	
	useEffect(() => {
		document.addEventListener("mousedown", closeOpenMenus);
		return () => document.removeEventListener("mousedown", closeOpenMenus);
	}, [shareMenuRef]);
	
	// TODO: better copy
	const twTextEncoded = encodeURIComponent(`Check out this Sprig game, ${props.gameName}! It was made with the game engine by @hackclub.`)
	const currentURLEncoded = encodeURIComponent(`https://sprig.hackclub.com/gallery/${encodeURIComponent(props.filename)}`)
	
	const embedLinkCopied = useSignal(false)
	const gameLinkCopied = useSignal(false)

	useSignalEffect(() => {
		if (!shareMenuOpen.value)  {
			embedLinkCopied.value = false
			gameLinkCopied.value = false
		}
	});
	
	return (
		<div className={styles.rootContainer}>
		<div className={styles.root}>
			<div ref={screenContainer} style={outputArea.current ? {
				height: canvasScreenSize.value.height,
				maxHeight: canvasScreenSize.value.maxHeight,
			} : {}} className={styles.screenContainer}>
				<div className={styles.canvasWrapper}>
					<canvas
						className={`${styles.screen} ${
							screenShake.value > 0 ? "shake" : ""
						}`}
						style={outputArea.current ? {
							height: canvasScreenSize.value.height,
							maxHeight: canvasScreenSize.value.maxHeight,
							width: (1.25 * canvasScreenSize.value.height),
							maxWidth: "100%",
						} : {}}
						ref={screen}
						tabIndex={0}
						width="1000"
						height="800"
					/>
				</div>
				<div ref={screenControls} className={`${styles.screenControls} ${showFullscreenControls.value && styles.enabled}`}>
					<div>
					<button
						className={styles.stop}
						onClick={onStop}
					>
						<IoStopCircleOutline/>
						<span>Stop</span>
					</button>
					<button
						className={styles.stop}
						onClick={onRun}
					>
						<IoSyncCircleOutline/>
						<span>Reset</span>
					</button>
					<button
						className={styles.mute}
						onClick={() => (muted.value = !muted.value)}
					>
						{muted.value ? (
							<>
								<IoVolumeMuteOutline/>{" "}
								<span>Unmute</span>
							</>
						) : (
							<>
								<IoVolumeHighOutline/>{" "}
								<span>Mute</span>
							</>
						)}
					</button>
					</div>
					<button
						className={styles.stop}
						onClick={toggleFullscreen}
					>
						<IoExpandOutline/>
						<span>Fullscreen</span>
					</button>
				</div>
			</div>
			<div className={styles.meta}>
				<div>
					<div class={styles.title}>
					<h1>{props.gameName}</h1>
					<div class={styles.titleButtons}>
						<div class={`${styles.button} ${hearted.value && styles.hearted} ${props.isLoggedIn || styles.heartDisabled}`}
							 onClick={() => {
								 props.isLoggedIn && (hearted.value ? removeUpvote() : upvoteGame())
							 }}
						>{hearted.value ? <IoHeart/> : <IoHeartOutline/>}</div>
						
						<div ref={shareMenuRef} class={styles.shareButtonContainer}>
							
							<div class={styles.button} onClick={() => {
							shareMenuOpen.value = !shareMenuOpen.value
						}}><IoShareOutline/></div>
							
							{shareMenuOpen.value &&
								<div class={styles.shareMenu} >
									<a href={`https://twitter.com/intent/tweet?text=${twTextEncoded}&url=${currentURLEncoded}`} target={"_blank"}>
										<Button class={styles.shareMenuButton} icon={IoLogoTwitter} accent>Tweet on <s>Twitter</s> X</Button>
									</a>
									<a href={`https://www.facebook.com/sharer/sharer.php?u=${currentURLEncoded}`} target={"_blank"}>
										<Button class={styles.shareMenuButton} icon={IoLogoFacebook} accent>Post to Facebook</Button>
									</a>
									<a href={`https://www.linkedin.com/cws/share/?url=${currentURLEncoded}`} target={"_blank"}>
										<Button class={styles.shareMenuButton} icon={IoLogoLinkedin} accent>Share on LinkedIn</Button>
									</a>
									<a></a>
									<Button class={styles.shareMenuButton} icon={IoLink} accent
											onClick={() => {
												navigator.clipboard.writeText(window.location.href);
												gameLinkCopied.value = true
											}}>
										{gameLinkCopied.value ? "Game link copied!" : "Copy game link"}
									</Button>

								</div>
							}
							
						</div>

					</div>
					</div>
					{props.authorName ? (
						<span className={styles.author}>
						{' '}by {props.authorName}
					</span>
					) : null}

				</div>
				{/* TODO: description */}
				<div>
					<div class={styles.metaActions}>
					<a href={`/gallery/edit/${props.filename}`}><Button accent>
						<IoOpen/>Open in editor</Button></a>
					
					<Button
						icon={
							{
								IDLE: IoPlay,
								LOADING: VscLoading,
								ERROR: IoWarning,
							}[uploadState.value]
						}
						spinnyIcon={uploadState.value === "LOADING"}
						loading={uploadState.value === "LOADING"}
						onClick={() => upload(props.code, props.gameName)}>
						Run on Device
					</Button>
				</div>
				</div>
				</div>
			</div>
		</div>
	)
}
