import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import styles from './inline-input.module.css'

interface InlineInputProps {
	value: string
	onChange: (value: string) => void
	placeholder: string;
	autofocus?: boolean;
	// This was introduced to make sure it looks the same even when the user shouldn't be able to edit the name of the game
	disabled?: boolean;
}

export default function InlineInput(props: InlineInputProps) {
	const measureRef = useRef<HTMLSpanElement>(null)
	const width = useSignal(0)

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			if (measureRef.current) width.value = measureRef.current.getBoundingClientRect().width
		})
		observer.observe(measureRef.current!)
		return () => observer.disconnect()
	}, [])

	return (
		<div class={styles.container} style={{ width: width.value }}>
			<input
				class={styles.input}
				value={props.value}
				autofocus={props.autofocus || false}
				onInput={event => props.onChange(event.currentTarget.value)}
				style={{ width: width.value + 30 }}
				placeholder={props.placeholder}
				disabled={props.disabled === true}
			/>
			<span ref={measureRef} class={styles.measure} aria-hidden='true'>
				{props.value || props.placeholder}
			</span>
		</div>
	)
}