const makeSampleLink = str => 
  `${window.location.protocol}//${window.location.host}/?file=${window.location.protocol}//${window.location.host}/games/${str}.js`

export const global_state = {
  codemirror: undefined,
  errorInfo: null,
  logs: [],
  // name: "game-name-here",
  // notifications: [],
  editor: null,
  editRange: null,
  samples: [
    {
      name: "test",
      link: makeSampleLink("test")
    },
    {
      name: "maze",
      link: makeSampleLink("maze")
    },
    {
      name: "fire",
      link: makeSampleLink("fire")
    },
    {
      name: "flightless_bird",
      link: makeSampleLink("flightless_bird")
    }
  ],
  bitmaps: {},
  savedGames: [],
  palette: [
    ["0", [0, 0, 0, 255]],
    ["1", [255/2, 255/2, 255/2, 255]],
    ["2", [255, 255, 255, 255]],
    ["3", [255, 0, 0, 255]],
    ["4", [0, 255, 0, 255]],
    ["5", [0, 0, 255, 255]],
    ["6", [255, 255, 0, 255]],
    ["7", [0, 255, 255, 255]],
    ["8", [255, 0, 255, 255]],
    [".", [0, 0, 0, 0]]
  ],
}
