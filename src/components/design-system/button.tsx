import type { ComponentChild, JSX } from 'preact'
import type { IconType } from 'react-icons'
import styles from './button.module.css'

interface ButtonProps {
	icon?: IconType
	type?: 'button' | 'submit' | 'reset'
	iconSide?: 'left' | 'right'
	bigIcon?: boolean
	accent?: boolean
	class?: string | undefined
	disabled?: boolean
	spinnyIcon?: boolean
	loading?: boolean
	children?: ComponentChild
	role?: JSX.HTMLAttributes<HTMLButtonElement>['role']
	onClick?: () => void
}

export default function Button(props: ButtonProps) {
	return (
		<button
			class={`
				${styles.button}
				${props.accent ? styles.accent : ''}
				${props.bigIcon ? styles.bigIcon : ''}
				${props.spinnyIcon ? styles.spinnyIcon : ''}
				${props.loading ? styles.loading : ''}
				${props.class ?? ''}
			`}
			role={props.role ?? 'button'}
			type={props.type ?? 'button'}
			disabled={!!props.disabled || !!props.loading}
			onClick={() => props.onClick?.()}
		>
			{props.icon && props.iconSide !== 'right' && <props.icon />}
			{props.children}
			{props.icon && props.iconSide === 'right' && <props.icon />}
		</button>
	)
}