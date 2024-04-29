import useLocalStorage from "../../lib/hooks/use-local-storage";
import { codeMirror, errorLog, PersistenceState } from "../../lib/state";
import Button from "../design-system/button";
import styles from "./chat-component.module.css";
import { Signal, useSignal } from "@preact/signals";
import { RiChatDeleteLine } from "react-icons/ri";
import markdown from "@wcj/markdown-to-html";

interface ChatProps {
	persistenceState: Signal<PersistenceState>;
}

const ChatComponent = ({ persistenceState }: ChatProps) => {
	const game =
		persistenceState?.value.kind === "IN_MEMORY"
			? ""
			: persistenceState?.value.kind === "PERSISTED"
			? persistenceState?.value.game !== "LOADING"
				? persistenceState?.value.game.name
				: ""
			: persistenceState?.value.name || "";

	const systemPrompt = `Here is the current code:
\`\`\`
${codeMirror.value?.state.doc.toString()}
\`\`\`

${
	errorLog.value.length > 0
		? `I am facing the following errors:
\`\`\`
${errorLog.value[0]?.description}
\`\`\``
		: ""
}

Answer the questions that follow based on this unless new code is provided.`;

	const [messages, setMessages] = useLocalStorage<
		{ content: string; role: string; render?: boolean }[]
	>(`chat-${game}`, [
		{ content: "Hello! How can I help you today?", role: "assistant" },
	]);
	const loading = useSignal(false);
	const input = useSignal("");

	const handleSendClick = async () => {
		try {
			if (!input.value.trim()) return;
			loading.value = true;

			const newSystemMessage = {
				content: systemPrompt,
				role: "user",
				render: false,
			};
			const newMessage = { content: input.value.trim(), role: "user" };

			setMessages([...messages, newSystemMessage, newMessage]);
			input.value = "";

			const response = await fetch(
				"https://llm-api-production.up.railway.app/generate",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						model: "chatgpt",
						messages: [
							...messages.map((message) => ({
								content: message.content,
								role: message.role,
							})),
							{ content: systemPrompt, role: "user" },
							newMessage,
						],
					}),
				}
			);

			const data = (await response.json()) as {
				raw: string;
				codes: string[];
			};

			setMessages([
				...messages,
				newSystemMessage,
				newMessage,
				{ content: data.raw, role: "assistant" },
			]);

			loading.value = false;
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div class={styles.chatUI}>
			<div class={styles.chatArea}>
				{messages
					.filter((message) => message.render !== false)
					.map((message, i) => (
						<div
							key={i}
							class={`${styles.message} ${
								message.role === "user"
									? styles.messageUser
									: styles.messageBot
							}`}
							dangerouslySetInnerHTML={{
								__html:
									(markdown(message.content) as string) || "",
							}}
						></div>
					))}
			</div>
			<div class={styles.inputArea}>
				<Button
					accent
					onClick={() => setMessages(messages.slice(0, 1))}
				>
					<RiChatDeleteLine />
				</Button>
				<textarea
					disabled={loading.value}
					type="text"
					value={input}
					onChange={(e) => (input.value = e.currentTarget?.value)}
					onKeyPress={(e) => {
						if (e.key === "Enter" && e.shiftKey) handleSendClick();
					}}
					placeholder="Type your message here... (Shift+Enter to submit)"
				/>
				<Button
					disabled={loading.value || !input.value.trim()}
					accent
					onClick={handleSendClick}
				>
					Send
				</Button>
			</div>
		</div>
	);
};

export default ChatComponent;
