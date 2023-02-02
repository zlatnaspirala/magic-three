
export function randName(length) {
  let g = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let c = 0;
  while (c < length) {
    g += chars.charAt(Math.floor(Math.random() * chars.length));
    c += 1;
  }
  return g;
}

export function is(o) {
  if (typeof o === 'undefined') {
    return false;
  } else {
    return true;
  }
}
