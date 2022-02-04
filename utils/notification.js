// should write: we're creating elements in here, but we should redo to fit with uhtml


export default function notification({ message, type, timeout }={}) {
  // document.querySelector(".shared-modal").classList.toggle("hide");
  const el = document.createElement('div')
  el.classList.add('shared-modal')
  el.innerHTML = message
  if (type) {
    el.classList.add(`notification-${type}`)
  }
  document.getElementById('notification-container').appendChild(el)
  
  setTimeout(() => el.remove(), timeout || 3000);
}
