import metadata from '../../../games/metadata.json'

export interface GameMetadata {
	filename: string
	title: string
	author: string
	img: string
	tags: string[]
	addedOn: string
	isNew: true | undefined
}

export const getGalleryGames = () => metadata as GameMetadata[]