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
	readonly?: boolean
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
<<<<<<< HEAD
			readOnly={props.readonly || false}
=======
			readOnly={props.readonly ?? false}
>>>>>>> baf2326542f189a9aff3005de6d042f5c21c2b4f
		/>
	)
}
