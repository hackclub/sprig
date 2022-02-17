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
      padding: 5px;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      justify-content: center;
      padding-top: 0px;
      position: relative;
    }

    .challenge-menu-container {
      position: relative;
      cursor: pointer;
    }

    .challenge-menu {
      visibility: hidden;
      min-width: max-content;
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

    .challenge-item:nth-child(even) {
      color: lightgrey;
    }

    .challenge-item a:hover {
      color: orange;
    }

    .challenge-menu-container:hover .challenge-menu {
      visibility: visible;
    }

    .challenge-arrow:hover {
      color: orange;
    }

    .selected-challenge::before {
      content: "→"
    }

    .challenge-progress-container {
      background: #00ffff80;
      height: 25%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  </style>
  <div class="challenge-bar">
    <div style=${`width: ${(state.challengeIndex+1)/state.challenges.length*100}%`} class="challenge-progress-container"></div>


    ${
      state.challengeIndex > 0 
      ? html`<a 
                class="challenge-arrow" 
                style="padding-right: 40px;" 
                href=${state.challenges[state.challengeIndex-1].link}>←</a>`
      : html`&nbsp;`
    }
    <span class="challenge-menu-container">
      ${ state.challengeIndex >= 0 
        ? `You're on challenge ${state.challengeIndex+1}/${state.challenges.length}.`
        : "Hover here for little code challenges." 
      }
      <div class="challenge-menu">
        ${state.challenges.map( (x, i) => html`
          <div class=${[state.challengeIndex === i ? "selected-challenge" : "", "challenge-item"].join(" ")}>
            <a style="width: 100%;" href=${x.link}>${x.name}</a>
          </div>
        ` )}
      </div>
    </span>
    ${
      state.challengeIndex < state.challenges.length - 1 
      ? html`<a 
                class="challenge-arrow" 
                style="padding-left: 40px;" 
                href=${state.challenges[state.challengeIndex+1].link}>→</a>`
      : html`&nbsp;`
    }
  </div>
`








