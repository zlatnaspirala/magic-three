import {MagicThree} from "./magic-core";
import {MagicThreeLoader} from "./magic-loader";
import {is, randName} from "./magic-utils";

export class Magic extends MagicThree {

  loaders = {};
  assets = {};

  constructor() {
    super();
    console.info("Scene =? ", this.scene)
  }

  useMyLoaders() {
    return new Promise((resolve) => {
      this.loaders = new MagicThreeLoader(this.scene, this.camera);
      this.loaders.run().then((e) => {
        resolve(e);
      });
    });
  }

  createCubeRefraction = function(path) {
    this.path_to_images = path;
    this.urls = [
      this.path_to_images + "1.jpg", this.path_to_images + "2.jpg",
      this.path_to_images + "3.jpg", this.path_to_images + "4.jpg",
      this.path_to_images + "5.jpg", this.path_to_images + "6.jpg"
    ];
    this.assets.texCube = new THREE.CubeTextureLoader().load(this.urls);
    this.assets.texCube.format = THREE.RGBFormat;
  }

  createMyMaterials(path) {
    var frontTexture = new THREE.TextureLoader().load(path);
    this.assets = {
      "Yellow_glass": new THREE.MeshLambertMaterial({
        color: 0xffffaa,
        opacity: 0.75,
        transparent: true
      }),
      "Orange_glass": new THREE.MeshLambertMaterial({
        color: 0x995500,
        opacity: 0.75,
        transparent: true
      }),
      "front": new THREE.MeshPhongMaterial({
        shininess: 1,
        map: frontTexture
      }),
      "Orange": new THREE.MeshLambertMaterial({
        color: 0xff6600,
        envMap: this.assets.texCube,
        combine: THREE.MixOperation,
        reflectivity: 0.1
      }),
      "Blue": new THREE.MeshLambertMaterial({
        color: 0x001133,
        envMap: this.assets.texCube,
        combine: THREE.MixOperation,
        reflectivity: 0.3
      }),
      "Red": new THREE.MeshLambertMaterial({
        color: 0x660000,
        envMap: this.assets.texCube,
        combine: THREE.MixOperation,
        reflectivity: 0.25
      }),
      "Black": new THREE.MeshLambertMaterial({
        color: 0x000000,
        envMap: this.assets.texCube,
        combine: THREE.MixOperation,
        reflectivity: 0.15
      }),
      "White": new THREE.MeshLambertMaterial({
        color: 0xffffff,
        envMap: this.assets.texCube,
        combine: THREE.MixOperation,
        reflectivity: 0.25
      }),
      "Carmine": new THREE.MeshPhongMaterial({
        color: 0x770000,
        specular: 0xffaaaa,
        envMap: this.assets.texCube,
        combine: THREE.MultiplyOperation
      }),
      "Gold": new THREE.MeshPhongMaterial({
        color: 0xaa9944,
        specular: 0xbbaa99,
        shininess: 50,
        envMap: this.assets.texCube,
        combine: THREE.MultiplyOperation
      }),
      // "Bronze": new THREE.MeshPhongMaterial({
      //   color: 0x150505,
      //   specular: 0xee6600,
      //   shininess: 10,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MixOperation,
      //   reflectivity: 0.25
      // }),
      // "Chrome": new THREE.MeshPhongMaterial({
      //   color: 0xffffff,
      //   specular: 0xffffff,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MultiplyOperation
      // }),
      // "Chrome1": new THREE.MeshPhongMaterial({
      //   color: 0x696969,
      //   specular: 0xf8c78d,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MultiplyOperation,
      //   reflectivity: 0.5
      // }),
      // "Chrome2": new THREE.MeshPhongMaterial({
      //   color: 0x8f8f8f,
      //   specular: 0xf8c78d,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MultiplyOperation,
      //   reflectivity: 0.4
      // }),
      // "Chrome3": new THREE.MeshPhongMaterial({
      //   color: 0x000000,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MultiplyOperation,
      //   reflectivity: 0.4
      // }),
      // "Orange_metal": new THREE.MeshLambertMaterial({
      //   color: 0xff6600,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MultiplyOperation
      // }),
      // "Blue_metal": new THREE.MeshLambertMaterial({
      //   color: 0x001133,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MultiplyOperation
      // }),
      // "Red_metal": new THREE.MeshLambertMaterial({
      //   color: 0x770000,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MultiplyOperation
      // }),
      // "Green_metal": new THREE.MeshLambertMaterial({
      //   color: 0x007711,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MultiplyOperation
      // }),
      // "Black_metal": new THREE.MeshLambertMaterial({
      //   color: 0x222222,
      //   envMap: this.assets.texCube,
      //   combine: THREE.MultiplyOperation
      // }),
      // "Pure_chrome": new THREE.MeshLambertMaterial({
      //   color: 0xffffff,
      //   envMap: this.assets.texCube
      // }),
      // "Dark_chrome": new THREE.MeshLambertMaterial({
      //   color: 0x444444,
      //   envMap: this.assets.texCube
      // }),
      // "Darker_chrome": new THREE.MeshLambertMaterial({
      //   color: 0x222222,
      //   envMap: this.assets.texCube
      // }),
      // "Black_glass": new THREE.MeshLambertMaterial({
      //   color: 0x101016,
      //   envMap: this.assets.texCube,
      //   opacity: 0.975,
      //   transparent: true
      // }),
      // "Dark_glass": new THREE.MeshLambertMaterial({
      //   color: 0x101046,
      //   envMap: this.assets.texCube,
      //   opacity: 0.25,
      //   transparent: true
      // }),
      // "Blue_glass": new THREE.MeshLambertMaterial({
      //   color: 0x668899,
      //   envMap: this.assets.texCube,
      //   opacity: 0.75,
      //   transparent: true
      // }),
      // "Light_glass": new THREE.MeshBasicMaterial({
      //   color: 0x223344,
      //   envMap: this.assets.texCube,
      //   opacity: 0.25,
      //   transparent: true,
      //   combine: THREE.MixOperation,
      //   reflectivity: 0.25
      // }),
      // "Red_glass": new THREE.MeshLambertMaterial({
      //   color: 0xff0000,
      //   opacity: 0.75,
      //   transparent: true
      // }),
      // "Orange_glass_50": new THREE.MeshLambertMaterial({
      //   color: 0xffbb00,
      //   opacity: 0.5,
      //   transparent: true
      // }),
      // "Red_glass_50": new THREE.MeshLambertMaterial({
      //   color: 0xff0000,
      //   opacity: 0.5,
      //   transparent: true
      // }),
      // "Fullblack_rough": new THREE.MeshLambertMaterial({
      //   color: 0x000000
      // }),
      // "Black_rough": new THREE.MeshLambertMaterial({
      //   color: 0x050505
      // }),
      // "Darkgray_rough": new THREE.MeshLambertMaterial({
      //   color: 0x090909
      // }),
      // "Red_rough": new THREE.MeshLambertMaterial({
      //   color: 0x330500
      // }),
      // "Darkgray_shiny": new THREE.MeshPhongMaterial({
      //   color: 0x000000,
      //   specular: 0x050505
      // }),
      // "Gray_shiny": new THREE.MeshPhongMaterial({
      //   color: 0x050505,
      //   shininess: 20
      // })
    }
  }

  addMagicBox(o) {
    // Add boxes
    if(!is(o)) {
      console.info("Default Box args");
      let o = {
        name: randName(),
        position: {x: 10, y: 10, z: 10},
        dimension: [1, 1, 1]
      };
    }

    var halfExtents = new CANNON.Vec3(o.dimension[0], o.dimension[1], o.dimension[2]);
    var boxShape = new CANNON.Box(halfExtents);
    var boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);

    var x = o.position.x;
    var y = o.position.y;
    var z = o.position.z;

    var boxBody = new CANNON.Body({mass: 5});
    boxBody.addShape(boxShape);

    var boxMesh;
    if(is(o.material)) {
      boxMesh = new THREE.Mesh(boxGeometry, o.material);
    } else {
      boxMesh = new THREE.Mesh(boxGeometry, this.material);
      console.info("Default material loaded.");
    }

    boxMesh.name = 'iAmBoxCube';
    this.world.addBody(boxBody);
    this.scene.add(boxMesh);
    boxBody.position.set(x, y, z);
    boxMesh.position.set(x, y, z);
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;
    this.boxes.push(boxBody);
    this.boxMeshes.push(boxMesh);

  }

  addChain() {

    console.log('What is this', this);
    // Add linked boxes
    var size = 0.5;
    var he = new CANNON.Vec3(size, size, size * 0.1);
    var boxShape = new CANNON.Box(he);
    var mass = 0;
    var space = 0.1 * size;
    var N = 5, last;
    var boxGeometry = new THREE.BoxGeometry(he.x * 2, he.y * 2, he.z * 2);
    for(var i = 0;i < N;i++) {
      var boxbody = new CANNON.Body({mass: mass});
      boxbody.addShape(boxShape);
      var boxMesh = new THREE.Mesh(boxGeometry, this.material);
      boxbody.position.set(5, (N - i) * (size * 2 + 2 * space) + size * 2 + space, 0);
      boxbody.linearDamping = 0.01;
      boxbody.angularDamping = 0.01;
      // boxMesh.castShadow = true;
      boxMesh.receiveShadow = true;
      this.world.addBody(boxbody);
      this.scene.add(boxMesh);
      this.boxes.push(boxbody);
      this.boxMeshes.push(boxMesh);
      if(i != 0) {
        // Connect this body to the last one
        var c1 = new CANNON.PointToPointConstraint(boxbody, new CANNON.Vec3(-size, size + space, 0), last, new CANNON.Vec3(-size, -size - space, 0));
        var c2 = new CANNON.PointToPointConstraint(boxbody, new CANNON.Vec3(size, size + space, 0), last, new CANNON.Vec3(size, -size - space, 0));
        this.world.addConstraint(c1);
        this.world.addConstraint(c2);
      } else {
        mass = 0.3;
      }
      last = boxbody;
    }
  }

}