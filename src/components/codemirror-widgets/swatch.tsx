import type { Rgba } from '../../../engine/src/api'
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
