/*
@title: sudoku
@author: wyatt
@tags: ['retro']
@addedOn: 2023-01-25

This is a sudoku implementation - difficulty is set as "very-hard" by default, but can be
changed by editting line 39.

- Cursor : Yellow border
- Invalid value : Red border (This means that you've gone wrong)

Controls:
- WASD to control the cursor
- J to decrement the active number
- L to increment the active number
- K to clear the square

* If there is no number in the box, press either J or K

Credits:
- Bitmap numbers are from "15_puzzle" by @maggie - I hope this is okay! (nice game btw :))
- SudokuJS - License is below
The MIT License (MIT)

Copyright (c) 2014 Rob McGuire-Dale

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* TO CHANGE GAME DIFFICULTY

Valid values are: easy, medium, hard, very-hard, insane or inhuman

*/

const DIFFICULTY = "very-hard"

// Constants

const blue = "b";
const white = "w"
const error = "r"
const cursor = "x"
const black = "n"

setLegend(
  [ blue, bitmap`
................
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
................`],
  [ white, bitmap`
................
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
................`],
  [ cursor, bitmap`
6666666666666666
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6666666666666666`],
  [ error, bitmap`
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
3333333333333333`],
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
0000000000000000`],
  [ "1", bitmap`
................
.22222222222222.
.22222000222222.
.22220000222222.
.22200000222222.
.22200200222222.
.22222200222222.
.22222200222222.
.22222200222222.
.22222200222222.
.22222200222222.
.22222200222222.
.22200000000222.
.22200000000222.
.22222222222222.
................` ],
  [ "2", bitmap`
................
.22222222222222.
.22220000022222.
.22200000002222.
.22000222000222.
.22002222000222.
.22222222000222.
.22222222000222.
.22222220002222.
.22222200022222.
.22222000222222.
.22220000222222.
.22200000000022.
.22200000000022.
.22222222222222.
................` ],
  [ "3", bitmap`
................
.22222222222222.
.22200000000222.
.22200000000222.
.22222222000222.
.22222220002222.
.22222000022222.
.22222000000222.
.22222222000222.
.22222222200222.
.22202222200222.
.22200222000222.
.22200000002222.
.22220000022222.
.22222222222222.
................` ],
  [ "4", bitmap`
................
.22222222222222.
.22200222002222.
.22200222002222.
.22200222002222.
.22200222002222.
.22200222002222.
.22200000002222.
.22200000002222.
.22222222002222.
.22222222002222.
.22222222002222.
.22222222002222.
.22222222002222.
.22222222222222.
................` ],
  [ "5", bitmap`
................
.22222222222222.
.22200000002222.
.22200000002222.
.22200222222222.
.22200222222222.
.22200000022222.
.22200000002222.
.22222222000222.
.22222222200222.
.22222222200222.
.22200222000222.
.22200000002222.
.22220000022222.
.22222222222222.
................` ],
  [ "6", bitmap`
................
.22222222222222.
.22222000002222.
.22220000002222.
.22200022222222.
.22200222222222.
.22000222222222.
.22000000002222.
.22000000000222.
.22000222200222.
.22000222200222.
.22000222200222.
.22200000000222.
.22220000002222.
.22222222222222.
................` ],
  [ "7", bitmap`
................
.22222222222222.
.22200000000222.
.22200000000222.
.22222222000222.
.22222222000222.
.22222222002222.
.22222220002222.
.22222220022222.
.22222200022222.
.22222200222222.
.22222000222222.
.22220002222222.
.22220002222222.
.22222222222222.
................` ],
  [ "8", bitmap`
................
.22222222222222.
.22220000002222.
.22200022000222.
.22200222200222.
.22200022000222.
.22220000002222.
.22200000000222.
.22200222200222.
.22002222220022.
.22002222220022.
.22000222200022.
.22200000000222.
.22220000002222.
.22222222222222.
................` ],
  [ "9", bitmap`
................
.22222222222222.
.22220000002222.
.22200000002222.
.22200222000222.
.22200222000222.
.22200222000222.
.22200000000222.
.22220000000222.
.22222222000222.
.22222222000222.
.22200220002222.
.22200000002222.
.22220000022222.
.22222222222222.
................` ],
  [ "!", bitmap`
................
.77777777777777.
.77777000777777.
.77770000777777.
.77700000777777.
.77700700777777.
.77777700777777.
.77777700777777.
.77777700777777.
.77777700777777.
.77777700777777.
.77777700777777.
.77700000000777.
.77700000000777.
.77777777777777.
................` ],
  [ "@", bitmap`
................
.77777777777777.
.77770000077777.
.77700000007777.
.77000777000777.
.77007777000777.
.77777777000777.
.77777777000777.
.77777770007777.
.77777700077777.
.77777000777777.
.77770000777777.
.77700000000077.
.77700000000077.
.77777777777777.
................` ],
  [ "#", bitmap`
................
.77777777777777.
.77700000000777.
.77700000000777.
.77777777000777.
.77777770007777.
.77777000077777.
.77777000000777.
.77777777000777.
.77777777700777.
.77707777700777.
.77700777000777.
.77700000007777.
.77770000077777.
.77777777777777.
................` ],
  [ "$", bitmap`
................
.77777777777777.
.77700777007777.
.77700777007777.
.77700777007777.
.77700777007777.
.77700777007777.
.77700000007777.
.77700000007777.
.77777777007777.
.77777777007777.
.77777777007777.
.77777777007777.
.77777777007777.
.77777777777777.
................` ],
  [ "%", bitmap`
................
.77777777777777.
.77700000007777.
.77700000007777.
.77700777777777.
.77700777777777.
.77700000077777.
.77700000007777.
.77777777000777.
.77777777700777.
.77777777700777.
.77700777000777.
.77700000007777.
.77770000077777.
.77777777777777.
................` ],
  [ "^", bitmap`
................
.77777777777777.
.77777000007777.
.77770000007777.
.77700077777777.
.77700777777777.
.77000777777777.
.77000000007777.
.77000000000777.
.77000777700777.
.77000777700777.
.77000777700777.
.77700000000777.
.77770000007777.
.77777777777777.
................` ],
  [ "&", bitmap`
................
.77777777777777.
.77700000000777.
.77700000000777.
.77777777000777.
.77777777000777.
.77777777007777.
.77777770007777.
.77777770077777.
.77777700077777.
.77777700777777.
.77777000777777.
.77770007777777.
.77770007777777.
.77777777777777.
................` ],
  [ "*", bitmap`
................
.77777777777777.
.77770000007777.
.77700077000777.
.77700777700777.
.77700077000777.
.77770000007777.
.77700000000777.
.77700777700777.
.77007777770077.
.77007777770077.
.77000777700077.
.77700000000777.
.77770000007777.
.77777777777777.
................` ],
  [ "(", bitmap`
................
.77777777777777.
.77770000007777.
.77700000007777.
.77700777000777.
.77700777000777.
.77700777000777.
.77700000000777.
.77770000000777.
.77777777000777.
.77777777000777.
.77700770007777.
.77700000007777.
.77770000077777.
.77777777777777.
................` ],
  
);

const whiteLetters = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
}

const blueLetters = {
    "!": 1,
    "@": 2,
    "#": 3,
    "$": 4,
    "%": 5,
    "^": 6,
    "&": 7,
    "*": 8,
    "(": 9
}

const background = map`
bbbwwwbbb
bbbwwwbbb
bbbwwwbbb
wwwbbbwww
wwwbbbwww
wwwbbbwww
bbbwwwbbb
bbbwwwbbb
bbbwwwbbb`


// Instantiation

const sudokuJS = () => {
    var sudoku = {};  // Global reference to the sudoku library

    sudoku.DIGITS = "123456789";    // Allowed sudoku.DIGITS
    var ROWS = "ABCDEFGHI";         // Row lables
    var COLS = sudoku.DIGITS;       // Column lables
    var SQUARES = null;             // Square IDs

    var UNITS = null;               // All units (row, column, or box)
    var SQUARE_UNITS_MAP = null;    // Squares -> units map
    var SQUARE_PEERS_MAP = null;    // Squares -> peers map
    
    var MIN_GIVENS = 17;            // Minimum number of givens 
    var NR_SQUARES = 81;            // Number of squares
    
    // Define difficulties by how many squares are given to the player in a new
    // puzzle.
    var DIFFICULTY = {
        "easy":         62,
        "medium":       53,
        "hard":         44,
        "very-hard":    35,
        "insane":       26,
        "inhuman":      17,
    };

    // Blank character and board representation
    sudoku.BLANK_CHAR = '.';
    sudoku.BLANK_BOARD = "...................................................."+
            ".............................";

    // Init
    // -------------------------------------------------------------------------
    function initialize(){
        /* Initialize the Sudoku library (invoked after library load)
        */
        SQUARES             = sudoku._cross(ROWS, COLS);
        UNITS               = sudoku._get_all_units(ROWS, COLS);
        SQUARE_UNITS_MAP    = sudoku._get_square_units_map(SQUARES, UNITS);
        SQUARE_PEERS_MAP    = sudoku._get_square_peers_map(SQUARES, 
                                    SQUARE_UNITS_MAP);
    }

    // Generate
    // -------------------------------------------------------------------------
    sudoku.generate = function(difficulty, unique){
        /* Generate a new Sudoku puzzle of a particular `difficulty`, e.g.,
        
            // Generate an "easy" sudoku puzzle
            sudoku.generate("easy");
            
        
        Difficulties are as follows, and represent the number of given squares:
        
                "easy":         61
                "medium":       52
                "hard":         43
                "very-hard":    34
                "insane":       25
                "inhuman":      17
            
            
        You may also enter a custom number of squares to be given, e.g.,
        
            // Generate a new Sudoku puzzle with 60 given squares
            sudoku.generate(60)
    
    
        `difficulty` must be a number between 17 and 81 inclusive. If it's
        outside of that range, `difficulty` will be set to the closest bound,
        e.g., 0 -> 17, and 100 -> 81.
        
        
        By default, the puzzles are unique, uless you set `unique` to false. 
        (Note: Puzzle uniqueness is not yet implemented, so puzzles are *not* 
        guaranteed to have unique solutions)
        
        TODO: Implement puzzle uniqueness
        */
        
        // If `difficulty` is a string or undefined, convert it to a number or
        // default it to "easy" if undefined.
        if(typeof difficulty === "string" || typeof difficulty === "undefined"){
            difficulty = DIFFICULTY[difficulty] || DIFFICULTY.easy;
        }
        
        // Force difficulty between 17 and 81 inclusive
        difficulty = sudoku._force_range(difficulty, NR_SQUARES + 1, 
                MIN_GIVENS);
        
        // Default unique to true
        unique = unique || true;
        
        // Get a set of squares and all possible candidates for each square
        var blank_board = "";
        for(var i = 0; i < NR_SQUARES; ++i){
            blank_board += '.';
        }
        var candidates = sudoku._get_candidates_map(blank_board);
        
        // For each item in a shuffled list of squares
        var shuffled_squares = sudoku._shuffle(SQUARES);
        for(var si in shuffled_squares){
            var square = shuffled_squares[si];
            
            // If an assignment of a random chioce causes a contradictoin, give
            // up and try again
            var rand_candidate_idx = 
                    sudoku._rand_range(candidates[square].length);
            var rand_candidate = candidates[square][rand_candidate_idx];
            if(!sudoku._assign(candidates, square, rand_candidate)){
                break;
            }
            
            // Make a list of all single candidates
            var single_candidates = [];
            for(var si in SQUARES){
                var square = SQUARES[si];
                
                if(candidates[square].length == 1){
                    single_candidates.push(candidates[square]);
                }
            }
            
            // If we have at least difficulty, and the unique candidate count is
            // at least 8, return the puzzle!
            if(single_candidates.length >= difficulty && 
                    sudoku._strip_dups(single_candidates).length >= 8){
                var board = "";
                var givens_idxs = [];
                for(var i in SQUARES){
                    var square = SQUARES[i];
                    if(candidates[square].length == 1){
                        board += candidates[square];
                        givens_idxs.push(i);
                    } else {
                        board += sudoku.BLANK_CHAR;
                    }
                }
                
                // If we have more than `difficulty` givens, remove some random
                // givens until we're down to exactly `difficulty`
                var nr_givens = givens_idxs.length;
                if(nr_givens > difficulty){
                    givens_idxs = sudoku._shuffle(givens_idxs);
                    for(var i = 0; i < nr_givens - difficulty; ++i){
                        var target = parseInt(givens_idxs[i]);
                        board = board.substr(0, target) + sudoku.BLANK_CHAR + 
                            board.substr(target + 1);
                    }
                }
                
                // Double check board is solvable
                // TODO: Make a standalone board checker. Solve is expensive.
                if(sudoku.solve(board)){
                    return board;
                }
            }
        }
        
        // Give up and try a new puzzle
        return sudoku.generate(difficulty);
    };

    // Solve
    // -------------------------------------------------------------------------
    sudoku.solve = function(board, reverse){
        /* Solve a sudoku puzzle given a sudoku `board`, i.e., an 81-character 
        string of sudoku.DIGITS, 1-9, and spaces identified by '.', representing the
        squares. There must be a minimum of 17 givens. If the given board has no
        solutions, return false.
        
        Optionally set `reverse` to solve "backwards", i.e., rotate through the
        possibilities in reverse. Useful for checking if there is more than one
        solution.
        */
        
        // Assure a valid board
        var report = sudoku.validate_board(board);
        if(report !== true){
            throw report;
        }
        
        // Check number of givens is at least MIN_GIVENS
        var nr_givens = 0;
        for(var i in board){
            if(board[i] !== sudoku.BLANK_CHAR && sudoku._in(board[i], sudoku.DIGITS)){
                ++nr_givens;
            }
        }
        if(nr_givens < MIN_GIVENS){
            throw "Too few givens. Minimum givens is " + MIN_GIVENS;
        }

        // Default reverse to false
        reverse = reverse || false;

        var candidates = sudoku._get_candidates_map(board);
        var result = sudoku._search(candidates, reverse);
        
        if(result){
            var solution = "";
            for(var square in result){
                solution += result[square];
            }
            return solution;
        }
        return false;
    };

    sudoku.get_candidates = function(board){
        /* Return all possible candidatees for each square as a grid of 
        candidates, returnning `false` if a contradiction is encountered.
        
        Really just a wrapper for sudoku._get_candidates_map for programmer
        consumption.
        */
        
        // Assure a valid board
        var report = sudoku.validate_board(board);
        if(report !== true){
            throw report;
        }
        
        // Get a candidates map
        var candidates_map = sudoku._get_candidates_map(board);
        
        // If there's an error, return false
        if(!candidates_map){
            return false;
        }
        
        // Transform candidates map into grid
        var rows = [];
        var cur_row = [];
        var i = 0;
        for(var square in candidates_map){
            var candidates = candidates_map[square];
            cur_row.push(candidates);
            if(i % 9 == 8){
                rows.push(cur_row);
                cur_row = [];
            }
            ++i;
        }
        return rows;
    }

    sudoku._get_candidates_map = function(board){
        /* Get all possible candidates for each square as a map in the form
        {square: sudoku.DIGITS} using recursive constraint propagation. Return `false` 
        if a contradiction is encountered
        */
        
        // Assure a valid board
        var report = sudoku.validate_board(board);
        if(report !== true){
            throw report;
        }
        
        var candidate_map = {};
        var squares_values_map = sudoku._get_square_vals_map(board);
        
        // Start by assigning every digit as a candidate to every square
        for(var si in SQUARES){
            candidate_map[SQUARES[si]] = sudoku.DIGITS;
        }
        
        // For each non-blank square, assign its value in the candidate map and
        // propigate.
        for(var square in squares_values_map){
            var val = squares_values_map[square];
            
            if(sudoku._in(val, sudoku.DIGITS)){
                var new_candidates = sudoku._assign(candidate_map, square, val);
                
                // Fail if we can't assign val to square
                if(!new_candidates){
                    return false;
                }
            }
        }
        
        return candidate_map;
    };

    sudoku._search = function(candidates, reverse){
        /* Given a map of squares -> candiates, using depth-first search, 
        recursively try all possible values until a solution is found, or false
        if no solution exists. 
        */
        
        // Return if error in previous iteration
        if(!candidates){
            return false;
        }
        
        // Default reverse to false
        reverse = reverse || false;
        
        // If only one candidate for every square, we've a solved puzzle!
        // Return the candidates map.
        var max_nr_candidates = 0;
        var max_candidates_square = null;
        for(var si in SQUARES){
            var square = SQUARES[si];
            
            var nr_candidates = candidates[square].length;
                
            if(nr_candidates > max_nr_candidates){
                max_nr_candidates = nr_candidates;
                max_candidates_square = square;
            }
        }
        if(max_nr_candidates === 1){
            return candidates;
        }
        
        // Choose the blank square with the fewest possibilities > 1
        var min_nr_candidates = 10;
        var min_candidates_square = null;
        for(si in SQUARES){
            var square = SQUARES[si];
            
            var nr_candidates = candidates[square].length;
            
            if(nr_candidates < min_nr_candidates && nr_candidates > 1){
                min_nr_candidates = nr_candidates;
                min_candidates_square = square;
            }
        }
        
        // Recursively search through each of the candidates of the square 
        // starting with the one with fewest candidates.
        
        // Rotate through the candidates forwards
        var min_candidates = candidates[min_candidates_square];
        if(!reverse){
            for(var vi in min_candidates){
                var val = min_candidates[vi];
                
                // TODO: Implement a non-rediculous deep copy function
                var candidates_copy = JSON.parse(JSON.stringify(candidates));
                var candidates_next = sudoku._search(
                    sudoku._assign(candidates_copy, min_candidates_square, val)
                );
                
                if(candidates_next){
                    return candidates_next;
                }
            }
            
        // Rotate through the candidates backwards
        } else {
            for(var vi = min_candidates.length - 1; vi >= 0; --vi){
                var val = min_candidates[vi];
                
                // TODO: Implement a non-rediculous deep copy function
                var candidates_copy = JSON.parse(JSON.stringify(candidates));
                var candidates_next = sudoku._search(
                    sudoku._assign(candidates_copy, min_candidates_square, val), 
                    reverse
                );
                
                if(candidates_next){
                    return candidates_next;
                }
            }
        }
        
        // If we get through all combinations of the square with the fewest
        // candidates without finding an answer, there isn't one. Return false.
        return false;
    };

    sudoku._assign = function(candidates, square, val){
        /* Eliminate all values, *except* for `val`, from `candidates` at 
        `square` (candidates[square]), and propagate. Return the candidates map
        when finished. If a contradiciton is found, return false.
        
        WARNING: This will modify the contents of `candidates` directly.
        */

        // Grab a list of canidates without 'val'
        var other_vals = candidates[square].replace(val, "");

        // Loop through all other values and eliminate them from the candidates 
        // at the current square, and propigate. If at any point we get a 
        // contradiction, return false.
        for(var ovi in other_vals){
            var other_val = other_vals[ovi];

            var candidates_next =
                sudoku._eliminate(candidates, square, other_val);

            if(!candidates_next){
                //console.log("Contradiction found by _eliminate.");
                return false;
            }
        }

        return candidates;
    };

    sudoku._eliminate = function(candidates, square, val){
        /* Eliminate `val` from `candidates` at `square`, (candidates[square]),
        and propagate when values or places <= 2. Return updated candidates,
        unless a contradiction is detected, in which case, return false.
        
        WARNING: This will modify the contents of `candidates` directly.
        */

        // If `val` has already been eliminated from candidates[square], return
        // with candidates.
        if(!sudoku._in(val, candidates[square])){
            return candidates;
        }

        // Remove `val` from candidates[square]
        candidates[square] = candidates[square].replace(val, '');
           
        // If the square has only candidate left, eliminate that value from its 
        // peers
        var nr_candidates = candidates[square].length;
        if(nr_candidates === 1){
            var target_val = candidates[square];
            
            for(var pi in SQUARE_PEERS_MAP[square]){
                var peer = SQUARE_PEERS_MAP[square][pi];
                
                var candidates_new = 
                        sudoku._eliminate(candidates, peer, target_val);
                        
                if(!candidates_new){
                    return false;
                }
            }
        
        // Otherwise, if the square has no candidates, we have a contradiction.
        // Return false.
        } if(nr_candidates === 0){
            return false;
        }
        
        // If a unit is reduced to only one place for a value, then assign it
        for(var ui in SQUARE_UNITS_MAP[square]){
            var unit = SQUARE_UNITS_MAP[square][ui];
            
            var val_places = [];
            for(var si in unit){
                var unit_square = unit[si];
                if(sudoku._in(val, candidates[unit_square])){
                    val_places.push(unit_square);
                }
            }
            
            // If there's no place for this value, we have a contradition!
            // return false
            if(val_places.length === 0){
                return false;
                
            // Otherwise the value can only be in one place. Assign it there.
            } else if(val_places.length === 1){
                var candidates_new = 
                    sudoku._assign(candidates, val_places[0], val);
                
                if(!candidates_new){
                    return false;
                }
            }
        }
        
        return candidates;
    };

    
    // Square relationships
    // -------------------------------------------------------------------------
    // Squares, and their relationships with values, units, and peers.
    
    sudoku._get_square_vals_map = function(board){
        /* Return a map of squares -> values
        */
        var squares_vals_map = {};
        
        // Make sure `board` is a string of length 81
        if(board.length != SQUARES.length){
            throw "Board/squares length mismatch.";
            
        } else {
            for(var i in SQUARES){
                squares_vals_map[SQUARES[i]] = board[i];
            }
        }
        
        return squares_vals_map;
    };

    sudoku._get_square_units_map = function(squares, units){
        /* Return a map of `squares` and their associated units (row, col, box)
        */
        var square_unit_map = {};

        // For every square...
        for(var si in squares){
            var cur_square = squares[si];

            // Maintain a list of the current square's units
            var cur_square_units = [];

            // Look through the units, and see if the current square is in it,
            // and if so, add it to the list of of the square's units.
            for(var ui in units){
                var cur_unit = units[ui];

                if(cur_unit.indexOf(cur_square) !== -1){
                    cur_square_units.push(cur_unit);
                }
            }

            // Save the current square and its units to the map
            square_unit_map[cur_square] = cur_square_units;
        }

        return square_unit_map;
    };

    sudoku._get_square_peers_map = function(squares, units_map){
        /* Return a map of `squares` and their associated peers, i.e., a set of
        other squares in the square's unit.
        */
        var square_peers_map = {};

        // For every square...
        for(var si in squares){
            var cur_square = squares[si];
            var cur_square_units = units_map[cur_square];

            // Maintain list of the current square's peers
            var cur_square_peers = [];

            // Look through the current square's units map...
            for(var sui in cur_square_units){
                var cur_unit = cur_square_units[sui];

                for(var ui in cur_unit){
                    var cur_unit_square = cur_unit[ui];

                    if(cur_square_peers.indexOf(cur_unit_square) === -1 && 
                            cur_unit_square !== cur_square){
                        cur_square_peers.push(cur_unit_square);
                    }
                }
            }
            
            // Save the current square an its associated peers to the map
            square_peers_map[cur_square] = cur_square_peers;
        }

        return square_peers_map;
    };
    
    sudoku._get_all_units = function(rows, cols){
        /* Return a list of all units (rows, cols, boxes)
        */
        var units = [];

        // Rows
        for(var ri in rows){
            units.push(sudoku._cross(rows[ri], cols));
        }

        // Columns
        for(var ci in cols){
           units.push(sudoku._cross(rows, cols[ci]));
        }

        // Boxes
        var row_squares = ["ABC", "DEF", "GHI"];
        var col_squares = ["123", "456", "789"];
        for(var rsi in row_squares){
            for(var csi in col_squares){
                units.push(sudoku._cross(row_squares[rsi], col_squares[csi]));
            }
        }

        return units;
    };
    

    // Conversions
    // -------------------------------------------------------------------------
    sudoku.board_string_to_grid = function(board_string){
        /* Convert a board string to a two-dimensional array
        */
        var rows = [];
        var cur_row = [];
        for(var i in board_string){
            cur_row.push(board_string[i]);
            if(i % 9 == 8){
                rows.push(cur_row);
                cur_row = [];
            }
        }
        return rows;
    };
    
    sudoku.board_grid_to_string = function(board_grid){
        /* Convert a board grid to a string
        */
        var board_string = "";
        for(var r = 0; r < 9; ++r){
            for(var c = 0; c < 9; ++c){
                board_string += board_grid[r][c];
            }   
        }
        return board_string;
    };
    

    // Utility
    // -------------------------------------------------------------------------

    sudoku.print_board = function(board){
        /* Print a sudoku `board` to the console.
        */
        
        // Assure a valid board
        var report = sudoku.validate_board(board);
        if(report !== true){
            throw report;
        }
        
        var V_PADDING = " ";  // Insert after each square
        var H_PADDING = '\n'; // Insert after each row
        
        var V_BOX_PADDING = "  "; // Box vertical padding
        var H_BOX_PADDING = '\n'; // Box horizontal padding

        var display_string = "";
        
        for(var i in board){
            var square = board[i];
            
            // Add the square and some padding
            display_string += square + V_PADDING;
            
            // Vertical edge of a box, insert v. box padding
            if(i % 3 === 2){
                display_string += V_BOX_PADDING;
            }
            
            // End of a line, insert horiz. padding
            if(i % 9 === 8){
                display_string += H_PADDING;
            }
            
            // Horizontal edge of a box, insert h. box padding
            if(i % 27 === 26){
                display_string += H_BOX_PADDING;
            }
        }

        // console.log(display_string);
    };

    sudoku.validate_board = function(board){
        /* Return if the given `board` is valid or not. If it's valid, return
        true. If it's not, return a string of the reason why it's not.
        */
        
        // Check for empty board
        if(!board){
            return "Empty board";
        }
        
        // Invalid board length
        if(board.length !== NR_SQUARES){
            return "Invalid board size. Board must be exactly " + NR_SQUARES +
                    " squares.";
        }
        
        // Check for invalid characters
        for(var i in board){
            if(!sudoku._in(board[i], sudoku.DIGITS) && board[i] !== sudoku.BLANK_CHAR){
                return "Invalid board character encountered at index " + i + 
                        ": " + board[i];
            }
        }
        
        // Otherwise, we're good. Return true.
        return true;
    };

    sudoku._cross = function(a, b){
        /* Cross product of all elements in `a` and `b`, e.g.,
        sudoku._cross("abc", "123") ->
        ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"]
        */
        var result = [];
        for(var ai in a){
            for(var bi in b){
                result.push(a[ai] + b[bi]);
            }
        }
        return result;
    };
    
    sudoku._in = function(v, seq){
        /* Return if a value `v` is in sequence `seq`.
        */
        return seq.indexOf(v) !== -1;
    };
    
    sudoku._first_true = function(seq){
        /* Return the first element in `seq` that is true. If no element is
        true, return false.
        */
        for(var i in seq){
            if(seq[i]){
                return seq[i];
            }
        }
        return false;
    };

    sudoku._shuffle = function(seq){
        /* Return a shuffled version of `seq`
        */
        
        // Create an array of the same size as `seq` filled with false
        var shuffled = [];
        for(var i = 0; i < seq.length; ++i){
            shuffled.push(false);
        }
        
        for(var i in seq){
            var ti = sudoku._rand_range(seq.length);
            
            while(shuffled[ti]){
                ti = (ti + 1) > (seq.length - 1) ? 0 : (ti + 1);
            }
            
            shuffled[ti] = seq[i];
        }
        
        return shuffled;
    };

    sudoku._rand_range = function(max, min){
        /* Get a random integer in the range of `min` to `max` (non inclusive).
        If `min` not defined, default to 0. If `max` not defined, throw an 
        error.
        */
        min = min || 0;
        if(max){
            return Math.floor(Math.random() * (max - min)) + min;
        } else {
            throw "Range undefined";
        }
    };

    sudoku._strip_dups = function(seq){
        /* Strip duplicate values from `seq`
        */
        var seq_set = [];
        var dup_map = {};
        for(var i in seq){
            var e = seq[i];
            if(!dup_map[e]){
                seq_set.push(e);
                dup_map[e] = true;
            }
        }
        return seq_set;
    };
    
    sudoku._force_range = function(nr, max, min){
        /* Force `nr` to be within the range from `min` to, but not including, 
        `max`. `min` is optional, and will default to 0. If `nr` is undefined,
        treat it as zero.
        */
        min = min || 0
        nr = nr || 0
        if(nr < min){
            return min;
        }
        if(nr > max){
            return max;
        }
        return nr
    }

    // Initialize library after load
    initialize();
    return sudoku
}

const sudoku = sudokuJS()

setBackground(black)
setMap(background)

let numbers = new Array(9).fill(0).map(v => new Array(9).fill(null))

const getSquare = (x, y) => {
  const tile = getTile(x, y).filter(v => ![error, cursor].includes(v.type))[0]
  const tileIsUnmodified = !tile

  const quadY = 3 * Math.floor(y / 3)
  const quadX = 3 * Math.floor(x / 3)
  const quadrant = numbers.slice(3 * Math.floor(y / 3), quadY + 3).map(row => row.slice(quadX, quadX + 3)).flat()
  const row = numbers[y] 
  const col = numbers.map(row => row[x]).flat()

  if (tileIsUnmodified) {
    return {
      quadrant,
      row,
      col,
      number: null,
      isWhite: null
    }
  }
  
  const isWhite = tile.type === white || Object.keys(whiteLetters).includes(tile.type)
  
  const isNumber = isWhite ? Object.keys(whiteLetters).includes(tile.type) : Object.keys(blueLetters).includes(tile.type)
  const number = isNumber ? (isWhite ? whiteLetters[tile.type] : blueLetters[tile.type]) : null

  return {
    isWhite,
    number,
    quadrant,
    row,
    col
  }
}

const startGame = () => {
  const board = sudoku.generate(DIFFICULTY)
  
  for (let i = 0; i < board.length; i += 9) {
      const rowRaw = board.slice(i, i + 9);
      const row = rowRaw.split("").map(v => v === "." ? null : parseInt(v))
    
      numbers[Math.floor(i/9)] = row
    
      row.forEach((item, j) => {
        const {x,y} = {x: j, y: Math.floor(i/9)}
        const {isWhite, number, quadrant, row, col} = getSquare(x, Math.floor(i/9))
        if (!item) return;
        const newSprite = Object.entries(isWhite ? whiteLetters : blueLetters).find(([key, val]) => val === item)[0]
        clearTile(x, y)
        addSprite(x, y, newSprite)
      })
  }

  addSprite(4,4, cursor)
}

startGame()

const getCursor = () => {
  const c = getFirst(cursor)
  const tile = getSquare(c.x, c.y)
  return Object.assign({}, {cursor: c}, tile);
}


const moveCursor = (x, y) => {
  const c = getCursor().cursor
  const desiredPos = [c.x + x, c.y + y]
  if (desiredPos[0] < 0 || desiredPos[0] > 8 || desiredPos[1] < 0 || desiredPos[1] > 8) {
    return
  }
  c.x = desiredPos[0]
  c.y = desiredPos[1]
}

onInput("w", () => {
  moveCursor(0,-1)
})

onInput("a", () => {
  moveCursor(-1,0)
})

onInput("s", () => {
  moveCursor(0,1)
})

onInput("d", () => {
  moveCursor(1,0)
})


onInput("l", () => {
  const {cursor: c, isWhite, number, quadrant, row, col} = getCursor()
  const newNum = number + 1 < 10 ? number + 1 : 9
  if (number === newNum) return;
  const newSprite = Object.entries(isWhite ? whiteLetters : blueLetters).find(([key, val]) => val === newNum)[0]
  const isWrong = quadrant.includes(newNum) || row.includes(newNum) || col.includes(newNum)
  clearTile(c.x, c.y)
  addSprite(c.x,c.y, newSprite)
  if (isWrong) addSprite(c.x, c.y, error)
  addSprite(c.x,c.y, cursor)
  numbers[c.y][c.x] = newNum
})

onInput("j", () => {
  const {cursor: c, isWhite, number, quadrant, row, col} = getCursor()
  const newNum = number - 1 > 0 ? number - 1 : 1
  if (number === newNum) return;
  const newSprite = Object.entries(isWhite ? whiteLetters : blueLetters).find(([key, val]) => val === newNum)[0]
  const isWrong = quadrant.includes(newNum) || row.includes(newNum) || col.includes(newNum)
  
  clearTile(c.x, c.y)
  addSprite(c.x,c.y, newSprite)
  if (isWrong) addSprite(c.x, c.y, error)
  addSprite(c.x,c.y, cursor)
  numbers[c.y][c.x] = newNum
})

onInput("k", () => {
  const {cursor: c, isWhite} = getCursor()
  clearTile(c.x, c.y)
  addSprite(c.x, c.y, isWhite ? white : blue)
  addSprite(c.x, c.y, cursor)
  numbers[c.y][c.x] = null
})

afterInput(() => {
  numbers.forEach((r, y) => {
    r.forEach((_v, x) => {
      // console.log(x,y, numbers)
      const {quadrant, row, col, number} = getSquare(x,y)
      const isWrong = number && (quadrant.filter(n => n === number).length + row.filter(n => n === number).length  + col.filter(n => n === number).length > 3)
      const tile = getTile(x, y)
      
      const errorOnTile = tile.find(t => t.type === error)
      if (isWrong && !errorOnTile) { 
        addSprite(x, y, error)
      } else if (errorOnTile && !isWrong) {
        errorOnTile.remove()
      }
    })
  })
  
  // Checking win state
  const rowsAreValid = numbers.every(row => (new Set(row.filter(v => v))).size === row.length)
  const colsAreValid = (new Array(9).fill(0).map((_,i) => numbers.map(row => row[i]).flat())).every(col => (new Set(col.filter(v => v)).size === col.length))
  if (!rowsAreValid || !colsAreValid) return
  for (let x = 1; x < 4; x++) {
    for (let y = 1; y < 4; y++) {
      const quad = numbers.slice(3 * (y - 1), 3 * y).map(row => row.slice(3 * (x - 1), 3 * x))
      if ((new Set(quad)).size !== quad.length) return
    }
  }

  addText("You win!", {x: 6, y: 7, color: color`3`})
  setTimeout(() => {
    numbers = new Array(9).fill(0).map(v => new Array(9).fill(null))
    clearText()
    setMap(background)
    startGame()
  }, 6000)
});
