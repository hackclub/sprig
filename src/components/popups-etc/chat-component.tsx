import Button from "../design-system/button";
import styles from "./chat-component.module.css";
import { useSignal } from "@preact/signals";

function ChatComponent() {
	const messages = useSignal<{ id: number; text: string; sender: string }[]>([
		{
			id: 0,
			text: "Hello! How can I help you today?",
			sender: "bot",
		},
	]);
	const input = useSignal("");

	const handleSendClick = () => {
		if (input.value.trim()) {
			const newMessage = {
				id: messages.value.length + 1,
				text: input.value.trim(),
				sender: "user",
			};
			messages.value = [...messages.value, newMessage];
			input.value = "";
		}
	};

	return (
		<div class={styles.chatUI}>
			<div class={styles.chatArea}>
				{messages.value.map((message) => (
					<div
						key={message.id}
						class={`${styles.message} ${
							message.sender === "user" ? styles.messageUser : styles.messageBot
						}`}
					>
						{message.text}
					</div>
				))}
			</div>
			<div class={styles.inputArea}>
				<input
					type="text"
					value={input}
					onChange={(e) => (input.value = e.currentTarget?.value)}
					onKeyPress={(e) => {
						if (e.key === "Enter") handleSendClick();
					}}
					placeholder="Type your message here..."
				/>
				<Button accent onClick={handleSendClick}>Send</Button>
			</div>
		</div>
	);
}

export default ChatComponent;
