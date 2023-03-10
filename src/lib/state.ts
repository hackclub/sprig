import type { EditorView } from '@codemirror/view'
import { Signal, signal } from '@preact/signals'
import { IoColorPalette, IoImage, IoMap, IoMusicalNotes } from 'react-icons/io5'
import type { FromTo } from './codemirror/util'

import BitmapEditor from '../components/editors/bitmap-editor'
import ColorPickerEditor from '../components/editors/color-picker'
import MapEditor from '../components/editors/map-editor'
import SequencerEditor from '../components/editors/sequencer'

// Error handling
export interface NormalizedError {
	line: number | null
	column: number | null
	description: string
	raw: unknown
}
export const formatError = (normalizedError: NormalizedError): string => {
	const { line, column, description } = normalizedError
	if (line === null) return description
	if (column === null) return `Error (line ${line}): ${description}`
	return `Error (line ${line} col ${column}): ${description}`
}

// Editor types
export interface EditorProps {
	text: Signal<string>
}
export const editors = {
	bitmap: {
		label: 'bitmap',
		icon: IoImage,
		modalContent: BitmapEditor,
		fullsizeModal: true,
		needsBitmaps: false
	},
	sequencer: {
		label: 'tune',
		icon: IoMusicalNotes,
		modalContent: SequencerEditor,
		fullsizeModal: true,
		needsBitmaps: false
	},
	map: {
		label: 'map',
		icon: IoMap,
		modalContent: MapEditor,
		fullsizeModal: true,
		needsBitmaps: true
	},
	palette: {
		label: 'color',
		icon: IoColorPalette,
		modalContent: ColorPickerEditor,
		fullsizeModal: false,
		needsBitmaps: false
	}
}
export type EditorKind = keyof typeof editors
export const editorKinds = Object.keys(editors) as EditorKind[]

export interface OpenEditor {
	kind: EditorKind
	editRange: FromTo
	text: string
}

export const codeMirror = signal<EditorView | null>(null)
export const muted = signal<boolean>(false)
export const errorLog = signal<NormalizedError[]>([])
export const openEditor = signal<OpenEditor | null>(null)
export const bitmaps = signal<[string, string][]>([])