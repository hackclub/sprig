# 👾 Sprig Engine 👾

[Sprig](https://github.com/hackclub/sprig/) is an open source game console, web-based game editor, and hardware development kit.

This is the standalone engine as used in the web editor. It's published as a package on [NPM](https://docs.npmjs.com/about-npm) so you can run Sprig games in your own projects and websites.

If you're into that kind of thing, this also comes with full TypeScript types included.

[Check out the docs for the core engine functions in the main repository.](https://github.com/hackclub/sprig/blob/main/docs/docs.md)

## Table of contents

<!-- toc -->

- [Quickstart (web)](#quickstart-web)
  - [Node.js and bundlers](#nodejs-and-bundlers)
  - [Using Sprig functions](#using-sprig-functions)
- [Common use cases](#common-use-cases)
  - [Running a game from a string](#running-a-game-from-a-string)
  - [Stopping/reloading games](#stoppingreloading-games)
- [Advanced use cases](#advanced-use-cases)
  - [Base engine](#base-engine)
  - [ImageData engine](#imagedata-engine)
  - [Get the Sprig palette](#get-the-sprig-palette)
  - [Read game state](#read-game-state)
  - [TypeScript](#typescript)
  - [SSR Support](#ssr-support)
- [API Reference](#api-reference)
  - [sprig](#sprig)
  - [sprig/base](#sprigbase)
  - [sprig/image-data](#sprigimage-data)
  - [sprig/web](#sprigweb)
- [Contributing](#contributing)

<!-- tocstop -->

## Quickstart (web)

```html
<!-- The Sprig device's aspect ratio is 5:4  -->
<canvas width="500" height="400" id="canvas" tabindex="0"></canvas>

<script type="module">
  import { webEngine } from "https://esm.sh/sprig@1/web"

  function runGame(api) {
    // Your game code here.
  }

  const game = webEngine(document.getElementById("canvas"))
  runGame(game.api)
</script>
```

(See [examples/simple-game.html](https://github.com/hackclub/sprig-engine/blob/main/examples/simple-game.html) for a full example. [See this deployed live!](https://hackclub.github.io/sprig-engine/examples/simple-game.html))

### Node.js and bundlers

If you're using Node.js or a bundler, you will want to install Sprig using a package manager:

```
$ npm install sprig
```

And import it:

```js
import { webEngine } from "sprig/web"
```

### Using Sprig functions

In the quickstart example, Sprig functions like `setLegend`, `playTune`, etc. are passed to the `runGame` function in one large object. They can be accessed like so:

```js
function runGame(api) {
  api.playTune(api.tune`...`)
}
```

Or you can "destructure" everything you need at the top of `runGame`, allowing you to write Sprig games like you might in the editor:

```js
function runGame(api) {
  const { setLegend, playTune, tune } = api

  playTune(tune`...`)
}
```

## Common use cases

### Running a game from a string

You might want to run a game stored in a string. For example, you might be building your own Sprig editor, or you might want to read games from a URL.

We recommend you create a function with a parameter for each Sprig function. This will allow the functions to be treated as global within the code.

This is what the Sprig editor does:

```js
const code = "playTune(tune`...`)" // For example.

const game = webEngine(canvas)
const fn = new Function(...Object.keys(game.api), code)
fn(...Object.values(game.api))
```

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch) is a great way to load games from a file hosted on the web:

```js
const response = await fetch("https://example.com/sprig-game.js")
const code = await response.text()

// Run the game as before.
```

### Stopping/reloading games

You might want to stop a game, perhaps to run new code. The web engine exposes a cleanup function for this purpose:

```js
const game = webEngine(canvas)
runGame(game.api)
// ...
game.cleanup()
```

This will:

- Clear the screen
- Stop drawing anything to the screen
- Stop listening for key presses
- End any tunes that are playing

**It will *not* cancel any timers.** `setTimeout` and `setInterval` are functions provided by the browser and Sprig doesn't mess with them by default. If you want to cancel timers on cleanup, you can implement your own timer functions as game functions and use those in your game instead:

```js
const game = webEngine(canvas)

const timeouts = []
const intervals = []
const customApi = {
  ...game.api,
  setTimeout: (fn, ms) => {
    const timer = setTimeout(fn, ms)
    timeouts.push(timer)
    return timer
  },
  setInterval: (fn, ms) => {
    const timer = setInterval(fn, ms)
    intervals.push(timer)
    return timer
  }
}

function customCleanup() {
  game.cleanup()
  timeouts.forEach(clearTimeout)
  intervals.forEach(clearInterval)
}

runGame(customApi)
// ...
customCleanup()
```

## Advanced use cases

### Base engine

All examples up to this point have been based on the web engine, a wrapper on top of Sprig's core engine that implements Canvas rendering, input handling, and tunes.

This package does include the base engine which can run in more environments and you can build upon. Because it's missing many implementations provided by the web engine, the base engine's returned API only contains a subset of engine functions.

```js
import { baseEngine } from "sprig/base"

const game = baseEngine()
runGame(game.api)
```

If you want to build on top of the base engine, looking at the [web engine source code](https://github.com/hackclub/sprig-engine/blob/main/src/web/index.ts) is a great place to start!

### ImageData engine

This includes an alternate engine layered on top of the base engine which is able to render games to static [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) objects in a headless capacity. This is used to implement the 3D interactive game console on the [Sprig homepage](https://sprig.hackclub.com/).

To use this engine:

```js
const { imageDataEngine } from "sprig/image-data"

const game = imageDataEngine()
runGame(game.api)
game.button("w") // Press W key.

const imageData = game.render()
```

### Get the Sprig palette

You can access the palette colors by importing it from the base engine:

```js
import { palette } from "sprig/base"
```

The palette is provided as an array of RGBA colors. Each palette item is a 2-element array:

- Single char color key as a string. (Example: `"3"` for red)
- 4-element array representing an RGBA color. (Example: `[0, 0, 0, 255]` for black)

> **Why an array and not an object?**
>
> The palette is an array because there's generally a defined order for the pallete items. This allows you to iterate over the palette and, for example, render a color picker.
>
> This unfortunately makes it harder to look up a color by key.

### Read game state

The base, web, and ImageData engines all return a `game.state` field which can be used to read the current game state.

```js
const game = webEngine(canvas)
runGame(game.api)

// ...

const screenWidth = game.state.dimensions.width
```

You can see all state fields in the `GameState` interface in [src/base/index.ts](https://github.com/hackclub/sprig-engine/blob/main/src/base/index.ts).

### TypeScript

This package has full TypeScript types included.

The standard API required for interop with all existing Sprig games is exported from the main package:

```ts
import type { FullSprigAPI } from "sprig"
```

You can use this type to verify API compatibility. The packaged web and base engines each only export certain subsets of this; for example, the web engine does not implement its own `setInterval` function because this is expected to be provided by the browser.

Most other types are exported from the base package.

### SSR Support

This whole package, including `sprig/web`, should be SSR-compatible. This means you can import it in a Node.js environment without errors. Please report an issue if this is not the case!

SSR-compatibility does *not* mean that all functions will work properly on the server. For example, the tune engine waits until `playTune` is called to initialize the `AudioContext`. This means the package can be *imported* on the server, but `playTune` will error in non-browser environments.

## API Reference

<!-- api -->

### sprig

```ts
const VALID_INPUTS: readonly ["w", "s", "a", "d", "i", "j", "k", "l"]
type InputKey = typeof VALID_INPUTS[number]
interface AddTextOptions {
    x?: number;
    y?: number;
    color?: string;
}
class SpriteType {
    type: string;
    x: number;
    y: number;
    readonly dx: number;
    readonly dy: number;
    remove(): void;
}
type Rgba = [
    number,
    number,
    number,
    number
]
interface TextElement {
    x: number;
    y: number;
    color: Rgba;
    content: string;
}
interface GameState {
    legend: [
        string,
        string
    ][];
    texts: TextElement[];
    dimensions: {
        width: number;
        height: number;
    };
    sprites: SpriteType[];
    solids: string[];
    pushable: Record<string, string[]>;
    background: string | null;
}
interface PlayTuneRes {
    end(): void;
    isPlaying(): boolean;
}
const tones: Record<string, number>
const instruments: readonly ["sine", "triangle", "square", "sawtooth"]
type InstrumentType = typeof instruments[number]
const instrumentKey: Record<string, "sine" | "triangle" | "square" | "sawtooth">
const reverseInstrumentKey: Record<"sine" | "triangle" | "square" | "sawtooth", string>
type Tune = [
    number,
    ...(InstrumentType | number | string)[]
][]
interface FullSprigAPI {
    map(template: TemplateStringsArray, ...params: string[]): string;
    bitmap(template: TemplateStringsArray, ...params: string[]): string;
    color(template: TemplateStringsArray, ...params: string[]): string;
    tune(template: TemplateStringsArray, ...params: string[]): string;
    setMap(string: string): void;
    addText(str: string, opts?: AddTextOptions): void;
    clearText(): void;
    addSprite(x: number, y: number, type: string): void;
    getGrid(): SpriteType[][];
    getTile(x: number, y: number): SpriteType[];
    tilesWith(...matchingTypes: string[]): SpriteType[][];
    clearTile(x: number, y: number): void;
    setSolids(types: string[]): void;
    setPushables(map: Record<string, string[]>): void;
    setBackground(type: string): void;
    getFirst(type: string): SpriteType | undefined;
    getAll(type: string): SpriteType[];
    width(): number;
    height(): number;
    setLegend(...bitmaps: [
        string,
        string
    ][]): void;
    onInput(key: InputKey, fn: () => void): void;
    afterInput(fn: () => void): void;
    playTune(text: string, n?: number): PlayTuneRes;
    setTimeout(fn: TimerHandler, ms: number): number;
    setInterval(fn: TimerHandler, ms: number): number;
    clearTimeout(id: number): void;
    clearInterval(id: number): void;
}
```

### sprig/base

```ts
const baseEngine: () => { api: BaseEngineAPI; state: GameState; }
type BaseEngineAPI = Pick<FullSprigAPI, 'setMap' | 'addText' | 'clearText' | 'addSprite' | 'getGrid' | 'getTile' | 'tilesWith' | 'clearTile' | 'setSolids' | 'setPushables' | 'setBackground' | 'map' | 'bitmap' | 'color' | 'tune' | 'getFirst' | 'getAll' | 'width' | 'height'>
const font: number[]
type PaletteItem = [
    string,
    Rgba
]
const palette: PaletteItem[]
const transparent: PaletteItem
const hexToRgba: (hex: string) => Rgba
const rgbaToHex: (rgba: Rgba) => string
const composeText: (texts: TextElement[]) => { char: string; color: Rgba; }[][]
const textToTune: (text: string) => Tune
const tuneToText: (tune: Tune) => string
```

### sprig/image-data

```ts
type ImageDataEngineAPI = BaseEngineAPI & Pick<FullSprigAPI, 'onInput' | 'afterInput' | 'setLegend' | 'setBackground' | 'setTimeout' | 'setInterval' | 'playTune'>
const imageDataEngine: () => { api: ImageDataEngineAPI; render(): ImageData; button(key: "w" | "s" | "a" | "d" | "i" | "j" | "k" | "l"): void; cleanup(): void; state: GameState; }
const bitmapTextToImageData: (key: string, text: string) => ImageData
```

### sprig/web

```ts
const webEngine: (canvas: HTMLCanvasElement) => { api: WebEngineAPI; state: GameState; cleanup(): void; }
type WebEngineAPI = BaseEngineAPI & Pick<FullSprigAPI, 'setLegend' | 'onInput' | 'afterInput' | 'playTune'> & {
    getState(): GameState; // For weird backwards-compatibility reasons, not part of API
}
const getTextImg: (texts: TextElement[]) => CanvasImageSource
const playFrequency: (frequency: number, duration: number, instrument: "sine" | "triangle" | "square" | "sawtooth", ctx: AudioContext, dest: AudioNode) => void
const playTuneHelper: (tune: Tune, number: number, playingRef: { playing: boolean; }, ctx: AudioContext, dest: AudioNode) => Promise<void>
const playTune: (tune: Tune, number?: number) => PlayTuneRes
```

<!-- apistop -->

## Contributing

Please make a pull request with any changes, or feel free to create an issue with questions or suggestions!

In a terminal, clone the repo and install packages:

```
$ git clone https://github.com/hackclub/sprig-engine/
$ cd sprig-engine
$ yarn install
```

Run the TypeScript build in watch mode:

```
$ yarn dev
```

Generate this Markdown file's table of contents:

```
$ yarn toc
```