
/* 
@title: bounce tales
@description: mazed based low version of block tales ( OG keypad phone game )
@author: Bhuvan Rai
@tags: []
@addedOn: 2026-06-18
*/

    const ball = "p"
    const green = "g"
    const egg = "e"
    const door = "d"
    const black = "b"
    const orange = "o"
    const dirt= "1"
    
setLegend(
	[ ball, bitmap`
...0000000000...
..003333333300..
.00333333333300.
0033333332233300
0333333322223330
0333333322222330
0333333332223330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0033333333333300
.00333333333300.
..003333333300..
...0000000000...` ],
    [ green , bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDD4DDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDD4DDDDD
DD4DDDDDDDDDDDDD
DDDDDDD4DDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DDDDDDDDD
DDD4DDDDDDDDD4DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
    [ egg , bitmap`
................
.........000....
........06660...
.......0666660..
......06626660..
.....0662266660.
....00622266660.
....06666666660.
....06666666660.
....06666666660.
....06666666660.
.....0FFFFFFFF0.
......0FFFFFF0..
......00000000..
................
................` ],
    [ door , bitmap`
..LLLLLLLLLLLL..
..LC...CC...CL..
..LC...CC...CL..
..LC...CC...CL..
..LCCCCCCCCCCL..
..LC...CC...CL..
..LC...CC...CL..
..LC...CC...CL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..
..LCCCCCCC110L..
..LCCCCCCC0CCL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..` ],
    [ orange, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999990999
9999909999999999
9999999999999999
9999999999999099
9990999999999999
9999999999999999
9999999990999999
9999999999999999
9999999999999999
9999999099999099
9999999999999999
9999999999999999
9999999999999999` ],
    [ black, bitmap`
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
0000000000000000` ],
    [ dirt, bitmap`
C0CCCCCLLLLLLCCC
CCCCC9CCCCCCLC1C
LLCCCCCC1CC9CCCC
C1CC0CCCCCCCCCCC
CCCCCLCC1CLC9CC1
C9CLLCCCCCCCCCCC
CCCCC1C1CLLCC0CC
CL1CCCCCCC12CCCC
LCCCCCCC1CCCLC1C
CCC0CC9CCC9CLC9C
CLLCCCC1CCCCLCCC
CCLC1CCLCCC0000C
CC9CCLCCCC00CCCC
CC9LCCC211CCCCCL
CCCLC1CCCCLCCCCL
CLCCCCCLLLCLL9CL` ]
)

setSolids(
  [ ball,green,dirt,door ]
)

let level = 0
const levels = [
	map`
gggggggggggggggggg
gge.....ggg..g.g.g
ggggggg.ggg...g..g
ggggggg.ggg..ooo.g
ggggggg.ggg.ooooog
ggggggg.ggg.ooboog
ggggggg.ggg.ooboog
ggggggg.ggg.gggggg
g.......ggg.gggggg
gp.......d..gggg11
ggggggg.ggggggg111
ggggggg.gggggg1111
ggggggg.gggg111111
ggggggg.ggg1111111
ggggggg.ggg1111111
g11gggg.gg11111111
g1e.....g111111111
g11111111111111111` ,
  	map`
p...........
............
............
............
............
............
........o...
............
............
............
............
............`
]

setMap(levels[0])

setPushables({
	[ ball ]: []
})
onInput("d", () => {
  getFirst(ball).x += 1; 
});

onInput("a", () => {
  getFirst(ball).x -= 1; 
});

onInput("w", () => {
  getFirst(ball).y -= 1; 
});

onInput("s", () => {
  getFirst(ball).y += 1; 
});


afterInput(() => {
    const Covered = tilesWith(ball, black); 
    const overlap = tilesWith(ball, egg); // Only need to scan for one egg type!
    
    if (Covered.length >= 1) {
        level = level + 1;
        if (level < levels.length) {
            setMap(levels[level]);
        } 
        else {
            addText("you win!", { y: 4, color: color`7` });
        }
    }
    
    overlap.forEach(tile => {
        tile.forEach(s => {
            if (s.type === egg) s.remove();
        });
    });
    if (getAll(egg).length===0 && getAll(door)!=0) {
        getFirst(door).remove()
    }
});