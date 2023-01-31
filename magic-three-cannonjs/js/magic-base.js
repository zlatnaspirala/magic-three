import {MagicThree} from "./magic-core";

export class Magic extends MagicThree {

  constructor() {
    super();
  }

  addMagicBox(o) {
    // Add boxes
    if(typeof o === 'undefined') {
      let o = {
        position: {x: 10, y: 10, z: 10},
        dimension: [1, 1, 1]
      };
    }

    var halfExtents = new CANNON.Vec3(o.dimension[0], o.dimension[1], o.dimension[2]);
    var boxShape = new CANNON.Box(halfExtents);
    var boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);

    var x = o.position.x;
    var y = o.position.y;
    var z = o.position.z;

    var boxBody = new CANNON.Body({mass: 5});
    boxBody.addShape(boxShape);
    var boxMesh = new THREE.Mesh(boxGeometry, this.material);
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
    var N = 5, last;
    var boxGeometry = new THREE.BoxGeometry(he.x * 2, he.y * 2, he.z * 2);
    for(var i = 0;i < N;i++) {
      var boxbody = new CANNON.Body({mass: mass});
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
      if(i != 0) {
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