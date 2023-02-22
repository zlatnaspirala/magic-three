
import * as THREE from "three";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class MagicLoader {

  mixers = [];

  loadedMeshs = [];

  constructor(scene) {
    this.scene = scene;
  }

  async fbx(p, refName) {
    return new Promise((resolve, reject) => {
    const loader = new FBXLoader();
    loader.load(p, (object) => {
      this.mixers.push(new THREE.AnimationMixer(object));
      this.action = this.mixers[this.mixers.length - 1].clipAction(object.animations[0]);
      this.action.play();
      object.traverse(function(child) {
        if(child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      object.name = refName || 'zombie';
      object.scale.setScalar(0.045);
      this.scene.add(object);
      this.loadedMeshs.push(object);
      resolve(object);
    });
  })
  }

}