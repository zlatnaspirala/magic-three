// Nikola Lukic Free code

var LADY = new IMPORT.JS_JSON_ANIMATED('woman', 'res/blenderProjects/female/female_morf_blend.json', position, false)

    var LADY = new IMPORT.COLLADA('woman', 'res/collada/avatar2.dae', position, false)
    var position = {
    x: 0,
    y: 0,
    z: 0
};

LADY.LOADED_OBJECT = function () {

    LADY.mesh.position.set(0, -500, 0)
    LADY.mesh.scale.set(151, 151, 151)

};

var sphere = new THREE.SphereGeometry(4, 32, 32);

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
