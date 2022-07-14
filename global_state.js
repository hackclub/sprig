import { palette } from "./palette.js"

const githubPages = str => `https://hackclub.github.io/puzzlelab/games/${str}.js`;
const makeSampleLink = str => 
  `${window.location.protocol}//${window.location.host}/?file=${githubPages(str)}`
const makeSample = str => ({
  name: str,
  link: makeSampleLink(str)
})

export const global_state = {
  codemirror: undefined,
  errorInfo: null,
  logs: [],
  // name: "game-name-here",
  // notifications: [],
  editor: null,
  editRange: null,
  samples: [
    // makeSample("test"),
    makeSample("maze"),
    makeSample("pyre"),
    // makeSample("flightless_bird"),
    makeSample("laser-tag")
  ],
  bitmaps: [],
  savedGames: [],
  palette,
}
