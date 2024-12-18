import * as THREE from "three";
import {ConvexObjectBreaker} from "../jsm/misc/ConvexObjectBreaker.js";
import {updatePhysics} from "./updater.js";
import {MagicNetworking} from "./networking/magic-netwoking.js";
import {MathUtils} from "three";
import {REDLOG} from "./utility.js";

export class MagicPhysics extends MagicNetworking {

  // Physics variables - negative aspect
  gravityConstant = 17.8;
  collisionConfiguration;
  dispatcher;
  broadphase;
  solver;
  physicsWorld;
  margin = 0.05;
  convexBreaker = new ConvexObjectBreaker();
  cbContactResult;

  // Rigid bodies include all movable objects
  rigidBodies = [];
  pos = new THREE.Vector3();
  quat = new THREE.Quaternion();
  transformAux1;
  tempBtVec3_1;
  objectsToRemove = [];

  // Player
  ammoTmpPos;
  ammoTmpQuat;
  tmpTrans;

  numObjectsToRemove = 0;
  impactPoint = new THREE.Vector3();
  impactNormal = new THREE.Vector3();

  // kinekt type of movement
  kMoveDirection = {left: 0, right: 0, forward: 0, back: 0};
  // velocity type of movement
  moveDirection = {left: 0, right: 0, forward: 0, back: 0};

  tmpPos = new THREE.Vector3();
  tmpQuat = new THREE.Quaternion();

  constructor(options) {
    super();
    // console.log("MagicPhysics =>", options);
    this.updatePhysics = updatePhysics.bind(this);
    this.config = options.config;
    this.gravityConstant = this.config.map.gravityConstant;
  }

  cbContactPairResult = null;

  setupContactPairResultCallback() {
    this.cbContactPairResult = new Ammo.ConcreteContactResultCallback();
    this.cbContactPairResult.hasContact = false;
    this.cbContactPairResult.addSingleResult = function(cp, colObj0Wrap, partId0, index0, colObj1Wrap, partId1, index1) {
      console.log('------------------------ ')
      let contactPoint = Ammo.wrapPointer(cp, Ammo.btManifoldPoint);
      const distance = contactPoint.getDistance();
      if(distance > 0) return;
      console.log('YEAP !!! ', colObj1Wrap)
      this.hasContact = true;
    }
  }

  initPhysics() {
    // Physics configuration
    this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
    this.broadphase = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(
      this.dispatcher,
      this.broadphase,
      solver,
      this.collisionConfiguration
    );
    this.physicsWorld.setGravity(new Ammo.btVector3(0, -this.gravityConstant, 0));

    this.transformAux1 = new Ammo.btTransform();
    this.tempBtVec3_1 = new Ammo.btVector3(0, 0, 0);
  }

  moveVelocity() {
    let scalingFactor = 20;
    let moveX = this.moveDirection.right - this.moveDirection.left;
    let moveZ = this.moveDirection.back - this.moveDirection.forward;
    let moveY = 0;

    // Extra props brach this - enable for more innert move.
    if(moveX == 0 && moveY == 0 && moveZ == 0) return;

    let resultantImpulse = new Ammo.btVector3(moveX, moveY, moveZ);
    resultantImpulse.op_mul(scalingFactor);

    let physicsBody = this.playerBody.userData.physicsBody;
    physicsBody.setLinearVelocity(resultantImpulse);
  }

  moveKinematic() {
    let scalingFactor = 0.3;
    let moveX = this.kMoveDirection.right - this.kMoveDirection.left;
    let moveZ = this.kMoveDirection.back - this.kMoveDirection.forward;
    let moveY = 0;
    let translateFactor = this.tmpPos.set(moveX, moveY, moveZ);
    translateFactor.multiplyScalar(scalingFactor);
    this.playerBody.translateX(translateFactor.x);
    this.playerBody.translateY(translateFactor.y);
    this.playerBody.translateZ(translateFactor.z);
    this.playerBody.getWorldPosition(this.tmpPos);
    this.playerBody.getWorldQuaternion(this.tmpQuat);
    let physicsBody = this.playerBody.userData.physicsBody;
    let ms = physicsBody.getMotionState();
    if(ms) {
      this.ammoTmpPos.setValue(this.tmpPos.x, this.tmpPos.y, this.tmpPos.z);
      this.ammoTmpQuat.setValue(this.tmpQuat.x, this.tmpQuat.y, this.tmpQuat.z, this.tmpQuat.w);
      this.tmpTrans.setIdentity();
      this.tmpTrans.setOrigin(this.ammoTmpPos);
      this.tmpTrans.setRotation(this.ammoTmpQuat);
      ms.setWorldTransform(this.tmpTrans);
    }
  }

  createRigidBody(object, physicsShape, mass, pos, quat, vel, angVel) {
    if(pos) {
      object.position.copy(pos);
    } else {
      pos = object.position;
    }

    if(quat) {
      object.quaternion.copy(quat);
    } else {
      quat = object.quaternion;
    }

    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(
      new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
    );
    const motionState = new Ammo.btDefaultMotionState(transform);

    const localInertia = new Ammo.btVector3(0, 0, 0);
    physicsShape.calculateLocalInertia(mass, localInertia);

    const rbInfo = new Ammo.btRigidBodyConstructionInfo(
      mass,
      motionState,
      physicsShape,
      localInertia
    );
    const body = new Ammo.btRigidBody(rbInfo);
    // body.setFriction(0.05);
    body.setFriction(4);
    body.setRollingFriction(10);

    if(vel) {
      body.setLinearVelocity(new Ammo.btVector3(vel.x, vel.y, vel.z));
    }

    if(angVel) {
      body.setAngularVelocity(
        new Ammo.btVector3(angVel.x, angVel.y, angVel.z)
      );
    }
    object.userData.physicsBody = body;
    object.userData.collided = false;
    this.scene.add(object);

    if(mass > 0) {
      this.rigidBodies.push(object);

      // Disable deactivation
      body.setActivationState(4);

    }

    this.physicsWorld.addRigidBody(body);
    return body;
  }

  createConvexHullPhysicsShape(coords) {
    const shape = new Ammo.btConvexHullShape();

    for(let i = 0, il = coords.length;i < il;i += 3) {
      this.tempBtVec3_1.setValue(coords[i], coords[i + 1], coords[i + 2]);
      const lastOne = i >= il - 3;
      shape.addPoint(this.tempBtVec3_1, lastOne);
    }

    return shape;
  }

  createParalellepipedWithPhysics(sx, sy, sz, mass, pos, quat, material) {
    const object = new THREE.Mesh(
      new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1),
      material
    );
    const shape = new Ammo.btBoxShape(
      new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5)
    );
    shape.setMargin(this.margin);
    this.createRigidBody(object, shape, mass, pos, quat);
    return object;
  }

  createDebrisFromBreakableObject(object) {
    object.castShadow = true;
    object.receiveShadow = true;

    const shape = this.createConvexHullPhysicsShape(
      object.geometry.attributes.position.array
    );
    shape.setMargin(this.margin);

    const body = this.createRigidBody(
      object,
      shape,
      object.userData.mass,
      null,
      null,
      object.userData.velocity,
      object.userData.angularVelocity
    );

    // Set pointer back to the three object only in the debris objects
    const btVecUserData = new Ammo.btVector3(0, 0, 0);
    btVecUserData.threeObject = object;
    body.setUserPointer(btVecUserData);
  }

  removeDebris(object) {
    this.scene.remove(object);
    this.physicsWorld.removeRigidBody(object.userData.physicsBody);
  }

  createSimpleBox(mass, halfExtents, pos, quat, material, name, netType, matFlag, collide, state) {
    let mat;

    // console.log('MAT IS ???????', mat)
    if(matFlag == false) {
      mat = material;
    } else {
      mat = this.materials.assets[matFlag];
      // console.log('MAT IS', mat)
    }
    const object = new THREE.Mesh(
      new THREE.BoxGeometry(
        halfExtents.x * 2,
        halfExtents.y * 2,
        halfExtents.z * 2
      ),
      mat
    );
    object.position.copy(pos);
    object.quaternion.copy(quat);

    object.castShadow = true;

    object.name = name || "simple-box-" + MathUtils.randInt(0, 99999);

    var colShape = new Ammo.btBoxShape(new Ammo.btVector3(halfExtents.x, halfExtents.y, halfExtents.z)),
      startTransform = new Ammo.btTransform();

    startTransform.setIdentity();

    // var mass = 10,
    var isDynamic = (mass !== 0),
      localInertia = new Ammo.btVector3(0, 0, 0);

    if(isDynamic) colShape.calculateLocalInertia(mass, localInertia);

    startTransform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));

    var myMotionState = new Ammo.btDefaultMotionState(startTransform),
      rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia),
      body = new Ammo.btRigidBody(rbInfo);

    object.userData.physicsBody = body;
    // console.info('IS COLLIDE ', collide);
    object.userData.collided = collide;

    if(typeof state !== 'undefined') {
      // console.info('IS state ', state);
      object.userData.physicsBody.setActivationState(state);
    }

    if(netType == true) {
      console.log('ADD NET OBJECTS ! create simple box. ', this.networkEmisionObjs)
      this.networkEmisionObjs.push(object);
      object.netType = 'envObj';
      object.userData.physicsBody.setActivationState(4);
    }

    this.rigidBodies.push(object);
    this.scene.add(object);

    this.physicsWorld.addRigidBody(body);
  }

  createCilinder(mass, geo, pos, quat, material, name) {
    const object = new THREE.Mesh(
      new THREE.CylinderGeometry(geo[0], geo[1], geo[2], geo[3]),
      material
    );
    object.position.copy(pos);
    object.quaternion.copy(quat);

    object.name = name || "simple-cilinder-" + MathUtils.randInt(0, 99999);
    object.castShadow = true;

    var colShape = this.createConvexHullPhysicsShape(object.geometry.attributes.position.array)
    colShape.setMargin(this.margin);
    // var colShape = new Ammo.btBoxShape(new Ammo.btVector3(halfExtents.x, halfExtents.y, halfExtents.z)),
    let startTransform = new Ammo.btTransform();

    startTransform.setIdentity();
    var isDynamic = (mass !== 0),
      localInertia = new Ammo.btVector3(0, 0, 0);

    if(isDynamic)
      colShape.calculateLocalInertia(mass, localInertia);

    startTransform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));

    var myMotionState = new Ammo.btDefaultMotionState(startTransform),
      rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia),
      body = new Ammo.btRigidBody(rbInfo);

    object.userData.physicsBody = body;
    // object.userData.collided = false;
    this.rigidBodies.push(object);
    this.scene.add(object);

    this.physicsWorld.addRigidBody(body);
  }

  createTorus(mass, geo, pos, quat, material, name) {
    const object = new THREE.Mesh(
      new THREE.TorusGeometry(geo[0], geo[1], geo[2], geo[3]),
      material
    );
    object.position.copy(pos);
    object.quaternion.copy(quat);
    object.name = name || "simple-tube-" + MathUtils.randInt(0, 99999);
    object.castShadow = true;

    var colShape = this.createConvexHullPhysicsShape(object.geometry.attributes.position.array)
    colShape.setMargin(this.margin);
    // var colShape = new Ammo.btBoxShape(new Ammo.btVector3(halfExtents.x, halfExtents.y, halfExtents.z)),
    let startTransform = new Ammo.btTransform();

    startTransform.setIdentity();
    var isDynamic = (mass !== 0),
      localInertia = new Ammo.btVector3(0, 0, 0);

    if(isDynamic)
      colShape.calculateLocalInertia(mass, localInertia);

    startTransform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));

    var myMotionState = new Ammo.btDefaultMotionState(startTransform),
      rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia),
      body = new Ammo.btRigidBody(rbInfo);

    object.userData.physicsBody = body;
    // object.userData.collided = false;
    this.rigidBodies.push(object);
    this.scene.add(object);

    this.physicsWorld.addRigidBody(body);
  }

  createBreakableBox(mass, halfExtents, pos, quat, material, name) {
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
    object.name = name || "simple-breakable-" + MathUtils.randInt(0, 99999);
    object.castShadow = true;
    this.convexBreaker.prepareBreakableObject(
      object,
      mass,
      new THREE.Vector3(),
      new THREE.Vector3(),
      true
    );
    this.createDebrisFromBreakableObject(object);
  }

  createBlockingBox(halfExtents, pos, quat, material, name, matFlag) {
    let mat;
    if(matFlag == false) {
      mat = material;
    } else {
      mat = this.materials.assets[matFlag];
      // console.log('MAT IS', mat)
    }
    const object = new THREE.Line(
      new THREE.BoxGeometry(
        halfExtents.x * 2,
        halfExtents.y * 2,
        halfExtents.z * 2
      ),
      mat
    );
    object.position.copy(pos);
    object.quaternion.copy(quat);
    object.castShadow = false;
    // this ref to the broadcaster when works for net
    if(this.config) object.visible = this.config.map.blockingVolumes.visible;
    object.name = name || "blocking-box-" + MathUtils.randInt(0, 99999);
    var colShape = new Ammo.btBoxShape(new Ammo.btVector3(halfExtents.x, halfExtents.y, halfExtents.z)),
      startTransform = new Ammo.btTransform();

    startTransform.setIdentity();
    var mass = 0;
    // var isDynamic = (mass !== 0);
    var localInertia = new Ammo.btVector3(0, 0, 0);

    startTransform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));

    var myMotionState = new Ammo.btDefaultMotionState(startTransform),
      rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia),
      body = new Ammo.btRigidBody(rbInfo);

    // test  ????????
    body.threeObject = object;

    object.userData.physicsBody = body;
    object.userData.tag = `blocking_block`;
    // object.userData.collided = true;
    object.userData.collided = false;
    this.rigidBodies.push(object);
    this.scene.add(object);
    this.physicsWorld.addRigidBody(body);

    return object;
  }

  createNetPlayerCollisionBox(halfExtents, pos, quat, material, name, matFlag) {
    let mat;
    if(matFlag == false) {
      mat = material;
    } else {
      mat = this.materials.assets[matFlag];
    }
    const object = new THREE.Line(
      new THREE.BoxGeometry(
        halfExtents.x,
        halfExtents.y,
        halfExtents.z
      ),
      mat
    );
    object.position.copy(pos);
    object.quaternion.copy(quat);
    object.castShadow = false;

    // this ref to the broadcaster when works for net
    // if(this.config) object.visible = this.config.map.blockingVolumes.visible;

    object.name = name || "netplayer-collision-box-" + MathUtils.randInt(0, 99999);
    var colShape = new Ammo.btBoxShape(new Ammo.btVector3(halfExtents.x, halfExtents.y, halfExtents.z)),
      startTransform = new Ammo.btTransform();

    startTransform.setIdentity();
    var mass = 0;
    // var isDynamic = (mass !== 0);
    var localInertia = new Ammo.btVector3(0, 0, 0);
    startTransform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));

    var myMotionState = new Ammo.btDefaultMotionState(startTransform),
      rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia),
      body = new Ammo.btRigidBody(rbInfo);
    // test  ????????
    body.threeObject = object;
    object.userData.physicsBody = body;
    object.userData.threeObject = object;
    object.userData.tag = `netplayer-collision-box`;
    object.userData.collided = false;
    // NEXT TEST 
    body.setCollisionFlags(0);
    body.setActivationState(4);
    // this.rigidBodies.push(object);
    this.scene.add(object);
    this.physicsWorld.addRigidBody(body);

    return object;
  }

  // UPDATE  OCT 2024
  attachBoxCollider(object2, halfExtents, name, netType, collide, state) {
    let mat, mass = 0;

    console.log('halfExtents?', halfExtents);
    mat = this.materials.assets['Bronse'];
  

    const object = new THREE.Mesh(
      new THREE.BoxGeometry(
        halfExtents.x * 22,
        halfExtents.y * 22,
        halfExtents.z * 22
      ),
      mat
    );

    object.position.y = 2;
    // object.quaternion.copy(quat);

    object.castShadow = false;

    object.name = name || "attacher-box-collider";

    var colShape = new Ammo.btBoxShape(new Ammo.btVector3(halfExtents.x, halfExtents.y, halfExtents.z));
    // var colShape = new Ammo.btBoxShape(halfExtents.x, halfExtents.y, halfExtents.z);
    var startTransform = new Ammo.btTransform();

    startTransform.setIdentity();

    // var mass = 10,
    var isDynamic = (mass !== 0),
      localInertia = new Ammo.btVector3(0, 0, 0);

    if(isDynamic) colShape.calculateLocalInertia(mass, localInertia);

    startTransform.setOrigin(new Ammo.btVector3(object2.position.x, object2.position.y + 2, object2.position.z));

    var myMotionState = new Ammo.btDefaultMotionState(startTransform),
      rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia),
      body = new Ammo.btRigidBody(rbInfo);

    object2.userData.physicsBody = body;
    console.info('!!!!!IS COLLIDE ', collide);
    object2.userData.collided = collide;

    if(typeof state !== 'undefined') {
      // console.info('IS state ', state);
      object2.userData.physicsBody.setActivationState(state);
    }

    // if(netType == true) {
    //   console.log('ADD NET OBJECTS ! create simple box. ', this.networkEmisionObjs)
    //   this.networkEmisionObjs.push(object);
    //   object.netType = 'envObj';
    //   object.userData.physicsBody.setActivationState(4);
    // }

    this.rigidBodies.push(object2);
    
    object2.add(object)
    // this.scene.add(object);
    console.info('IS object ', object2);
    this.physicsWorld.addRigidBody(body);
  }

  destroySceneObject(o) {
    try {
      this.scene.remove(o);
      this.physicsWorld.removeRigidBody(o.userData.physicsBody);
    } catch(e) {
      console.log(e)
    }
  }

  detectCollision() {
    let dispatcher = this.physicsWorld.getDispatcher();
    let numManifolds = this.dispatcher.getNumManifolds();
    for(let i = 0;i < numManifolds;i++) {
      let contactManifold = dispatcher.getManifoldByIndexInternal(i);
      let numContacts = contactManifold.getNumContacts();

      var obA = contactManifold.getBody0();
      var obB = contactManifold.getBody1();
      // console.log('numContacts>>>>>>>>', numContacts)
      // console.log(">>>>>>>>>>>>>detect>>>>>>>>>>>>>>>>>" + obA);
      for(let j = 0;j < numContacts;j++) {
        let contactPoint = contactManifold.getContactPoint(j);
        let distance = contactPoint.getDistance();

        const rb0 = Ammo.castObject(contactManifold.getBody0(), Ammo.btRigidBody);
        const rb1 = Ammo.castObject(contactManifold.getBody1(), Ammo.btRigidBody);

        if(rb0.userData) console.log("first object:", rb0.userData);
        if(rb1.userData) console.log("second object:", rb1.userData);

        // console.log(">>>>>>>>>>>>>detect>>>>>>>>>>>>>>>>>" + {manifoldIndex: i, contactIndex: j, distance: distance});
      }
    }
  }

  setupContactResultCallback() {

    this.cbContactResult = new Ammo.ConcreteContactResultCallback();
    this.cbContactResult.addSingleResult = function(cp, colObj0Wrap, partId0, index0, colObj1Wrap, partId1, index1) {
      let contactPoint = Ammo.wrapPointer(cp, Ammo.btManifoldPoint);
      const distance = contactPoint.getDistance();
      if(distance > 0) return;
      let colWrapper0 = Ammo.wrapPointer(colObj0Wrap, Ammo.btCollisionObjectWrapper);
      let rb0 = Ammo.castObject(colWrapper0.getCollisionObject(), Ammo.btRigidBody);
      let colWrapper1 = Ammo.wrapPointer(colObj1Wrap, Ammo.btCollisionObjectWrapper);
      let rb1 = Ammo.castObject(colWrapper1.getCollisionObject(), Ammo.btRigidBody);
      let threeObject0 = rb0.threeObject;
      let threeObject1 = rb1.threeObject;
      let tag, localPos, worldPos;


      if(typeof threeObject0 == 'undefined') {
        console.log('[Prevent] .1. ', threeObject0.userData.tag);
        return;
      }

      if(typeof threeObject1 == 'undefined') {
        console.log('Prevent: 2 ', threeObject0.userData.tag)
        return;
      }

      if(threeObject1.userData.tag != "local_bullet") {
        tag = threeObject1.userData.tag;
        localPos = contactPoint.get_m_localPointB();
        worldPos = contactPoint.get_m_positionWorldOnB();
        console.log(`%cBullet contact: ${threeObject1.userData.tag} worldPos ${worldPos}`, REDLOG)
        //  App.TESTOBJ.position.set(worldPos.x(), worldPos.y(), worldPos.z());

      } else if(threeObject0.userData.tag != "local_bullet") {
        console.log('[local_bullet] threeObject0.userData.tag: ', threeObject0.userData.tag)
        tag = threeObject0.userData.tag;
        localPos = contactPoint.get_m_localPointA();
        worldPos = contactPoint.get_m_positionWorldOnA();
      } else if(threeObject0.userData.tag == "local_bullet") {
        console.log('[  ] threeObject0.userData.tag: ', threeObject0.userData.tag)
        tag = threeObject0.userData.tag;
        localPos = contactPoint.get_m_localPointA();
        worldPos = contactPoint.get_m_positionWorldOnA();
      }
      // else {
      //   console.log('[  ] threeObject0.userData.tag: ', threeObject0.userData.tag)
      //   tag = threeObject0.userData.tag;
      //   localPos = contactPoint.get_m_localPointA();
      //   worldPos = contactPoint.get_m_positionWorldOnA();
      // }
      let localPosDisplay = {x: localPos.x(), y: localPos.y(), z: localPos.z()};
      let worldPosDisplay = {x: worldPos.x(), y: worldPos.y(), z: worldPos.z()};
      console.log("collision:" + {tag, localPosDisplay, worldPosDisplay});
    }

    if(this.bulletB) {
      console.log('ssssssssssssssssssss')
      this.physicsWorld.contactTest(this.bulletB, this.cbContactResult);
    }
  }

  createElevatorBoxs(halfExtents_, pos, quat, material, name, stairs) {
    let mat = material;
    // console.log('MAT IS READY', mat);
    const loadStairs = (pos, halfExtents) => {
      const object = new THREE.Mesh(
        new THREE.BoxGeometry(
          halfExtents.x * 2,
          halfExtents.y * 2,
          halfExtents.z * 2
        ),
        mat
      );
      object.position.copy(pos);
      object.quaternion.copy(quat);
      object.castShadow = false;
      object.name = name || "elevator-box-" + MathUtils.randInt(0, 99999);
      var colShape = new Ammo.btBoxShape(new Ammo.btVector3(halfExtents.x, halfExtents.y, halfExtents.z)),
        startTransform = new Ammo.btTransform();
      startTransform.setIdentity();
      var mass = 0;
      var localInertia = new Ammo.btVector3(0, 0, 0);
      startTransform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
      var myMotionState = new Ammo.btDefaultMotionState(startTransform),
        rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia),
        body = new Ammo.btRigidBody(rbInfo);
      body.threeObject = object;
      object.userData.physicsBody = body;
      object.userData.tag = `elevator_block`;
      object.userData.collided = false;
      this.rigidBodies.push(object);
      this.scene.add(object);
      this.physicsWorld.addRigidBody(body);
    }

    for(var x = 0;x < stairs.num;x++) {
      pos.set(this.pos.x, this.pos.y + stairs.height, this.pos.z);
      halfExtents_.set(halfExtents_.x, halfExtents_.y, halfExtents_.z - stairs.width);
      loadStairs(pos, halfExtents_);
    }

  }

}
