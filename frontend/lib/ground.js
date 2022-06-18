
function GROUND(imageIndex) {

    if (typeof imageIndex != 'undefined') {
        if (typeof imageIndex == 'number') {

            var gt = new THREE.TextureLoader().load("res/textures/ground/ground" + imageIndex + ".jpg");
            var gg = new THREE.PlaneBufferGeometry(8000, 8000);
            var gm = new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    map: gt
                });

            var ground = new THREE.Mesh(gg, gm);
            ground.rotation.x =  - Math.PI / 2;
            ground.material.map.repeat.set(64, 64);
            ground.material.map.wrapS = THREE.RepeatWrapping;
            ground.material.map.wrapT = THREE.RepeatWrapping;
            ground.receiveShadow = true;
            ground.name = "GROUND";
            scene.add(ground);

        } else {
            SYS.DEBUG.LOG('GROUND function arrg ==>> must be a number :: ' + imageIndex)
        }
    }

}
