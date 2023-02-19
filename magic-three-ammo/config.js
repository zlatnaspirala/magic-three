import {getProtocolFromAddressBar, getDomain} from "./public/magic/utility.js";

/**
 * @description
 * MagicThree config file.
 */
const config = {
  cache: false,
  stats: false,
  map: {
    background: 0xbfd1e5,
    floorWidth: 200,
    floorHeight: 200,
  },
  playerController: {
    type: 'FPS', // FPS | orbit
    movementType: 'velocity', // velocity | kinematic
    cameraInitPosition: {x: 10, y: 5, z: 10}
  },
  networking: {
    broadcasterPort: 9001,
    broadcasterInit: true,
    /**
     * @description
     * Default setup is `dev`.
     * recommendent to use for local propose LAN ip
     * like : 192.168.0.XXX if you wanna run ant test app with server.
     */
    // domain: "maximumroulette.com",
    domain: "localhost",
    /**
     * networkDeepLogs control of dev logs for webRTC context only.
     */
    networkDeepLogs: true,
    /**
     * masterServerKey is channel access id used to connect
     * multimedia server channel/multiRTC3
     */
    masterServerKey: "magic.three.main.channel",
    /**
     * @description
     * runBroadcasterOnInt load broadcaster
     */
    runBroadcasterOnInt: true,
    broadcastAutoConnect: true,
    /**
     * @description
     * broadcasterPort Port used to connect multimedia server MultiRTC3.
     * I will use it for explicit video chat multiplatform support.
     * Default value is 9001
     */
    broadcasterPort: 9010,
    /**
     * @description
     * broadcaster socket.io address.
     * Change it for production regime
     */
    broadcastAutoConnect: false,
    /**
     * @description
     * broadcaster rtc session init values.
     * Change it for production regime
     */
    broadcasterSessionDefaults: {
      sessionAudio: true,
      sessionVideo: false,
      sessionData: true,
      enableFileSharing: true,
    },
    /**
     * @description
     * Optimal for dev stage.
     * read more about webRtc protocols.
     * Recommended: coturn open source project.
     */
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
