// Nikola Lukic free example

RM.CREATE_CUBE_REFRACTION("res/textures/reflection1/", 'COLORFUN')
var HUD = new Object();
HUD.MENU = new Object();

HUD.MENU.KEYBOARD = new KEYBOARD(window);

HUD.MENU.CREATE_RAY = function () {

    ROOT = this;
    ROOT.RAY = new Raycaster();
    ROOT.FLAG_ONLY_FIRST_TIME = false;

    ROOT.RAY.RECALL = function (a) {

        console.log(a.name)
        if (a.name == 'SELECT_TYPE_HOST' && rtcMultiConnection.sessionDescription == null && rtcMultiConnection.REMOTE_USERS.length == 0) {

            HUD.MENU.KEYBOARD.ACTION_ON_KEY_DOWN = function () {
                console.log('SETUJE ');
                HUD.USER_TEXT.TEXT.SET_TEXT(HUD.MENU.KEYBOARD.CAPTURE_CHAR);

            };

            HUD.MENU.KEYBOARD.ACTION_ON_KEY_ENTER = function () {

                console.log('ENTER')
                if (HUD.USER_TEXT.TEXT.text.length < 15) {

                    //SYS.DOM.E('your-name').value = HUD.USER_TEXT.TEXT.text;
                    SYS.DOM.E('room-name').value = HUD.USER_TEXT.TEXT.text;

                    SYS.DOM.E('continue').onclick();
                    HUD.USER_TEXT.TEXT.SET_TEXT(' ')
                    HUD.USER_TEXT.TEXT.SET_TEXT("YOUR ID MASHINE : " + SYS.DOM.E('room-name').value)

                    SYS.DOM.E('room-name').select();

                    try {
                        var successful = document.execCommand('copy');
                        var msg = successful ? 'successful' : 'unsuccessful';
                        console.log('Copying text command was ' + msg);
                    } catch (err) {
                        console.log('Oops, unable to copy');
                    }

                }

            };

            HUD.NARATOR.TEXT.SET_TEXT("Enter channel name");

        } else if (a.name == 'SELECT_TYPE_JOIN' && rtcMultiConnection.sessionDescription == null && rtcMultiConnection.REMOTE_USERS.length == 0) {

            HUD.NARATOR.TEXT.SET_TEXT("Join remote channel");

            HUD.MENU.KEYBOARD.ACTION_ON_KEY_DOWN = function () {
                console.log('SETUJE ');
                HUD.USER_TEXT.TEXT.SET_TEXT(HUD.MENU.KEYBOARD.CAPTURE_CHAR);

            };

            HUD.MENU.KEYBOARD.ACTION_ON_KEY_ENTER = function () {

                console.log('ENTER')
                if (HUD.USER_TEXT.TEXT.text.length < 15) {

                    //SYS.DOM.E('your-name').value = HUD.USER_TEXT.TEXT.text;
                    SYS.DOM.E('room-name').value = HUD.USER_TEXT.TEXT.text;

                    SYS.DOM.E('continue').onclick();
                    HUD.USER_TEXT.TEXT.SET_TEXT(' ')
                    HUD.USER_TEXT.TEXT.SET_TEXT("YOUR ID MASHINE : " + SYS.DOM.E('room-name').value)

                    SYS.DOM.E('room-name').select();

                    HUD.MENU.KEYBOARD.CAPTURE_CHAR = '';

                }

            };

        }

        ROOT.FLAG_ONLY_FIRST_TIME = true;

    };

};

HUD.NARATOR = new Object();

var position_ = {
    z: -300,
    y: 100,
    x: -250
};
HUD.NARATOR.TEXT = new TEXT3D(position_, true);
HUD.NARATOR.TEXT.size = 30;
HUD.NARATOR.TEXT.onload = function () {

    HUD.NARATOR.TEXT.SET_TEXT("select type of connection");

};
loadFont(HUD.NARATOR.TEXT);

// file text description
var NAR_ = HUD.NARATOR;
NAR_.NUMBER_OF_OPENED_FTP = 0;

function CREATE_3DTEXT_FOR_FTP_STATUS(filename, status, id_) {

    filename = filename.replace(/[^a-zA-Z]+/g, '');

    var position_ = {
        z: -300,
        y: 80,
        x: -350
    };
    eval(' NAR_.' + filename + ' = new TEXT3D(position_ , true ); ');

    window['NAR_'][filename].size = 10;
    window['NAR_'][filename].TYPE_OF_TRANSFER = status;
    window['NAR_'][filename].ID_FILE = id_;

    window['NAR_'][filename].onload = function () {

        window['NAR_'][filename].SET_TEXT("ftp status");
        NAR_.NUMBER_OF_OPENED_FTP++;

    };
    loadFont(window['NAR_'][filename]);

}

//user text types
HUD.USER_TEXT = new Object();

var position_ = {
    z: -250,
    y: -50,
    x: -190
};
HUD.USER_TEXT.TEXT = new TEXT3D(position_, true);
HUD.USER_TEXT.TEXT.size = 13;
HUD.USER_TEXT.TEXT.onload = function () {

    HUD.USER_TEXT.TEXT.SET_TEXT("enter your channel name and press enter")

};
loadFont(HUD.USER_TEXT.TEXT);

//ON MSG

HUD.REMOTE_USER_TEXT = new Object();

var position_ = {
    z: -250,
    y: -100,
    x: -190
};
HUD.REMOTE_USER_TEXT.TEXT = new TEXT3D(position_, true);
HUD.REMOTE_USER_TEXT.TEXT.size = 13;
HUD.REMOTE_USER_TEXT.TEXT.onload = function () {

    this.SET_TEXT(" free video chat ")

};
loadFont(HUD.REMOTE_USER_TEXT.TEXT);

RM.CREATE_CUBE_REFRACTION('res/textures/reflection1/', 'rock_mats');

var CUBE1 = new CUBE(RM.materialLambertDoubleHostBTN);

CUBE1.LOADED = function () {

    CUBE1.OBJECT.position.set(450, 180, 0);
    CUBE1.OBJECT.scale.z = 0.01;
    CUBE1.OBJECT.scale.x = 2;
    CUBE1.OBJECT.name = 'SELECT_TYPE_HOST';
    CUBE1.OBJECT.castShadow = true;
    CUBE1.OBJECT.receiveShadow = true;

};

CUBE1.LOADED();

var CUBE2 = new CUBE(RM.materialLambertDoubleJoinBTN);

CUBE2.LOADED = function () {

    CUBE2.OBJECT.position.set(-450, 180, 0);
    CUBE2.OBJECT.scale.z = 0.01;
    CUBE2.OBJECT.scale.x = 2;
    CUBE2.OBJECT.name = 'SELECT_TYPE_JOIN';
    CUBE2.OBJECT.castShadow = true;
    CUBE2.OBJECT.receiveShadow = true;

};

CUBE2.LOADED();

//scene.fog = new THREE.Fog( 0xff5f55, 2300, 6000 );
directionalLight.position.set(-2, 2, -100).normalize();

// lights
sky.uniforms.luminance.value = 0.1;

try {
    sky.uniforms.sunPosition.value.z = 399802;
    document.getElementsByClassName('dg ac')[0].style.height = 'auto';
} catch (e) {
    console.log(e)
}

var SPOT_L1 = new SPOT_LIGHT_TARGET(0xf2515f)
    SPOT_L1.LOADED = function () {

    this.spotlight.position.set(0, 1400, 0);
    this.lightTarget.position.set(1000, 10, 1000);
    console.log('done' + this)

};
SPOT_L1.LOADED();

var SPOT_L2 = new SPOT_LIGHT_TARGET(0xff0777)
    SPOT_L2.LOADED = function () {

    this.spotlight.position.set(0, 1400, 0);
    this.lightTarget.position.set(-1000, 10, 1000);
    console.log('done' + this)

};
SPOT_L2.LOADED();

var SPOT_L3 = new SPOT_LIGHT_TARGET(0x777fff)
    SPOT_L3.LOADED = function () {

    this.spotlight.position.set(0, 1400, 0);
    this.lightTarget.position.set(1000, 10, -1000);
    console.log('done' + this)

};
SPOT_L3.LOADED();

var SPOT_L4 = new SPOT_LIGHT_TARGET(0x00f405)
    SPOT_L4.LOADED = function () {

    this.spotlight.position.set(0, 1400, 0);
    this.lightTarget.position.set(-1000, 10, -1000);
    console.log('done' + this)

};
SPOT_L4.LOADED();

HUD.MENU.CREATE_RAY();

var CUBE_DATA = new Object();

rtcMultiConnection.ONSTREAM = function (e) {

    console.log(" YEAP < STREAM IS HERE " + e.userid)

    CUBE_DATA[e.userid] = new CANNON_SCENE.CREATE_BOX_CANNON({
            x: 0,
            y: 530,
            z: 550
        }, {
            x: 800,
            y: 800,
            z: 800
        });
    CUBE_DATA[e.userid].LOADED = function () {

        CUBE_DATA[e.userid].WEBCAM_TEXTURE = new VIDEO_TEXTURE(rtcMultiConnection.STREAM_FOR_PREVIEW, 'videoImage');
        CUBE_DATA[e.userid].boxMesh.material = CUBE_DATA[e.userid].WEBCAM_TEXTURE.movieMaterial;

    };

    CUBE_DATA[e.userid].LOADED();

};

rtcMultiConnection.ONCLOSE = function (e) {

    console.log(e.userid)
    scene.remove(CUBE_DATA[e.userid].WEBCAM_TEXTURE.movieScreen)
    HUD.NARATOR.TEXT.SET_TEXT("Disconnected with " + e.userid);
    console.log(' < etst user name > ' + e.extra.username);
    // hard code delete
    CANNON_SCENE.REMOVE_BOX(CUBE_DATA[e.userid].ID)

};
