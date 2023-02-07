
/*
 *  Part of visual js 3d three.js implementation
 * PLAYERS CONFIG
 */
var MD2_config = {

    baseUrl: "res/md2/ratamahatta/",
    body: "ratamahatta2.md2",
    skins: ["ratamahatta.png", "ctf_b.png", "ctf_r.png", "dead.png", "gearwhore.png"],
    weapons: [["weapon.md2", "weapon.png"],
        ["w_bfg.md2", "w_bfg.png"],
        ["w_blaster.md2", "w_blaster.png"],
        ["w_chaingun.md2", "w_chaingun.png"],
        ["w_glauncher.md2", "w_glauncher.png"],
        ["w_hyperblaster.md2", "w_hyperblaster.png"],
        ["w_machinegun.md2", "w_machinegun.png"],
        ["w_railgun.md2", "w_railgun.png"],
        ["w_rlauncher.md2", "w_rlauncher.png"],
        ["w_shotgun.md2", "w_shotgun.png"],
        ["w_sshotgun.md2", "w_sshotgun.png"]
    ],
    animations: {
        move: "run",
        idle: "stand",
        jump: "jump",
        attack: "attack",
        crouchMove: "cwalk",
        crouchIdle: "cstand",
        crouchAttach: "crattack"
    },
    walkSpeed: 350,
    crouchSpeed: 175
};

var configOgro = {

    baseUrl: "res/md2/ogro/",
    body: "ogro.md2",
    skins: ["grok.jpg", "ogrobase.png", "arboshak.png", "ctf_r.png", "ctf_b.png", "darkam.png", "freedom.png",
        "gib.png", "gordogh.png", "igdosh.png", "khorne.png", "nabogro.png",
        "sharokh.png"],
    weapons: [["weapon.md2", "weapon.jpg"]],
    animations: {
        move: "run",
        idle: "stand",
        jump: "jump",
        attack: "attack",
        crouchMove: "cwalk",
        crouchIdle: "cstand",
        crouchAttach: "crattack"
    },
    walkSpeed: 350,
    crouchSpeed: 175

};




/*
 * @Class MD2
 * @param config_
 * @param gui_
 * @param isPlayer
 * @param around
 */
function MD2(config_, gui_, isPlayer, around) {

    var ROOT = this;

    ROOT.USER_NAME = 'noname';
    ROOT.USER_NAME_EDIT = true;
    ROOT.CAPTURE_CHAR = '';
    ROOT.LAST_CAPTURE_CHAR = '';
    ROOT.ACTION_ON_KEY_DOWN = function () {};

    if (isPlayer == true) {

        ROOT.controls = {

            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false,
            canFire: true,

        };

        ROOT.earthPivot = new THREE.Object3D();

        ROOT.cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
        //ROOT.cameraControls.enableRotate = false;
        ROOT.cameraControls.enablePan = false;

        ROOT.cameraControls.minPolarAngle = 0; // radians
        ROOT.cameraControls.maxPolarAngle = Math.PI / 2; // radians

        ROOT.cameraControls.minAzimuthAngle = degToRad(180);
        ROOT.cameraControls.maxAzimuthAngle = -degToRad(160);

        ROOT.cameraControls.minDistance = 250;
        ROOT.cameraControls.maxDistance = 5000;

        ROOT.character = new THREE.MD2CharacterComplex();
        ROOT.character.scale = 3;
        ROOT.character.controls = ROOT.controls;

        ROOT.character.onLoadComplete = function () {

            ROOT.character.enableShadows(true);
            ROOT.character.setWeapon(0);
            ROOT.character.setSkin(1);

            // ORI maybe need for type of player movement
            //ROOT.gyro = new THREE.Gyroscope();
            //ROOT.gyro.add( camera );
            //ROOT.character.root.add( ROOT.gyro );
        };

        ROOT.character.loadParts(config_);

        ROOT.character.root.name = "PLAYER";
        //ROOT.cameraControls.target = ROOT.character.root.position;
        THREE.SceneUtils.attach(camera, scene, ROOT.character.root);

        ROOT.onKeyDown = function (event) {

            event.preventDefault();
            event.stopPropagation();

            switch (event.keyCode) {

            case 38: /*up*/
            case 87: /*W*/ ROOT.controls.moveForward = true;
                break;

            case 40: /*down*/
            case 83: /*S*/ ROOT.controls.moveBackward = true;
                break;

            case 37: /*left*/
            case 65: /*A*/ ROOT.controls.moveLeft = true;
                break;

            case 39: /*right*/
            case 68: /*D*/ ROOT.controls.moveRight = true;
                break;

            case 67: /*C*/ ROOT.controls.crouch = true;
                break;
            case 32: /*space*/ ROOT.controls.jump = true;
                break;
            case 17: /*ctrl*/ ROOT.controls.attack = true;
                break;

            }

            // SPECIAL FOR TEXTBOX
            SYS.DEBUG.LOG("KEYBOARD-->> Show users types : " + event.keyCode);
            var keynum;
            if (window.event) {
                keynum = event.keyCode;
            } else {
                if (event.which) {
                    keynum = event.which;
                }
            }
            //console.log(String.fromCharCode(keynum));
            if (event.keyCode == 8) {
                SYS.DEBUG.LOG("textbox delete last char!");
                ROOT.CAPTURE_CHAR = remove_last(ROOT.CAPTURE_CHAR);

            } else if (event.keyCode == 13) {

                ROOT.LAST_CAPTURE_CHAR = 'ENTER';

            } else {
                ROOT.CAPTURE_CHAR += (String.fromCharCode(keynum));
                ROOT.LAST_CAPTURE_CHAR = (String.fromCharCode(keynum));
            }
			
            if (ROOT.USER_NAME_EDIT == true) {

                ROOT.ACTION_ON_KEY_DOWN();

            }

        }

        ROOT.onKeyUp = function (event) {

            event.stopPropagation();

            switch (event.keyCode) {

            case 38: /*up*/
            case 87: /*W*/ ROOT.controls.moveForward = false;
                break;

            case 40: /*down*/
            case 83: /*S*/ ROOT.controls.moveBackward = false;
                break;

            case 37: /*left*/
            case 65: /*A*/ ROOT.controls.moveLeft = false;
                break;

            case 39: /*right*/
            case 68: /*D*/ ROOT.controls.moveRight = false;
                break;

            case 67: /*C*/ ROOT.controls.crouch = false;
                break;
            case 32: /*space*/ ROOT.controls.jump = false;
                break;
            case 17: /*ctrl*/ ROOT.controls.attack = false;
                break;

            }

        }

        document.addEventListener('keydown', ROOT.onKeyDown, false);
        document.addEventListener('keyup', ROOT.onKeyUp, false);

    } else {

        //##############################################
        // NO CONTROL  NO PLAYER
        //##############################################
        ROOT.character = new THREE.MD2Character();
        ROOT.character.scale = 3;

        ROOT.character.onLoadComplete = function () {

            if (typeof gui_ !== 'undefined' && gui_ == true) {
                setupSkinsGUI(ROOT);
                setupWeaponsGUI(ROOT);
                setupGUIAnimations(ROOT);
            }

            ROOT.character.setAnimation(ROOT.character.meshBody.geometry.animations[0].name)

        };

        ROOT.character.loadParts(config_);
    }

    if (gui_ == true) {

        gui = new dat.GUI();

        ROOT.playbackConfig = {

            speed: 1.0,
            wireframe: false

        };
        gui.add(ROOT.playbackConfig, 'speed', 0, 2).onChange(function () {

            ROOT.character.setPlaybackRate(ROOT.playbackConfig.speed);

        });

        gui.add(ROOT.playbackConfig, 'wireframe', false).onChange(function () {

            ROOT.character.setWireframe(ROOT.playbackConfig.wireframe);

        });

    }

    PROGRAM.AUTO_UPDATE.push(ROOT);

    if (typeof around !== 'undefined') {

        ROOT.character.root.add(ROOT.earthPivot);
        //ROOT.particleSystem =   new PARTICLE(true);
        //ROOT.earthPivot.add( ROOT.particleSystem.particleSystem );
        //ROOT.character.root.add(ROOT.particleSystem.particleSystem );

        // center light dont move
        ROOT.spotlight = new THREE.PointLight(0xff0607, 3, 100);
        var sphere = new THREE.SphereGeometry(2, 16, 8);

        ROOT.INDIKATOR1 = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
                    color: 0xff0040
                }))
            ROOT.spotlight.add(ROOT.INDIKATOR1);

        ROOT.INDIKATOR2 = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
                    color: 0xff0040
                }))
            ROOT.spotlight.add(ROOT.INDIKATOR2);

        ROOT.spotlightPlayer = new THREE.PointLight(0x00ff0f, 7, 300);
        //ROOT.spotlightPlayer.position.setZ(-100);
        ROOT.spotlightPlayer.position.setY(200);

        // name


        var position_ = {
            z: 0,
            y: 120,
            x: -50
        };
        ROOT.PLAYER_NAME = new TEXT3D(position_, "PLAYER_NAME");
        ROOT.PLAYER_NAME.size = 20;
        ROOT.PLAYER_NAME.onload = function () {
            ROOT.PLAYER_NAME.SET_TEXT(ROOT.USER_NAME)

        };
        loadFont(ROOT.PLAYER_NAME);

        ROOT.earthPivot.add(ROOT.spotlightPlayer);
        ROOT.earthPivot.add(ROOT.spotlight);

        ROOT.COLLISION_1 = new POINT_COLLISION(ROOT, 1);
        ROOT.COLLISION_2 = new POINT_COLLISION(ROOT, 2);

        scene.add(ROOT.character.root);

    } else {

        scene.add(ROOT.character.root);

    }

    ROOT.AUTO_UPDATE = function () {

        var delta = clock.getDelta();
        ROOT.cameraControls.update(delta);
        ROOT.character.update(delta);
        // ROOT.earthPivot.rotation.y += 0.1;

    };

    ROOT.DESTROY = function () {};

    
} 

function setupWeaponsGUI(ROOT) {

    var folder = gui.addFolder("Weapons");

    var generateCallback = function (index) {

        return function () {
            character.setWeapon(index);
        };

    };

    var guiItems = [];

    for (var i = 0; i < ROOT.character.weapons.length; i++) {

        var name = ROOT.character.weapons[i].name;

        ROOT.playbackConfig[name] = generateCallback(i);
        guiItems[i] = folder.add(ROOT.playbackConfig, name).name(labelize(name));

    }

}

function setupSkinsGUI(ROOT) {

    var folder = gui.addFolder("Skins");

    var generateCallback = function (index) {

        return function () {
            ROOT.character.setSkin(index);
        };

    };

    var guiItems = [];

    for (var i = 0; i < ROOT.character.skinsBody.length; i++) {

        var name = ROOT.character.skinsBody[i].name;

        ROOT.playbackConfig[name] = generateCallback(i);
        guiItems[i] = folder.add(ROOT.playbackConfig, name).name(labelize(name));

    }

}


function setupGUIAnimations(ROOT) {

    var folder = gui.addFolder("Animations");

    var generateCallback = function (animationClip) {

        return function () {
            ROOT.character.setAnimation(animationClip.name);
        };

    };

    var i = 0,
    guiItems = [];
    var animations = ROOT.character.meshBody.geometry.animations;

    for (var i = 0; i < animations.length; i++) {

        var clip = animations[i];

        ROOT.playbackConfig[clip.name] = generateCallback(clip);
        guiItems[i] = folder.add(ROOT.playbackConfig, clip.name, clip.name);

        i++;

    }

}


function labelize(text) {

    var parts = text.split(".");

    if (parts.length > 1) {

        parts.length -= 1;
        return parts.join(".");

    }

    return text;

}

/*
 * @Class POINT_COLLISION
 * @param PLAYER_ROOT
 * @param indexOfCollision
 */

function POINT_COLLISION(PLAYER_ROOT, indexOfCollison) {

    var ROOT = this;

    ROOT.INDEX = indexOfCollison;
    eval("PLAYER_ROOT.INDIKATOR" + indexOfCollison + ".position.z = 72;");

    ROOT.GLOBAL_RAY = new THREE.Raycaster();
    ROOT.GLOBAL_RAY.far = 200;
    ROOT.GLOBAL_RAY.near = 100;
    ROOT.COLLIDE;
    ROOT.LAST_POSITION = {
        x: 0,
        y: 0,
        z: 0
    };
    ROOT.LAST_POSITIONS = [];
    ROOT.BLOCK_COLLECTING = false;
    ROOT.BLOCK_COLECTOR = function () {

        if (ROOT.BLOCK_COLLECTING == false) {

            ROOT.BLOCK_COLLECTING = true;
            setTimeout(function () {
                ROOT.BLOCK_COLLECTING = false;
            }, 1000);

        }

    };

    ROOT.GLOBAL_RAY.AUTO_UPDATE = function () {

        eval("var LOC = PLAYER.INDIKATOR" + ROOT.INDEX + ".getWorldPosition();");
        LOC.y = PLAYER.character.root.position.y;
        var direction = LOC.sub(PLAYER.character.root.position).normalize();
        ROOT.GLOBAL_RAY.set(PLAYER.character.root.position, direction);
        var intersects = ROOT.GLOBAL_RAY.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            COLLIDE = intersects[0].object;
            try {
                if (intersects.length > 1) {
                    console.log("collision for " + intersects[1].object);
                }

                if (COLLIDE.name != 'SKY') {

                    if (COLLIDE.name == 'Diamond' || COLLIDE.name.indexOf('Diamond') != -1) {

                        scene.remove(COLLIDE.parent);

                        HUD.PLAYER.POINTS_VALUE++;
                        HUD.PLAYER.POINTS.SET_TEXT("Points : " + HUD.PLAYER.POINTS_VALUE);
                        refreshText(HUD.PLAYER.POINTS)

                    } else {

                        console.log("COLLISION ON  : " + COLLIDE.name)
                        ROOT.BLOCK_COLECTOR();
                        PLAYER.character.controls.moveForward = false;
                        PLAYER.character.root.position.set(ROOT.LAST_POSITIONS[24].x, ROOT.LAST_POSITIONS[24].y, ROOT.LAST_POSITIONS[24].z);
                        //scene.remove(COLLIDE)

                    }

                }

            } catch (e) {
                console.log("error in raycaster" + e)
            }

        } else if (ROOT.BLOCK_COLLECTING == false) {

            ROOT.LAST_POSITION.x = PLAYER.character.root.position.x;
            ROOT.LAST_POSITION.y = PLAYER.character.root.position.y;
            ROOT.LAST_POSITION.z = PLAYER.character.root.position.z;
            ROOT.LAST_POSITIONS.push(ROOT.LAST_POSITION);

            if (ROOT.LAST_POSITIONS.length > 25) {
                ROOT.LAST_POSITIONS.pop();
            }

        }

    };

    PROGRAM.AUTO_UPDATE.push(ROOT.GLOBAL_RAY);

}
