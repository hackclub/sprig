import { validateName } from "./validateName.js";


export function setName({ name }, state) {
    state.name = validateName(name);
    const nameContainer = document.querySelector(".menu-name");

    // unfortunately we break our RENDER pattern here
    nameContainer.innerText = state.name;
  }