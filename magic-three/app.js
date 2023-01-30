
import { Magic } from './src/scene';


let MyApp = new Magic();

// Classic three.js objects.
// const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
// const material = new THREE.MeshNormalMaterial();
// const mesh = new THREE.Mesh(geometry, material);

console.info('MyApp started.', MyApp.CANNON_SCENE.CREATE_BOX_CANNON)

MyApp.CANNON_SCENE.CREATE_BOX_CANNON({x: 0, y: 2, z:-26})
MyApp.CANNON_SCENE.CREATE_BOX_CANNON({x: 0, y: 12, z:-26})
MyApp.CANNON_SCENE.CREATE_BOX_CANNON({x: 0, y: 2, z:26})
// MyApp.scene.add(mesh);


console.info('MyApp started.')
window.MyApp = MyApp;
