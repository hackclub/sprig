import { Muse } from "https://muse.hackclub.com/exports.js";

function m({ type = 'triangle', volume = 50, bpm = 120, song = '' }) {
  new Muse({ type, volume, bpm }).play`
    ${song}
  `
}

const sounds = {
  bootup: `[b5;--d6;--b6;--g6+]-;[a#5;--d6;--g6;--d#6+]- `,
  click: `[b5;--d6;--]--`,
  confirm: `[a#5;--d6;]-`,
  hover: `d6-`,
  no: `[g6;--d#6+]-`,
  yes: `[b6;--g6+]-`,
}

export default {
  bootup:  () => m({ song: sounds.bootup  }),
  click:   () => m({ song: sounds.click   }),
  confirm: () => m({ song: sounds.confirm }),
  hover:   () => m({ song: sounds.hover, volume: 10 }),
  no:      () => m({ song: sounds.no      }),
  yes:     () => m({ song: sounds.yes     }),
}