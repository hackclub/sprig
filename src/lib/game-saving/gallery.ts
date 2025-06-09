import metadata from "../../../games/metadata.json";

export interface GameMetadata {
	filename: string;
	title: string;
	description: string;
	lowerCaseTitle: string;
	author: string;
	lowerCaseAuthor: string;
	tags: string[];
	addedOn: string;
	isNew: true | undefined;
}

export const getGalleryGames = () => metadata as GameMetadata[];
