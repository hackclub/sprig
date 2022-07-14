

export function saveGame(state) {
  const string = state.codemirror.state.doc.toString();
  const match = string.match(/@title:\s+([^\n]+)/);
  const name = (match !== null) ? match[1] : "DRAFT";
  const gameDict = Object.fromEntries(state.savedGames);
  if (name in gameDict && gameDict[name] === string) return;
  const newSave = [ name, string ];
  const currentGames = state.savedGames
    .filter( x => x[0] !== name)
    .slice(0, 4);
  const toSave = [ newSave, ...currentGames ]
  state.savedGames = toSave;
  window.localStorage.setItem("puzzle-lab", JSON.stringify(toSave) );
}