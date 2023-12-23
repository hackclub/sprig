

const tags = ["hello", "world"]

const games = [
  ["hello"],
  ["world", "hello"],
  ["hack", "game"],
  ["hack", "game", "world", "hello"],
]

const filtered = games.filter(game => {
  for (const tag of tags) {
    if (game.indexOf(tag) === -1) return false;
  }
  return true;
})

console.log(filtered)
