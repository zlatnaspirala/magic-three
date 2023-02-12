
/**
 * @description
 * Main instance
 * Important note
 * Dont import unused modules.
 */

import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
// import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {createRandomColor, getDom} from "./public/libs/utils.js";
import {createFPSController} from "./public/magic/controllers.min.js";
import {MagicPhysics} from "./public/magic/physics.js";
import {updateControls} from "./public/magic/updater.js";
import config from './config.js';
import {MagicMaterials} from "./public/magic/materials.js";
import {MagicLoader} from "./public/magic/loaders.js";
import {runCache} from "./public/magic/func.js";

class Application extends MagicPhysics {

  // Graphics variables
  container = getDom("container");
  stats = null;

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 2000);
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();

  materials = new MagicMaterials();
  controls = null;
  textureLoader = null;
  clock = new THREE.Clock();
  mouseCoords = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  ballMaterial = new THREE.MeshPhongMaterial({color: 0x202020});

  // FPShooter Controller
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  canJump = false;

  prevTime = performance.now();
  velocity = new THREE.Vector3();
  direction = new THREE.Vector3();
  vertex = new THREE.Vector3();
  color = new THREE.Color();

  playerBody;
  config;

  constructor(config) {

    super({config: config});
    this.config = config;

    // Loaders
    this.loader = new MagicLoader(this.scene);

    for(let i = 0;i < 500;i++) {
      this.objectsToRemove[i] = null;
    }

    console.info("MagicThree: Worker test.");
    runCache(this.config.cache);

    setTimeout(() => {
      // Content - Objs and etc
      this.loader.fbx('./assets/objects/zombies/zombie-walk.fbx')
    }, 1000)

    this.updateControls = updateControls.bind(this);

    Ammo().then((AmmoLib) => {
      Ammo = AmmoLib;
      this.ammoTmpPos = new Ammo.btVector3();
      this.ammoTmpQuat = new Ammo.btQuaternion();
      this.tmpTrans = new Ammo.btTransform();

      this.init();
      this.animate();
      console.log('Ammo is ready.');
    });
  }

  init() {
    this.createFPSController = createFPSController.bind(this);
    this.initGraphics();
    this.initPhysics();
    this.createObjects();
    this.initInput();
    this.createPlayer();
  }

  initGraphics() {

    console.log('this.config.map.background',this.config.map.background)
    this.scene.background = new THREE.Color(this.config.map.background);

    this.camera.position.set(
      this.config.playerController.cameraInitPosition.x,
      this.config.playerController.cameraInitPosition.y,
      this.config.playerController.cameraInitPosition.z);

    // this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    if(this.config.playerController.type === 'FPS') {
      this.createFPSController();
    } else {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 2, 0);
      this.controls.update();
    }

    this.textureLoader = new THREE.TextureLoader();

    this.ambientLight = new THREE.AmbientLight(0x707070);
    this.scene.add(this.ambientLight);

    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(-10, 18, 5);
    this.light.castShadow = true;
    const d = 14;
    this.light.shadow.camera.left = -d;
    this.light.shadow.camera.right = d;
    this.light.shadow.camera.top = d;
    this.light.shadow.camera.bottom = -d;
    this.light.shadow.camera.near = 2;
    this.light.shadow.camera.far = 50;
    this.light.shadow.mapSize.x = 1024;
    this.light.shadow.mapSize.y = 1024;
    this.scene.add(this.light);

    this.stats = new Stats();
    this.stats.domElement.style.position = "absolute";
    this.stats.domElement.style.top = "0px";
    this.container.appendChild(this.stats.domElement);

    window.addEventListener("resize", this.onWindowResize);
  }

  createBreakableBox(mass, halfExtents, pos, quat, material) {
    const object = new THREE.Mesh(
      new THREE.BoxGeometry(
        halfExtents.x * 2,
        halfExtents.y * 2,
        halfExtents.z * 2
      ),
      material
    );
    object.position.copy(pos);
    object.quaternion.copy(quat);
    this.convexBreaker.prepareBreakableObject(
      object,
      mass,
      new THREE.Vector3(),
      new THREE.Vector3(),
      true
    );
    this.createDebrisFromBreakableObject(object);
  }

  createPlayer() {
    const material = new THREE.LineBasicMaterial({color: 0x0000ff});
    const ballMass = 35;
    const ballRadius = 2;
    const ball = new THREE.Line(
      new THREE.SphereGeometry(ballRadius, 14, 10),
      material);
    // const ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 14, 10), material);
    ball.castShadow = true;
    ball.receiveShadow = true;
    const ballShape = new Ammo.btSphereShape(ballRadius);
    ballShape.setMargin(this.margin);
    this.pos.copy(this.raycaster.ray.direction);
    this.pos.add(this.raycaster.ray.origin);
    this.quat.set(0, 0, 0, 1);
    this.playerBody = ball;

    // let localInertia = new Ammo.btVector3(0, 0, 0);
    // ballShape.calculateLocalInertia(10, localInertia);
    const playerB = this.createRigidBody(
      ball,
      ballShape,
      ballMass,
      this.pos,
      this.quat
    );
    console.log("PlayerBody created. ", this.playerBody)
    playerB.setCollisionFlags(0);
  }

  createObjects() {
    // Ground
    this.pos.set(0, -0.5, 0);
    this.quat.set(0, 0, 0, 1);
    const ground = this.createParalellepipedWithPhysics(
      this.config.map.floorWidth, 1,
      this.config.map.floorHeight, 0,
      this.pos, this.quat,
      // new THREE.MeshPhongMaterial({color: 0xffffff})
      this.materials.assets.Orange_glass
    );
    ground.receiveShadow = true;
    this.textureLoader.load("./assets/textures/cube/wall-black.png", function(texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(40, 40);
      ground.material.map = texture;
      ground.material.needsUpdate = true;
    });
    ground.name = 'ground';

    // Tower 1 Breakable
    const towerMass = 1000;
    const towerHalfExtents = new THREE.Vector3(5, 5, 0.3);
    this.pos.set(-8, 5, 0);
    this.quat.set(0, 0, 0, 1);
    this.createBreakableBox(
      towerMass,
      towerHalfExtents,
      this.pos,
      this.quat,
      App.materials.assets.Yellow_glass
    );

    // Tower 2 Normal
    this.pos.set(8, 5, 0);
    this.quat.set(0, 0, 0, 1);
    this.createSimpleBox(
      towerMass,
      towerHalfExtents,
      this.pos,
      this.quat,
      App.materials.assets.Bronze
    );

    // Tower Cilinder Physic but big mass
    this.pos.set(8, 5, 0);
    this.quat.set(0, 0, 0, 1);
    this.createCilinder(
      10000,
      [5, 5, 20, 32],
      this.pos,
      this.quat,
      App.materials.assets.Bronze
    );

    this.pos.set(-8, 5, 0);
    this.quat.set(0, 0, 0, 1);
    this.createTorus(
      10000,
      [10, 3, 16, 100],
      this.pos,
      this.quat,
      App.materials.assets.Bronze
    );

  }

  createMaterial(color) {
    color = color || createRandomColor();
    return new THREE.MeshPhongMaterial({color: color});
  }

  initInput() {
    window.addEventListener("pointerdown", (event) => {
      this.mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      this.raycaster.setFromCamera(this.mouseCoords, this.camera);

      // Creates a ball and throws it
      const ballMass = 35;
      const ballRadius = 0.2;
      const ball = new THREE.Mesh(
        new THREE.SphereGeometry(ballRadius, 14, 10),
        this.ballMaterial
      );
      ball.castShadow = true;
      ball.receiveShadow = true;
      const ballShape = new Ammo.btSphereShape(ballRadius);
      ballShape.setMargin(this.margin);
      this.pos.copy(this.raycaster.ray.direction);
      this.pos.add(this.raycaster.ray.origin);
      this.quat.set(0, 0, 0, 1);
      const ballBody = this.createRigidBody(
        ball,
        ballShape,
        ballMass,
        this.pos,
        this.quat
      );

      this.pos.copy(this.raycaster.ray.direction);
      this.pos.multiplyScalar(48);
      ballBody.setLinearVelocity(new Ammo.btVector3(this.pos.x, this.pos.y, this.pos.z));
    });
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
    this.stats.update();
  }

  render() {
    const deltaTime = this.clock.getDelta();

    this.updatePhysics(deltaTime);
    this.updateControls();

    if(this.config.playerController.movementType === 'velocity') {
      this.moveVelocity();
    } else {
      this.moveKinematic();
    }

    // test
    if(this.loader.mixer) this.loader.mixer.update(deltaTime);

    // etst
    // update the picking ray with the camera and pointer position
    this.raycaster.setFromCamera(this.mouseCoords, this.camera);

    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    for(let i = 0;i < intersects.length;i++) {
      // if (intersects[i].object.name) console.log("on hit =>", intersects[i].object.name)
    }

    this.renderer.render(this.scene, this.camera);
  }


}

let App = new Application(config);

window.App = App;
