import * as THREE from "three";
import {MagicLoader} from "../loaders.js";
import {BIGLOG, NETLOG, byId, createAppEvent, getAxisAndAngelFromQuaternion, htmlHeader} from "../utility.js";
import {closeSession, joinSession, removeUser} from "../../kure/app.js";
import {label} from "../multi-lang.js";
let t = label.t;

export class KureBroadcaster {

  constructor(config, scene) {

    this.scene = scene;
    this.loader = new MagicLoader(config, scene);
    this.injector;
    this.openOrJoinBtn;
    this.connection;

    this.engineConfig;
    this.popupUI = null;
    this.broadcasterUI = null;
    this.titleStatus = null;
    this.buttonCloseSession = null;
    this.buttonLeaveSession = null;

    // This is main object for multiplayer stuff
    this.netPlayers = {};
    this.netPlayersCollisionBox = {};
    this.multiPlayerRef = {
      root: this,
      myBigDataFlag: [],
      init(rtcEvent) {
        console.log("c%rtcEvent add new net object -> ", BIGLOG, " -> ", rtcEvent.userid);
        this.root.loader.fbx('./assets/objects/player/walk-forward-r.fbx', 'net_' + rtcEvent.userid).then((r) => {
          r.userData.iam = 'net_' + rtcEvent.userid;
          this.root.netPlayers['net_' + rtcEvent.userid] = r;
          dispatchEvent(new CustomEvent('addToOnlyIntersects', {detail: {o: r}}))
          console.info('[fbx] Setup player character obj =>', r.name);
        })
      },
      update(e) {
        if(e.data.netPos) {
          if(e.data.netType == 'netPlayer') {
            if(typeof this.root.netPlayers['net_' + e.data.netObjId] !== 'undefined') {
              this.root.netPlayers['net_' + e.data.netObjId].position.set(
                e.data.netPos.x,
                e.data.netPos.y - 1.2, // correction
                e.data.netPos.z,
              )
              var axis = new THREE.Vector3(0, 1, 0);
              // this.root.netPlayers['net_' + e.data.netObjId].rotateOnAxis(axis, e.data.netRot.y)
              const quaternion = new THREE.Quaternion();
              quaternion.fromArray([
                0, // e.data.netQuaternion._x,
                e.data.netQuaternion._y,
                0, // e.data.netQuaternion._z,
                e.data.netQuaternion._w]);
              this.root.netPlayers['net_' + e.data.netObjId].quaternion.copy(quaternion);
            }
          }
          if(e.data.netType == 'netEnvObj') {
            // Name must be uniq for now
            var object = this.root.scene.getObjectByName(e.data.netObjId);
            // console.log(e.data.netObjId, " e.data.netPos => " ,e.data.netPos);
            object.userData.physicsBody.setLinearVelocity(
              new Ammo.btVector3(
                e.data.netPos.x,
                e.data.netPos.y,
                e.data.netPos.z));
            // object.position.set(
            //   e.data.netPos.x,
            //   e.data.netPos.y,
            //   e.data.netPos.z,
            // );
            // const quaternion = new THREE.Quaternion();
            // quaternion.fromArray([
            //   e.data.netQuaternion._x,
            //   e.data.netQuaternion._y,
            //   e.data.netQuaternion._z,
            //   e.data.netQuaternion._w]);
            //   object.quaternion.copy(quaternion);
          }
        }

        if(e.data.netDamage) {
          var local = e.data.netDamage.for.replace('net_', '')
          if(local == App.net.connection.userid) {
            console.log('MY DAMAGE =', e.data)
            dispatchEvent(new CustomEvent('onMyDamage', {detail: e.data.netDamage}))
          }
        }
      },
      /**
       * @description
       * If someone leaves all client actions is here
       * - remove from scene
       * - clear object from netObject_x
       * - remove video remote stream dom element
       */
      leaveGamePlay(rtcEvent) {
        let o = this.root.netPlayers['net_' + rtcEvent.userid];
        console.info("rtcEvent LEAVE GAME: ", rtcEvent.userid);
        for(var x = 0;x < this.root.connection.videosContainer.children.length;x++) {
          var test = this.root.connection.videosContainer.children[x].children[2].children[0].innerHTML;
          if(test == rtcEvent.userid) {
            this.root.connection.videosContainer.children[x].remove();
            console.log("::::remove video dom::::::",)
          }
        }
        // remove from 3d scene
        console.info("rtcEvent LEAVE GAME: ", this.root.scene.remove(o));
        delete this.root.netPlayers['net_' + rtcEvent.userid];
        // console.info("rtcEvent LEAVE GAME is undefined: ", this.root.netPlayers['net_' + rtcEvent.userid]);
      }
    };

    this.engineConfig = config.networking;
    this.engineConfig2 = config.networking2;
    this.runKureOrange();

  }


  initDOMKure() {
    this.broadcasterUI = byId("matrix-net");
    // this.titleStatus = byId("rtc3log");
    this.joinSessionUI = byId("join-btn");
    this.joinSessionUI.addEventListener('click', joinSession)
    this.buttonCloseSession = byId('buttonCloseSession')
    this.buttonCloseSession.addEventListener('click', closeSession)
    this.buttonLeaveSession = byId('buttonLeaveSession')
    this.buttonLeaveSession.addEventListener('click', () => {
      console.log('LEAVE SESSION')
      removeUser()
      leaveSession()
    })
  }

  appendDIV = event => {
    if(event.data &&
      (event.data.netPos ||
        event.data.netRot ||
        event.data.netScale ||
        event.data.spitz ||
        event.data.texScaleFactor ||
        event.data.netDamage)) {
      this.injector.update(event);
      return;
    }
  };

  runKureOrange = () => {
    const myInstance = this;

    fetch("./kure/index.html", {
      headers: htmlHeader,
    })
      .then(function(res) {
        return res.text();
      })
      .then(function(html) {
        myInstance.popupUI = byId("matrix-net");
        myInstance.popupUI.style = 'table';
        myInstance.popupUI.innerHTML = html;
        // var cssId = 'myCss';  // you could encode the css path itself to generate id..
        // if (!document.getElementById(cssId))
        // {
        //     var head  = document.getElementsByTagName('head')[0];
        //     var link  = document.createElement('link');
        //     link.id   = cssId;
        //     link.rel  = 'stylesheet';
        //     link.type = 'text/css';
        //     link.href = 'http://website.example/css/stylesheet.css';
        //     link.media = 'all';
        //     head.appendChild(link);
        // }
        var testLoadJS = document.createElement('script')
        testLoadJS.src = "./kure/openvidu-browser-2.20.0.js"
        testLoadJS.onload = () => {
          console.log('SCRIPT LOADED OV NOW INIT DOM EVENTS')
          myInstance.initDOMKure();
        }
        document.body.appendChild(testLoadJS)
        if(true) {
          console.log("%c Try auto connect [KURE]. for 1 secounds [fix already have offer]", NETLOG);
          myInstance.injector = myInstance.multiPlayerRef;
        }
      });
  };
}