
export function isiOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

export function runCache(f) {
  if (f == false) return;
  if("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      if(isiOS()) {
        navigator.serviceWorker.register("./cache.ios.js").then(() => {
          console.log('Worker runned.');
        });
      } else {
      navigator.serviceWorker.register("./cache.js").then(() => {
        console.log('Worker runned.');
      });
    }
    });
  } else {
    console.warn("MagicThree: No support for web workers in this browser.");
  }
}
