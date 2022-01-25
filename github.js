// How should we load the JS?
// ideally, we should just include the link in the code
// issue is that changes to the engine will break games for people
// how about we include the latest version of the file from github into the code?
// that works, but we'll have to include that in the file json

export async function latestEngineVersion() {
  const commits = await fetch('https://api.github.com/repos/hackclub/game-lab/commits?branch=main&per_page=1').then(r => r.json())
  const [ latestCommit ] = commits
  const { sha } = latestCommit
  return sha
}