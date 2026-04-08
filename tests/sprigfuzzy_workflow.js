import { readdir } from "node:fs/promises";
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKER_PATH = join(__dirname, "sprigfuzzy_worker.js");

const SKIP = ["mandelbrot.js"];
const CONCURRENCY = 16;
const PER_GAME_TIMEOUT_MS = 10_000;

const args = process.argv.slice(2);
const ONLY = args.filter(x => x.startsWith('games/')).map(x => x.slice(6)).concat(args.filter(x => !x.startsWith('games/')));

function runGame(name) {
  return new Promise((resolve) => {
    const worker = new Worker(WORKER_PATH, { workerData: { name } });
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, error: `timed out after ${PER_GAME_TIMEOUT_MS}ms` });
    }, PER_GAME_TIMEOUT_MS);

    worker.on("message", (msg) => {
      clearTimeout(timer);
      resolve(msg);
    });
    worker.on("error", (err) => {
      clearTimeout(timer);
      resolve({ ok: false, error: err.message });
    });
    worker.on("exit", (code) => {
      clearTimeout(timer);
      if (code !== 0) resolve({ ok: false, error: `worker exited with code ${code}` });
    });
  });
}

async function runBatch(names) {
  const brokenGames = [];
  const queue = [...names];
  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) {
      const name = queue.shift();
      const result = await runGame(name);
      if (!result.ok) {
        console.log(`ERROR: ${name} — ${result.error}`);
        brokenGames.push({ name, error: result.error });
      }
    }
  });
  await Promise.all(workers);
  return brokenGames;
}

async function main() {
  let gamesToRun = [];

  if (ONLY.length > 0) {
    gamesToRun = ONLY.filter(name => name.endsWith('.js') && !SKIP.includes(name));
  } else {
    const entries = await readdir('./games');
    gamesToRun = entries.filter(name => name.endsWith('.js') && !SKIP.includes(name));
  }

  console.log(`Testing ${gamesToRun.length} game(s) with concurrency ${CONCURRENCY}`);
  const brokenGames = await runBatch(gamesToRun);

  if (brokenGames.length > 0) {
    console.log(`\n${brokenGames.length} game(s) had errors:`);
    for (const { name, error } of brokenGames)
      console.log(`  - ${name}: ${error}`);
    process.exit(1);
  }
}

main();
