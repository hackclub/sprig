import { dispatch } from "./dispatch.js";
import md5 from "https://cdn.skypack.dev/md5";
import copy from "./utils/copy.js";
import { html } from "./uhtml.js";

export const hashState = () => md5(dispatch("GET_SAVE_STATE"));

async function saveToS3({ content, state, copyUrl }) {
  const uniqueID = md5(JSON.stringify(content));
  const { exists, uploadURL, jsonFilename, id } = await fetch(
    `https://vt4x133ukg.execute-api.eu-west-1.amazonaws.com/default/getPresignedURL?id=${uniqueID}`
  ).then((r) => r.json());
  if (!exists) {
    await fetch(uploadURL, {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
  }

  function getURLPath(extension) {
    return (
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      extension
    );
  }

  const link = getURLPath(`?id=${id}`);

  if (copyUrl) {
    copy(link);

    dispatch("NOTIFICATION", {
      message: html`
        Sharing link copied to clipboard! If you're on Safari you'll have to
        <button @click=${() => copy(link)}>click here to copy</button>.
      `,
      open: true,
    });
  }

  state.lastSaved.name = content.name;
  state.lastSaved.prog = content.prog;
  state.lastSaved.link = link;
  return link;
}

async function saveToFile({ content, state }) {
  const blob = new Blob([JSON.stringify(content)], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.name}.json`;

  await new Promise((resolve) => setTimeout(resolve, 500)); // wait half a second (in milliseconds)

  link.click();
  URL.revokeObjectURL(link);

  dispatch("NOTIFICATION", {
    message:
      "Your file has just been downloaded! Just drag it into the editor to load from your save",
    open: true,
  });
}

export async function save(type, state, copyUrl = true) {
  state.runStatus = "loading";
  dispatch("RENDER");
  const content = JSON.parse(dispatch("GET_SAVE_STATE"));

  switch (type) {
    case "link":
      state.saveLinkStatus = "loading";
      dispatch("RENDER");
      await saveToS3({ content, state, copyUrl });
      dispatch("SOUND", "upload");
      state.saveLinkStatus = "ready";
      break;
    case "file":
      state.saveFileStatus = "loading";
      dispatch("RENDER");
      await saveToFile({ content, state });
      dispatch("SOUND", "download");
      state.saveFileStatus = "ready";
      break;
    default:
      throw new Error("Sharing type", type, "does not exist");
  }
  state.runStatus = "ready";
  dispatch("RENDER");
  console.log("ready");
}
