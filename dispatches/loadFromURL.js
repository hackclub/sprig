const textFromURL = (url) => fetch(url, { mode: "cors" }).then((r) => r.text());


export async function loadFromURL(address) {
  const text = await textFromURL(address);

  return text;
}