/*
@title: Run 3 Maze
@author: Tej Patel
Description: Run 3 Maze" is a thrilling adventure game that challenges players to navigate through a series of intricate mazes while avoiding obstacles and pitfalls. The game is designed to test players' reflexes, spatial awareness, and problem-solving skills as they guide their character through increasingly complex levels.
Navigation: Use WASD to move your character through the maze. The objective is to reach the end of the level without falling into the void or colliding with obstacles.
*/

var px = 1;
var py = 1;
var mapNat = [];

function getMapV2() {
    var map = [];
    for (var i = 0; i < height(); i++) {
        map.push([]);
        for (var j = 0; j < width(); j++) {
            map[i].push([]);
            var tile = getTile(j, i);
            for (var k = 0; k < tile.length; k++) {
                map[i][j].push(tile[k].type);
            }
        }
    }
    return map;
}

function setMapV2(map) {
    var tempMap = "";
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            tempMap += ".";
        }
        tempMap += "\n";
    }
    setMap(tempMap);
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            for (var k = 0; k < map[i][j].length; k++) {
                addSprite(j, i, map[i][j][k]);
            }
        }
    }
}

function trimMapV2(x, y, w, h, map) {
    var map2 = [];
    var mapWidth = map[0].length;
    var mapHeight = map.length;
    x = Math.max(Math.min(mapWidth - w, x), 0);
    y = Math.max(Math.min(mapHeight - h, y), 0);
    for (var i = 0; i < h; i++) {
        map2.push([]);
        for (var j = 0; j < w; j++) {
            map2[i].push([]);
            for (var k = 0; k < map[i + y][j + x].length; k++) {
                map2[i][j].push(map[i + y][j + x][k]);
            }
        }
    }
    return map2;
}

const player = "p";
const wall = "w";
const bg = "b";

setLegend(
    [player, bitmap`
............
...11...11..
...11...11..
...11...11..
...1111111..
..111111111.
.11111111111
.11111111111
.11111111111
..111111111.
...1111111..
...11...11..
...11...11..
...11...11..
............`],
    [wall, bitmap`
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111
111111111111`],
    [bg, bitmap`
............
............
............
............
............
............
............
............
............
............
............
............
............
............
............
............`]
);

setSolids([player, wall]);

let level = 0;
const levels = [
    map`
wwwwwwwwwwwwwwwwwww
wpw...............w
w.wwwwwww.wwwwwww.w
w...w.w.w.w.w...w.w
www.w.w.w.w.w.wwwww
w.......w.........w
w.wwwww.www.w.www.w
w.....w.....w.w.w.w
www.w.w.www.w.w.www
w.w.w...w.........w
w.w.www.www.wwwww.w
w.....w.w...w...w.w
w.w.www.w.www.www.w
w.w.....w.....w...w
wwwwwwwwwwwwwwwwwww`,
];

setMap(levels[level]);
setBackground(bg);

mapNat = getMapV2();
setMapV2(trimMapV2(px - 5, py - 4, 10, 8, mapNat));

setPushables({
    [player]: [],
});

onInput("w", () => {
    setMapV2(mapNat);
    getFirst(player).y -= 1; 
    py = getFirst(player).y;
});
onInput("a", () => {
    setMapV2(mapNat);
    getFirst(player).x -= 1; 
    px = getFirst(player).x;
});
onInput("s", () => {
    setMapV2(mapNat);
    getFirst(player).y += 1; 
    py = getFirst(player).y;
});
onInput("d", () => {
    setMapV2(mapNat);
    getFirst(player).x += 1; 
    px = getFirst(player).x;
});

afterInput(() => {
    mapNat = getMapV2();
    setMapV2(trimMapV2(px - 5, py - 4, 10, 8, mapNat));
});