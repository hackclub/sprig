import { IoLogoGithub } from 'react-icons/io5'
import Button from './button'
import styles from './navbar.module.css'
import SprigIcon from './sprig-icon'

interface MainNavbarProps {
	loggedIn: boolean
}

export default function MainNavbar(props: MainNavbarProps) {
	return (
		<nav class={styles.container}>
			<ul class={styles.navlinks}>
				<li class={styles.logo}><a href='/'><SprigIcon /> Sprig</a></li>
				<li><a href='/gallery'>Gallery</a></li>
				<li><a href='/get'>Get a Sprig</a></li>
			</ul>
			<ul class={styles.rightActions}>
				<li class={styles.actionIcon}>
					<a href='https://github.com/hackclub/sprig/' target='_blank'>
						<IoLogoGithub />
					</a>
				</li>
				{props.loggedIn ? (
					<li>
						<a href='/~'><Button>Your games</Button></a>
					</li>
				) : (
					<li>
						<a href='/~/draft'><Button>Open editor</Button></a>
					</li>
				)}
			</ul>
		</nav>
	)
}