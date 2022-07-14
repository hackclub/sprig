


export async function fetchAndBundle(link) {

  console.log(link);

  const doc = await fetch(link).then( res => res.text() );

  // get imports
  const importRe = /(import).*(from)\s*"(.*)"/gm

  const currentURL = link.split("/").slice(0, -1).join("/");

  const imports = [...doc.matchAll(importRe)]
    .map(x => x[3].startsWith("./") 
      ? `${currentURL}${x[3].slice(1)}`
      : x[3]
      );

  console.log(imports);

  return doc;
}

const link = `http://${window.location.host}/dispatches/fetchAndBundle/test1.js`;
fetchAndBundle(link);