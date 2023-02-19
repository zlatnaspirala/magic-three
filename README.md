
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

```js
Frontend -> Three.js, Ammo.js
Backend  -> Node.js, MultiRTC3
```

### Client Config

```js
const config = {
  cache: true,
  stats: false,
  map: {
    background: 0xbfd1e5,
    floorWidth: 200,
    floorHeight: 200,
  },
  playerController: {
    type: 'FPS', // FPS | orbit
    movementType: 'velocity', // velocity | kinematic
    cameraInitPosition: {x: 0, y: 5, z: 10}
  }
}
```
## If you wanna start host server and broadcaster[webRtc] then:

```js
cd backend
npm i
npm run magic
```

I force default browser port 443! To make all works fine.
For `localhost` cert doesnt matter. For public server you need classic ssl setup.

After all goto https://localhost/public/module.html
You can easy manage paths. Defoult is `https` protocol.

## Features
 - Dynamic Cache/Worker, add to home screen. [pwa]
 - Graphics/Physics ready.
 - Prod/Dev Mode switch [now]

## Next features
 - Add 3d object loaders [fbx]
 - Integrate networking and self hosting based on node.js
 - Create bash or any script to make minify all module javascript. [To make little more performance better - lighthouse chrome]

## Credits
 - https://threejs.org/
 - https://github.com/kripken/ammo.js/
 - In Assets i use great mixamo.com.

## More info
I have performance stable at ~90% value. I load extra fbx animation 22Mb to test little more better.
Image formats like WebP and AVIF often provide better compression than PNG or JPEG, 
which means faster downloads and less data consumption. I use freeware GIMP he had a webp format support for exports.
Lighthouse screenshot:
<img src="https://github.com/zlatnaspirala/magic-three/blob/main/non-project-files/pwa.png" width="800" height="500">


### At separated branch you can find [old-arhive]:
- old [threejs version 75 , 68 etc...]
   Lot of crazzy staff but you need to make it running... [deplaced methodology]

### Magic-three-cannonjs old but still good! [threejs version 75]
 - Very simple top level code! [Still developing at this base]
