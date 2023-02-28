
# MagicThree

## Logo
<img src="https://github.com/zlatnaspirala/magic-three/blob/main/magic-three-ammo/public/assets/icons/icon.png" width="200" height="200">

Using power of Three.js, ammo.js. MagicThree is nice class sorted top level of threejs and ammo.js. Magic-three use the new version threejs 149.
[JS type of script `module` variant with last version of three.module.js]

## Description
  Magic-Three is First Person Oriented but can be used for any other case of app flow.
  - No build needed, just copy/paste for both dev and prod mode.
  - No package.json [if this repo become npm package then will be back]
    In folder ./backend we have package.json to import deps (npm i) for server part.
  - Must be fully PWA [cache, server compression, image format webp etc...]
  - MultiLang support
  - Networking based on webRtc multiRTC3 library. Signaling server,
    video chat or stream to texture.


### `Frontend -> Three.js, Ammo.js`
### `Backend  -> Node.js, MultiRTC3`


### Client Config

```js
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
    gravityConstant: 17.5
  },
  playerController: {
    type: 'FPS',                 // FPS | orbit
    movementType: 'velocity',    // velocity | kinematic
    cameraInitPosition: {x: 10, y: 5, z: 10},
    movementSpeed : {
      forward: 8, backward: 6,
      left: 8, right: 8,
      jump : 10
    },
    bullet: {
      mass: 30,
      radius: 0.2,
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
```

## Backend part based on multiRTC3.
If you wanna start host server and broadcaster[webRtc] then:

```js
cd backend
npm i
npm run magic
```

I force default browser port 443! To make all works fine.
For `localhost` cert doesnt matter. For public server you need classic ssl setup.

After all goto https://localhost/public/module.html
You can easy manage paths. Default is `https` protocol and also recommended in multiplayer mode.

## Features
 - Dynamic Cache/Worker, add to home screen. [pwa]
 - Graphics/Physics ready.
 - Prod/Dev Mode switch [wip]
 - Add 3d object loaders [fbx]

## Next feature
 - Fix Jump
 - Add shooting `fire`
 - Add player items handler
 - Integrate networking and self hosting based on node.js
 - Create bash or any script to make minify all module javascript. [To make little more performance better - lighthouse chrome]


## More info about PWA
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

### Networking

  - Every player send own `net.connection.userid`.

  - boxs map loader hace support for net


## Credits && Licence
 - https://threejs.org/
 - https://github.com/kripken/ammo.js/
 - In Assets i use great https://mixamo.com/


## More

### At separated branch you can find [old-arhive]:
- old [threejs version 75 , 68 etc...]
   Lot of crazzy staff but you need to make it running... [deplaced methodology]

### Magic-three-cannonjs old but still good! [threejs version 75]
 - Very simple top level code! [Still developing at this base]
