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
      enabled: true,
      uniforms: {
        turbidity: 0.5,
        rayleigh: 3,
        mieCoefficient: .05,
        mieDirectionalG: .01,
      }
    },
    background: 0xffffff,
    floorWidth: 200,
    floorHeight: 200,
    gravityConstant: 17.5,
    directionLight: {
      color: 0x3f3f3f,
      intensity: 50,
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
      receiveShadow: true,
      computeVertexNormals: true
    },
    blockingVolumes: {
      visible: false
    },
    collision: {
      detectCollision: true
    },
    nightAndDay: {
      enabled : true,
      animSun: 1000,
      nightFallsAt: 19,
      dawnAt: 6
    }
  },
  playerController: {
    type: 'FPS', // FPS | orbit
    movementType: 'velocity', // velocity | kinematic
    cameraInitPosition: {x: 0, y: 0, z: 72},
    alwaysRun: false,
    mobile: {
      hudControls: true
    },
    movementSpeed: {
      forward: 20, backward: 10,
      left: 9, right: 9,
      jump: 11, jumpLimitInterval: 2000
    },
    physicsBody: {
      typeOfPlayerCapsule: 'cube', // ball
      visible: false,
      radius: 2, cubeCapsuleScale: [2.5, 2.5, 2.5],
      mass: 10
    },
    bullet: {
      mass: 20,
      radius: 1,
      power: 200,
      bulletLiveTime: 1000
    },
    playerData: {
      energy: 1000
    },
    playerItems: {
      munition: 200
    },
		onEvent : {
			onDie: "justHideNetPlayer" // "justHideNetPlayer" | "reload"
		}
  },
  networking: {
    broadcasterPort: 9001, // use dev stage 
    broadcasterInit: true,
    domain: "maximumroulette.com",
    // domain: "localhost",
    networkDeepLogs: true,
    /**
     * masterServerKey is channel access id used to connect
     * endpoint p2p. Multimedia server channel/multiRTC3 used.
     */
    masterServerKey: "magic.three.main.channel",
    runBroadcasterOnInt: true,
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
