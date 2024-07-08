/*
@title:  BrainBoom
@author: Kapilarny
@tags: []
@addedOn: 2024-00-00
*/

// -------------------
// Sprites
// -------------------
const player = "p";
const box = "b";
const sel_box = "s";
const interpret_box = "i";

const add = "0";
const sub = "1";
const shift_right = "2";
const shift_left = "3";
const open_loop = "4";
const close_loop = "5";
const output = "6";
const input = "7";
const end = "8";

const arr_left = "l";
const arr_right = "r";

setLegend(
    [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ], 
    [ box, bitmap`
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
................` ],
    [ sel_box, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333` ],
    [ interpret_box, bitmap`
7777777777777777
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7777777777777777` ],
    [ add, bitmap`
................
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.00000000000000.
.00000000000000.
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................` ],
    [ sub, bitmap`
................
................
................
................
................
................
................
.00000000000000.
.00000000000000.
................
................
................
................
................
................
................` ],
    [ shift_right, bitmap`
................
........00......
.......00.......
......00........
.....00.........
....00..........
...00...........
..00............
..00............
...00...........
....00..........
.....00.........
......00........
.......00.......
........00......
................` ],
    [ shift_left, bitmap`
................
......00........
.......00.......
........00......
.........00.....
..........00....
...........00...
............00..
............00..
...........00...
..........00....
.........00.....
........00......
.......00.......
......00........
................` ],
    [ open_loop, bitmap`
................
................
................
...000000.......
...0............
...0............
...0............
...0............
...0............
...0............
...0............
...0............
...000000.......
................
................
................` ],
    [ close_loop, bitmap`
................
................
................
.......000000...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
.......000000...
................
................
................` ],
    [ output, bitmap`
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
......000.......
......000.......
......000.......
................
................
................` ],
    [ input, bitmap`
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
.......0........
......00........
.....00.........
.....0..........
................
................` ],
    [ end, bitmap`
................
................
................
..000...........
..0.............
..0.............
..0.............
..000...........
..0...0..0.00...
..0...00.0.0.0..
..0...0.00.00...
..0...0..0......
..000...........
................
................
................` ],
    [ arr_right, bitmap`
................
................
..........0.....
..........00....
..........000...
..........0000..
..........00000.
.000000000000000
.000000000000000
..........00000.
..........0000..
..........000...
..........00....
..........0.....
................
................` ],
    [ arr_left, bitmap`
................
................
.....0..........
....00..........
...000..........
..0000..........
.00000..........
000000000000000.
000000000000000.
.00000..........
..0000..........
...000..........
....00..........
.....0..........
................
................` ]
)

// -------------------
// BF implementation
// -------------------

// Data cells
let data_cells = [];
let data_cells_size = 5;
let data_pointer = 0;

// Output cells
let output_cells = [];
let output_size = 5;
let output_pointer = output_size-1; // back to front

// Fill data cells with 0
for(let i = 0; i < data_cells_size; i++) {
  data_cells.push(0);
}

// Fill output cells with 0
for(let i = 0; i < output_size; i++) {
  output_cells.push(0);
}

let loop_stack = [];
let curr_instr = 0;
let curr_tile = 0;
let code = [];

const program_loop = () => {
    setTimeout(() => {
        if(curr_instr > code.length) {
            console.log("Executed successfully!");
            return;
        }

        const next_instr = code[curr_instr];
        program_step(next_instr);
    }, 1000);
}

const program_step = (instr) => {
    console.log("Program step!");
  
    if(program[curr_tile] == -1) {
        draw_box(box);
        curr_tile++
        program_loop(); // basically continue;
        return;
    }
  
    if(instr === "E") return;
  
    if(instr === "[") {
        loop_stack.push(i);
        program_loop();
        return;
    }
    
    if(instr === "]") {
        let start = loop_stack.pop();
        if(data_cells[data_pointer] !== 0) {
            i = start-1;
        }

        program_loop();
        return;
    }
  
    run_instruction(instr);
    program_loop();
}

const run_program = () => {
    console.log(`Running program -> ${code}`);

    program_loop();
  
    // setTimeout(() => {
    //     if(curr_instr < code.length) return;

    //     if(program[curr_tile] == -1) {
    //         draw_box(box);
    //         curr_tile++
    //     }
      
    //     if(code[curr_instr] === "E") return;
      
    //     if(code[curr_instr] === "[") {
    //         loop_stack.push(i);
    //     } else if(code[curr_instr] === "]") {
    //         let start = loop_stack.pop();
    //         if(data_cells[data_pointer] !== 0) {
    //             i = start-1;
    //         }
    //     } else {
    //         run_instruction(code[i]);
    //     }
    // }, 1000);
  
    // for(let i = 0; i < program.length; i++) {
    //     if(program[i] === "E") break;
        
    //     if(program[i] === "[") {
    //         loop_stack.push(i);
    //         continue;
    //     }

    //     if(program[i] === "]") {
    //         let start = loop_stack.pop();
    //         if(data_cells[data_pointer] !== 0) {
    //             i = start-1;
    //         }
          
    //         continue;
    //     }

    //     run_instruction(program[i]);
    // }

    console.log(`Data cells: ${data_cells}`);
    console.log(`Output cells: ${output_cells}`);
};

const run_instruction = (instruction) => {
    // console.log(`Running inst => ${instruction}`);
  
    switch(instruction) {
        case "+":
            data_cells[data_pointer]++;
            break;
        case "-":
            data_cells[data_pointer]--;
            break;
        case ">":
            data_pointer--;
            break;
        case "<":
            data_pointer++;
            break;
        case ".":
            output_cells[output_pointer] = data_cells[data_pointer];
            if(output_pointer !== 0) output_pointer--;
            break;
        case ",":
            // Not implemented
            break;
        default:
            console.log(`Unrecognized instruction! ${instruction}`);
            break;
    }
};

let instruction_set = ["+", "-", "<", ">", "[", "]", ".", ",", "E"];

// -------------------
// Game implementation
// -------------------
let level = 0
const levels = [
  map`
p.........
..........
..........
..........
..........
.sbbbbbbbr
..........
..........`
]

let input_disabled = false;

let selected = 0;
const max_selected = 7;

let program = [];
let program_size = (max_selected * 2);

let offset = 0;
let max_offset = program_size - max_selected;

// Fill program out with blanks
for(var i = 0; i < program_size+1; i++) {
  program.push(-1);
}

setMap(levels[level])

const render_box = (box_sprite) => {
    clearTile(selected+1, 5);
    addSprite(selected+1, 5, box_sprite);
    if(program[offset + selected] !== -1) {
        const op_sprite = parseInt(program[offset + selected]);
        addSprite(selected+1, 5, op_sprite);
    }
};

const render_arrows = () => {
    // console.log(offset);
  
    if(offset > 0) {
        addSprite(0, 5, arr_left);
    } else {
        clearTile(0, 5);
    }

    if(offset !== program_size - max_selected) {
        addSprite(9, 5, arr_right)
    } else {
        clearTile(9, 5);
    }
};

// IMPORTANT: This function resets `selected` variable! (this is bad code but oh well)
const render_all_boxes = () => {
    selected = 0;
    while(selected !== max_selected+1) {
        render_box(box);
        selected++;
    }
    selected = 0;
};

onInput("d", () => {
    if(input_disabled) return;
  
    if(selected === max_selected) {
        if(offset === program_size - max_selected) return;
        offset++;
        render_all_boxes();
        selected = max_selected;
        render_box(sel_box);
        render_arrows();
      
        return;
    }
  
    render_box(box);
    selected++;
    render_box(sel_box);
    render_arrows();
});

onInput("a", () => {
    if(input_disabled) return;
    
    if(selected === 0) {
        if(offset == 0) return;
        offset--;
        render_all_boxes();
        selected = 0;
        render_box(sel_box);
        render_arrows();
      
        return;
    }
  
    render_box(box);
    selected--;
    render_box(sel_box);
    render_arrows();
});

onInput("j", () => {
    if(input_disabled) return;
  
    if(program[offset + selected] === 8) program[offset + selected] = -1;
    else program[offset + selected]++;

    render_box(sel_box);
});

onInput("l", () => {
    if(input_disabled) return;
  
    if(program[offset + selected] === -1) program[offset + selected] = 8;
    else program[offset + selected]--;

    render_box(sel_box);
});

onInput("i", () => {
    if(input_disabled) return;
    input_disabled = true;

    offset = 0;
    selected = 0;
    render_all_boxes();
    render_arrows();

    render_box(interpret_box);
  
    // Create a digestible array for the interpreter
    code = [];
    for(var i = 0; i < program.length; i++) {
        if(program[i] == -1) continue;
        code.push(instruction_set[program[i]]);
    }

    run_program();
});

afterInput(() => {
  
})
