import type { Rgba } from '../../lib/engine/1-base/palette'
import styles from './swatch.module.css'

interface SwatchProps {
	rgba: Rgba
}

export default function Swatch(props: SwatchProps) {
	return (
		<span
			class={styles.swatch}
			style={{ backgroundColor: `rgba(${props.rgba.join(', ')})` }}
		/>
	)
}