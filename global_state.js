import { palette } from "./palette.js"

const githubPages = str => `https://hackclub.github.io/sprig/games/${str}.js`;
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
  staleRun: true,
  newDocument: false, // Whether the editor contents was set to a new doc, to avoid lighting up the save button
  shareLinkState: 'idle', // idle, loading, copied
  uploadState: 'idle', // idle, uploading, done
  uploadLogs: ''
}
