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

export function getDomain() { return window.location.hostname }

export var QueryString = (function() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for(var i = 0;i < vars.length;i++) {
    var pair = vars[i].split('=');
    // If first entry with this name
    if(typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if(typeof query_string[pair[0]] === 'string') {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
})();

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

// TEST THIS
export function getAxisAndAngelFromQuaternion(q) {
  const angle = 2 * Math.acos(q.w);
  var s;
  if(1 - q.w * q.w < 0.000001) {
    // test to avoid divide by zero, s is always positive due to sqrt
    // if s close to zero then direction of axis not important
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/
    s = 1;
  } else {
    s = Math.sqrt(1 - q.w * q.w);
  }
  return {axis: new THREE.Vector3(q.x / s, q.y / s, q.z / s), angle};
}

export var isSafari = function() {return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)},
  isMozilla = navigator.userAgent.toLowerCase().indexOf('mozilla') > -1,
  isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
  isUbuntu = navigator.userAgent.toLowerCase().indexOf('ubuntu') > -1,
  isLinux = navigator.userAgent.toLowerCase().indexOf('linux') > -1,
  isGecko = navigator.userAgent.toLowerCase().indexOf('gecko') > -1,
  isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
  isMacintosh = navigator.userAgent.toLowerCase().indexOf('macintosh') > -1,
  isAppleWebKit = navigator.userAgent.toLowerCase().indexOf('applewebkit') > -1,
  isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1,
  isMobile = navigator.userAgent.toLowerCase().indexOf('mobile') > -1,
  getChromeVersion = function() {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
  };

// linear interpolation function
export function lerp(a, b, t) {return a + (b - a) * t}

export var BIGLOG = "color: #55fd53;font-size:20px;text-shadow: 0px 0px 5px #f4fd63, -1px -1px 5px orange";
export var REDLOG = "color: lime;font-size:15px;text-shadow: 0px 0px 5px red, -2px -2px 5px orangered";
export var NETLOG = "color: orange;font-size:15px;text-shadow: 0px 0px 1px red, 0px 0px 5px orangered";
export var ANYLOG = "color: yellow;font-size:15px;text-shadow: 1px 1px 4px red, 0px 0px 2px orangered";