(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _magicBase = require("./js/magic-base");
/**
 * @description
 * Main instance
 */
let Application = new _magicBase.Magic();

/**
 * @description
 * Add you 3d elements.
 * - prepare materials
 */

Application.createCubeRefraction('./assets/myCubeMap/reflection/');
Application.createMyMaterials('./assets/metal/metal1.jpg');
// Application.addChain()

// "FEMALE", "tshirts.obj", "res/tshirts/", "tshirts.mtl")

Application.useMyLoaders();

// Application.loaders.loadObj('male02.obj', 'objs/male/', 'male02.mtl')
console.log("What is ", Application.assets);
const options = {
  position: {
    x: 10,
    y: 10,
    z: 10
  },
  dimension: [1, 1, 1],
  material: Application.assets.front
};
Application.addMagicBox(options);
window.Application = Application;
console.info('Magic is here.');

},{"./js/magic-base":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Magic = void 0;
var _magicCore = require("./magic-core");
var _magicLoader = require("./magic-loader");
var _magicUtils = require("./magic-utils");
class Magic extends _magicCore.MagicThree {
  loaders = {};
  assets = {};
  constructor() {
    super();
  }
  useMyLoaders() {
    this.loaders = new _magicLoader.MagicThreeLoader();
  }
  createCubeRefraction = function (path) {
    this.path_to_images = path;
    this.urls = [this.path_to_images + "1.jpg", this.path_to_images + "2.jpg", this.path_to_images + "3.jpg", this.path_to_images + "4.jpg", this.path_to_images + "5.jpg", this.path_to_images + "6.jpg"];
    this.assets.texCube = new THREE.CubeTextureLoader().load(this.urls);
    this.assets.texCube.format = THREE.RGBFormat;
  };
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
      })
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
    };
  }

  addMagicBox(o) {
    // Add boxes
    if (!(0, _magicUtils.is)(o)) {
      console.info("Default Box args");
      let o = {
        name: (0, _magicUtils.randName)(),
        position: {
          x: 10,
          y: 10,
          z: 10
        },
        dimension: [1, 1, 1]
      };
    }
    var halfExtents = new CANNON.Vec3(o.dimension[0], o.dimension[1], o.dimension[2]);
    var boxShape = new CANNON.Box(halfExtents);
    var boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);
    var x = o.position.x;
    var y = o.position.y;
    var z = o.position.z;
    var boxBody = new CANNON.Body({
      mass: 5
    });
    boxBody.addShape(boxShape);
    var boxMesh;
    if ((0, _magicUtils.is)(o.material)) {
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
    var N = 5,
      last;
    var boxGeometry = new THREE.BoxGeometry(he.x * 2, he.y * 2, he.z * 2);
    for (var i = 0; i < N; i++) {
      var boxbody = new CANNON.Body({
        mass: mass
      });
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
      if (i != 0) {
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
exports.Magic = Magic;

},{"./magic-core":3,"./magic-loader":4,"./magic-utils":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicThree = void 0;
var _magicRay = require("./magic-ray");
class MagicThree {
  // Physics staff
  sphereShape;
  sphereBody;
  world;
  physicsMaterial;
  walls = [];
  balls = [];
  ballMeshes = [];
  boxes = [];
  boxMeshes = [];

  // threejs staff
  camera;
  scene;
  renderer;
  geometry;
  material;
  mesh;
  controls;
  time = Date.now();
  dt = 1 / 60;
  pointerlockchange;
  ballShape = new CANNON.Sphere(0.2);
  ballGeometry = new THREE.SphereGeometry(this.ballShape.radius, 32, 32);
  shootDirection = new THREE.Vector3();
  shootVelo = 15;
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  scene = new THREE.Scene();
  myRay = new _magicRay.Raycaster(this.camera, this.scene);
  projector = this.myRay.raycaster;
  blocker = document.getElementById('blocker');
  instructions = document.getElementById('instructions');
  havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
  constructor() {
    if (this.havePointerLock) {
      var element = document.body;
      this.pointerlockchange = event => {
        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
          this.controls.enabled = true;
          this.blocker.style.display = 'none';
        } else {
          this.controls.enabled = false;
          this.blocker.style.display = '-webkit-box';
          this.blocker.style.display = '-moz-box';
          this.blocker.style.display = 'box';
          this.instructions.style.display = '';
        }
      };
      this.pointerlockerror = function (event) {
        this.instructions.style.display = '';
      };

      // Hook pointer lock state change events
      document.addEventListener('pointerlockchange', this.pointerlockchange, false);
      document.addEventListener('mozpointerlockchange', this.pointerlockchange, false);
      document.addEventListener('webkitpointerlockchange', this.pointerlockchange, false);
      document.addEventListener('pointerlockerror', this.pointerlockerror, false);
      document.addEventListener('mozpointerlockerror', this.pointerlockerror, false);
      document.addEventListener('webkitpointerlockerror', this.pointerlockerror, false);
      this.myRay.RECALL = o => {
        console.log(o.name);
      };
      this.instructions.addEventListener('click', event => {
        this.instructions.style.display = 'none';
        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        if (/Firefox/i.test(navigator.userAgent)) {
          var fullscreenchange = function (event) {
            if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
              document.removeEventListener('fullscreenchange', fullscreenchange);
              document.removeEventListener('mozfullscreenchange', fullscreenchange);
              element.requestPointerLock();
            }
          };
          document.addEventListener('fullscreenchange', fullscreenchange, false);
          document.addEventListener('mozfullscreenchange', fullscreenchange, false);
          element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
          element.requestFullscreen();
        } else {
          element.requestPointerLock();
        }
      }, false);
    } else {
      instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }
    this.initCannon();
    this.init();
    this.animate();
    this.addAppGameListeners();
  }
  initCannon() {
    // Setup our world
    this.world = new CANNON.World();
    this.world.quatNormalizeSkip = 0;
    this.world.quatNormalizeFast = false;
    var solver = new CANNON.GSSolver();
    this.world.defaultContactMaterial.contactEquationStiffness = 1e9;
    this.world.defaultContactMaterial.contactEquationRelaxation = 4;
    solver.iterations = 7;
    solver.tolerance = 0.1;
    var split = true;
    if (split) this.world.solver = new CANNON.SplitSolver(solver);else this.world.solver = solver;
    this.world.gravity.set(0, -20, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();

    // Create a slippery material (friction coefficient = 0.0)
    this.physicsMaterial = new CANNON.Material("slipperyMaterial");
    var physicsContactMaterial = new CANNON.ContactMaterial(this.physicsMaterial, this.physicsMaterial, 0.0,
    // friction coefficient
    0.3 // restitution
    );
    // We must add the contact materials to the world
    this.world.addContactMaterial(physicsContactMaterial);

    // Create a sphere
    var mass = 5,
      radius = 1.3;
    this.sphereShape = new CANNON.Sphere(radius);
    this.sphereBody = new CANNON.Body({
      mass: mass
    });
    this.sphereBody.addShape(this.sphereShape);
    this.sphereBody.position.set(0, 5, 0);
    this.sphereBody.linearDamping = 0.9;
    this.world.addBody(this.sphereBody);

    // Create a plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({
      mass: 0
    });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this.world.addBody(groundBody);
  }
  init() {
    this.scene.fog = new THREE.Fog(0x000000, 0, 500);
    var ambient = new THREE.AmbientLight(0x111111);
    this.scene.add(ambient);
    let light = new THREE.SpotLight(0xffffff);
    light.position.set(10, 30, 20);
    light.target.position.set(0, 0, 0);
    if (true) {
      light.castShadow = true;
      light.shadowCameraNear = 20;
      light.shadowCameraFar = 50; //camera.far;
      light.shadowCameraFov = 40;
      light.shadowMapBias = 0.1;
      light.shadowMapDarkness = 0.7;
      light.shadowMapWidth = 2 * 512;
      light.shadowMapHeight = 2 * 512;
      //light.shadowCameraVisible = true;
    }

    this.scene.add(light);
    this.controls = new PointerLockControls(this.camera, this.sphereBody);
    this.scene.add(this.controls.getObject());

    // floor
    this.geometry = new THREE.PlaneGeometry(300, 300, 50, 50);
    this.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    this.material = new THREE.MeshLambertMaterial({
      color: 0xdddddd
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(this.scene.fog.color, 1);
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize, false);
  }
  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
  animate = () => {
    requestAnimationFrame(this.animate);
    this.myRay.updateRay();
    if (this.controls.enabled) {
      this.world.step(this.dt);
      for (var i = 0; i < this.balls.length; i++) {
        this.ballMeshes[i].position.copy(this.balls[i].position);
        this.ballMeshes[i].quaternion.copy(this.balls[i].quaternion);
      }
      for (var i = 0; i < this.boxes.length; i++) {
        this.boxMeshes[i].position.copy(this.boxes[i].position);
        this.boxMeshes[i].quaternion.copy(this.boxes[i].quaternion);
      }
    }
    this.controls.update(Date.now() - this.time);
    this.renderer.render(this.scene, this.camera);
    this.time = Date.now();
  };
  getShootDir(targetVec) {
    var vector = targetVec;
    targetVec.set(0, 0, 1);
    vector.unproject(this.camera);
    // this.myRay.raycaster.unprojectVector(vector, this.camera);
    var ray = new THREE.Ray(this.sphereBody.position, vector.sub(this.sphereBody.position).normalize());
    targetVec.copy(ray.direction);
  }
  addAppGameListeners() {
    window.addEventListener("click", e => {
      if (this.controls.enabled == true) {
        var x = this.sphereBody.position.x;
        var y = this.sphereBody.position.y;
        var z = this.sphereBody.position.z;
        var ballBody = new CANNON.Body({
          mass: 1
        });
        ballBody.addShape(this.ballShape);
        var ballMesh = new THREE.Mesh(this.ballGeometry, this.material);
        this.world.addBody(ballBody);
        this.scene.add(ballMesh);
        ballMesh.castShadow = true;
        ballMesh.receiveShadow = true;
        this.balls.push(ballBody);
        this.ballMeshes.push(ballMesh);
        this.getShootDir(this.shootDirection);
        ballBody.velocity.set(this.shootDirection.x * this.shootVelo, this.shootDirection.y * this.shootVelo, this.shootDirection.z * this.shootVelo);

        // Move the ball outside the player sphere
        x += this.shootDirection.x * (this.sphereShape.radius * 1.02 + this.ballShape.radius);
        y += this.shootDirection.y * (this.sphereShape.radius * 1.02 + this.ballShape.radius);
        z += this.shootDirection.z * (this.sphereShape.radius * 1.02 + this.ballShape.radius);
        ballBody.position.set(x, y, z);
        ballMesh.position.set(x, y, z);
      }
    });
  }
}
exports.MagicThree = MagicThree;

},{"./magic-ray":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicThreeLoader = void 0;
var _magicUtils = require("./magic-utils");
class MagicThreeLoader {
  loaders = {};
  constructor() {
    (0, _magicUtils.runScript)('./js/loaders/OBJLoader.js').then(a => {
      console.log('OBJLoader ready');
    });
    (0, _magicUtils.runScript)('./js/loaders/MTLLoader.js').then(a => {
      console.log('MTL Loader ready');
    });
  }
  loadObj(obj_name, path_to_obj, mtl_) {
    var onProgress = function (xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
      }
    };
    var onError = function (xhr) {};
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl(path_to_obj);
    mtlLoader.setPath(path_to_obj);
    mtlLoader.load(mtl_, function (materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath(path_to_obj);
      objLoader.load(obj_name, function (object) {
        object.position.y = 0;
        object.position.z = 0;
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material.shading = THREE.SmoothShading;
            console.log('YEAP');
          }
        });
        // object.material.shading = THREE.SmoothShading;

        object.geometry.computeVertexNormals(true);
        object.geometry.mergeVertices();
        object.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.geometry.computeVertexNormals();
          }
        });
        scene.add(object);
      }, onProgress, onError);
    });
  }
}
exports.MagicThreeLoader = MagicThreeLoader;

},{"./magic-utils":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Raycaster = void 0;
class Raycaster {
  RECALL = function () {};
  raycaster = new THREE.Raycaster();
  INTERSECTED = 0;
  mouse = new THREE.Vector2();
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('click', this.onDocumentclick, false);
  }
  onDocumentMouseMove = event => {
    event.preventDefault();
    // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  };

  onDocumentclick = event => {
    event.preventDefault();
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.INTERSECTED = null;
  };
  updateRay = () => {
    try {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        if (this.INTERSECTED != intersects[0].object) {
          this.INTERSECTED = intersects[0].object;
          this.RECALL(this.INTERSECTED);
          console.log('recall for ' + this.INTERSECTED.name);
        }
      } else {
        this.INTERSECTED = null;
      }
    } catch (e) {
      console.log("error in raycaster" + e);
    }
  };
  DESTROY = function () {
    document.removeEventListener('mousemove', this.onDocumentMouseMove);
    document.removeEventListener('click', this.onDocumentclick);
  };
}
exports.Raycaster = Raycaster;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.is = is;
exports.randName = randName;
exports.runScript = runScript;
function randName(length) {
  let g = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let c = 0;
  while (c < length) {
    g += chars.charAt(Math.floor(Math.random() * chars.length));
    c += 1;
  }
  return g;
}
function is(o) {
  if (typeof o === 'undefined') {
    return false;
  } else {
    return true;
  }
}
async function runScript(src, id) {
  return new Promise((resolve, reject) => {
    var s = document.createElement('script');
    s.onload = function (e) {
      resolve('Script id loaded with src: ' + this.src);
      console.log('Script id loaded with src: ' + this.src);
    };
    s.onerror = function (e) {
      reject();
      console.error('Script id loaded with src: ' + this.src);
    };
    s.setAttribute('src', src);
    if (is(id)) {
      s.setAttribute('id', id);
    }
    document.body.appendChild(s);
  });
}

},{}]},{},[1]);
