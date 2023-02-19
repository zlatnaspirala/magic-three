import {MathUtils} from "three";

export function updatePhysics(deltaTime) {
  // Step world
  this.physicsWorld.stepSimulation(deltaTime, 10);

  /// nidza test
  // this.playerBody

  // Update rigid bodies
  for(let i = 0, il = this.rigidBodies.length;i < il;i++) {
    const objThree = this.rigidBodies[i];
    const objPhys = objThree.userData.physicsBody;
    const ms = objPhys.getMotionState();

    if(ms) {
      ms.getWorldTransform(this.transformAux1);
      const p = this.transformAux1.getOrigin();
      const q = this.transformAux1.getRotation();
      objThree.position.set(p.x(), p.y(), p.z());
      objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());

      objThree.userData.collided = false;
    }
  }

  for(let i = 0, il = this.dispatcher.getNumManifolds();i < il;i++) {
    const contactManifold = this.dispatcher.getManifoldByIndexInternal(i);
    const rb0 = Ammo.castObject(
      contactManifold.getBody0(),
      Ammo.btRigidBody
    );
    const rb1 = Ammo.castObject(
      contactManifold.getBody1(),
      Ammo.btRigidBody
    );

    const threeObject0 = Ammo.castObject(
      rb0.getUserPointer(),
      Ammo.btVector3
    ).threeObject;
    const threeObject1 = Ammo.castObject(
      rb1.getUserPointer(),
      Ammo.btVector3
    ).threeObject;

    if(!threeObject0 && !threeObject1) {
      continue;
    }

    const userData0 = threeObject0 ? threeObject0.userData : null;
    const userData1 = threeObject1 ? threeObject1.userData : null;

    const breakable0 = userData0 ? userData0.breakable : false;
    const breakable1 = userData1 ? userData1.breakable : false;

    const collided0 = userData0 ? userData0.collided : false;
    const collided1 = userData1 ? userData1.collided : false;

    if((!breakable0 && !breakable1) || (collided0 && collided1)) {
      continue;
    }

    let contact = false;
    let maxImpulse = 0;
    for(let j = 0, jl = contactManifold.getNumContacts();j < jl;j++) {
      const contactPoint = contactManifold.getContactPoint(j);

      if(contactPoint.getDistance() < 0) {
        contact = true;
        const impulse = contactPoint.getAppliedImpulse();

        if(impulse > maxImpulse) {
          maxImpulse = impulse;
          const pos = contactPoint.get_m_positionWorldOnB();
          const normal = contactPoint.get_m_normalWorldOnB();
          this.impactPoint.set(pos.x(), pos.y(), pos.z());
          this.impactNormal.set(normal.x(), normal.y(), normal.z());
        }

        break;
      }
    }

    // If no point has contact, abort
    if(!contact) continue;
    // Subdivision
    const fractureImpulse = 250;

    if(breakable0 && !collided0 && maxImpulse > fractureImpulse) {
      const debris = this.convexBreaker.subdivideByImpact(
        threeObject0,
        this.impactPoint,
        this.impactNormal,
        1,
        2,
        1.5
      );

      const numObjects = debris.length;
      for(let j = 0;j < numObjects;j++) {
        const vel = rb0.getLinearVelocity();
        const angVel = rb0.getAngularVelocity();
        const fragment = debris[j];
        fragment.userData.velocity.set(vel.x(), vel.y(), vel.z());
        fragment.userData.angularVelocity.set(
          angVel.x(),
          angVel.y(),
          angVel.z()
        );
        this.createDebrisFromBreakableObject(fragment);
      }

      this.objectsToRemove[this.numObjectsToRemove++] = threeObject0;
      userData0.collided = true;
    }

    if(breakable1 && !collided1 && maxImpulse > fractureImpulse) {
      const debris = this.convexBreaker.subdivideByImpact(
        threeObject1,
        this.impactPoint,
        this.impactNormal,
        1,
        2,
        1.5
      );

      const numObjects = debris.length;
      for(let j = 0;j < numObjects;j++) {
        const vel = rb1.getLinearVelocity();
        const angVel = rb1.getAngularVelocity();
        const fragment = debris[j];
        fragment.userData.velocity.set(vel.x(), vel.y(), vel.z());
        fragment.userData.angularVelocity.set(
          angVel.x(),
          angVel.y(),
          angVel.z()
        );

        this.createDebrisFromBreakableObject(fragment);
      }

      this.objectsToRemove[this.numObjectsToRemove++] = threeObject1;
      userData1.collided = true;
    }
  }

  for(let i = 0;i < this.numObjectsToRemove;i++) {
    this.removeDebris(this.objectsToRemove[i]);
  }
  this.numObjectsToRemove = 0;
}

let localPingPong = true;
export function updateControls() {
  const time = performance.now();
  if(this.controls.isLocked === true) {
    this.raycaster.ray.origin.copy(this.controls.getObject().position);
    this.raycaster.ray.origin.y -= 5;
    const intersections = this.raycaster.intersectObjects(this.scene.children, false);
    const onObject = intersections.length > 0;
    const delta = (time - this.prevTime) / 1000;
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;
    this.velocity.y -= 9.8 * 10 * delta;
    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize(); // this ensures consistent movements in all directions
    if(this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 400.0 * delta;
    if(this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 400.0 * delta;

    this.velocity.y = Math.max(0, this.velocity.y);

    if (this.config.playerController.movementType == "kinematic") {
      // Kinematic controls works !
      this.controls.moveRight(- this.velocity.x * delta);
      this.controls.moveForward(- this.velocity.z * delta);
      return;
     }

    if (this.JUMP == true) {
      console.log('JUMP TEST')
      if (localPingPong == true) {
        this.playerBody.userData.physicsBody.setLinearVelocity(
          new Ammo.btVector3(0, this.config.playerController.movementSpeed.jump, 0));
        this.camera.position.copy(this.playerBody.position);
        this.JUMP = false;
        localPingPong = !localPingPong;
      } else {
        this.playerBody.position.copy(this.camera.position);
        localPingPong = !localPingPong;
      }
     } else {
      this.camera.position.copy(this.playerBody.position);
     }

    if (this.moveForward == true) {
      this.pos.copy(this.raycaster.ray.direction);
      this.pos.multiplyScalar(8);
      this.playerBody.userData.physicsBody.setLinearVelocity(
        new Ammo.btVector3(this.pos.x, 0, this.pos.z));
    } else if (this.moveBackward == true) {
      this.pos.copy(this.raycaster.ray.direction);
      this.pos.multiplyScalar(8);
      this.playerBody.userData.physicsBody.setLinearVelocity(
        new Ammo.btVector3(-this.pos.x, 0, -this.pos.z));
    } else if (this.moveLeft == true) {
      let fixedDirection1 = this.raycaster.ray.direction.clone();
      fixedDirection1.applyAxisAngle(
        new THREE.Vector3(0,1,0), MathUtils.degToRad(90))
      this.pos.copy(fixedDirection1);
      this.pos.multiplyScalar(8);
      this.playerBody.userData.physicsBody.setLinearVelocity(
        new Ammo.btVector3(this.pos.x, 0, this.pos.z));
     } else if (this.moveRight == true) {
      let fixedDirection1 = this.raycaster.ray.direction.clone();
      fixedDirection1.applyAxisAngle(
        new THREE.Vector3(0,1,0), MathUtils.degToRad(-90))
      this.pos.copy(fixedDirection1);
      this.pos.multiplyScalar(8);
      this.playerBody.userData.physicsBody.setLinearVelocity(
        new Ammo.btVector3(this.pos.x, 0, this.pos.z));
     }

  }
  this.prevTime = time;
}