import md5 from "md5";

async function importS3(id) {
  const url = `https://project-bucket-hackclub.s3.eu-west-1.amazonaws.com/${id}.json`;
  const saved = await fetch(url, { mode: "cors" }).then((r) => r.json());

  return saved;
}

export async function exportS3(text) {
  const uniqueID = md5(JSON.stringify(text));
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
      body: JSON.stringify({ text }),
    });
  }

  const link = getURLPath(`?id=${id}`);
  copy(link);
  return link;
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


function isSafari() {

  var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
  return is_safari;

}

// Copy a string into the user's clipboard
export default function copy(str) {


  // const inp = document.createElement("input");
  // document.body.appendChild(inp);
  // inp.value = str;
  // inp.select();
  // document.execCommand("copy", false);
  // inp.remove();


  const button = document.createElement("button");
  document.body.appendChild(button);
  button.addEventListener("click", () => {
    navigator.clipboard.writeText(str);
  })
  button.click();
  button.remove();
  
}