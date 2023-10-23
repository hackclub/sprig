import { Signal, useSignal, useSignalEffect } from '@preact/signals'
import { IoCaretBack, IoCaretDown, IoCaretForward, IoCaretUp } from 'react-icons/io5'
import styles from './help.module.css'
import { compiledContent } from '../../../docs/docs.md'
import { codeMirror, PersistenceState } from '../../lib/state'
import Button from '../design-system/button'
import { saveGame } from '../big-interactive-pages/editor'
import { useEffect } from 'preact/hooks'
import { isDark } from '../../lib/state'

interface HelpProps {
	initialVisible?: boolean
	tutorialContent?: string[]
	persistenceState?: Signal<PersistenceState>
	showingTutorialWarning?: Signal<boolean>
}
const helpHtml = compiledContent()

export default function Help(props: HelpProps) {
	const visible = useSignal(props.tutorialContent ? true : (props.initialVisible ?? false))
	const showingTutorial = useSignal(props.tutorialContent !== undefined)

	useEffect(() => {
	}, [isDark]);

	const tutorialHtml = props.tutorialContent 
		&& (props.persistenceState?.value.kind == 'PERSISTED' || props.persistenceState?.value.kind == 'SHARED')
		&& props.tutorialContent[props.persistenceState?.value.tutorialIndex || 0]
	
	useSignalEffect(() => {
		document.cookie = `hideHelp=${!visible.value};path=/;max-age=${60 * 60 * 24 * 365}`
	})
	
	const setTutorialIndex = (tutorialIndex: number) => {
		if (props.persistenceState?.value.kind == 'PERSISTED') {
			props.persistenceState.value = {
				...props.persistenceState.value,
				stale: true,
				cloudSaveState: 'SAVING',
				tutorialIndex
			}
			saveGame(props.persistenceState, codeMirror.value!.state.doc.toString())
		} else if (props.persistenceState?.value.kind == 'SHARED') {
			props.persistenceState.value = {
				...props.persistenceState.value,
				tutorialIndex
			}
		}
	}
	
	const nextPage = () => {
		const tutorialIndex = 
			(props.persistenceState?.value.kind == 'PERSISTED' || props.persistenceState?.value.kind == 'SHARED') && 
			props.persistenceState.value.tutorialIndex || 0
		setTutorialIndex(tutorialIndex + 1)
	}
	
	const previousPage = () => {
		const tutorialIndex =
			(props.persistenceState?.value.kind == 'PERSISTED' || props.persistenceState?.value.kind == 'SHARED') &&
			props.persistenceState.value.tutorialIndex || 0
		setTutorialIndex(tutorialIndex - 1)
	}
	return (
		<div class={styles.container} >
			
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
					<div dangerouslySetInnerHTML ={{ __html: tutorialHtml }} />

					{(props.persistenceState?.value.kind == 'PERSISTED' || props.persistenceState?.value.kind == 'SHARED') && (
						<>
							<br/>
						<div class={styles.paginationContainer}>
							<div class={styles.backContainer}>
						{props.persistenceState.value.tutorialIndex != undefined
							&& props.persistenceState.value.tutorialIndex > 0
							&& (<Button onClick={previousPage} class={`${styles.paginationButton} ${styles.backButton}`}><IoCaretBack/> Back</Button>)}
							</div>

							<div class={styles.centerContainer}>
							{props.persistenceState.value.tutorial
								&& props.persistenceState.value.tutorial.length > 1
									&& (<div class={styles.pageIndicator}>Page {(props.persistenceState.value.tutorialIndex || 0) + 1}/{props.persistenceState.value.tutorial && props.persistenceState.value.tutorial.length}</div>)}
							</div>
							<div class={styles.forwardContainer}>
							{props.persistenceState.value.tutorialIndex != undefined
							&& props.persistenceState.value.tutorial
							&& props.persistenceState.value.tutorialIndex < props.persistenceState.value.tutorial.length - 1
							&& (<Button onClick={nextPage} class={styles.paginationButton} accent>Next <IoCaretForward/></Button>)}


							{props.persistenceState.value.tutorialIndex != undefined
								&& props.persistenceState.value.tutorial
								&& props.persistenceState.value.tutorialIndex == props.persistenceState.value.tutorial.length - 1
								&& (<Button class={styles.paginationButton} onClick={() => {
									props.showingTutorialWarning!.value = true
								}} accent>Exit Tutorial</Button>)}
							</div>
							</div>
							

						</>
					)}
				</div>
			)}
			{visible.value && !showingTutorial.value && (
				<div class={isDark.value ? styles.content_dark : styles.content} dangerouslySetInnerHTML={{ __html: helpHtml }} />
			)}
		</div>
	)
}
