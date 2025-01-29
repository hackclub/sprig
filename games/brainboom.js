/*
@title:  BrainBoom
@author: Kapilarny
@tags: ['humor','puzzle']
@addedOn: 2024-07-09
*/

/*
  Controlz:
  a/d -> move around menus/code
  w/s -> change operand
  k -> select level/stop simulation
  i -> start simulation

  j -> show level task
  l -> go back to level selection
*/

// -------------------
// Sprites
// -------------------
const player = "p";
const box = "b";
const sel_box = "s";
const interpret_box = "i";

// I'm not going to lie, i don't like this "one char sprite identifier" system
// you could've just made something like -> create_sprite(); function and than you'd get a unique sprite_id to interface with
// And you even recommend storing the keys in variables so WHYY

const add = "+";
const sub = "-";
const shift_right = "<";
const shift_left = ">";
const open_loop = "[";
const close_loop = "]";
const output = "="; // i hate this so much
const input = ",";
const end = "N";

const arr_left = "l";
const arr_right = "r";

// -------------------
// Numbers
// -------------------

const zero = "A";
const one = "B";
const two = "C";
const three = "D";
const four = "E";
const five = "F";
const six = "G";
const seven = "H";
const eight = "I";
const nine = "J";

// You know whats better than creating bitmaps for numbers 0-9?
// Creating bitmaps not for one set of numbers 0-9 but two! (since you cant displace sprites with floating point precision :))))))))))))))))

const zero_2 = "0";
const one_2 = "1";
const two_2 = "2";
const three_2 = "3";
const four_2 = "4";
const five_2 = "5";
const six_2 = "6";
const seven_2 = "7";
const eight_2 = "8";
const nine_2 = "9";

// I hate my life

const main_theme = tune`
150: D5~150,
150: D5~150,
150: G5^150 + D5~150,
150: D5~150,
150: G5^150,
150,
150: F5^150,
150,
150: G5^150,
150,
150: A5^150,
150: A5^150,
150: D5~150,
150: D5~150,
150: D5~150 + G5^150,
150: D5~150 + F5^150,
150: G5^150,
150: F5^150,
150: G5^150,
150: A5^150,
150: G5^150,
150: F5^150,
150: D5^150,
150,
150: D5~150,
150: D5~150,
150: D5~150,
150: D5~150,
150: G5^150,
150,
150: E5^150,
150: G5^150`
let playback = playTune(main_theme, Infinity);

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
................` ],
    [ zero, bitmap`
................
................
...000..........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
...000..........
................
................` ],
    [ one, bitmap`
................
................
.....0..........
....00..........
....00..........
...000..........
...0.0..........
.....0..........
.....0..........
.....0..........
.....0..........
.....0..........
.....0..........
.....0..........
................
................` ],
    [ two, bitmap`
................
................
....00..........
...00000........
..00...0........
.......0........
......00........
......0.........
.....00.........
....00..........
....0...........
...00...........
...0............
..000000........
................
................` ],
    [ three, bitmap`
................
................
..0000..........
.....00.........
......0.........
......0.........
.....00.........
.....0..........
..0000..........
.....00.........
......0.........
.....00.........
....00..........
..000...........
................
................` ],
    [ four, bitmap`
................
................
....0...........
....0...........
...00...........
...0............
..00............
..0.............
..00000.........
.....0..........
.....0..........
.....0..........
.....0..........
.....0..........
................
................` ],
    [ five, bitmap`
................
................
..000000........
..0.............
..0.............
..0.............
..0.............
..0.............
..00000.........
......00........
.......0........
.......0........
.......0........
..000000........
................
................` ],
    [ six, bitmap`
................
................
..0000..........
..0.............
..0.............
..0.............
..0.............
..00000.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..00000.........
................
................
................` ],
    [ seven, bitmap`
................
................
..000000........
.......0........
.......0........
.......0........
......00........
......0.........
.....00.........
.....0..........
.....0..........
....00..........
....0...........
....0...........
................
................` ],
    [ eight, bitmap`
................
................
...0000.........
..00..00........
..0....0........
..0....0........
..0....0........
..0....0........
...0000.........
..0....0........
..0....0........
..0....0........
..0...00........
...0000.........
................
................` ],
    [ nine, bitmap`
................
................
..00000.........
..0...0.........
..0...0.........
..0...0.........
..00000.........
......0.........
......0.........
......0.........
......0.........
......0.........
..0..00.........
..0000..........
................
................` ],
    [ zero_2, bitmap`
................
................
.........0000...
........0....0..
........0....0..
........0....0..
........0....0..
........0....0..
........0....0..
........0....0..
........0....0..
........0....0..
........0....0..
.........0000...
................
................` ],
    [ one_2, bitmap`
................
................
............00..
...........000..
..........00.0..
.........00..0..
........00...0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
................
................` ],
    [ two_2, bitmap`
................
................
.........00000..
........00...0..
.............0..
.............0..
............0...
...........0....
...........0....
..........00....
..........0.....
.........0......
........00......
........0000000.
................
................` ],
    [ three_2, bitmap`
................
................
........000000..
.............0..
.............0..
.............0..
.............0..
.............0..
........000000..
.............0..
.............0..
.............0..
.............0..
........000000..
................
................` ],
    [ four_2, bitmap`
................
................
...........0....
..........00....
.........00.....
.........0......
........00......
........0...0...
........000000..
............0...
............0...
............0...
............0...
............0...
................
................` ],
    [ five_2, bitmap`
................
................
........000000..
........0.......
........0.......
........0.......
........0.......
........0.......
........000000..
.............0..
.............0..
.............0..
.............0..
........00000...
................
................` ],
    [ six_2, bitmap`
................
................
........000000..
........0.......
........0.......
........0.......
........0.......
........0.......
........000000..
........0....0..
........0....0..
........0....0..
........0....0..
........000000..
................
................` ],
    [ seven_2, bitmap`
................
................
........000000..
.............0..
.............0..
.............0..
............00..
............0...
...........00...
...........0....
..........00....
..........0.....
.........00.....
.........0......
................
................` ],
    [ eight_2, bitmap`
................
................
.........0000...
........0....0..
........0....0..
........0....0..
........0....0..
........0....0..
.........0000...
........0....0..
........0....0..
........0....0..
........0....0..
.........0000...
................
................` ],
    [ nine_2, bitmap`
................
................
........000000..
........0....0..
........0....0..
........0....0..
........0....0..
........000000..
.............0..
.............0..
.............0..
.............0..
.............0..
........000000..
................
................` ],
)


// -------------------
// BF implementation
// -------------------

let should_stop = false;

// Data cells
let data_cells = [];
let data_cells_size = 6;
let data_pointer = 0;

// Output cells
let output_cells = [];
let output_size = 6;
let output_pointer = 0;

let loop_stack = [];
let curr_instr = 0;
let curr_tile = 0;
let code = [];

const reset_interpreter_data = () => {
    should_stop = false;
  
    data_cells = [];
    data_pointer = 0;   
    
    for(let i = 0; i < data_cells_size; i++) {
        data_cells.push(0);
    }

    output_cells = [];
    output_pointer = 0;
  
    // Fill output cells with 0
    for(let i = 0; i < output_size; i++) {
        output_cells.push(0);
    }
    
    loop_stack = [];
    curr_instr = 0;
    curr_tile = 0;
    code = [];

    selected = 0;
    offset = 0;
    render_all_boxes();
    render_data_boxes();
    render_output_boxes();
    render_box(sel_box);
};

const stop_exec = () => {
    console.log("Executed successfully!");

    // im lazy (this is to make the eventual tests not pass based on stuff)
    if(should_stop) {
        output_cells = [];
        output_pointer = 0;
        for(let i = 0; i < output_size; i++) {
            output_cells.push(0);
        }
    } else {
        render_output_boxes();
    }

    render_data_boxes();

    console.log(`Data cells: ${data_cells}`);
    console.log(`Output cells: ${output_cells}`);
  
    setTimeout(() => {
      const passed = curr_puzzle !== -1 && puzzles[curr_puzzle].verify_function();
      console.log(`Puzzle ${curr_puzzle} -> ${passed}`);
      last_gen = -1;
      last_gen_2 = -1;
      
      reset_interpreter_data();
      input_disabled = false;
      if(passed) puzzle_success();
    }, 3000);
};

const program_loop = () => {
    setTimeout(() => {
        // console.log(`${curr_instr} vs ${code.length}`);
        if(curr_instr >= code.length || should_stop) {
            stop_exec();
            return;
        }

        const next_instr = code[curr_instr];
        program_step(next_instr);
    }, 1000);
}

const advance_box = () => {
    if(selected === max_selected) offset++;
    else selected++;
    // console.log(`Advancing: ${selected + offset}`);
    let temp = selected;
    render_all_boxes();
    render_data_boxes();
    render_output_boxes();
    // render_data_box(interpret_box, data_pointer);
    render_interpret_boxes();
    selected = temp;
    render_box(interpret_box);
}

let aCharCode = "A".charCodeAt(0);

let get_char_from_ascii = (ascii_code) => {
    return String.fromCharCode(ascii_code);
}

const program_step = (instr) => {
    // console.log(`Program step! (${curr_instr}) (${instr})`);
    if(instr === "N" || offset === max_offset+1) {
        // if(!(curr_instr+1 >= code.length)) advance_box();
        stop_exec();
        return;
    }

    // console.log("bruh");

    // if(!(curr_instr+1 >= code.length)) advance_box();
  
    if(program[curr_tile] == -1) {
        if(!(curr_instr+1 > code.length)) advance_box();
        program_loop(); // basically continue;
        return;
    }
  
    if(instr === "[") {
        loop_stack.push(curr_instr);

        // Get the next ']' from the `code`
        let next = curr_instr+1;
        while(code[next] !== "]" && next < code.length) {
            next++;
        }

        if(code[next] === "]" && data_cells[data_pointer] === 0) {
            curr_instr = next-1;
            selected = next - offset-1;

            if(selected > max_selected) {
                offset = selected - max_selected;
                selected = max_selected;
            }
        }

        curr_instr++;
        if(!(curr_instr+1 > code.length)) advance_box();
        program_loop(); // basically continue;
        return;
    }
    
    if(instr === "]") {
        let start = loop_stack.pop();
        if(data_cells[data_pointer] !== 0) {
            // console.log(`${selected}, ${start}, ${offset}`);
            curr_instr = start-1;
            selected = start - offset-1;

            if(selected < 0) {
                offset += selected;
                selected = 0;
            }
        }

        curr_instr++;
        if(!(curr_instr+1 > code.length)) advance_box();
        program_loop(); // basically continue;
        return;
    }
  
    run_instruction(instr);
    curr_instr++;
    if(!(curr_instr+1 > code.length)) advance_box();
    program_loop(); // basically continue;
}

const run_program = () => {
    console.log(`Running program -> ${code}`);
    last_gen = -1;
    last_gen_2 = -1;
    program_loop();
};

const run_instruction = (instruction) => {
    // console.log(`Running inst => ${instruction}`);
    // console.log(`Data cells: ${data_cells}`);
    // console.log(`Output cells: ${output_cells}`);
    
    switch(instruction) {
        case "+":
            data_cells[data_pointer]++;
            break;
        case "-":
            if(data_cells[data_pointer] !== 0) data_cells[data_pointer]--;
            break;
        case ">":
            if(data_pointer - 1 !== -1) data_pointer--;
            break;
        case "<":
            if(data_pointer + 1 !== data_cells_size) data_pointer++;
            break;
        case ".":
            // console.log("Inserting to output!");
            output_cells[output_pointer] = data_cells[data_pointer];
            if(output_pointer+1 !== output_size) output_pointer++;
            break;
        case ",":
            data_cells[data_pointer] = puzzles[level_selected].input_func();
            break;
        default:
            console.log(`Unrecognized instruction! ${instruction}`);
            break;
    }
};

let instruction_set = ["+", "-", "<", ">", "[", "]", ".", ",", "N"];

// -------------------
// Render Functions
// -------------------

const get_op_sprite = () => {
  const id = program[offset + selected];
  if(id === 6) return "="; // I hate that i have to hardcode that
  return instruction_set[id];
}

const render_box = (box_sprite) => {
    clearTile(selected+1, 5);
    addSprite(selected+1, 5, box_sprite);
    if(program[offset + selected] !== -1) {
        // const op_sprite = parseInt(program[offset + selected]);
        addSprite(selected+1, 5, get_op_sprite());
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

const get_number_sprites = (num) => {  
    let digs = [];
    let num_str = num.toString();
    for(var i = 0; i < num_str.length; i++) {
        digs.push(num_str[i]);
    }
  
    if(digs.length == 0) return [zero, zero_2];
  
    let first = zero;
    let second = digs[0];

    if(digs.length >= 2) {
        // console.log(digs);
        first = get_char_from_ascii(aCharCode + parseInt(digs[0]));
        second = digs[1];
        // console.log(first);
    }

    return [first, second];
};

const render_num_box = (num, box_sprite, x, y) => {
    clearTile(x, y);
    addSprite(x, y, box_sprite);

    const nums = get_number_sprites(num);
    // console.log(nums);
    addSprite(x, y, nums[0]);
    addSprite(x, y, nums[1]);
};

const render_data_boxes = () => {
    for(var i = 0; i < data_cells_size; i++) {
        render_num_box(data_cells[i], box, 3 + i, 3);
    }
};

const render_output_boxes = () => {
   for(var i = 0; i < output_size; i++) {
        render_num_box(output_cells[i], box, 3 + i, 1);
    }
}

const render_interpret_boxes = () => {
    render_num_box(output_cells[output_pointer], interpret_box, 3 + output_pointer, 1);
    render_num_box(data_cells[data_pointer], interpret_box, 3 + data_pointer, 3);
}

let level_selected = 0;
let max_level = 5;

const render_level_boxes = () => {
    for(var i = 0; i < max_level+1; i++) {
        render_num_box(i, box, i, 2);
    }
}

const render_level_select = () => {
    render_level_boxes();
    render_num_box(level_selected, sel_box, level_selected, 2);
}

// -------------------
// Prompts
// -------------------
let prompted_game_state = -1;
let prompt_callback = () => {};
const prompt_multiline = (text, clr, to, callback = () => {}) => {
    prompt_callback = callback;
    switch_game_state(IN_PROMPT);
    prompted_game_state = -1;

    // Set one second timeout on prompt exit
    setTimeout(() => {
        prompted_game_state = to;  
    }, 1000);
    
    let lines = [];

    let temp = "";
    let curr = 0;
    for(var i = 0; i < text.length; i++) {
        temp += text[i];
      
        if(text[i] === '\n' || curr === 13 || i+1 === text.length) {
            lines.push(temp);
            temp = "";
            curr = 0;
        } else {
            curr++;
        }
    }
    
    for(var i = 0; i < lines.length; i++) {
        addText(lines[i], {x: 3, y: 3+i, color: clr });
    }

    addText("Press anything", {x: 3, y: 10, color: color`0`});
    addText("to continue",  {x: 3, y: 11, color: color`0`});
}

// -------------------
// Puzzles
// -------------------
let puzzles = []; // Contains {text, verify_function, code_size }
let curr_puzzle = -1;
let last_gen = -1;
let last_gen_2 = -1;

let input_op_disabled = false; 

const puzzle_no_input = () => {
    return -1;
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const puzzle_input_1_10 = () => {
    if(last_gen === -1) {
        last_gen = getRandomInt(10) + 1;
        console.log(`last_gen: ${last_gen}`);
        return last_gen;
    }
    
    console.log(`last_gen_2: ${last_gen_2}`);
    last_gen_2 = getRandomInt(10) + 1;
    return last_gen_2;
}

const puzzle_input_5 = () => {
    last_gen = 5;
    return last_gen;
}

// Puzzle #0 -> Output 3
const puzzle_0_verify = () => {
    return output_cells[0] === 3;
}

// Puzzle #1 -> Output double the input
const puzzle_1_verify = () => {
    return output_cells[0] === 2 * last_gen;
}

// Puzzle #2 -> Print out N,N-1,N-2,...,0
const puzzle_2_verify = () => {
    for(var i = 0; i < 5; i++) {
        if(output_cells[i] !== last_gen-i) return false;
    }

    return true;
}

// Puzzle #3 -> Print multiples of three
const puzzle_3_verify = () => {
    for(var i = 0; i < 5; i++) {
        // console.log(3 * (i +1));
        if(output_cells[i] !== 3 * (i+1)) return false;
    }

    return true;
}

// Puzzle #4 -> Add two inputs
const puzzle_4_verify = () => {
    console.log(`${output_cells[0]} == ${last_gen} + ${last_gen_2}`);
    return output_cells[0] == last_gen + last_gen_2;
}

// Puzzle #5 -> Endless

puzzles.push({ text: "Output 3", verify_function: puzzle_0_verify, code_size: 9, input_func: puzzle_no_input });
puzzles.push({ text: "Output double the input (,)", verify_function: puzzle_1_verify, code_size: 14, input_func: puzzle_input_1_10 });
puzzles.push({ text: "Output from input (,) to 0\n(f.e. 2, 1, 0)", verify_function: puzzle_2_verify, code_size: 8, input_func: puzzle_input_5 });
puzzles.push({ text: "Output 5 multiples of 3.\n3,6,9,12 and  15", verify_function: puzzle_3_verify, code_size: 16, input_func: puzzle_no_input });
puzzles.push({ text: "Output result of x+y\nboth inputs(,)", verify_function: puzzle_4_verify, code_size: 12, input_func: puzzle_input_1_10 });
puzzles.push({ text: "Endless Mode\nYou can just\nmess around\nhere", verify_function: () => {return false;}, code_size: 50, input_func: puzzle_input_1_10 });

const puzzle_success = () => {
    prompt_multiline("  Well done!\n", color`4`, LEVEL_SELECT);
}


// -------------------
// Game implementation
// -------------------

// Game states
const MAIN_MENU = 0;
const LEVEL_SELECT = 1;
const IN_INTERPRETER = 2;
const IN_PROMPT = 3;
const TUTORIAL = 4;

let input_disabled = false;

let game_state = MAIN_MENU;

let level = game_state
const levels = [
  map`
...
...
...`,
  map`
......
......
bbbbbb
......
......`,
  map`
p.........
...bbbbbb.
..........
...bbbbbb.
..........
.sbbbbbbbr
..........
..........`,
  map`
.`,
  map`
.......
.....+.
.......
.......
.......
.......`
]

let selected = 0;
const max_selected = 7;

let program = [];
let program_size = (max_selected * 2);

let offset = 0;
let max_offset = program_size - max_selected;

const reset_program = () => {
    program = [];
    max_offset = program_size - max_selected;

    // Fill program out with blanks
    for(var i = 0; i < program_size+1; i++) {
        program.push(-1);
    }
}

reset_program();

setMap(levels[level]);

onInput("d", () => {
    if(game_state == IN_INTERPRETER) {
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
    } else if(game_state === LEVEL_SELECT) {
        if(level_selected !== max_level) level_selected++;

        render_level_select();
    }
});

onInput("a", () => {
    if(game_state == IN_INTERPRETER) {
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
    } else if(game_state === LEVEL_SELECT) {
        if(level_selected !== 0) level_selected--;

        render_level_select();
    }
});

const add_op_tut = () => {
    clearTile(5, 1);
    clearText();
    addSprite(5, 1, add);

    addText("Add", {x: 2, y: 3, color: color`0`});
    addText("Adds 1 to the", {x: 2, y: 7, color: color`0`});
    addText("current data cell", {x: 2, y: 8, color: color`0`});

    addText("Press anything", {x: 2, y: 11, color: color`0`});
    addText("to continue",  {x: 2, y: 12, color: color`0`});
}

const minus_op_tut = () => {
    clearTile(5, 1);
    clearText();
    addSprite(5, 1, sub);

    addText("Sub", {x: 2, y: 3, color: color`0`});
    addText("Subtracts 1 from", {x: 2, y: 7, color: color`0`});
    addText("current data cell", {x: 2, y: 8, color: color`0`});

    addText("Press anything", {x: 2, y: 11, color: color`0`});
    addText("to continue",  {x: 2, y: 12, color: color`0`});
}

const shift_right_op_tut = () => {
    clearTile(5, 1);  
    clearText();
    addSprite(5, 1, shift_right);

    addText("Shift Right", {x: 2, y: 3, color: color`0`});
    addText("Shifts the", {x: 2, y: 7, color: color`0`});
    addText("pointer to data", {x: 2, y: 8, color: color`0`});
    addText("by 1", {x: 2, y: 9, color: color`0`});

    addText("Press anything", {x: 2, y: 11, color: color`0`});
    addText("to continue",  {x: 2, y: 12, color: color`0`});
}

const shift_left_op_tut = () => {
    clearTile(5, 1);  
    clearText();
    addSprite(5, 1, shift_left);

    addText("Shift Left", {x: 2, y: 3, color: color`0`});
    addText("Shifts the", {x: 2, y: 7, color: color`0`});
    addText("pointer to data", {x: 2, y: 8, color: color`0`});
    addText("by -1", {x: 2, y: 9, color: color`0`});

    addText("Press anything", {x: 2, y: 11, color: color`0`});
    addText("to continue",  {x: 2, y: 12, color: color`0`});
}

const loop_open_op_tut = () => {
    clearTile(5, 1);  
    clearText();
    addSprite(5, 1, open_loop);

    addText("Open Loop", {x: 2, y: 3, color: color`0`});
    addText("Opens a loop.", {x: 2, y: 7, color: color`0`});
    addText("Skips to finish", {x: 2, y: 8, color: color`0`});
    addText("if data cell == 0", {x: 2, y: 9, color: color`0`});

    addText("Press anything", {x: 2, y: 11, color: color`0`});
    addText("to continue",  {x: 2, y: 12, color: color`0`});
}

const loop_close_op_tut = () => {
    clearTile(5, 1);  
    clearText();
    addSprite(5, 1, open_loop);

    addText("Close Loop", {x: 2, y: 3, color: color`0`});
    addText("Closes a loop.", {x: 2, y: 7, color: color`0`});
    addText("Skips to start", {x: 2, y: 8, color: color`0`});
    addText("if data cell != 0", {x: 2, y: 9, color: color`0`});

    addText("Press anything", {x: 2, y: 11, color: color`0`});
    addText("to continue",  {x: 2, y: 12, color: color`0`});
}

const output_op_tut = () => {
    clearTile(5, 1);  
    clearText();
    addSprite(5, 1, output);

    addText("Output", {x: 2, y: 3, color: color`0`});
    addText("Outputs current", {x: 2, y: 7, color: color`0`});
    addText("data cell", {x: 2, y: 8, color: color`0`});

    addText("Press anything", {x: 2, y: 11, color: color`0`});
    addText("to continue",  {x: 2, y: 12, color: color`0`});
}

const input_op_tut = () => {
    clearTile(5, 1);  
    clearText();
    addSprite(5, 1, input);

    addText("Input", {x: 2, y: 3, color: color`0`});
    addText("Provides data", {x: 2, y: 7, color: color`0`});
    addText("to current cell", {x: 2, y: 8, color: color`0`});
    addText("(based on level)", {x: 2, y: 9, color: color`0`});

    addText("Press anything", {x: 2, y: 11, color: color`0`});
    addText("to continue",  {x: 2, y: 12, color: color`0`});
}

const end_op_tut = () => {
    clearTile(5, 1);  
    clearText();
    addSprite(5, 1, end);

    addText("End", {x: 2, y: 3, color: color`0`});
    addText("Shuts down the", {x: 2, y: 7, color: color`0`});
    addText("program.", {x: 2, y: 8, color: color`0`});

    addText("Press anything", {x: 2, y: 11, color: color`0`});
    addText("to continue",  {x: 2, y: 12, color: color`0`});
}

// let instruction_set = ["+", "-", "<", ">", "[", "]", ".", ",", "N"];

const tutorial_list = [add_op_tut, minus_op_tut, shift_right_op_tut, shift_left_op_tut, loop_open_op_tut, loop_close_op_tut, output_op_tut, input_op_tut, end_op_tut];
let curr_tutorial_idx = 0;
let tut_listen_to_input = false;

const run_tutorial = () => {
    switch_game_state(TUTORIAL);

    tutorial_list[curr_tutorial_idx]();

    setInterval(() => {
        tut_listen_to_input = true;
    }, 1000);
};

onInput("w", () => {
    if(game_state === MAIN_MENU && menu_tutorial_prompt) {
        menu_tutorial_prompt = false;
        run_tutorial();  
    } else if(game_state == IN_INTERPRETER) {
        if(input_disabled) return;
      
        if(program[offset + selected] === 8) program[offset + selected] = -1;
        else if(input_op_disabled && program[offset+selected] == 6) program[offset + selected] = 8;
        else program[offset + selected]++;
    
        render_box(sel_box);
    }
});

onInput("s", () => {
    if(game_state === MAIN_MENU && menu_tutorial_prompt) {
        menu_tutorial_prompt = false;
        switch_game_state(LEVEL_SELECT);
    } else if(game_state == IN_INTERPRETER) {
        if(input_disabled) return;
      
        if(program[offset + selected] === -1) program[offset + selected] = 8;
        else if(input_op_disabled && program[offset+selected] == 8) program[offset + selected] = 6;
        else program[offset + selected]--;
    
        render_box(sel_box);
    }
});

onInput("i", () => {
    if(game_state == IN_INTERPRETER) {
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
    }
});

onInput("j", () => {
    if(game_state == IN_INTERPRETER) {
        if(input_disabled) return;

        prompt_multiline("Task:\n" + puzzles[level_selected].text, color`0`, IN_INTERPRETER);
    }
});

onInput("l", () => {
    if(game_state === IN_INTERPRETER) {
        if(input_disabled) return;
        switch_game_state(LEVEL_SELECT);
    } else if(game_state === LEVEL_SELECT) {
        if(playback !== undefined) {
            playback.end();
            playback = undefined;
        } else {
            playback = playTune(main_theme, Infinity);
        }
    }
});

onInput("k", () => {
    if(game_state == IN_INTERPRETER) {
        if(!input_disabled || should_stop) return;

        should_stop = true;
    } else if(game_state === LEVEL_SELECT) {
        console.log(`Selected level: ${level_selected}!`);

        curr_puzzle = level_selected; 
        program_size = puzzles[level_selected].code_size-1;
        input_op_disabled = puzzles[level_selected].input_func() === -1;
        reset_program(); 
        prompt_multiline("Task:\n" + puzzles[level_selected].text, color`0`, IN_INTERPRETER);
    }
});

const switch_game_state = (to) => {
    clearText();
    setMap(levels[to]);
    if(to === IN_INTERPRETER) {
        reset_interpreter_data();
        addText("I -> run", {x:0, y: 14, color: color`4`});
        addText("K -> stop", {x:11, y: 14, color: color`3`});
    } else if(to === LEVEL_SELECT) {
        addText("Level Select", {x:4, y: 2, color: color`0`});
        addText(" K -> Play", {x:5, y: 12, color: color`4`});
        addText("L -> Toggle Music", {x:2, y: 13, color: color`5`});
        render_level_select();
    }

    game_state = to;
}

let menu_tutorial_prompt = false;

afterInput(() => {
    // console.log(game_state);
  
    if(game_state === MAIN_MENU) {
        if(menu_tutorial_prompt) return;
        clearText();

        addText("Play tutorial?", {x: 3, y:7, color: color`0`});
        addText("W -> Yes", {x: 3, y: 9, color: color`4`});
        addText("S -> No", {x: 3, y: 10, color: color`3`});

        menu_tutorial_prompt = true;
    } else if(game_state === IN_PROMPT) {
        if(prompted_game_state !== -1) {
            switch_game_state(prompted_game_state);
            prompt_callback();
        }
    } else if(game_state === TUTORIAL && tut_listen_to_input) {
        curr_tutorial_idx++;
        if(curr_tutorial_idx !== tutorial_list.length) {
            tutorial_list[curr_tutorial_idx]();
            setInterval(() => {
                tut_listen_to_input = true;
            }, 1000);
        } else {
            switch_game_state(LEVEL_SELECT);
        }
    }
});

addText("Brain Boom", {x: 5, y: 1, color: color`0`});
addText("Made by Kapi", {x: 4, y: 3, color: color`0`});

addText("Press anything", {x: 3, y: 7, color: color`4`});
addText("to start!", {x: 3, y: 8, color: color`4`});