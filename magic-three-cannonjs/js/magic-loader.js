import {is, runScript} from "./magic-utils";

export class MagicThreeLoader {

  loaders = {};

  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
  }

  async run() {
    return new Promise((resolve, reject) => {
      let m = [];
      m.push(new Promise((resolve, reject) => {
        runScript('./js/loaders/OBJLoader.js').then((a) => {
          resolve('OBJLoader ready');
        });
      }));
      m.push(new Promise((resolve, reject) => {
        runScript('./js/loaders/MTLLoader.js').then((a) => {
          resolve('MTL Loader ready');
        });
      }));
      m.push(new Promise((resolve, reject) => {
        runScript('./js/loaders/FBXLoader.js').then((a) => {
          resolve('FBX Loader ready');
        });
      }));
      m.push(new Promise((resolve, reject) => {
        runScript('./js/loaders/ColladaLoader2.js').then((a) => {
          resolve('COLLADA Loader ready');
        });
      }));

      m.push(new Promise((resolve, reject) => {
        runScript('./js/loaders/collada/Animation.js').then((a) => {
          resolve('COLLADA Loader ready');
        });
      }));

      m.push(new Promise((resolve, reject) => {
        runScript('./js/loaders/collada/AnimationHandler.js').then((a) => {
          resolve('COLLADA Loader ready');
        });
      }));

      m.push(new Promise((resolve, reject) => {
        runScript('./js/loaders/collada/KeyFrameAnimation.js').then((a) => {
          resolve('COLLADA Loader ready');
        });
      }));

      Promise.all(m).then((values) => {
        console.info(values);
        resolve('loaders ready!');
      });
    });
  }

  loadObj(path_to_obj, obj_name, mtl_, options) {

    if(is(options) == false) var options = {};
    if(is(options.scale) == false) options.scale = 1;
    if(is(options.position) == false) options.position = new THREE.Vector3(0, 1, 0);

    var onProgress = function(xhr) {
      if(xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded.');
      }
    };
    var onError = function(xhr) {};
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(path_to_obj);
    mtlLoader.setPath(path_to_obj);
    mtlLoader.load(mtl_, (materials) => {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath(path_to_obj);
      let root = this;
      objLoader.load(obj_name, (object) => {
        object.position.y = 0;
        object.position.z = 0;
        object.traverse(function(child) {
          if(child instanceof THREE.Mesh) {
            console.log("?????", options.scale)
            child.scale.setScalar(options.scale);
            child.material.shading = THREE.SmoothShading;
            child.geometry.computeVertexNormals(true);
            const tempGeo = new THREE.Geometry().fromBufferGeometry(child.geometry);
            tempGeo.mergeVertices();
            tempGeo.computeVertexNormals();
            tempGeo.computeFaceNormals();
            child.geometry = new THREE.BufferGeometry().fromGeometry(tempGeo);
          }
        });
        root.scene.add(object);
      }, onProgress, onError);

    });
  }

  loadCollada(path_) {
    var root = this;

    var raptor;
    // loading manager
    var loadingManager = new THREE.LoadingManager(() => {
      this.scene.add(raptor);
    });

    let loader = new THREE.ColladaLoader(loadingManager );
    loader.load(path_, (collada) => {
      collada.scene.traverse(function(child) {
        if(child instanceof THREE.SkinnedMesh) {
          console.log("root", root)
          // root.animation = new THREE.Animation(child, child.geometry.animation);
          // root.animation.play();
          // root.camera.lookAt(child.position);
        }
      });

      this.scene.add(collada.scene);
      root.myColladaCsene = collada.scene;

      // root.AUTO_UPDATE = function () {
      //     THREE.AnimationHandler.update(clock.getDelta());
      // };
    })
  }

  loadFbx(path) {
    const fbxLoader = new THREE.FBXLoader();
    let root = this;
    fbxLoader.load(path, (object) => {

      console.info('FBX')

      let mixer = new THREE.AnimationMixer(object);
      const action = mixer.clipAction(object.animations[0]);
      action.play();

      // object.traverse(function (child) {
      //     if ((child as THREE.Mesh).isMesh) {
      //         // (child as THREE.Mesh).material = material
      //         if ((child as THREE.Mesh).material) {
      //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
      //         }
      //     }
      // })
      // object.scale.set(.01, .01, .01)
      root.scene.add(object);
    },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% fbx loaded')
      },
      (error) => {
        console.log(error)
      }
    )
  }
}