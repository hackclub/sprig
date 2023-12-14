import styles from "./announcement-banner.module.css";
import { FaGamepad } from "react-icons/fa";

export default function AnnouncementBanner() {
	return (
		<div class={styles.banner}>
			<a href="/drop">
				<FaGamepad class={styles.icon} />
				<p>
					SHAWN X SPRIG winter case drops dec-15! click here to learn
					more
				</p>
			</a>
		</div>
	);
}
