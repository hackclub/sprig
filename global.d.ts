export {}

declare global {
	type Key = string & {}
	type Bitmap = string & { __brand: "bitmap" }
	type SprigMap = string & { __brand: "sprigmap" }
	type Color = string & { __brand: "color" }
	type Tune = string & { __brand: "tune" }

	type Sprite = {
		type: string
		x: number
		y: number
		remove: () => Sprite
	}

	type InputKey = "w" | "a" | "s" | "d" | "i" | "j" | "k" | "l"
	type Playback = { end: () => void }

	/* Level Design */
	function setLegend(...bitmaps: [Key, Bitmap][]): void
	function setBackground(bitmapKey: Key): void
	function setMap(level: SprigMap): void
	function setSolids(bitmapKeys: Key[]): void
	function setPushables(pushMap: Record<Key, Key[]>): void
	function width(): number
	function height(): number

	/* User Input */
	function onInput(key: InputKey, cb: () => void): void
	function afterInput(cb: () => void): void

	/* Sprites and Tiles */
	function getTile(x: number, y: number): Sprite[]
	function tilesWith(...type: Key[]): Sprite[][]
	function addSprite(x: number, y: number, spriteType: Key): void
	function clearTile(x: number, y: number): void
	function getAll(type: Key): Sprite[]
	function getFirst(type: Key): Sprite

	/* Text */
	function addText(text: string, options?: { x?: number; y?: number; color?: Color }): void
	function clearText(): void

	/* Music */
	function playTune(tune: Tune, repeat?: number): Playback

	/* Debugging */
	function getState(): {
		background: Key
		dimensions: {
			width: number
			height: number
		}
		legend: [Key, Bitmap][]
		pushable: Record<Key, Key[]>
		solids: Key[]
		sprites: Sprite[]
		texts: {
			color: [number, number, number, number]
			content: string
			x: number
			y: number
		}[]
	}

	/* Tagged template literals */
	function bitmap(template: TemplateStringsArray, ...params: string[]): Bitmap
	function map(template: TemplateStringsArray, ...params: string[]): SprigMap
	function color(template: TemplateStringsArray, ...params: string[]): Color
	function tune(template: TemplateStringsArray, ...params: string[]): Tune
}
