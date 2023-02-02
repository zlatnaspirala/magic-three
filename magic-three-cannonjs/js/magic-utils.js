
export function randName(length) {
  let g = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let c = 0;
  while(c < length) {
    g += chars.charAt(Math.floor(Math.random() * chars.length));
    c += 1;
  }
  return g;
}

export function is(o) {
  if(typeof o === 'undefined') {
    return false;
  } else {
    return true;
  }
}

export async function runScript(src, id) {
  return new Promise((resolve, reject) => {
    var s = document.createElement('script');
    s.onload = function(e) {
      resolve('Script id loaded with src: ' + this.src);
      console.log('Script id loaded with src: ' + this.src);
    };
    s.onerror = function(e) {
      reject();
      console.error('Script id loaded with src: ' + this.src);
    };
    s.setAttribute('src', src);
    if(is(id)) {
      s.setAttribute('id', id);
    }
    document.body.appendChild(s);
  })
}
