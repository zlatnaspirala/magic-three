# MagicThree

Using power of Three.js and cannonjs. MagicThree is nice class sorted top level of threejs/cannonjs.

Base version of threejs for now is `75`.

 - Frontend old
 - Magic-three new version



### Main instance

```js
import {Magic} from "./js/magic-base";

/**
 * @description
 * Main instance
 */
let Application = new Magic();

/**
 * @description
 * Add you 3d elements.
 * - prepare materials
 */

Application.createCubeRefraction('./assets/myCubeMap/reflection/')
Application.createMyMaterials('./assets/metal/metal1.jpg');
// Application.addChain()

console.log("What is ", Application.assets);

const options = {
  position: {x: 10, y: 10, z: 10},
  dimension: [1,1,1],
  material: Application.assets.front
};

Application.addMagicBox(options);

console.info('Magic is here.');

```