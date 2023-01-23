/*
 * @class TEXT3D
 * @param position
 * @param forhud
 * @param helper
 */
function TEXT3D(position, forhud, helper) {

    var ROOT = this;

    ROOT.group = new THREE.Group();
    ROOT.group.position.y = position.y;
    ROOT.group.position.z = position.z;
    ROOT.group.position.x = position.x;

    ROOT.text = "visual js",
    ROOT.height = 1,
    ROOT.size = 30,
    ROOT.hover = 1,
    ROOT.curveSegments = 2,
    ROOT.bevelThickness = 2,
    ROOT.bevelSize = 1.5,
    ROOT.bevelSegments = 1,
    ROOT.bevelEnabled = true,
    ROOT.font = undefined,
    ROOT.fontName = "gentilis",
    ROOT.fontWeight = "bold";

    ROOT.fontMap = {
        "helvetiker": 0,
        "optimer": 1,
        "gentilis": 2,
        "droid/droid_sans": 3,
        "droid/droid_serif": 4
    };

    ROOT.hex = '00F209';

    ROOT.weightMap = {

        "regular": 0,
        "bold": 1

    };

    ROOT.textMesh1 = '';
    ROOT.textMesh2 = '';
    ROOT.mirror = false;

    ROOT.material = new THREE.MultiMaterial([
                RM.COOL.Chrome,
                RM.COLORFUN.Chrome2
            ]);

    ROOT.SET_POSITION = function (x, y, z) {

        ROOT.group.position.x = x;
        ROOT.group.position.y = y;
        ROOT.group.position.z = z;
        render()

    };

    ROOT.SET_TEXT = function (text_) {

        ROOT.text = text_;
        refreshText(ROOT)
        render()

    };

    ROOT.DESTROY = function (textSettings_) {

        PROGRAM.AUTO_UPDATE.unset(textSettings_)
        ROOT.UPDATE_LIGHT_DINAMIC = false;
        textSettings_.group.remove(textSettings_.textMesh1);
        textSettings_.group.remove(textSettings_.pointLight);
        if (textSettings_.mirror) {
            group.remove(textSettings_.textMesh2);
        }
        delete textSettings_;
        delete this;
    };

    ROOT.UPDATE_LIGHT_DINAMIC = false;
    ROOT.UPDATE_LIGHT_BY_X = false;
    ROOT.UPDATE_LIGHT_BY_Y = false;
    ROOT.UPDATE_LIGHT_BY_Z = false;
    ROOT.UPDATE_LIGHT_MARGIN_X = new OSCILLATOR(0, 300, 2);
    ROOT.UPDATE_LIGHT_MARGIN_Y = new OSCILLATOR(0, 1300, 10);
    ROOT.UPDATE_LIGHT_MARGIN_Z = new OSCILLATOR(0, 1300, 10);

    ROOT.AUTO_UPDATE = function () {

        if (ROOT.UPDATE_LIGHT_DINAMIC == true) {
            var time = Date.now() * 0.005;
            if (ROOT.UPDATE_LIGHT_BY_X == true) {
                ROOT.group.children[1].position.x = ROOT.UPDATE_LIGHT_MARGIN_X.UPDATE();
            }
            if (ROOT.UPDATE_LIGHT_BY_Y == true) {
                ROOT.group.children[1].position.y = Math.cos(time * 0.5) * 80 + ROOT.UPDATE_LIGHT_MARGIN_Y.UPDATE();
            }
            if (ROOT.UPDATE_LIGHT_BY_Z == true) {
                ROOT.group.children[1].position.z = Math.cos(time * 0.3) * 60 + ROOT.UPDATE_LIGHT_MARGIN_Z.UPDATE();
            }
        }

    };

    ROOT.onload = function () {
        console.log("text loaded")
    };

    if (typeof forhud != 'undefined') {
        ROOT.forhud = forhud;

    }

}

function loadFont(textSettings_) {

    var loader = new THREE.FontLoader();

    loader.load('fonts/' + textSettings_.fontName + '_' + textSettings_.fontWeight + '.typeface.js', function (response) {
        textSettings_.font = response;
        refreshText(textSettings_);
        textSettings_.onload();
    });

}

function refreshText(textSettings_) {

    textSettings_.group.remove(textSettings_.textMesh1);
    textSettings_.group.remove(textSettings_.pointLight);
    PROGRAM.AUTO_UPDATE.unset(textSettings_);
    if (textSettings_.mirror)
        group.remove(textSettings_.textMesh2);

    if (!textSettings_.text)
        return;

    createText(textSettings_);

}

/////////////////////////////////////


function createText(textSettings_) {

    textGeo = new THREE.TextGeometry(textSettings_.text, {

            font: textSettings_.font,

            size: textSettings_.size,
            height: textSettings_.height,
            curveSegments: textSettings_.curveSegments,

            bevelThickness: textSettings_.bevelThickness,
            bevelSize: textSettings_.bevelSize,
            bevelEnabled: textSettings_.bevelEnabled,

            material: 0,
            extrudeMaterial: 1

        });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    // "fix" side normals by removing z-component of normals for side faces
    // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
    if (!textSettings_.bevelEnabled) {

        var triangleAreaHeuristics = 0.1 * (height * size);

        for (var i = 0; i < textGeo.faces.length; i++) {

            var face = textGeo.faces[i];

            if (face.materialIndex == 1) {

                for (var j = 0; j < face.vertexNormals.length; j++) {

                    face.vertexNormals[j].z = 0;
                    face.vertexNormals[j].normalize();

                }

                var va = textGeo.vertices[face.a];
                var vb = textGeo.vertices[face.b];
                var vc = textGeo.vertices[face.c];

                var s = THREE.GeometryUtils.triangleArea(va, vb, vc);

                if (s > triangleAreaHeuristics) {

                    for (var j = 0; j < face.vertexNormals.length; j++) {

                        face.vertexNormals[j].copy(face.normal);

                    }

                }

            }

        }

    }

    var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    textSettings_.textMesh1 = new THREE.Mesh(textGeo, textSettings_.material);
    textSettings_.textMesh1.name = textSettings_.text;
    textSettings_.textMesh1.position.x = 0;
    textSettings_.textMesh1.position.y = 0;
    textSettings_.textMesh1.position.z = 0;
    textSettings_.textMesh1.rotation.x = 0;
    textSettings_.textMesh1.rotation.y = Math.PI * 2;
    textSettings_.group.add(textSettings_.textMesh1);

    PROGRAM.AUTO_UPDATE.push(textSettings_);

    if (typeof textSettings_.forhud != 'undefined') {

        if (textSettings_.forhud == 'PLAYER_NAME') {

            PLAYER.earthPivot.add(textSettings_.group);

        } else {

            camera.add(textSettings_.group);

        }

    } else {
        scene.add(textSettings_.group);
    }

    textSettings_.pointLight = new THREE.PointLight(0xffffff, 10, 500);
    textSettings_.pointLight.position.set(122, 80, 80);

    if (typeof helper != 'undefined') {

        var sphere = new THREE.SphereGeometry(2, 8, 8);
        textSettings_.pointLight.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
                    color: 0x00ff40
                })));
        textSettings_.group.add(textSettings_.pointLight);

    }

    if (textSettings_.mirror) {

        textMesh2 = new THREE.Mesh(textGeo, material);

        textMesh2.position.x = centerOffset;
        textMesh2.position.y = -hover;
        textMesh2.position.z = height;

        textMesh2.rotation.x = Math.PI;
        textMesh2.rotation.y = Math.PI * 2;

        group.add(textMesh2);

    }

}
