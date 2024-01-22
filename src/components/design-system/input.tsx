import { Signal } from '@preact/signals'
import styles from './input.module.css'

interface InputProps {
	type?: 'text' | 'password' | 'email' | 'number'
	id?: string
	placeholder?: string
	autoComplete?: string
	class?: string | undefined
	maxLength?: number
	bind?: Signal<string>
	onChange: (event: any) => void
	value: string
}

export default function Input(props: InputProps) {
	return (
		<input
			id={props.id ?? ''}
			class={`${styles.input} ${props.class ?? ''}`}
			type={props.type ?? 'text'}
			{...(props.bind ? {
				value: props.bind,
				onInput: event => { if (props.bind) props.bind.value = event.currentTarget.value }
			} : {})}
			value={props.value}
			onChange={props.onChange}
			autoComplete={props.autoComplete ?? 'off'}
			placeholder={props.placeholder ?? ''}
			maxLength={props.maxLength ?? Number.MAX_SAFE_INTEGER}
		/>
	)
}