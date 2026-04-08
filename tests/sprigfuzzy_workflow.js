import { readdir, readFile } from "node:fs/promises";
import { baseEngine } from "../engine/dist/base/index.js"

let brokenGames = [];
const SKIP = ["mandelbrot.js"];

const CONCURRENCY = 16;
const PER_GAME_TIMEOUT_MS = 10_000;

const args = process.argv.slice(2);
const ONLY = args.filter(x => x.startsWith('games/')).map(x => x.slice(6)).concat(args.filter(x => !x.startsWith('games/')));

async function runBatch(names) {
  const queue = [...names];
  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) {
      const name = queue.shift();
      await testScript(name);
    }
  });
  await Promise.all(workers);
}

async function main() {
  brokenGames = [];
  let gamesToRun = [];

  if (ONLY.length > 0) {
    gamesToRun = ONLY.filter(name => name.endsWith('.js') && !SKIP.includes(name));
  } else {
    const entries = await readdir('./games');
    gamesToRun = entries.filter(name => name.endsWith('.js') && !SKIP.includes(name));
  }

  console.log(`Testing ${gamesToRun.length} game(s) with concurrency ${CONCURRENCY}`);
  await runBatch(gamesToRun);

  if (brokenGames.length > 0) {
    console.log(`\n${brokenGames.length} game(s) had errors:`);
    for (const { name, error } of brokenGames)
      console.log(`  - ${name}: ${error?.message ?? error}`);
    process.exit(1);
  }
}

main();

async function testScript(name) {
  const script = await readFile(`./games/${name}`, 'utf-8');

  const { api, cleanup, simulateKey } = simEngine();

  const choose = arr => arr[Math.floor(Math.random() * arr.length)];
  const shakespeareMonKeys = [...Array(1000)].map(_ => choose("wasdjilk".split('')));

  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`timed out after ${PER_GAME_TIMEOUT_MS}ms`)), PER_GAME_TIMEOUT_MS);
      try {
        const fn = new Function(...Object.keys(api), script);
        fn(...Object.values(api));

        for (const key of shakespeareMonKeys) {
          simulateKey(key);
        }
        clearTimeout(timer);
        resolve();
      } catch (e) {
        clearTimeout(timer);
        reject(e);
      }
    });
  } catch(e) {
    console.log(`ERROR: ${name} — ${e.message}`);
    brokenGames.push({ name, error: e });
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
    playTune: () => ({ end: () => {}, isPlaying: () => false }),
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
