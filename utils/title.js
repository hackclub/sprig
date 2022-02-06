export default function(title = null) {
  if (title) {
    document.title = `${title} | gamelab`
  } else {
    document.title = 'gamelab'
  }
}