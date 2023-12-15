import styles from './search-box.module.css'
import { VscArrowDown, VscArrowUp, VscCaseSensitive, VscClose, VscRegex, VscReplace, VscReplaceAll, VscWholeWord } from 'react-icons/vsc'
import { closeSearchPanel, findNext, findPrevious, replaceAll, replaceNext, SearchQuery } from '@codemirror/search'
import { Command } from '@codemirror/view'
import { Signal } from '@preact/signals'
import { modIcon } from '../lib/utils/events'
import { useEffect, useRef } from 'preact/hooks'
import tinykeys from 'tinykeys'

interface SearchBoxProps {
	query: Signal<SearchQuery>
	cursor: Signal<{ index: number, count: number }>
	runCommand: (action: Command) => void
}

export default function SearchBox({ query, cursor, runCommand }: SearchBoxProps) {
	const update = (diff: Partial<SearchQuery>) => {
		query.value = new SearchQuery({
			...query.value,
			...diff
		})
	}

	const container = useRef<HTMLDivElement>(null)
	const findInput = useRef<HTMLInputElement>(null)
	const replaceInput = useRef<HTMLInputElement>(null)
	
	useEffect(() => {
		findInput.current!.focus()
		const cleanups = [
			tinykeys(container.current!, {
				'Escape': () => runCommand(closeSearchPanel),
				'$mod+F': (event) => {
					event.preventDefault()
					findInput.current!.select()
				}
			}),
			tinykeys(findInput.current!, {
				'Enter': () => runCommand(findNext),
				'Shift+Enter': () => runCommand(findPrevious)
			}),
			tinykeys(replaceInput.current!, {
				'Enter': () => runCommand(replaceNext),
				'$mod+Enter': () => runCommand(replaceAll)
			})
		]
		return () => cleanups.forEach(cleanup => cleanup())
	}, [])

	return (
		<div class={styles.container} ref={container}>
			<div class={styles.row}>
				<div class={styles.input}>
					<input
						type='text'
						placeholder='Find'
						main-field='true'
						value={query.value.search}
						onInput={(event) => update({ search: event.currentTarget.value })}
						ref={findInput}
						tabIndex={1}
					/>

					<div class={styles.icons}>
						<button
							class={query.value.caseSensitive ? styles.active : ''}
							onClick={() => update({ caseSensitive: !query.value.caseSensitive })}
							title='Match Case'
							tabIndex={2}
						>
							<VscCaseSensitive />
						</button>
						<button
							class={query.value.wholeWord ? styles.active : ''}
							onClick={() => update({ wholeWord: !query.value.wholeWord })}
							tabIndex={2}
						>
							<VscWholeWord />
						</button>
						<button
							class={query.value.regexp ? styles.active : ''}
							onClick={() => update({ regexp: !query.value.regexp })}
							tabIndex={2}
						>
							<VscRegex />
						</button>
					</div>
				</div>

				<div class={`${styles.results} ${cursor.value.count === 0 && query.value.valid ? styles.error : ''}`}>
					{cursor.value.count === 0
						? 'No results'
						: cursor.value.index === 0
							? `${cursor.value.count} results`
							: `${cursor.value.index} of ${cursor.value.count}`}
				</div>

				<div class={styles.icons}>
					<button
						disabled={cursor.value.count === 0}
						onClick={() => runCommand(findPrevious)}
						title='Previous Match (⇧Enter)'
						tabIndex={2}
					>
						<VscArrowUp />
					</button>
					<button
						disabled={cursor.value.count === 0}
						onClick={() => runCommand(findNext)}
						title='Next Match (Enter)'
						tabIndex={2}
					>
						<VscArrowDown />
					</button>
					<button
						onClick={() => runCommand(closeSearchPanel)}
						title='Close (Escape)'
						tabIndex={2}
					>
						<VscClose />
					</button>
				</div>
			</div>

			<div class={styles.row}>
				<div class={styles.input}>
					<input
						type='text'
						placeholder='Replace'
						value={query.value.replace}
						onInput={(event) => update({ replace: event.currentTarget.value })}
						ref={replaceInput}
						tabIndex={1}
					/>
				</div>

				<div class={styles.icons}>
					<button
						disabled={!query.value.valid}
						onClick={() => runCommand(replaceNext)}
						title='Replace (Enter)'
						tabIndex={2}
					>
						<VscReplace />
					</button>
					<button
						disabled={!query.value.valid}
						onClick={() => runCommand(replaceAll)}
						title={`Replace All (${modIcon()}Enter)`}
						tabIndex={2}
					>
						<VscReplaceAll />
					</button>
				</div>
			</div>
		</div>
	)
}