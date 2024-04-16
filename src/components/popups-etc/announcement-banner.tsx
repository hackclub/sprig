import styles from "./announcement-banner.module.css";

export default function AnnouncementBanner() {
	return (
		<div class={styles.banner}>
			<a href="https://sprig.hackclub.com/share/nSkVqpI6YoUOqDTQW9fV/">
				<img
					src="https://cloud-7jnwcp68c-hack-club-bot.vercel.app/0image.png"
					alt="Penny"
					width={50}
					height={50}
				/>
				<div>
					<h3
						style={{
							color: "#3e29ed",
							textAlign: "left",
						}}
					>
						Sprig X Penny's Big Breakaway
					</h3>
					<p
						style={{
							textAlign: "left",
							fontSize: "14px",
						}}
					>
						Make a Sprig game and receive a free copy of Penny's Big
						Breakaway!
					</p>
				</div>
			</a>
		</div>
	);
}
