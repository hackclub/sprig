import { baseEngine } from "../engine/baseEngine.js"
import { iterateReader } from "https://deno.land/std@0.162.0/streams/conversion.ts";

async function spadeRun(path) {
  const p = Deno.run({
    cmd: ["./spade", path],
    stdout: "piped",
    stdin: "piped"
  });

  await new Promise(res => setTimeout(res, 100));

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return {
    out: iterateReader(p.stdout),
    simKey: key => p.stdin.write(encoder.encode(key + '\n')),
    cleanup: () => p.close(),
  };
}

// for (const slug of gameSlugs)
//   await testScript(slug);

async function main() {
  for await (const dirEntry of Deno.readDir('../games')) {
    const name = dirEntry.name;
    const isJS = name.slice(-3) === ".js";
    if (!isJS) return;
    testScript(name);
  }
}

main();

async function stubbornFetch(url) {
  try {
    const req = await fetch(url);
    return await req.text();
  } catch {
    return await stubbornFetch(url);
  }
}

async function testScript(name) {
  // const url = "https://raw.githubusercontent.com/hackclub/sprig/main/games/"+slug;
  // const script = `"use strict";` + await stubbornFetch(url);
  const script = await Deno.readTextFile(`../games/${name}`);

  const { api, cleanup, simulateKey } = simEngine();

  /* generate simulated inputs */
  const choose = arr => arr[Math.floor(Math.random() * arr.length)];
  const shakespeareMonKeys = [...Array(1000)].map(_ => choose("wasdjilk".split('')));
  // const shakespeareMonKeys = [...Array(10)].map(_ => choose("wasdjilk".split('')));

  try {
    const fn = new Function(...Object.keys(api), script);

    fn(...Object.values(api)); /* init */

    for (const key of shakespeareMonKeys) {
      simulateKey(key);
      console.log(`<<< pressing ${key} >>>`);
      console.log(gridToString(api));
    }
  } catch(e) {
    cleanup();
    console.log(`ERROR WHILE RUNNING "${name}"`);
    throw e;
  }

  cleanup();
}

function gridToString(api) {
  const w = api.width()
  const h = api.height()
  /* +1 is for newline */
  const grid = [...Array((w + 1) * h)].fill('.');
  for (let y = 0; y < h; y++) grid[y*(w + 1) + w] = '\n';
  for (const [s] of api.getGrid())
    if (s)
      grid[s.y*(w + 1) + s.x] = s.type;

  return grid.join('').trim();
}

function simEngine() {
  let { api, state } = baseEngine();

  let intervals = [];
  let timeouts = [];

  timeouts.forEach(clearTimeout);
  timeouts = [];
  api.setTimeout = (fn, n) => {
      const t = setTimeout(fn, n);
      timeouts.push(t);
      return t;
  }

  intervals.forEach(clearInterval);
  intervals = [];
  api.setInterval = (fn, n) => {
    const i = setInterval(fn, n);
    intervals.push(i);
    return i;
  };

  let tileInputs = {
    w: [],
    s: [],
    a: [],
    d: [],
    i: [],
    j: [],
    k: [],
    l: [],
  };
  let afterInputs = [];
  function onInput(type, fn) {
    if (!(type in tileInputs)) throw new Error(
      `Unknown input key, "${type}": expected one of ${VALID_INPUTS.join(', ')}`
    )
    tileInputs[type].push(fn);
  };
  function afterInput(fn) {
    afterInputs.push(fn);
  };

  api = {
    /* you literally shouldn't use this */
    getState: () => { throw new Error(" BAD! NO! ") },

    /* not implementing these */
    playTune: () => {},
    setScreenSize: () => {}, /* didn't even know this was still in the API */
    setBackground: (type) => {},

    /* will simulate input into these */
    onInput, afterInput,

    /* actually kind of need this one */
    setLegend: (...bitmaps) => {
      bitmaps.forEach(([ key, value ]) => {
        if (key.length !== 1) throw new Error(`Bitmaps must have one character names.`);
      })
      state.legend = bitmaps;
    },
    ...api,

    /* gotta do watchu gotta do */
    console: { log: () => {} }
  };

  return {
    api,
    cleanup: () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      intervals = [];
      timeouts = [];
    },
    simulateKey: key => {
      const VALID_INPUTS = ["w", "a", "s", "d", "i", "j", "k", "l"];
      if (!VALID_INPUTS.includes(key)) return;

      for (const valid_key of VALID_INPUTS)
        if (key == valid_key)
          tileInputs[key].forEach(fn => fn());

      afterInputs.forEach(f => f());

      state.sprites.forEach(s => {
        s.dx = 0;
        s.dy = 0;
      })
    }
  }
}
