export interface User {
	id: string
	username: string
}

export const getUser = async (): Promise<User | null> => {
	// return null
	return { id: '321tset', username: 'Test' }
}

export interface Game {
	id: string
	ownerId: string
	name: string
	code: string
}

export const getGame = async (id: string): Promise<Game | null> => {
	if (id !== 'test123') return null
	return {
		id: 'test123',
		ownerId: '321tset',
		name: 'Test Game',
		code: `const player = "p";

setLegend(
	[ player, bitmap\`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................\`]
);

setSolids([]);

let level = 0;
const levels = [
	map\`
p.....
......\`,
];

setMap(levels[level]);

setPushables({
	[ player ]: [],
});

onInput("s", () => {
	getFirst(player).y += 1
});

afterInput(() => {
	
});`
	}
}