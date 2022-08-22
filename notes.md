## Leo stuff

Some things to consider.

- How to restart games?
- How to describe win conditions?
  - all tiles of certain types match up

- How to check for patterns on top of one tile?
- What to do in the event of collisions?

- Whether there should be collision layers or just one solid layer?
  - What would the former enable?

- Is the concept of pushability neccessary?
  - Can it be covered by replacements, replacements don't have notion of motion

- Match test could take whole tile or tile type

- Only want to draw one map

- What special symbols are in replacement rules?
  - "." anything
  - "\_" nothing
  - "\_" could also mean nothing solid or background

- Is there some way of creating layers which only interact (match?) with themselves

- Is it better to be strictly 2d with one block in each spot at a time
  - ben's cursor in lights out wouldn't work

- solid could be a tile attribute

## Simplenote notes

Tile games

Collision layers
Tiles in same array can't be in same place
Prevents replacements that cause this
Prevents movements that cause this?

Combine
Replaces array of tiles with new tile

Match(pattern, testKey)
testKey = { type: test(tile) }

Replace(patternset, set)

Make(pattern)
.map(t => if (t.type === "p") t.type = n)

Unknown tiles are blank

. is blank

To test for anything use custom test

Copy board

Swap taking combos of tiles and returning multiple tiles

Could have arrays in legend

Addtile list results in adding multiple tiles

Addlayer vs setmap
Clear current layer, only one per level anyway?
Add key to have multiple things in character
if maps have different dimensions weird behavior

Why "and" doesn't work in replace, which tile should you return? Replace needs to run per tile. Could return list use filter over find. For and to work need to run filter per cell. Issue is then you have an array of arrays of arrays as result. What if "and" tiles are in legend

Don't need replace with match and type editing

Setting type to "." should remove

When do I need AND
Creating levels - could use match and addtile
Matching for win conditions - could combine with temp tile then match addtile to replace
Matching overlapping tile

Which game needs this?

Return empty lists for empty cells in gettilegrid?

Match reuses pattern fragments
12121 match 121 twice
Could fix by incrementing index on match
No filter over lapping rectangles

How to check for win conditions


------------------------------------------

Todo

- finilize engine design
- Generate sound effects
- Editor
- Upload flow
- Hype site
- Finish circuit design
  - decide sound circuit


-----------------------


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


