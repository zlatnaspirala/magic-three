
// Nikola Lukic Free code

var position = {
    x: 0,
    y: 0,
    z: 0
};

var LADY = new IMPORT.COLLADA('woman', 'res/blenderProjects/female/w2.dae', position, false);

LADY.LOADED_OBJECT = function () {

    LADY.mesh.position.set(0, -300, -4000)
    LADY.mesh.scale.set(90, 90, 90)
    LADY.mesh.rotateX(to_rad(-90))

};

var position_ = {
    z: 1000,
    y: 500,
    x: -600
};

text1 = new TEXT3D(position_);
text1.size = 60;
text1.onload = function () {

    text1.SET_TEXT(" visual-js free 3d examples in 2017 ")

};

loadFont(text1);

var position_ = {
    z: -510,
    y: 100,
    x: -100
};

LINE1 = new TEXT3D(position_, true);
LINE1.size = 20;
LINE1.bevelSize = 0.7;
LINE1.text = 'Nikola Lukic portofolio';
loadFont(LINE1)

var position_ = {
    z: -510,
    y: 75,
    x: -100
};
LINE2 = new TEXT3D(position_, true);
LINE2.size = 15;
LINE2.bevelSize = 0.7;
LINE2.text = 'game developer';
loadFont(LINE2)

var position_ = {
    z: -510,
    y: 50,
    x: -100
};
LINE2 = new TEXT3D(position_, true);
LINE2.size = 12;
LINE2.bevelSize = 0.6;
LINE2.text = 'current position : Astermedia.net Serbia Nis';
loadFont(LINE2)

var position_ = {
    z: -510,
    y: 25,
    x: -100
};
LINE3 = new TEXT3D(position_, true);
LINE3.size = 11;
LINE3.bevelSize = 0.6;
LINE3.text = 'skills :  JavaScript  , Swift3 , android , Unity3d , Visual c#/basic-desktop';
loadFont(LINE3)

//OSCILLATOR
CAMERA_MOVE = new OSCILLATOR(100, 15000, 50)
    CAMERA_ROT = new OSCILLATOR(0, 1, 0.000002)
    var osci1 = new OSCILLATOR(0.001, 10, 0.01)
    LINE1.AUTO_UPDATE = function () {
    //camera.position.setX(CAMERA_MOVE.UPDATE())
    //sky.uniforms.mieCoefficient.value =  osci1.UPDATE()

};

setInterval(function () {

    var FIZIKAKOCKA = new CANNON_SCENE.CREATE_BOX_CANNON({
            x: 0,
            y: 530,
            z: -1550
        }, {
            x: 100,
            y: 100,
            z: 100
        });
    FIZIKAKOCKA.LOADED = function () {

        FIZIKAKOCKA.boxMesh.material = new THREE.MeshBasicMaterial({
                color: 0xff0040
            });

    };

}, 500)
