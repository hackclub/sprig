import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import styles from './inline-input.module.css'

interface InlineInputProps {
	value: string
	onChange: (value: string) => void
	placeholder: string
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
		<div class={styles.container}>
			<input
				class={styles.input}
				value={props.value}
				onInput={event => props.onChange(event.currentTarget.value)}
				style={{ width: width.value }}
				placeholder={props.placeholder}
			/>
			<span ref={measureRef} class={styles.measure} aria-hidden='true'>
				{props.value || props.placeholder}
			</span>
		</div>
	)
}