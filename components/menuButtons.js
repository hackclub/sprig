import bugReport from "./bugReport.js";
import githubLink from "./githubLink.js";
import saveFile from "./saveFile.js";
import saveLink from "./saveLink.js";
import runButton from "./runButton.js";
import { html } from '../uhtml.js';

const styles = `
  display: flex;
  flex-direction: row;
  width: min-content;
`

export default (state) => html`
  <div style=${styles}>
    ${saveLink(state)}
    ${saveFile(state)}
    ${githubLink(state)}
    ${bugReport(state)}
    ${runButton(state)}
  </div>
`