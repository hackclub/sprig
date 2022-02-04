import { dispatch } from "./dispatch.js";
import md5 from "https://cdn.skypack.dev/md5";
import copy from "./utils/copy.js";
import notification from "./utils/notification.js";

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

  const link = new URL(window.location.origin + window.location.pathname);
  link.searchParams.append("id", id);

  if (copyUrl) copy(link);
  if (copyUrl)
    notification({
      message: "Sharing link copied to clipboard!",
    });

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

  notification({
    message:
      "Your file has just been downloaded! Just drag it into the editor to load from your save",
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
