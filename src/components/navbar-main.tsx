import { IoAdd, IoLogoGithub, IoOpenOutline } from "react-icons/io5";
import Button from "./design-system/button";
import styles from "./navbar.module.css";
import { SessionInfo } from "../lib/game-saving/account";
import { isDark } from "../lib/state";
import AnnouncementBanner from "./popups-etc/announcement-banner";
interface MainNavbarProps {
	session: SessionInfo | null;
	transparent?: boolean;
	goldLogo?: boolean;
}

export default function MainNavbar(props: MainNavbarProps) {
	return (
		<nav
			class={`${styles.container} ${
				props.transparent ? styles.transparent : ""
			}`}
		>
			<div class={styles.mobile}>
				<AnnouncementBanner />
			</div>
			<ul class={styles.navlinks}>
				<li class={styles.logo}>
					<a href="/">
						<img
							class={styles.longImg}
							src={`/spriglogotext-${
								props.goldLogo ? "gold" : "white"
							}.png`}
							height={30}
							width={87}
							alt="Sprig Logo"
						/>
					</a>
				</li>
				{props.session?.session.full ? (
					<li>
						<a href="/~">Your Games</a>
					</li>
				) : null}
				<li>
					<a href="/gallery">Gallery</a>
				</li>
				<li>
					<a href="/get">Get a Sprig</a>
				</li>
			</ul>
			<div class={styles.desktop}>
				<AnnouncementBanner />
			</div>
			<ul class={styles.rightActions}>
				{props.session?.session.full ? (
					<>
						<li class={styles.actionIcon}>
							<a
								href="https://github.com/hackclub/sprig/"
								target="_blank"
							>
								<IoLogoGithub />
							</a>
						</li>
						<li>
							<a href="/~/new">
								<Button icon={IoAdd}>New Game</Button>
							</a>
						</li>
					</>
				) : (
					<>
						<li class={styles.plainLink}>
							<a
								href="https://github.com/hackclub/sprig/"
								target="_blank"
							>
								GitHub{" "}
								<span
									style={{
										verticalAlign: "middle",
										lineHeight: 1,
									}}
								>
									<IoOpenOutline />
								</span>
							</a>
						</li>
						<li class={styles.plainLink}>
							<a href="/login">Log In</a>
						</li>
						<li>
							<a href="/editor">
								<Button>Open Editor</Button>
							</a>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
