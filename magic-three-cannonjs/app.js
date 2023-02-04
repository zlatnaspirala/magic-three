
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

// "FEMALE", "tshirts.obj", "res/tshirts/", "tshirts.mtl")

Application.useMyLoaders().then(() => {
  // Application.loaders.loadObj('objs/male/', 'male02.obj' , 'male02.mtl', { scale: 0.01}) pass
  // Application.loaders.loadFbx('objs/scary-zombie-pack-woman/zombie-walk.fbx')  
  // Application.loaders.loadFbx('objs/Samba Dancing.fbx')  not pass
  Application.loaders.loadCollada('objs/collada/zombie/running crawl.dae');
});

// Application.loaders.loadObj('male02.obj', 'objs/male/', 'male02.mtl')
console.log("What is ", Application.assets);

const options = {
  position: {x: 10, y: 10, z: 10},
  dimension: [1,1,1],
  material: Application.assets.front
};

Application.addMagicBox(options);

window.Application = Application;
console.info('Magic is here.');

