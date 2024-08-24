import styles from './color-picker.module.css'
import { palette, rgbaToHex } from '../../../engine/src/base'
import { transparentBgUrl } from '../../lib/utils/transparent-bg'
import type { EditorProps } from '../../lib/state'

export default function ColorPickerEditor(props: EditorProps) {
	return (
		<div class={styles.container}>
			<h2>Choose a Color:</h2>
			<div class={styles.grid}>
				{palette.map(([ key, rgba ]) => (
					<div
						key={key}
						class={props.text.value === key ? styles.active : ''}
						onClick={() => props.text.value = key}
						style={{
							backgroundColor: rgbaToHex(rgba),
							backgroundImage: rgba[3] === 0 ? `url("${transparentBgUrl}")` : undefined,
						}}
					/>
				))}
			</div>
		</div>
	)
}
