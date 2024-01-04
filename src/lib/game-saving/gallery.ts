import metadata from '../../../games/metadata.json'

export interface GameMetadata {
	filename: string
	title: string
	smallTitle: string
	author: string
	smallAuthor: string
	img: string
	tags: string[]
	addedOn: string
	isNew: true | undefined
}

export const getGalleryGames = () => metadata as GameMetadata[]