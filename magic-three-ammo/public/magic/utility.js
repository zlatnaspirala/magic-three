import * as THREE from "three";

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
  if(f == false) return;
  if("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      if(isiOS()) {
        navigator.serviceWorker.register("cache.ios.js").then(() => {
          console.log('Worker runned.');
        });
      } else {
        navigator.serviceWorker.register("cache.js").then(() => {
          console.log('Worker runned.');
        });
      }
    });
  } else {
    console.warn("MagicThree: No support for web workers in this browser.");
  }
}

export function createAppEvent(name, myDetails) {
  return new CustomEvent(name, {
    detail: {
      eventName: name,
      data: myDetails,
    },
    bubbles: true,
  });
}

export const HeaderTypes = {
  textPlan: "text/plain",
  html: "text/html",
  jpeg: "image/jpeg",
  png: "image/png",
  mpeg: "audio/mpeg",
  ogg: "audio/ogg",
  audio: "audio/*",
  mp4: "video/mp4",
  app: "application/*",
  appJson: "application/json",
  appJS: "application/javascript",
  appECMA: "application/ecmascript",
  appOctetSteam: "application/octet-stream",
};

export const jsonHeaders = new Headers({
  "Content-Type": "application/json",
  "Accept": "application/json",
});

export const htmlHeader = new Headers({
  "Content-Type": "text/html",
  "Accept": "text/plain",
});

export function byId(d) {
  return document.getElementById(d)
};

export function getProtocolFromAddressBar() {
  return (location.protocol === "https:" ? "https://" : "http://");
}

export function getDomain() {
  // if(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  //   return window.location.hostname;
  // }
  return window.location.hostname;
}

export function urlFlag(name) {
  let results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
  if(results == null) {
    return null;
  } else {
    return decodeURI(results[1]) || 0;
  }
}

export function save(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));
}

export function load(name) {
  if(localStorage.getItem(name) == 'undefined' ||
     localStorage.getItem(name) == null ||
     localStorage.getItem(name) == "") {
    return false;
  }
  else {
    return JSON.parse(localStorage.getItem(name));
  }
}

// export function makeid(length) {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }


// TEST THSI
export function getAxisAndAngelFromQuaternion(q) {
  const angle = 2 * Math.acos(q.w);
  var s;
  if (1 - q.w * q.w < 0.000001) {
    // test to avoid divide by zero, s is always positive due to sqrt
    // if s close to zero then direction of axis not important
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/
    s = 1;
  } else { 
    s = Math.sqrt(1 - q.w * q.w);
  }
  return { axis: new THREE.Vector3(q.x/s, q.y/s, q.z/s), angle };
}