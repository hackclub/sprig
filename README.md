# :leaves: [Hack Club Sprig](https://sprig.hackclub.dev) :leaves:

<img src="https://user-images.githubusercontent.com/27078897/179077324-74842cf2-be0b-4801-a3ab-90a5fcfa11f4.png" height="300px"/>

Sprig is a web-based environment for creating tile games. These games run in the browser and on the Sprig Console, a game console where every user is a creator. The only way to obtain a Sprig console is to make a game for it and share it in the [Sprig Gallery](https://sprig-gallery.hackclub.dev).

The best way to learn is by making things you care about and sharing them with others. That's what Sprig is all about.

You should be able to get started in Sprig with very little experience in programming. Even if you're an expert, you should still be able to have fun. We hope you enjoy Sprig, and we can't wait to see what you make.

## Philosophy

As we have said previously, people learn best when they make things that they care about, which they can then share with others. This type of learning philosophy is called constructionism, and Sprig is a type of microworld. A microworld is an environment where you can discover programming by using it to express yourself. 

This creative expression takes place in Sprig through game development, allowing users to become creators and make their own games or remix an existing one.

## Development

Join the `#sprig` channel on the [Hack Club Slack](https://hackclub.com/slack/) where you can join the development discussion and ask for help, and to learn more about how to make games with Sprig check out the [docs](https://github.com/hackclub/sprig/tree/main/docs).

We use vite for development.

Clone repo:

```
$ git clone https://github.com/hackclub/sprig/
```

To run:

```
cd sprig
yarn
yarn dev
```

Visit <http://localhost:3000> in your web browser and it should work!

## License

The Hack Club Sprig is open source and licensed under the [MIT License](./LICENSE). Fork, remix, and make it your own! Pull requests and other contributions greatly appreciated.

## TODO

### now
- [ ] empty bitmap should be editable
- [ ] fullscreen the game
- [ ] style the upload flow
- [x] monkeypatch `setInterval`
- [ ] preview maps
- [x] previews don't update accordingly
- [x] simplify api
  - single character references are confusing
  - matching and replacing can be done manually, more programmatic in a way
  - how to handle maps with multiple sprites in one tile
- [ ] map editor
  - [x] render combos
  - [x] add rows and columns
  - [x] under certain conditions editor sets text in wrong range

### at some point

- [ ] first line bitmap not previewed
- [ ] feedback on user inputs
- [ ] better error logging
- [ ] console
- [ ] When typing in browser console get: "Possible side-effect in debug-evaluate" (add error event handler)
- [ ] play on phone

### maybe

- [ ] use index of legend as key in map
- [ ] make legend, solids, tilesWith all variadic instead of taking lists

- [ ] add ability to delete saved files
- [ ] Across all editors, right click to erase
- [ ] Exporting:
  - [ ] HTML
  - [ ] Link
- [ ] Remove set size function
- [ ] Make sure everything matches docs in general
- [ ] BPM isn't a thing anymore, fix that
- [ ] Are stacks exclusive or inclusive? Do they replace the whole cell?
- [ ] Why does replacePattern return a boolean and not a count?
- [ ] Does `addSprite` add to the front or the back?
- [ ] Should we get rid of all the old Game Lab remnants?
- [ ] Does patternMap match stack behavior (can you pass a single *or* an array)?
- [ ] Warning when interpolating in tags
- [ ] GFM blockquote support
- [ ] Code highlighting (should match CodeMirror?)
- [ ] Styles for blockquotes
- [ ] Styles for images
- [ ] Interactive table of contents
- [ ] Backwards compatibility / tile engine
- [ ] Example games / gallery
- [ ] Since docs have moved, the README feels quite skeleton-like... what can we do to improve this?
  - [ ] Add images!
- [ ] Screen sizes
- [ ] Non-cursor interactions for ipad and chromebook
- [ ] Make sure if the mouse is unpressed outside an editor canvas that's registered (we need global listeners and proper cleanups to prevent memory leaks)
- [ ] charactersitic image
- [ ] image gallery
- [ ] load images dropping them in
- [ ] When editing undersized bitmap: "unknown color: undefined" (kog: is this a bug?)


### addressed
- [x] Editors blink when loading
- [x] make deployment build work
- [x] make map size correctly in map editor
- [x] Code folding
- [x] link sharing
- [x] add screen resizing bars
- [x] fix tune editor
- [x] Fix `>` and `<` in code blocks showing up as `&gt;` and `&lt;`
  - sort of hacked this
- [x] Show warnings in editor
- [x] file or project manager
- [x] Finish docs
- [x] Styles for docs
- [x] Basic README
- [x] Prototype the new PCB-based editor design
- [x] Add local storage
- [x] Sprites, tiles, cells -> bitmaps, sprites, cells
  - [x] Base change
  - [x] Sprite `type` to `bitmapKey`
- [x] `getFirst` function
- [x] Scrap `getGrid`
- [x] Update parameter names to match docs
- [x] Verify controls against docs
- [x] Make internal functions start with `_`
- [x] Make sure dx and dy are cleared on every input beginning and ending
- [x] Add wildcard to pattern matching
- [x] `setMap` supports a sprite combo map too, how should that work?
- [x] In pattern matching, make sure sprites are entirely cleared
- [x] Warning for creating a sprite with multi-character keys, with period as key, with asterisk as key
- [x] Error if bitmap is passed instead of bitmap key (only in `addSprite`, could be in more!)
- [x] Pattern matching:
  - [x] Error for mismatching size?
  - [x] Error for wildcards?
  - [x] Error for functions in the replacer?
- [x] size the game screen correctly
  - [ ] pixels are integers
- [x] Tune gets cleared when you try to edit it
- [x] colors
  - logo color line
  - terminal color system



