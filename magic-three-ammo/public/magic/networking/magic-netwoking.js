import ClientConfig from "../../../config.js";
import {Broadcaster} from "./net.js";

export class MagicNetworking {
  net = {};
  constructor() {}

  activateNet = () => {
    this.net = new Broadcaster(ClientConfig, this.scene);
    console.info('Networking is active.');
    // Inject
    this.net.createNetPlayerCollisionBox = this.createNetPlayerCollisionBox;
    this.net.physicsWorld = this.physicsWorld;
    this.net.rigidBodies = this.rigidBodies;
  }

}
