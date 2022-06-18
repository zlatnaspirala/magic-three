
function PANORAMA_BALL(typeOfTextures_, path_, phiLength) {

    var ROOT = this;
    ROOT.typeOfTextures = typeOfTextures_;
    ROOT.material;
    ROOT.RADIUS = 2000;
    ROOT.POLYGON_BY_W = 512;
    ROOT.POLYGON_BY_H = 512;

    if (typeOfTextures_ == 'IMAGE') {

        var geometry = new THREE.SphereGeometry(ROOT.RADIUS, ROOT.POLYGON_BY_W, ROOT.POLYGON_BY_H);
        geometry.scale( - 1, 1, 1);

        ROOT.material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path_)
            });

        ROOT.mesh = new THREE.Mesh(geometry, ROOT.material);
        ROOT.mesh.name = 'PAN';
        scene.add(ROOT.mesh);

    } else if (typeOfTextures_ == 'VIDEO_IMAGE') {

        if (typeof phiLength != 'undefined') {

            var geometry = new THREE.SphereGeometry(ROOT.RADIUS, ROOT.POLYGON_BY_W, ROOT.POLYGON_BY_H, 0, phiLength);

        } else {

            var geometry = new THREE.SphereGeometry(ROOT.RADIUS, ROOT.POLYGON_BY_W, ROOT.POLYGON_BY_H);
        }

        geometry.scale( - 1, 1, 1);

        ROOT.VIDEO_TEXTURE = new VIDEO_TEXTURE(path_);

        ROOT.material = ROOT.VIDEO_TEXTURE.movieMaterial;
        ROOT.material.needsUpdate = true;
        ROOT.mesh = new THREE.Mesh(geometry, ROOT.material);
        ROOT.mesh.name = 'PAN';
        scene.add(ROOT.mesh);

    }

    ROOT.DESTROY = function () {

        scene.remove(ROOT.mesh)

        scene.remove(ROOT.VIDEO_TEXTURE.movieScreen)

        PROGRAM.AUTO_UPDATE.unset(ROOT.VIDEO_TEXTURE)

        try {

            delete ROOT.VIDEO_TEXTURE.movieScreen;
            delete ROOT.VIDEO_TEXTURE;
            delete ROOT.material;
            delete ROOT;

        } catch (e) {
            console.log('error in destroy method of panorama class')
        }

    }

}
