
function GRID_INIT() {

    if (PROGRAM.GRID == true) {

        var helper = new THREE.GridHelper(5000, 5000);
        helper.color1.setHex(0xffffff);
        helper.color2.setHex(0x00ffff);
        helper.name = "GRID";
        scene.add(helper);

    }

}
