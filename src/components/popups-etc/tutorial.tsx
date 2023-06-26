import { useSignal, useSignalEffect } from '@preact/signals'
import { IoCaretDown, IoCaretUp } from 'react-icons/io5'
import styles from './tutorial.module.css'
import { compiledContent } from '../../../docs/docs.md'
import { marked } from 'marked';

interface HelpProps {
	content: string
}

const helpHtml = compiledContent()

export default function Tutorial(props: HelpProps) {
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
			{visible.value && <div class={styles.content} dangerouslySetInnerHTML={{ __html: showingTutorial.value ? tutorialHtml : helpHtml }} />}
		</div>
	)
}