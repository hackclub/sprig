/*
@title: Chess
@tags: ['multiplayer', 'classic']
@img: ""
@addedOn: 2022-10-31
@author: Thomas Stubblefield

Controls: Use WASD to move your cursor, J to pick up a piece, and K to place it. 
Additionally, you can use L to drop a piece (or deselect)
If you hear a funny sound when you try to place, you're doing a move that isn't legal (to the rules of chess)

How to play? watch this: https://cloud-o2x9qzux6-hack-club-bot.vercel.app/0screen_recording_2022-10-31_at_8.55.44_pm.mp4
*/

const { Chess } = (() => {
/*
 * Copyright (c) 2022, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/

const SYMBOLS = 'pnbrqkPNBRQK'

const DEFAULT_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

const TERMINATION_MARKERS = ['1-0', '0-1', '1/2-1/2', '*']

const PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15],
}

const PIECE_OFFSETS = {
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1],
}

// prettier-ignore
const ATTACKS = [
  20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
   0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
   0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
   0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
   0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
  24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
   0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
   0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
   0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
   0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
  20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
];

// prettier-ignore
const RAYS = [
   17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
    0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
    0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
    0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
    0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
    1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
    0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
    0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
    0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
    0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
  -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
];

const SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 }

const BITS = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64,
}

const RANK_1 = 7
const RANK_2 = 6
const RANK_3 = 5
const RANK_4 = 4
const RANK_5 = 3
const RANK_6 = 2
const RANK_7 = 1
const RANK_8 = 0

// prettier-ignore
const SQUARE_MAP = {
  a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
  a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
  a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
  a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
  a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
  a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
  a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
  a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
};

const ROOKS = {
  w: [
    { square: SQUARE_MAP.a1, flag: BITS.QSIDE_CASTLE },
    { square: SQUARE_MAP.h1, flag: BITS.KSIDE_CASTLE },
  ],
  b: [
    { square: SQUARE_MAP.a8, flag: BITS.QSIDE_CASTLE },
    { square: SQUARE_MAP.h8, flag: BITS.KSIDE_CASTLE },
  ],
}

const PARSER_STRICT = 0
const PARSER_SLOPPY = 1

/* this function is used to uniquely identify ambiguous moves */
function get_disambiguator(move, moves) {
  var from = move.from
  var to = move.to
  var piece = move.piece

  var ambiguities = 0
  var same_rank = 0
  var same_file = 0

  for (var i = 0, len = moves.length; i < len; i++) {
    var ambig_from = moves[i].from
    var ambig_to = moves[i].to
    var ambig_piece = moves[i].piece

    /* if a move of the same piece type ends on the same to square, we'll
     * need to add a disambiguator to the algebraic notation
     */
    if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
      ambiguities++

      if (rank(from) === rank(ambig_from)) {
        same_rank++
      }

      if (file(from) === file(ambig_from)) {
        same_file++
      }
    }
  }

  if (ambiguities > 0) {
    /* if there exists a similar moving piece on the same rank and file as
     * the move in question, use the square as the disambiguator
     */
    if (same_rank > 0 && same_file > 0) {
      return algebraic(from)
    } else if (same_file > 0) {
      /* if the moving piece rests on the same file, use the rank symbol as the
       * disambiguator
       */
      return algebraic(from).charAt(1)
    } else {
      /* else use the file symbol */
      return algebraic(from).charAt(0)
    }
  }

  return ''
}

function infer_piece_type(san) {
  var piece_type = san.charAt(0)
  if (piece_type >= 'a' && piece_type <= 'h') {
    var matches = san.match(/[a-h]\d.*[a-h]\d/)
    if (matches) {
      return undefined
    }
    return PAWN
  }
  piece_type = piece_type.toLowerCase()
  if (piece_type === 'o') {
    return KING
  }
  return piece_type
}

// parses all of the decorators out of a SAN string
function stripped_san(move) {
  return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '')
}

/*****************************************************************************
 * UTILITY FUNCTIONS
 ****************************************************************************/
function rank(i) {
  return i >> 4
}

function file(i) {
  return i & 15
}

function algebraic(i) {
  var f = file(i),
    r = rank(i)
  return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1)
}

function swap_color(c) {
  return c === WHITE ? BLACK : WHITE
}

function is_digit(c) {
  return '0123456789'.indexOf(c) !== -1
}

function clone(obj) {
  var dupe = obj instanceof Array ? [] : {}

  for (var property in obj) {
    if (typeof property === 'object') {
      dupe[property] = clone(obj[property])
    } else {
      dupe[property] = obj[property]
    }
  }

  return dupe
}

function trim(str) {
  return str.replace(/^\s+|\s+$/g, '')
}

const exports = {};

const BLACK = exports.BLACK = 'b'
const WHITE = exports.WHITE = 'w'

const EMPTY = exports.EMPTY = -1

const PAWN = exports.PAWN = 'p'
const KNIGHT = exports.KNIGHT = 'n'
const BISHOP = exports.BISHOP = 'b'
const ROOK = exports.ROOK = 'r'
const QUEEN = exports.QUEEN = 'q'
const KING = exports.KING = 'k'

const SQUARES = exports.SQUARES = (function () {
  /* from the ECMA-262 spec (section 12.6.4):
   * "The mechanics of enumerating the properties ... is
   * implementation dependent"
   * so: for (var sq in SQUARES) { keys.push(sq); } might not be
   * ordered correctly
   */
  var keys = []
  for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
    if (i & 0x88) {
      i += 7
      continue
    }
    keys.push(algebraic(i))
  }
  return keys
})()

const FLAGS = exports.FLAGS = {
  NORMAL: 'n',
  CAPTURE: 'c',
  BIG_PAWN: 'b',
  EP_CAPTURE: 'e',
  PROMOTION: 'p',
  KSIDE_CASTLE: 'k',
  QSIDE_CASTLE: 'q',
}

const Chess = exports.Chess = function (fen) {
  var board = new Array(128)
  var kings = { w: EMPTY, b: EMPTY }
  var turn = WHITE
  var castling = { w: 0, b: 0 }
  var ep_square = EMPTY
  var half_moves = 0
  var move_number = 1
  var history = []
  var header = {}
  var comments = {}

  /* if the user passes in a fen string, load it, else default to
   * starting position
   */
  if (typeof fen === 'undefined') {
    load(DEFAULT_POSITION)
  } else {
    load(fen)
  }

  function clear(keep_headers) {
    if (typeof keep_headers === 'undefined') {
      keep_headers = false
    }

    board = new Array(128)
    kings = { w: EMPTY, b: EMPTY }
    turn = WHITE
    castling = { w: 0, b: 0 }
    ep_square = EMPTY
    half_moves = 0
    move_number = 1
    history = []
    if (!keep_headers) header = {}
    comments = {}
    update_setup(generate_fen())
  }

  function prune_comments() {
    var reversed_history = []
    var current_comments = {}
    var copy_comment = function (fen) {
      if (fen in comments) {
        current_comments[fen] = comments[fen]
      }
    }
    while (history.length > 0) {
      reversed_history.push(undo_move())
    }
    copy_comment(generate_fen())
    while (reversed_history.length > 0) {
      make_move(reversed_history.pop())
      copy_comment(generate_fen())
    }
    comments = current_comments
  }

  function reset() {
    load(DEFAULT_POSITION)
  }

  function load(fen, keep_headers) {
    if (typeof keep_headers === 'undefined') {
      keep_headers = false
    }

    var tokens = fen.split(/\s+/)
    var position = tokens[0]
    var square = 0

    if (!validate_fen(fen).valid) {
      return false
    }

    clear(keep_headers)

    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i)

      if (piece === '/') {
        square += 8
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10)
      } else {
        var color = piece < 'a' ? WHITE : BLACK
        put({ type: piece.toLowerCase(), color: color }, algebraic(square))
        square++
      }
    }

    turn = tokens[1]

    if (tokens[2].indexOf('K') > -1) {
      castling.w |= BITS.KSIDE_CASTLE
    }
    if (tokens[2].indexOf('Q') > -1) {
      castling.w |= BITS.QSIDE_CASTLE
    }
    if (tokens[2].indexOf('k') > -1) {
      castling.b |= BITS.KSIDE_CASTLE
    }
    if (tokens[2].indexOf('q') > -1) {
      castling.b |= BITS.QSIDE_CASTLE
    }

    ep_square = tokens[3] === '-' ? EMPTY : SQUARE_MAP[tokens[3]]
    half_moves = parseInt(tokens[4], 10)
    move_number = parseInt(tokens[5], 10)

    update_setup(generate_fen())

    return true
  }

  /* TODO: this function is pretty much crap - it validates structure but
   * completely ignores content (e.g. doesn't verify that each side has a king)
   * ... we should rewrite this, and ditch the silly error_number field while
   * we're at it
   */
  function validate_fen(fen) {
    var errors = {
      0: 'No errors.',
      1: 'FEN string must contain six space-delimited fields.',
      2: '6th field (move number) must be a positive integer.',
      3: '5th field (half move counter) must be a non-negative integer.',
      4: '4th field (en-passant square) is invalid.',
      5: '3rd field (castling availability) is invalid.',
      6: '2nd field (side to move) is invalid.',
      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
      8: '1st field (piece positions) is invalid [consecutive numbers].',
      9: '1st field (piece positions) is invalid [invalid piece].',
      10: '1st field (piece positions) is invalid [row too large].',
      11: 'Illegal en-passant square',
    }

    /* 1st criterion: 6 space-seperated fields? */
    var tokens = fen.split(/\s+/)
    if (tokens.length !== 6) {
      return { valid: false, error_number: 1, error: errors[1] }
    }

    /* 2nd criterion: move number field is a integer value > 0? */
    if (isNaN(parseInt(tokens[5])) || parseInt(tokens[5], 10) <= 0) {
      return { valid: false, error_number: 2, error: errors[2] }
    }

    /* 3rd criterion: half move counter is an integer >= 0? */
    if (isNaN(parseInt(tokens[4])) || parseInt(tokens[4], 10) < 0) {
      return { valid: false, error_number: 3, error: errors[3] }
    }

    /* 4th criterion: 4th field is a valid e.p.-string? */
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { valid: false, error_number: 4, error: errors[4] }
    }

    /* 5th criterion: 3th field is a valid castle-string? */
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return { valid: false, error_number: 5, error: errors[5] }
    }

    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
    if (!/^(w|b)$/.test(tokens[1])) {
      return { valid: false, error_number: 6, error: errors[6] }
    }

    /* 7th criterion: 1st field contains 8 rows? */
    var rows = tokens[0].split('/')
    if (rows.length !== 8) {
      return { valid: false, error_number: 7, error: errors[7] }
    }

    /* 8th criterion: every row is valid? */
    for (var i = 0; i < rows.length; i++) {
      /* check for right sum of fields AND not two numbers in succession */
      var sum_fields = 0
      var previous_was_number = false

      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return { valid: false, error_number: 8, error: errors[8] }
          }
          sum_fields += parseInt(rows[i][k], 10)
          previous_was_number = true
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, error_number: 9, error: errors[9] }
          }
          sum_fields += 1
          previous_was_number = false
        }
      }
      if (sum_fields !== 8) {
        return { valid: false, error_number: 10, error: errors[10] }
      }
    }

    if (
      (tokens[3][1] == '3' && tokens[1] == 'w') ||
      (tokens[3][1] == '6' && tokens[1] == 'b')
    ) {
      return { valid: false, error_number: 11, error: errors[11] }
    }

    /* everything's okay! */
    return { valid: true, error_number: 0, error: errors[0] }
  }

  function generate_fen() {
    var empty = 0
    var fen = ''

    for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
      if (board[i] == null) {
        empty++
      } else {
        if (empty > 0) {
          fen += empty
          empty = 0
        }
        var color = board[i].color
        var piece = board[i].type

        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase()
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty
        }

        if (i !== SQUARE_MAP.h1) {
          fen += '/'
        }

        empty = 0
        i += 8
      }
    }

    var cflags = ''
    if (castling[WHITE] & BITS.KSIDE_CASTLE) {
      cflags += 'K'
    }
    if (castling[WHITE] & BITS.QSIDE_CASTLE) {
      cflags += 'Q'
    }
    if (castling[BLACK] & BITS.KSIDE_CASTLE) {
      cflags += 'k'
    }
    if (castling[BLACK] & BITS.QSIDE_CASTLE) {
      cflags += 'q'
    }

    /* do we have an empty castling flag? */
    cflags = cflags || '-'
    var epflags = ep_square === EMPTY ? '-' : algebraic(ep_square)

    return [fen, turn, cflags, epflags, half_moves, move_number].join(' ')
  }

  function set_header(args) {
    for (var i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
        header[args[i]] = args[i + 1]
      }
    }
    return header
  }

  /* called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN is
   * equal to the default position, the SetUp and FEN are deleted
   * the setup is only updated if history.length is zero, ie moves haven't been
   * made.
   */
  function update_setup(fen) {
    if (history.length > 0) return

    if (fen !== DEFAULT_POSITION) {
      header['SetUp'] = '1'
      header['FEN'] = fen
    } else {
      delete header['SetUp']
      delete header['FEN']
    }
  }

  function get(square) {
    var piece = board[SQUARE_MAP[square]]
    return piece ? { type: piece.type, color: piece.color } : null
  }

  function put(piece, square) {
    /* check for valid piece object */
    if (!('type' in piece && 'color' in piece)) {
      return false
    }

    /* check for piece */
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false
    }

    /* check for valid square */
    if (!(square in SQUARE_MAP)) {
      return false
    }

    var sq = SQUARE_MAP[square]

    /* don't let the user place more than one king */
    if (
      piece.type == KING &&
      !(kings[piece.color] == EMPTY || kings[piece.color] == sq)
    ) {
      return false
    }

    board[sq] = { type: piece.type, color: piece.color }
    if (piece.type === KING) {
      kings[piece.color] = sq
    }

    update_setup(generate_fen())

    return true
  }

  function remove(square) {
    var piece = get(square)
    board[SQUARE_MAP[square]] = null
    if (piece && piece.type === KING) {
      kings[piece.color] = EMPTY
    }

    update_setup(generate_fen())

    return piece
  }

  function build_move(board, from, to, flags, promotion) {
    var move = {
      color: turn,
      from: from,
      to: to,
      flags: flags,
      piece: board[from].type,
    }

    if (promotion) {
      move.flags |= BITS.PROMOTION
      move.promotion = promotion
    }

    if (board[to]) {
      move.captured = board[to].type
    } else if (flags & BITS.EP_CAPTURE) {
      move.captured = PAWN
    }
    return move
  }

  function generate_moves(options) {
    function add_move(board, moves, from, to, flags) {
      /* if pawn promotion */
      if (
        board[from].type === PAWN &&
        (rank(to) === RANK_8 || rank(to) === RANK_1)
      ) {
        var pieces = [QUEEN, ROOK, BISHOP, KNIGHT]
        for (var i = 0, len = pieces.length; i < len; i++) {
          moves.push(build_move(board, from, to, flags, pieces[i]))
        }
      } else {
        moves.push(build_move(board, from, to, flags))
      }
    }

    var moves = []
    var us = turn
    var them = swap_color(us)
    var second_rank = { b: RANK_7, w: RANK_2 }

    var first_sq = SQUARE_MAP.a8
    var last_sq = SQUARE_MAP.h1
    var single_square = false

    /* do we want legal moves? */
    var legal =
      typeof options !== 'undefined' && 'legal' in options
        ? options.legal
        : true

    var piece_type =
      typeof options !== 'undefined' &&
      'piece' in options &&
      typeof options.piece === 'string'
        ? options.piece.toLowerCase()
        : true

    /* are we generating moves for a single square? */
    if (typeof options !== 'undefined' && 'square' in options) {
      if (options.square in SQUARE_MAP) {
        first_sq = last_sq = SQUARE_MAP[options.square]
        single_square = true
      } else {
        /* invalid square */
        return []
      }
    }

    for (var i = first_sq; i <= last_sq; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7
        continue
      }

      var piece = board[i]
      if (piece == null || piece.color !== us) {
        continue
      }

      if (piece.type === PAWN && (piece_type === true || piece_type === PAWN)) {
        /* single square, non-capturing */
        var square = i + PAWN_OFFSETS[us][0]
        if (board[square] == null) {
          add_move(board, moves, i, square, BITS.NORMAL)

          /* double square */
          var square = i + PAWN_OFFSETS[us][1]
          if (second_rank[us] === rank(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS.BIG_PAWN)
          }
        }

        /* pawn captures */
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j]
          if (square & 0x88) continue

          if (board[square] != null && board[square].color === them) {
            add_move(board, moves, i, square, BITS.CAPTURE)
          } else if (square === ep_square) {
            add_move(board, moves, i, ep_square, BITS.EP_CAPTURE)
          }
        }
      } else if (piece_type === true || piece_type === piece.type) {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j]
          var square = i

          while (true) {
            square += offset
            if (square & 0x88) break

            if (board[square] == null) {
              add_move(board, moves, i, square, BITS.NORMAL)
            } else {
              if (board[square].color === us) break
              add_move(board, moves, i, square, BITS.CAPTURE)
              break
            }

            /* break, if knight or king */
            if (piece.type === 'n' || piece.type === 'k') break
          }
        }
      }
    }

    /* check for castling if: a) we're generating all moves, or b) we're doing
     * single square move generation on the king's square
     */
    if (piece_type === true || piece_type === KING) {
      if (!single_square || last_sq === kings[us]) {
        /* king-side castling */
        if (castling[us] & BITS.KSIDE_CASTLE) {
          var castling_from = kings[us]
          var castling_to = castling_from + 2

          if (
            board[castling_from + 1] == null &&
            board[castling_to] == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from + 1) &&
            !attacked(them, castling_to)
          ) {
            add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE)
          }
        }

        /* queen-side castling */
        if (castling[us] & BITS.QSIDE_CASTLE) {
          var castling_from = kings[us]
          var castling_to = castling_from - 2

          if (
            board[castling_from - 1] == null &&
            board[castling_from - 2] == null &&
            board[castling_from - 3] == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from - 1) &&
            !attacked(them, castling_to)
          ) {
            add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE)
          }
        }
      }
    }

    /* return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal) {
      return moves
    }

    /* filter out illegal moves */
    var legal_moves = []
    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i])
      if (!king_attacked(us)) {
        legal_moves.push(moves[i])
      }
      undo_move()
    }

    return legal_moves
  }

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} sloppy Use the sloppy SAN generator to work around over
   * disambiguation bugs in Fritz and Chessbase.  See below:
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */
  function move_to_san(move, moves) {
    var output = ''

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O'
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O'
    } else {
      if (move.piece !== PAWN) {
        var disambiguator = get_disambiguator(move, moves)
        output += move.piece.toUpperCase() + disambiguator
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0]
        }
        output += 'x'
      }

      output += algebraic(move.to)

      if (move.flags & BITS.PROMOTION) {
        output += '=' + move.promotion.toUpperCase()
      }
    }

    make_move(move)
    if (in_check()) {
      if (in_checkmate()) {
        output += '#'
      } else {
        output += '+'
      }
    }
    undo_move()

    return output
  }

  function attacked(color, square) {
    for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7
        continue
      }

      /* if empty square or wrong color */
      if (board[i] == null || board[i].color !== color) continue

      var piece = board[i]
      var difference = i - square
      var index = difference + 119

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) return true
          } else {
            if (piece.color === BLACK) return true
          }
          continue
        }

        /* if the piece is a knight or a king */
        if (piece.type === 'n' || piece.type === 'k') return true

        var offset = RAYS[index]
        var j = i + offset

        var blocked = false
        while (j !== square) {
          if (board[j] != null) {
            blocked = true
            break
          }
          j += offset
        }

        if (!blocked) return true
      }
    }

    return false
  }

  function king_attacked(color) {
    return attacked(swap_color(color), kings[color])
  }

  function in_check() {
    return king_attacked(turn)
  }

  function in_checkmate() {
    return in_check() && generate_moves().length === 0
  }

  function in_stalemate() {
    return !in_check() && generate_moves().length === 0
  }

  function insufficient_material() {
    var pieces = {}
    var bishops = []
    var num_pieces = 0
    var sq_color = 0

    for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
      sq_color = (sq_color + 1) % 2
      if (i & 0x88) {
        i += 7
        continue
      }

      var piece = board[i]
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1
        if (piece.type === BISHOP) {
          bishops.push(sq_color)
        }
        num_pieces++
      }
    }

    /* k vs. k */
    if (num_pieces === 2) {
      return true
    } else if (
      /* k vs. kn .... or .... k vs. kb */
      num_pieces === 3 &&
      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true
    } else if (num_pieces === pieces[BISHOP] + 2) {
      /* kb vs. kb where any number of bishops are all on the same color */
      var sum = 0
      var len = bishops.length
      for (var i = 0; i < len; i++) {
        sum += bishops[i]
      }
      if (sum === 0 || sum === len) {
        return true
      }
    }

    return false
  }

  function in_threefold_repetition() {
    /* TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the make_move/undo_move functions,
     * avoiding the costly that we do below.
     */
    var moves = []
    var positions = {}
    var repetition = false

    while (true) {
      var move = undo_move()
      if (!move) break
      moves.push(move)
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      var fen = generate_fen().split(' ').slice(0, 4).join(' ')

      /* has the position occurred three or move times */
      positions[fen] = fen in positions ? positions[fen] + 1 : 1
      if (positions[fen] >= 3) {
        repetition = true
      }

      if (!moves.length) {
        break
      }
      make_move(moves.pop())
    }

    return repetition
  }

  function push(move) {
    history.push({
      move: move,
      kings: { b: kings.b, w: kings.w },
      turn: turn,
      castling: { b: castling.b, w: castling.w },
      ep_square: ep_square,
      half_moves: half_moves,
      move_number: move_number,
    })
  }

  function make_move(move) {
    var us = turn
    var them = swap_color(us)
    push(move)

    board[move.to] = board[move.from]
    board[move.from] = null

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null
      } else {
        board[move.to + 16] = null
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags & BITS.PROMOTION) {
      board[move.to] = { type: move.promotion, color: us }
    }

    /* if we moved the king */
    if (board[move.to].type === KING) {
      kings[board[move.to].color] = move.to

      /* if we castled, move the rook next to the king */
      if (move.flags & BITS.KSIDE_CASTLE) {
        var castling_to = move.to - 1
        var castling_from = move.to + 1
        board[castling_to] = board[castling_from]
        board[castling_from] = null
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        var castling_to = move.to + 1
        var castling_from = move.to - 2
        board[castling_to] = board[castling_from]
        board[castling_from] = null
      }

      /* turn off castling */
      castling[us] = ''
    }

    /* turn off castling if we move a rook */
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (
          move.from === ROOKS[us][i].square &&
          castling[us] & ROOKS[us][i].flag
        ) {
          castling[us] ^= ROOKS[us][i].flag
          break
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (castling[them]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (
          move.to === ROOKS[them][i].square &&
          castling[them] & ROOKS[them][i].flag
        ) {
          castling[them] ^= ROOKS[them][i].flag
          break
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === 'b') {
        ep_square = move.to - 16
      } else {
        ep_square = move.to + 16
      }
    } else {
      ep_square = EMPTY
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      half_moves = 0
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0
    } else {
      half_moves++
    }

    if (turn === BLACK) {
      move_number++
    }
    turn = swap_color(turn)
  }

  function undo_move() {
    var old = history.pop()
    if (old == null) {
      return null
    }

    var move = old.move
    kings = old.kings
    turn = old.turn
    castling = old.castling
    ep_square = old.ep_square
    half_moves = old.half_moves
    move_number = old.move_number

    var us = turn
    var them = swap_color(turn)

    board[move.from] = board[move.to]
    board[move.from].type = move.piece // to undo any promotions
    board[move.to] = null

    if (move.flags & BITS.CAPTURE) {
      board[move.to] = { type: move.captured, color: them }
    } else if (move.flags & BITS.EP_CAPTURE) {
      var index
      if (us === BLACK) {
        index = move.to - 16
      } else {
        index = move.to + 16
      }
      board[index] = { type: PAWN, color: them }
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      var castling_to, castling_from
      if (move.flags & BITS.KSIDE_CASTLE) {
        castling_to = move.to + 1
        castling_from = move.to - 1
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castling_to = move.to - 2
        castling_from = move.to + 1
      }

      board[castling_to] = board[castling_from]
      board[castling_from] = null
    }

    return move
  }

  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  function move_from_san(move, sloppy) {
    // strip off any move decorations: e.g Nf3+?! becomes Nf3
    var clean_move = stripped_san(move)

    // the move parsers is a 2-step state
    for (var parser = 0; parser < 2; parser++) {
      if (parser == PARSER_SLOPPY) {
        // only run the sloppy parse if explicitly requested
        if (!sloppy) {
          return null
        }

        // The sloppy parser allows the user to parse non-standard chess
        // notations. This parser is opt-in (by specifying the
        // '{ sloppy: true }' setting) and is only run after the Standard
        // Algebraic Notation (SAN) parser has failed.
        //
        // When running the sloppy parser, we'll run a regex to grab the piece,
        // the to/from square, and an optional promotion piece. This regex will
        // parse common non-standard notation like: Pe2-e4, Rc1c4, Qf3xf7,
        // f7f8q, b1c3

        // NOTE: Some positions and moves may be ambiguous when using the
        // sloppy parser. For example, in this position:
        // 6k1/8/8/B7/8/8/8/BN4K1 w - - 0 1, the move b1c3 may be interpreted
        // as Nc3 or B1c3 (a disambiguated bishop move). In these cases, the
        // sloppy parser will default to the most most basic interpretation
        // (which is b1c3 parsing to Nc3).

        // FIXME: these var's are hoisted into function scope, this will need
        // to change when switching to const/let

        var overly_disambiguated = false

        var matches = clean_move.match(
          /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
        )
        if (matches) {
          var piece = matches[1]
          var from = matches[2]
          var to = matches[3]
          var promotion = matches[4]

          if (from.length == 1) {
            overly_disambiguated = true
          }
        } else {
          // The [a-h]?[1-8]? portion of the regex below handles moves that may
          // be overly disambiguated (e.g. Nge7 is unnecessary and non-standard
          // when there is one legal knight move to e7). In this case, the value
          // of 'from' variable will be a rank or file, not a square.
          var matches = clean_move.match(
            /([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/
          )

          if (matches) {
            var piece = matches[1]
            var from = matches[2]
            var to = matches[3]
            var promotion = matches[4]

            if (from.length == 1) {
              var overly_disambiguated = true
            }
          }
        }
      }

      var piece_type = infer_piece_type(clean_move)
      var moves = generate_moves({
        legal: true,
        piece: piece ? piece : piece_type,
      })

      for (var i = 0, len = moves.length; i < len; i++) {
        switch (parser) {
          case PARSER_STRICT: {
            if (clean_move === stripped_san(move_to_san(moves[i], moves))) {
              return moves[i]
            }
            break
          }
          case PARSER_SLOPPY: {
            if (matches) {
              // hand-compare move properties with the results from our sloppy
              // regex
              if (
                (!piece || piece.toLowerCase() == moves[i].piece) &&
                SQUARE_MAP[from] == moves[i].from &&
                SQUARE_MAP[to] == moves[i].to &&
                (!promotion || promotion.toLowerCase() == moves[i].promotion)
              ) {
                return moves[i]
              } else if (overly_disambiguated) {
                // SPECIAL CASE: we parsed a move string that may have an
                // unneeded rank/file disambiguator (e.g. Nge7).  The 'from'
                // variable will
                var square = algebraic(moves[i].from)
                if (
                  (!piece || piece.toLowerCase() == moves[i].piece) &&
                  SQUARE_MAP[to] == moves[i].to &&
                  (from == square[0] || from == square[1]) &&
                  (!promotion || promotion.toLowerCase() == moves[i].promotion)
                ) {
                  return moves[i]
                }
              }
            }
          }
        }
      }
    }

    return null
  }

  /* pretty = external move object */
  function make_pretty(ugly_move) {
    var move = clone(ugly_move)
    move.san = move_to_san(move, generate_moves({ legal: true }))
    move.to = algebraic(move.to)
    move.from = algebraic(move.from)

    var flags = ''

    for (var flag in BITS) {
      if (BITS[flag] & move.flags) {
        flags += FLAGS[flag]
      }
    }
    move.flags = flags

    return move
  }

  /*****************************************************************************
   * DEBUGGING UTILITIES
   ****************************************************************************/
  function perft(depth) {
    var moves = generate_moves({ legal: false })
    var nodes = 0
    var color = turn

    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i])
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1)
          nodes += child_nodes
        } else {
          nodes++
        }
      }
      undo_move()
    }

    return nodes
  }

  return {
    /***************************************************************************
     * PUBLIC API
     **************************************************************************/
    load: function (fen) {
      return load(fen)
    },

    reset: function () {
      return reset()
    },

    moves: function (options) {
      /* The internal representation of a chess move is in 0x88 format, and
       * not meant to be human-readable.  The code below converts the 0x88
       * square coordinates to algebraic coordinates.  It also prunes an
       * unnecessary move keys resulting from a verbose call.
       */

      var ugly_moves = generate_moves(options)
      var moves = []

      for (var i = 0, len = ugly_moves.length; i < len; i++) {
        /* does the user want a full move object (most likely not), or just
         * SAN
         */
        if (
          typeof options !== 'undefined' &&
          'verbose' in options &&
          options.verbose
        ) {
          moves.push(make_pretty(ugly_moves[i]))
        } else {
          moves.push(
            move_to_san(ugly_moves[i], generate_moves({ legal: true }))
          )
        }
      }

      return moves
    },

    in_check: function () {
      return in_check()
    },

    in_checkmate: function () {
      return in_checkmate()
    },

    in_stalemate: function () {
      return in_stalemate()
    },

    in_draw: function () {
      return (
        half_moves >= 100 ||
        in_stalemate() ||
        insufficient_material() ||
        in_threefold_repetition()
      )
    },

    insufficient_material: function () {
      return insufficient_material()
    },

    in_threefold_repetition: function () {
      return in_threefold_repetition()
    },

    game_over: function () {
      return (
        half_moves >= 100 ||
        in_checkmate() ||
        in_stalemate() ||
        insufficient_material() ||
        in_threefold_repetition()
      )
    },

    validate_fen: function (fen) {
      return validate_fen(fen)
    },

    fen: function () {
      return generate_fen()
    },

    board: function () {
      var output = [],
        row = []

      for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
        if (board[i] == null) {
          row.push(null)
        } else {
          row.push({
            square: algebraic(i),
            type: board[i].type,
            color: board[i].color,
          })
        }
        if ((i + 1) & 0x88) {
          output.push(row)
          row = []
          i += 8
        }
      }

      return output
    },

    pgn: function (options) {
      /* using the specification from http://www.chessclub.com/help/PGN-spec
       * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
       */
      var newline =
        typeof options === 'object' && typeof options.newline_char === 'string'
          ? options.newline_char
          : '\n'
      var max_width =
        typeof options === 'object' && typeof options.max_width === 'number'
          ? options.max_width
          : 0
      var result = []
      var header_exists = false

      /* add the PGN header information */
      for (var i in header) {
        /* TODO: order of enumerated properties in header object is not
         * guaranteed, see ECMA-262 spec (section 12.6.4)
         */
        result.push('[' + i + ' "' + header[i] + '"]' + newline)
        header_exists = true
      }

      if (header_exists && history.length) {
        result.push(newline)
      }

      var append_comment = function (move_string) {
        var comment = comments[generate_fen()]
        if (typeof comment !== 'undefined') {
          var delimiter = move_string.length > 0 ? ' ' : ''
          move_string = `${move_string}${delimiter}{${comment}}`
        }
        return move_string
      }

      /* pop all of history onto reversed_history */
      var reversed_history = []
      while (history.length > 0) {
        reversed_history.push(undo_move())
      }

      var moves = []
      var move_string = ''

      /* special case of a commented starting position with no moves */
      if (reversed_history.length === 0) {
        moves.push(append_comment(''))
      }

      /* build the list of moves.  a move_string looks like: "3. e3 e6" */
      while (reversed_history.length > 0) {
        move_string = append_comment(move_string)
        var move = reversed_history.pop()

        /* if the position started with black to move, start PGN with #. ... */
        if (!history.length && move.color === 'b') {
          const prefix = `${move_number}. ...`
          /* is there a comment preceding the first move? */
          move_string = move_string ? `${move_string} ${prefix}` : prefix
        } else if (move.color === 'w') {
          /* store the previous generated move_string if we have one */
          if (move_string.length) {
            moves.push(move_string)
          }
          move_string = move_number + '.'
        }

        move_string =
          move_string + ' ' + move_to_san(move, generate_moves({ legal: true }))
        make_move(move)
      }

      /* are there any other leftover moves? */
      if (move_string.length) {
        moves.push(append_comment(move_string))
      }

      /* is there a result? */
      if (typeof header.Result !== 'undefined') {
        moves.push(header.Result)
      }

      /* history should be back to what it was before we started generating PGN,
       * so join together moves
       */
      if (max_width === 0) {
        return result.join('') + moves.join(' ')
      }

      var strip = function () {
        if (result.length > 0 && result[result.length - 1] === ' ') {
          result.pop()
          return true
        }
        return false
      }

      /* NB: this does not preserve comment whitespace. */
      var wrap_comment = function (width, move) {
        for (var token of move.split(' ')) {
          if (!token) {
            continue
          }
          if (width + token.length > max_width) {
            while (strip()) {
              width--
            }
            result.push(newline)
            width = 0
          }
          result.push(token)
          width += token.length
          result.push(' ')
          width++
        }
        if (strip()) {
          width--
        }
        return width
      }

      /* wrap the PGN output at max_width */
      var current_width = 0
      for (var i = 0; i < moves.length; i++) {
        if (current_width + moves[i].length > max_width) {
          if (moves[i].includes('{')) {
            current_width = wrap_comment(current_width, moves[i])
            continue
          }
        }
        /* if the current move will push past max_width */
        if (current_width + moves[i].length > max_width && i !== 0) {
          /* don't end the line with whitespace */
          if (result[result.length - 1] === ' ') {
            result.pop()
          }

          result.push(newline)
          current_width = 0
        } else if (i !== 0) {
          result.push(' ')
          current_width++
        }
        result.push(moves[i])
        current_width += moves[i].length
      }

      return result.join('')
    },

    load_pgn: function (pgn, options) {
      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy =
        typeof options !== 'undefined' && 'sloppy' in options
          ? options.sloppy
          : false

      function mask(str) {
        return str.replace(/\\/g, '\\')
      }

      function parse_pgn_header(header, options) {
        var newline_char =
          typeof options === 'object' &&
          typeof options.newline_char === 'string'
            ? options.newline_char
            : '\r?\n'
        var header_obj = {}
        var headers = header.split(new RegExp(mask(newline_char)))
        var key = ''
        var value = ''

        for (var i = 0; i < headers.length; i++) {
          var regex = /^\s*\[([A-Za-z]+)\s*"(.*)"\s*\]\s*$/
          key = headers[i].replace(regex, '$1')
          value = headers[i].replace(regex, '$2')
          if (trim(key).length > 0) {
            header_obj[key] = value
          }
        }

        return header_obj
      }

      // strip whitespace from head/tail of PGN block
      pgn = pgn.trim()

      var newline_char =
        typeof options === 'object' && typeof options.newline_char === 'string'
          ? options.newline_char
          : '\r?\n'

      // RegExp to split header. Takes advantage of the fact that header and movetext
      // will always have a blank line between them (ie, two newline_char's).
      // With default newline_char, will equal: /^(\[((?:\r?\n)|.)*\])(?:\s*\r?\n){2}/
      var header_regex = new RegExp(
        '^(\\[((?:' +
          mask(newline_char) +
          ')|.)*\\])' +
          '(?:\\s*' +
          mask(newline_char) +
          '){2}'
      )

      // If no header given, begin with moves.
      var header_string = header_regex.test(pgn)
        ? header_regex.exec(pgn)[1]
        : ''

      // Put the board in the starting position
      reset()

      /* parse PGN header */
      var headers = parse_pgn_header(header_string, options)
      var fen = ''

      for (var key in headers) {
        // check to see user is including fen (possibly with wrong tag case)
        if (key.toLowerCase() === 'fen') {
          fen = headers[key]
        }
        set_header([key, headers[key]])
      }

      /* sloppy parser should attempt to load a fen tag, even if it's
       * the wrong case and doesn't include a corresponding [SetUp "1"] tag */
      if (sloppy) {
        if (fen) {
          if (!load(fen, true)) {
            return false
          }
        }
      } else {
        /* strict parser - load the starting position indicated by [Setup '1']
         * and [FEN position] */
        if (headers['SetUp'] === '1') {
          if (!('FEN' in headers && load(headers['FEN'], true))) {
            // second argument to load: don't clear the headers
            return false
          }
        }
      }

      /* NB: the regexes below that delete move numbers, recursive
       * annotations, and numeric annotation glyphs may also match
       * text in comments. To prevent this, we transform comments
       * by hex-encoding them in place and decoding them again after
       * the other tokens have been deleted.
       *
       * While the spec states that PGN files should be ASCII encoded,
       * we use {en,de}codeURIComponent here to support arbitrary UTF8
       * as a convenience for modern users */

      var to_hex = function (string) {
        return Array.from(string)
          .map(function (c) {
            /* encodeURI doesn't transform most ASCII characters,
             * so we handle these ourselves */
            return c.charCodeAt(0) < 128
              ? c.charCodeAt(0).toString(16)
              : encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
          })
          .join('')
      }

      var from_hex = function (string) {
        return string.length == 0
          ? ''
          : decodeURIComponent('%' + string.match(/.{1,2}/g).join('%'))
      }

      var encode_comment = function (string) {
        string = string.replace(new RegExp(mask(newline_char), 'g'), ' ')
        return `{${to_hex(string.slice(1, string.length - 1))}}`
      }

      var decode_comment = function (string) {
        if (string.startsWith('{') && string.endsWith('}')) {
          return from_hex(string.slice(1, string.length - 1))
        }
      }

      /* delete header to get the moves */
      var ms = pgn
        .replace(header_string, '')
        .replace(
          /* encode comments so they don't get deleted below */
          new RegExp(`(\{[^}]*\})+?|;([^${mask(newline_char)}]*)`, 'g'),
          function (match, bracket, semicolon) {
            return bracket !== undefined
              ? encode_comment(bracket)
              : ' ' + encode_comment(`{${semicolon.slice(1)}}`)
          }
        )
        .replace(new RegExp(mask(newline_char), 'g'), ' ')

      /* delete recursive annotation variations */
      var rav_regex = /(\([^\(\)]+\))+?/g
      while (rav_regex.test(ms)) {
        ms = ms.replace(rav_regex, '')
      }

      /* delete move numbers */
      ms = ms.replace(/\d+\.(\.\.)?/g, '')

      /* delete ... indicating black to move */
      ms = ms.replace(/\.\.\./g, '')

      /* delete numeric annotation glyphs */
      ms = ms.replace(/\$\d+/g, '')

      /* trim and get array of moves */
      var moves = trim(ms).split(new RegExp(/\s+/))

      /* delete empty entries */
      moves = moves.join(',').replace(/,,+/g, ',').split(',')
      var move = ''

      var result = ''

      for (var half_move = 0; half_move < moves.length; half_move++) {
        var comment = decode_comment(moves[half_move])
        if (comment !== undefined) {
          comments[generate_fen()] = comment
          continue
        }

        move = move_from_san(moves[half_move], sloppy)

        /* invalid move */
        if (move == null) {
          /* was the move an end of game marker */
          if (TERMINATION_MARKERS.indexOf(moves[half_move]) > -1) {
            result = moves[half_move]
          } else {
            return false
          }
        } else {
          /* reset the end of game marker if making a valid move */
          result = ''
          make_move(move)
        }
      }

      /* Per section 8.2.6 of the PGN spec, the Result tag pair must match
       * match the termination marker. Only do this when headers are present,
       * but the result tag is missing
       */
      if (result && Object.keys(header).length && !header['Result']) {
        set_header(['Result', result])
      }

      return true
    },

    header: function () {
      return set_header(arguments)
    },

    turn: function () {
      return turn
    },

    move: function (move, options) {
      /* The move function can be called with in the following parameters:
       *
       * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
       *
       * .move({ from: 'h7', <- where the 'move' is a move object (additional
       *         to :'h8',      fields are ignored)
       *         promotion: 'q',
       *      })
       */

      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy =
        typeof options !== 'undefined' && 'sloppy' in options
          ? options.sloppy
          : false

      var move_obj = null

      if (typeof move === 'string') {
        move_obj = move_from_san(move, sloppy)
      } else if (typeof move === 'object') {
        var moves = generate_moves()

        /* convert the pretty move object to an ugly move object */
        for (var i = 0, len = moves.length; i < len; i++) {
          if (
            move.from === algebraic(moves[i].from) &&
            move.to === algebraic(moves[i].to) &&
            (!('promotion' in moves[i]) ||
              move.promotion === moves[i].promotion)
          ) {
            move_obj = moves[i]
            break
          }
        }
      }

      /* failed to find move */
      if (!move_obj) {
        return null
      }

      /* need to make a copy of move because we can't generate SAN after the
       * move is made
       */
      var pretty_move = make_pretty(move_obj)

      make_move(move_obj)

      return pretty_move
    },

    undo: function () {
      var move = undo_move()
      return move ? make_pretty(move) : null
    },

    clear: function () {
      return clear()
    },

    put: function (piece, square) {
      return put(piece, square)
    },

    get: function (square) {
      return get(square)
    },

    ascii() {
      var s = '   +------------------------+\n'
      for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
        /* display the rank */
        if (file(i) === 0) {
          s += ' ' + '87654321'[rank(i)] + ' |'
        }

        /* empty piece */
        if (board[i] == null) {
          s += ' . '
        } else {
          var piece = board[i].type
          var color = board[i].color
          var symbol =
            color === WHITE ? piece.toUpperCase() : piece.toLowerCase()
          s += ' ' + symbol + ' '
        }

        if ((i + 1) & 0x88) {
          s += '|\n'
          i += 8
        }
      }
      s += '   +------------------------+\n'
      s += '     a  b  c  d  e  f  g  h'

      return s
    },

    remove: function (square) {
      return remove(square)
    },

    perft: function (depth) {
      return perft(depth)
    },

    square_color: function (square) {
      if (square in SQUARE_MAP) {
        var sq_0x88 = SQUARE_MAP[square]
        return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? 'light' : 'dark'
      }

      return null
    },

    history: function (options) {
      var reversed_history = []
      var move_history = []
      var verbose =
        typeof options !== 'undefined' &&
        'verbose' in options &&
        options.verbose

      while (history.length > 0) {
        reversed_history.push(undo_move())
      }

      while (reversed_history.length > 0) {
        var move = reversed_history.pop()
        if (verbose) {
          move_history.push(make_pretty(move))
        } else {
          move_history.push(move_to_san(move, generate_moves({ legal: true })))
        }
        make_move(move)
      }

      return move_history
    },

    get_comment: function () {
      return comments[generate_fen()]
    },

    set_comment: function (comment) {
      comments[generate_fen()] = comment.replace('{', '[').replace('}', ']')
    },

    delete_comment: function () {
      var comment = comments[generate_fen()]
      delete comments[generate_fen()]
      return comment
    },

    get_comments: function () {
      prune_comments()
      return Object.keys(comments).map(function (fen) {
        return { fen: fen, comment: comments[fen] }
      })
    },

    delete_comments: function () {
      prune_comments()
      return Object.keys(comments).map(function (fen) {
        var comment = comments[fen]
        delete comments[fen]
        return { fen: fen, comment: comment }
      })
    },
  }
}
return exports;
})();


const chess = new Chess();
chess.move('e5')

console.log(chess);


function convertChessMove(row, col) {
  var newrow;
  var newcol;

  if(row == "1") {
    newrow = "h"
  } else if (row == 2) {
    newrow = "g"
  } else if (row == 3) {
    newrow = "f"
  } else if (row == 4) {
    newrow = "e"
  } else if (row == 5) {
    newrow = "d"
  } else if (row == 6) {
    newrow = "c"
  } else if (row == 7) {
    newrow = "b"
  } else if (row == 8) {
    newrow = "a"
  } 
  if(col == 1) {
    newcol = "8"
  } else if (col == 2) {
    newcol = "7"
  } else if (col == 3) {
    newcol = "6"
  } else if (col == 4) {
    newcol = "5"
  } else if (col == 5) {
    newcol = "4"
  } else if (col == 6) {
    newcol = "3"
  } else if (col == 7) {
    newcol = "2"
  } else if (col == 8) {
    newcol = "1"
  }
  
  return (newrow + newcol)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const noSound = tune`
30,
30: c5~30,
30: c5~30 + d5~30,
30: d5-30 + e5-30 + b4-30 + c5-30 + f5-30,
30: e5~30 + b4^30 + d5-30 + c5-30 + a4^30,
30: e5~30 + b4^30 + d5-30 + c5^30,
30: e5~30 + b4-30 + d5^30 + c5^30,
30: e5^30 + b4-30 + d5^30 + f5^30 + g5^30,
30: e5^30 + b4-30 + c5-30 + a5^30 + g5^30,
30: e5^30,
30: e5^30,
30: d5-30,
30: d5-30,
30: d5-30,
30: d5-30 + c5-30,
30: c5-30,
30: c5-30,
30: c5-30,
30: c5-30,
390`



const cursor = "c";
const DarkC = "C";

const darkBG = "d";
const lightBG = "l";
const border = "b";

const ponBlackDark = "1";
const castleBlackDark = "2";
//Yes, I know it's called a horse
const horseBlackDark = "3";
const bishopBlackDark = "4";
const queenBlackDark = "5";
const kingBlackDark = "6";

const ponBlackLight = "£";
const castleBlackLight = "þ";
//Yes, I know it's called a horse
const horseBlackLight = "ý";
const bishopBlackLight = "ü";
const queenBlackLight = "û";
const kingBlackLight = "ú";


const ponWhiteDark = "!";
const castleWhiteDark = "@";
const horseWhiteDark = "#";
const bishopWhiteDark = "$";
const queenWhiteDark = "%";
const kingWhiteDark = "^";

const ponWhiteLight = "s";
const castleWhiteLight = ":";
const horseWhiteLight = "f";
const bishopWhiteLight = "g";
const queenWhiteLight = "h";
const kingWhiteLight = "i";
//Cursor
const ponWhiteDarkC = "ù";
const castleWhiteDarkC = "ø";
const horseWhiteDarkC = "÷";
const bishopWhiteDarkC = "ö";
const queenWhiteDarkC = "õ";
const kingWhiteDarkC = "ô";

const ponWhiteLightC = "w";
const castleWhiteLightC = ";";
const horseWhiteLightC = "ó";
const bishopWhiteLightC = "~";
const queenWhiteLightC = "ò";
const kingWhiteLightC = "ñ";

const ponBlackLightC = "v";
const castleBlackLightC = "ð";
const horseBlackLightC = "ï";
const bishopBlackLightC = "î";
const queenBlackLightC = "í";
const kingBlackLightC = "ì";

const ponBlackDarkC = "z";
const castleBlackDarkC = "ë";
const horseBlackDarkC = "ê";
const bishopBlackDarkC = "/";
const queenBlackDarkC = "é";
const kingBlackDarkC = "è";

let currentPosition = [5, 5];
let currentPiece;
let selectedPosition = [-1, -1];

let board = [
  ["cb1", "hb1", "bb1", "kb1", "qb1", "bb2", "hb2", "cb2"],
  ["pb1", "pb2", "pb3", "pb4", "pb5", "pb6", "pb7", "pb8"],
  ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"],
  ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"],
  ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"],
  ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"],
  ["pw1", "pw2", "pw3", "pw4", "pw5", "pw6", "pw7", "pw8"],
  ["cw1", "hw1", "bw1", "kw1", "qw1", "bw2", "hw2", "cw2"]
]

setLegend(
  //Bishop
  [ bishopWhiteLightC, bitmap`
6666666666666666
6677777227777766
6777722222727776
6772222277722776
6777222277227776
6777722222277776
6777772222777776
6777772222777776
6777722222277776
6777772222777776
6777772222777776
6777222222227776
6772222222222776
6772222222222776
6677222222227766
6666666666666666` ],
  [ bishopBlackLightC, bitmap`
6666666666666666
6677777007777766
6777700000707776
6770000077700776
6777000077007776
6777700000077776
6777770000777776
6777770000777776
6777700000077776
6777770000777776
6777770000777776
6777000000007776
6770000000000776
6770000000000776
6677000000007766
6666666666666666` ],
  [ bishopBlackDarkC, bitmap`
6666666666666666
6655555005555566
6555500000505556
6550000055500556
6555000055005556
6555500000055556
6555550000555556
6555550000555556
6555500000055556
6555550000555556
6555550000555556
6555000000005556
6550000000000556
6550000000000556
6655000000005566
6666666666666666` ],
  [ bishopWhiteDarkC, bitmap`
6666666666666666
6655555225555566
6555522222525556
6552222255522556
6555222255225556
6555522222255556
6555552222555556
6555552222555556
6555522222255556
6555552222555556
6555552222555556
6555222222225556
6552222222222556
6552222222222556
6655222222225566
6666666666666666` ],
  [ bishopBlackLight, bitmap`
7777777777777777
7777777007777777
7777700000707777
7770000077700777
7777000077007777
7777700000077777
7777770000777777
7777770000777777
7777700000077777
7777770000777777
7777770000777777
7777000000007777
7770000000000777
7770000000000777
7777000000007777
7777777777777777` ],
  [ bishopWhiteLight, bitmap`
7777777777777777
7777777227777777
7777722222727777
7772222277722777
7777222277227777
7777722222277777
7777772222777777
7777772222777777
7777722222277777
7777772222777777
7777772222777777
7777222222227777
7772222222222777
7772222222222777
7777222222227777
7777777777777777` ],
  [ bishopBlackDark, bitmap`
5555555555555555
5555555005555555
5555500000505555
5550000055500555
5555000055005555
5555500000055555
5555550000555555
5555550000555555
5555500000055555
5555550000555555
5555550000555555
5555000000005555
5550000000000555
5550000000000555
5555000000005555
5555555555555555` ],
  [ bishopWhiteDark, bitmap`
5555555555555555
5555555225555555
5555522222525555
5552222255522555
5555222255225555
5555522222255555
5555552222555555
5555552222555555
5555522222255555
5555552222555555
5555552222555555
5555222222225555
5552222222222555
5552222222222555
5555222222225555
5555555555555555` ],
  //Queen
  [ queenBlackLightC, bitmap`
6666666666666666
6677770000777766
6777770000777776
6777770000777776
6770070000700776
6770077007700776
6777077007707776
6077007007007706
6000700000070006
6700070000700076
6770000000000776
6770000000000776
6700000000000076
6700000000000076
6670000000000766
6666666666666666` ],
  [ queenWhiteLightC, bitmap`
6666666666666666
6677772222777766
6777772222777776
6777772222777776
6772272222722776
6772277227722776
6777277227727776
6277227227227726
6222722222272226
6722272222722276
6772222222222776
6772222222222776
6722222222222276
6722222222222276
6672222222222766
6666666666666666` ],
  [ queenBlackDarkC, bitmap`
6666666666666666
6655550000555566
6555550000555556
6555550000555556
6550050000500556
6550055005500556
6555055005505556
6055005005005506
6000500000050006
6500050000500056
6550000000000556
6550000000000556
6500000000000056
6500000000000056
6650000000000566
6666666666666666` ],
  [ queenWhiteDarkC, bitmap`
6666666666666666
6655552222555566
6555552222555556
6555552222555556
6552252222522556
6552255225522556
6555255225525556
6255225225225526
6222522222252226
6522252222522256
6552222222222556
6552222222222556
6522222222222256
6522222222222256
6652222222222566
6666666666666666` ],
  [ queenBlackLight, bitmap`
7777777777777777
7777770000777777
7777770000777777
7777770000777777
7770070000700777
7770077007700777
7777077007707777
7077007007007707
7000700000070007
7700070000700077
7770000000000777
7770000000000777
7700000000000077
7700000000000077
7770000000000777
7777777777777777` ],
  [ queenWhiteLight, bitmap`
7777777777777777
7777772222777777
7777772222777777
7777772222777777
7772272222722777
7772277227722777
7777277227727777
7277227227227727
7222722222272227
7722272222722277
7772222222222777
7772222222222777
7722222222222277
7722222222222277
7772222222222777
7777777777777777` ],
  [ queenBlackDark, bitmap`
5555555555555555
5555550000555555
5555550000555555
5555550000555555
5550050000500555
5550055005500555
5555055005505555
5055005005005505
5000500000050005
5500050000500055
5550000000000555
5550000000000555
5500000000000055
5500000000000055
5550000000000555
5555555555555555` ],
  [ queenWhiteDark, bitmap`
5555555555555555
5555552222555555
5555552222555555
5555552222555555
5552252222522555
5552255225522555
5555255225525555
5255225225225525
5222522222252225
5522252222522255
5552222222222555
5552222222222555
5522222222222255
5522222222222255
5552222222222555
5555555555555555` ],
  //King
  [ kingBlackLightC, bitmap`
6666666666666666
6677777007777766
6777777007777776
6777700000077776
6777700000077776
6777777007777776
6777777007777776
6777707007077776
6770700000070776
6700070000700076
6770000000000776
6770000000000776
6700000000000076
6700000000000076
6670000000000766
6666666666666666` ],
  [ kingWhiteLightC, bitmap`
6666666666666666
6677777227777766
6777777227777776
6777722222277776
6777722222277776
6777777227777776
6777777227777776
6777727227277776
6772722222272776
6722272222722276
6772222222222776
6772222222222776
6722222222222276
6722222222222276
6672222222222766
6666666666666666` ],
  [ kingBlackDarkC, bitmap`
6666666666666666
6655555005555566
6555555005555556
6555500000055556
6555500000055556
6555555005555556
6555555005555556
6555505005055556
6550500000050556
6500050000500056
6550000000000556
6550000000000556
6500000000000056
6500000000000056
6650000000000566
6666666666666666` ],
  [ kingWhiteDarkC, bitmap`
6666666666666666
6655555225555566
6555555225555556
6555522222255556
6555522222255556
6555555225555556
6555555225555556
6555525225255556
6552522222252556
6522252222522256
6552222222222556
6552222222222556
6522222222222256
6522222222222256
6652222222222566
6666666666666666` ],
  [ kingBlackLight, bitmap`
7777777777777777
7777777007777777
7777777007777777
7777700000077777
7777700000077777
7777777007777777
7777777007777777
7777707007077777
7770700000070777
7700070000700077
7770000000000777
7770000000000777
7700000000000077
7700000000000077
7770000000000777
7777777777777777` ],
  [ kingWhiteLight, bitmap`
7777777777777777
7777777227777777
7777777227777777
7777722222277777
7777722222277777
7777777227777777
7777777227777777
7777727227277777
7772722222272777
7722272222722277
7772222222222777
7772222222222777
7722222222222277
7722222222222277
7772222222222777
7777777777777777` ],
  [ kingBlackDark, bitmap`
5555555555555555
5555555005555555
5555555005555555
5555500000055555
5555500000055555
5555555005555555
5555555005555555
5555505005055555
5550500000050555
5500050000500055
5550000000000555
5550000000000555
5500000000000055
5500000000000055
5550000000000555
5555555555555555` ],
  [ kingWhiteDark, bitmap`
5555555555555555
5555555225555555
5555555225555555
5555522222255555
5555522222255555
5555555225555555
5555555225555555
5555525225255555
5552522222252555
5522252222522255
5552222222222555
5552222222222555
5522222222222255
5522222222222255
5552222222222555
5555555555555555` ],
  //Map
  [ cursor, bitmap`
6666666666666666
6677777777777766
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6677777777777766
6666666666666666`],
  [ DarkC, bitmap`
6666666666666666
6655555555555566
6555555555555556
6555555555555556
6555555555555556
6555555555555556
6555555555555556
6555555555555556
6555555555555556
6555555555555556
6555555555555556
6555555555555556
6555555555555556
6555555555555556
6655555555555566
6666666666666666`],
  [ darkBG, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ lightBG, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ border, bitmap`
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
  //Pon
  [ ponBlackLightC, bitmap`
6666666666666666
6677770000777766
6777700000077776
6777000000007776
6777000000007776
6777700000077776
6777770000777776
6777770000777776
6777770000777776
6777770000777776
6777700000077776
6770000000000776
6700000000000076
6000000000000006
6600000000000066
6666666666666666` ],
  [ ponWhiteLightC, bitmap`
6666666666666666
6677772222777766
6777722222277776
6777222222227776
6777222222227776
6777722222277776
6777772222777776
6777772222777776
6777772222777776
6777772222777776
6777722222277776
6772222222222776
6722222222222276
6222222222222226
6622222222222266
6666666666666666` ],
  [ ponBlackDarkC, bitmap`
6666666666666666
6655550000555566
6555500000055556
6555000000005556
6555000000005556
6555500000055556
6555550000555556
6555550000555556
6555550000555556
6555550000555556
6555500000055556
6550000000000556
6500000000000056
6000000000000006
6600000000000066
6666666666666666` ],
  [ ponWhiteDarkC, bitmap`
6666666666666666
6655552222555566
6555522222255556
6555222222225556
6555222222225556
6555522222255556
6555552222555556
6555552222555556
6555552222555556
6555552222555556
6555522222255556
6552222222222556
6522222222222256
6222222222222226
6622222222222266
6666666666666666` ],
  [ ponBlackLight, bitmap`
7777777777777777
7777770000777777
7777700000077777
7777000000007777
7777000000007777
7777700000077777
7777770000777777
7777770000777777
7777770000777777
7777770000777777
7777700000077777
7770000000000777
7700000000000077
7000000000000007
7700000000000077
7777777777777777` ],
  [ ponWhiteLight, bitmap`
7777777777777777
7777772222777777
7777722222277777
7777222222227777
7777222222227777
7777722222277777
7777772222777777
7777772222777777
7777772222777777
7777772222777777
7777722222277777
7772222222222777
7722222222222277
7222222222222227
7722222222222277
7777777777777777` ],
  [ ponBlackDark, bitmap`
5555555555555555
5555550000555555
5555500000055555
5555000000005555
5555000000005555
5555500000055555
5555550000555555
5555550000555555
5555550000555555
5555550000555555
5555500000055555
5550000000000555
5500000000000055
5000000000000005
5500000000000055
5555555555555555` ],
  [ ponWhiteDark, bitmap`
5555555555555555
5555552222555555
5555522222255555
5555222222225555
5555222222225555
5555522222255555
5555552222555555
5555552222555555
5555552222555555
5555552222555555
5555522222255555
5552222222222555
5522222222222255
5222222222222225
5522222222222255
5555555555555555` ],
  //Castle
  [ castleBlackLightC, bitmap`
6666666666666666
6670070000700766
6770000000000776
6770000000000776
6770000000000776
6770000000000776
6777700000077776
6777700000077776
6777700000077776
6777700000077776
6777700000077776
6770000000000776
6700000000000076
6000000000000006
6600000000000066
6666666666666666` ],
  [ castleWhiteLightC, bitmap`
6666666666666666
6672272222722766
6772222222222776
6772222222222776
6772222222222776
6772222222222776
6777722222277776
6777722222277776
6777722222277776
6777722222277776
6777722222277776
6772222222222776
6722222222222276
6222222222222226
6622222222222266
6666666666666666` ],
  [ castleBlackDarkC, bitmap`
6666666666666666
6650050000500566
6550000000000556
6550000000000556
6550000000000556
6550000000000556
6555500000055556
6555500000055556
6555500000055556
6555500000055556
6555500000055556
6550000000000556
6500000000000056
6000000000000006
6600000000000066
6666666666666666` ],
  [ castleWhiteDarkC, bitmap`
6666666666666666
6652252222522566
6552222222222556
6552222222222556
6552222222222556
6552222222222556
6555522222255556
6555522222255556
6555522222255556
6555522222255556
6555522222255556
6552222222222556
6522222222222256
6222222222222226
6622222222222266
6666666666666666` ],
  [ castleBlackLight, bitmap`
7777777777777777
7770070000700777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7777700000077777
7777700000077777
7777700000077777
7777700000077777
7777700000077777
7770000000000777
7700000000000077
7000000000000007
7700000000000077
7777777777777777` ],
  [ castleWhiteLight, bitmap`
7777777777777777
7772272222722777
7772222222222777
7772222222222777
7772222222222777
7772222222222777
7777722222277777
7777722222277777
7777722222277777
7777722222277777
7777722222277777
7772222222222777
7722222222222277
7222222222222227
7722222222222277
7777777777777777` ],
  [ castleBlackDark, bitmap`
5555555555555555
5550050000500555
5550000000000555
5550000000000555
5550000000000555
5550000000000555
5555500000055555
5555500000055555
5555500000055555
5555500000055555
5555500000055555
5550000000000555
5500000000000055
5000000000000005
5500000000000055
5555555555555555` ],
  [ castleWhiteDark, bitmap`
5555555555555555
5552252222522555
5552222222222555
5552222222222555
5552222222222555
5552222222222555
5555522222255555
5555522222255555
5555522222255555
5555522222255555
5555522222255555
5552222222222555
5522222222222255
5222222222222225
5522222222222255
5555555555555555` ],
  //Knight
  [ horseBlackLightC, bitmap`
6666666666666666
6677770000777766
6777000000077776
6770000000007776
6700700000000776
6700000000000776
6700000000000076
6700000770000076
6700007770000076
6700777770000076
6777777700000006
6777777000000006
6700000000000006
6000000000000006
6600000000000066
6666666666666666` ],
  [ horseWhiteLightC, bitmap`
6666666666666666
6677772222777766
6777222222277776
6772222222227776
6722722222222776
6722222222222776
6722222222222276
6722222772222276
6722227772222276
6722777772222276
6777777722222226
6777777222222226
6722222222222226
6222222222222226
6622222222222266
6666666666666666` ],
  [ horseBlackDarkC, bitmap`
6666666666666666
6655550000555566
6555000000055556
6550000000005556
6500500000000556
6500000000000556
6500000000000056
6500000550000056
6500005550000056
6500555550000056
6555555500000006
6555555000000006
6500000000000006
6000000000000006
6600000000000066
6666666666666666` ],
  [ horseWhiteDarkC, bitmap`
6666666666666666
6655552222555566
6555222222255556
6552222222225556
6522522222222556
6522222222222556
6522222222222256
6522222552222256
6522225552222256
6522555552222256
6555555522222226
6555555222222226
6522222222222226
6222222222222226
6622222222222266
6666666666666666` ],
  [ horseBlackLight, bitmap`
7777777777777777
7777770000777777
7777000000077777
7770000000007777
7700700000000777
7700000000000777
7700000000000077
7700000770000077
7700007770000077
7700777770000077
7777777700000007
7777777000000007
7700000000000007
7000000000000007
7700000000000077
7777777777777777` ],
  [ horseWhiteLight, bitmap`
7777777777777777
7777772222777777
7777222222277777
7772222222227777
7722722222222777
7722222222222777
7722222222222277
7722222772222277
7722227772222277
7722777772222277
7777777722222227
7777777222222227
7722222222222227
7222222222222227
7722222222222277
7777777777777777` ],
  [ horseBlackDark, bitmap`
5555555555555555
5555550000555555
5555000000055555
5550000000005555
5500500000000555
5500000000000555
5500000000000055
5500000550000055
5500005550000055
5500555550000055
5555555500000005
5555555000000005
5500000000000005
5000000000000005
5500000000000055
5555555555555555` ],
  [ horseWhiteDark, bitmap`
5555555555555555
5555552222555555
5555222222255555
5552222222225555
5522522222222555
5522222222222555
5522222222222255
5522222552222255
5522225552222255
5522555552222255
5555555522222225
5555555222222225
5522222222222225
5222222222222225
5522222222222255
5555555555555555` ],
);

const drawBoard = () => {
  for (let x = 1; x < 9; x++) {
    //Builds Light Board
    for (let y = 1; y < 9; y++) {
      clearTile(x, y);
      if (!((((x % 2) == 0) && ((y % 2) == 0)) || ((x % 2) != 0) && ((y % 2) != 0))) {
      if(board[x - 1][y - 1].includes("pb")) {
        //Come back to here
        
          
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, ponBlackLightC);
          } else {
            addSprite(x, y, ponBlackLight);
          }
        
      } else if(board[x - 1][y - 1].includes("pw")) {

          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, ponWhiteLightC);
          } else {
            addSprite(x, y, ponWhiteLight);
          }
        
      } else if(board[x - 1][y - 1].includes("cb")) {

          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, castleBlackLightC);
          } else {
            addSprite(x, y, castleBlackLight);
          }

      } else if(board[x - 1][y - 1].includes("cw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, castleWhiteLightC);
          } else {
            addSprite(x, y, castleWhiteLight);
          }

        
      } else if(board[x - 1][y - 1].includes("hb")) {
            if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, horseBlackLightC);
          } else {
            addSprite(x, y, horseBlackLight);
          }

      } else if(board[x - 1][y - 1].includes("hw")) {
            if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, horseWhiteLightC);
          } else {
            addSprite(x, y, horseWhiteLight);
          }


      } else if(board[x - 1][y - 1].includes("bb")) {
            if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, bishopBlackLightC);
          } else {
            addSprite(x, y, bishopBlackLight);
          }

      } else if(board[x - 1][y - 1].includes("bw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, bishopWhiteLightC);
          } else {
            addSprite(x, y, bishopWhiteLight);
          }
        
      } else if(board[x - 1][y - 1].includes("qb")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, queenBlackLightC);
          } else {
            addSprite(x, y, queenBlackLight);
          }
        
      } else if(board[x - 1][y - 1].includes("qw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, queenWhiteLightC);
          } else {
            addSprite(x, y, queenWhiteLight);
          }
        
      } else if(board[x - 1][y - 1].includes("kb")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, kingBlackLightC);
          } else {
            addSprite(x, y, kingBlackLight);
          }
        
      } else if(board[x - 1][y - 1].includes("kw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, kingWhiteLightC);
          } else {
            addSprite(x, y, kingWhiteLight);
          }
        
      } else {
         addSprite(x, y, lightBG); 
      }
      } else {
      if(board[x - 1][y - 1].includes("pb")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, ponBlackDarkC);
          } else {
            addSprite(x, y, ponBlackDark);
          }

      } else if(board[x - 1][y - 1].includes("pw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, ponWhiteDarkC);
          } else {
            addSprite(x, y, ponWhiteDark);
          }

      } else if(board[x - 1][y - 1].includes("cb")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, castleBlackDarkC);
          } else {
            addSprite(x, y, castleBlackDark);
          }

      } else if(board[x - 1][y - 1].includes("cw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, castleWhiteDarkC);
          } else {
            addSprite(x, y, castleWhiteDark);
          }
        
      } else if(board[x - 1][y - 1].includes("hb")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, horseBlackDarkC);
          } else {
            addSprite(x, y, horseBlackDark);
          }
        
      } else if(board[x - 1][y - 1].includes("hw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, horseWhiteDarkC);
          } else {
            addSprite(x, y, horseWhiteDark);
          }

      } else if(board[x - 1][y - 1].includes("bb")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, bishopBlackDarkC);
          } else {
            addSprite(x, y, bishopBlackDark);
          }

        
      } else if(board[x - 1][y - 1].includes("bw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, bishopWhiteDarkC);
          } else {
            addSprite(x, y, bishopWhiteDark);
          }
        
      } else if(board[x - 1][y - 1].includes("qb")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, queenBlackDarkC);
          } else {
            addSprite(x, y, queenBlackDark);
          }

      } else if(board[x - 1][y - 1].includes("qw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, queenWhiteDarkC);
          } else {
            addSprite(x, y, queenWhiteDark);
          }

        
      } else if(board[x - 1][y - 1].includes("kb")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, kingBlackDarkC);
          } else {
            addSprite(x, y, kingBlackDark);
          }
      } else if(board[x - 1][y - 1].includes("kw")) {
          if (selectedPosition[0] == x && selectedPosition[1] == y) {
            addSprite(x, y, kingWhiteDarkC);
          } else {
           addSprite(x, y, kingWhiteDark);
          }
        
      } else {
         addSprite(x, y, darkBG); 
      }
      }

    }
  }
  if(board[currentPosition[0] - 1][currentPosition[1] - 1] == "-1") { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], cursor);
  } else {
    addSprite(currentPosition[0], currentPosition[1], DarkC);
  }    
}
  else if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("pb")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], ponBlackLightC);
  } else {
    
    addSprite(currentPosition[0], currentPosition[1], ponBlackDarkC);
  }    
}
  if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("pw")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], ponWhiteLightC);
  } else {
    addSprite(currentPosition[0], currentPosition[1], ponWhiteDarkC);
  }    
}
//Castle Cursor
  else if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("cb")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], castleBlackLightC);
  } else {
    
    addSprite(currentPosition[0], currentPosition[1], castleBlackDarkC);
  }    
}
  if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("cw")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], castleWhiteLightC);
  } else {
    addSprite(currentPosition[0], currentPosition[1], castleWhiteDarkC);
  }    
}
//Horse
  else if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("hb")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], horseBlackLightC);
  } else {
    
    addSprite(currentPosition[0], currentPosition[1], horseBlackDarkC);
  }    
}
  if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("hw")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], horseWhiteLightC);
  } else {
    addSprite(currentPosition[0], currentPosition[1], horseWhiteDarkC);
  }    
}
//Bishop
  else if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("bb")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], bishopBlackLightC);
  } else {
    
    addSprite(currentPosition[0], currentPosition[1], bishopBlackDarkC);
  }    
}
  if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("bw")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], bishopWhiteLightC);
  } else {
    addSprite(currentPosition[0], currentPosition[1], bishopWhiteDarkC);
  }    
}
//Queen
  else if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("qb")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], queenBlackLightC);
  } else {
    
    addSprite(currentPosition[0], currentPosition[1], queenBlackDarkC);
  }    
}
  if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("qw")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], queenWhiteLightC);
  } else {
    addSprite(currentPosition[0], currentPosition[1], queenWhiteDarkC);
  }    
}
//King
  else if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("kb")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], kingBlackLightC);
  } else {
    
    addSprite(currentPosition[0], currentPosition[1], kingBlackDarkC);
  }    
}
  if(board[currentPosition[0] - 1][currentPosition[1] - 1].includes("kw")) { 
  if (!((((currentPosition[0] % 2) == 0) && ((currentPosition[1] % 2) == 0)) || ((currentPosition[0] % 2) != 0) && ((currentPosition[1] % 2) != 0))) {
    addSprite(currentPosition[0], currentPosition[1], kingWhiteLightC);
  } else {
    addSprite(currentPosition[0], currentPosition[1], kingWhiteDarkC);
  }    
}
}
let level = 0;
const levels = [
  map`
bbbbbbbbbb
b........b
b........b
b........b
b...c....b
b........b
b........b
b........b
b........b
bbbbbbbbbb`,
];

setBackground(lightBG);
setMap(levels[level]);

setPushables({
  [ cursor ]: [],
});

onInput("w", () => {
  if((currentPosition[1] - 1) == 0) {
    playTune(noSound)
  } else {
    currentPosition[1] = currentPosition[1] - 1
  }
});
onInput("s", () => {
  if((currentPosition[1] + 1) == 9) {
    playTune(noSound)
  } else {
    currentPosition[1] = currentPosition[1] + 1
  }
});
onInput("a", () => {
  if((currentPosition[0] - 1) == 0) {
    playTune(noSound)
  } else {
  currentPosition[0] = currentPosition[0] - 1
  }
});
onInput("d", () => {
  if((currentPosition[0] + 1) == 9) {
    playTune(noSound)
  } else {
  currentPosition[0] = currentPosition[0] + 1
  }
});
onInput("j", () => {
  selectedPosition = [-1, -1];
  currentPiece = undefined;
  if (board[currentPosition[0] - 1][currentPosition[1] - 1] != "-1") {
  selectedPosition = [currentPosition[0], currentPosition[1]]
  currentPiece = board[currentPosition[0] - 1][currentPosition[1] - 1]    
  }
});

onInput("l", () => {
  selectedPosition = [-1, -1];
  currentPiece = undefined;  
});

        
onInput("k", () => {
  if (currentPiece != undefined && selectedPosition != -1) {
  var col = currentPosition[0] 
  var row = currentPosition[1] 
  var newPosition = convertChessMove(row, col)
  var oldCol = selectedPosition[0] 
  var oldRow = selectedPosition[1] 
  var oldPosition = convertChessMove(oldRow, oldCol)
  if (currentPiece[0] != "-1") {
    var currentBoard = chess.ascii()
    var oldCount = 0;
    for (var i = 0; i < chess.ascii().length; i++) {
      if (chess.ascii().charAt(i) === "q" || chess.ascii().charAt(i) === "Q") {
        oldCount += 1;
      }
    }
    
    chess.move({ from: oldPosition, to: newPosition, promotion: "q" })
    var newCount = 0;
    for (var i = 0; i < chess.ascii().length; i++) {
      if (chess.ascii().charAt(i) === "q" || chess.ascii().charAt(i) === "Q") {
        newCount += 1;
      }
    }

    var newBoard = chess.ascii()
    if(currentBoard == newBoard) {
    playTune(noSound)      
    } else {
      console.log(chess.ascii())
    }
  }
  if((selectedPosition != -1) && ((currentBoard != newBoard))) {
  board[selectedPosition[0] - 1][selectedPosition[1] - 1] = "-1"
  if(newCount <= oldCount) {
  board[currentPosition[0] - 1][currentPosition[1] - 1] = currentPiece    
  } else {
    board[currentPosition[0] - 1][currentPosition[1] - 1] = "q" + currentPiece[1] 
  }
  }
  selectedPosition = -1;
  currentPiece = undefined;    
  }

});

afterInput(() => {
  drawBoard();
  clearText();
  if(chess.in_checkmate()) {
    addText("Checkmate", {
      color: color`2`
    })
  }
  else if(chess.in_draw()) {
    addText("Draw", {
      color: color`2`
    })
  }
  else if(chess.in_stalemate()) {
    addText("Stalemate", {
      color: color`2`
    })
  }
  else if(chess.in_threefold_repetition()) {
    console.log("MATE")
    addText("Threefold repetition", {
      color: color`2`
    })
  }
  else if(chess.insufficient_material()) {
    addText("Insufficient Material", {
      color: color`2`
    })
  }
  else if(chess.turn() == "b") {
    addText("Black's Turn", {
      color: color`2`
    })    
  } else if (chess.turn() != "b") {
      addText("White's Turn", {
      color: color`2`
    })   
  }
});

drawBoard();
addText("White's Turn", {
  color: color`2`
})    
