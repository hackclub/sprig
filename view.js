import { html } from "./libs/uhtml.js";
import { dispatch } from "./dispatch.js";
import { saveGame } from "./saveGame.js"

import { docs } from "./views/docs.js";
import "./pixel-editor/pixel-editor.js";
import "./sequencer/sequencer.js";
import "./map-editor/map-editor.js";
import "./views/bitmap-preview.js";

export const view = (state) => html`
  ${menu(state)}

  <div class="main-container">
    <div class="code-container">
      <div @click=${() => {
        const cur = state.codemirror.state.doc.toString();
        const match = cur.match(/@title:\s+([^\n]+)/);
        const curName = (match !== null) ? match[1] : "DRAFT";

        let i = 0;
        for (const { name } of challenges) {
          if (challenges[i+1] && name == curName) {
            dispatch("SET_EDITOR_TEXT", {
              text: challenges[i+1].content.trim(),
              range: [0, cur.length]
            });
          }
          i++;
        }
      }} class="next-learn">next</div>
      <div id="code-editor"></div>
      <div class=${["logs", state.errorInfo ? "erred" : ""].join(" ")}>
        ${state.logs.map(x => html`${x}<br>`)}
      </div>
    </div>
    
    <div class="game-docs-container">
      <div class="game-canvas-container">
        <canvas class="game-canvas"></canvas>
        <canvas class="game-text"></canvas>
      </div>
      <div class="docs">
        ${docs(state)}
      </div>
    </div>

    <div class="vertical-bar"></div>
  </div>

  <div class=${["asset-editor-container", state.editor ? "" : "hide"].join(" ")}  @click=${(event) => {
    // Click on overlay or close button:
    for (const item of event.composedPath()) {
      if (item.classList && item.classList.contains("asset-editor-content")) return;
    }
    dispatch("SET_ASSET_EDITOR", { type: null, text: null })
  }}>
    <button class="close"><ion-icon icon="close" /></button>
    <div class="asset-editor-content">
      ${
        {
          "bitmap": html`<pixel-editor id="asset-editor"></pixel-editor>`,
          "sequencer": html`<sequencer-editor id="asset-editor"></sequencer-editor>`,
          "map": html`<map-editor id="asset-editor"></map-editor>`,
          [undefined]: ""
        }[state.editor]
      }
    </div>
  </div>
`

const sampleMenuItem = sample => html`
  <a class="sample-menu-item" href=${sample.link}>${sample.name}</a>
`

const editableName = (state) => html`
  <div 
    class="menu-item menu-name" 
    contenteditable 
    spellcheck="false"
    @blur=${e => dispatch("SET_NAME", { name: e.target.innerText })}
  >
    ${state.name}
  </div>
`

const drawFile = (file, i, state) => {
  const [ name, text ] = file;
  const setText = () => {
    saveGame(state);
    const games = Object.fromEntries(state.savedGames);
    const text = games[name];
    const cur = state.codemirror.state.doc.toString();
    dispatch("SET_EDITOR_TEXT", { text, range: [0, cur.length] })
  }

  const fullText = state.codemirror.state.doc.toString();
  const matches = fullText.matchAll(/(map|bitmap|tune)`[\s\S]*?`/g);
  for (const match of matches) {
    const index = match.index;
    state.codemirror.foldRange(index, index+1);
  }
  return html`
    <div @click=${setText}>${name.slice(0, 15)}${name.length > 15 ? "..." : ""}</div>
  `
}  

const challenges = [
  {
    name: 'bean',
    content: `
/*                     WELCOME TO SPRIG!!!
 *
 * This is the first of many "challenges" which will help you
 *             familiarize yourself with Sprig.
 *
 *  Read through to get acquainted with the format all Sprig
 *    games share. Play with the art! Make it your own :)
 *
 *   When you're ready, click the big green button to go to
 *                  the next challenge!
 */


/* HERE we give each kind of sprite
 * in our game a letter, as a shorthand. */
const bean = 'a';

/* HERE we give each sprite its art! */
setLegend(
  /* click "bitmap" to change the art! */
  [bean, bitmap\`
................
......000.......
.....0.220......
.....002020.....
..0..022..0.....
...0..0...0.....
...0000...20....
....2.0...20....
.....0....200...
....0...220.0...
....0...220.0...
....02.220...2..
.....0000.......
....0....0......
....0....0......
...00...00......\`]
);

/* HERE we make a map out of those letters.
 * try making the map bigger!
 * (hint: CLICK "map") */
setMap(map\`a\`);
`
  },
  {
    name: 'walk',
    content: `
const bean = 'a';

setLegend(
  [bean, bitmap\`
................
......000.......
.....0.220......
.....002020.....
..0..022..0.....
...0..0...0.....
...0000...20....
....2.0...20....
.....0....200...
....0...220.0...
....0...220.0...
....02.220...2..
.....0000.......
....0....0......
....0....0......
...00...00......\`]
);

setMap(map\`
.....
.....
..a..
.....
.....\`);

const player = () => getFirst(bean);

/* CAN YOU ADD MORE DIRECTIONS? */
onInput("a", () => {
  player().x -= 1
});
onInput("s", () => {
  player().y += 1
});
    `
  },
  {
    name: 'trellis',
    content: `
const bean = 'a';
const vine = 'b';
const trellis = 'c';

setLegend(
  [bean, bitmap\`
................
......000.......
.....0.220......
.....002020.....
..0..022..0.....
...0..0...0.....
...0000...20....
....2.0...20....
.....0....200...
....0...220.0...
....0...220.0...
....02.220...2..
.....0000.......
....0....0......
....0....0......
...00...00......\`],
  [vine, bitmap\`
........44......
.......44.......
......44.......4
......4........4
.....44........4
.44..4........44
.44.44........4.
..444........44.
..44......44.4..
.44.......4444..
44.........444..
44..........42..
4...........4...
4..........44...
4.........44....
4........44.....\`],
  [trellis, bitmap\`
.L...L.....L..L.
.L...L.....L..L.
..L.L.L...LL.L..
..L.L.L...L.LL..
..L.L.L..L..LL..
..LL...L.L..LL..
...L...L.L..L...
...L...LL...L...
..LL....L...LL..
..LL...LL...LL..
..L.L..LL..L.L..
.L..L..L.L.L.L..
.L..L.L..L.L.L..
.L..L.L..L.L..L.
L....L....L...L.
L....L....L...L.\`]
);

setMap(map\`
..cccccc.
.cccbbccc
cccbbbbcc
ccbbbbbcc
cbbbcbbbc
ccbccbabc
cccccbbcc
cccccbcc.
..cccccc.\`);


/* PASTE SOME MOVEMENT CODE HERE ;) */


/* hint: go to your shed to get the code from the last stage! */


/* ps - what happens if you make non-bean players? :O */


/* what happens if you make vines solid? :3 */
setSolids( [bean, trellis] )
    `
  },
  {
    name: 'heave',
    content: `
const bean = 'a';
const vine = 'b';
const trellis = 'c';

setLegend(
  [bean, bitmap\`
................
......000.......
.....0.220......
.....002020.....
..0..022..0.....
...0..0...0.....
...0000...20....
....2.0...20....
.....0....200...
....0...220.0...
....0...220.0...
....02.220...2..
.....0000.......
....0....0......
....0....0......
...00...00......\`],
  [vine, bitmap\`
........44......
.......44.......
......44.......4
......4........4
.....44........4
.44..4........44
.44.44........4.
..444........44.
..44......44.4..
.44.......4444..
44.........444..
44..........42..
4...........4...
4..........44...
4.........44....
4........44.....\`],
  [trellis, bitmap\`
.L...L.....L..L.
.L...L.....L..L.
..L.L.L...LL.L..
..L.L.L...L.LL..
..L.L.L..L..LL..
..LL...L.L..LL..
...L...L.L..L...
...L...LL...L...
..LL....L...LL..
..LL...LL...LL..
..L.L..LL..L.L..
.L..L..L.L.L.L..
.L..L.L..L.L.L..
.L..L.L..L.L..L.
L....L....L...L.
L....L....L...L.\`]
);

setMap(map\`
bbbbbbbbb
bbbb...bb
bbb.....b
bb......b
b...c.a.b
b......bb
b.....bbb
bb.bbbbbb
bbbbbbbbb\`);

const player = () => getFirst(bean);
onInput("a", () => {
  player().x -= 1;
});
onInput("d", () => {
  player().x += 1;
});
onInput("s", () => {
  player().y += 1;
});
onInput("w", () => {
  player().y -= 1;
});

/* uhhh ... what  things should be solid?!? */

/* hehe see if you can figure out what this does >:) */
setPushables({
  [bean]: [trellis]
})
    `
  },
  { name: 'trail' },
  { name: 'grow' },
]

for (const challenge of challenges)
  challenge.content = `/*
@title: ${challenge.name}
@author: ced
*/

` + challenge.content;

const menu = (state) => html`
  <div class="menu">
    <div class="menu-item dropdown-container">
      recent
      <div class="dropdown-list">
        ${state.savedGames.map((file, i) => drawFile(file, i, state))}
      </div>
    </div>
    <div class="menu-item dropdown-container">
      learn
      <div class="dropdown-list">
        ${challenges.map(({ content, name }, i) => {
          const load = () => {
            const cur = state.codemirror.state.doc.toString();
            const match = cur.match(/@title:\s+([^\n]+)/);
            const curName = (match !== null) ? match[1] : "DRAFT";

            if (curName == name &&
              !confirm(`are you sure you want to overwrite your edited "${name}"?`))
              return;

            dispatch("SET_EDITOR_TEXT", {
              text: content.trim(),
              range: [0, cur.length]
            });
          };
          return html`<div @click=${load}> CH. ${i+1} - ${name} </div>`
        })}
      </div>
    </div>
    <div class="menu-item dropdown-container">
      save
      <div class="dropdown-list">
        <div @click=${e => dispatch("SAVE_TO_FILE")}>to file</div>
        <div @click=${e => dispatch("GET_URL")}>to link</div>
      </div>
    </div>
    <a 
      class="menu-item dropdown-container" 
      href="https://sprig-gallery.hackclub.dev"
      target="_blank">
      gallery
    </a>
    <div 
      class="menu-item" 
      @click=${() => dispatch("UPLOAD")}>
      upload
    </div>
    <div 
      class="menu-item docs-trigger">
      help
    </div>
    <div 
      class="menu-item run" 
      @click=${() => dispatch("RUN")}>
      <ion-icon name="play" style="margin-right: 6px;" />
      run
    </div>

    <div class="spacer" aria-hidden="true" />

    <a class="menu-item" href="https://github.com/hackclub/sprig/">
      <ion-icon name="logo-github" />
    </a>
  </div>
`

const drawSample = ({ name, link }) => {
  return html`
    <a href=${link}>
      ${name}
    </a>
  `
}
