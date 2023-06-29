import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import { IoCaretDown, IoCaretUp } from 'react-icons/io5'
import styles from './tutorial.module.css'
import { compiledContent } from '../../../docs/docs.md'
import { marked } from 'marked';
import { PersistenceState } from '../../lib/state';

interface TutorialProps {
	content: string
	persistenceState: Signal<PersistenceState>
	exitTutorial: () => void
}

marked.use({
	mangle: false,
	headerIds: false,
	headerPrefix: ''
})

const helpHtml = compiledContent()

export default function Tutorial(props: TutorialProps) {
	const visible = useSignal(true)
	const showingTutorial = useSignal(true)

	const tutorialHtml = marked.parse(props.content)
	
	useSignalEffect(() => {
		document.cookie = `hideHelp=${!visible.value};path=/;max-age=${60 * 60 * 24 * 365}`
	})

	return (
		<div class={styles.container}>
			<div class={styles.tabs}>
				{visible.value && (
					<div role='button' className={`${styles.tab} ${showingTutorial.value ? styles.selected : ''}`} onClick={() => showingTutorial.value = true}>
					Tutorial
					</div>
				)}
				{visible.value && (
					<div role='button' className={`${styles.tab} ${showingTutorial.value ? '': styles.selected}`} onClick={() => showingTutorial.value = false}>
					Toolkit
					</div>
				)}
				<div role='button' class={styles.tab} onClick={() => visible.value = !visible.value}>
					{visible.value ? <IoCaretDown /> : <IoCaretUp />}
					{visible.value ? '' : 'Show Help'}
				</div>
			</div>

			{visible.value && showingTutorial.value && (
				<div class={styles.content} >
					<div dangerouslySetInnerHTML={{ __html: tutorialHtml }} />
					{props.persistenceState.value.kind === 'PERSISTED' && (
						<p><a onClick={props.exitTutorial}>Exit Tutorial</a>. Your code will not be changed.</p>
					)}
				</div>
			)}
			{visible.value && !showingTutorial.value && (
				<div class={styles.content} dangerouslySetInnerHTML={{ __html: helpHtml }} />
			)}
		</div>
	)
}