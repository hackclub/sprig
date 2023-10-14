import { codeMirror, editors, openEditor, type EditorKind } from '../../lib/state'
import BitmapPreview from '../design-system/bitmap-preview'
import styles from './open-button.module.css'
import { runGameHeadless } from '../../lib/engine'

interface OpenButtonProps {
	kind: EditorKind
	text: string
}

export default function OpenButton(props: OpenButtonProps) {
	const { label, icon: Icon } = editors[props.kind]

	return (
		<button
			class={styles.openButton}
			onClick={async (event) => {
				if (!codeMirror.value) return
				const doc = codeMirror.value.state.doc.toString();
				let pos = codeMirror.value.posAtCoords({ x: event.pageX, y: event.pageY })!
				let from = -1

				while (true) {
					if (doc[pos] === '`') {
						if (from === -1) {
							from = pos + 1
						} else {
							break;
						}
					}
					pos++
				}

				if (editors[props.kind].needsBitmaps) {
					// Run the game headless to update bitmaps
					const code = codeMirror.value?.state.doc.toString() ?? ''
					runGameHeadless(code)
				}

				openEditor.value = {
					kind: props.kind,
					text: props.text,
					editRange: { from, to: pos }
				}
			}}
		>
			<span class={styles.label}>{label}</span>
			<Icon />
			{props.kind === 'bitmap' && <BitmapPreview text={props.text} class={styles.bitmapPreview} />}
		</button>
	)
}