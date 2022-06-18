
var position_ = {
    z: -390,
    y: 550,
    x: -300
};
text1 = new TEXT3D(position_);
text1.size = 25;
text1.onload = function () {

    text1.SET_TEXT("zlatnaspirala@gmail.com")

};
loadFont(text1);

var position_ = {
    z: -390,
    y: 500,
    x: -280
};
text2 = new TEXT3D(position_);
text2.size = 25;
text2.onload = function () {

    text2.SET_TEXT("Tshirts 3d desing online")

};
loadFont(text2);

/////////////////////////////////////


var position_ = {
    z: 1100,
    y: 550,
    x: 100
};
var position_ = {
    z: -300,
    y: 550,
    x: 100
};

var sphere = new THREE.SphereGeometry(0.5, 16, 8);

light1 = new THREE.PointLight(0xff0040, 22, 90);
light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0xff0040
        })));

light2 = new THREE.PointLight(0x0040ff, 22, 90);
light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0x0040ff
        })));

light3 = new THREE.PointLight(0x80ff80, 22, 90);
light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0x80ff80
        })));

light4 = new THREE.PointLight(0xffaa00, 22, 90);
light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0xffaa00
        })));

light5 = new THREE.PointLight(0xff0040, 22, 90);
light5.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0xff0040
        })));

light6 = new THREE.PointLight(0x0040ff, 22, 90);
light6.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0x0040ff
        })));

light7 = new THREE.PointLight(0x80ff80, 22, 90);
light7.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0x80ff80
        })));

light8 = new THREE.PointLight(0xffaa00, 22, 90);
light8.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
            color: 0xffaa00
        })));

//scene.add( light4 );
light1.children[0].scale.set(0.02, 0.02, 0.02)
light2.children[0].scale.set(0.02, 0.02, 0.02)
light3.children[0].scale.set(0.02, 0.02, 0.02)
light4.children[0].scale.set(0.02, 0.02, 0.02)

light5.children[0].scale.set(0.02, 0.02, 0.02)
light6.children[0].scale.set(0.02, 0.02, 0.02)
light7.children[0].scale.set(0.02, 0.02, 0.02)
light8.children[0].scale.set(0.02, 0.02, 0.02)

var earthPivot = new THREE.Object3D();
var earthPivotI = new THREE.Object3D();

var ROTATE_POINTLIGHT = {
    SCALE_FACTORX: 2,
    SCALE_FACTORY: 11,
    SCALE_FACTORZ: -7,
    AUTO_UPDATE: function () {

        earthPivot.rotation.y += 0.01;
        earthPivotI.rotation.y -= 0.01;

        if (typeof FEMALE != 'undefined' && FEMALE.ROTATING == true) {

            FEMALE.rotateY(-0.009);

        }

        sphere.rotation.y += 0.01;
        //light4.position.y = VARVAR4.UPDATE();
    }

};

earthPivot.add(light1)
earthPivot.add(light2)
earthPivot.add(light3)
earthPivot.add(light4)

earthPivotI.add(light5)
earthPivotI.add(light6)
earthPivotI.add(light7)
earthPivotI.add(light8)

PROGRAM.AUTO_UPDATE.push(ROTATE_POINTLIGHT);

var VARVAR1 = new OSCILLATOR(0.2, 1.8, 0.01);
var VARVAR2 = new OSCILLATOR(0.2, 1.8, 0.009);
var VARVAR3 = new OSCILLATOR(0.2, 1.8, 0.008);
var VARVAR4 = new OSCILLATOR(0.2, 1.8, 0.007);

light4.position.x = 0.6;
light3.position.x = 0.6;
light2.position.x = -0.6;
light1.position.x = -0.6;

light5.position.x = -0.6;
light6.position.x = -0.6;
light7.position.x = 0.6;
light8.position.x = 0.6;

light4.position.y = 1;
light3.position.y = 1.2;
light2.position.y = 1.4;
light1.position.y = 1.6;

light5.position.y = 1;
light6.position.y = 1.2;
light7.position.y = 1.4;
light8.position.y = 1.6;

IMPORT.OBJ_MTL_ON_LOAD = function () {
    FEMALE.ROTATING = false;
    FEMALE.scale.set(175, 175, 175);
    FEMALE.position.setY(33)
    FEMALE.add(earthPivot)
    FEMALE.add(earthPivotI)

};

IMPORT.OBJ_MTL("FEMALE", "tshirts.obj", "res/tshirts/", "tshirts.mtl")

var textureLoader = new THREE.TextureLoader();

var texture1 = textureLoader.load("res/textures/reflection/nx.jpg");
var materialROTATEBTN = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: texture1
    });

sphere = new THREE.Mesh(new THREE.SphereGeometry(20, 30, 15), materialROTATEBTN);
scene.add(sphere);
sphere.name = "ROTATE_OBJ";
sphere.scale.set(1.1, 1.1, 1.1)
sphere.position.setX(-120)
sphere.position.setY(300)

var RAY_ = new Raycaster();

RAY_.RECALL = function (o) {

    if (o.name == "ROTATE_OBJ") {

        console.log(">>>>>>>>>>>>>>>" + o.name)
        if (FEMALE.ROTATING == true) {

            FEMALE.ROTATING = false;
            FEMALE.rotation.y = 0;
            mouse.x = 0;
            mouse.y = 0;
        } else {

            FEMALE.ROTATING = true;
            mouse.x = 0;
            mouse.y = 0;

        }

    }

};
