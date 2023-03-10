export interface GameMetadata {
	filename: string
	title: string
	author: string
	img: string
	tags: string[]
	addedOn: string
	isNew: true | undefined
}

export const getGalleryGames = async () => await fetch('https://raw.githubusercontent.com/hackclub/sprig/main/games/metadata.json').then((res) => res.json()) as GameMetadata[]