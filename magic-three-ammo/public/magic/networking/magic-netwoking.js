import ClientConfig from "../../../config.js";
import {session} from "../../kure/kure.js";
import {ANYLOG} from "../utility.js";
import {KureBroadcaster} from "./net2.js";
import {Broadcaster} from "./net.js";

export class MagicNetworking {
  net = {};
  constructor() {}
  activateNet = (arg) => {
    if(typeof arg === 'undefined') {
      this.net = new Broadcaster(ClientConfig, this.scene);
      console.info('%cMagic-Three: Networking (rtcMulti) is active.', ANYLOG);
    } else {
      this.net = new KureBroadcaster(ClientConfig, this.scene);
      console.info('%cMagic-Three: Networking (kurento/OpenVidu) is active.', ANYLOG);
    }
    // Inject
    this.net.createNetPlayerCollisionBox = this.createNetPlayerCollisionBox;
    this.net.createBlockingBox = this.createBlockingBox;
    this.net.physicsWorld = this.physicsWorld;
    this.net.rigidBodies = this.rigidBodies;
  }
}