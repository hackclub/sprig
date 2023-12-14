import styles from "./announcement-banner.module.css";

export default function AnnouncementBanner() {
	return (
		<div class={styles.banner}>
			<a href="/drop">
				<img src="https://cloud-bqaqkqg1k-hack-club-bot.vercel.app/0snoman.png" alt="Lil Snowguy" width="64" height="75" />
				<p>
					SHAWN X SPRIG winter case drops dec-15! click here to learn
					more about how you can get one!
				</p>
			</a>
		</div>
	);
}
