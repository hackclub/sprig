/*
@title: Pokemon Game
@author: ItzShubhamDev
@tags: []
@addedOn: 2024-09-17
*/

const bulbasaur = 'b';
const charmander = 'c';
const squirtle = 's';
const pikachu = 'p';
const geodude = 'g';
const abra = 'a';
const dewgong = 'd';
const weedle = 'w';
const gastly = 'h';
const pidgey = 'y';
const sandshrew = 'r';
const dratini = 'n';
const eevee = 'e';
const ekans = 'k';
const mankey = 'm';
const bg = '0';
const pokeball = '1';
const grass = '2';
const stone = '3';
const hpFull = '4';
const hpHalf = '5';
const hpZero = '6';
const wall = '7';
const whiteTile = '8'; // Just for Help Map

// Add all pokemons variables into an Array for easier access
const pokemons = [bulbasaur, charmander, squirtle, pikachu, geodude, abra, dewgong, weedle, gastly, pidgey, sandshrew, dratini, eevee, ekans, mankey]
// Add all decoration objects variables into an Array for easier access
const objects = [grass, stone, pokeball]
// Pokemon Data for Battles Damage Calculation
const pokemonData = {
  "b": {
    "name": "Bulbasaur",
    "types": [
      "Grass",
      "Poison"
    ],
    "stats": {
      "hp": "45",
      "attack": "49",
      "defense": "49",
      "spAttack": "65",
      "spDefense": "65",
      "speed": "45"
    },
    "moves": {
      "tackle": {
        "name": "Tackle",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "vine-whip": {
        "name": "Vine Whip",
        "type": "Grass",
        "power": "45",
        "accuracy": "100",
        "class": "physical"
      }
    }
  },
  "c": {
    "name": "Charmander",
    "types": [
      "Fire",
      ""
    ],
    "stats": {
      "hp": "39",
      "attack": "52",
      "defense": "43",
      "spAttack": "60",
      "spDefense": "50",
      "speed": "65"
    },
    "moves": {
      "scratch": {
        "name": "Scratch",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "ember": {
        "name": "Ember",
        "type": "Fire",
        "power": "40",
        "accuracy": "100",
        "class": "special"
      }
    }
  },
  "s": {
    "name": "Squirtle",
    "types": [
      "Water",
      ""
    ],
    "stats": {
      "hp": "44",
      "attack": "48",
      "defense": "65",
      "spAttack": "50",
      "spDefense": "64",
      "speed": "43"
    },
    "moves": {
      "tackle": {
        "name": "Tackle",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "water-gun": {
        "name": "Water Gun",
        "type": "Water",
        "power": "40",
        "accuracy": "100",
        "class": "special"
      },
      "rapid-spin": {
        "name": "Rapid Spin",
        "type": "Normal",
        "power": "50",
        "accuracy": "100",
        "class": "physical"
      }
    }
  },
  "w": {
    "name": "Weedle",
    "types": [
      "Bug",
      "Poison"
    ],
    "stats": {
      "hp": "40",
      "attack": "35",
      "defense": "30",
      "spAttack": "20",
      "spDefense": "20",
      "speed": "50"
    },
    "moves": {
      "poison-sting": {
        "name": "Poison Sting",
        "type": "Poison",
        "power": "15",
        "accuracy": "100",
        "class": "physical"
      },
      "bug-bite": {
        "name": "Bug Bite",
        "type": "Bug",
        "power": "60",
        "accuracy": "100",
        "class": "physical"
      }
    }
  },
  "y": {
    "name": "Pidgey",
    "types": [
      "Normal",
      "Flying"
    ],
    "stats": {
      "hp": "40",
      "attack": "45",
      "defense": "40",
      "spAttack": "35",
      "spDefense": "35",
      "speed": "56"
    },
    "moves": {
      "tackle": {
        "name": "Tackle",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "gust": {
        "name": "Gust",
        "type": "Flying",
        "power": "40",
        "accuracy": "100",
        "class": "special"
      }
    }
  },
  "k": {
    "name": "Ekans",
    "types": [
      "Poison",
      ""
    ],
    "stats": {
      "hp": "35",
      "attack": "60",
      "defense": "44",
      "spAttack": "40",
      "spDefense": "54",
      "speed": "55"
    },
    "moves": {
      "wrap": {
        "name": "Wrap",
        "type": "Normal",
        "power": "15",
        "accuracy": "90",
        "class": "physical"
      },
      "poison-sting": {
        "name": "Poison Sting",
        "type": "Poison",
        "power": "15",
        "accuracy": "100",
        "class": "physical"
      },
      "bite": {
        "name": "Fire Fang",
        "type": "Fire",
        "power": "60",
        "accuracy": "90",
        "class": "physical"
      }
    }
  },
  "p": {
    "name": "Pikachu",
    "types": [
      "Electric",
      ""
    ],
    "stats": {
      "hp": "35",
      "attack": "55",
      "defense": "40",
      "spAttack": "50",
      "spDefense": "50",
      "speed": "90"
    },
    "moves": {
      "quick-attack": {
        "name": "Quick Attack",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "electro-ball": {
        "name": "Electro Ball",
        "type": "Electric",
        "power": "30",
        "accuracy": "100",
        "class": "special"
      },
      "thunder-shock": {
        "name": "Thunder Shock",
        "type": "Electric",
        "power": "40",
        "accuracy": "100",
        "class": "special"
      },
      "nuzzle": {
        "name": "Nuzzle",
        "type": "Electric",
        "power": "20",
        "accuracy": "100",
        "class": "physical"
      }
    }
  },
  "r": {
    "name": "Sandshrew",
    "types": [
      "Ground",
      ""
    ],
    "stats": {
      "hp": "50",
      "attack": "75",
      "defense": "85",
      "spAttack": "20",
      "spDefense": "30",
      "speed": "40"
    },
    "moves": {
      "scratch": {
        "name": "Scratch",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "bulldoze": {
        "name": "Bulldoze",
        "type": "Ground",
        "power": "60",
        "accuracy": "100",
        "class": "physical"
      }
    }
  },
  "m": {
    "name": "Mankey",
    "types": [
      "Fighting",
      ""
    ],
    "stats": {
      "hp": "40",
      "attack": "80",
      "defense": "35",
      "spAttack": "35",
      "spDefense": "45",
      "speed": "70"
    },
    "moves": {
      "scratch": {
        "name": "Scratch",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "low-kick": {
        "name": "Low Kick",
        "type": "Fighting",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "covet": {
        "name": "Covet",
        "type": "Normal",
        "power": "60",
        "accuracy": "100",
        "class": "physical"
      },
      "fury-swipes": {
        "name": "Fury Swipes",
        "type": "Normal",
        "power": "18",
        "accuracy": "80",
        "class": "physical"
      }
    }
  },
  "a": {
    "name": "Abra",
    "types": [
      "Psychic",
      ""
    ],
    "stats": {
      "hp": "25",
      "attack": "20",
      "defense": "15",
      "spAttack": "105",
      "spDefense": "55",
      "speed": "90"
    },
    "moves": {
      "confusion": {
        "name": "Confusion",
        "type": "Psychic",
        "power": "50",
        "accuracy": "100",
        "class": "special"
      },
      "charge-beam": {
        "name": "Charge Beam",
        "type": "Electric",
        "power": "50",
        "accuracy": "90",
        "class": "special"
      }
    }
  },
  "g": {
    "name": "Geodude",
    "types": [
      "Rock",
      "Ground"
    ],
    "stats": {
      "hp": "40",
      "attack": "80",
      "defense": "100",
      "spAttack": "30",
      "spDefense": "30",
      "speed": "20"
    },
    "moves": {
      "tackle": {
        "name": "Tackle",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "rollout": {
        "name": "Rollout",
        "type": "Rock",
        "power": "30",
        "accuracy": "90",
        "class": "physical"
      }
    }
  },
  "d": {
    "name": "Dewgong",
    "types": [
      "Water",
      "Ice"
    ],
    "stats": {
      "hp": "65",
      "attack": "45",
      "defense": "55",
      "spAttack": "45",
      "spDefense": "70",
      "speed": "45"
    },
    "moves": {
      "headbutt": {
        "name": "Headbutt",
        "type": "Normal",
        "power": "70",
        "accuracy": "100",
        "class": "physical"
      },
      "icy-wind": {
        "name": "Icy Wind",
        "type": "Ice",
        "power": "55",
        "accuracy": "95",
        "class": "special"
      }
    }
  },
  "h": {
    "name": "Gastly",
    "types": [
      "Ghost",
      "Poison"
    ],
    "stats": {
      "hp": "30",
      "attack": "35",
      "defense": "30",
      "spAttack": "100",
      "spDefense": "35",
      "speed": "80"
    },
    "moves": {
      "lick": {
        "name": "Acid Spray",
        "type": "Poison",
        "power": "40",
        "accuracy": "100",
        "class": "special"
      },
      "payback": {
        "name": "Hex",
        "type": "Ghost",
        "power": "50",
        "accuracy": "90",
        "class": "special"
      }
    }
  },
  "e": {
    "name": "Eevee",
    "types": [
      "Normal",
      ""
    ],
    "stats": {
      "hp": "55",
      "attack": "55",
      "defense": "50",
      "spAttack": "45",
      "spDefense": "65",
      "speed": "55"
    },
    "moves": {
      "tackle": {
        "name": "Tackle",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      },
      "covet": {
        "name": "Covet",
        "type": "Normal",
        "power": "60",
        "accuracy": "100",
        "class": "physical"
      },
      "quick-attack": {
        "name": "Quick Attack",
        "type": "Normal",
        "power": "40",
        "accuracy": "100",
        "class": "physical"
      }
    }
  },
  "n": {
    "name": "Dratini",
    "types": [
      "Dragon",
      ""
    ],
    "stats": {
      "hp": "41",
      "attack": "64",
      "defense": "45",
      "spAttack": "50",
      "spDefense": "50",
      "speed": "50"
    },
    "moves": {
      "wrap": {
        "name": "Wrap",
        "type": "Normal",
        "power": "15",
        "accuracy": "95",
        "class": "physical"
      },
      "twister": {
        "name": "Twister",
        "type": "Dragon",
        "power": "40",
        "accuracy": "100",
        "class": "special"
      }
    }
  }
}
// Type Chart for Effectiveness Calculation
const typeChart = {
  "Normal": {
    "Rock": 0.5,
    "Ghost": 0
  },
  "Fire": {
    "Fire": 0.5,
    "Water": 0.5,
    "Grass": 2,
    "Ice": 2,
    "Bug": 2,
    "Rock": 0.5,
    "Dragon": 0.5
  },
  "Water": {
    "Fire": 2,
    "Water": 0.5,
    "Grass": 0.5,
    "Ground": 2,
    "Rock": 2,
    "Dragon": 0.5
  },
  "Electric": {
    "Water": 2,
    "Electric": 0.5,
    "Grass": 0.5,
    "Ground": 0,
    "Flying": 2,
    "Dragon": 0.5
  },
  "Grass": {
    "Fire": 0.5,
    "Water": 2,
    "Grass": 0.5,
    "Poison": 0.5,
    "Ground": 2,
    "Flying": 0.5,
    "Bug": 0.5,
    "Rock": 2,
    "Dragon": 0.5
  },
  "Ice": {
    "Fire": 0.5,
    "Water": 0.5,
    "Grass": 2,
    "Ice": 0.5,
    "Ground": 2,
    "Flying": 2,
    "Dragon": 2
  },
  "Fighting": {
    "Normal": 2,
    "Ice": 2,
    "Rock": 2,
    "Poison": 0.5,
    "Flying": 0.5,
    "Psychic": 0.5,
    "Bug": 0.5,
    "Ghost": 0
  },
  "Poison": {
    "Grass": 2,
    "Poison": 0.5,
    "Ground": 0.5,
    "Rock": 0.5,
    "Ghost": 0.5
  },
  "Ground": {
    "Fire": 2,
    "Electric": 2,
    "Grass": 0.5,
    "Poison": 2,
    "Flying": 0,
    "Bug": 0.5,
    "Rock": 2
  },
  "Flying": {
    "Electric": 0.5,
    "Grass": 2,
    "Fighting": 2,
    "Bug": 2,
    "Rock": 0.5
  },
  "Psychic": {
    "Fighting": 2,
    "Poison": 2,
    "Psychic": 0.5
  },
  "Bug": {
    "Fire": 0.5,
    "Grass": 2,
    "Fighting": 0.5,
    "Poison": 0.5,
    "Flying": 0.5,
    "Psychic": 2,
    "Ghost": 0.5
  },
  "Rock": {
    "Fire": 2,
    "Ice": 2,
    "Fighting": 0.5,
    "Ground": 0.5,
    "Flying": 2,
    "Bug": 2
  },
  "Ghost": {
    "Normal": 0,
    "Psychic": 2,
    "Ghost": 2
  },
  "Dragon": {
    "Dragon": 2
  }
}

setBackground(bg)

// Pokemon Sprites Credits: https://www.reddit.com/r/pokemon/comments/7w5ghd/all_151_gen_1_pokemon_pixel_art_by_me/
setLegend(
  [bulbasaur, bitmap`
................
................
................
................
................
...........222..
.......22222422.
..222.224444442.
..242224D444D22.
..244444DDDDD2..
..234434CDDD22..
..244444C4DD2...
..2244DD444D2...
...2D44444442...
...2D2442D442...
...2222222222...`],
  [charmander, bitmap`
................
................
................
................
.....999........
....99999.......
...909909.......
...999999...3...
....99999..633..
.....999...663..
....99999..363..
...9.929.9..9...
....92229..9....
....9222999.....
...99..99.......
................`],
  [squirtle, bitmap`
................
................
................
................
......277.......
.....27777......
.....70707......
.....77777......
......777.......
......FFF2C.....
....7FFFF72C....
...77FFF772C....
.....FFFFF2C....
.....FFFFF2C77..
......FFF2C777..
......7..7......
`],
  [pikachu, bitmap`
................
................
.........0......
.........6......
.066.66666......
...6666666......
....606606......
....366663......
....368863.6....
.....6666.66....
..666699666.666.
.....96669..699.
.....96666.69...
....666666C9....
....699996......
...669..666.....
`],
  [geodude, bitmap`
................
................
................
................
................
................
................
................
......111.......
11...11111......
11..1LL1LL1.....
1...1011101.....
11..1111111..11.
..11.1LLL1.1111.
......LLL.......
................
`],
  [abra, bitmap`
................
................
...666666.......
....6666........
....66666....6..
....6666.....6..
...LL66LLL...6..
....LLLLL...L6..
....9LLL9..69L..
....96699.69C...
....69666C9C....
..69666996C.....
.666....666.....
................
................
................
`],
  [dewgong, bitmap`
................
................
................
....2...........
..2222....2.....
.202202..222....
.220222..2222...
.222222L.22112..
..2222L2.111.22.
...LLL222.1..22.
..2222222...221.
112222222222221.
112222111222211.
1.222211111211..
...22221111.....
....222211......
`],
  [weedle, bitmap`
................
................
......2.........
.....22.........
....9999........
...909099.......
...889999.......
...889999.......
....9999........
.....CCC........
....9999........
...F99F9....2...
.....CC99...2...
....F99F9...9...
......CC99999...
......F9F99F....
`],
  [gastly, bitmap`
................
................
......HH........
..H..H...HH.....
....HHHHHH...H..
...HHHHHHHHHH...
..HHH000HHH.....
..HH20002HHHH...
...H22022HHH....
..HH00000HHHH...
...HH000HHHH..H.
....HHHHH.......
..........H.....
................
................
................
`],
  [pidgey, bitmap`
................
................
................
.......C........
....6CC.........
....C666........
...99L2L........
....96LLC.......
....66CCC.......
...666CCCC......
...666CCC6.CC...
...661CC66CCC...
....111666C.....
.....11166......
.....9..9.......
....9.99.9......
`],
  [sandshrew, bitmap`
................
................
................
...66666999.....
....669999......
....7697L.......
....L69L29......
....2992999.....
...69229969C....
...69222699C....
....962699CC..6.
....222229CC66C.
...62222269CCC..
...99222699C....
....9....99.....
..299.....2.....
`],
  [dratini, bitmap`
................
................
................
................
.......22...2...
........22777...
.......2270777..
........2777222.
.......22777222.
..........777...
..........772...
..........722...
....7777..722...
..77222777222...
.772..2222222...
........2222....
`],
  [eevee, bitmap`
................
................
.CC........CC...
CLLC......CLLC..
.CLLC....CLLC...
..CLLC..CLLC....
...CLCCCCLC.....
....CCCCCC.....C
....C0CC0C...CCC
....C0CC0C..CCCC
...2CCCCCC2.CCCC
...22CCCC22C.CC.
....222222CCC...
....C2222CCCC...
....CCCCCCCCC...
....CC.CC..1C...`],
  [ekans, bitmap`
................
................
................
...HHHH.........
..HHH6HH........
..HHHHHH...6....
...88HHH...66...
...HHHH.....6...
.....66.....HH..
.....HH......H..
....8HH11H...H..
...8HH118HH.HH..
...HH888HH8HH...
..H8HHHHH8H1....
..HH88888HH1....
...HHHHHHH1.....`],
  [mankey, bitmap`
................
................
................
................
................
....22....22....
CC.2CC2222CC2.CC
CC.2C222222C2.CC
.C..22222222..C.
..222332332222..
....22383222.CC2
....22222221.C.2
.....222221.222.
....2.2111.2....
....C......C....
...CC.....C.C...
`],
  [bg, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [pokeball, bitmap`
................
................
................
................
................
................
................
................
......3333......
.....333333.....
....33000033....
....00022000....
....00022000....
....22000022....
.....222222.....
......2222......`],
  [grass, bitmap`
................
................
................
.DDDD...........
....DD....DDDD..
.....DD..DD.....
......D..D......
...DD.D..D......
..D..DDD.D......
.D...DDDDDDDD...
.D...DDDDDD.DD..
.D..DDDDDD...D..
...DD.DDDD...D..
..DD.DDDDDDDD.D.
..D..DDDDD..D...
.....DDDDDD.....`],
  [stone, bitmap`
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
................
......111.......
....1111111.....
...111111111....
...111111111....
..111111111111..`],
  [hpFull, bitmap`
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
..CCCCCCCCCCCC..
.C777777777777C.
.C777777777777C.
..CCCCCCCCCCCC..
................
................`],
  [hpHalf, bitmap`
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
..CCCCCCCCCCCC..
.C666666222222C.
.C666666222222C.
..CCCCCCCCCCCC..
................
................`],
  [hpZero, bitmap`
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
..CCCCCCCCCCCC..
.C322222222222C.
.C322222222222C.
..CCCCCCCCCCCC..
................
................`],
  [wall, bitmap`
CCCC2222CCCC2222
CCCC2222CCCC2222
22CCCC2222CCCC22
22CCCC2222CCCC22
2222CCCC2222CCCC
2222CCCC2222CCCC
CC2222CCCC2222CC
CC2222CCCC2222CC
CCCC2222CCCC2222
CCCC2222CCCC2222
22CCCC2222CCCC22
22CCCC2222CCCC22
2222CCCC2222CCCC
2222CCCC2222CCCC
CC2222CCCC2222CC
CC2222CCCC2222CC`],
  [whiteTile, bitmap`
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
2222222222222222`]
);

setSolids([bulbasaur, charmander, squirtle, pikachu, geodude, abra, dewgong, weedle, gastly, pidgey, sandshrew, dratini, eevee, ekans, mankey, wall]);

// Declaring Maps separate instead of Array for Easy Comparision of Maps in further Code
const startMap = map`
.....
.....
.....
1...2`;
const battleMap = map`
.....
.....
.....
.....`;
const groundMap = map`
..........
7777777777
7........7
7........7
7........7
7........7
7........7
7........7
7........7
7777777777`;
const helpMap = map`
88888888888888888888
88...888888888888888
88.b.888888888888888
88...888888888888888
88888888888888888888
8c..1.88888888888888
87777788888888888888
87.p.788888888888888
872..788888888888888
87b.3788888888888888
87777788888888888888
88888888888888888888
88888888888888888888
8.1.4s88888888888888
82....88888888888888
8.....88888888888888
8b4.2388888888888888
88888888888888888888
88888888888888888888
88888888888888888888`;

// Repetitive Colors so declared as variables
const white = color`2`;
const yellow = color`6`;
const black = color`0`;
const gray = color`1`;

setMap(startMap);
let selected = 0; // To get the pokemon from pokemons Array
let selectedMap = startMap; // To check various functionality and other things in further code
let pokeballs = 0; // To store collected pokeballs
let totalBalls = 0; // To store total pokeballs
let collectedMons = 0; // To store defeated pokemons
let totalMons = -1; // To store total pokemons (-1 to ensure actual pokemons count excluding counter and player)
let participant = bulbasaur; // For easier access to pokemons
let opponent = bulbasaur; // For easier access to pokemons
let participantHp = 0; // For easier access to pokemons' Hp
let opponentHp = 0; // For easier access to pokemons' Hp
let state = ''; // Set state for Atk Menu
let selectedMove = ''; // To store the move from atk menu
let groundMapState = ''; // To ensure map persistency of same map after returning from battle
let battleMapState = ''; // To ensure map persistency of same map after showing damages dealt

const pokemonMoves = []; // To store moves for easier access accross various functions
const currentBattleOpponent = [] // To store the coords for battling Pokemon to remove it from map after battle ends

// Just looks cool
addText('Starting Game...', { x: 2, y: 7, color: white })
setTimeout(() => {
  gameStartup(bulbasaur)
}, 1000)

onInput("a", () => {
  if (selectedMap == startMap) {
    changePokemon("a")
  } else if (selectedMap == groundMap) {
    // Movement control
    const p = getFirst(pokemons[selected])
    p.x--;
  } else if (selectedMap == battleMap) {
    let nextState;
    if (state == 'Atk') nextState = 'Flee'
    else if (state == 'Pass') nextState = 'Atk'
    else if (state == 'Flee') nextState = 'Pass'
    if (nextState) menu(nextState)
  }
})

onInput("d", () => {
  if (selectedMap == startMap) {
    changePokemon("d")
  } else if (selectedMap == groundMap) {
    // Movement control
    const p = getFirst(pokemons[selected])
    p.x++;
  } else if (selectedMap == battleMap) {
    // Actions Menu
    let nextState;
    if (state == 'Atk') nextState = 'Pass'
    else if (state == 'Pass') nextState = 'Flee'
    else if (state == 'Flee') nextState = 'Atk'
    if (nextState) menu(nextState)
  }
})

onInput("w", () => {
  if (selectedMap == groundMap) {
    // Movement control
    const p = getFirst(pokemons[selected])
    p.y--;
  } else if (selectedMap == battleMap) {
    // Actions Menu
    if (state == 'Atk') {
      const i = pokemonMoves.indexOf(selectedMove);
      if (i < pokemonMoves.length - 1) {
        selectedMove = pokemonMoves[i + 1]
      } else {
        selectedMove = pokemonMoves[0]
      }
      atkMenu()
    }
  }
})

onInput("s", () => {
  if (selectedMap == groundMap) {
    // Movement control
    const p = getFirst(pokemons[selected])
    p.y++;
  } else if (selectedMap == battleMap) {
    // Moves Menu
    if (state == 'Atk') {
      const i = pokemonMoves.indexOf(selectedMove);
      if (i > 0) {
        selectedMove = pokemonMoves[i - 1]
      } else {
        selectedMove = pokemonMoves[pokemonMoves.length - 1]
      }
      atkMenu()
    }
  }
})

onInput("i", () => {
  if (selectedMap == startMap) {
    startGame()
  } else if (selectedMap == battleMap) {
    // Moves Menu
    if (state == 'Atk') {
      atkMenu()
    } else if (state == 'Pass') {
      selectedMove = 'Pass'
      atk()
    } else if (state == 'Flee') {
      endScreen()
    }
  }
})

onInput("k", () => {
  if (selectedMap == battleMap) {
    // Use selected move
    if (state == 'Atk' && selectedMove.length > 0) {
      atk()
    }
  }
})

onInput("j", () => {
  if (selectedMap == startMap) {
    // One click restart
    if (state == 'End Screen') {
      gameStartup(bulbasaur)
    }
  }
})

onInput("l", () => {
  // Help Menu Related
  if (selectedMap == startMap) {
    setMap(helpMap)
    selectedMap = helpMap
    addHelpText()
  } else if (selectedMap == helpMap) {
    setMap(startMap)
    selectedMap = startMap
    gameStartup(pokemons[selected])
  }
})

afterInput(() => {
  if (selectedMap == groundMap) {
    checkOnPokeball()
    checkNearbyPokemon()
    checkGameEnd()
  }
})

// Start Menu

function gameStartup(p) {
  // Remove all text, add a pokemon and some texts
  clearText()
  clearTile(2, 1)
  addSprite(2, 1, p)
  const name = pokemonData[p].name
  const x = name.length > 8 ? 6 : name.length > 6 ? 7 : 8
  addText("Pick a Pokemon", { x: 3, y: 1, color: white });
  addText("(A / D to Change)", { x: 2, y: 3, color: white });
  addText(name, { x, y: 9, color: white });
  addText("Press I to Start", { x: 2, y: 11, color: white });
  addText("L for Help", { x: 5, y: 14, color: white });
}

function changePokemon(input) {
  // To select a pokemon from various available options
  if (input == 'a') {
    const temp = selected;
    if (selected <= 0) {
      selected = pokemons.length - 1;
    } else {
      selected--;
    }
    setPokemon(pokemons[selected], pokemons[temp]);
  } else if (input == 'd') {
    const temp = selected;
    if (selected < pokemons.length - 1) {
      selected++;
    } else {
      selected = 0;
    }
    setPokemon(pokemons[selected], pokemons[temp]);
  }
}

function setPokemon(n, o) {
  // To set pokemon Sprite
  const old = getFirst(o)
  old.remove()
  addSprite(old.x, old.y, n)
  gameStartup(n)
}

// Help Menu

function addHelpText() {
  // Add all text for Help Menu
  clearText()
  addText('Maps', { x: 3, y: 0, color: black })
  addText('Controls', { x: 9, y: 0, color: yellow })
  addText('  a/d \nPokemon', { x: 9, y: 1, color: gray })
  addText('i Start', { x: 9, y: 3, color: gray })
  addText(' w/a/s/d\n Movement', { x: 8, y: 6, color: gray })
  addText(' w/a/s/d\n Movement', { x: 8, y: 6, color: black })
  addText('w/a/s/d\n  Menu', { x: 9, y: 9, color: gray })
  addText('i - Item\n Select', { x: 9, y: 11, color: gray })
  addText('k - Move\n Select', { x: 9, y: 13, color: gray })
}

// Main Map Area

function startGame() {
  // Prepare the map by removing all text, setting variables, adding Player Pokemon
  clearText()
  setMap(groundMap)
  prepareGroundMap()
  addSprite(1, 8, pokemons[selected])
  selectedMap = groundMap;
}

function prepareGroundMap() {
  // Adds Collectors Sprites, Counters, Objects, Interactable Pokemons
  selected == 0 ? addSprite(0, 0, charmander) : addSprite(0, 0, bulbasaur)
  addSprite(5, 0, pokeball)
  for (let i = 0; i < objects.length; i++) {
    const limit = i == 2 ? random(2, 4) : random(4, 6)
    for (let j = 0; j < limit; j++) {
      const [x, y] = getRandomGroundXY()
      clearTile(x, y)
      addSprite(x, y, objects[i])
    }
  }
  for (let i = 0; i < random(3, 5); i++) {
    const [x, y] = getRandomGroundXY()
    clearTile(x, y);
    const pokemon = pokemons[random(0, pokemons.length - 1)]
    if (pokemon == pokemons[selected]) {
      continue
    }
    addSprite(x, y, pokemon)
  }
  totalBalls = getAll(pokeball).length - 1;
  pokemons.forEach(p => {
    totalMons += getAll(p).length;
  })
  addCounterTexts()
}

function getRandomGroundXY() {
  // Randomizied positions of Objects and Pokemons so that map isn't boring
  let x = random(1, 8)
  let y = random(2, 8)
  if (x == 1 && y == 8) {
    [x, y] = getRandomGroundXY()
  }
  return [x, y]
}

function addCounterTexts() {
  // Adds the counter texts
  clearText()
  addText(`${collectedMons} / ${totalMons}`, { x: 4, y: 0, color: collectedMons == totalMons ? yellow : white })
  addText(`${pokeballs} / ${totalBalls}`, { x: 12, y: 0, color: pokeballs == totalBalls ? yellow : white })
}

function checkOnPokeball() {
  // Checks if the player pokemon is on a pokeball and updates the counter
  const p = getFirst(pokemons[selected])
  const sprites = getTile(p.x, p.y)
  for (const sprite of sprites) {
    if (sprite.type == pokeball) {
      sprite.remove()
      pokeballs++;
      clearText()
      addCounterTexts()
    }
  }
}

function checkNearbyPokemon() {
  // Checks if in an area of 9*9 of interactable pokemon to start battle
  const p = getFirst(pokemons[selected]);
  const [x, y] = [p.x, p.y];
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      const sprites = getTile(i, j)
      for (const sprite of sprites) {
        if (pokemons.includes(sprite.type) && sprite.type != pokemons[selected]) {
          currentBattleOpponent.length = 0;
          currentBattleOpponent.push(sprite.x, sprite.y);
          startBattle(pokemons[selected], sprite.type)
          break
        }
      }
    }
  }
}

function saveGroundMap() {
  // Store the maps objects and pokemons to ensure persistent map after battle with one pokemon
  let map = ''
  for (let i = 0; i < 10; i++) {
    let y = ''
    for (let j = 0; j < 10; j++) {
      let x = '.'
      const sprites = getTile(j, i)
      sprites.forEach(s => {
        x = s.type
      })
      y += x
    }
    map += `${y}\n`
  }
  groundMapState = map
}

function loadSavedGroundMap() {
  // Load all the saved objects and pokemons after a battle
  let m, n;
  if (currentBattleOpponent.length == 2) {
    [m, n] = currentBattleOpponent
  }
  clearText()
  setMap(groundMap)
  selectedMap = groundMap
  addCounterTexts()
  const yAxis = groundMapState.split('\n')
  for (let y = 0; y < yAxis.length; y++) {
    for (let x = 0; x < yAxis[y].length; x++) {
      clearTile(x, y)
      if (m == x && n == y) continue
      addSprite(x, y, yAxis[y][x])
    }
  }
  const p = getFirst(pokemons[selected]);
  if (!p) addSprite(1, 8, pokemons[selected])
}

// Battle

function startBattle(c, o) {
  // Initiates a battle adds Participant and Opponent Pokemon, various objects for decoration and HP Bars and Values
  saveGroundMap()
  clearText()
  setMap(battleMap);
  selectedMap = battleMap;
  participant = c;
  opponent = o;
  participantHp = parseInt(pokemonData[c]['stats']['hp'])
  opponentHp = parseInt(pokemonData[o]['stats']['hp'])
  addSprite(1, 2, c)
  addSprite(3, 1, o)
  addText('v/s', { x: 9, y: 8, color: white })
  setTimeout(() => {
    getTile(1, 2)[0].remove()
    getTile(3, 1)[0].remove()
    clearText()
    addObjectsToBattleMap(5);
    addSprite(0, 3, c)
    addSprite(4, 0, o)
    menu('Atk')
  }, 2000)
}

function addObjectsToBattleMap(c) {
  // Adds various objects across the battle map just for decoration
  for (let i = 0; i < c; i++) {
    const j = random(0, objects.length - 1)
    const [x, y] = getRandomXY()
    const bgs = getAll(bg);
    const len = getAll(objects[j]).length;
    if (len >= 2) {
      continue
    }
    clearTile(x, y)
    addSprite(x, y, objects[j])
  }
}

function getRandomXY() {
  // Returns Random X and Y coords for placement of objects
  let x = random(0, 4)
  let y = random(0, 3)
  if (x == 0 && y == 3 || x == 4 && y == 0 || x == 1 && y == 3 || x == 3 && y == 0) {
    [x, y] = getRandomXY()
  }
  return [x, y]
}

function menu(s) {
  // Interaction Menu to Choose what the Pokemon Does
  clearText();
  const states = ['Atk', 'Pass', 'Flee']
  const posX = { 'Atk': 1, 'Pass': 5, 'Flee': 10 }
  states.forEach(state => {
    addText(state, { x: posX[state], y: 12, color: state == s ? yellow : white })
  })
  state = s;
  hpBars()
}

function hpBars() {
  // Place Hp Bars and Values near the pokemons
  const p1 = pokemonData[participant]
  const p2 = pokemonData[opponent]
  let pBar, oBar;
  const hp1 = parseInt(p1['stats']['hp'])
  const hp2 = parseInt(p2['stats']['hp'])
  hp1Percent = (participantHp / hp1) * 100;
  hp2Percent = (opponentHp / hp2) * 100;
  if (hp1Percent >= 50) pBar = hpFull
  else if (hp1Percent >= 20) pBar = hpHalf
  else pBar = hpZero
  if (hp2Percent >= 50) oBar = hpFull
  else if (hp2Percent >= 20) oBar = hpHalf
  else oBar = hpZero
  clearTile(1, 3)
  clearTile(3, 0)
  addSprite(1, 3, pBar)
  addSprite(3, 0, oBar)
  addText(`HP: ${participantHp}`, { x: 4, y: 13, color: white })
  addText(`HP: ${opponentHp}`, { x: 10, y: 1, color: white })
}

function atkMenu() {
  // Show the Moves of the Pokemon
  if (state == 'Atk') {
    clearText()
    menu('Atk')
    const pokemon = pokemonData[participant]
    const moves = pokemon.moves
    const keys = Object.keys(moves)
    if (selectedMove.length == 0) selectedMove = moves[keys[0]].name;
    for (let i = 0; i < keys.length; i++) {
      const mv = moves[keys[i]]
      const y = 12 - (i + 1) * 2
      addText(mv.name, { x: 1, y, color: mv.name == selectedMove ? yellow : white })
      if (!pokemonMoves.includes(mv.name)) pokemonMoves.push(mv.name)
    }
  }
}

function atk() {
  // Main Atk function responsible for damage calculation, damage display, switching back to Main Map after battle ending, etc.
  const mv = selectedMove;
  const p1 = pokemonData[participant]
  const p2 = pokemonData[opponent]
  const p1Moves = []
  for (const [key, value] of Object.entries(p1['moves'])) {
    p1Moves.push(value)
  }
  let p1Move = {},
    p1HitCheck = false;
  if (mv != "Pass") {
    p1Move = p1Moves.filter(m => m['name'] == mv)[0];
    p1HitCheck = checkAccuracyResult(parseInt(p1Move['accuracy']) / 100)
  }
  const p2Moves = []
  for (const [key, value] of Object.entries(p2['moves'])) {
    p2Moves.push(value)
  }
  const p2Move = p2Moves[random(0, p2Moves.length - 1)];
  const p2HitCheck = checkAccuracyResult(parseInt(p2Move['accuracy']) / 100)
  let p1Dmg = 0,
    p2Dmg = 0;
  let eff1 = 1,
    eff2 = 1
  if (p1HitCheck) {
    const [t1, t2] = p2['types']
    eff1 = calculateEffectiveness(p1Move['type'], t1, t2)
    if (p1Move['class'] == "physical") {
      p1Dmg = calculateDmg(parseInt(p1['stats']['attack']), parseInt(p2['stats']['defense']), parseInt(p1Move['power']), eff1)
    } else {
      p1Dmg = calculateDmg(parseInt(p1['stats']['spAttack']), parseInt(p2['stats']['spDefense']), parseInt(p1Move['power']), eff1)
    }
  }
  if (p2HitCheck) {
    const [t1, t2] = p1['types']
    eff2 = calculateEffectiveness(p2Move['type'], t1, t2)
    if (p2Move['class'] == "physical") {
      p2Dmg = calculateDmg(parseInt(p2['stats']['attack']), parseInt(p1['stats']['defense']), parseInt(p2Move['power']), eff2)
    } else {
      p2Dmg = calculateDmg(parseInt(p2['stats']['spAttack']), parseInt(p1['stats']['spDefense']), parseInt(p2Move['power']), eff2)
    }
  }
  if (p1['speed'] >= p2['speed']) {
    if (opponentHp - p1Dmg > 0) {
      opponentHp -= p1Dmg
      participantHp - p2Dmg > 0 ? participantHp -= p2Dmg : participantHp = 0;
    } else {
      opponentHp = 0
    }
  } else {
    if (participantHp - p2Dmg > 0) {
      participantHp -= p2Dmg
      opponentHp - p1Dmg > 0 ? opponentHp -= p1Dmg : opponentHp = 0;
    } else {
      participantHp = 0
    };
  }
  const winner = checkBattleWinner()
  if (winner) {
    if (winner == participant) {
      clearText()
      setMap(battleMap)
      selectedMap = battleMap
      collectedMons += 1
      addText('You Won the Battle \nSending To Ground', { x: 1, y: 4, color: yellow })
      setTimeout(() => {
        loadSavedGroundMap()
        checkGameEnd()
      }, 2000)
    } else {
      endScreen()
    }
    return;
  }
  saveBattleMap()
  setMap(battleMap)
  selectedMap = battleMap
  p1MoveName = mv != 'Pass' ? p1Move['name'] : 'None'
  const pass = mv == 'Pass';
  setMovesText(p1['name'], p2['name'], p1MoveName, p2Move['name'], eff1, eff2, p1Dmg, p2Dmg, pass, !p1HitCheck, !p2HitCheck)
  setTimeout(() => {
    loadSavedBattleMap()
    menu('Atk')
  }, 4000)
}

function checkAccuracyResult(acc) {
  // For Accuracy Based Moves
  return Math.random() < acc;
}

function setMovesText(p1, p2, m1, m2, eff1, eff2, d1, d2, pass, miss1, miss2) {
  // Display of Damage Dealt and the move's effectiveness
  clearText()
  let eff1Text, eff2Text;
  if (eff1 < 1) eff1Text = "not very effective"
  else if (eff1 > 1) eff1Text = "super effective"
  if (eff2 < 1) eff2Text = "not very effective"
  else if (eff2 > 1) eff2Text = "super effective"
  let text1, text2;
  if (eff1Text) text1 = `${p1} used \n${m1}, \nit inflicted \n${d1} damage. \nIt is \n${eff1Text}`
  else text1 = `${p1} used \n${m1}, \nit inflicted \n${d1} damage.`
  if (miss1) text1 = `${p1} used \n${m1}, \n but it missed`
  if (pass) text1 = `${p1} skipped.`
  if (eff2Text) text2 = `${p2} used \n${m2}, \nit inflicted \n${d2} damage. \nIt is \n${eff2Text}`
  else text2 = `${p2} used \n${m2}, \nit inflicted \n${d2} damage.`
  if (miss2) text2 = `${p2} used \n${m2}, \n but it missed`
  addText(text1, { x: 1, y: 7, color: yellow })
  addText(text2, { x: 1, y: 0, color: yellow })
}

function checkBattleWinner() {
  // For ending the game if someone's hp is 0
  if (participantHp == 0) {
    return opponent
  } else if (opponentHp == 0) {
    return participant
  }
}

function saveBattleMap() {
  // Saving to load the contents after showing damage
  let map = ''
  for (let i = 0; i < 4; i++) {
    let y = ''
    for (let j = 0; j < 5; j++) {
      let x = '.'
      const sprites = getTile(j, i)
      sprites.forEach(s => {
        x = s.type
      })
      y += x
    }
    map += `${y}\n`
  }
  battleMapState = map
}

function loadSavedBattleMap() {
  // Loading from saves after damage dealt screen
  const yAxis = battleMapState.split('\n')
  for (let y = 0; y < yAxis.length; y++) {
    for (let x = 0; x < yAxis[y].length; x++) {
      clearTile(x, y)
      addSprite(x, y, yAxis[y][x])
    }
  }
}

// Game End

function checkGameEnd() {
  // Check if Player completed all task
  if (collectedMons == totalMons && pokeballs == totalBalls) {
    endScreen(true)
  }
}

function endScreen(won) {
  // Ending Screen Depending on User Won or Lost
  clearText()
  setMap(startMap)
  selectedMap = startMap
  addSprite(2, 1, pokemons[selected])
  const text = won ? "Congratulations! \n    You Won" : "Sorry! You Lost"
  addText(text, { x: 3, y: 3, color: yellow })
  state = 'End Screen'
  addText('Press J to Play \n   Again', { x: 2, y: 9, color: white })
}

// Utilities

function random(min, max) {
  // Was to be Used Many Times so Created a Function
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function calculateEffectiveness(attackType, t1, t2) {
  // To calculate move Effectiveness against a type
  let effectiveness = 1.0;
  if (typeChart[attackType] && typeChart[attackType][t1]) {
    effectiveness *= typeChart[attackType][t1];
  }
  if (t2 && t2.length > 0 && typeChart[attackType] && typeChart[attackType][t2]) {
    console.log(typeChart[attackType][t2])
    effectiveness *= typeChart[attackType][t2];
  }
  /* 
    Extra part because idk why if (typeChart[attackType] && typeChart[attackType][t1]) was not executing when
    typeChart[attackType][t1] was 0
  */
  try {
    if (typeChart[attackType][t1] == 0 || t2 && t2.length > 0 && typeChart[attackType][t2] == 0) effectiveness = 0;
    return effectiveness;
  } catch {
    return effectiveness
  }
}

function calculateDmg(atk, def, power, eff) {
  // Damage Calculation, made many modifications to original formula to ensure some good numbers 
  const atkDefModifier = atk / def;
  let powerModifier = 1;
  if (power < 20) powerModifier = 2
  const intitialDamage = (2 * 1 * 1 / 5) + 2
  const atkDefDamage = (intitialDamage * power * powerModifier * atkDefModifier / 50) + random(5, 10)
  const finalDamage = atkDefDamage * eff
  return Math.ceil(finalDamage);
}
