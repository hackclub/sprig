// ex.
// `favicon()` to set default favicon
// `favicon('yellow.png')` to set to a yellow variant of the favicon
// `favicon('loading.gif)` to set to a loading icon
export default function favicon(type = 'blue.png') {
  const icon = document.querySelector("link[rel~='icon']");
  if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(link);
  }
  icon.href = `./assets/favicon/${type}`
}