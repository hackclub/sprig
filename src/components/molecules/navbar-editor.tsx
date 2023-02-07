import type { Game, User } from '../../lib/account'
import styles from './navbar-editor.module.css'

interface EditorNavbarProps {
	user: User
	game: Game
}

export default function EditorNavbar(props: EditorNavbarProps) {
	return (
		<nav class={styles.container}>
			<ul>
				<li>
					Sprig
					{/* <ul>
						<li><a href='/'>Sprig</a></li>
						<li><a href='/gallery'>Gallery</a></li>
						<li><a href='/get'>Get a Sprig</a></li>
						<li><a href='/~'>Your games</a></li>
					</ul> */}
				</li>
				<li>
					{props.game.name} by @{props.user.username}
				</li>
				<li>
					Work unsaved! Not logged in
				</li>
			</ul>
		</nav>
	)
}