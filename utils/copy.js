// Copy a string into the user's clipboard
export default function copy(str) {
  const inp = document.createElement("input");
  document.body.appendChild(inp);
  inp.value = str;
  inp.select();
  document.execCommand("copy", false);
  inp.remove();
}
