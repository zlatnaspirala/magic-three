
export function initPhysics() {
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

export function moveVelocity() {
  let scalingFactor = 20;
  let moveX = this.moveDirection.right - this.moveDirection.left;
  let moveZ = this.moveDirection.back - this.moveDirection.forward;
  let moveY = 0;

  // Extra props brach this - enable for more innert move.
  // if( moveX == 0 && moveY == 0 && moveZ == 0) return;

  let resultantImpulse = new Ammo.btVector3(moveX, moveY, moveZ)
  resultantImpulse.op_mul(scalingFactor);

  let physicsBody = this.playerBody.userData.physicsBody;
  physicsBody.setLinearVelocity(resultantImpulse);
}

export function moveKinematic() {
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

export function createRigidBody(object, physicsShape, mass, pos, quat, vel, angVel) {
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

  body.setFriction(0.5);

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

export function createConvexHullPhysicsShape(coords) {
  const shape = new Ammo.btConvexHullShape();

  for(let i = 0, il = coords.length;i < il;i += 3) {
    this.tempBtVec3_1.setValue(coords[i], coords[i + 1], coords[i + 2]);
    const lastOne = i >= il - 3;
    shape.addPoint(this.tempBtVec3_1, lastOne);
  }

  return shape;
}

export function createParalellepipedWithPhysics(sx, sy, sz, mass, pos, quat, material) {
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

export function createDebrisFromBreakableObject(object) {
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

export function removeDebris(object) {
  this.scene.remove(object);
  this.physicsWorld.removeRigidBody(object.userData.physicsBody);
}
