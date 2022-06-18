
function addStars(name, numberOfSpikes, color, x, y, z, rx, ry, rz, s) {

    var ROOT = this;

    ROOT.group = new THREE.Group();
    ROOT.group.position.set(x, y, z);

    ROOT.randomPoints = [];
    for (var i = 0; i < 4; i++) {
        ROOT.randomPoints.push(new THREE.Vector3(i * 50, i * 10, 100));
    }
    ROOT.randomSpline = new THREE.CatmullRomCurve3(ROOT.randomPoints);

    ROOT.extrudeSettings = {
        steps: 200,
        bevelEnabled: false,
        extrudePath: ROOT.randomSpline
    };

    ROOT.pts = [];
    ROOT.numPts = numberOfSpikes;
    for (var i = 0; i < ROOT.numPts * 2; i++) {
        var l = i % 2 == 1 ? 10 : 20;
        var a = i / ROOT.numPts * Math.PI;
        ROOT.pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));
    }

    ROOT.shape = new THREE.Shape(ROOT.pts);
    ROOT.geometry = new THREE.ExtrudeGeometry(ROOT.shape, ROOT.extrudeSettings);
    ROOT.material2 = new THREE.MeshLambertMaterial({
            color: 0xff8000,
            wireframe: false
        });
    ROOT.mesh = new THREE.Mesh(ROOT.geometry, ROOT.material2);

    ROOT.group.add(ROOT.mesh);

    scene.add(ROOT.group);
    window[name + "_Star"] = ROOT.group;
    ROOT.name = name;

    ROOT.DESTROY = function () {

        scene.remove(ROOT.group);
        delete window[ROOT.name + "_Star"];

    };

    ROOT.OSCILLATOR1 = new OSCILLATOR(2, 200, 0.1);
    ROOT.OSCILLATOR2 = new OSCILLATOR(2, 23, 1);
    ROOT.ANIMATE = true;
    ROOT.TEST = new OSCILLATOR(10, 12, 1);

    ROOT.NEW_EXTRUDE = function (pathLength, type__, length_) {

        if (typeof length_ === 'undefined') {
            length_ = 30;
        }

        ROOT.group.children = [];
        scene.remove(ROOT.group);
        ROOT.randomPoints = [];

        if (type__ == 1) {
            for (var i = 0; i < pathLength; i++) {
                ROOT.randomPoints.push(new THREE.Vector3(Math.sin(i * 0.7) * 60, i * length_, 100));
            }
        } else if (type__ == 2) {
            for (var i = 0; i < pathLength; i++) {
                ROOT.randomPoints.push(new THREE.Vector3(i * length_, Math.cos(i * 0.5) * 80, 100));
            }
        } else if (type__ == 3) {
            for (var i = 0; i < pathLength; i++) {
                ROOT.randomPoints.push(new THREE.Vector3(Math.sin(i * 0.7) * 60, 10 * length_, Math.cos(i * 0.5) * 80));
            }
        } else if (type__ == 4) {

            for (var i = 0; i < pathLength; i++) {
                ROOT.randomPoints.push(new THREE.Vector3(ROOT.OSCILLATOR2.UPDATE(), length_ * i, ROOT.OSCILLATOR2.UPDATE()));
            }
        }

        ROOT.randomSpline = new THREE.CatmullRomCurve3(ROOT.randomPoints);

        ROOT.extrudeSettings = {
            steps: 100,
            bevelEnabled: false,
            extrudePath: ROOT.randomSpline
        };

        ROOT.geometry = new THREE.ExtrudeGeometry(ROOT.shape, ROOT.extrudeSettings);
        ROOT.mesh = new THREE.Mesh(ROOT.geometry, ROOT.material2);

        ROOT.group.add(ROOT.mesh);
        scene.add(ROOT.group);

    };

    ROOT.AUTO_UPDATE = function () {

        if (ROOT.ANIMATE == true) {

            //NIK.NEW_EXTRUDE(33, 4 , 5 )
            // ROOT.NEW_EXTRUDE(122 , 4 , 5 )
            //MEMORY LEAK DETECTED

        }

    };

    PROGRAM.AUTO_UPDATE.push(ROOT);

}
