/*
@title: hack_craft
@author: khushraj
@tags: ['simulation','retro']
@addedOn: 2022-12-22

Instructions:

This is a voxel game in which you can build/destroy structures. 

Important note on contributing/hacking: While hacking is possible on the
type-stripped & bundled version of the game (the code below), the same game is
originally written in TypeScript, and is split across multiple files for
organization. The source (and instructions + a template on how to build your own
sprig game with TypeScript) is available at https://github.com/khrj/hackcraft.

The controls are given below:

* Global Controls
* ===============
*
* a to move left
* d to move right
* w to jump
* hold s to clear map
*
* Normal Mode
* ===========
*
* k to place block (to right if on ground, below if in air)
* l to mine block (first which exists in this order: right, below, left, above)
*
* s to enable mine mode
* i to enable inventory mode
* j to enable build mode
*
* Mine mode and build mode
* ========================
*
* i to place/break top
* l to place/break right
* j to place/break left
* k to place/break bottom
* s to exit mode
*
* Inventory mode
* ==============
*
* j to go left
* l to go right
* s to exit mode

*/

(function () {
    'use strict';

    const playerTop = "t";
    const playerBottom = "b";
    const dirt = "d";
    const stone = "s";
    const plank = "p";
    const sand = "a";
    const log = "l";
    const leaves = "e";
    const white_wool = "w";
    const red_wool = "r";
    const black_wool = "c";

    const selectedKeys = {
        [dirt]: "1",
        [stone]: "2",
        [plank]: "3",
        [sand]: "4",
        [log]: "5",
        [leaves]: "6",
        [white_wool]: "7",
        [red_wool]: "8",
        [black_wool]: "9",
    };
    const slotDefaults = [dirt, stone, plank, sand, log, leaves, white_wool, red_wool, black_wool];
    const pos = { x: 5, y: 0 };
    class Inventory {
        constructor() {
            this.selection = 0;
        }
        get current() {
            return slotDefaults[this.selection];
        }
        next() {
            if (this.selection < 8) {
                this.unhighlight(this.selection);
                this.selection++;
                this.highlight(this.selection);
            }
        }
        previous() {
            if (this.selection > 0) {
                this.unhighlight(this.selection);
                this.selection--;
                this.highlight(this.selection);
            }
        }
        rerender() {
            for (let i = 0; i < 9; i++) {
                this.unhighlight(i);
            }
            this.highlight(this.selection);
        }
        highlight(slot) {
            clearTile(slot + pos.x, pos.y);
            addSprite(slot + pos.x, pos.y, selectedKeys[slotDefaults[slot]]);
        }
        unhighlight(slot) {
            clearTile(slot + pos.x, pos.y);
            addSprite(slot + pos.x, pos.y, slotDefaults[slot]);
        }
    }

    const makeSelectedBitmap = (originalBmp) => {
        let lines = originalBmp.trim().split("\n");
        const horizontalHighlight = "6666666666666666";
        lines[0] = horizontalHighlight;
        lines[lines.length - 1] = horizontalHighlight;
        for (let i = 1; i < lines.length - 1; i++) {
            lines[i] = `6${lines[i].slice(1, lines[i].length - 1)}6`;
        }
        return lines.join("\n");
    };
    const bitmapsMap = {
        [playerTop]: bitmap `
....CCCCCCCC....
....CCCCCCCC....
....99999999....
....99999999....
....92099029....
....99999999....
....99999999....
....99999999....
7777779999777777
7777777997777777
7777777777777777
7777777777777777
9999777777779999
9999777777779999
9999777777779999
9999777777779999`,
        [playerBottom]: bitmap `
9999777777779999
9999777777779999
9999555555779999
9999555555579999
....55555555....
....55555555....
....55555555....
....55555555....
....55555555....
....55555555....
....55555555....
....55555555....
....55555555....
....55555555....
....00000000....
....00000000....`,
        [dirt]: bitmap `
44DD4DDD44DD4D44
44444C44DD444444
4C444C4C4444C44C
CCCC4CCC4C4CCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`,
        [stone]: bitmap `
LLLLLL1101LLLLLL
LL1111LLL1110LLL
L0LL0LLL10LLLLLL
L1LLL0L1LLLLLLLL
L11LLLLLLL111110
00LLLLLLL0LLLL0L
11LLLLLLLLLL1110
LLLLLLLLL0LLLLLL
L1101LLLL1111111
LLLLLLLL0LLLLL1L
LL1LL11L0L111LLL
0LLLLLLL11LLL110
LLLLLLLL11LLLLLL
L11111LLLL0LLL11
LLLLLLLLLL11LLLL
LLLL011LLLLLLLLL`,
        [plank]: bitmap `
FFFFFFFFFFFFFFFF
FFFCFFFFFFFFFFFF
FFFFFFFFFFFFCFFF
CCCCCCCCCCCCCCCC
FFFFFFFFFFFCFFFF
FFCFFFFFFFFFFFFF
FFFFFFFFFFCFFFFF
CCCCCCCCCCCCCCCC
FFFFCFFFFFFFFFFF
FFFFFFFFFFFCFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFCFF
FFCFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC`,
        [sand]: bitmap `
6666666666666626
66666F6666626666
6666666666666662
666666666F66666F
F66626666666666F
F66F6F666266666F
6666666666626666
6666666266666626
6666666662F66666
F66F6F6666666666
6666666666666266
F666666666266666
66666666F6666666
6666F66666666666
66666666666F6666
6666626666666666`,
        [log]: bitmap `
C0CCC0CC0CCCCCCC
C0CC00C0CC0CC0C0
C0CC0CC0CC0CC0C0
0C0C0CC0CC0CC0C0
CC0CCCCCCC0CC0C0
CCCCCCCCCC0CC0C0
0CC0CCCC0C0C00C0
CCC0CC0C0C0C0CC0
CCC0CC0C0C0C0CC0
CCC0CCC0CC0C0CC0
C0C0CCC0C0CC0CC0
C0C0CCC0C0CC0CC0
00C0CCC0C0CC0CC0
00CCCCC0CCCC0CCC
C0CC0CC00CCC0CC0
CCCC0CCC0CCC0CCC`,
        [leaves]: bitmap `
4.4D4.4.4.4..444
D4.4.4.D4D.44D.4
4.D4D4.4444D4.4.
..44..4D4D4444.4
.4D4D4D444D4D4..
...4..4.4444444.
.D...D4D.4D4D44.
4D4.4444...4....
.4.44D4D4.D....4
D4D....44.D4..44
444..D4...44444.
D4D44D444D4D.4..
.4..4.4.4444...D
4..D.D44.D4D444D
44...44D.4.4.44.
D44D4D4D444.4D.4`,
        [white_wool]: bitmap `
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`,
        [red_wool]: bitmap `
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`,
        [black_wool]: bitmap `
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`,
    };
    const verbatim = Object.entries(bitmapsMap);
    const selected = verbatim.flatMap(([key, bmp]) => key in selectedKeys ? [[selectedKeys[key], makeSelectedBitmap(bmp)]] : []);
    const bitmaps = [...verbatim, ...selected];

    var Direction;
    (function (Direction) {
        Direction[Direction["Above"] = 0] = "Above";
        Direction[Direction["Below"] = 1] = "Below";
        Direction[Direction["Left"] = 2] = "Left";
        Direction[Direction["Right"] = 3] = "Right";
    })(Direction || (Direction = {}));
    class Blocks {
        static placeAuto(player, block) {
            if (player.isGrounded()) {
                this.place(player, block, Direction.Right);
            }
            else {
                this.place(player, block, Direction.Below);
            }
        }
        static place(player, block, direction) {
            const { x, y } = player.bottomSprite;
            if (direction === Direction.Right)
                addSprite(x + 1, y, block);
            else if (direction === Direction.Below)
                addSprite(x, y + 1, block);
            else if (direction === Direction.Above)
                addSprite(x, y - 2, block);
            else if (direction === Direction.Left)
                addSprite(x - 1, y, block);
        }
        static mineAuto(player) {
            if (this.existsBlock(player, Direction.Right))
                this.mine(player, Direction.Right);
            else if (this.existsBlock(player, Direction.Below))
                this.mine(player, Direction.Below);
            else if (this.existsBlock(player, Direction.Left))
                this.mine(player, Direction.Left);
            else if (this.existsBlock(player, Direction.Above))
                this.mine(player, Direction.Above);
        }
        static mine(player, direction) {
            const { x, y } = player.bottomSprite;
            if (direction === Direction.Right)
                clearTile(x + 1, y);
            else if (direction === Direction.Below)
                clearTile(x, y + 1);
            else if (direction === Direction.Above)
                clearTile(x, y - 2);
            else if (direction === Direction.Left)
                clearTile(x - 1, y);
        }
        static existsBlock(player, direction) {
            const { x, y } = player.bottomSprite;
            if (direction === Direction.Right)
                return getTile(x + 1, y).length !== 0;
            else if (direction === Direction.Below)
                return getTile(x, y + 1).length !== 0;
            else if (direction === Direction.Above)
                return getTile(x, y - 2).length !== 0;
            else if (direction === Direction.Left)
                return getTile(x - 1, y).length !== 0;
        }
    }
    Blocks.all = [dirt, stone, plank, sand, log, leaves, white_wool, red_wool, black_wool];

    const levels = [
        map `
.....1spalewrc.....
...................
...................
...................
...................
...................
...p............e..
..ppp..........eee.
.ppppp........eeeee
ppppppp........eee.
.lpppl..........l..
.lp.pl...t......l..
.lp.pl...b......l..
ddddddddddddddddddd
sssssssssssssssssss`,
    ];

    var Mode;
    (function (Mode) {
        Mode["Normal"] = "Normal";
        Mode["Inventory"] = "Inventory";
        Mode["Build"] = "Build";
        Mode["Mine"] = "Mine";
    })(Mode || (Mode = {}));
    class ModeController {
        constructor() {
            this.mode = Mode.Normal;
        }
        setMode(mode) {
            clearText();
            if (mode !== Mode.Normal) {
                addText(`${mode} mode`, {
                    y: 2,
                    color: color `blue`,
                });
            }
            this.mode = mode;
        }
        handleControls(player, inventory) {
            onInput("a", () => player.left());
            onInput("d", () => player.right());
            onInput("w", () => player.jump());
            onInput("k", () => {
                if (this.mode === Mode.Normal)
                    Blocks.placeAuto(player, inventory.current);
                else if (this.mode === Mode.Build)
                    Blocks.place(player, inventory.current, Direction.Below);
                else if (this.mode === Mode.Mine)
                    Blocks.mine(player, Direction.Below);
            });
            onInput("l", () => {
                if (this.mode === Mode.Normal)
                    Blocks.mineAuto(player);
                else if (this.mode === Mode.Build)
                    Blocks.place(player, inventory.current, Direction.Right);
                else if (this.mode === Mode.Mine)
                    Blocks.mine(player, Direction.Right);
                else if (this.mode === Mode.Inventory)
                    inventory.next();
            });
            let last = Date.now();
            let tickCount = 0;
            let immune = false;
            onInput("s", () => {
                let now = Date.now();
                if (now - last < 100) {
                    tickCount++;
                    if (tickCount >= 50 && !immune) {
                        immune = true;
                        tickCount = 0;
                        setTimeout(() => (immune = false), 1000);
                        // Clear map
                        for (let x = 0; x < width(); x++) {
                            for (let y = 0; y < height(); y++) {
                                clearTile(x, y);
                            }
                        }
                        inventory.rerender();
                        player.spawn();
                    }
                }
                else {
                    if (this.mode === Mode.Normal)
                        this.setMode(Mode.Mine);
                    else
                        this.setMode(Mode.Normal);
                }
                last = now;
            });
            onInput("i", () => {
                if (this.mode === Mode.Normal)
                    this.setMode(Mode.Inventory);
                else if (this.mode === Mode.Build)
                    Blocks.place(player, inventory.current, Direction.Above);
                else if (this.mode === Mode.Mine)
                    Blocks.mine(player, Direction.Above);
            });
            onInput("j", () => {
                if (this.mode === Mode.Normal)
                    this.setMode(Mode.Build);
                else if (this.mode === Mode.Build)
                    Blocks.place(player, inventory.current, Direction.Left);
                else if (this.mode === Mode.Mine)
                    Blocks.mine(player, Direction.Left);
                else if (this.mode === Mode.Inventory)
                    inventory.previous();
            });
        }
    }

    class Player {
        get solids() {
            return [this.top, this.bottom];
        }
        get pushables() {
            return {
                [this.bottom]: [this.top],
            };
        }
        constructor(bottom, top) {
            this.fallVelocity = 0;
            this.bottom = bottom;
            this.top = top;
            this.bottomSprite = getFirst(bottom);
            this.topSprite = getFirst(top);
        }
        right() {
            if (this.isRightEmpty()) {
                this.topSprite.x++;
                this.bottomSprite.x++;
            }
        }
        left() {
            if (this.isLeftEmpty()) {
                this.topSprite.x--;
                this.bottomSprite.x--;
            }
        }
        jump() {
            if (this.isGrounded()) {
                this.topSprite.y--;
                this.bottomSprite.y--;
            }
        }
        fall(drop) {
            this.bottomSprite.y += drop;
            this.topSprite.y += drop;
        }
        setupGravityAndAttachFallback() {
            setInterval(() => {
                if (!this.isGrounded()) {
                    this.fallVelocity += 0.2;
                }
                else {
                    this.fallVelocity = 0;
                }
            }, 100);
            setInterval(() => {
                const drop = Math.floor(this.fallVelocity);
                this.fall(drop);
            }, 100);
            // Recover from de-attachment
            setInterval(() => {
                if (this.topSprite.y !== this.bottomSprite.y - 1 || this.topSprite.x !== this.bottomSprite.x) {
                    this.topSprite.y = this.bottomSprite.y - 1;
                    this.topSprite.x = this.bottomSprite.x;
                }
            }, 1000);
        }
        isGrounded() {
            const originalY = this.bottomSprite.y;
            this.bottomSprite.y++;
            // If collision with a solid, y won't change
            if (this.bottomSprite.y === originalY) {
                return true;
            }
            else {
                // Otherwise, reset y
                this.bottomSprite.y--;
                return false;
            }
        }
        isRightEmpty() {
            const bottomOriginalX = this.bottomSprite.x;
            const topOriginalX = this.topSprite.x;
            this.bottomSprite.x++;
            this.topSprite.x++;
            let result = false;
            if (bottomOriginalX + 1 === this.bottomSprite.x && topOriginalX + 1 === this.topSprite.x)
                result = true;
            this.bottomSprite.x = bottomOriginalX;
            this.topSprite.x = topOriginalX;
            return result;
        }
        isLeftEmpty() {
            const bottomOriginalX = this.bottomSprite.x;
            const topOriginalX = this.topSprite.x;
            this.bottomSprite.x--;
            this.topSprite.x--;
            let result = false;
            if (bottomOriginalX - 1 === this.bottomSprite.x && topOriginalX - 1 === this.topSprite.x)
                result = true;
            this.bottomSprite.x = bottomOriginalX;
            this.topSprite.x = topOriginalX;
            return result;
        }
        spawn() {
            addSprite(1, height() - 1, this.bottom);
            addSprite(1, height() - 2, this.top);
            this.bottomSprite = getFirst(this.bottom);
            this.topSprite = getFirst(this.top);
        }
    }

    /**
     * Global Controls
     * ===============
     *
     * a to move left
     * d to move right
     * w to jump
     *
     * Normal Mode
     * ===========
     *
     * k to place block (to right if on ground, below if in air)
     * l to mine block (first which exists in this order: right, below, left, above)
     *
     * s to enable mine mode
     * i to enable inventory mode
     * j to enable build mode
     
     *
     * Mine mode and build mode
     * ========================
     *
     * i to place/break top
     * l to place/break right
     * j to place/break left
     * k to place/break bottom
     * s to exit mode
     *
     * Inventory mode
     * ==============
     *
     * j to go left
     * l to go right
     * s to exit mode
     *
     */
    // Bitmaps
    setLegend(...bitmaps);
    // Levels
    let level = 0;
    const currentLevel = levels[level];
    setMap(currentLevel);
    // Player
    const player = new Player(playerBottom, playerTop);
    player.setupGravityAndAttachFallback();
    // Inventory
    const inventory = new Inventory();
    // Modes and controls
    const modeController = new ModeController();
    modeController.handleControls(player, inventory);
    setSolids([...player.solids, ...Blocks.all]);
    setPushables(player.pushables);

})();
