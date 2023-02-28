
/**
 * @description
 * Main instance
 * Important note
 * Dont import unused modules.
 */
import * as THREE from "three";
import {MathUtils} from "three";
// import Stats from "three/addons/libs/stats.module.js";
// import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {createRandomColor, getDom} from "./public/libs/utils.js";
import {createFPSController} from "./public/magic/controllers.js";
import {MagicPhysics} from "./public/magic/physics.js";
import {updateControls} from "./public/magic/updater.js";
import config from './config.js';
import {MagicMaterials} from "./public/magic/materials.js";
import {MagicLoader} from "./public/magic/loaders.js";
import {byId, createAppEvent, load, runCache, save} from "./public/magic/utility.js";
import {startUpScreen} from "./public/assets/inlineStyle/style.js";
import {loadMap} from "./public/magic/magicmap-loader.js";
import t from "./public/magic/multi-lang.js";

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
  bulletMaterial = new THREE.MeshPhongMaterial({color: 0x202020});

  // FPShooter Controller
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  // canJump = false;

  prevTime = performance.now();
  velocity = new THREE.Vector3();
  direction = new THREE.Vector3();
  vertex = new THREE.Vector3();
  color = new THREE.Color();

  myBigDataFlag = [];

  playerBody;
  config;

  playerItems = {
    munition: 10
  };

  playerData = {};

  networkEmisionObjs = [];

  constructor(config) {

    super({config: config});
    this.config = config;

    addEventListener('multi-lang-ready', () => {
      // console.info('if you have some situation use this')
      // setup strings label 0 use here t('')
      document.title = t('title');
      byId('header.title').innerHTML = t('title');
      byId('player.munition.label').innerHTML = t('munition');
      byId('loading.label').innerHTM = t('loading');
      byId('player.kills.label').innerHTML = t('kills.label');
    });

    this.activateNet();

    // Player data - locals only - this is not secured if you wanna some validation data...
    if(load('playerData') !== false) {
      this.playerData = load('playerData');
    } else {
      this.playerData = {
        kills: 0
      };
      save('playerData', this.playerData);
    }

    byId('player.kills').innerHTML = this.playerData.kills;
    console.info('playerData', this.playerData);

    // Loaders
    this.loader = new MagicLoader(this.scene);

    for(let i = 0;i < 500;i++) {
      this.objectsToRemove[i] = null;
    }

    console.info("MagicThree: Worker [dynamic-cache] test cache config status:", this.config.cache);
    runCache(this.config.cache);

    // Big data loading procedure
    // myBigDataFlag got undefined array fill because 
    // i pass then call (func void) - work ok.

    this.myBigDataFlag.push(this.loader.fbx('./assets/objects/zombies/zombie-walk.fbx', 'zombie1').then((r) => {
      console.info('Setup enemy obj =>', r);
      r.position.set(-10, 0, -10)
    }));

    // this.myBigDataFlag.push(this.loader.fbx('./assets/objects/player/walk-forward.fbx', 'netPlayer').then((r) => {
    //   console.info('Setup player animation character obj =>', r);
    //   // r.position.set(10, 0, 10);
    // }));

    // myBigDataFlag.push(this.loader.fbx('./assets/objects/zombies/zombie-running2.fbx').then((r) => {
    //   console.info('Setup this obj =>', r);
    //   r.position.set(10, 0, 10)
    // }));

    Promise.all(this.myBigDataFlag).then((values) => {
      console.log('Big data promise all => ', values);
      const domLoader = document.getElementById('instructions');
      // MultiLang is async call
      domLoader.innerHTML = startUpScreen();
    });

    // Attach funcs
    this.loadMap = loadMap.bind(this);
    this.updateControls = updateControls.bind(this);

    Ammo().then((AmmoLib) => {
      Ammo = AmmoLib;
      this.ammoTmpPos = new Ammo.btVector3();
      this.ammoTmpQuat = new Ammo.btQuaternion();
      this.tmpTrans = new Ammo.btTransform();

      this.init();
      this.animate();
      console.info('Ammo is ready.');
    });
  }

  init() {
    this.createFPSController = createFPSController.bind(this);
    this.initGraphics();
    this.initPhysics();
    this.createObjects();
    this.attachFire();
    this.createPlayer();
  }

  initGamePlayEvents() {
    createAppEvent('player.shoot', {});
  }

  initGraphics() {
    console.info('config.map.background => ', this.config.map.background)
    this.scene.background = new THREE.Color(this.config.map.background);

    // fox for local rotation vars !
    this.camera.rotation.order = this.config.camera.order;

    this.camera.position.set(
      this.config.playerController.cameraInitPosition.x,
      this.config.playerController.cameraInitPosition.y,
      this.config.playerController.cameraInitPosition.z);

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

    if(this.config.stats == true) {
      this.stats = new Stats();
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.top = "0px";
      this.container.appendChild(this.stats.domElement);
    }

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
    const ballMass = 10;
    const ballRadius = 1;
    const ball = new THREE.Line(
      new THREE.SphereGeometry(ballRadius, 14, 10),
      material);
    ball.castShadow = false;
    ball.receiveShadow = false;
    const ballShape = new Ammo.btSphereShape(ballRadius);
    ballShape.setMargin(this.margin);
    this.pos.copy(this.raycaster.ray.direction);
    this.pos.add(this.raycaster.ray.origin);
    this.quat.set(0, 0, 0, 1);
    this.playerBody = ball;

    let localInertia = new Ammo.btVector3(0, 0, 0);
    ballShape.calculateLocalInertia(0, localInertia);

    const playerB = this.createRigidBody(
      ball,
      ballShape,
      ballMass,
      this.pos,
      this.quat
    );

    // local player
    this.playerBody.name = 'player';
    console.log("PlayerBody created and pushed to netView. ", this.playerBody);

    this.networkEmisionObjs.push(this.playerBody);
    //playerB.setCollisionFlags(0);

    // storage session
    byId('player.munition').innerHTML = this.playerItems.munition;
  }

  createObjects() {
    // Ground
    this.pos.set(0, -0.5, 0);
    this.quat.set(0, 0, 0, 1);
    const ground = this.createParalellepipedWithPhysics(
      this.config.map.floorWidth, 1,
      this.config.map.floorHeight, 0,
      this.pos, this.quat,
      this.materials.assets.Orange_glass
    );
    ground.receiveShadow = true;
    this.textureLoader.load("./assets/textures/cube/wall-black.webp", function(texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(40, 40);
      ground.material.map = texture;
      ground.material.needsUpdate = true;
    });
    ground.name = 'ground';

    // Load map items
    this.loadMap();
    // Load custom elements ...

  }

  createMaterial(color) {
    color = color || createRandomColor();
    return new THREE.MeshPhongMaterial({color: color});
  }

  attachFire() {
    window.addEventListener("pointerdown", (event) => {
      //console.log('TEST ........................', byId('player.munition'))
      // playerItems
      // this.playerItems
      this.mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      this.raycaster.setFromCamera(this.mouseCoords, this.camera);

      // Creates a ball and throws it
      const ballMass = this.config.playerController.bullet.mass;
      const ballRadius = this.config.playerController.bullet.radius;
      const bulletMesh = new THREE.Mesh(
        new THREE.SphereGeometry(ballRadius, 14, 10),
        this.bulletMaterial
      );
      bulletMesh.castShadow = true;
      bulletMesh.receiveShadow = true;
      const ballShape = new Ammo.btSphereShape(ballRadius);
      ballShape.setMargin(this.margin);
      this.pos.copy(this.raycaster.ray.direction);
      this.pos.add(this.raycaster.ray.origin);
      this.quat.set(0, 0, 0, 1);
      const ballBody = this.createRigidBody(
        bulletMesh,
        ballShape,
        ballMass,
        this.pos,
        this.quat
      );

      this.pos.copy(this.raycaster.ray.direction);
      this.pos.multiplyScalar(this.config.playerController.bullet.power);
      ballBody.setLinearVelocity(new Ammo.btVector3(this.pos.x, this.pos.y, this.pos.z));

      setTimeout(() => {
        this.destroySceneObject(bulletMesh);
      }, this.config.playerController.bullet.bulletLiveTime);

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
    if(this.stats) this.stats.update();
  }

  netflag = 0;

  render() {
    const deltaTime = this.clock.getDelta();
    // NETWORK
    //  We cant send whot complex object with methods !!! via network
    // only varable

    this.netflag++;
    if(this.netflag > 2) {
      this.networkEmisionObjs.forEach((i, index) => {
        if(i.name == 'player') {
          // indicate local Player object !
          if(this.net.connection) this.net.connection.send({
            netPos: {x: i.position.x, y: i.position.y, z: i.position.z},
            netRot: {
              x: this.camera.rotation.x,
              y: this.camera.rotation.y,
              z: this.camera.rotation.z
            },
            // netQuaternion: this.camera.quaternion,
            netObjId: this.net.connection.userid,
            netType: 'netPlayer' // can be shared or enemy comp
          })
        } else if (i.netType == 'envObj') {
          //  console.log('.name =', i.name, " netType ", i.netType);
          if(this.net.connection) this.net.connection.send({
            netPos: {x: i.position.x, y: i.position.y, z: i.position.z},
            netQuaternion: i.quaternion,
            // name must be uniq
            netObjId: i.name,
            netType: 'netEnvObj'
          })
        }


      });
      this.netflag = 0;
    }



    this.updatePhysics(deltaTime);
    this.updateControls();

    if(this.config.playerController.movementType === 'velocity') {
      this.moveVelocity();
    } else {
      this.moveKinematic();
    }

    this.loader.mixers.forEach((i) => {
      i.update(deltaTime);
    });

    // for now
    this.net.loader.mixers.forEach((i) => {
      i.update(deltaTime);
    });

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
// Remove this after all
// this is only for easy access from console
window.App = App;