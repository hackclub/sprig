/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: LabyrinthBoardGame
@author: rivques
@tags: []
@addedOn: 2024-09-03
*/

// a port of the Labyrinth board game to Sprig.
// instructions: https://rivques.dev/hackclub/labyrinth

// game pieces:
// 16x16, with 8-wide channels
// all non-corner statics contain artifact
// all edge statics point in
// central statics point in a loop at each other
// dynaics:
// 12 straights, no artifacts
// 6 Ts, 6 artifacts
// 16 Ls, 6 artifacts
// artifacts: 6x6, brown, purple, orange, and pink OF:
// plus, circle, square, stripes, checkers, smiley

// convention: bx or by is in board coordinates, x or y is in pixel coordinates

let gameState = "MENU"; // MENU, MOVE_PLAYER, INSERT_TILE, PLAYER_MOVING, PASS_SPRIG, GAME_OVER
let activePlayer = "RED"; // RED, BLUE, GREEN, YELLOW

const BOARD_OFFSET_X = 3;
const BOARD_OFFSET_Y = 1;

const SPRITE_TEMPLATES = {
    "maze_piece_|": bitmap`
0000.11..11.0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000........0000
0000.11..11.0000`,
    "maze_piece_T": bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
................
1..............1
1..............1
................
................
1..............1
1..............1
................
0000........0000
0000........0000
0000........0000
0000.11..11.0000`,
    "maze_piece_L": bitmap`
0000.11..11.0000
0000........0000
0000........0000
0000........0000
0000............
0000...........1
0000...........1
0000............
0000............
0000...........1
0000...........1
0000............
0000000000000000
0000000000000000
0000000000000000
0000000000000000`,
    "artifact_plus": bitmap`
................
................
................
................
................
.......00.......
.......00.......
.....000000.....
.....000000.....
.......00.......
.......00.......
................
................
................
................
................`,
    "artifact_circle": bitmap`
................
................
................
................
................
.......00.......
......0000......
.....000000.....
.....000000.....
......0000......
.......00.......
................
................
................
................
................`,
    "artifact_square": bitmap`
................
................
................
................
................
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
................
................
................
................
................`,
    "artifact_stripes": bitmap`
................
................
................
................
................
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
................
................
................
................
................`,
    "artifact_checkers": bitmap`
................
................
................
................
................
.....00..00.....
.....00..00.....
.......00.......
.......00.......
.....00..00.....
.....00..00.....
................
................
................
................
................`,
    "artifact_smiley": bitmap`
................
................
................
................
................
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....000000.....
.....000000.....
................
................
................
................
................`,
    "meeple": bitmap`
................
................
................
................
....00000000....
....0......0....
....0......0....
....0......0....
....0......0....
....0......0....
....0......0....
....00000000....
................
................
................
................`,
    "person_icon": bitmap`
................
................
.......000000...
.......0....0...
.......0....0...
.......0....0...
.......0....0...
.......000000...
........0..0....
.......00..00...
.....000....000.
.....0........0.
.....0........0.
................
................
................`,
    "selector": bitmap`
................
.00000000000000.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.0............0.
.00000000000000.
................`
}
const COLOR_ABBRS = {
    "brown": "C",
    "purple": "H",
    "orange": "9",
    "pink": "8",
    "RED": "3",
    "BLUE": "5",
    "GREEN": "D",
    "YELLOW": "6"
}

let legend = [
    ["@", bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
    ["?", bitmap`
LLL..........LLL
L..............L
L..............L
................
................
................
................
................
................
................
................
................
................
L..............L
L..............L
LLL..........LLL`]
];
let SPRITE_ABBRS = {
    "static_marker": "?",
    "white_out": "@"
}
// generate names
let current_char = "A"
for (const shape of ["T", "L", "|"]) {
    for (const rotation of [0, 90, 180, 270]) {
        // generate sprite: rotate template string by rotation
        // sprites are 16x16 strings plus a newline every 16 characters, so 17 characters per line
        let sprite = SPRITE_TEMPLATES["maze_piece_" + shape].slice();
        for (let i = 0; i < rotation / 90; i++) {
            new_sprite = "\n";
            for (let new_y = 0; new_y < 16; new_y++) {
                for (let new_x = 0; new_x < 16; new_x++) {
                    new_sprite += sprite[1 + (15 - new_x) * 17 + new_y];
                    //console.log(`Putting ${sprite[1+(15 - new_x) * 17 + new_y]} at ${new_sprite.length - 1} (${new_x}, ${new_y}) (from original ${(15 - new_x) * 17 + new_y} (${new_y}, ${15-new_x}))`);
                }
                new_sprite += "\n";
            }
            sprite = new_sprite;
        }
        legend.push([current_char, sprite]);

        SPRITE_ABBRS["maze_piece_" + shape + "_" + rotation] = current_char;
        current_char = String.fromCharCode(current_char.charCodeAt(0) + 1);
    }
}
for (const artifact of ["plus", "circle", "square", "stripes", "checkers", "smiley"]) {
    for (const color of ["brown", "purple", "orange", "pink"]) {
        // generate sprite: replace 0s in template with color
        let sprite = SPRITE_TEMPLATES["artifact_" + artifact];
        sprite = sprite.split('').map(char => char === '0' ? COLOR_ABBRS[color] : char).join('');
        legend.push([current_char, sprite]);

        SPRITE_ABBRS["artifact_" + color + "_" + artifact] = current_char;
        current_char = String.fromCharCode(current_char.charCodeAt(0) + 1);
    }
}
for (const player of ["RED", "BLUE", "GREEN", "YELLOW"]) {
    for (const version of ["meeple", "person_icon", "selector"]) {
        // generate sprite: replace 0s in template with color
        let sprite = SPRITE_TEMPLATES[version].slice();
        //console.log(`${current_char} will have color ${COLOR_ABBRS[player]} (from ${player})`);
        sprite = sprite.split('').map(char => char === '0' ? COLOR_ABBRS[player] : char).join('');
        legend.push([current_char, sprite])
        
        SPRITE_ABBRS[version + "_" + player] = current_char;
        current_char = String.fromCharCode(current_char.charCodeAt(0) + 1);
        //console.log(`assigning ${current_char} next...`)
    }
}
console.log(`Number of sprites: ${Object.values(SPRITE_ABBRS).length}`);

setLegend(...legend);

function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

class Player {
    constructor(color, pos_b, artifacts) {
        this.color = color;
        this.artifacts = artifacts;
        // workaround for addSprite not returning a sprite
        addSprite(0, 0, SPRITE_ABBRS["meeple_" + color]);
        this.sprite = getTile(0, 0).filter(sprite => sprite.type == SPRITE_ABBRS["meeple_" + color])[0];
        this.sprite.x = BOARD_OFFSET_X + pos_b[0];
        this.sprite.y = BOARD_OFFSET_Y + pos_b[1];
        this.pos_b = pos_b;
    }
    set pos_b(new_pos_b) {
        this.sprite.x = BOARD_OFFSET_X + new_pos_b[0];
        this.sprite.y = BOARD_OFFSET_Y + new_pos_b[1];
        this._pos_b = new_pos_b;
    }
    get pos_b() {
        return this._pos_b;
    }
}

class MazePiece {
    constructor(type, rotation, pos_b, is_static, artifact) {
        this.type = type; // "|", "L", "T"
        this.is_static = is_static;
        this.artifact = artifact;
        addSprite(0, 0, SPRITE_ABBRS["maze_piece_" + type + "_" + rotation]);
        this.sprite = getTile(0, 0).filter(sprite => sprite.type == SPRITE_ABBRS["maze_piece_" + type + "_" + rotation])[0];
        this.sprite.x = BOARD_OFFSET_X + pos_b[0];
        this.sprite.y = BOARD_OFFSET_Y + pos_b[1];
        this._rotation = rotation; // 0, 90, 180, 270
        this._pos_b = pos_b;
        if (this.artifact) {
            this.artifact.sprite.x = BOARD_OFFSET_X + pos_b[0];
            this.artifact.sprite.y = BOARD_OFFSET_Y + pos_b[1];
        }

        if (is_static) {
            addSprite(pos_b[0] + BOARD_OFFSET_X, pos_b[1] + BOARD_OFFSET_Y, SPRITE_ABBRS["static_marker"]);
        }
    }
    set pos_b(new_pos_b) {
        if (this.is_static) {
            return;
        }
        this.sprite.x = BOARD_OFFSET_X + new_pos_b[0];
        this.sprite.y = BOARD_OFFSET_Y + new_pos_b[1];
        this._pos_b = new_pos_b;
        if (this.artifact) {
            // move artifact with maze piece
            this.artifact.sprite.x = BOARD_OFFSET_X + new_pos_b[0];
            this.artifact.sprite.y = BOARD_OFFSET_Y + new_pos_b[1];
        }
    }
    get pos_b() {
        return this._pos_b;
    }
    set rotation(new_rotation) {
        this.sprite.remove();
        addSprite(0, 0, SPRITE_ABBRS["maze_piece_" + this.type + "_" + new_rotation]);
        this.sprite = getTile(0, 0).filter(sprite => sprite.type == SPRITE_ABBRS["maze_piece_" + this.type + "_" + new_rotation])[0];
        this.sprite.x = BOARD_OFFSET_X + this.pos_b[0];
        this.sprite.y = BOARD_OFFSET_Y + this.pos_b[1];
        this._rotation = new_rotation;
    }
    get rotation() {
        return this._rotation;
    }
}

class Artifact {
    constructor(id, pos_b) {
        this.id = id;
        //console.log(`Creating artifact ${id} at ${pos_b}`);
        addSprite(0, 0, SPRITE_ABBRS[id]);
        this.sprite = getTile(0, 0).filter(sprite => sprite.type == SPRITE_ABBRS[id])[0];
        this.sprite.x = BOARD_OFFSET_X + pos_b[0];
        this.sprite.y = BOARD_OFFSET_Y + pos_b[1];
    }
}

const HELD_PIECE_POS_B = [-2, 1];
const HELD_ARTIFACT_POS_B = [-2, 4];

const INSERT_POSITIONS = [[1, 0], [3, 0], [5, 0], [6, 1], [6, 3], [6, 5], [5, 6], [3, 6], [1, 6], [0, 5], [0, 3], [0, 1]];

class Board {
    constructor(num_players) {
        let artifact_names = [];
        for (let color of ["brown", "purple", "orange", "pink"]) {
            for (let artifact of ["plus", "circle", "square", "stripes", "checkers", "smiley"]) {
                artifact_names.push("artifact_" + color + "_" + artifact);
            }
        }
        shuffle(artifact_names);
        this.players = [];
        const artifacts_per_player = Math.floor(artifact_names.length / num_players);
        const player_start_positions = [[0, 0], [6, 6], [6, 0], [0, 6]];
        for (let i = 0; i < num_players; i++) {
            this.players.push(new Player(["RED", "BLUE", "GREEN", "YELLOW"][i], player_start_positions[i], artifact_names.slice(i * artifacts_per_player, (i + 1) * artifacts_per_player)));
            addSprite(BOARD_OFFSET_X + 2*i, BOARD_OFFSET_Y-1, SPRITE_ABBRS["person_icon_" + ["RED", "BLUE", "GREEN", "YELLOW"][i]]);
            console.log(`Player ${["RED", "BLUE", "GREEN", "YELLOW"][i]} has artifacts ${this.players[i].artifacts}`);
        }
        this.activePlayer = 0;
        addSprite(BOARD_OFFSET_X + HELD_ARTIFACT_POS_B[0], BOARD_OFFSET_Y + HELD_ARTIFACT_POS_B[1], SPRITE_ABBRS[this.players[this.activePlayer].artifacts[0]]);
        this.update_aux_info();

        let artifacts = [];
        for (let name of artifact_names) {
            artifacts.push(new Artifact(name, [0, 0]));
        }
        shuffle(artifacts);
        this.maze_pieces = [
            // corners
            new MazePiece("L", 90, [0, 0], true, null),
            new MazePiece("L", 180, [6, 0], true, null),
            new MazePiece("L", 270, [6, 6], true, null),
            new MazePiece("L", 0, [0, 6], true, null),
            // edges
            new MazePiece("T", 0, [2, 0], true, artifacts.pop()),
            new MazePiece("T", 0, [4, 0], true, artifacts.pop()),
            new MazePiece("T", 90, [6, 2], true, artifacts.pop()),
            new MazePiece("T", 90, [6, 4], true, artifacts.pop()),
            new MazePiece("T", 180, [2, 6], true, artifacts.pop()),
            new MazePiece("T", 180, [4, 6], true, artifacts.pop()),
            new MazePiece("T", 270, [0, 2], true, artifacts.pop()),
            new MazePiece("T", 270, [0, 4], true, artifacts.pop()),
            // central
            new MazePiece("T", 270, [2, 2], true, artifacts.pop()),
            new MazePiece("T", 0, [4, 2], true, artifacts.pop()),
            new MazePiece("T", 90, [4, 4], true, artifacts.pop()),
            new MazePiece("T", 180, [2, 4], true, artifacts.pop())
        ];
        let dynamic_maze_pieces = [];
        for (let i = 0; i < 6; i++) {
            dynamic_maze_pieces.push(new MazePiece("T", randomChoice([0, 90, 180, 270]), [0, 0], false, artifacts.pop()));
        }
        for (let i = 0; i < 16; i++) {
            dynamic_maze_pieces.push(new MazePiece("L", randomChoice([0, 90, 180, 270]), [0, 0], false, i < 6 ? artifacts.pop() : null));
        }
        for (let i = 0; i < 12; i++) {
            dynamic_maze_pieces.push(new MazePiece("|", randomChoice([0, 90, 180, 270]), [0, 0], false, null));
        }
        shuffle(dynamic_maze_pieces);
        // use all but one of the the dynamics fill in the gaps in the statics (gaps are when at least one coord is one of 1, 3, 5)
        let dynamic_index = 0;
        for (let bx = 0; bx < 7; bx++) {
            for (let by = 0; by < 7; by++) {
                if (bx % 2 == 1 || by % 2 == 1) {
                    this.maze_pieces.push(dynamic_maze_pieces[dynamic_index]);
                    dynamic_maze_pieces[dynamic_index].pos_b = [bx, by];
                    dynamic_index++;
                }
            }
        }
        console.log(this.maze_pieces)
        console.log(`used ${dynamic_index} dynamic pieces to fill, leaving ${dynamic_maze_pieces.length-dynamic_index} piece to hold`);

        // set the last dynamic to the held piece
        this.held_piece = dynamic_maze_pieces[dynamic_index];
        this.held_piece.pos_b = HELD_PIECE_POS_B;
        this.disallowed_insertion = [-1, -1];
        this.show_pass_screen();
    }
    push_maze_piece(insert_pos_b) {
        // a bunch of math...
        // step 0. get an array of all maze pieces in the row
        // step 4. move any players along the row
        // step 5. move piece from holding position to the main held position
        // step 6. update disallowed insertion

        let is_vertical = insert_pos_b[1] % 2 == 0;
        let is_backwards = is_vertical ? insert_pos_b[1] == 6 : insert_pos_b[0] == 6;

        let row_pieces = this.maze_pieces.filter(piece => is_vertical ? piece.pos_b[0] == insert_pos_b[0] : piece.pos_b[1] == insert_pos_b[1]);
        row_pieces.sort((a, b) => is_vertical ? a.pos_b[1] - b.pos_b[1] : a.pos_b[0] - b.pos_b[0]);
        if (is_backwards) {
            row_pieces.reverse();
        }
        if (row_pieces.length > 8) {
            // something went wrong
            console.log("AAAA ROW MORE THAN 8 AAAA")
            console.log(row_pieces)
            console.log(insert_pos_b)
            return;
        }

        let new_locations = row_pieces.map(piece => piece.pos_b);
        new_locations.push(this.held_piece.pos_b);
        row_pieces.unshift(this.held_piece);
        console.log(row_pieces)
        console.log("are moving to")
        console.log(new_locations)
        
        for (let i = 0; i < row_pieces.length; i++) {
            row_pieces[i].pos_b = new_locations[i];
        }

        // update info
        this.maze_pieces.push(this.held_piece);
        this.held_piece = row_pieces.pop();
        this.maze_pieces = this.maze_pieces.filter(piece => piece != this.held_piece);
        this.disallowed_insertion = is_vertical ? [insert_pos_b[0], is_backwards ? 0 : 6] : [is_backwards ? 0 : 6, insert_pos_b[1]];

        // move players
        for (let player of this.players) {
            if (is_vertical && player.pos_b[0] == insert_pos_b[0]) {
                let new_pos_b = [player.pos_b[0], player.pos_b[1] + (is_backwards ? -1 : 1)];
                if (new_pos_b[1] < 0) {
                    new_pos_b[1] = 6;
                } else if (new_pos_b[1] > 6) {
                    new_pos_b[1] = 0;
                }
                console.log(`Moving player ${player.color} from ${player.pos_b} to ${new_pos_b}`);
                player.pos_b = new_pos_b;
            } else if (!is_vertical && player.pos_b[1] == insert_pos_b[1]) {
                let new_pos_b = [player.pos_b[0] + (is_backwards ? -1 : 1), player.pos_b[1]];
                if (new_pos_b[0] < 0) {
                    new_pos_b[0] = 6;
                } else if (new_pos_b[0] > 6) {
                    new_pos_b[0] = 0;
                }
                console.log(`Moving player ${player.color} from ${player.pos_b} to ${new_pos_b}`);
                player.pos_b = new_pos_b;
            }
        }

        this.calculate_valid_paths()
    }
    update_aux_info(){
        // this includes things like redrawing the player's scores and the current artifact target
        clearText()
      let SCORE_X_POS;
        if (this.players.length == 4){
            SCORE_X_POS = [8, 10, 16, 18];
        } else {
            SCORE_X_POS = [8, 12, 16];
        }
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            let score = player.artifacts.length;
            addText(score.toString(), {x: SCORE_X_POS[i], y: BOARD_OFFSET_Y - 1, color: COLOR_ABBRS[player.color]});
        }
        addText(`${this.players[this.activePlayer].color}\nTURN`, {x: 0, y: 0, color: COLOR_ABBRS[this.players[this.activePlayer].color]});
        getTile(BOARD_OFFSET_X + HELD_ARTIFACT_POS_B[0], BOARD_OFFSET_Y + HELD_ARTIFACT_POS_B[1])[0].type = SPRITE_ABBRS[this.players[this.activePlayer].artifacts[0]];
        addText("held\ntile", {x: 1, y: 2, color: "0"});
        addText("your\narti\nfact", {x: 1, y: 7, color: "0"});
        if (gameState == "MOVE_PLAYER") {
            addText("MOVE\nPLA-\nYER", {x: 1, y: 13, color: COLOR_ABBRS[this.players[this.activePlayer].color]});
        } else if (gameState == "INSERT_TILE") {
            addText("MOVE\nTILE", {x: 1, y: 13, color: COLOR_ABBRS[this.players[this.activePlayer].color]});
        }
    }
    show_pass_screen() {
        clearText();
        // put a white_out on every tile
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 8; y++) {
                addSprite(x, y, SPRITE_ABBRS["white_out"]);
            }
        }
        addText(`PASS SPRIG TO ${this.players[this.activePlayer].color}`, {x: 0, y: 5, color: COLOR_ABBRS[this.players[this.activePlayer].color]});
        addText("PRESS L WHEN READY", {x: 1, y: 10, color: "0"});
    }
    clear_white_out() {
        for(let sprite of getAll(SPRITE_ABBRS["white_out"])) {
            sprite.remove();
        }
    }
    calculate_valid_paths() {
        // step 1. construct graph of board
        // step 2. dijkstra's algorithm from active player's position
        // step 3. set this.pathfinding_results to the result

        // Initialize the graph as a 7x7 grid where each cell contains an empty array
        console.log("Calculating valid paths");
        let graph_pass_1 = []; // this doesn't have verified paths yet
        for (let x = 0; x < 7; x++) {
            graph_pass_1.push([]);
            for (let y = 0; y < 7; y++) {
                graph_pass_1[x].push([]); // an array to be filled with coords of neighbors
                // Populate the graph with adjacent cells (up, down, left, right)
                const maze_piece = this.maze_pieces.find(piece => piece.pos_b[0] == x && piece.pos_b[1] == y);
                // figure out which neighbors we _might_ have given our shape and rotation
                let neighbor_candidates = [];
                if (maze_piece.type == "L") {
                    if (maze_piece.rotation == 0) {
                        neighbor_candidates = [[1, 0], [0, -1]];
                    } else if (maze_piece.rotation == 90) {
                        neighbor_candidates = [[0, 1], [1, 0]];
                    } else if (maze_piece.rotation == 180) {
                        neighbor_candidates = [[-1, 0], [0, 1]];
                    } else if (maze_piece.rotation == 270) {
                        neighbor_candidates = [[0, -1], [-1, 0]];
                    }
                }
                if (maze_piece.type == "T") {
                    if (maze_piece.rotation == 0) {
                        neighbor_candidates = [[1, 0], [0, 1], [-1, 0]];
                    } else if (maze_piece.rotation == 90) {
                        neighbor_candidates = [[0, -1], [-1, 0], [0, 1]];
                    } else if (maze_piece.rotation == 180) {
                        neighbor_candidates = [[-1, 0], [0, -1], [1, 0]];
                    } else if (maze_piece.rotation == 270) {
                        neighbor_candidates = [[0, -1], [1, 0], [0, 1]];
                    }
                }
                if (maze_piece.type == "|") {
                    if (maze_piece.rotation == 0) {
                        neighbor_candidates = [[0, -1], [0, 1]];
                    } else if (maze_piece.rotation == 90) {
                        neighbor_candidates = [[1, 0], [-1, 0]];
                    } else if (maze_piece.rotation == 180) {
                        neighbor_candidates = [[0, -1], [0, 1]];
                    } else if (maze_piece.rotation == 270) {
                        neighbor_candidates = [[1, 0], [-1, 0]];
                    }
                }
                for (let neighbor_candidate of neighbor_candidates) {
                    let neighbor_x = x + neighbor_candidate[0];
                    let neighbor_y = y + neighbor_candidate[1];
                    if (neighbor_x >= 0 && neighbor_x < 7 && neighbor_y >= 0 && neighbor_y < 7) {
                        graph_pass_1[x][y].push([neighbor_x, neighbor_y]);
                    }
                }
            }
        }
        console.log("Graph pass 1:");
        console.log(graph_pass_1);

        let graph_pass_2 = []; // this has verified paths
        // only tiles which have each other as neighbors are valid
        for (let x = 0; x < 7; x++) {
            graph_pass_2.push([]);
            for (let y = 0; y < 7; y++) {
                graph_pass_2[x].push([]);
                for (let neighbor of graph_pass_1[x][y]) {
                    if (graph_pass_1[neighbor[0]][neighbor[1]].find(neighbor_of_neighbor => neighbor_of_neighbor[0] == x && neighbor_of_neighbor[1] == y)) {
                        graph_pass_2[x][y].push(neighbor);
                    }
                }
            }
        }
        console.log("Graph pass 2:");
        console.log(graph_pass_2);

        // Initialize the visited array as a 7x7 grid with all values set to false
        let visited = [];
        for (let x = 0; x < 7; x++) {
            visited.push([]);
            for (let y = 0; y < 7; y++) {
                visited[x].push(false);
            }
        }

        // Initialize the queue with the starting position of the active player
        let queue = [[this.players[this.activePlayer].pos_b]];

        // Initialize the pathfinding results as a 7x7 grid with empty arrays
        let pathfinding_results = [];
        for (let x = 0; x < 7; x++) {
            pathfinding_results.push([]);
            for (let y = 0; y < 7; y++) {
                pathfinding_results[x].push([]);
            }
        }

        // Perform Breadth-First Search (BFS) to find the shortest path to each cell
        while (queue.length > 0) {
            let path = queue.shift(); // Dequeue the first path
            let current_pos = path[path.length - 1]; // Get the current position
            let current_x = current_pos[0];
            let current_y = current_pos[1];
            if (visited[current_x][current_y]) {
                continue; // Skip if the cell is already visited
            }
            visited[current_x][current_y] = true; // Mark the cell as visited
            pathfinding_results[current_x][current_y] = path; // Store the path to the current cell
            // Enqueue all unvisited neighbors
            for (let neighbor of graph_pass_2[current_x][current_y]) {
                if (!visited[neighbor[0]][neighbor[1]]) {
                    queue.push(path.concat([neighbor]));
                }
            }
        }

        // Store the pathfinding results in the object and log them
        this.pathfinding_results = pathfinding_results;
        console.log("Pathfinding results:");
        console.log(this.pathfinding_results);
    }
    animate_player_move(path){
        const move_sound = tune`
187.5: C5^187.5,
5812.5`
        // todo: implement
        // for now just jump to the end
        this.active_path = path;
        this.active_path_index = 0;
        console.log(`Animating player move along path ${path}`);
        
        let interval = setInterval(() => {
            let player = this.players[this.activePlayer];
            player.pos_b = path[this.active_path_index];
            console.log(`Moving player ${player.color} to ${player.pos_b}`);
            playTune(move_sound, 1)
            this.active_path_index++;
            if (this.active_path_index == path.length) {
                clearInterval(interval);
                this.check_artifact_success();
            }
        }, 500);
    }
    check_artifact_success() {
        const artifact_sound = tune`
167.5977653631285: A4-167.5977653631285,
167.5977653631285: B4-167.5977653631285,
167.5977653631285: C5-167.5977653631285,
167.5977653631285: C5-167.5977653631285,
167.5977653631285: C5-167.5977653631285,
4525.139664804469`
        const win_sound = tune`
181.8181818181818: G4-181.8181818181818,
181.8181818181818: G4-181.8181818181818,
181.8181818181818: A4-181.8181818181818,
181.8181818181818: C5-181.8181818181818,
181.8181818181818,
181.8181818181818: A4-181.8181818181818,
181.8181818181818: C5-181.8181818181818,
4545.454545454545`
        let player = this.players[this.activePlayer];
        console.log(`Checking for artifact at ${player.pos_b}`);
        let player_piece = this.maze_pieces.find(piece => piece.pos_b[0] == player.pos_b[0] && piece.pos_b[1] == player.pos_b[1]);
        console.log(player_piece);
        let artifact = player_piece.artifact;
        if (artifact && artifact.id == player.artifacts[0]) {
            player.artifacts.shift();
            artifact.sprite.remove();
            player_piece.artifact = null;
            playTune(artifact_sound, 1);
        };
        setTimeout(() => {
            if (player.artifacts.length == 0) {
                playTune(win_sound, 1)
                this.show_game_over();
            } else {
                this.activePlayer = (this.activePlayer + 1) % this.players.length;
                gameState = "PASS_SPRIG";
                this.show_pass_screen();
            }
        }, 1000);
    }
    show_game_over() {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 8; y++) {
                addSprite(x, y, SPRITE_ABBRS["white_out"]);
            }
        }
        clearText();
        addText("GAME OVER", {x: 3, y: 3, color: "0"});
        addText(`${this.players[this.activePlayer].color} WINS`, {x: 3, y: 5, color: COLOR_ABBRS[this.players[this.activePlayer].color]});
        gameState = "GAME_OVER";
    }
}

// flow:
// select # of players
// press start
// "pass to RED"
// RED presses "RED is ready"
// RED uses A/D and W/S to rotate their piece and choose where to insert it, then presses L to confirm (can't undo the last move)
// RED optionally uses WASD to select a VALID place to move to, then presses L to confirm
// if RED lands on their artifact, they collect it
// "pass to BLUE"
// etc.

// startup:
// dynamically create artifact and player sprites, and tile rotations

// start game:
// split up artifacts
// create players and maze pieces
// randomize dynamic maze pieces

// on maze shift:
// check if shift is valid

let level = map`
..........
..........
..........
..........
..........
..........
..........
..........
`
setMap(level)
setSolids([])

setPushables({})
let board;
let num_players = 2;

function showMenu() {
    clearText();
    for (let sprite of getAll()) {
        sprite.remove();
    }
    addText("LABYRINTH", {x: 6, y: 1, color: color`0`});
    addText("SELECT # OF PLAYERS", {x: 1, y: 3, color: color`3`});
    addText("(USE W/S):", {x: 6, y: 4, color: color`3`});
    addText(num_players.toString(), {x: 10, y: 6, color: color`3`});
    addText("PRESS L TO START", {x: 2, y: 10, color: color`D`});
    addText("INSTRUCTIONS:", {x: 3, y: 12, color: color`5`});
    addText("rivques.dev/lbrnth", {x: 1, y: 13, color: color`5`});
}

showMenu();


const sad_sound = tune`D`
onInput("l", () => {
    console.log(`Got L, game state is ${gameState}`);
    // L is always "attempt to move to next state"
    // PLAYER_MOVING is a cutscene, no input counts
    if (gameState == "PLAYER_MOVING") {
        return;
    };
    if (gameState == "PASS_SPRIG") {
        board.clear_white_out();
        gameState = "INSERT_TILE";
        board.update_aux_info();
        current_player = board.players[board.activePlayer];
        addSprite(BOARD_OFFSET_X + INSERT_POSITIONS[0][0], BOARD_OFFSET_Y + INSERT_POSITIONS[0][1], SPRITE_ABBRS["selector_" + current_player.color]);
        return;
    };
    if (gameState == "MENU") {
        board = new Board(num_players);
        gameState = "PASS_SPRIG";
        return;
    }
    if (gameState == "INSERT_TILE") {
        // insert tile
        let selector = getFirst(SPRITE_ABBRS["selector_" + board.players[board.activePlayer].color]);
        let selector_pos_b = [selector.x - BOARD_OFFSET_X, selector.y - BOARD_OFFSET_Y];
        if (selector_pos_b[0] == board.disallowed_insertion[0] && selector_pos_b[1] == board.disallowed_insertion[1]) {
            playTune(sad_sound, 1)
            return;
        }

        board.push_maze_piece(selector_pos_b);
        selector.x = board.players[board.activePlayer].pos_b[0] + BOARD_OFFSET_X;
        selector.y = board.players[board.activePlayer].pos_b[1] + BOARD_OFFSET_Y;
        gameState = "MOVE_PLAYER";
        board.update_aux_info();
        return;
    }
    if (gameState == "MOVE_PLAYER") {
        // move player
        let selector = getFirst(SPRITE_ABBRS["selector_" + board.players[board.activePlayer].color]);
        let selector_pos_b = [selector.x - BOARD_OFFSET_X, selector.y - BOARD_OFFSET_Y];
        let player = board.players[board.activePlayer];
        if (board.pathfinding_results[selector_pos_b[0]][selector_pos_b[1]].length == 0) {
            // invalid move
            playTune(sad_sound, 1)
            return;
        }
        gameState = "PLAYER_MOVING";
        selector.remove();
        board.animate_player_move(board.pathfinding_results[selector_pos_b[0]][selector_pos_b[1]]);
    }
    if (gameState == "GAME_OVER") {
        // restart
        showMenu();
        gameState = "MENU";
    }
})

onInput("w", () => {
    console.log(`Got W, game state is ${gameState}`);
    if (gameState == "MENU") {
        num_players = Math.min(4, num_players + 1);
        showMenu();
        return;
    }
    if (gameState == "INSERT_TILE") {
        // select new insertion position
        let selector = getFirst(SPRITE_ABBRS["selector_" + board.players[board.activePlayer].color]);
        let selector_pos = [selector.x - BOARD_OFFSET_X, selector.y - BOARD_OFFSET_Y];
        let new_index = INSERT_POSITIONS.findIndex((pos) => pos[0] == selector_pos[0] && pos[1] == selector_pos[1]) + 1;
        if (new_index >= INSERT_POSITIONS.length) {
            new_index = 0;
        }
        selector.x = BOARD_OFFSET_X + INSERT_POSITIONS[new_index][0];
        selector.y = BOARD_OFFSET_Y + INSERT_POSITIONS[new_index][1];
        return;
    }
    if (gameState == "MOVE_PLAYER") {
        // move player
        let selector = getFirst(SPRITE_ABBRS["selector_" + board.players[board.activePlayer].color]);
        let selector_pos = [selector.x - BOARD_OFFSET_X, selector.y - BOARD_OFFSET_Y];
        let new_pos = [selector_pos[0], selector_pos[1]-1];
        if (new_pos[1] <= 0) {
            new_pos[1] = 0;
        }
        selector.x = BOARD_OFFSET_X + new_pos[0];
        selector.y = BOARD_OFFSET_Y + new_pos[1];
        return;
    }
})

onInput("s", () => {
    console.log(`Got S, game state is ${gameState}`);
    if (gameState == "MENU") {
        num_players = Math.max(2, num_players - 1);
        showMenu();
        return;
    }
    if (gameState == "INSERT_TILE") {
        // select new insertion position
        let selector = getFirst(SPRITE_ABBRS["selector_" + board.players[board.activePlayer].color]);
        let selector_pos = [selector.x - BOARD_OFFSET_X, selector.y - BOARD_OFFSET_Y];
        let new_index = INSERT_POSITIONS.findIndex((pos) => pos[0] == selector_pos[0] && pos[1] == selector_pos[1]) - 1;
        if (new_index < 0) {
            new_index = INSERT_POSITIONS.length - 1;
        }
        selector.x = BOARD_OFFSET_X + INSERT_POSITIONS[new_index][0];
        selector.y = BOARD_OFFSET_Y + INSERT_POSITIONS[new_index][1];
        return;
    }
    if (gameState == "MOVE_PLAYER") {
        // move player
        let selector = getFirst(SPRITE_ABBRS["selector_" + board.players[board.activePlayer].color]);
        let selector_pos = [selector.x - BOARD_OFFSET_X, selector.y - BOARD_OFFSET_Y];
        let new_pos = [selector_pos[0], selector_pos[1]+1];
        if (new_pos[1] >= 6) {
            new_pos[1] = 6;
        }
        selector.x = BOARD_OFFSET_X + new_pos[0];
        selector.y = BOARD_OFFSET_Y + new_pos[1];
        return;
    }
})

onInput("d", () => {
    console.log(`Got D, game state is ${gameState}`);
    if (gameState == "INSERT_TILE") {
        // rotate held piece
        board.held_piece.rotation = (board.held_piece.rotation + 90) % 360;
        return;
    }
    if (gameState == "MOVE_PLAYER") {
        // move player
        let selector = getFirst(SPRITE_ABBRS["selector_" + board.players[board.activePlayer].color]);
        let selector_pos = [selector.x - BOARD_OFFSET_X, selector.y - BOARD_OFFSET_Y];
        let new_pos = [selector_pos[0]+1, selector_pos[1]];
        if (new_pos[0] >= 6) {
            new_pos[0] = 6;
        }
        selector.x = BOARD_OFFSET_X + new_pos[0];
        selector.y = BOARD_OFFSET_Y + new_pos[1];
        return;
    }
})

onInput("a", () => {
    console.log(`Got A, game state is ${gameState}`);
    if (gameState == "INSERT_TILE") {
        // rotate held piece
        board.held_piece.rotation = (board.held_piece.rotation + 270) % 360;
        return;
    }
    if (gameState == "MOVE_PLAYER") {
        // move player
        let selector = getFirst(SPRITE_ABBRS["selector_" + board.players[board.activePlayer].color]);
        let selector_pos = [selector.x - BOARD_OFFSET_X, selector.y - BOARD_OFFSET_Y];
        let new_pos = [selector_pos[0]-1, selector_pos[1]];
        if (new_pos[0] <= 0) {
            new_pos[0] = 0;
        }
        selector.x = BOARD_OFFSET_X + new_pos[0];
        selector.y = BOARD_OFFSET_Y + new_pos[1];
        return;
    }
})

afterInput(() => {
    
})

