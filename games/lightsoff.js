import { init } from "../engine/gamelab_functions.js";

const canvas = document.querySelector(".lightsoff");

const {
    setScreenSize,
    setLegend,
    addLayer,
    setTile,
    getTile,
    addTile,
    clearTile,
    everyTile,
    tileContains,
    addRule,
    onTileCollision,
    onTileInput,
    makeSolid,
    makePushable,
    replace,
    afterInput,
    getTileGrid,
    getTileAll,
    clear,
    setZOrder,
    sprite,
    start
} = init(canvas);

setScreenSize(500, 500);

const solid = l => Array.from({ length: 16 }, () => Array(16).fill(l).join("")).join("\n");
const [sel1, sel2] = (() => {
    const mk = () => solid(".").split("\n").map(s => s.split(""));
    const a = mk();
    const b = mk();

    for(
        let i = 0, d = [1, 0], pos = [0, 0];
        i < (16 * 4) - 4;
        i++
    ) {
        (i % 2 ? a : b)[pos[1]][pos[0]] = "1"
        pos[0] += d[0];
        pos[1] += d[1];
        // If at a corner rotate 90°
        if((pos[0] === 0 || pos[0] === 15) && (pos[1] === 0 || pos[1] === 15)) {
            d = [-d[1], d[0]];
        }
    }

    return [a, b].map(a => a.map(s => s.join("")).join("\n")).map(s => sprite(s));
})();

const objectMap = {
    0: sprite(solid("1")),
    1: sprite(solid("0")),
    a: sprite(solid("b")),
    s: sel1,
    t: sel2
};
setLegend(objectMap)

let level = 0;

const lr = [
    `
    11111
    11a11
    1aaa1
    11a11
    11111
    `,
    `
    1111a
    111aa
    1111a
    11111
    11111
    `,
    `
    11111
    11111
    11111
    a111a
    aa1aa
    `,
    `
    aa1aa
    1aaa1
    1aaa1
    11a11
    11111
    `,
    `
    1a111
    aa111
    1aaa1
    aa111
    1a111
    `,
    `
    a111a
    1a1a1
    1a1a1
    11111
    11111
    `,
    `
    aaa11
    aaa11
    a1aa1
    aaa11
    aaa11
    `,
    `
    aa111
    11aa1
    11a11
    1a1a1
    aa1aa
    `
];


const levels = lr.map(l =>
    [
        Array(7).fill("0").join(""),
        ...(l.trim().split("\n").map(s => "0" + s.trim() + "0")),
        Array(7).fill("0").join("")
    ].join("\n")
);

addLayer(levels[level])
addLayer(`
    .......
    .s.....
    .......
    .......
    .......
    .......
    .......
`);

setZOrder(["s", "t", "0", "1", "a"]);

const getPlayer = () => getTileAll("s")[0] ?? getTileAll("t")[0];

// Animate player
setInterval(() => {
    // const t1 = getTileAll("s")[0];
    // if(t1) {
    //     t1.remove();
    //     addTile(t1.x, t1.y, "t");
    // } else {
    //     const t2 = getTileAll("t")[0];
    //     t2.remove();
    //     addTile(t2.x, t2.y, "s");
    // }
    if (!replace("t", "s")) replace("s", "t");
}, 500)

onTileInput("up", _ => {
    let p = getPlayer();
    if(p.y > 1) p.y -= 1;
})

onTileInput("down", _ => {
    let p = getPlayer();
    if(p.y < 5) p.y += 1;
})

onTileInput("left", _ => {
    let p = getPlayer();
    if(p.x > 1) p.x -= 1;
})

onTileInput("right", _ => {
    let p = getPlayer();
    if(p.x < 5) p.x += 1;
})

onTileInput("action0", _ => {
    let p = getPlayer();
    console.log(p);
    [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]]
        .map(([x, y]) =>
            getTile(p.x + x, p.y + y)
                .find(t => t.type === "1" || t.type === "a"))
        .filter(t => t)
        .forEach(t => {
            t.remove();
            addTile(t.x, t.y, t.type === "1" ? "a" : "1")
        });

    if(getTileAll("1").length === 25) {
        if(level === levels.length - 1) {
            alert("You won!");
        } else {
            setTimeout(() => {
                Object.values(getTileGrid()).flat().filter(t => t.type !== "s" && t.type !== "t").forEach(t => t.remove());
                addLayer(levels[++level]);
            }, 250);
        }
    }
});

start();