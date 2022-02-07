// import bugReport from "./bugReport.js";
// import githubLink from "./githubLink.js";
// import saveFile from "./saveFile.js";
// import saveLink from "./saveLink.js";
// import runButton from "./runButton.js";
import { html } from '../uhtml.js';
import button from "./button.js";
import { dispatch } from "../dispatch.js";

const styles = `
  display: flex;
  flex-direction: row;
  width: min-content;
`

const klass = (state, status) => {
  let k = ""
  switch(state[status]) {
    case 'loading':
      k += 'cursor-progress'
      break
    case 'ready':
      k += 'cursor-pointer'
      break
    default:
      k += 'cursor-help'
      break
  }
  return k
}

// upload button

const uploadImageLink = (state) => {
  switch (state.saveLinkStatus) {
    case 'loading':
      return './assets/loading.gif'
    case 'ready':
      return './assets/upload.png'
    default:
      return './assets/err.png'
  }
}

const uploadClick = () => {
  dispatch("SOUND", "click")
  dispatch("SAVE", { type: "link" })
}

const uploadButton = state => button({ 
  buttonImage: uploadImageLink(state), 
  tooltipText: "get share link", 
  click: uploadClick, 
  className: klass(state, "saveLinkStatus") 
})


// download button

const downloadImageLink = (state) => {
  switch (state.saveFileStatus) {
    case 'loading':
      return './assets/loading.gif'
    case 'ready':
      return './assets/download.png'
    default:
      return './assets/err.png'
  }
}

const downloadClick = () => {
  dispatch("SOUND", "click")
  dispatch("SAVE", { type: "file" })
}

const downloadButton = state => button({ 
  buttonImage: downloadImageLink(state), 
  tooltipText: "download file", 
  click: downloadClick, 
  className: klass(state, "saveFileStatus") 
})

// bug report button

const bugImageLink = (state) => {
  switch(state.bugReportStatus) {
    case 'loading':
      return './assets/loading.gif'
    case 'ready':
      return './assets/bug.png'
    default:
      return './assets/err.png'
  }
}

const bugClick = () => {
  dispatch("SOUND", "confirm");
  dispatch("REPORT_BUG");
}

const bugButton = state => button({ 
  buttonImage: bugImageLink(state), 
  tooltipText: "submit bug report", 
  click: bugClick, 
  className: klass(state, "bugReportStatus") 
})

// run button

const runImageLink = (state) => {
  switch (state.runStatus) {
    case 'loading':
      return './assets/loading.gif'
    case 'ready':
      return './assets/play.png'
    default:
      return './assets/err.png'
  }
}

const runClick = () => { 
  dispatch("SOUND", "click"); 
  dispatch("RUN"); 
}

const runButton = state => button({ 
  buttonImage: runImageLink(state), 
  tooltipText: "run (shift + enter)", 
  click: runClick, 
  className: klass(state, "runStatus") + " run-button" 
})

// show ref

const refButton = state => button({ 
  buttonImage: './assets/docs4.png', 
  tooltipText: "show reference", 
  className: "cursor-pointer",
  click: refClick, 
})

const refClick = () => {
  dispatch("SOUND", "click");
  const docs = document.querySelector(".docs");
  docs.classList.toggle("hide-docs");
};


export default (state) => html`
  <div style=${styles}>
    ${downloadButton(state)}
    ${uploadButton(state)}
    ${bugButton(state)}
    ${refButton(state)}
    ${runButton(state)}
  </div>
`