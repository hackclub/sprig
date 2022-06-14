
spriteMap :: {
  [character]: img
}

sprite :: {
  x: number
  y: number
  type: character
  dx: number ?
  dy: number ?
}

pushMap :: {
  [character]: character[] 
}

tile :: sprite[]

patternMap :: {
  [character]: character[]
}

stackPattern :: character | character[]

### setLegend :: spriteMap -> null

associates character with bitmap

### setMap :: string -> allTiles

clears all tiles and adds new sprites based on map

### getTile :: x:number y:number -> tile

returns sprites in x,y location

### addSprite :: x:number y:number type:character -> sprite

creates sprite of type at x,y location

### clearTile :: x:number y:number -> null

clears sprites at x,y location

### moveSprite :: sprite:sprite dx:number dy:number -> null

moves sprite by dx and dy, can't move one solid into another solid

### onInput

### afterInput

### setSolids :: character[] -> null

makes sprite types solid, solid can't overlap with each other (can't be moved on top of?)

### setPushables :: pushMap -> null

character keys can push sprites of types included in character array value

### matchPattern :: pattern:string patternMap = {} -> sprite[][]

returns array of matched patterns

### replacePattern :: pattern:string pattern:string -> boolean

patterns must have matched dimensions if matched then replaces first pattern with second

returns boolean of whether match occurred

### swapTile :: pattern:stackPattern pattern:stackPattern -> number


### map
### tune
### sprite
### getFirst
### getAll
### clear
### setZOrder
### setBackground

tiles have x, y, dx, dy, type