
# MagicThree

## Logo
<img src="https://github.com/zlatnaspirala/magic-three/blob/main/magic-three-ammo/public/assets/icons/icon.png" width="200" height="200">

Using power of Three.js, ammo.js. MagicThree is nice class sorted top level of threejs and ammo.js. Magic-three use the new version threejs 149.
[JS type of script `module` variant with last version of three.module.js] 

## Description
  Magic-Three is First Person Oriented but can be used for any other case of app flow.
  - No build needed, just copy/paste.
  - No package.json [if this repo become npm package then will be back]
  - Must be fully PWA [cache, server compression, image format webp etc...]

### Config

```js
const config = {
  cache: true,
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


## Features
 - Dynamic Cache/Worker [pwa]
 - Graphics/Physics ready.

## Next features
 - Add 3d object loaders
 - Integrate networking

## Credits
 - https://threejs.org/
 - https://github.com/kripken/ammo.js/
 - In Assets i use great mixamo.com.


## More info

### Image formats like WebP and AVIF often provide better compression than PNG or JPEG, 
### which means faster downloads and less data consumption.

### At separated branch you can find [old-arhive]:
- old [threejs version 75 , 68 etc...]
   Lot of crazzy staff but you need to make it running... [deplaced methodology]

### Magic-three-cannonjs old but still good! [threejs version 75]
 - Very simple top level code! [Still developing at this base]
