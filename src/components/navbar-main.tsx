import { IoAdd, IoLogoGithub, IoOpenOutline } from 'react-icons/io5'
import Button from './design-system/button'
import styles from './navbar.module.css'
import SprigIcon from './design-system/sprig-icon'
import { SessionInfo } from '../lib/account'

interface MainNavbarProps {
	session: SessionInfo | null
	transparent?: boolean
}

export default function MainNavbar(props: MainNavbarProps) {
	return (
		<nav class={`${styles.container} ${props.transparent ? styles.transparent : ''}`}>
			<ul class={styles.navlinks}>
				<li class={styles.logo}><a href='/'><SprigIcon /> <span class={styles.logoText}>Sprig</span></a></li>
				{props.session?.session.full ? (
					<li>
						<a href='/~'>Your Games</a>
					</li>
				) : null}
				<li><a href='/gallery'>Gallery</a></li>
				<li><a href='/get'>Get a Sprig</a></li>
			</ul>
			<ul class={styles.rightActions}>
				{props.session?.session.full ? (<>
					<li class={styles.actionIcon}>
						<a href='https://github.com/hackclub/sprig/' target='_blank'>
							<IoLogoGithub />
						</a>
					</li>
					<li>
						<a href='/~/new'><Button icon={IoAdd}>New Game</Button></a>
					</li>
				</>) : (<>
					<li class={styles.plainLink}>
						<a href='https://github.com/hackclub/sprig/' target='_blank'>
							GitHub{' '}
							<span style={{ verticalAlign: 'middle' }}>
								<IoOpenOutline />
							</span>
						</a>
					</li>
					<li class={styles.plainLink}>
						<a href='/login'>Log In</a>
					</li>
					<li>
						<a href='/editor'><Button>Open Editor</Button></a>
					</li>
				</>)}
			</ul>
		</nav>
	)
}