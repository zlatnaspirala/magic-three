
/**
 * @description
 * Small type check helper func.
 */
export function is(a) {
  if (typeof a !== 'undefined') {
    return true;
  } else {
    return false;
  }
}

export function getDom(i) {
  return document.getElementById(i);
}

export function getCanvasDom() {
  console.log(document.getElementsByTagName('canvas')[0])
  return document.getElementsByTagName('canvas')[0];
}