import { useSignal, useSignalEffect } from '@preact/signals'
import { IoCaretDown, IoCaretUp } from 'react-icons/io5'
import styles from './help.module.css'
import { compiledContent } from '../../../docs/docs.md'

interface HelpProps {
	initialVisible?: boolean
}

const html = compiledContent()

export default function Help(props: HelpProps) {
	const visible = useSignal(props.initialVisible ?? false)
	
	useSignalEffect(() => {
		document.cookie = `hideHelp=${!visible.value};path=/;max-age=${60 * 60 * 24 * 365}`
	})

	return (
		<div class={styles.container}>
			<div role='button' class={styles.tab} onClick={() => visible.value = !visible.value}>
				{visible.value ? <IoCaretDown /> : <IoCaretUp />}
				{visible.value ? 'Hide' : 'Show'} Help
			</div>
			{visible.value && <div class={styles.content} dangerouslySetInnerHTML={{ __html: html }} />}
		</div>
	)
}