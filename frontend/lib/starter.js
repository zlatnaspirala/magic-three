


if (!Detector.webgl)
    Detector.addGetWebGLMessage();

var INCLUDE = {
    SCRIPT: function addScript(src) {
        var s = document.createElement('script');
        s.setAttribute('src', src);

        document.body.appendChild(s);
    }
};

//  Whole preload class/procedural function
//  Initial staff

function DETECTBROWSER() {
    var HREFF,
    HREFTXT = "unknown";
    this.NAVIGATOR = navigator.userAgent;
    var NAV = navigator.userAgent;
    var gecko,
    navIpad,
    operatablet,
    navIphone,
    navFirefox,
    navChrome,
    navOpera,
    navSafari,
    navandroid,
    mobile,
    navMozilla;
    gecko = NAV.match(/gecko/gi);
    navOpera = NAV.match(/opera/gi);
    operatablet = NAV.match(/Tablet/gi);
    navIpad = NAV.match(/ipad/gi);
    navIphone = NAV.match(/iphone/gi);
    navFirefox = NAV.match(/Firefox/gi);
    navMozilla = NAV.match(/mozilla/gi);
    navChrome = NAV.match(/Chrome/gi);
    navSafari = NAV.match(/safari/gi);
    navandroid = NAV.match(/android/gi);
    mobile = NAV.match(/mobile/gi);
    window["TYPEOFANDROID"] = 0;
    window["NOMOBILE"] = 0;

    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) {
        var userAgent = navigator.userAgent.toLowerCase();
        if ((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1)) {
            console.log("ANDROID MOBILE")
        } else if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1)) {
            console.log(" ANDROID TABLET ")
            TYPEOFANDROID = 1;
        }
    } else {
        NOMOBILE = 1;
    }
    //  FIREFOX za android
    if (navFirefox && navandroid && TYPEOFANDROID == 0) {
        HREFF = "#";
        HREFTXT = "mobile_firefox_android";
    }
    //  FIREFOX za android T
    if (navFirefox && navandroid && TYPEOFANDROID == 1) {
        HREFF = "#";
        HREFTXT = "mobile_firefox_android_tablet";
    }
    // OPERA ZA ANDROID
    if (navOpera && navandroid) {
        HREFF = "#";
        HREFTXT = "opera_mobile_android";
    } // provera
    // OPERA ZA ANDROID TABLET
    if (navOpera && navandroid && operatablet) {
        HREFF = "#";
        HREFTXT = "opera_mobile_android_tablet";
    } // provera
    //  safari mobile za IPHONE - i  safari mobile za IPAD i CHROME za IPAD
    if (navSafari) {
        var Iphonesafari = NAV.match(/iphone/gi);
        if (Iphonesafari) {
            HREFF = "#";
            HREFTXT = "safari_mobile_iphone";
        } else if (navIpad) {
            HREFF = "#";
            HREFTXT = "mobile_safari_chrome_ipad";
        } else if (navandroid) {
            HREFF = "#";
            HREFTXT = "android_native";
        }
    }
    // TEST CHROME
    if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 1) {
        HREFF = "#";
        HREFTXT = "mobile_chrome_android_tablet";
    }
    if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 0) {
        HREFF = "#";
        HREFTXT = "mobile_chrome_android";
    }
    if (navChrome && TYPEOFANDROID == 0) {
        HREFF = "#";
        HREFTXT = "chrome_browser";
    }
    if (navMozilla && NOMOBILE == 1 && gecko && navFirefox) {
        HREFF = "#";
        HREFTXT = "firefox_desktop";
    }
    if (navOpera && TYPEOFANDROID == 0 && !mobile) {
        HREFF = "#";
        HREFTXT = "opera_desktop";
    }

    this.NAME = HREFTXT;
    this.NOMOBILE = NOMOBILE;
}

// LOGGER
function LOG() {

    this.ENABLE = true;

    this.LOG = function (data) {

        if (this.ENABLE == true) {

            console.log('%c' + data, 'background: #333; color: lime');

        }

    };

    this.WARNING = function (data) {

        if (this.ENABLE == true) {

            console.log('%c Warning : ' + data, 'background: #333; color: yellow');

        }

    };

    this.CRITICAL = function (data) {

        if (this.ENABLE == true) {

            console.log('%c Critical : ' + data, 'background: #333; color: yellow');

        }

    };

}

// DOM and window operation
function DOM() {

    this.CREATED_ELEMENTS = [];

    this.E = function (id) {
        return document.getElementById(id);
    };
    this.ACCESS_IFRAME = function (name) {
        return document.getElementById(name).contentWindow;
    };
    this.GOTO = function (url_) {
        location.assign(url_)
    };

    this.UPLOAD_FILE = function (id_, onchange) {

        var x = document.createElement("INPUT");
        x.setAttribute("type", "file");
        x.setAttribute("id", id_);
        x.setAttribute("style", "display:block;");
        document.getElementById('UPLOAD_BOX').appendChild(x);

        window["FILE_" + id_] = document.getElementById(id_);

        window["FILE_" + id_].onchange = function () {

            SYS.DEBUG.LOG("New file comes...");

        };

        if (typeof onchange !== 'undefined') {

            window["FILE_" + id_].onchange = onchange;

        }

        //document.body.appendChild(x);
    };

    // Destroy DOM element
    this.removeElement = function (parentDiv, childDiv) {

        if (typeof childDiv == 'undefined') {

            console.log("remove now")
            document.body.removeChild(parentDiv);

        } else if (document.getElementById(childDiv)) {
            var child = document.getElementById(childDiv);
            var parent = document.getElementById(parentDiv);
            parent.removeChild(child);
            parent.style.zIndex = 0;
            parent.style.display = "none";
        } else {
            return false;
        }
    }

    this.createElement = function (tagName, src, id_, autoPlay) {

        var element_ = document.createElement(tagName);

        if (typeof id_ != 'undefined') {

            element_.setAttribute('id', id_);

        }

        if (typeof src != 'undefined') {

            element_.src = src;

            if (typeof autoPlay != 'undefined') {
                element_.setAttribute('autoPlay', autoPlay);
            } else {
                element_.setAttribute('autoPlay', true);
            }

        } else {

            if (tagName != 'video') {

                //		SYS.DEBUG.WARNING("SYS.DOM.createElement function says : You are just create video tag without src parameter ! ");

            } else {

                SYS.DEBUG.WARNING("SYS.DOM.createElement function says : You are just create video tag without src parameter ! ");

            }

        }

        SYS.DOM.CREATED_ELEMENTS.push(element_);
        document.body.appendChild(element_);
        element_.autoPlay = true;
        SYS.DEBUG.LOG("SYS.DOM.createElement function says : Created element success ! ");
    };

    // Fullscreen code
    this.LANCH_FULLSCREEN = function (element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

    this.EXIT_FULLSCREEN = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    };

    this.FS_FLAG = 0;

    this.FULL_SCREEN = function () {

        if (this.FS_FLAG == 0) {
            this.LANCH_FULLSCREEN(document.documentElement);
            this.FS_FLAG = 1;
        } else if (this.FS_FLAG == 1) {
            this.EXIT_FULLSCREEN();
            this.FS_FLAG = 0;
        }
    };

}

var lineLength = function (x, y, x0, y0) {
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};

var SYS = new Object();

SYS.DEBUG = new LOG();
SYS.DOM = new DOM();
SYS.SOUND = new Object();

function makeHttpObject() {
    try {
        return new XMLHttpRequest();
    } catch (error) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (error) {}
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (error) {}

    throw new Error("Could not create HTTP request object.");
}

function GET_HTML(URL_) {

    var ROOT = this;

    var request = makeHttpObject();

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            console.log("HTML CODE IS COMING");
            ROOT.VALUE = request.responseText;
            return (request.responseText);
        } else {
            return "ERROR IN COLLECT HTML CODE >>>" + request.readyState;
        }
    };

    request.open("GET", URL_, false);
    request.send(null);

}
