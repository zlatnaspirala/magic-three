import * as THREE from "three";
import {MagicLoader} from "../loaders.js";
import {BIGLOG, NETLOG, REDLOG, byId, createAppEvent, getAxisAndAngelFromQuaternion, htmlHeader} from "../utility.js";
import {closeSession, MEDIASERVER, joinSession, removeUser, session} from "../../kure/kure.js";

import {label} from "../multi-lang.js";
let t = label.t;

export class KureBroadcaster {

  constructor(config, scene) {
    MEDIASERVER.domain = config.networking2.domain; // 'https://maximumroulette.com:2020';
    this.scene = scene;
    this.loader = new MagicLoader(config, scene);
    this.injector;
    this.openOrJoinBtn;
    this.connection = {};

    this.session = session;

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
      init(rtcEvent, videoTex) {
        console.log(`%c Add new net object ${rtcEvent.userid}`, BIGLOG);
        this.root.loader.fbx('./assets/objects/player/walk-forward-r.fbx', 'net_' + rtcEvent.userid).then((r) => {
          r.userData.iam = 'net_' + rtcEvent.userid;
          this.root.netPlayers['net_' + rtcEvent.userid] = r;

          if(typeof rtcEvent.videoTex !== 'undefined') {
            // test
            var geo = new THREE.PlaneBufferGeometry(100, 100, 4, 4);
            var mat = new THREE.MeshBasicMaterial({map: rtcEvent.videoTex, side: THREE.DoubleSide});
            var plane = new THREE.Mesh(geo, mat);
            plane.position.y = 225;
            console.log(`%c TEST ??????Add new net object ${rtcEvent.userid}`, BIGLOG);
            this.root.netPlayers['net_' + rtcEvent.userid].add(plane)
          }


          dispatchEvent(new CustomEvent('addToOnlyIntersects', {detail: {o: r}}))
          console.info('[fbx] Setup player character obj =>', r.name);
        })
      },
      update(e) {
        e.data = JSON.parse(e.data);
        if(e.data.netPos) {
          if(e.data.netType == 'netPlayer') {
            if(typeof this.root.netPlayers['net_' + e.data.netObjId] !== 'undefined') {
              this.root.netPlayers['net_' + e.data.netObjId].position.set(
                e.data.netPos.x,
                e.data.netPos.y - 2.1, // correction
                e.data.netPos.z,
              )
              var axis = new THREE.Vector3(0, 1, 0);

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
                e.data.netPos.z))
          }
        }
        if(e.data.netDamage) {
          var local = e.data.netDamage.for.replace('net_', '')
          if(local == App.net.connection.session.connection.connectionId) {
            dispatchEvent(new CustomEvent('onMyDamage', {detail: e.data.netDamage}))
          }
        }
        if(e.data.killScore) {
          dispatchEvent(new CustomEvent('onHudMsg', {detail: {msg: `[score+1][${e.data.killScore.killer}]`}}))
          // killer - MUST BE FIXED PREVENT LOCAL 
          console.log(`%c 🏴‍☠️ KILL SCORE 🏴‍☠️ [${e.data.killScore.netPlayerId}] dies.`, REDLOG)
          var t = this.root.scene.getObjectByName(e.data.killScore.netPlayerId)

          if(t) {
            t.position.set(this.root.config.map.playersSpawnPoints.x, this.root.config.map.playersSpawnPoints.y, this.root.config.map.playersSpawnPoints.z)
          } else {
            console.log('NOT EXIST - probably same connectionID')
          }

          // dispatchEvent( new CustomEvent(`destroy3dObject`, { detail: t}))
          byId('playerKills').innerHTML = parseFloat(byId('playerKills').innerHTML) + 1;
        }
      }
    };

    this.config = config;
    this.engineConfig2 = config.networking2;
    this.runKureOrange();

    addEventListener('setupSessionObject', (e) => {
      this.connection.session = session;
      this.connection.session.on(`signal:${this.config.networking2.masterChannel}`, (event) => {
        // console.log("RECEIVED=>", JSON.parse(event.data));
        App.net.injector.update(event);
      });
      var CHANNEL = this.config.networking2.masterChannel
      // console.log("ONLY ONES CHANNEL =>", CHANNEL);
      this.connection.send = (netArg) => {
        // to Array of Connection objects (optional. Broadcast to everyone if empty)
        this.connection.session.signal({
          data: JSON.stringify(netArg),
          to: [],
          type: CHANNEL
        }).then(() => {
          // console.log('emit all successfully');
        }).catch(error => {
          console.error("Erro signal => ", error);
        });
      }
    })
  }

  initDOMKure() {
    this.broadcasterUI = byId("matrix-net");
    this.joinSessionUI = byId("join-btn");
    this.joinSessionUI.addEventListener('click', joinSession)
    this.buttonCloseSession = byId('buttonCloseSession')
    this.buttonCloseSession.addEventListener('click', closeSession)
    // hide close
    this.buttonCloseSession.remove();

    this.buttonLeaveSession = byId('buttonLeaveSession')
    this.buttonLeaveSession.addEventListener('click', () => {
      console.log('LEAVE SESSION')
      removeUser()
      leaveSession()
    })

    // auto start1
    joinSession({
      resolution: '160x120'
    });

    byId('netHeaderTitle').addEventListener('click', this.domManipulation.hideNetPanel)

    byId('matrix-net').style.display = 'block';
    const videoChatBtn = document.getElementById('videoChatBtn');
    videoChatBtn.addEventListener("click", this.domManipulation.hideNetPanel)

  }

  runKureOrange = () => {
    const myInstance = this;

    fetch("./kure/index.html", {headers: htmlHeader, }).then(function(res) {return res.text()})
      .then(function(html) {
        myInstance.popupUI = byId("matrix-net");
        myInstance.popupUI.style = 'table';
        myInstance.popupUI.innerHTML = html;
        var testLoadJS = document.createElement('script')
        testLoadJS.src = "./kure/openvidu-browser-2.20.0.js"
        testLoadJS.onload = () => {
          myInstance.initDOMKure();
        }
        document.body.appendChild(testLoadJS)
        if(true) {
          console.log("%c Try auto connect [KURE]. for 1 secounds [fix already have offer]", NETLOG);
          myInstance.injector = myInstance.multiPlayerRef;
        }
      });
  };

  domManipulation = {
    hideNetPanel: () => {
      if(byId('matrix-net').classList.contains('hide-by-vertical')) {
        byId('matrix-net').classList.remove('hide-by-vertical')
        byId('matrix-net').classList.add('show-by-vertical')
        byId('netHeaderTitle').innerText = 'HIDE';
        byId('matrix-net').style.display = 'block';
      } else {
        byId('matrix-net').classList.remove('show-by-vertical')
        byId('matrix-net').classList.add('hide-by-vertical')
        byId('netHeaderTitle').innerText = 'maximumroulette.com';
      }
    }
  }
}