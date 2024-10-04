import useLocalStorage from "../../lib/hooks/use-local-storage";
import { codeMirror, errorLog, PersistenceState } from "../../lib/state";
import Button from "../design-system/button";
import styles from "./chat-component.module.css";
import "./chat-syntax.css";
import { Signal, useSignal } from "@preact/signals";
import { RiChatDeleteLine } from "react-icons/ri";
import markdown from "@wcj/markdown-to-html";
import { nanoid } from "nanoid";
import { useState, useEffect } from "preact/hooks";
import { sha256Hash } from "../../lib/codemirror/util";
import { PersistenceStateKind } from "../../lib/state";

interface ChatProps {
	persistenceState: Signal<PersistenceState>;
}

const ChatComponent = ({ persistenceState }: ChatProps) => {
	const game =
		persistenceState?.value.kind === PersistenceStateKind.IN_MEMORY
			? ""
			: persistenceState?.value.kind === PersistenceStateKind.PERSISTED
				? persistenceState?.value.game !== "LOADING"
					? persistenceState?.value.game.name
					: ""
				: "";

	const systemPrompt = () => `Here is the current code:
\`\`\`
${codeMirror.value?.state.doc.toString()}
\`\`\`

${errorLog.value.length > 0
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

	const info = useSignal("");
	const [chatSession, _setChatSession] = useState(nanoid(10));
	const [codeHash, setCodeHash] = useState<string>('');
	const email = persistenceState?.value?.session?.user.email;

	const sendMessage = async (message: string) => {
		try {
			const response = await fetch(
				`${import.meta.env.PUBLIC_SPRIG_LLM_API}/generate`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						session_id: chatSession,
						message: message,
						email,
					}),
				}
			);

			const data = (await response.json()) as {
				raw: string;
				codes: string[];
			};

			return data;
		} catch {
			throw new Error("Failed to reach the server. Please make sure you're connected to the internet and try again!")
		}
	}

	const handleSendClick = async () => {
		try {
			if (!input.value.trim()) return;
			loading.value = true;
			info.value = "...";

			const newSystemMessage = {
				content: systemPrompt(),
				role: "user",
				render: false,
			};
			const newMessage = { content: input.value.trim(), role: "user" };

			setMessages([...messages, newSystemMessage, newMessage]);
			input.value = "";

			// sends the message to the server and appends it to the messages list
			const sendAndAppendMessage = async () => {
					const data = await sendMessage(newMessage.content);

					setMessages([
						...messages,
						newSystemMessage,
						newMessage,
						{ content: data.raw, role: "assistant" },
					]);
			}

			const newCodeHash = await sha256Hash(codeMirror.value?.state.doc.toString()!);
			// send code as message to give context to the llm for future questions
			// send new code only if the code has changed since the last one
			if (newCodeHash !== codeHash) {
				sendMessage(newSystemMessage.content)
					.then(() => setCodeHash(newCodeHash))
					.then(async () => { await sendAndAppendMessage() })
			    .catch(err => { throw err } );
			} else { await sendAndAppendMessage() };

			loading.value = false;
			info.value = "";
		} catch (err) {
			loading.value = false;
			// info.value = "An error occurred...";
			info.value = (err as Error).message;
		}
	};

	async function endSession() {
		const response = await fetch(`${import.meta.env.PUBLIC_SPRIG_LLM_API}/end-session`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				session_id: chatSession
			})
		});
		const result = await response.json();

		if (!result.success) throw new Error("Failed to end session");
	}

	useEffect(() => {
		window.addEventListener("beforeunload", async () => {
			await endSession();
		});
	}, []);

	return (
		<div class={styles.chatUI}>
			<div class={styles.chatArea}>
				{messages
					.filter((message) => message.render !== false)
					.map((message, i) => (
						<div
							key={i}
							class={`${styles.message} ${message.role === "user"
								? styles.messageUser
								: styles.messageBot
								}`}
							dangerouslySetInnerHTML={{
								__html:
									(markdown(message.content) as string) || "",
							}}
						></div>
					))}
				{info.value && <div class={styles.message}>{info.value}</div>}
			</div>
			<div class={styles.inputArea}>
				<div className={styles.tooltipContainer}>
					<Button
						accent
						onClick={() => setMessages(messages.slice(0, 1))}
					>
						<RiChatDeleteLine />
					</Button>
					<span className={styles.tooltipText}>
						Clear Chat
					</span>
				</div>
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
