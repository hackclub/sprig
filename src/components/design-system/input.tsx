import type { Signal } from '@preact/signals'
import styles from './input.module.css'

interface InputProps {
	type?: 'text' | 'password' | 'email' | 'number'
	id?: string
	placeholder?: string
	autoComplete?: string
	class?: string | undefined
	maxLength?: number
	bind?: Signal<string>
	onChange?: (event: any) => void
	value?: string
	readonly?: boolean
}

export default function Input(props: InputProps) {
	const value = props.bind ? props.bind.value : (props.value ?? '')

	return (
		<input
			id={props.id ?? ''}
			class={`${styles.input} ${props.class ?? ''}`}
			type={props.type ?? 'text'}
			value={value}
			onInput={props.bind ? (e) => { props.bind!.value = e.currentTarget.value } : undefined}
			onChange={props.bind ? undefined : props.onChange}
			autoComplete={props.autoComplete ?? 'off'}
			placeholder={props.placeholder ?? ''}
			maxLength={props.maxLength ?? Number.MAX_SAFE_INTEGER}
			readOnly={props.readonly ?? false}
		/>
	)
}
