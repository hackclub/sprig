const textFromURL = (url) => fetch(url, { mode: "cors" }).then((r) => r.text());


function getParam(key) {
  const search = new URLSearchParams(window.location.search);
  return search.get(key);
}

export async function loadFromURL() {
  let address = getParam("file");
  if (!address) return;

  const text = await textFromURL(address);

  return text;
}