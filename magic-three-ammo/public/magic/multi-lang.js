import {ANYLOG, urlFlag} from "./utility.js";

class MultiLang {

  constructor(l) {
    if(l !== null) {this.curLang = l;} else {this.curLang = 'en';}
    this.get = {};
    this.update = function() {
      document.querySelectorAll("[data-langname]").forEach((el) => {
        let l = el.getAttribute('data-langname');
        el.innerHTML = this.get[l];
      });
    }
  }

  t = (wordId) => {
    if(typeof wordId === 'undefined') {
      return '*';
    } else if(typeof this.get[wordId] !== 'undefined') {
      return this.get[wordId];
    }
    return '*';
  }

  loadPack = function(c, loaded) {
    var root = this;
    var cp = null;
    if(typeof c === 'undefined' || c === null) {cp = this.curLang} else {cp = c}
    var path = "assets/strings/" + cp + ".json";
    fetch(path, {
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    }).then((response) => {
      return response.json();
    }).then((res) => {
      root.get = res;
      root.update();
      loaded();
    }).catch((err) => {
      fetch("assets/strings/en.json", {
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then((response) => {
        return response.json();
      }).then((res) => {
        root.get = res;
        root.update();
      })
    })
  }
}

var lang = urlFlag('lang');
let label = new MultiLang(lang);
label.loadPack(lang, function() {
  const mlready = new CustomEvent('multi-lang-ready', {});
  dispatchEvent(mlready);
  console.info('%c MultiLang loaded.', ANYLOG);
});

export default label.t;
