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
  shareLinkState: 'idle', // idle, loading, copied
  uploadState: 'idle', // idle, uploading, done
  uploadLogs: '',

  newDocument: false, // Whether the editor just loaded a new game, to avoid triggering a save
  prevName: null, // The name of the game when it was last saved
}
