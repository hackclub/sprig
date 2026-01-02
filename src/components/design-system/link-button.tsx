import type { ComponentChild, JSX } from 'preact'
import styles from './link-button.module.css'

interface LinkButtonProps {
	class?: string | undefined
	disabled?: boolean
	children?: ComponentChild
	role?: JSX.HTMLAttributes<HTMLSpanElement>['role']
	onClick?: () => void
}

export default function LinkButton(props: LinkButtonProps) {
	return (
		<span
			class={`${styles.button} ${props.class ?? ''}`}
			role={props.role ?? 'button'}
			aria-disabled={!!props.disabled}
			tabIndex={props.disabled ? -1 : 0}
			onClick={() => {
				if (props.disabled) return
				props.onClick?.()
			}}
			onKeyDown={(e) => {
				if (props.disabled) return
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault()
					props.onClick?.()
				}
			}}
		>
			{props.children}
		</span>
	)
}