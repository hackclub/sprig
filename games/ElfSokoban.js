/*
@title: ElfSokoban
@author: Markonije
@tags: []
@addedOn: 2023-03-15
*/
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const mappa="m";

setLegend([player, bitmap `
................
.........4444433
.......444444433
.....44444444...
.....44444444...
....44444444....
...444444444....
..33333333333...
...666666666....
...660666066....
...666666666....
...660666066....
....6600066.....
...366666663....
..DD3333333DD...
.DDDDDDDDDDDDD..`],[box,bitmap`
................
....333..333....
....3..33..3....
.....333333.....
..DDDDD33DDDDD..
..DDDDD33DDDDD..
..DDDDD33DDDDD..
..DDDDD33DDDDD..
..333333333333..
..333333333333..
..DDDDD33DDDDD..
..DDDDD33DDDDD..
..DDDDD33DDDDD..
..DDDDD33DDDDD..
................
................`],[goal,bitmap`
................
.66666666666666.
.666........666.
.6666......6666.
.6.666....666.6.
.6..666..666..6.
.6...666666...6.
.6....6666....6.
.6....6666....6.
.6...666666...6.
.6..666..666..6.
.6.666....666.6.
.6666......6666.
.666........666.
.66666666666666.
................`],[wall,bitmap `
LL11101111011111
L1100111110LL111
110001L1L0000L11
1L0LL00L00111000
0001110000011111
1011110L11001111
1000001111010001
11L010L11L0L1110
11L01001100L1111
110011000LL0L111
1101100111L00001
L101101111000100
0000011100110111
1LL0000011110111
11111L0L1111011L
111110L1111011LL`],[mappa,bitmap`
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
0000000000000000`]);

let level = 0;
const levels = [map `
p..g
.w.w
.b..
....`, map`
p..ww
....w
.w.b.
.b...
g...g`, map`
p.....
.ww.b.
...w..
.b...w
...b.g
.g..g.`, map`
pww.g.w
.......
..b...g
.......
w....b.
..b...w
g....ww`,map`
p..gwww
.....ww
...b..w
.......
w......
ww.b...
www..g.`, map`
ww...ww
wp.b.gw
.......
.....b.
g......
w.b...w
ww..gww`, map`
p......
.....g.
.bwww..
..www..
..www..
.......
.b....g`, map`
g...b..
p......
.b.w...
...w.g.
..b.w..
....w..
......g`, map`
p....g.
.b.b...
.......
.......
.b....g
....b..
g.....g`, map`
wgwwwww
w.....g
w..b..w
w.bpb.w
w..b..w
g.....w
wwwwwgw`, map`
.g......
..g.....
..bbb...
.gbpbg..
g.bbb.g.
........
....g...
...g....`, map`
.....www
.p.....w
.b.....w
......bw
.b.....w
w......w
w......g
wwwwwggw`, map`
.......g
.g.bbb..
......b.
...p..b.
g.......
........
.......g
...g....`, map`
.p.....
.....b.
....w..
.bb..ww
.......
..b...g
....ggg`, map`
.........
.........
..gbbb.g.
...bpb...
...bbb.g.
.g.......
.......g.
..g.g..g.
.........`, map`
p.b..ggg
..b....g
bbb....g
........
........
g...bbb.
g...b...
ggg.b...`, map`
.....gww
.p.....w
.....b..
.....b..
...bb...
.g.....g
w.......
wwg.....`];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("s", () => {
    getFirst(player).y += 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});
setSolids([player, box, wall]);

setPushables({
    [player]: [box]
});


afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            setMap(map`
m`);
            addText("POBEDIO SI!", { y: 4, color: color`D` });
        }
    }
});

onInput("j", () => {
    
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});