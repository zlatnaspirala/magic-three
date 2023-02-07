
function CUBE(mat, name, dim, forhud) {

    var ROOT = this;
    ROOT.LOADED = function () {};

    if (dim) {

        var object = new THREE.Mesh(new THREE.BoxGeometry(dim.x, dim.y, dim.z, 4, 4, 4), mat);
    } else {

        var object = new THREE.Mesh(new THREE.BoxGeometry(400, 400, 400, 4, 4, 4), mat);
    }

    object.position.set(0, 0, 0);
    object.name = name;
    ROOT.OBJECT = object;

    if (typeof forhud != 'undefined') {

        return object;
    } else {

        scene.add(object);

    }

}

function RING(mat) {

    var ROOT = this;
    object = new THREE.Mesh(new THREE.RingGeometry(10, 100, 20, 5, 0, Math.PI * 2), mat);
    object.position.set(0, 0, 0);
    ROOT.OBJECT = object;
    scene.add(object);

}

function CILINDER(mat) {

    var ROOT = this;
    object = new THREE.Mesh(new THREE.CylinderGeometry(1, 100, 200, 12, 0), mat);
    object.position.set(0, 0, 0);
    ROOT.OBJECT = object;
    scene.add(object);

}

function CIRCLE(mat) {
    var ROOT = this;
    object = new THREE.Mesh(new THREE.CircleGeometry(50, 20, 0, Math.PI * 2), mat);
    object.position.set(0, 0, 0);
    ROOT.OBJECT = object;
    scene.add(object);

}

function TETRA(mat) {
    var ROOT = this;
    object = new THREE.Mesh(new THREE.TetrahedronGeometry(75, 0), mat);
    object.position.set(0, 0, 0);
    scene.add(object);
    ROOT.OBJECT = object;
}
