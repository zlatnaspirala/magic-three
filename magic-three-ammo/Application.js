/**
 * @description
 * Main instance [default setup],
 * Magic Map Loader
 * @note Important note `don't import unused modules`.
 * @author Nikola Lukic zlatnaspirala@gmail.com
 * @personalSite https://maximumroulette.com
 */

import * as THREE from "three";
import {getDom} from "./public/libs/utils.js";
import {createFPSController} from "./public/magic/controllers.js";
import {MagicPhysics} from "./public/magic/physics.js";
import {updateControls} from "./public/magic/updater.js";
import {MagicMaterials} from "./public/magic/materials.js";
import {MagicLoader} from "./public/magic/loaders.js";
import {BIGLOG, REDLOG, byId, createAppEvent, isMobile, load, runCache, save, QueryString, ANYLOG, setCssVar} from "./public/magic/utility.js";
import {startUpScreen} from "./public/assets/inlineStyle/style.js";
import {loadMap} from "./public/magic/magicmap-loader.js";
import {Sky} from 'three/addons/objects/Sky.js';
import {MagicSounds} from "./public/magic/audios/sounds.js";
import {label} from "./public/magic/multi-lang.js";
import {MagicTheme} from "./public/magic/theme.js";
import {RCSAccount} from "./public/magic/networking/rocket-crafting-account.js";
let t = label.t;

export default class Application extends MagicPhysics {

  // 0. BETA VERSIONS
  APP_VERSION = "0.3.0";

  // Graphics variables
  container = getDom("container");
  stats = null;
  label = label;

  camera = new THREE.PerspectiveCamera(
    this.config.camera.fov,
    window.innerWidth / window.innerHeight,
    this.config.camera.near, this.config.camera.far);
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();

  materials = new MagicMaterials();
  controls = null;
  textureLoader = null;
  clock = new THREE.Clock();
  mouseCoords = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  intersects = [];
  onlyIntersects = [];
  bulletMaterial = new THREE.MeshPhongMaterial({color: 0x202020});

  sky = {};

  // Player Controller
  prevTime = performance.now();
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  velocity = new THREE.Vector3();
  direction = new THREE.Vector3();
  vertex = new THREE.Vector3();
  color = new THREE.Color();

  config;

  BASE_CHARACTER_MESH; // NOT ACTIVE

  myBigDataFlag = [];
  playerBody;
  playerItems = {
    munition: 100
  };
  playerData = {};
  networkEmisionObjs = [];
  bulletMesh;

  netflag = 0;
  fx = new MagicSounds();

  nightAndDayThread = null;
  nightAndDayStatus = 'day';

  LOCK = false;

  constructor(config, currentMap) {

    super({config: config});
    this.config = config;
    this.currentMap = currentMap;

    addEventListener('multi-lang', () => {
      setTimeout(() => App.label.update(), 100)

      const domLoader = document.getElementById('instructions');
      domLoader.innerHTML = startUpScreen();


      if(this.config.networking.broadcasterInit == true) {
        if(App.net && App.net.connection && App.net.connection.isInitiator == true) byId('hud-message').innerHTML = t('you.are.host');
      }

      if(isMobile == true) byId('header.title').innerHTML += 'Mobile✭';

      document.title = t('title');
    });

    if(this.config.networking.broadcasterInit == true) {
      addEventListener('stream-loaded', (e) => {
        console.info('net event: [stream-loaded]', e);
        if(this.net.connection.isInitiator === true) {
          if(document.title != t('you.are.host')) {
            dispatchEvent(new CustomEvent('onHudMsg', {detail: {msg: t('you.are.host')}}))
            document.title = t('you.are.host');
          }
        } else {
          dispatchEvent(new CustomEvent('onHudMsg', {detail: {msg: t('you.are.guest')}}))
          document.title = t('you.are.guest');
        }
      })
    }

    // Player data - locals only - this is not secured if you wanna some validation data...
    if(load('playerData') !== false) {
      this.playerData = load('playerData');
    } else {
      this.playerData = {
        energy: this.config.playerController.playerData.energy,
        kills: 0,
        dies: 0
      };
      save('playerData', this.playerData);
    }

    this.playerItems.munition = this.config.playerController.playerItems.munition;

    byId('playerKills').innerHTML = this.playerData.kills;
    byId('playerEnergy').innerHTML = this.playerData.energy;

    this.loader = new MagicLoader(this.config, this.scene);
    for(let i = 0;i < 500;i++) {
      this.objectsToRemove[i] = null;
    }

    this.fx.createAudio('shot', "./assets/audios/single-gunshot.mp3", 5)
    this.fx.createAudio('bg', "./assets/audios/backgrounds/chaoticfilth.mp3")
    runCache(this.config.cache);

    // this.myBigDataFlag.push(this.loader.fbx('./assets/objects/zombies/zombie-walk.fbx', 'zombie1').then((r) => {
    //   console.info('Setup enemy zombie1 =>', r);
    //   r.position.set(-15, 0, -10)
    //   window.R = r

    //   /**
    //    *   if (Math.sign(direction_follower.z) != Math.sign(direction.z)){
    //           if (follower.position.z <= origin.position.z + epsilon &&
    //               follower.position.z >= origin.position.z - epsilon)
    //               direction_follower.negate();
    //        }
    //    */
    // }));

    this.myBigDataFlag.push(this.loader.fbx('./assets/objects/zombies/zombie-walk.fbx', 'test').then((r) => {
      console.info('Setup BOT ENEMY animation character obj =>', r);
      App.TESTOBJ = r;
      // r.position.set(10, 0, 10);
    }));

    Promise.all(this.myBigDataFlag).then((values) => {
      console.info(`%cAll big data [fbx animations ...] loaded ${values}`, ANYLOG);
    });

    // Check from config is it Account used here.
    // RCSAccount
    if(this.config.useRCSAccount == true) {
      this.myAccounts = new RCSAccount();
      console.log('<ACCOUNTS> ', this.myAccounts);
    }

    // Attach funcs
    this.loadMap = loadMap.bind(this);
    this.updateControls = updateControls.bind(this);

    Ammo().then((AmmoLib) => {
      Ammo = AmmoLib;
      this.ammoTmpPos = new Ammo.btVector3();
      this.ammoTmpQuat = new Ammo.btQuaternion();
      this.tmpTrans = new Ammo.btTransform();

      const domLoader = document.getElementById('instructions');
      domLoader.innerHTML = startUpScreen();

      this.init();

      this.setupContactResultCallback();
      this.setupContactPairResultCallback(); // new test ???

      this.animate();

      byId('matrix-net').style.display = 'none';
      setTimeout(() => {
        byId('matrix-net').style.display = 'none';
        // Override from url params
        if(QueryString.dev && QueryString.dev == "true") {
          console.log('MAKE BLOCK VOLUMES VISIBLE DISPATCH')
          dispatchEvent(new CustomEvent('config.map.blockingVolumes.visible', {detail: {map: {blockingVolumes: {visible: true}}}}))
        }
      }, 1500)
      console.log(`%c Magic three ver ${this.APP_VERSION} is ready.`, BIGLOG)
    });
  }

  init() {
    this.createFPSController = createFPSController.bind(this);
    this.initGraphics();
    this.initPhysics();
    this.activateNet('KURE');
    this.createObjects();
    this.attachFire();
    this.initGamePlayEvents();
    this.createPlayer();
  }

  initGamePlayEvents() {
    this.theme = new MagicTheme();
    let themeDOM = byId('theme-color').onchange = (e) => {
      // Change theme attach event..
      console.log("theme=>", e.target.selectedOptions[0].value);
      dispatchEvent(new CustomEvent('theme', {detail: e.target.selectedOptions[0].value}))
    };

    let languageDOM = byId('language');
    languageDOM.onchange = (e) => {
      // Change theme attach event..
      console.log("language=>", e.target.selectedOptions[0].value);

      let lang = e.target.selectedOptions[0].value;
      App.label.loadPack(lang, function() {
        const mlready = new CustomEvent('multi-lang', {});
        dispatchEvent(mlready);
        console.info('%c Magic-Three: MultiLang loaded.', ANYLOG);
      });
      // dispatchEvent(new CustomEvent('language', {detail: e.target.selectedOptions[0].value}))
    };

    // hud-message
    addEventListener('onHudMsg', (e) => {
      console.log('Update HUD title message, e.detail.msg = ', e.detail.msg)
      byId('hud-message').innerHTML = e.detail.msg;
    })

    addEventListener('addToOnlyIntersects', (e) => {
      console.log('Added to onlyIntersects , e.detail.o = ', e.detail.o)
      this.onlyIntersects.push(e.detail.o);
    })

    if(this.config.map.nightAndDay.enabled == true) {
      this.nightAndDayThread = setInterval(() => {

        // console.log('TTTTTTTTTT',  this.sky.material.uniforms)
        if(this.nightAndDayStatus == 'day') {
          this.sky.material.uniforms.sunPosition.value.y = this.sky.material.uniforms.sunPosition.value.y - 15;

          // App.ambientLight.color.add({r: -0.1, g:-0.1, b:-0.1}) 
          if(this.sky.material.uniforms.sunPosition.value.y < -500) {
            // night

            // this.sky.material.uniforms.sunPosition.value.x = 
            // this.sky.material.uniforms.turbidity.value += 0.1;

            this.sky.material.uniforms.sunPosition.value.x = -1000
            this.nightAndDayStatus = 'night'
          }
        } else {
          this.sky.material.uniforms.sunPosition.value.y = this.sky.material.uniforms.sunPosition.value.y + 15
          if(this.sky.material.uniforms.sunPosition.value.y > 1000) {
            // this.sky.material.uniforms.turbidity.value -= 0.1;
            // night
            this.sky.material.uniforms.sunPosition.value.x = 1000
            this.nightAndDayStatus = 'day'
          }
        }
        // App.scene.background.setRGB()
      }, this.config.map.nightAndDay.animSun)
    }
  }

  initGraphics() {
    this.scene.background = new THREE.Color(this.config.map.background);

    // for for local rotation vars !! Dont remove this. Helps for net rot.
    this.camera.rotation.order = this.config.camera.order;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    if(this.config.map.sky.enabled == true) {
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 0.5;
    }

    this.container.appendChild(this.renderer.domElement);

    if(this.config.playerController.type === 'FPS') {
      this.createFPSController();
    } else {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 2, 0);
      this.controls.update();
    }

    // Lights
    this.textureLoader = new THREE.TextureLoader();

    this.ambientLight = new THREE.AmbientLight(this.config.map.ambientLight.color);
    this.scene.add(this.ambientLight);

    this.light = new THREE.DirectionalLight(this.config.map.directionLight.color, this.config.map.directionLight.intensity);
    this.light.position.set(-10, 18, 5);
    this.light.castShadow = true;
    const d = this.config.map.directionLight.LRTB;
    this.light.shadow.camera.left = -d;
    this.light.shadow.camera.right = d;
    this.light.shadow.camera.top = d;
    this.light.shadow.camera.bottom = -d;
    this.light.shadow.camera.near = this.config.map.directionLight.shadow.camera.near;
    this.light.shadow.camera.far = this.config.map.directionLight.shadow.camera.far;
    this.light.shadow.mapSize.x = this.config.map.directionLight.shadow.mapSize.x;
    this.light.shadow.mapSize.y = this.config.map.directionLight.shadow.mapSize.x;
    this.scene.add(this.light);

    // Add Sky
    if(this.config.map.sky.enabled == true) {
      this.sky = new Sky();
      this.sky.scale.setScalar(450000);
      this.scene.add(this.sky);
      this.sun = new THREE.Vector3(1000, 1000, 0);
      var uniforms = this.sky.material.uniforms;
      uniforms.turbidity.value = this.config.map.sky.uniforms.turbidity;
      uniforms.rayleigh.value = this.config.map.sky.uniforms.rayleigh;
      uniforms.mieCoefficient.value = this.config.map.sky.uniforms.mieCoefficient;
      uniforms.mieDirectionalG.value = this.config.map.sky.uniforms.mieDirectionalG;
      uniforms.sunPosition.value.copy(this.sun);
      console.log("Sky params", uniforms)
      // uniforms[ "luminance" ].value = 1
    }

    if(this.config.stats == true) {
      this.stats = new Stats();
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.top = "0px";
      this.container.appendChild(this.stats.domElement);
    }

    window.addEventListener("resize", this.onWindowResize);
  }

  createPlayer() {
    this.camera.position.set(
      this.config.playerController.cameraInitPosition.x,
      this.config.playerController.cameraInitPosition.y,
      this.config.playerController.cameraInitPosition.z);
    this.raycaster.setFromCamera(this.mouseCoords, this.camera);

    const material = new THREE.LineBasicMaterial({color: 0x0000ff});
    const ballMass = this.config.playerController.physicsBody.mass;
    const ballRadius = this.config.playerController.physicsBody.radius;
    const ball = new THREE.Line(
      new THREE.SphereGeometry(ballRadius, 14, 10),
      material);
    ball.castShadow = false;
    ball.receiveShadow = false;
    ball.visible = this.config.playerController.physicsBody.visible;

    let playerCapsuleShape;

    if(this.config.playerController.physicsBody.typeOfPlayerCapsule == 'cube') {
      playerCapsuleShape = new Ammo.btBoxShape(
        new Ammo.btVector3(
          this.config.playerController.physicsBody.cubeCapsuleScale[0],
          this.config.playerController.physicsBody.cubeCapsuleScale[1],
          this.config.playerController.physicsBody.cubeCapsuleScale[2])
      );
    } else if(this.config.playerController.physicsBody.typeOfPlayerCapsule == 'ball') {
      playerCapsuleShape = new Ammo.btSphereShape(ballRadius);
    } else {
      // default
      playerCapsuleShape = new Ammo.btSphereShape(ballRadius);
    }

    playerCapsuleShape.setMargin(this.margin);

    this.pos.copy(new THREE.Vector3(
      this.config.playerController.cameraInitPosition.x,
      this.config.playerController.cameraInitPosition.y,
      this.config.playerController.cameraInitPosition.z));
    // this.pos.copy(this.raycaster.ray.direction);
    // this.pos.add(this.raycaster.ray.origin);

    this.quat.set(0, 0, 0, 1);
    this.playerBody = ball;

    let localInertia = new Ammo.btVector3(0, 0, 0);
    playerCapsuleShape.calculateLocalInertia(0, localInertia);

    const playerB = this.createRigidBody(
      ball,
      playerCapsuleShape,
      ballMass,
      this.pos,
      this.quat
    );

    // local player
    this.playerBody.name = 'player';
    // console.log("PlayerBody created and pushed to netView. ", this.playerBody);
    this.networkEmisionObjs.push(this.playerBody);
    // playerB.setCollisionFlags(0);

    byId('playerMunition').innerHTML = this.playerItems.munition;

    addEventListener('onDie', (e) => {
      console.info(`%c onDie Event ${e} !`, REDLOG)
      if(this.config.playerController.onEvent.onDie == "reload") {
        location.reload();
      } else if(this.config.playerController.onEvent.onDie == "justHideNetPlayer") {
        // // search in scene for name netPlayerId
        // console.log('e.detail.netPlayerId>>>??', e.detail.netPlayerId, " - ", e.detail.netPlayerId)
        // // LocalPlayer always triggered...
        // var object = this.scene.getObjectByName('player');
        // object.visible = false;
        // default reload make it for negging simpleway.
        location.reload();
      } else {
        // default reload
        location.reload();
      }
      // this.playerItems.munition--;
      // byId('playerMunition').innerHTML = this.playerItems.munition;
    });

    addEventListener('onFire', (e) => {
      console.info(`%c onFire Event ${e} !`, REDLOG)
      this.playerItems.munition--;
      byId('playerMunition').innerHTML = this.playerItems.munition;
    });

    addEventListener('enemyDamage', (e) => {
      console.info(`%c enemyDamage Event ${e} !`, REDLOG)
      if(this.net.connection) this.net.connection.send({
        netDamage: {
          for: e.detail.myNetPromise,
          value: e.detail.value
        }
      })
    });

    addEventListener('onMyDamage', (e) => {
      console.info(`%c onMyDamage Event ${e.detail} !`, REDLOG)
      if(this.playerData.energy - 100 < 0) {
        this.playerData.energy = 0;
        dispatchEvent(new CustomEvent('onDie', {
          detail: {
            netPlayerId: e.detail.for
          }
        }))
      } else {
        this.playerData.energy -= 100;
      }
      byId('playerEnergy').innerHTML = this.playerData.energy;
      dispatchEvent(new CustomEvent('onHudMsg', {detail: {msg: t('you.are.on.fire')}}))

    });
  }

  createObjects() {
    // Ground
    this.pos.set(0, -0.5, 0);
    this.quat.set(0, 0, 0, 1);
    const ground = this.createParalellepipedWithPhysics(
      this.config.map.floorWidth, 1,
      this.config.map.floorHeight, 0,
      this.pos, this.quat,
      this.materials.assets.BlackBronze
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
    this.loadMap(this.currentMap);
    // Load custom elements ...

    // play bg music
    if(this.config.map.autoplayBgMusic == true) {
      this.fx.play('bg')
    }
  }

  attachFire() {
    // console.log('<AtachFire>')
    var canvasDOM = document.getElementsByTagName('canvas')[0];
    window.addEventListener("pointerdown", (event) => {
      if(this.LOCK == false) return;
      if(this.playerItems.munition > 0) {
        // if you wanna use custom 
        // this.mouseCoords.set(
        //   (event.clientX / window.innerWidth) * 2 - 1,
        //   -(event.clientY / window.innerHeight) * 2 + 1
        // );
        this.mouseCoords.set(0, 0);
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
        bulletMesh.userData.tag = 'local_bullet';
        bulletMesh.name = 'bullet';
        // this.bulletMesh = bulletMesh; // TEST 
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
        ballBody.threeObject = bulletMesh;
        this.bulletB = ballBody;
        // Best way customEvents!
        let onPlayerFire = new CustomEvent('onFire', {detail: {event: 'onFire'}})
        dispatchEvent(onPlayerFire);
        // setTimeout(() => {
        //   if(this.bulletB) {
        //     this.physicsWorld.contactTest(this.bulletB, this.cbContactResult);
        //   }
        // }, this.config.playerController.bullet.bulletLiveTime / 2);
        this.raycaster.setFromCamera(this.mouseCoords, this.camera);
        // this.intersects = this.raycaster.intersectObjects(this.scene.children);
        this.intersects = this.raycaster.intersectObjects(this.onlyIntersects);
        for(var x = 0;x < this.intersects.length;x++) {
          if(this.intersects[x].object.parent.name) {
            // this.intersects[x].object.parent.name
            console.log("on hit =>", this.intersects[x].object.parent.name)
            dispatchEvent(new CustomEvent('onHudMsg', {
              detail: {
                msg: `${t('you.hit.enemy')} ${this.intersects[x].object.parent.name}`,
              }
            }))
            dispatchEvent(new CustomEvent('enemyDamage', {
              detail: {
                myNetPromise: this.intersects[x].object.parent.name,
                value: 100
              }
            }))
            this.intersects = [];
          }
        }

        this.fx.play('shot');

        setTimeout(() => {
          this.destroySceneObject(bulletMesh);
        }, this.config.playerController.bullet.bulletLiveTime);
      }
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

  render() {
    const deltaTime = this.clock.getDelta();

    this.netflag++;
    if(this.netflag > 4) {
      this.networkEmisionObjs.forEach((i, index) => {
        if(i.name == 'player') {
          // indicate local Player object !
          // 1.5 is correction
          if(this.net.connection) this.net.connection.send({
            netPos: {
              x: i.position.x,
              y: i.position.y - 1.5,
              z: i.position.z
            },
            netRot: {
              x: this.camera.rotation.x,
              y: this.camera.rotation.y,
              z: this.camera.rotation.z
            },
            // netDamage: 0,
            netQuaternion: this.camera.quaternion,
            netObjId: this.net.connection.userid,
            netType: 'netPlayer' // can be shared or enemy comp
          })
        } else if(i.netType == 'envObj') {
          // console.log('.i.userData.physicsBody.getLinearVelocity().x() =', i.userData.physicsBody.getLinearVelocity().x());
          if(this.net.connection) this.net.connection.send({
            // object.userData.physicsBody.getLinearVelocity().x()
            // netPos: {x: i.position.x, y: i.position.y, z: i.position.z},
            netPos: {
              x: i.userData.physicsBody.getLinearVelocity().x(),
              y: i.userData.physicsBody.getLinearVelocity().y(),
              z: i.userData.physicsBody.getLinearVelocity().z()
            },
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


    if(this.config.map.collision.detectCollision == true) {
      this.detectCollision()
      if(this.bulletMesh) {
        // console.log('???')this.physicsWorld.contactTest(this.bulletMesh, this.cbContactResult);
      }
    }

    // update the picking ray with the camera and pointer position
    /// this.raycaster.setFromCamera(this.mouseCoords, this.camera);
    // calculate objects intersecting the picking ray
    // let intersects = this.raycaster.intersectObjects(this.scene.children);
    // let intersects = this.raycaster.intersectObjects(this.scene.children);
    // if(intersects[i].object.name == 'player') {
    //     console.log("on hit =>", intersects[i].object.name)
    // }
    // for(let i = 0;i < intersects.length;i++) {
    //   if (intersects[i].object.name == 'player') {
    //     console.log("on hit =>", intersects[i].object.name)
    //   }
    // }

    this.renderer.render(this.scene, this.camera);
  }

}
