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

