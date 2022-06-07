import { dispatch } from "../dispatch.js";

function upload(files, extensions = []) {
  let file = files[0];
  let fileName = file.name.split(".");
  let name = fileName[0];
  const extension = fileName[fileName.length - 1];

  if (extensions.length > 0 && extensions.includes(enxtension))
    throw "Extension not recongized: " + fileName;

  readFile(file);
  // if (["json"].includes(extension)) readFile(file);
  // else console.log("Unknown extension:", extension);
}

function readFile(file) {
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = (event) => {
    let text = reader.result;

    try {
      dispatch("SET_EDITOR_TEXT", { text });
    } catch (err) {}
  };
}

export function addDropUpload(state, bodyListener) {
  bodyListener("drop", "", function (evt) {
    let dt = evt.dataTransfer;
    let files = dt.files;

    upload(files);

    pauseEvent(evt);
  });

  bodyListener("dragover", "", function (evt) {
    pauseEvent(evt);
  });
}


function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}