
# MagicThree

## Logo
<img src="https://github.com/zlatnaspirala/magic-three/blob/main/magic-three-ammo/public/assets/icons/icon.png" width="200" height="200">

Using power of Three.js, ammo.js. MagicThree is nice class sorted top level of threejs and ammo.js. Magic-three use the new version threejs 149.
[JS type of script `module` variant with last version of three.module.js]

## Description
  Magic-Three is First Person Oriented but can be used for any other case of app flow.
  - No build needed, just copy/paste for both dev and prod mode.It is the module type of script.
    Nice fit with npm modules also works direct in browser.
  - Custom magic Map loader. All 3d objects comes from map.
  - No package.json [if this repo become npm package then will be back]
    In folder ./backend we have package.json to import deps (npm i) for server part.
    Run in folder  `./backend` cmd: `npm i` and `npm run magic` for host and broadcaster.
  - Must be fully PWA [cache, server compression, image format webp etc...]
  - MultiLang support [async load JSON MultiLang file avoid loading all multiLangs]
  - Networking based on webRtc multiRTC3 library. Signaling server,
    video chat or stream to texture.
  - Basic example: FPS Player controller [bullet , collision]

### `Frontend -> Three.js, Ammo.js`
### `Backend  -> Node.js, MultiRTC3`

## Main gameplay template FPShoter: Hang3d Reborn
```js
import Application from './Application.js';
import config from './config.js';
import myGamePlayMagicMap from './public/assets/maps/free-for-all.js';

let App = new Application(config, myGamePlayMagicMap);
```


### Client Config

```js
const config = {
  cache: false,
  stats: false,
  camera: {
    fov: 60,
    near: 0.1,
    far: 2000,
    order: 'YXZ'
  },
  map: {
    sky: {
      enabled: true
    },
    background: 0xbfd1e5,
    floorWidth: 200,
    floorHeight: 200,
    gravityConstant: 17.5,
    directionLight: {
      color: 0xffffff,
      intensity: 5
    },
    ambientLight: {
      color:  "rgb(250,250,250)"
    },
    meshShadows: {
      castShadow: false,
      receiveShadow: false,
      computeVertexNormals: false
    },
    blockingVolumes: {
      visible: false
    }
  },
  playerController: {
    type: 'FPS', // FPS | orbit
    movementType: 'velocity', // velocity | kinematic
    cameraInitPosition: {x: 0, y: 0, z: -80},
    movementSpeed : {
      forward: 8, backward: 6,
      left: 8, right: 8,
      jump : 11, jumpLimitInterval: 2000
    },
    physicsBody : {
      visible: false,
      radius: 2,
      mass: 10
    },
    bullet: {
      mass: 2,
      radius: 0.1,
      power: 100,
      bulletLiveTime: 1000
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
  }
}
```

Blocking Volumes implemented for map -  `map.objMtlsArray` :
<img src="https://github.com/zlatnaspirala/magic-three/blob/main/non-project-files/screen1.png" width="800" height="500">
Nice for walls and env staff. Forced simple cube physics body with mass = 0.


## Frontend 
Frontend done in script type "module" ant it's so powerfull.
No build time lost.

List of top level CustomEvents :
 - "config.map.blockingVolumes.visible"  - if QueryString.dev == "true" (URL param ?dev=true)
 - "onMyDamage"
 - "onDie"
 - "onFire"
 - "hide-blocker"
 - "multi-lang-ready"
 - "addToOnlyIntersects"
 
 Explanation in next update...


## Backend part based on multiRTC3.
For now only signaling pricipe is implemented.
If you wanna start host server and broadcaster[webRtc] then:

```js
cd backend
npm i
npm run magic
```

I force default browser port 443! To make all works fine.
For `localhost` cert also better https. For public server you need classic ssl setup.

Navigate (most simple way to fix localhost cert problem is to click advanced -> Proceed to localhost (unsafe))
https://localhost/public/module.html

If still networking not work then goto:
https://localhost:9001/
click advanced -> Proceed to localhost (unsafe)


After all goto https://localhost/public/module.html
Must work now.
You can easy manage paths. Default is `https` protocol and also recommended in multiplayer mode.


## Dev stage
   Easy running also on VPS:
 - https://maximumroulette.com/apps/magic/public/module.html


## Features
 - Dynamic Cache/Worker, add to home screen. [pwa]✅
 - Graphics/Physics scene ready.✅
 - Add 3d object loaders [fbx, collada]✅
 - Script compression bash script✅
 - Basic FPS controller✅
 - Adding map pack principle.✅
 - Net Players.✅
 - Real Day time - sky sync +.⏳
 - Add account options REST API [rocketCraftingServer]
   singin , leaderboard.⏳
 - Net Shared objects +.⏳
 - Neutral enemy [bots] +.⏳

# Map [] ⏳

Working example:
```js

let map = {
  breakable: [
    {
      name: "myBreakAbleBox1",
      mass: 100,
      scale: {x: 2, y: 5, z: 2},
      pos: {x: 3, y: 1, z: 1},
      quat: [0, 0, 0, 1],
      matFlag: 'Black' // new
    }
  ],
  boxs: [
    {
      name: "myMidBox1",
      net: true,
      mass: 10,
      scale: {x: 5, y: 5, z: 5},
      pos: {x: 0, y: 1, z: 20},
      quat: [0, 0, 0, 1],
      matFlag: 'Bronze'
    }
  ],
  tubes: [
    {
      name: "myTube1",
      mass: 1000,
      scale: [5, 5, 20, 32],
      pos: {x: -20, y: 1, z: -80},
      quat: [0, 0, 0, 1]
    },
    {
      name: "myTube2",
      mass: 1000,
      scale: [5, 5, 20, 32],
      pos: {x: 20, y: 1, z: -80},
      quat: [0, 0, 0, 1]
    }
  ],
  torus: [
    {
      name: "myTorus1",
      mass: 1000,
      scale: [10, 3, 16, 100],
      pos: {x: 30, y: 1, z: 1},
      quat: [0, 0, 0, 1]
    }
  ],
  pointLights: [
    {
      name: 'l1',
      color: 0xff0040,
      radius: 2,
      intensity: 150,
      pos: {x: 30, y: 12, z: 10},
      helper: true
    },
    {
      name: 'l2',
      color: 0xeeee40,
      radius: 2,
      intensity: 510,
      pos: {x: -30, y: 12, z: 10},
      helper: true
    }
  ],
  objMtls: [
    {
      path: 'assets/objects/env/wall1.obj',
      name: 'myWall_1',
      pos: {x:-100, y:-0.5, z:-42}
    }
  ],
  objMtlsArray: [
    {
      path: 'assets/objects/env/wall1.obj',
      name: 'myWall',
      instances: [
        {pos: {x: -100, y: -0.5, z: -62}},
        {
          pos: {x: 52.8, y: -0.5, z: 86.5},
          rot: {x: 0, y: 90, z: 0}
        }
      ]
    }
  ]
};

export default map;

```

## More info about PWA ⏳
I have performance stable at ~90% value. I load extra fbx animation 22Mb to test little more better.
Image formats like WebP and AVIF often provide better compression than PNG or JPEG, 
which means faster downloads and less data consumption. I use freeware GIMP he had a webp format support for exports.

Lighthouse screenshot:
<img src="https://github.com/zlatnaspirala/magic-three/blob/main/non-project-files/pwa.png" width="800" height="500">

No need for PWA at dev/localhost work.
In final time you can use .prod.js compressed files to make full optimised app with better preformance.


### MultiLang [strings]

Only on startup for now:
```js
    addEventListener('multi-lang-ready', () => {
      byId('header.title').innerHTML = t('title');
      byId('player.munition.label').innerHTML = t('munition');
      ...
    });
```

### Networking [WEBRTC/IOSOCKET] 💫

  - I use classic broadcester from matrix-engine-server/visual ts [multiRTC3]
  - Every player send own `net.connection.userid`.
  - Type of gameObject `boxs` map loader have support for net emit. ⏳

### Explanation of FPS used concept
 - Local Player have no any visual objs , only main three.js camera follow player position and look direction.
 - Net Player [remote player] have visualization with FBX animation. Net rotated only for Y axis for now.
 - Local Player have physics body ball who is moved from physics world
   on that way we got all collision problem fixed.
 - Net Player have no physics body also no any collision objs i use raycaster from three.js in net player case
   On that way i got optimised and precise situation with netplayer handling.

## Credits && Licence
 - https://threejs.org/
 - https://github.com/kripken/ammo.js/
 - In Assets i use great https://mixamo.com/
 - Mobile controller used from 
   https://github.com/KEY4d-LAB/crypto-art-town
 - Networking based on https://github.com/muaz-khan/RTCMultiConnection

## More


### Problem with  > 100Mb file size upload on github use this link for fbx animations
(prepared in blender) you can open it in any 3d editor:
https://drive.google.com/drive/folders/194gsNMBvljJgK_2nyM4paA-veBZl8_Tf?usp=sharing


### Update deps
 - npm outdated
 

### At separated branch you can find [old-arhive]:
- old [threejs version 75 , 68 etc...]
   Lot of crazzy staff but you need to make it running... [deplaced methodology] ☣

### Magic-three-cannonjs old but still good! [threejs version 75]
 - Very simple top level code! [Still developing at this base]
