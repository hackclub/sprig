/*
@title: spriggy_morse
@author: Srishti Pandey
@tags: []
@addedOn: 2023-01-29
*/

const dot = "d";
const dash = "s";
const dot_s = "e";
const dash_s = "t";
const hc = "h";

setLegend(
    [
        dot,
        bitmap`
................
................
.....555555.....
...5555555555...
...5555555555...
..556555556555..
..556555556555..
..556555556555..
..556556556555..
..556565656555..
..556655566555..
...5655555655...
...5555555555...
.....555555.....
................
................`,
    ],
    [
        dash,
        bitmap`
.....666666.....
.......66.......
.......66.......
.......66.......
.....666666.....
................
................
5555555555555555
5555555555555555
5555555555555555
................
................
................
................
................
................`,
    ],
    [
        dot_s,
        bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..336333336333..
..336333336333..
..336333336333..
..336336336333..
..336363636333..
..336633366333..
...3633333633...
...3333333333...
.....333333.....
................
................`,
    ],
    [
        dash_s,
        bitmap`
.....666666.....
.......66.......
.......66.......
.......66.......
.....666666.....
................
................
3333333333333333
3333333333333333
3333333333333333
................
................
................
................
................
................`,
    ],

    [
        hc,
        bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3332233333333333
3332233333333333
3332233333333333
3332233333333333
3332233333333333
3332222222233333
3332222222233333
3332233332233333
3332233332233333
3332233332233333
3332233332233333
3332233332233333`,
    ]
);

const melodies = [
    tune`
500: c5/500,
15500`,
    tune`
500: c5~500 + b4~500 + d5~500,
15500`,
];

const morseCode = {
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",
    " ": "/",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    0: "-----",
};

let words = [
    "hc",
    "hack",
    "clubbers",
    "sam",
    "zach",
    "christina",
    "kara",
    "dev",
    "hackathon",
    "epoch",
    "assemble",
    "opensource",
    "orpheus",
    "prophet",
];
let word = words[Math.floor(Math.random() * words.length)];

let mcode = "";
let usr_word = "";

const levels = [
    map`
...
d.s
...`,
    map`
h..
...
...`,
];

setMap(levels[0]);

addText(word, {
    x: 7,
    y: 2,
    color: color`D`,
});

function morseToChar(code) {
    for (const [key, value] of Object.entries(morseCode)) {
        if (value == code) {
            return key;
        }
    }

    return;
}

onInput("w", () => {
    clearTile(0, 1);
    addSprite(0, 1, dot_s);
    clearTile(2, 1);
    addSprite(2, 1, dash);

    playTune(melodies[0]);
    mcode += ".";
});

onInput("i", () => {
    clearTile(2, 1);
    addSprite(2, 1, dash_s);
    clearTile(0, 1);
    addSprite(0, 1, dot);

    playTune(melodies[1]);
    mcode += "-";
});

onInput("k", () => {
    clearTile(2, 1);
    addSprite(2, 1, dash);
    clearTile(0, 1);
    addSprite(0, 1, dot);

    let usr_word_l = morseToChar(mcode);
    if (usr_word_l) {
        usr_word += usr_word_l;
    } else {
        addText("Invalid char!", {
            x: 3,
            y: 11,
            color: color`3`,
        });
    }
    mcode = "";
    addText("                           ", { x: 2, y: 13, color: color`9` });
});

afterInput(() => {
    addText(mcode, { x: 2, y: 13, color: color`9` });

    if (usr_word != word) {
        addText(usr_word, {
            x: 7,
            y: 3,
            color: color`H`,
        });
    } else {
        clearText();
        setMap(levels[1]);

        addText("Yay!", {
            x: 2,
            y: 10,
            color: color`5`,
        });
        addText("You learned", {
            x: 2,
            y: 11,
            color: color`7`,
        });
        addText("some morse!", {
            x: 2,
            y: 12,
            color: color`7`,
        });
    }
});
