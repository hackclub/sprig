export interface GameMetadata {
	filename: string
	title: string
	author: string
	img: string
	tags: string[]
	addedOn: string
	isNew: true | undefined
}

export const getGalleryGames = async () => await fetch('https://editor.sprig.hackclub.com/metadata.json').then((res) => res.json()) as GameMetadata[]