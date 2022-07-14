
export function validateName(name) {
  name = name.replaceAll(" ", "-");
  if (name === "") name = "defaultName";
  console.log(name);
  return name;
}