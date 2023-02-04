
    // //Bridge
    // const bridgeMass = 100;
    // const bridgeHalfExtents = new THREE.Vector3(7, 0.2, 1.5);
    // pos.set(0, 10.2, 0);
    // quat.set(0, 0, 0, 1);
    // createObject(
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

    //   createObject(
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
    