import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import { IoCaretDown, IoCaretUp } from 'react-icons/io5'
import styles from './help.module.css'
import { compiledContent } from '../../../docs/docs.md'
import { PersistenceState } from '../../lib/state'
import Button from '../design-system/button'

interface HelpProps {
	initialVisible?: boolean
	tutorialContent?: string
	persistenceState?: Signal<PersistenceState>
	showingTutorialWarning?: Signal<boolean>
}
const helpHtml = compiledContent()

export default function Help(props: HelpProps) {
	const visible = useSignal(props.tutorialContent ? true : (props.initialVisible ?? false))
	const showingTutorial = useSignal(props.tutorialContent !== undefined)

	const tutorialHtml = props.tutorialContent
	
	useSignalEffect(() => {
		document.cookie = `hideHelp=${!visible.value};path=/;max-age=${60 * 60 * 24 * 365}`
	})

	return (
		<div class={styles.container}>
			<div class={styles.tabs}>
				{tutorialHtml && visible.value && (
					<div role='button' className={`${styles.tab} ${showingTutorial.value ? styles.selected : ''}`} onClick={() => showingTutorial.value = true}>
					Tutorial
					</div>
				)}
				{tutorialHtml && visible.value && (
					<div role='button' className={`${styles.tab} ${showingTutorial.value ? '': styles.selected}`} onClick={() => showingTutorial.value = false}>
					Help
					</div>
				)}
				<div role='button' class={styles.tab} onClick={() => visible.value = !visible.value}>
					{visible.value ? <IoCaretDown /> : <IoCaretUp />}
					{tutorialHtml ? `${visible.value ? '' : 'Show Help'}` : `${visible.value ? 'Hide' : 'Show'} Help`}
				</div>
			</div>

			{tutorialHtml && props.persistenceState && visible.value && showingTutorial.value && (
				<div class={styles.content} >
					<div dangerouslySetInnerHTML={{ __html: tutorialHtml }} />
					{props.persistenceState.value.kind === 'PERSISTED' && (
						<Button onClick={() => {
							props.showingTutorialWarning!.value = false
						}} accent>I finished! End tutorial</Button>
					)}
				</div>
			)}
			{visible.value && !showingTutorial.value && (
				<div class={styles.content} dangerouslySetInnerHTML={{ __html: helpHtml }} />
			)}
		</div>
	)
}