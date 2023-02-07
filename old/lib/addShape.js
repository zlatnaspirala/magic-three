
function addShape(name, shape, color, x, y, z, rx, ry, rz, s) {

    var ROOT = this;

    ROOT.group = new THREE.Group();

    var geometry = new THREE.ShapeGeometry(shape);
    var material = new THREE.MeshBasicMaterial({
            color: color,
            overdraw: 0.5
        });

    ROOT.mesh = new THREE.Mesh(geometry, material);
    ROOT.mesh.position.set(x, y, z);
    ROOT.mesh.rotation.set(rx, ry, rz);
    ROOT.mesh.scale.set(s, s, s);
    ROOT.group.add(ROOT.mesh);

    // line

    var geometry = shape.createPointsGeometry();
    var material = new THREE.LineBasicMaterial({
            linewidth: 10,
            color: 0x333333,
            transparent: true
        });

    var line = new THREE.Line(geometry, material);
    line.position.set(x, y, z);
    line.rotation.set(rx, ry, rz);
    line.scale.set(s, s, s);
    ROOT.group.add(line);

    scene.add(ROOT.group);
    window[name] = ROOT.group;
    ROOT.name = name;

    ROOT.DESTROY = function () {

        scene.remove(ROOT.group);
        delete window[ROOT.name];

    };

}
