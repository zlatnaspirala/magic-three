
// Cannon implementation by nikola lukic way

var CANNON_OBJECTS = {

    sphereShape: null,

    boxes: [],
    boxMeshes: [],
    boxSceneIDs: [],

    balls: [],
    ballMeshes: [],
    ballSceneIDs: [],

};

var dt = 1 / 6;

// Setup our world
function initCannon() {

    var ROOT = this;

    ROOT.world = new CANNON.World();
    ROOT.world.quatNormalizeSkip = 0;
    ROOT.world.quatNormalizeFast = false;
    ROOT.world.allowSleep = true;
    //ROOT.world.quatNormalizeFast = true;
    var solver = new CANNON.GSSolver();
    ROOT.world.defaultContactMaterial.contactEquationStiffness = 1e9;
    ROOT.world.defaultContactMaterial.contactEquationRelaxation = 4;
    solver.iterations = 7;
    solver.tolerance = 0.1;
    var split = true;

    if (split)
        ROOT.world.solver = new CANNON.SplitSolver(solver);
    else
        ROOT.world.solver = solver;

    ROOT.world.gravity.set(0, -50, 0);
    ROOT.world.broadphase = new CANNON.NaiveBroadphase();

    // Create a slippery material (friction coefficient = 0.0)
    physicsMaterial = new CANNON.Material("slipperyMaterial");
    var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
            physicsMaterial,
            0.0, // friction coefficient
            0.3 // restitution
        );
    // We must add the contact materials to the world
    ROOT.world.addContactMaterial(physicsContactMaterial);

    // Create a plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({
            mass: 0
        });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    groundBody.initPosition.y = 50;
    ROOT.world.addBody(groundBody);

    ROOT.AUTO_UPDATE = function () {

        ROOT.world.step(dt);
        for (var i = 0; i < CANNON_OBJECTS.balls.length; i++) {
            CANNON_OBJECTS.ballMeshes[i].position.copy(CANNON_OBJECTS.balls[i].position);
            CANNON_OBJECTS.ballMeshes[i].quaternion.copy(CANNON_OBJECTS.balls[i].quaternion);
        }
        for (var i = 0; i < CANNON_OBJECTS.boxes.length; i++) {
            CANNON_OBJECTS.boxMeshes[i].position.copy(CANNON_OBJECTS.boxes[i].position);
            CANNON_OBJECTS.boxMeshes[i].quaternion.copy(CANNON_OBJECTS.boxes[i].quaternion);
        }

    };

    PROGRAM.AUTO_UPDATE.push(ROOT);

    ROOT.CREATE_BOXS_CANNON = function (num) {

        // Add boxes
        var halfExtents = new CANNON.Vec3(10, 10, 10);
        var boxShape = new CANNON.Box(halfExtents);
        var boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);
        for (var i = 0; i < num; i++) {
            var x = (Math.random() - 0.5) * 20;
            var y = 1 + (Math.random() - 0.5) * 1;
            var z = (Math.random() - 0.5) * 20;
            var boxBody = new CANNON.Body({
                    mass: 50
                });
            boxBody.addShape(boxShape);
            boxMesh = new THREE.Mesh(boxGeometry, RM.PhongMaterial);
            ROOT.world.addBody(boxBody);
            scene.add(boxMesh);

            CANNON_OBJECTS.boxes.push(boxBody);
            CANNON_OBJECTS.boxMeshes.push(boxMesh);
            CANNON_OBJECTS.boxSceneIDs.push(scene.children.length - 1);

            boxBody.position.set(x, y, z);
            boxMesh.position.set(x, y, z);
            boxMesh.castShadow = true;
            boxMesh.receiveShadow = true;

        };

    }

    ROOT.CREATE_BOX_CANNON = function (position, dim) {

        var LOCAL_ROOT = this;

        LOCAL_ROOT.ID = CANNON_OBJECTS.boxes.length;

        var halfExtents;

        if (typeof dim != 'undefined') {

            halfExtents = new CANNON.Vec3(dim.x, dim.y, dim.z);

        } else {

            halfExtents = new CANNON.Vec3(100, 100, 100);

        }

        var boxShape = new CANNON.Box(halfExtents);
        var boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);
        var boxBody = new CANNON.Body({
                mass: 50
            });
        boxBody.addShape(boxShape);
        LOCAL_ROOT.boxMesh = new THREE.Mesh(boxGeometry, RM.PhongMaterial);
        ROOT.world.addBody(boxBody);
        LOCAL_ROOT.boxMesh.name = 'KOCKA_KOCKA';
        scene.add(LOCAL_ROOT.boxMesh);
        CANNON_OBJECTS.boxes.push(boxBody);
        CANNON_OBJECTS.boxMeshes.push(LOCAL_ROOT.boxMesh);
        CANNON_OBJECTS.boxSceneIDs.push(scene.children.length - 1);
        boxBody.position.set(position.x, position.y, position.z);
        LOCAL_ROOT.boxMesh.position.set(position.x, position.y, position.z);
        LOCAL_ROOT.boxMesh.castShadow = true;
        LOCAL_ROOT.boxMesh.receiveShadow = true;

    }

    ROOT.CREATE_BOX_CANNON_STATIC = function (position, dim, rot) {

        var halfExtents = new CANNON.Vec3(dim.x, dim.y, dim.z);
        var boxShape = new CANNON.Box(halfExtents);
        var boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);
        var boxBody = new CANNON.Body({
                mass: 0
            });
        boxBody.addShape(boxShape);
        boxMesh = new THREE.Mesh(boxGeometry, RM.PhongMaterial);

        ROOT.world.addBody(boxBody);
        scene.add(boxMesh);

        if (typeof rot != 'undefined') {
            boxMesh.rotation = rot;
        }

        CANNON_OBJECTS.boxes.push(boxBody);
        CANNON_OBJECTS.boxMeshes.push(boxMesh);
        CANNON_OBJECTS.boxSceneIDs.push(scene.children.length - 1);

        boxBody.position.set(position.x, position.y, position.z);
        boxMesh.position.set(position.x, position.y, position.z);
        boxMesh.castShadow = true;
        boxMesh.receiveShadow = true;

    }

    ROOT.REMOVE_BOX = function (index) {

        CANNON_SCENE.world.removeBody(CANNON_OBJECTS.boxes[index])
        CANNON_OBJECTS.boxes.unsetByIndex(index);
        CANNON_OBJECTS.boxMeshes.unsetByIndex(index);
        scene.children.unsetByIndex(CANNON_OBJECTS.boxSceneIDs[index]);

    };

    ROOT.REMOVE_BALL = function (index) {

        scene.children.unsetByIndex(CANNON_OBJECTS.ballSceneIDs[index]);
        CANNON_OBJECTS.ballSceneIDs.unsetByIndex(index);
        CANNON_SCENE.world.removeBody(CANNON_OBJECTS.balls[index]);
        CANNON_OBJECTS.balls.unsetByIndex(index);
        CANNON_OBJECTS.ballMeshes.unsetByIndex(index);

        console.log('DONE 1')
    };

    ROOT.CREATE_BALL_CANNON = function () {

        var mass = 0.5,
        radius = 20;
        CANNON_OBJECTS.sphereShape = new CANNON.Sphere(radius);
        ROOT.sphereBody = new CANNON.Body({
                mass: mass
            });
        ROOT.ballShape = new CANNON.Sphere(radius);
        ROOT.ballShape.position = PLAYER.character.root.position;
        ROOT.sphereBody.linearDamping = 0.9;

        ROOT.ballBody = new CANNON.Body({
                mass: 1
            });
        ROOT.ballBody.addShape(ROOT.ballShape);
        ROOT.ballGeometry = new THREE.SphereGeometry(ROOT.ballShape.radius, 16, 16);
        ROOT.ballMesh = new THREE.Mesh(ROOT.ballGeometry, RM.LambertMaterial);
        ROOT.ballMesh.add(new THREE.PointLight(0x1ffa56, 100, 500));

        ROOT.shootDirection = new THREE.Vector3();
        ROOT.shootVelo = 600;

        var projector = new THREE.Projector();

        ROOT.getShootDir = function (targetVec) {
            var vector = targetVec;
            targetVec.set(0, 0, 1);
            vector.unproject(camera)
            var ray = new THREE.Ray(ROOT.ballShape.position, vector.sub(ROOT.ballShape.position).normalize());
            targetVec.copy(ray.direction);
        }

    };

    ROOT.FIRE_BABY = function () {

        if (CANNON_OBJECTS.balls.length > 0) {

            ROOT.REMOVE_BALL(0)

            ROOT.CREATE_BALL_CANNON()

        }

        var x = ROOT.ballShape.position.x;
        var y = ROOT.ballShape.position.y;
        var z = ROOT.ballShape.position.z;

        ROOT.ballMesh.castShadow = true;
        ROOT.ballMesh.receiveShadow = true;
        ROOT.world.addBody(ROOT.ballBody);
        scene.add(ROOT.ballMesh);
        CANNON_OBJECTS.balls.push(ROOT.ballBody);
        CANNON_OBJECTS.ballMeshes.push(ROOT.ballMesh);
        CANNON_OBJECTS.ballSceneIDs.push(scene.children.length - 1);

        ROOT.getShootDir(ROOT.shootDirection);
        ROOT.ballBody.velocity.set(ROOT.shootDirection.x * ROOT.shootVelo,
            ROOT.shootDirection.y * ROOT.shootVelo,
            ROOT.shootDirection.z * ROOT.shootVelo);

        ROOT.ballBody.position.set(x, y, z);
        ROOT.ballMesh.position.set(x, y, z);
        // Move the ball outside the player sphere
        x += ROOT.shootDirection.x * (CANNON_OBJECTS.sphereShape.radius * 1.02 + ROOT.ballShape.radius);
        y += ROOT.shootDirection.y * (CANNON_OBJECTS.sphereShape.radius * 1.02 + ROOT.ballShape.radius);
        z += ROOT.shootDirection.z * (CANNON_OBJECTS.sphereShape.radius * 1.02 + ROOT.ballShape.radius);

    };

}

function WAIT_FOR_LOAD() {

    setTimeout(function () {
        if (typeof CANNON != 'undefined') {
            CANNON_SCENE = new initCannon();
        } else {
            WAIT_FOR_LOAD()
        }

    }, 200);
}

WAIT_FOR_LOAD()

//##############################
function WAIT_FOR_PLAYER() {

    setTimeout(function () {
        if (typeof PLAYER != 'undefined' && typeof CANNON_SCENE != 'undefined') {
            CANNON_SCENE.CREATE_BALL_CANNON();
        } else {
            WAIT_FOR_PLAYER()
        }

    }, 200);

}
WAIT_FOR_PLAYER()
