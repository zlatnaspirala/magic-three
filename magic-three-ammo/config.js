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
    near: 0.2,
    far: 2000,
    order: 'YXZ'
  },
  map: {
    sky: {
      enabled: false,
      uniforms: {
        turbidity: 0.5,
        rayleigh: 3,
        mieCoefficient: .05,
        mieDirectionalG: .01,
      }
    },
    background: 0x666f6f,
    floorWidth: 200,
    floorHeight: 200,
    gravityConstant: 17.5,
    directionLight: {
      color: 0x333333,
      intensity: 5,
      LRTB: 14,
      shadow: {
        camera: {
          near: 2,
          far: 50
        },
        mapSize: {
          x: 1024,
          y: 1024
        }
      }
    },
    ambientLight: {
      color: "rgb(250,250,250)"
    },
    meshShadows: {
      castShadow: false,
      receiveShadow: false,
      computeVertexNormals: false
    },
    blockingVolumes: {
      visible: false
    },
    collision: {
      detectCollision: false
    }
  },
  playerController: {
    type: 'FPS', // FPS | orbit
    movementType: 'velocity', // velocity | kinematic
    cameraInitPosition: {x: 0, y: 0, z: 70},
    movementSpeed: {
      forward: 18, backward: 6,
      left: 8, right: 8,
      jump: 11, jumpLimitInterval: 2000
    },
    physicsBody: {
      typeOfPlayerCapsule: 'cube', // ball
      visible: false,
      radius: 2, cubeCapsuleScale: [1, 1, 1],
      mass: 10
    },
    bullet: {
      mass: 20,
      radius: 0.1,
      power: 200,
      bulletLiveTime: 1000
    },
    playerData: {
      energy: 1000
    },
    playerItems: {
      munition: 200
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
    broadcasterPort: 9001, // 9010,
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
  },
}

export default config;
