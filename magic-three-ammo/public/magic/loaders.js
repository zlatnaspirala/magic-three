
import * as THREE from "three";
import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import {ColladaLoader} from 'three/addons/loaders/ColladaLoader.js';

export class MagicLoader {

  mixers = [];

  loadedMeshs = [];

  constructor(config, scene) {
    this.scene = scene;
    this.config = config;
  }

  async fbx(p, refName) {
    return new Promise((resolve, reject) => {
      const loader = new FBXLoader();
      loader.load(p, (object) => {
        this.mixers.push(new THREE.AnimationMixer(object));
        this.action = this.mixers[this.mixers.length - 1].clipAction(object.animations[0]);
        this.action.play();
        object.traverse((child) => {
          if(child.isMesh) {
            if (this.config.map.meshShadows.computeVertexNormals == true) {
              if (child.isMesh) child.geometry.computeVertexNormals();
            }
            if (this.config.map.meshShadows.castShadow == true) {
              child.castShadow = true;
            } else {
              child.castShadow = false;
            }
            if (this.config.map.meshShadows.receiveShadow == true) {
              child.receiveShadow = true;
            } else {
              child.receiveShadow = false;
            }
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

  async collada(p, refName) {
    return new Promise((resolve, reject) => {
      const loader = new ColladaLoader();
      loader.load(p, (collada) => {
        const object = collada.scene;
        const animations = object.animations;
        object.traverse(function(node) {
          if(node.isSkinnedMesh) {
            node.frustumCulled = false;
          }
        });
        object.name = refName || 'zombie';
        this.mixers.push(new THREE.AnimationMixer(object));
        this.mixers[this.mixers.length - 1].clipAction(animations[0]).play();
        this.loadedMeshs.push(object);
        this.scene.add(object);
        resolve(object);
      });
    })
  }

}