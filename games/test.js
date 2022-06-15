// http://127.0.0.1:8080/?file=http://127.0.0.1:8080/games/test.js

setLegend({
  "a": sprite`
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr`,
  "b": sprite`
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg`,
  "c": anyOf("a", "b"),
  "d": allOf("a", "b")
})

const map0 = map`
  ab
  ba
`
setMap(map0);

const pat0 = `a*`;

const match0 = match(pat0);