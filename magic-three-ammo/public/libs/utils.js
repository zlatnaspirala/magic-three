
export function createRandomColor() {
  return Math.floor(Math.random() * (1 << 24));
}

export function getDom (i) {
  return document.getElementById(i)
}
