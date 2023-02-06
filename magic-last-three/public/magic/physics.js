
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