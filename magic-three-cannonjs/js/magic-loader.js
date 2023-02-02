import {runScript} from "./magic-utils";

export class MagicThreeLoader {

  loaders = {};

  constructor() {
    runScript('./loaders/MTLLoader.js').then((a) => {
      console.log('Test', a);
    });
  }

  prepareOBJ(name_, obj_name, path_to_obj, mtl_) {

    var onProgress = function(xhr) {
      if(xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
      }
    };

    var onError = function(xhr) {};

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl(path_to_obj);
    mtlLoader.setPath(path_to_obj);

    mtlLoader.load(mtl_, function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath(path_to_obj);
      objLoader.load(obj_name, function(object) {
        object.position.y = 0;
        object.position.z = 0;
        object.material.shading = THREE.SmoothShading;
        object.geometry.computeVertexNormals(true);
        object.geometry.mergeVertices();
        object.traverse(function(node) {
          if(node instanceof THREE.Mesh) {
            node.geometry.computeVertexNormals();
          }
        });
        scene.add(object);
      }, onProgress, onError);

    });
  }

}