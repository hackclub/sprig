function start() {
  let last = 0;

  function loop(ts) {
    const elapsedMs = Math.min(3000, ts - last)*timeScale;
    last = ts;

    turtles.forEach(t => t.update(elapsedMs));
    timeKeeper.update(elapsedMs);

    // while to cap frame rate

    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)
}

start();