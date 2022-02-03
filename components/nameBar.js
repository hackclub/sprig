import { dispatch } from '../dispatch.js';
import { html } from '../uhtml.js';
import runButton from './runButton.js';
import menuButtons from "./menuButtons.js";

const nameStyles = `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
        padding: .8em;
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
        padding-top: 5px;
        display: flex;
        font-size: .9rem;
      }
    </style>

    <div class="name-bar">
      <div style=${nameStyles}>
        <input 
          class="name-bar-input"
          @input=${e => dispatch("SET_NAME", { name: e.target.value })}.value=${state.name}>
        </input>
        <div class="powered-by">
          <div>powered by&nbsp;</div>
          <a href="https://github.com/hackclub/game-lab"
             target="_blank">
            <strong>gamelab</strong>
          </a>
          &nbsp;
          <a href="https://github.com/hackclub/game-lab"
             target="_blank">
            <img src="./assets/github.png" width="20px" />
          </a>
        </div>
      </div>
      ${menuButtons(state)}
    </div>
  `
)