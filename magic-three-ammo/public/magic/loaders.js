
import * as THREE from "three";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class MagicLoader {

  mixer;

  loadedMeshs = [];

  constructor(scene) {
    this.scene = scene;
  }

  fbx(p) {
    const loader = new FBXLoader();
    loader.load(p, (object) => {
      this.mixer = new THREE.AnimationMixer(object);
      const action = this.mixer.clipAction(object.animations[0]);
      action.play();
      object.traverse(function(child) {
        if(child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      object.name = 'zombie';
      object.scale.setScalar(0.045);
      this.scene.add(object);
      this.loadedMeshs.push(object);
    });
  }
}
