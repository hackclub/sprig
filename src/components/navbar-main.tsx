interface MainNavbarProps {
	loggedIn: boolean
}

export default function MainNavbar(props: MainNavbarProps) {
	return (
		<nav>
			<ul>
				<li><a href='/'>Sprig</a></li>
				<li><a href='/gallery'>Gallery</a></li>
				<li><a href='/get'>Get a Sprig</a></li>
				{props.loggedIn
					? <li><a href='/~'>Your games</a></li>
					: <li><a href='/draft'>Open editor</a></li>}
			</ul>
		</nav>
	)
}