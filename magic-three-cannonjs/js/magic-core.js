
export class MagicThree {

  // Physics staff
  sphereShape;
  sphereBody;
  world;
  physicsMaterial;

  walls = [];
  balls = [];
  ballMeshes = [];
  boxes = [];
  boxMeshes = [];

  // threejs staff
  camera;
  scene;
  renderer;

  geometry;
  material;
  mesh;
  controls;
  time = Date.now();

  dt = 1 / 60;
  pointerlockchange;

  ballShape = new CANNON.Sphere(0.2);
  ballGeometry = new THREE.SphereGeometry(this.ballShape.radius, 32, 32);
  shootDirection = new THREE.Vector3();
  shootVelo = 15;
  projector = new THREE.Projector();

  blocker = document.getElementById('blocker');
  instructions = document.getElementById('instructions');
  havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

  constructor() {

    if(this.havePointerLock) {
      var element = document.body;
      this.pointerlockchange = (event) => {
        if(document.pointerLockElement === element ||
          document.mozPointerLockElement === element ||
          document.webkitPointerLockElement === element) {

          this.controls.enabled = true;
          this.blocker.style.display = 'none';
        } else {
          this.controls.enabled = false;
          this.blocker.style.display = '-webkit-box';
          this.blocker.style.display = '-moz-box';
          this.blocker.style.display = 'box';
          this.instructions.style.display = '';
        }
      }

      this.pointerlockerror = function(event) {
        this.instructions.style.display = '';
      }

      // Hook pointer lock state change events
      document.addEventListener('pointerlockchange', this.pointerlockchange, false);
      document.addEventListener('mozpointerlockchange', this.pointerlockchange, false);
      document.addEventListener('webkitpointerlockchange', this.pointerlockchange, false);

      document.addEventListener('pointerlockerror', this.pointerlockerror, false);
      document.addEventListener('mozpointerlockerror', this.pointerlockerror, false);
      document.addEventListener('webkitpointerlockerror', this.pointerlockerror, false);

      this.instructions.addEventListener('click', (event) => {
        this.instructions.style.display = 'none';
        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        if(/Firefox/i.test(navigator.userAgent)) {
          var fullscreenchange = function(event) {
            if(document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
              document.removeEventListener('fullscreenchange', fullscreenchange);
              document.removeEventListener('mozfullscreenchange', fullscreenchange);
              element.requestPointerLock();
            }
          }

          document.addEventListener('fullscreenchange', fullscreenchange, false);
          document.addEventListener('mozfullscreenchange', fullscreenchange, false);
          element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
          element.requestFullscreen();
        } else {
          element.requestPointerLock();
        }
      }, false);

    } else {
      instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }

    this.initCannon();
    this.init();
    this.animate();

    this.addAppGameListeners();
  }

  initCannon() {
    // Setup our world
    this.world = new CANNON.World();
    this.world.quatNormalizeSkip = 0;
    this.world.quatNormalizeFast = false;

    var solver = new CANNON.GSSolver();

    this.world.defaultContactMaterial.contactEquationStiffness = 1e9;
    this.world.defaultContactMaterial.contactEquationRelaxation = 4;

    solver.iterations = 7;
    solver.tolerance = 0.1;
    var split = true;
    if(split)
      this.world.solver = new CANNON.SplitSolver(solver);
    else
      this.world.solver = solver;

    this.world.gravity.set(0, -20, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();

    // Create a slippery material (friction coefficient = 0.0)
    this.physicsMaterial = new CANNON.Material("slipperyMaterial");
    var physicsContactMaterial = new CANNON.ContactMaterial(this.physicsMaterial,
      this.physicsMaterial,
      0.0, // friction coefficient
      0.3  // restitution
    );
    // We must add the contact materials to the world
    this.world.addContactMaterial(physicsContactMaterial);

    // Create a sphere
    var mass = 5, radius = 1.3;
    this.sphereShape = new CANNON.Sphere(radius);
    this.sphereBody = new CANNON.Body({mass: mass});
    this.sphereBody.addShape(this.sphereShape);
    this.sphereBody.position.set(0, 5, 0);
    this.sphereBody.linearDamping = 0.9;
    this.world.addBody(this.sphereBody);

    // Create a plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({mass: 0});
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this.world.addBody(groundBody);
  }

  init() {

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000000, 0, 500);
    var ambient = new THREE.AmbientLight(0x111111);
    this.scene.add(ambient);

    let light = new THREE.SpotLight(0xffffff);
    light.position.set(10, 30, 20);
    light.target.position.set(0, 0, 0);
    if(true) {
      light.castShadow = true;
      light.shadowCameraNear = 20;
      light.shadowCameraFar = 50;//camera.far;
      light.shadowCameraFov = 40;
      light.shadowMapBias = 0.1;
      light.shadowMapDarkness = 0.7;
      light.shadowMapWidth = 2 * 512;
      light.shadowMapHeight = 2 * 512;
      //light.shadowCameraVisible = true;
    }
    this.scene.add(light);

    this.controls = new PointerLockControls(this.camera, this.sphereBody);
    this.scene.add(this.controls.getObject());

    // floor
    this.geometry = new THREE.PlaneGeometry(300, 300, 50, 50);
    this.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI / 2));

    this.material = new THREE.MeshLambertMaterial({color: 0xdddddd});

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(this.scene.fog.color, 1);

    document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onWindowResize, false);

    // // Add boxes
    // var halfExtents = new CANNON.Vec3(1, 1, 1);
    // var boxShape = new CANNON.Box(halfExtents);
    // var boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);
    // for(var i = 0;i < 7;i++) {
    //   var x = (Math.random() - 0.5) * 20;
    //   var y = 1 + (Math.random() - 0.5) * 1;
    //   var z = (Math.random() - 0.5) * 20;
    //   var boxBody = new CANNON.Body({mass: 5});
    //   boxBody.addShape(boxShape);
    //   var boxMesh = new THREE.Mesh(boxGeometry, this.material);
    //   this.world.addBody(boxBody);
    //   this.scene.add(boxMesh);
    //   boxBody.position.set(x, y, z);
    //   boxMesh.position.set(x, y, z);
    //   boxMesh.castShadow = true;
    //   boxMesh.receiveShadow = true;
    //   this.boxes.push(boxBody);
    //   this.boxMeshes.push(boxMesh);
    // }

  }

  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    if(this.controls.enabled) {
      this.world.step(this.dt);
      // Update ball positions
      for(var i = 0;i < this.balls.length;i++) {
        this.ballMeshes[i].position.copy(this.balls[i].position);
        this.ballMeshes[i].quaternion.copy(this.balls[i].quaternion);
      }
      // Update box positions
      for(var i = 0;i < this.boxes.length;i++) {
        this.boxMeshes[i].position.copy(this.boxes[i].position);
        this.boxMeshes[i].quaternion.copy(this.boxes[i].quaternion);
      }
    }
    this.controls.update(Date.now() - this.time);
    this.renderer.render(this.scene, this.camera);
    this.time = Date.now();
  }

  getShootDir(targetVec) {
    var vector = targetVec;
    targetVec.set(0, 0, 1);
    this.projector.unprojectVector(vector, this.camera);
    var ray = new THREE.Ray(this.sphereBody.position, vector.sub(this.sphereBody.position).normalize());
    targetVec.copy(ray.direction);
  }

  addAppGameListeners() {
    window.addEventListener("click", (e) => {
      if(this.controls.enabled == true) {
        var x = this.sphereBody.position.x;
        var y = this.sphereBody.position.y;
        var z = this.sphereBody.position.z;
        var ballBody = new CANNON.Body({mass: 1});
        ballBody.addShape(this.ballShape);
        var ballMesh = new THREE.Mesh(this.ballGeometry, this.material);
        this.world.addBody(ballBody);
        this.scene.add(ballMesh);
        ballMesh.castShadow = true;
        ballMesh.receiveShadow = true;
        this.balls.push(ballBody);
        this.ballMeshes.push(ballMesh);
        this.getShootDir(this.shootDirection);
        ballBody.velocity.set(this.shootDirection.x * this.shootVelo,
          this.shootDirection.y * this.shootVelo,
          this.shootDirection.z * this.shootVelo);

        // Move the ball outside the player sphere
        x += this.shootDirection.x * (this.sphereShape.radius * 1.02 + this.ballShape.radius);
        y += this.shootDirection.y * (this.sphereShape.radius * 1.02 + this.ballShape.radius);
        z += this.shootDirection.z * (this.sphereShape.radius * 1.02 + this.ballShape.radius);
        ballBody.position.set(x, y, z);
        ballMesh.position.set(x, y, z);
      }
    });
  }

}
