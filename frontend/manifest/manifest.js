//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CONFIG CODE APP
/**
Filename : manifest.js

manifest file for visual js Application three.js implementation .
!important Use this file just for edit fields , dont press enter for new line.

created by Nikola Lukic zlatnaspirala@gmail.com
www.maximumroulette.com 2016
 */
//###############################################//###############################################
//###############################################//###############################################
var APPLICATION = {

    NAME: "prototype VISUAL-JS framework 0.7 three.js implementation",
    TYPE: "client",
    VERSION: "0.7",
    STATUS: "develop",
    EDITOR: null,
    EDITOR_AUTORUN: null,
    LOCAL_SERVER: "127.0.0.1",
    ACCOUNT_SERVER: "127.0.0.1",
    ACCOUNT_SERVER_PORT: "3666",
    ACCOUNT_SERVER_SECURE: false,
    ACCOUNT_SERVICE_AUTO_RUN: true,
    DEVELOPERS: ["Nikola Lukic Zlatnaspirala@gmail.com"],

    PROGRAM: {
        NAME: "Visual js 3d part",
        GRID: false,
        AUTO_UPDATE: [],
        ANTIALIAS: true,
        SKY: true,
        LIGHTS: true,
        DDSLoader: true,
        OBJLoader: true,
        MTLLoader: false,
        MD2Loader: false,
        ColladaLoader: true,
        MD2Character: true,
        FBXLoader: false,
        GROUND: true,
        RAYCAST: true,
        PARTICLE_ENGINE: false,
        CANNON: true,
        PHYSI: false, // not working yet
        MATERIALS: true,
        STREAM_TEXTURE: true,
        VIDEO_CONFERENCE: false, // not work yet
        VIDEO_CONFERENCE_IO_NODEJS: false, // rtc 2.2
        ACCOUNTS_NETWORKING: true,
        PANORAMA_TEXTURES: true,
        THREEX_AR: true,
    },

    SYSTEM: {
        COLOR: "#afa9aa",
        HOVER_COLOR: "#5991FF",
        TEXT_COLOR: "#000000",
        ACTOR_X: "",
        ACTOR_Y: "",
    },

};

var PROGRAM = APPLICATION.PROGRAM;
