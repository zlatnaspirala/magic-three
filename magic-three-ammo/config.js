import {getProtocolFromAddressBar, getDomain} from "./public/magic/utility.js";

/**
 * @description
 * MagicThree config file.
 */
const config = {
  cache: false,
  stats: false,
  forceFullScreen: true,
  camera: {
    fov: 60,
    near: 0.2,
    far: 2000,
    order: 'YXZ'
  },
  map: {
    autoplayBgMusic: true,
    sky: {
      enabled: true,
      uniforms: {
        turbidity: 0.5,
        rayleigh: 3,
        mieCoefficient: .05,
        mieDirectionalG: .01,
      }
    },
    background: 0x00ffff,
    floorWidth: 200,
    floorHeight: 200,
    gravityConstant: 17.5,
    directionLight: {
      color: 0x000000,
      intensity: 15,
      LRTB: 14,
      shadow: {
        camera: {
          near: 1,
          far: 50
        },
        mapSize: {
          x: 2048,
          y: 2048
        }
      }
    },
    ambientLight: {
      color: "rgb(250,250,250)"
    },
    meshShadows: {
      castShadow: true,
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
    },
    playersSpawnPoints: [
      {x: 0, y: 200 , z: 20}
    ]
  },
  playerController: {
    type: 'FPS', // FPS | orbit
    movementType: 'velocity', // velocity | kinematic
    cameraInitPosition: {x: 0, y: 0, z: 72},
    alwaysRun: false,
    mobile: {
      hudControls: true,
      hudBtnsWidth: '16%',
      hudBtnsHeight: '6%'
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
      radius: 0.07,
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
  useRCSAccount: true,
  RCSAccountDomain: "https://maximumroulette.com",
  networking: {
    broadcasterPort: 9001, // use dev stage 
    broadcasterInit: false,
    // domain: "maximumroulette.com",
    domain: "localhost",
    networkDeepLogs: true,
    /**
     * masterServerKey is channel access id used to connect
     * endpoint p2p. Multimedia server channel/multiRTC3 used.
     */
    masterServerKey: "magic.three.main.channel",
    runBroadcasterOnInt: false,
    broadcastAutoConnect: false,
    /**
     * If you dont wanna initially camera call
     * you need to set audio AND video to `false`
     * Data works by default.
     */
    broadcasterSessionDefaults: {
      sessionAudio: true,
      sessionVideo: true,
      sessionData: true,
      enableFileSharing: true,
    },
    stunList: [
      "stun:maximumroulette.com:5349?transport=udp",
      "stun:maximumroulette.com:3478?transport=udp",
      "maximumroulette.com:3478",
      "maximumroulette.com:5349",
      "stun:stun.l.google.com:19302",
      "stun:stun1.l.google.com:19302",
      "stun:stun.l.google.com:19302?transport=udp",
    ],
    getBroadcastSockRoute() {
      return getProtocolFromAddressBar() + getDomain() + ":" + this.broadcasterPort + "/";
    }
  },
  networking2: {
    domain: 'https://maximumroulette.com:2020',
    masterChannel: "magic",
    runKureOnInt: true,
    publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
    publishVideo: true, // Whether you want to start publishing with your video enabled or not
    mobilePublishVideo: false,
    mobilePublishAudio: false
  }
}

export default config;
