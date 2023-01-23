
function addStar(name, x, y) {

    var starPoints = [];

    starPoints.push(new THREE.Vector2(0 * x, 50 * y));
    starPoints.push(new THREE.Vector2(10 * x, 10 * y));
    starPoints.push(new THREE.Vector2(40 * x, 10 * y));
    starPoints.push(new THREE.Vector2(20 * x, -10 * y));
    starPoints.push(new THREE.Vector2(30 * x, -50 * y));
    starPoints.push(new THREE.Vector2(0 * x, -20 * y));
    starPoints.push(new THREE.Vector2(-30 * x, -50 * y));
    starPoints.push(new THREE.Vector2(-20 * x, -10 * y));
    starPoints.push(new THREE.Vector2(-40 * x, 10 * y));
    starPoints.push(new THREE.Vector2(-10 * x, 10 * y));

    var starShape = new THREE.Shape(starPoints);

    var extrusionSettings = {
        size: 30,
        height: 5,
        curveSegments: 3,
        bevelThickness: 1,
        bevelSize: 2,
        bevelEnabled: false,
        material: 0,
        extrudeMaterial: 1
    };

    var starGeometry = new THREE.ExtrudeGeometry(starShape, extrusionSettings);

    var materialFront = new THREE.MeshBasicMaterial({
            color: 0x0ff0a0
        });
    var materialSide = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });

    //var materialArray = [ materialFront, materialSide ];
    var materialArray = [RM.rock_mats.Chrome2, RM.rock_mats.Chrome];

    var starMaterial = new THREE.MeshFaceMaterial(materialArray);

    /* var star = new THREE.Mesh( starGeometry, starMaterial );
    star.name = name;
    star.position.set(0, 10,-1000);
    star.rotateX(degToRad(90));
    scene.add(star); */

    // add a wireframe to model
    var wireframeTexture = new THREE.MeshBasicMaterial({
            color: 0xff2002,
            wireframe: true,
            transparent: true
        });
    var star = new THREE.Mesh(starGeometry, wireframeTexture);
    star.position.set(0, 30, 1555);
    star.rotateX(degToRad(90));
    star.scale.set(1.1, 1.1, 1.1)
    scene.add(star);

}
