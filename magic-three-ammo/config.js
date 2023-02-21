import {getProtocolFromAddressBar, getDomain} from "./public/magic/utility.js";

/**
 * @description
 * MagicThree config file.
 */
const config = {
  cache: false,
  stats: false,
  camera: {
    fov: 60,
    near: 0.1,
    far: 2000
  },
  map: {
    background: 0xbfd1e5,
    floorWidth: 200,
    floorHeight: 200,
  },
  playerController: {
    type: 'FPS', // FPS | orbit
    movementType: 'velocity', // velocity | kinematic
    cameraInitPosition: {x: 10, y: 5, z: 10},
    movementSpeed : {
      forward: 8, backward: 6, left: 8, right: 8, jump : 10
    }
  },
  networking: {
    broadcasterPort: 9001,
    broadcasterInit: true,
    // domain: "maximumroulette.com",
    domain: "localhost",
    networkDeepLogs: true,
    /**
     * masterServerKey is channel access id used to connect
     * endpoint p2p. Multimedia server channel/multiRTC3 used.
     */
    masterServerKey: "magic.three.main.channel",
    runBroadcasterOnInt: true,
    broadcasterPort: 9010,
    broadcastAutoConnect: true,
    broadcasterSessionDefaults: {
      sessionAudio: true,
      sessionVideo: false,
      sessionData: true,
      enableFileSharing: true,
    },
    stunList: [
      "stun:stun.l.google.com:19302",
      "stun:stun1.l.google.com:19302",
      "stun:stun.l.google.com:19302?transport=udp",
    ],
    getBroadcastSockRoute() {
      return getProtocolFromAddressBar() + getDomain() + ":" + this.broadcasterPort + "/";
    }
  }
}

export default config;
