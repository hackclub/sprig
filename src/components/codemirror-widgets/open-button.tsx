import { bitmaps, codeMirror, editors, gamePlayerRef, openEditor, type EditorKind } from '../../lib/state'
import BitmapPreview from '../design-system/bitmap-preview'
import styles from './open-button.module.css'
import { extractLegendBitmaps } from '../../lib/engine/legend-extractor'

interface OpenButtonProps {
	kind: EditorKind
	text: string
	range: { from: number, to: number },
}

export default function OpenButton(props: OpenButtonProps) {
	const { label, icon: Icon } = editors[props.kind]
	return (
		<button
			class={styles.openButton}
			onClick={async () => {
				if (!codeMirror.value) return


				if (editors[props.kind].needsBitmaps) {
					const code = codeMirror.value?.state.doc.toString() ?? ''
					const extracted = extractLegendBitmaps(code)
					if (extracted.length > 0) {
						bitmaps.value = extracted
					} else if (gamePlayerRef.value) {
						gamePlayerRef.value.extractBitmaps(code)
					}
				}

				openEditor.value = {
					kind: props.kind,
					text: props.text,
					editRange: { from: props.range.from, to: props.range.to },
				}
			}}
		>
			<span class={styles.label}>{label}</span>
			<Icon />
			{props.kind === 'bitmap' && <BitmapPreview text={props.text} class={styles.bitmapPreview} />}
		</button>
	)
}
