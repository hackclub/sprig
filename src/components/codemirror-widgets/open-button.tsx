import { codeMirror, editors, openEditor, type EditorKind } from '../../lib/state'
import BitmapPreview from '../design-system/bitmap-preview'
import styles from './open-button.module.css'
import { runGameHeadless } from '../../lib/engine'

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
					// Run the game headless to update bitmaps
					const code = codeMirror.value?.state.doc.toString() ?? ''
					runGameHeadless(code)
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
