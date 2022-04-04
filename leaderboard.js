async function leaderboard(engine, score) {
  const LB_SERVER = "https://misguided.enterprises/gamelabscores/";

  const hash = engine.gameHash;
  const res = await fetch(LB_SERVER, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, hash }),
  }).then((x) => x.json());

  let lb = await fetch(LB_SERVER + hash).then((x) => x.json());
  let scores = window.Object.entries(lb);
  scores.sort(([, a], [, b]) => b.score - a.score);
  scores = scores.splice(0, 5);

  engine.ctx.globalAlpha = 0.66;
  engine.ctx.fillRect(0, 0, engine.canvas.width, engine.canvas.height);

  clearText(engine.canvas.parentNode);

  let x = engine.canvas.width * 0.5;
  let y = engine.canvas.height * 0.2;
  let size = engine.canvas.height * 0.1;
  engine.addText(
    (() => {
      if (res.prev && res.prev > score) return "PERSONAL BEST";
      else if (scores.length) return "LEADERBOARD";
      else return "NO SCORES :(";
    })(),
    x,
    y,
    { size }
  );

  y += size + 5;
  for (const [slack_id, { name, score }] of scores) {
    let opts = {
      size: size - 4,
      href:
        "https://app.slack.com/client/T0266FRGM/C0266FRGV/user_profile/" +
        slack_id,
      newTab: true,
      color: "blue",
    };
    engine.addText(name.substring(0, 3), x - 50, y, opts);
    delete opts.href;
    delete opts.color;
    engine.addText(score, x + 50, y, opts);
    y += size;
  }

  if (res.err)
    engine.addText("login to add your " + score, x, y, {
      size: size - 4,
      color: "blue",
      href:
        LB_SERVER +
        "login/" +
        "?from=" +
        encodeURIComponent(window.location) +
        "&score=" +
        encodeURIComponent(score) +
        "&hash=" +
        encodeURIComponent(hash),
    });
  if (res.prev) {
    engine.addText(`score: ${score}, best: ${res.prev}`, x, y, {
      size: size - 4,
    });
  }
}
