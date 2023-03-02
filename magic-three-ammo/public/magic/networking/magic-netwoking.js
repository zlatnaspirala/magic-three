import ClientConfig from "../../../config.js";
import {Broadcaster} from "./net.js";

export class MagicNetworking {

  net = {};

  activateNet = () => {
    this.net = new Broadcaster(ClientConfig, this.scene);
    console.info('Networking is active =>', this.net);
  }

}
