import { baseEngine } from "npm:sprig@latest/base";
import { iterateReader } from "https://deno.land/std@0.162.0/streams/conversion.ts";
import * as pathUtils from "https://deno.land/std/path/mod.ts";

async function spadeRun(path) {
  const H = Deno.env.get("HOME");
  const p = Deno.run({
    cmd: [H + "/spade/pc_build/spade", H + "/sprig/games/" + path],
    stdout: "piped",
    stdin: "piped"
  });

  /* feels like this is necessary, to get 'er warmed up */
  await new Promise(res => setTimeout(res, 100));

  async function *mapReader() {
    const decoder = new TextDecoder();

    for await (const out of iterateReader(p.stdout))
      yield decoder.decode(out).trim();
  }

  const encoder = new TextEncoder();
  return {
    out: mapReader(),
    simKey: key => p.stdin.write(encoder.encode(key + '\n')),
    cleanup: () => p.close(),
  };
}

// for (const slug of gameSlugs)
//   await testScript(slug);

let brokenGames = [];
const SKIP = ["mandelbrot.js"];
const ONLY = [];

async function main() {
  brokenGames = [];
  const tasks = [];
  for await (const dirEntry of Deno.readDir('./games')) {
    const name = dirEntry.name;

    if (ONLY.length > 0) {
      if (ONLY.some(x => x === name)) {
        console.log("running", name);
        await testScriptJS(name);
      }
      continue;
    }

    const isJS = name.slice(-3) === ".js";
    if (!isJS || SKIP.some(x => x === name)) continue;
    console.log("running", name);
    tasks.push((async () => {
      const i = setInterval(() => console.log(name + ' is still running'), 10000);
      await testScriptJS(name);
      clearInterval(i);
    })());
  }
  await Promise.all(tasks);

  console.log("broken games:", brokenGames);
  for (const { error, name } of brokenGames)
    console.log(` --- ${name} ---\n` + error);
  console.log("number of broken games:", brokenGames.length);

  return brokenGames;
}

main();

async function testScript(name) {
  const script = await Deno.readTextFile(`./games/${name}`);

  const { api, cleanup, simulateKey } = simEngine();

  /* generate simulated inputs */
  const choose = arr => arr[Math.floor(Math.random() * arr.length)];
  const shakespeareMonKeys = [...Array(1000)].map(_ => choose("wasdjilk".split('')));

  const spade = await spadeRun(name);
  try {
    const compareMaps = async () => {
      const spadeMap = (await spade.out.next()).value;
      const sprigMap = gridToString(api);

      if (spadeMap != sprigMap) {
        const text = `maps different!\nsprig map:\n${sprigMap}\nspade map:\n${spadeMap}`;
        throw new Error(text);
      }
    }

    console.log(`running ${name}!`);
    const fn = new Function(...Object.keys(api), script);
    fn(...Object.values(api)); /* init */

    for (const key of shakespeareMonKeys) {
      await compareMaps();
      simulateKey(key);
      await spade.simKey(key);
      // if (log) console.log(`<<< pressing ${key} >>>`);
      // if (log) console.log(gridToString(api));
    }
  } catch(e) {
    console.log(`ERROR WHILE RUNNING "${name}"`);
    brokenGames.push({
      name,
      error: e
    })
  }
  finally {
    cleanup();
    spade.cleanup();
  }
}

async function testScriptJS(name) {
  const script = await Deno.readTextFile(`./games/${name}`);

  const { api, cleanup, simulateKey } = simEngine();

  /* generate simulated inputs */
  const choose = arr => arr[Math.floor(Math.random() * arr.length)];
  const shakespeareMonKeys = [...Array(1000)].map(_ => choose("wasdjilk".split('')));

  try {
    console.log(`running ${name}!`);
    const fn = new Function(...Object.keys(api), script);
    fn(...Object.values(api)); /* init */

    for (const key of shakespeareMonKeys) {
      simulateKey(key);
    }
  } catch(e) {
    console.log(`ERROR WHILE RUNNING "${name}"`);
    brokenGames.push({
      name,
      error: e
    });
  } finally {
    cleanup();
  }
}

function gridToString(api) {
  const w = api.width()
  const h = api.height()
  const max_z = Math.max(...api.getGrid().map(x => x.length));
  return new Array(h).fill(0).map((_, y) => (
    new Array(max_z).fill(0).map((_, z) => (
      new Array(w).fill(0).map((_, x) => {
        const tile = api.getTile(x, y).reverse()[z];
        return (tile) ? tile.type : '.';
      }).join('')
    )).join('|')
  )).join('\n');
}

function simEngine() {
  let { api, state } = baseEngine();

  let intervals = [];
  let timeouts = [];

  timeouts.forEach(clearTimeout);
  timeouts = [];
  api.setTimeout = () => {};
  // api.setTimeout = (fn, n) => {
  //     const t = setTimeout(fn, n);
  //     timeouts.push(t);
  //     return t;
  // }

  intervals.forEach(clearInterval);
  intervals = [];
  api.setInterval = () => {};
  // api.setInterval = (fn, n) => {
  //   const i = setInterval(fn, n);
  //   intervals.push(i);
  //   return i;
  // };

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

  let jsr = 0x5EED;
  const random = () => {
    jsr^=(jsr<<17);
    jsr^=(jsr>>13);
    jsr^=(jsr<<5);
    return (jsr>>>0)/4294967295;
  };
  api = {
    /* you literally shouldn't use this */
    getState: () => { throw new Error(" BAD! NO! ") },

    /* not implementing these */
    playTune: () => {},
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
    console: { log: () => {} },
    Math: new Proxy({}, {
      get(target, prop, receiver) {
        if (prop == "random") return random;
        return Reflect.get(Math, prop, Math);
      }
    }),
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
