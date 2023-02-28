
Next features:
 - fix animation for multi fbx    <- fixed
 - connect first emit data for multiplayer  < -
   i have already done this in matrix -engine


 we dont have in threejs access like that 
 from base class
 i will use update samestaff\


var object = scene.getObjectByName( "objectName" );
or to recursively search the scene graph

var object = scene.getObjectByName( "objectName", true );

 // Load custom elements

    // Tower 1 Breakable
    const towerMass = 1000;
    const towerHalfExtents = new THREE.Vector3(5, 5, 0.3);
    // this.pos.set(-8, 5, 0);
    // this.quat.set(0, 0, 0, 1);
    // this.createBreakableBox(
    //   towerMass,
    //   towerHalfExtents,
    //   this.pos,
    //   this.quat,
    //   App.materials.assets.Yellow_glass
    // );

    // Tower 2 Normal
    // this.pos.set(8, 5, 0);
    // this.quat.set(0, 0, 0, 1);
    // this.createSimpleBox(
    //   towerMass,
    //   towerHalfExtents,
    //   this.pos,
    //   this.quat,
    //   App.materials.assets.Bronze
    // );

    // Tower Cilinder Physic but big mass
    // this.pos.set(18, 5, 0);
    // this.quat.set(0, 0, 0, 1);
    // this.createCilinder(
    //   10000,
    //   [5, 5, 20, 32],
    //   this.pos,
    //   this.quat,
    //   App.materials.assets.Bronze
    // );

    // this.pos.set(-18, 5, 0);
    // this.quat.set(0, 0, 0, 1);
    // this.createTorus(
    //   10000,
    //   [10, 3, 16, 100],
    //   this.pos,
    //   this.quat,
    //   App.materials.assets.Bronze
    // );


 MORE =>


    // //Bridge
    // const bridgeMass = 100;
    // const bridgeHalfExtents = new THREE.Vector3(7, 0.2, 1.5);
    // pos.set(0, 10.2, 0);
    // quat.set(0, 0, 0, 1);
    // createBreakableBox(
    //   bridgeMass,
    //   bridgeHalfExtents,
    //   pos,
    //   quat,
    //   createMaterial(0xb3b865)
    // );

    // // Stones
    // const stoneMass = 120;
    // const stoneHalfExtents = new THREE.Vector3(1, 2, 0.15);
    // const numStones = 8;
    // quat.set(0, 0, 0, 1);
    // for(let i = 0;i < numStones;i++) {
    //   pos.set(0, 2, 15 * (0.5 - i / (numStones + 1)));

    //   createBreakableBox(
    //     stoneMass,
    //     stoneHalfExtents,
    //     pos,
    //     quat,
    //     createMaterial(0xb0b0b0)
    //   );
    // }

    // // Mountain
    // const mountainMass = 860;
    // const mountainHalfExtents = new THREE.Vector3(4, 5, 4);
    // pos.set(5, mountainHalfExtents.y * 0.5, -7);
    // quat.set(0, 0, 0, 1);
    // const mountainPoints = [];
    // mountainPoints.push(
    //   new THREE.Vector3(
    //     mountainHalfExtents.x,
    //     -mountainHalfExtents.y,
    //     mountainHalfExtents.z
    //   )
    // );
    // mountainPoints.push(
    //   new THREE.Vector3(
    //     -mountainHalfExtents.x,
    //     -mountainHalfExtents.y,
    //     mountainHalfExtents.z
    //   )
    // );
    // mountainPoints.push(
    //   new THREE.Vector3(
    //     mountainHalfExtents.x,
    //     -mountainHalfExtents.y,
    //     -mountainHalfExtents.z
    //   )
    // );
    // mountainPoints.push(
    //   new THREE.Vector3(
    //     -mountainHalfExtents.x,
    //     -mountainHalfExtents.y,
    //     -mountainHalfExtents.z
    //   )
    // );
    // mountainPoints.push(new THREE.Vector3(0, mountainHalfExtents.y, 0));
    // const mountain = new THREE.Mesh(
    //   new ConvexGeometry(mountainPoints),
    //   createMaterial(0xb03814)
    // );
    // mountain.position.copy(pos);
    // mountain.quaternion.copy(quat);
    // convexBreaker.prepareBreakableObject(
    //   mountain,
    //   mountainMass,
    //   new THREE.Vector3(),
    //   new THREE.Vector3(),
    //   true
    // );
    // createDebrisFromBreakableObject(mountain);
    