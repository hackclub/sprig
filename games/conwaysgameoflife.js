/*=
@title: conway-gol
@author: the456gamer
@tags: ['sandbox','simulation']
@addedOn: 2022-11-08

  a game of life
  the cursor moves
  icons at top:
  left to right
  clear screen (click again to confirm)
  debug mode (conditional on screen size)
  speed selector
  single step / simulate 1 iteration
  play/pause button

  */

/** Engine
 *
 */

const engine_colours = {
  black: "0",
  light_grey: "1",
  white: "2",
  red: "3",
  light_green: "4",
  dark_blue: "5",
  yellow: "6",
  light_blue: "7",
  pink: "8",
  orange: "9",
  brown: "C",
  dark_green: "D",
  gold: "F",
  purple: "H",
  dark_grey: "L",
  transparent: ".",
  replacement_constant: "#",
};

function handleMove(direction) {
  getFirst(sprites.cursor).x += directionVectors[direction].x;
  getFirst(sprites.cursor).y += directionVectors[direction].y;
}

const direction = {
  up: "w",
  left: "a",
  down: "s",
  right: "d",
};

const directionVectors = {
  [direction.up]: { x: 0, y: -1 },
  [direction.left]: { x: -1, y: 0 },
  [direction.down]: { x: 0, y: 1 },
  [direction.right]: { x: 1, y: 0 },
};

function posInGameBounds(game_x, game_y) {
  if (0 <= game_x < game_width && 0 <= game_y < game_height) {
    return true;
  }
  return false;
}

function posInWindowBounds(window_x, window_y) {
  if (0 <= window_x < width() && 0 <= window_y < height()) {
    return true;
  }
  return false;
}

function gamegrid_debug_text(x, y, text, colour) {
  if (!debugAvalible()) {
    return;
  }
  const text_grid_x = debug_text_constants_x[x];
  const text_grid_y = debug_text_constants_y[y];
  addText(`${text}`, { x: text_grid_x, y: text_grid_y, color: colour });
}

/** Game
 *
 */

// const game_width = 9; // chosen to allow debug mode
// const game_height = 6;

const game_width = 25;
const game_height = 20;

const debug_text_constants_x = [1, 3, 5, 7, 10, 12, 14, 16, 19];
const debug_text_constants_y = [3, 5, 7, 10, 12, 14];

const cell_states = {
  DEAD: 0,
  ALIVE: 1,
  OUT_OF_BOUNDS: -1,
};

function debugAvalible() {
  if (game_width != 9 || game_height != 6) {
    return false;
  }
  return true;
}

function isCellAlive(cell_state) {
  return cell_state == cell_states.ALIVE;
}

function getNumAliveNeighbors(board, game_x, game_y) {
  var count = 0;

  //  0 1 2
  // 0
  // 1
  // 2

  count += isCellAlive(getCell(board, game_x - 1, game_y - 1));
  count += isCellAlive(getCell(board, game_x - 1, game_y));
  count += isCellAlive(getCell(board, game_x - 1, game_y + 1));
  count += isCellAlive(getCell(board, game_x, game_y - 1));
  // ignore center cell (self)
  count += isCellAlive(getCell(board, game_x, game_y + 1));
  count += isCellAlive(getCell(board, game_x + 1, game_y - 1));
  count += isCellAlive(getCell(board, game_x + 1, game_y));
  count += isCellAlive(getCell(board, game_x + 1, game_y + 1));

  return count;
}

function getCell(board, game_x, game_y) {
  if (posInGameBounds(game_x, game_y) == false) {
    return cell_states.OUT_OF_BOUNDS;
  }
  if (board[game_y] == undefined) {
    board[game_y] = [];
  }
  var board_state = board[game_y][game_x];
  if (board_state == undefined) {
    board[game_y][game_x] = cell_states.DEAD;
    return cell_states.DEAD;
  }
  return board_state;
}

function setCell(board, game_x, game_y, cell_state) {
  if (posInGameBounds(game_x, game_y) == false) {
    return false;
  }
  if (board[game_y] == undefined) {
    board[game_y] = [];
  }
  board[game_y][game_x] = cell_state;
  const debug_state =
    debugAvalible() && state.debug_mode == debug_mode.internal_state;
  if (debug_state) {
    gamegrid_debug_text(game_x, game_y, cell_state, engine_colours.red);
  }
}

function simulate(board) {
  var check_board = board;
  var out_board = [];
  //todo try deep copies to fix the simulation issue
  // it turns --- into a H
  // go through step by step, see where cell counts coming from (the turn before)

  // get num of alive neighbors

  for (let row = 0; row < game_height; row++) {
    for (let col = 0; col < game_width; col++) {
      const count = getNumAliveNeighbors(check_board, col, row);

      if (getCell(check_board, col, row) == cell_states.ALIVE) {
        if (count == 2 || count == 3) {
          setCell(out_board, col, row, 1);
        } else {
          setCell(out_board, col, row, 0);
        }
      } else {
        if (count == 3) {
          setCell(out_board, col, row, 1);
        } else {
          setCell(out_board, col, row, 0);
        }
      }
    }
  }

  return out_board;
}

function gamecoordtowindowcoord(game_x, game_y) {
  return [game_x, game_y + 1];
}

function windowcoordtogamecoord(window_x, window_y) {
  var game_x = window_x;
  var game_y = window_y - 1;
  if (posInGameBounds(game_x, game_y)) {
    return [game_x, game_y];
  }
  return undefined;
}

function board_change_at_pos(j, i, old_sprite, new_sprite) {
  getTile(
    gamecoordtowindowcoord(j, i)[0],
    gamecoordtowindowcoord(j, i)[1]
  ).forEach((sprite) => {
    if (sprite.type == old_sprite) {
      sprite.type = new_sprite;
    }
  });
  if (state_sprites[getCell(game_grid, j, i)] == old_sprite) {
    var cell_state =
      Object.keys(state_sprites)[
        Object.values(state_sprites).indexOf(new_sprite)
      ];
    setCell(game_grid, j, i, cell_state);
  }
}

function update_cell_state_pos(j, i, new_sprite) {
  [sprites.alive, sprites.dead].forEach((sprite_type) => {
    board_change_at_pos(j, i, sprite_type, new_sprite);
  });
}

function update_texture_map() {
  setLegend(
    // fixed order
    getSpriteTexture(sprites.cursor),
    getSpriteTexture(sprites.btn_clear),
    getSpriteTexture(sprites.btn_dbg_mode),
    getSpriteTexture(sprites.btn_pause),
    getSpriteTexture(sprites.btn_speed),
    getSpriteTexture(sprites.btn_step),
    getSpriteTexture(sprites.toolbar_bg),
    getSpriteTexture(sprites.alive),
    getSpriteTexture(sprites.dead)
  );
}

function getSpriteTexture(sprite) {
  return [sprite, getTexture(sprite)];
}
function getTexture(sprite) {
  const frame = getTextureFrame(sprite);
  const texture = textures[sprite][frame];
  return texture;
}

function getTextureFrame(sprite) {
  var frame = state.anim[sprite];
  if (frame == undefined) {
    frame = 0;
  }
  return frame;
}

function setTextureFrame(sprite, frame) {
  frame = frame % textures[sprite].length;
  state.anim[sprite] = frame;
}

function nextTextureFrame(sprite) {
  var current_frame = getTextureFrame(sprite);
  setTextureFrame(sprite, current_frame + 1);
  //TODO decide whether to return current frame, or the frame its set to. maybe neither?
}

function isPaused() {
  return state.isPaused;
}

function setPaused(new_state) {
  state.isPaused = new_state;
  nextTextureFrame(sprites.btn_pause);
  if (!new_state) {
    start_simulation();
  }
  update_texture_map();
}

function togglePlayback() {
  setPaused(!isPaused());
}

function step_simulation() {
  if (!isPaused()) {
    setPaused(true);
  }

  game_grid = simulate(game_grid);
  update_board(game_grid);
}

function next_from_enum(obj, current) {
  var values = Object.values(obj);
  const len = values.length;
  const current_index = values.indexOf(current);
  // handle -1 (not in obj as start from beginning)
  const next_index = (current_index + 1) % len;
  return values[next_index];
}

function activateCursor() {
  var cursor = getFirst(sprites.cursor);
  const window_x = cursor.x;
  const window_y = cursor.y;

  var tiles = getTile(window_x, window_y);
  tiles.forEach((tile) => {
    const handler = sprite_activation_handler[tile.type];
    if (handler != undefined) {
      handler(window_x, window_y);
    }
  });

  // get objects on curser, lookup in table the funct to call
  // call function specified in lookup table (with each intersecting sprite)
}

function preInput() {
  if (first_input) {
    clearText();
    first_input = false;
  }
}

function postInput() {
  if (state.grid_clear_confirm == grid_clear_confirm.set_confirm) {
    state.grid_clear_confirm = grid_clear_confirm.shown_confirm;
  } else if (state.grid_clear_confirm == grid_clear_confirm.shown_confirm) {
    state.grid_clear_confirm = grid_clear_confirm.none;
    nextTextureFrame(sprites.btn_clear);
    update_texture_map();
  }
}

onInput(direction.up, () => {
  preInput();
  handleMove(direction.up);
});
onInput(direction.left, () => {
  preInput();
  handleMove(direction.left);
});
onInput(direction.down, () => {
  preInput();
  handleMove(direction.down);
});
onInput(direction.right, () => {
  preInput();
  handleMove(direction.right);
});

onInput("i", () => {
  preInput();
  togglePlayback();
}); // pause play
onInput("j", () => {
  preInput();
  step_simulation();
}); // single step
// onInput("k", () => {}); // unbound
onInput("l", () => {
  preInput();
  activateCursor();
}); // toggle current block

afterInput(postInput);

/*
  clear grid
  cycle debug modes (show num neigbors)
  easter eggs (rickroll) (konami code)
  toggle sound effects

  simulation pause play
  simulation single step
  simulation change speed
  toggle current cell
  */

const sim_speed = {
  // ms of delay
  fast: 0,
  slow: 100,
};

const debug_mode = {
  none: 1,
  cell_count_neighbors: 2,
  internal_state: 3,
};

const grid_clear_confirm = {
  none: 1,
  set_confirm: 2,
  shown_confirm: 3,
};

var state = {
  sim_speed: sim_speed.slow,
  debug_mode: debug_mode.none,
  grid_clear_confirm: grid_clear_confirm.none,
  anim: {},
  isPaused: true,
};

// list of lists, row,col
var game_grid = [];

const sprites = {
  cursor: "C",
  dead: "D",
  alive: "A",
  btn_dbg_mode: "b",
  btn_clear: "c",
  btn_speed: "s",
  btn_pause: "p",
  btn_step: "n",
  toolbar_bg: "o",
};

const state_sprites = {
  [cell_states.ALIVE]: sprites.alive,
  [cell_states.DEAD]: sprites.dead,
  [cell_states.OUT_OF_BOUNDS]: null,
};

const cursor_template = `
  ${".".repeat(16)}
  ${".".repeat(16)}
  ..123412341234..
  ..4..........1..
  ..3..........2..
  ..2..........3..
  ..1..........4..
  ..4..........1..
  ..3..........2..
  ..2..........3..
  ..1..........4..
  ..4..........1..
  ..3..........2..
  ..214321432143..
  ${".".repeat(16)}
  ${".".repeat(16)}
  `;

const solid_template = ("0".repeat(16) + "\n").repeat(15) + "0".repeat(16);

var textures = {
  [sprites.cursor]: [
    cursor_template
      .replaceAll("1", engine_colours.orange)
      .replaceAll("2", engine_colours.orange)
      .replaceAll("3", engine_colours.orange)
      .replaceAll("4", engine_colours.transparent),
    cursor_template
      .replaceAll("1", engine_colours.transparent)
      .replaceAll("2", engine_colours.orange)
      .replaceAll("3", engine_colours.orange)
      .replaceAll("4", engine_colours.orange),
    cursor_template
      .replaceAll("1", engine_colours.orange)
      .replaceAll("2", engine_colours.transparent)
      .replaceAll("3", engine_colours.orange)
      .replaceAll("4", engine_colours.orange),
    cursor_template
      .replaceAll("1", engine_colours.orange)
      .replaceAll("2", engine_colours.orange)
      .replaceAll("3", engine_colours.transparent)
      .replaceAll("4", engine_colours.orange),
  ],
  [sprites.btn_dbg_mode]: [
    `
  ................
  .000..000..0000.
  .0..0.0..0.0....
  .0..0.0000.0.00.
  .0..0.0..0.0..0.
  .000..000..0000.
  ................
  ................
  ................
  ..1111.111.111..
  ..1..1.1...1....
  ..1..1.111.111..
  ..1..1.1...1....
  ..1111.1...1....
  ................
  ................`
      .replaceAll("0", engine_colours.black)
      .replaceAll("1", engine_colours.red),
    `
  ................
  .000..000..0000.
  .0..0.0..0.0....
  .0..0.0000.0.00.
  .0..0.0..0.0..0.
  .000..000..0000.
  ................
  ...1..1.1..1....
  ...11.1.1..1....
  ...1.11.1..1....
  ...1..1.1111....
  .....1...1......
  .....11.11......
  .....1.1.1......
  .....1...1......
  ................`
      .replaceAll("0", engine_colours.black)
      .replaceAll("1", engine_colours.dark_green),
    `
................
.000..000..0000.
.0..0.0..0.0....
.0..0.0000.0.00.
.0..0.0..0.0..0.
.000..000..0000.
................
.1111..111.111..
.1......1..1.1..
.1111...1..111..
....1...1..1.1..
.1111...1..111..
................
................
................
................`
      .replaceAll("0", engine_colours.black)
      .replaceAll("1", engine_colours.dark_blue),
  ],
  [sprites.btn_clear]: [
    `
  ................
  ......0000......
  ......0..0......
  ....00000000....
  ...0000000000...
  ..0..........0..
  ..0..........0..
  ..00........00..
  ...0........0...
  ...00......00...
  ...00......00...
  ....0......0....
  ....0......0....
  ....0......0....
  .....000000.....
  ................`.replaceAll("0", engine_colours.light_grey),
    `
  ................
  .....11110......
  ....111111......
  ...111001110....
  ..11100001110...
  ..11......11.0..
  ..0.......11.0..
  ..00......1100..
  ...0.....1110...
  ...00...11100...
  ...00..111.00...
  ....0..11..0....
  ....0......0....
  ....0..11..0....
  .....001100.....
  ................`
      .replaceAll("0", engine_colours.light_grey)
      .replaceAll("1", engine_colours.red),
  ],
  [sprites.btn_pause]: [
    `
  ................
  ................
  ................
  ...000..........
  ...000000.......
  ...0000000......
  ...000000000....
  ...0000000000...
  ...0000000000...
  ...000000000....
  ...0000000......
  ...00000........
  ...000..........
  ................
  ................
  ................`.replaceAll("0", engine_colours.light_green),

    `
  ................
  ................
  ................
  ................
  ....000..000....
  ....000..000....
  ....000..000....
  ....000..000....
  ....000..000....
  ....000..000....
  ....000..000....
  ....000..000....
  ................
  ................
  ................
  ................`.replaceAll("0", engine_colours.red),
  ],
  [sprites.btn_step]: [
    `
  ................
  ................
  ................
  ................
  ......0000......
  .....0....0.....
  ....0......0.0..
  ...0........00..
  ..0....11..000..
  .......11.......
  ................
  ................
  ................
  ................
  ................
  ................`
      .replaceAll("1", engine_colours.red)
      .replaceAll("0", engine_colours.light_grey),
  ],
  [sprites.btn_speed]: [
    `
  ................
  .0000000........
  .0000000........
  ....000.........
  ...000..........
  ..000...........
  .0000000........
  .0000000........
  ........0000000.
  ........0000000.
  ...........000..
  ..........000...
  .........000....
  ........0000000.
  ........0000000.
  ................`.replaceAll("0", engine_colours.light_grey),
    `
  ................
  ....00000000....
  ...0000000000...
  ..000112211000..
  .00011122111000.
  .00111122111100.
  .00111122111100.
  .00111122111100.
  .00111122211100.
  .00111111221100.
  .00111111122100.
  .00011111112000.
  ..000111111000..
  ...0000000000...
  ....00000000....
  ................`
      .replaceAll("0", engine_colours.dark_grey)
      .replaceAll("1", engine_colours.light_grey)
      .replaceAll("2", engine_colours.white),
  ],
  [sprites.toolbar_bg]: [
    solid_template.replaceAll("0", engine_colours.dark_grey),
  ],
  [sprites.alive]: [solid_template.replaceAll("0", engine_colours.white)],
  [sprites.dead]: [solid_template.replaceAll("0", engine_colours.black)],
};

var sprite_activation_handler = {
  [sprites.alive]: function (j, i) {
    if (!isPaused()) {
      setPaused(true);
    }
    update_cell_state_pos(
      windowcoordtogamecoord(j, i)[0],
      windowcoordtogamecoord(j, i)[1],
      sprites.dead
    );
  },
  [sprites.dead]: function (j, i) {
    if (!isPaused()) {
      setPaused(true);
    }

    update_cell_state_pos(
      windowcoordtogamecoord(j, i)[0],
      windowcoordtogamecoord(j, i)[1],
      sprites.alive
    );
  },
  [sprites.btn_pause]: function (j, i) {
    togglePlayback();
  },
  [sprites.btn_clear]: function (j, i) {
    switch (state.grid_clear_confirm) {
      case grid_clear_confirm.none:
        state.grid_clear_confirm = grid_clear_confirm.set_confirm;
        nextTextureFrame(sprites.btn_clear);
        update_texture_map();
        break;
      case grid_clear_confirm.shown_confirm:
        state.grid_clear_confirm = grid_clear_confirm.none;
        nextTextureFrame(sprites.btn_clear);
        game_grid = [];
        update_board(game_grid);
        clearText();
        break;
    }
  },
  [sprites.btn_dbg_mode]: function (j, i) {
    if (debugAvalible()) {
      clearText();
      nextTextureFrame(sprites.btn_dbg_mode);
      state.debug_mode = next_from_enum(debug_mode, state.debug_mode);
      update_texture_map();
    }
  },
  [sprites.btn_speed]: function (j, i) {
    nextTextureFrame(sprites.btn_speed);
    state.sim_speed = next_from_enum(sim_speed, state.sim_speed);
    update_texture_map();
  },
  [sprites.btn_step]: function (j, i) {
    if (!isPaused()) {
      setPaused(true);
    }
    step_simulation();
  },
};

var map_toolbar = sprites.toolbar_bg.repeat(game_width);

var map_gamerow = sprites.dead.repeat(game_width);

var inital_map = `${map_toolbar}
  ${(map_gamerow + "\n").repeat(game_height)}`;

update_texture_map();

setMap(inital_map);

addSprite(0, 0, sprites.btn_clear);
if (debugAvalible()) {
  addSprite(1, 0, sprites.btn_dbg_mode);
}
addSprite(game_width - 3, 0, sprites.btn_speed);
addSprite(game_width - 2, 0, sprites.btn_step);
addSprite(game_width - 1, 0, sprites.btn_pause);

const inital_cursor = gamecoordtowindowcoord(
  Math.round(game_width / 2) - 1,
  Math.round((2 * game_height) / 3) - 1
);

addSprite(inital_cursor[0], inital_cursor[1], sprites.cursor);

var first_input = true;

const text_start_Y = 3;

addText("WASD: move", {
  x: 1,
  y: text_start_Y,
  color: engine_colours.purple,
});
addText("I: pause/resume", {
  x: 1,
  y: text_start_Y + 1,
  color: engine_colours.purple,
});
addText("J: single-step", {
  x: 1,
  y: text_start_Y + 2,
  color: engine_colours.purple,
});
// addText("K: unbound", { x: 1, y: 4, color: engine_colours.purple });
addText("L: activate cursor", {
  x: 1,
  y: text_start_Y + 3,
  color: engine_colours.purple,
});

function update_board(board) {
  const debug_amounts =
    debugAvalible() && state.debug_mode == debug_mode.internal_state;
  const debug_neighbors =
    debugAvalible() && state.debug_mode == debug_mode.debug_neighbors;
  if (debug_amounts || debug_neighbors) {
    clearText();
  }
  for (let i = 0; i < game_height; i++) {
    for (let j = 0; j < game_width; j++) {
      var cell_state = getCell(board, j, i);
      var sprite = state_sprites[cell_state];
      if (debug_amounts) {
        gamegrid_debug_text(j, i, `${cell_state}`, engine_colours.gold);
      } else if (debug_neighbors) {
        gamegrid_debug_text(
          j,
          i,
          `${getNumAliveNeighbors(game_grid, j, i)}`,
          engine_colours.gold
        );
      }

      if (sprite == null) {
        continue;
      }

      update_cell_state_pos(j, i, sprite);
    }
  }
}

const intervalID = setInterval(() => {
  nextTextureFrame(sprites.cursor);
  update_texture_map();
}, 500);
/*
function cleanup() {
  clearInterval(intervalID);
  setPaused(true);
  document.querySelector(".run").removeEventListener("click", cleanup, false);
}

document.querySelector(".run").addEventListener("click", cleanup);
*/
var simulation_running = false;

var continous_simulation = function () {
  simulation_running = true;
  if (isPaused()) {
    simulation_running = false;
    return;
  }

  game_grid = simulate(game_grid);
  update_board(game_grid);
  if (isPaused()) {
    simulation_running = false;
    return;
  }
  setTimeout(continous_simulation, state.sim_speed);
};

function start_simulation() {
  if (simulation_running == false) {
    setTimeout(continous_simulation, state.sim_speed);
  }
}
