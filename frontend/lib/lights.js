
function SPOT(color, position, intensity, radius, helper) {

    var ROOT = this;
    ROOT.group = new THREE.Group();

    if (typeof color != 'undefined' && typeof radius != 'undefined') {
        ROOT.spotlight = new THREE.SpotLight(color);
        ROOT.spotlight.distance = radius;
    } else {
        ROOT.spotlight = new THREE.SpotLight("0xffffff");
    }

    if (typeof position != 'undefined') {
        ROOT.group.position.set(position.x, position.y, position.z);
    } else {
        ROOT.group.position.set(0, 0, 0);
    }

    //ROOT.spotlight.shadowCameraVisible = true;
    var NN = new THREE.CameraHelper(ROOT.spotlight.shadow.camera);

    ROOT.ANIMATE = false;
    ROOT.ANIMATE_BY_X = false;
    ROOT.ANIMATE_BY_Y = false;
    ROOT.ANIMATE_BY_Z = false;

    ROOT.ANIMATE_BY_ZX = false;
    ROOT.ANIMATE_BY_ZY = false;
    ROOT.ANIMATE_BY_XY = false;

    if (typeof helper != 'undefined') {
        var sphere = new THREE.SphereGeometry(2, 16, 8);
        ROOT.group.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
                    color: 0xff0040
                })));
    }

    ROOT.PILOT = new THREE.Group();
    ROOT.PILOT.add(ROOT.spotlight)
    ROOT.PILOT.position.x = 100;
    ROOT.group.add(ROOT.PILOT);

    if (typeof intensity != 'undefined') {

        ROOT.spotlight.intensity = intensity;

    } else {

        ROOT.spotlight.intensity = 21;

    }

    ROOT.spotlight.castShadow = true;

    scene.add(ROOT.group);

    ROOT.OSCILLATOR1 = new OSCILLATOR(0.01, 0.2, 0.001);

    ROOT.AUTO_UPDATE = function () {

        if (ROOT.ANIMATE == true) {

            if (ROOT.ANIMATE_BY_X == true) {
                ROOT.group.rotateY(ROOT.OSCILLATOR1.UPDATE());

            } else if (ROOT.ANIMATE_BY_Y == true) {
                ROOT.group.position.setY(ROOT.OSCILLATOR1.UPDATE());
            } else if (ROOT.ANIMATE_BY_Z == true) {
                ROOT.group.position.setZ(ROOT.OSCILLATOR1.UPDATE());
            } else if (ROOT.ANIMATE_BY_ZX == true) {
                ROOT.group.position.setZ(ROOT.OSCILLATOR1.UPDATE());
                ROOT.group.position.setX(ROOT.OSCILLATOR1.UPDATE());
            } else if (ROOT.ANIMATE_BY_ZY == true) {
                ROOT.group.position.setY(ROOT.OSCILLATOR1.UPDATE());
                ROOT.group.position.setZ(ROOT.OSCILLATOR1.UPDATE());
            } else if (ROOT.ANIMATE_BY_XY == true) {
                ROOT.group.position.setY(ROOT.OSCILLATOR1.UPDATE());
                ROOT.group.position.setX(ROOT.OSCILLATOR1.UPDATE());
            }

        }

    };

    PROGRAM.AUTO_UPDATE.push(ROOT);

}

function SPOT_SHADOW(color_, pointIntensity, helper) {

    if (typeof color_ == 'undefined') {
        color_ = 0x0000ff;
    }
    if (typeof pointIntensity == 'undefined') {
        color_ = 5;
    }

    var ROOT = this;

    ROOT.PILOT = new THREE.Object3D(0, 0, 0);
    ROOT.sunLight = new THREE.SpotLight(color_, pointIntensity, 2000, Math.PI, 1);
    ROOT.sunLight.position.set(3000, 1000, 3000);
    ROOT.sunLight.rotation.set(0, 100, 0);
    ROOT.sunLight.target = ROOT.PILOT;
    ROOT.sunLight.castShadow = true;
    ROOT.sunLight.shadow.bias = 1;
    ROOT.sunLight.shadow.camera.far = 5000;
    ROOT.sunLight.shadow.camera.near = 800;
    ROOT.sunLight.shadow.camera.fov = 70;

    // SHADOW CAMERA HELPER
    if (typeof helper != 'undefined') {
        if (typeof helper == true) {
            var shadowCameraHelper = new THREE.CameraHelper(ROOT.sunLight.shadow.camera);
            shadowCameraHelper.visible = true;
            ROOT.sunLight.add(shadowCameraHelper);
        }
    }

    scene.add(ROOT.sunLight);
    scene.add(ROOT.PILOT);
}

var SPOT_LIGHT_TARGET = function (color_) {

    var ROOT = this;
    ROOT.LOADED = function () {
        console.log('spot light added')
    };

    renderer.shadowMap.enabled = true;

    ROOT.spotlight = new THREE.SpotLight(color_);

    //ROOT.spotlight.shadowDarkness = 0.95;
    ROOT.spotlight.intensity = 5;
    ROOT.spotlight.castShadow = true;
    scene.add(ROOT.spotlight);

    ROOT.lightTarget = new THREE.Object3D();
    ROOT.lightTarget.position.set(1000, 10, 1000);
    console.log(scene.children.length + ":::access target spot light scene id object::")
    scene.add(ROOT.lightTarget);

    ROOT.spotlight.target = ROOT.lightTarget;

    // ROOT.LOADED();

};
