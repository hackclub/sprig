import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import HeartIcon from './heart-icon'
import styles from './like-button.module.css'

interface LikeButtonProps {
	filename: string
	isLoggedIn: boolean
	class?: string
}

export default function LikeButton(props: LikeButtonProps) {
	const liked = useSignal(false)
	const count = useSignal<number | null>(null)
	const pending = useSignal(false)

	useEffect(() => {
		fetch(`/api/games/like?filename=${encodeURIComponent(props.filename)}`)
			.then(res => res.ok ? res.json() : null)
			.then(data => {
				if (!data) return
				count.value = data.count
				liked.value = data.liked
			})
			.catch(() => {})
	}, [props.filename])

	const toggle = async () => {
		if (!props.isLoggedIn) {
			window.location.href = `/login?to=${encodeURIComponent(window.location.pathname + window.location.search)}`
			return
		}
		if (pending.value) return

		const prev = { liked: liked.value, count: count.value }
		const action = liked.value ? 'unlike' : 'like'
		liked.value = !liked.value
		if (count.value !== null) count.value += liked.value ? 1 : -1
		pending.value = true

		try {
			const res = await fetch('/api/games/like', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ filename: props.filename, action })
			})
			if (!res.ok) throw new Error(await res.text())
			const data = await res.json()
			liked.value = data.liked
			count.value = data.count
		} catch (error) {
			console.error(error)
			liked.value = prev.liked
			count.value = prev.count
		} finally {
			pending.value = false
		}
	}

	const label = !props.isLoggedIn
		? 'Log in to like this game'
		: liked.value ? 'Unlike' : 'Like'

	return (
		<button
			type='button'
			class={`${styles.likeButton} ${liked.value ? styles.liked : ''} ${props.isLoggedIn ? '' : styles.loggedOut} ${props.class ?? ''}`}
			onClick={toggle}
			aria-pressed={liked.value}
			aria-label={label}
			title={label}
		>
			<HeartIcon filled={liked.value} />
			{count.value !== null && <span class={styles.count}>{count.value}</span>}
		</button>
	)
}