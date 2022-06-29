# [👾 Hack Club Game Lab →](#)

✨ Version 2: now experimenting with a new tile-based game engine!

The best way to learn is by making things you care about and sharing them with others.  
**That's what Game Lab is all about.**

Ever wanted to make a delightful new game? Game Lab is your chance to shine!

You should be able to get started in Game Lab with very little experience programming. Even if you're an expert, you should still be able to have fun. We hope you enjoy Game Lab, and we can't wait to see what you make.

### ⮑ _**[Click here to launch Game Lab](#)**_ ⮐
_(and check out [docs.md](/docs.md) to learn more)_

## Philosophy

People learn best when they make things that they care about, which they can then share with others. This learning philosophy is called [constructionism](https://en.wikipedia.org/wiki/Constructionism_(learning_theory)). Game Lab is a microworld, an environment you can use to express yourself while discovering programming.

Game Lab could also be considered a minimalist [fantasy console](https://en.wikipedia.org/wiki/Fantasy_video_game_console) sort of like [Pico-8](https://www.lexaloffle.com/pico-8.php).

## Development

Join `#gamelab-dev` on the [Hack Club Slack](https://hackclub.com/slack/) to join the development discussion.

Game Lab requires a local HTTP server to run in development. Here's how to get it running on your own machine.

Clone repo:

```
$ git clone https://github.com/hackclub/gamelab/
```

Start a local HTTP server inside the repo:

```
$ cd gamelab/
$ git checkout puzzle-engine
$ python3 -m http.server 3000
```

Visit <http://localhost:3000> in your web browser and it should work!

## License

The Hack Club Game Lab is open source and licensed under the [MIT License](./LICENSE). Fork, remix, and make it your own! Pull requests and other contributions greatly appreciated.

## Roadmap-ish

**Tuesday:** Discuss game gallery / sharing and roadmap.

**Wednesday:** All about design, design, design, design.

**Wednesday-Thursday:** Implement the design. Landing page?

**Friday+:** Build the gallery system.

**Tuesday:** Pass on everything, last-minute work.

Lexi gone on the morning of Wednesday, June 22nd.

## TODO

### now
- [ ] fullscreen the game
- [ ] make map size correctly in map editor
- [ ] Code folding
- [ ] style the upload flow
- [x] make deployment build work
- [ ] preview maps

### at some point

- [ ] first line bitmap not previewed
- [ ] feedback on user inputs
- [ ] better error logging
- [ ] Editors blink when loading
- [ ] console
- [ ] When typing in browser console get: "Possible side-effect in debug-evaluate" (add error event handler)
- [ ] map editor
  - [x] render combos
  - [ ] add rows and columns
  - [x] under certain conditions editor sets text in wrong range
- [ ] play on phone

### maybe

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



