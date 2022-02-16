import { dispatch } from '../dispatch.js';
import { html } from '../uhtml.js';
import menuButtons from "./menuButtons.js";

const nameStyles = `
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: min-content;
`

const linkStyles = `
  display: flex;
`

export default (state) => (
  html`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600;800&display=swap');

      .name-bar {
        font-family: 'JetBrains Mono', monospace;
        color: var(--light);
        background: var(--darkless);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5em .8em;
      }

      .name-bar-input {
        width: 95%;
        margin: 0;
        background: var(--darkless);
        color: var(--smoke);
        border: none;
        font-size: 1.5rem;
      }
      .name-bar-input:focus {
         background: var(--dark);
      }

      .powered-by {
        display: flex;
        font-size: .9rem;
        align-items: center
      }
    </style>

    <div class="name-bar">
      <div style=${nameStyles}>
        <input 
          class="name-bar-input"
          @input=${e => dispatch("SET_NAME", { name: e.target.value })} .value=${state.name}>
        </input>
        <div class="powered-by">
          <div>powered by&nbsp;</div>
          <a href="https://github.com/hackclub/gamelab"
             target="_blank">
            <strong>gamelab</strong>
          </a>
          &nbsp;
          <a href="https://github.com/hackclub/gamelab"
             target="_blank">
            <img style="transform: translate(-9px, 3px)" src="./assets/github.png" width="32px" />
          </a>
        </div>
      </div>
      ${menuButtons(state)}
    </div>
    ${state.showChallengeBar ? challengeBar(state) : ""}
  `
)

const challengeBar = (state) => html`
  <style>
    .challenge-bar {
      color: white;
      background: var(--darkless);
      display: flex;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      justify-content: space-between;
    }

    .challenge-menu-container {
      position: relative;
      cursor: pointer;
    }

    .challenge-menu {
      visibility: hidden;
      position: absolute;
      left: 50%;
      top: 100%;
      overflow: revert;
      background: var(--darkless);
      z-index: 10;
      transform: translate(-50%, 0);
      padding: 10px;
      width: 100%;
    }

    .challenge-menu > * :hover {
      color: orange;
    }

    .challenge-menu-container:hover .challenge-menu {
      visibility: visible;
    }

    .challenge-arrow:hover {
      color: orange;
    }
  </style>
  <div class="challenge-bar">
    ${
      state.challengeIndex > 0 
      ? html`<a class="challenge-arrow" href=${state.challenges[state.challengeIndex-1].link}>←</a>`
      : html`&nbsp;`
    }
    <span class="challenge-menu-container">
      Try these challenges to get started.
      <div class="challenge-menu">
        ${state.challenges.map( x => html`
          <div>
            <a href=${x.link}>${x.name}</a>
          </div>
        ` )}
      </div>
    </span>
    ${
      state.challengeIndex < state.challenges.length - 1 
      ? html`<a class="challenge-arrow" href=${state.challenges[state.challengeIndex+1].link}>→</a>`
      : html`&nbsp;`
    }
  </div>
`








