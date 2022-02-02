import { dispatch } from "./dispatch.js";
import md5 from "https://cdn.skypack.dev/md5";
import copy from "./utils/copy.js";
import notification from "./utils/notification.js";

// async function saveToAirtable({ content, state }) {
//   const publicToken = "recbyefY9mTqsIsu316420036201n7omgg1e3s"
//   const postURL = `https://api2.hackclub.com/v0.2/Saved%20Projects/Game%20Lab?authKey=${publicToken}`
//   const record = await fetch(postURL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       Name: content.name,
//       JSON: content
//     })
//   }).then(r => r.json()).catch(e => console.log(e))
//   const link = record.fields["Link"]
//   copy(link)
//   notification({
//     message: "Sharing link copied to clipboard!"
//   })

//   state.lastSaved.name = content.name
//   state.lastSaved.prog = content.prog
//   state.lastSaved.link = link
//   return link
// }

async function saveToS3({ content, state }) {
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
  const link = `localhost:5500/?id=${id}`;
  copy(link);
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
  link.click();
  URL.revokeObjectURL(link);

  notification({
    message:
      "Your file has just been downloaded! Just drag it into the editor to load from your save",
  });
}

export async function save(type, state) {
  const content = JSON.parse(dispatch("GET_SAVE_STATE"));

  switch (type) {
    case "link":
      await saveToS3({ content, state });
      break;
    case "file":
      await saveToFile({ content, state });
      break;
    default:
      throw new Error("Sharing type", type, "does not exist");
  }
}
