
var INIT_SCENE_ENABLED = true;

/*
 * @method CAMERA_INIT Create three.js camera object
 * @param position Start up position
 */
function CAMERA_INIT(position) {

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1000000);
    camera.position.set(position.x, position.y, position.z);
    camera.setLens(20);
    scene.add(camera);

}

