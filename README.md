# A Tile Based Gamelab

We're experimenting with a tile based game engine.

The functions for making games are defined in `./engine/gamelab_functions.js`.

Check out the example games in `./games/`.

You can draw sprites using the pixel editor.

Go to `https://localhost:3000/pixel-editor`.

Draw your sprite and click print to get the sprite data string in the console.

## Roadmap-ish

**Tuesday:**

- [x] Figure out game gallery / sharing
- Lexi:
  - [x] Finish docs
  - [ ] Styles for docs
  - [ ] README
- Leo:
  - [ ] Code folding
  - [ ] Add local storage
  - [ ] Exporting:
    - [ ] HTML
    - [ ] Link

**Wednesday:** All about design, design, design, design.

**Wednesday-Thursday:** Implement the design. Landing page?

**Friday+:** Build the gallery system.

**Tuesday:** Pass on everything, last-minute work.

Lexi gone on the morning of Wednesday, August 22nd.

## Kognotes

- Renames and refactoring:
  - [x] Sprites, tiles, cells -> bitmaps, sprites, cells
    - [x] Base change
    - [x] Sprite `type` to `bitmapKey`
  - [x] `getFirst` function
  - [x] Scrap `getGrid`
  - [ ] Remove set size function
  - [x] Update parameter names to match docs
  - [x] Verify controls against docs
  - [ ] Make internal functions start with `_`
  - [ ] Make sure everything matches docs in general
- Features, bugfixes, considerations:
  - [x] Make sure dx and dy are cleared on every input beginning and ending
  - [ ] Add wildcard to pattern matching
  - [ ] BPM isn't a thing anymore, fix that
  - [ ] Are stacks exclusive or inclusive? Do they replace the whole cell?
  - [ ] Does patternMap match stack behavior (can you pass a single *or* an array)?
  - [ ] Why does replacePattern return a boolean and not a count?
  - [ ] Does `addSprite` add to the front or the back?
  - [ ] `setMap` supports a sprite combo map too, how should that work?
  - [ ] Should we get rid of all the old Game Lab remnants?
  - [ ] In pattern matching, make sure sprites are entirely cleared
- Warnings and errors:
  - [ ] Warning for creating a sprite with multi-character keys, with period as key, with asterisk as key
  - [ ] Error if sprite is passed instead of sprite key
  - [ ] Pattern matching:
    - [ ] Error for mismatching size?
    - [ ] Error for wildcards?
    - [ ] Error for functions in the replacer?
  - [ ] Warning when interpolating in tags
  - [ ] Show warnings in editor
- Editor environment bugs:
  - [ ] Editors blink when loading
  - [ ] When typing in browser console get: "Possible side-effect in debug-evaluate" (add error event handler)
  - [ ] Tune gets cleared when you try to edit it
  - [ ] When editting undersized sprite: "unknown color: undefined" (kog: is this a bug)
