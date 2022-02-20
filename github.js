// How should we load the JS?
// ideally, we should just include the link in the code
// issue is that changes to the engine will break games for people
// how about we include the latest version of the file from github into the code?
// that works, but we'll have to include that in the file json

const STORAGE_KEY = "latest-engine-version";

async function getFromGH() {
  let sha = null;
  try {
    const commits = await fetch(
      "https://api.github.com/repos/hackclub/gamelab/commits?branch=main&per_page=1"
    ).then((r) => r.json());
    const [latestCommit] = commits;
    sha = latestCommit.sha;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ts: Date.now(), sha })
    );
  } catch (e) {
    console.log(e);
  }
  return sha;
}

function getFromStorage({ force = false } = {}) {
  let sha = null;
  try {
    const json = window.localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(json);
    const { ts, sha } = data;

    const cutoff = 1000 * 60 * 30; // 30 minutes in milliseconds
    if (force || ts + cutoff > Date.now()) {
      return sha;
    }
  } catch (e) {
    console.log(e);
  }
  return sha;
}

export async function latestEngineVersion() {
  // without an API token we can quickly get rate-limited... let's use localstorage caching to help out

  const vs =
    getFromStorage() || // try grabbing from recent local storage
    (await getFromGH()) || // try grabbing from github
    getFromStorage({ force: true }); // try grabby anything from local storage (even over a minute old)
  return vs;
}
