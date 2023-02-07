// Nikola Lukic Free code project

var pan;
var YT = new Object();
var VIDEO = SYS.DOM.E('VIDEO360');
pan = new PANORAMA_BALL('VIDEO_IMAGE', 'VIDEO360');

YT.RAY = new Raycaster();
YT.FLAG_ONLY_FIRST_TIME = false;
YT.RAY.RECALL = function (a) {};

function PLAY() {

    SYS.DOM.E('VIDEO360_PAUSE').style.display = 'block';
    SYS.DOM.E('VIDEO360_PLAY').style.display = 'none';
    SYS.DOM.E('VIDEO360').play();

}

function PAUSE() {

    SYS.DOM.E('VIDEO360_PAUSE').style.display = 'none';
    SYS.DOM.E('VIDEO360_PLAY').style.display = 'block';
    VIDEO.pause();

}

function SOUND_OFF() {

    SYS.DOM.E('VIDEO360_SOUND_OFF').style.display = 'none';
    SYS.DOM.E('VIDEO360_SOUND_ON').style.display = 'block';
    VIDEO.volume = 1;

}

function SOUND_ON() {

    SYS.DOM.E('VIDEO360_SOUND_ON').style.display = 'none';
    SYS.DOM.E('VIDEO360_SOUND_OFF').style.display = 'block';
    VIDEO.volume = 0;

}

var ROTATE_BY_Y = new Object();

ROTATE_BY_Y.AUTO_UPDATE = function () {

    camera.rotateY(0.01);

};

function ROTATE_Y() {

    if (PROGRAM.AUTO_UPDATE.indexOf(ROTATE_BY_Y) != -1) {

        PROGRAM.AUTO_UPDATE.unset(ROTATE_BY_Y);

    } else {

        PROGRAM.AUTO_UPDATE.push(ROTATE_BY_Y);

    }

}
