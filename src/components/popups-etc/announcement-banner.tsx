import styles from "./announcement-banner.module.css";

export default function AnnouncementBanner() {
	return (
		<div class={styles.banner}>
			<a href="https://sprig-drop.hackclub.com/">
				<img src="https://cloud-1h9ytxva8-hack-club-bot.vercel.app/0whitesnoman.png" alt="Lil Snoman" width="64" height="75" />
				<p>
					SHAWN X SPRIG winter case drops dec-15! click here to learn
					more about how you can get one!
				</p>
			</a>
		</div>
	);
}
