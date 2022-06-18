

function CUBE_MIROR() {

    var ROOT = this;

    var cubeGeom = new THREE.CubeGeometry(100, 300, 100, 1, 1, 1);
    ROOT.mirrorCubeCamera = new THREE.CubeCamera(0.1, 12000, 256);
    // mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
    scene.add(ROOT.mirrorCubeCamera);
    var mirrorCubeMaterial = new THREE.MeshBasicMaterial({
            envMap: ROOT.mirrorCubeCamera.renderTarget
        });
    ROOT.mirrorCube = new THREE.Mesh(cubeGeom, mirrorCubeMaterial);
    ROOT.mirrorCube.position.set(0, 0, 0);
    ROOT.mirrorCubeCamera.position = ROOT.mirrorCube.position;
    scene.add(ROOT.mirrorCube);

    ROOT.AUTO_UPDATE = function () {

        ROOT.mirrorCube.visible = false;
        ROOT.mirrorCubeCamera.updateCubeMap(renderer, scene);
        ROOT.mirrorCube.visible = true;

    };
    PROGRAM.AUTO_UPDATE.push(ROOT)

}

function BALL_MIRROR() {

    var ROOT = this;

    var sphereGeom = new THREE.SphereGeometry(50, 32, 16); // radius, segmentsWidth, segmentsHeight
    ROOT.mirrorSphereCamera = new THREE.CubeCamera(0.1, 5000, 512);
    // mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
    scene.add(ROOT.mirrorSphereCamera);
    var mirrorSphereMaterial = new THREE.MeshBasicMaterial({
            envMap: ROOT.mirrorSphereCamera.renderTarget
        });
    ROOT.mirrorSphere = new THREE.Mesh(sphereGeom, mirrorSphereMaterial);
    ROOT.mirrorSphere.position.set(75, 50, 0);
    ROOT.mirrorSphereCamera.position = ROOT.mirrorSphere.position;
    scene.add(ROOT.mirrorSphere);

}
