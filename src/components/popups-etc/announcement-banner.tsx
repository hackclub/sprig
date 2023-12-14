import styles from "./announcement-banner.module.css";
import { FaGamepad } from "react-icons/fa";

export default function AnnouncementBanner() {
	return (
		<div class={styles.banner}>
			<a href="/drop">
				<img src="https://cloud-bqaqkqg1k-hack-club-bot.vercel.app/0snoman.png" alt="Lil Snowguy" width="128" height="150" />
				<p>
					SHAWN X SPRIG winter case drops dec-15! click here to learn
					more
				</p>
			</a>
		</div>
	);
}
