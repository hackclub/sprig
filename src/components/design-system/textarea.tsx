import { Signal } from "@preact/signals";
import styles from "./textarea.module.css"

interface TextareaProps {
	id?: string
	placeholder?: string
	class?: string | undefined
	onChange: (event: any) => void
	value: string
	cols?: number
	rows?: number
	bind?: Signal<string>
}

export default function Textarea(props: TextareaProps) {
	return (
		<textarea
			id={props.id ?? ""}
			class={`${styles.textarea} ${props.class ?? ""}`}
			value={props.value}
			onChange={props.onChange}
			placeholder={props.placeholder ?? ""}
			cols={props.cols ?? 30}
			rows={props.rows ?? 10}
		 />
	)
}