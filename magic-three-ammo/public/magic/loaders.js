
import * as THREE from "three";
import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import {ColladaLoader} from 'three/addons/loaders/ColladaLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';


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
        console.log(" test animations: ", object.animations);
        // remeber - 1 walk
        this.action = this.mixers[this.mixers.length - 1].clipAction(object.animations[1]);
        this.action.play();
        object.traverse((child) => {
          if(child.isMesh) {
            if(this.config.map.meshShadows.computeVertexNormals == true) {
              if(child.isMesh) child.geometry.computeVertexNormals();
            }
            if(this.config.map.meshShadows.castShadow == true) {
              child.castShadow = true;
            } else {
              child.castShadow = false;
            }
            if(this.config.map.meshShadows.receiveShadow == true) {
              child.receiveShadow = true;
            } else {
              child.receiveShadow = false;
            }
          }
        });
        object.name = refName || 'zombie';
        object.scale.setScalar(0.04);
        if(refName == 'player') {
          object.position.copy(this.config.playerController.cameraInitPosition)
        }

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
            console.log(" test isMesh ", node.isMesh);
            console.log(" test castShadow ", node.castShadow);
            console.log(" test receiveShadow ", node.receiveShadow);
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

  async obj(p, refName, tex) {
    var object;
    return new Promise((resolve, reject) => {
      const manager = new THREE.LoadingManager(() => {
        object.traverse(function(child) {
          if(child.isMesh) child.material.map = texture;
        });
        // object.position.y = 2;
        this.scene.add(object);
        resolve('Obj added.');
      });
      const textureLoader = new THREE.TextureLoader(manager);
      const texture = textureLoader.load(tex);
      // model
      function onProgress(xhr) {
        if(xhr.lengthComputable) {
          const percentComplete = xhr.loaded / xhr.total * 100;
          console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
        }
      }
      function onError() {
        reject('Faild to load obj.');
      }
      const loader = new OBJLoader(manager);
      loader.load(p, function(obj) {
        object = obj;
      }, onProgress, onError);
    });
  }

  async objMtl() {
    const onProgress = function(xhr) {
      if(xhr.lengthComputable) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
      }
    };

    new MTLLoader()
      .setPath('models/obj/male02/')
      .load('male02.mtl', function(materials) {

        materials.preload();

        new OBJLoader()
          .setMaterials(materials)
          .setPath('models/obj/male02/')
          .load('male02.obj', function(object) {

            object.position.y = - 95;
            scene.add(object);

          }, onProgress);

      });
  }
}