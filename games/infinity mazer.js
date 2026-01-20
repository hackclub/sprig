/*


@title: infinity mazer
@author: kuratus
@tags: [maze , dfs]
@addedOn: 2025-00-00
*/

const p = "p"
const w = "w"
const e = "e"

setLegend(
  [p, bitmap`
2222220000022222
2222220006622222
2222220006322222
2222220666622222
2222220666622222
2222227772222222
2222225772222222
2222225772222222
2222225772222222
2222225772222222
2222227572222222
2222227772222222
2222225522222222
2222225522222222
2222225522222222
2222225522222222`],
  [w, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [e, bitmap`
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
4444444444444444`]
)

setSolids([p, w])

let lvl = 0

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }
}

function mz(size) {
  if (size % 2 === 0) size++

  let g = Array(size).fill(0).map(() => Array(size).fill("w"))

  function carve(x, y) {
    const d = [[2,0],[-2,0],[0,2],[0,-2]]
    shuffle(d)
    for (const [dx, dy] of d) {
      const nx = x + dx
      const ny = y + dy
      if (nx > 0 && ny > 0 && nx < size - 1 && ny < size - 1) {
        if (g[ny][nx] === "w") {
          g[y + dy / 2][x + dx / 2] = "."
          g[ny][nx] = "."
          carve(nx, ny)
        }
      }
    }
  }

  g[1][1] = "."
  carve(1, 1)

  g[1][1] = "p"
  g[size - 2][size - 2] = "e"

  return map`${g.map(r => r.join("")).join("\n")}`
}

function load() {
  const size = 15 + lvl * 6
  setMap(mz(size))
}

load()

onInput("w", () => getFirst(p).y--)
onInput("s", () => getFirst(p).y++)
onInput("a", () => getFirst(p).x--)
onInput("d", () => getFirst(p).x++)

afterInput(() => {
  if (tilesWith(p, e).length) {
    lvl++
    load()
  }
})
