var materials;
var manager = new THREE.LoadingManager();
var mixers = [];
var loader;

var IMPORT = {
    COLLADA: function (name, path_) {
        var ROOT = this;
        ROOT.LOADED_OBJECT = function () {};
        loader = new THREE.ColladaLoader();
        loader.load(path_, function (collada) {
            collada.scene.traverse(function (child) {
                if (child instanceof THREE.SkinnedMesh) {

                    ROOT.animation = new THREE.Animation(child, child.geometry.animation);
                    ROOT.animation.play();
                    camera.lookAt(child.position);
                }
            });
            scene.add(collada.scene);
            ROOT.mesh = collada.scene;
            ROOT.AUTO_UPDATE = function () {
                THREE.AnimationHandler.update(clock.getDelta());
            };
            PROGRAM.AUTO_UPDATE.push(ROOT)
            ROOT.LOADED_OBJECT()
        });
    },
    JS_JSON: function (name_, path_) {
        var ROOT = this;
        ROOT.LOADED_OBJECT = function () {};
        var loader = new THREE.JSONLoader();

        ROOT.MESH_OBJ = function (geometry, materials) {
            createSceneSkin(geometry, materials, 0, 0, 50, 105, ROOT, name_)
        };
        loader.load(path_, ROOT.MESH_OBJ)
    },
    JS_JSON_ANIMATED: function (name_, path_, position, isPlayer) {

        var ROOT = this;
        ROOT.LOADED_OBJECT = function () {};
        ROOT.name = name_;
        ROOT.group = new THREE.Group();

        if (typeof position != 'undefined') {
            ROOT.group.position.y = position.y;
            ROOT.group.position.z = position.z;
        }

        ROOT.mixer = new THREE.AnimationMixer(scene);

        var loader = new THREE.JSONLoader();
        loader.load(path_, function (geometry, materials) {
            // adjust color a bit
            var material = materials[0];
            material.morphTargets = true;
            var faceMaterial = new THREE.MultiMaterial(materials);
            ROOT.mesh = new THREE.Mesh(geometry, faceMaterial);
            ROOT.mesh.scale.set(1, 1, 1);
            ROOT.mesh.position.set(111, 110, 444);
            ROOT.mesh.rotation.y = THREE.Math.randFloat(-0.25, 0.25);
            ROOT.mesh.matrixAutoUpdate = true;
            ROOT.mesh.updateMatrix();
            ROOT.AUTO_UPDATE = function () {
                THREE.AnimationHandler.update(clock.getDelta());
            };
            ROOT.group.add(ROOT.mesh);
            window["IMPOTED_" + ROOT.name] = ROOT.group;
            scene.add(ROOT.group);
            ROOT.mixer = new THREE.AnimationMixer(ROOT.mesh);
            ROOT.clip = THREE.AnimationClip.CreateFromMorphTargetSequence('animation_', geometry.morphTargets, 100);
            ROOT.mixer.clipAction(ROOT.clip).setDuration(10).play();
            ROOT.play_firstANI = ROOT.mixer.clipAction(ROOT.clip).setDuration(11).play;
            ROOT.PLAY_ANI = ROOT.mixer.clipAction(ROOT.clip);
            PROGRAM.AUTO_UPDATE.push(ROOT);
            ROOT.firstAnimation = geometry.animations[0];
            /* 	ROOT.mixer.clipAction( geometry.animations[0], ROOT.mesh )
            .setDuration( 10 )
            .startAt( - Math.random() )
            .play();	 */
            ROOT.LOADED_OBJECT()
        });
    },
    OBJ: function (name_, path_, tex) {
        var ROOT = this;
        ROOT.LOADED_OBJECT = function () {};

        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

        var texture = new THREE.Texture();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };
        var onError = function (xhr) {};
        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };

        var loader = new THREE.ImageLoader(manager);

        if (typeof tex != 'undefined') {
            loader.load(tex, function (image) {
                texture.image = image;
                texture.needsUpdate = true;
            });
        }

        var loader = new THREE.OBJLoader(manager);
        loader.load(path_, function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh && typeof tex != 'undefined') {
                    child.material.map = texture;
                }
            });
            object.position.y = 0;
            window[name_] = object;
            object.name = name_;
            ROOT.LOADED_OBJECT()
            scene.add(window[name_]);
            var box = new THREE.Box3().setFromObject(window[name_]);
            ROOT.dim = new Object();
            ROOT.dim.x = box.max.x - box.min.x;
            ROOT.dim.y = box.max.y - box.min.y;
            ROOT.dim.z = box.max.z - box.min.z;
        }, onProgress, onError);
    },
    OBJ_MTL_ON_LOAD: function () {},
    OBJ_MTL: function (name_, obj_name, path_to_obj, mtl_, INFLYIMAGEDATA) {

        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };

        var onError = function (xhr) {};

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setBaseUrl(path_to_obj);
        mtlLoader.setPath(path_to_obj);

        mtlLoader.load(mtl_, function (materials) {

            materials.preload();
            var objLoader = new THREE.OBJLoader();

            objLoader.setMaterials(materials);
            objLoader.setPath(path_to_obj);
            objLoader.load(obj_name, function (object) {

                object.position.y = 0;
                object.position.z = 0;

                object.material.shading = THREE.SmoothShading;
                object.geometry.computeVertexNormals(true);
                object.geometry.mergeVertices();

                object.traverse(function (node) {
                    if (node instanceof THREE.Mesh) {
                        node.geometry.computeVertexNormals();
                    }
                });
                window[name_] = object;
                IMPORT.OBJ_MTL_ON_LOAD();
                scene.add(object);
            }, onProgress, onError);

        });
    },
    FBX: function () {
        managerFbx = new THREE.LoadingManager();
        managerFbx.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };

        var onError = function (xhr) {
            console.log('ERROR');
        };

        var loader = new THREE.FBXLoader(managerFbx); // hard code
        loader.load('res/fbx/xsi_man_skinning.fbx', function (object) {

            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    // pass
                }
                if (child instanceof THREE.SkinnedMesh) {

                    if (child.geometry.animations !== undefined || child.geometry.morphAnimations !== undefined) {
                        //	child.mixer = new THREE.AnimationMixer( child );
                        //	mixers.push( child.mixer );
                        //	var action = child.mixer.clipAction( child.geometry.animations[ 0 ] );
                        //	action.play();
                    }
                }
            });
            scene.add(object);

        }, onProgress, onError);

    },

    JS_BONES_ANIMATION: function (name, path_) {

        var ROOT = this;
        ROOT.JS_BONES_ANIMATION_DONE = function () {
            console.log('finished')
        };

        var loader = new THREE.JSONLoader();
        ROOT.animation;

        // load the model and create everything
        loader.load(path_, function (geometry, materials) {
            var material;

            // create a mesh
            ROOT.mesh = new THREE.SkinnedMesh(
                    geometry,
                    new THREE.MeshFaceMaterial(materials));

            // define materials collection
            material = ROOT.mesh.material.materials;

            // enable skinning
            for (var i = 0; i < materials.length; i++) {
                var mat = materials[i];

                mat.skinning = true;
            }

            scene.add(ROOT.mesh);

            /* 		  // add animation data to the animation handler
            THREE.AnimationHandler.add(mesh.geometry.animation);

            // create animation
            animation = new THREE.Animation(
            mesh,
            'ArmatureAction',
            THREE.AnimationHandler.CATMULLROM
            );

            // play the anim
            animation.play(); */
            ROOT.mixer = new THREE.AnimationMixer(ROOT.mesh);

            ROOT.bonesClip = ROOT.mesh.geometry.bones;
            console.log(ROOT.bonesClip)
            ROOT.JS_BONES_ANIMATION_DONE()

        });

    },

    JS_SKELETAL: function (name, path) {

        window.addEventListener('start-animation', onStartAnimation);
        window.addEventListener('stop-animation', onStopAnimation);
        window.addEventListener('pause-animation', onPauseAnimation);
        window.addEventListener('step-animation', onStepAnimation);
        window.addEventListener('weight-animation', onWeightAnimation);
        window.addEventListener('crossfade', onCrossfade);
        window.addEventListener('warp', onWarp);
        window.addEventListener('toggle-show-skeleton', onShowSkeleton);
        window.addEventListener('toggle-show-model', onShowModel);

        var ROOT = this;
        ROOT.DONE = function () {};
        ROOT.gui = null;
        isFrameStepping = ROOT.isFrameStepping = false;
        timeToStep = ROOT.timeToStep = 0;
        blendMesh = ROOT.blendMesh = new THREE.BlendCharacter();
        gui = ROOT.gui = new BlendCharacterGui(ROOT.blendMesh);

        start = ROOT.start = function () {
            ROOT.blendMesh.rotation.y = Math.PI * -135 / 180;
            scene.add(ROOT.blendMesh);
            // Set default weights
            ROOT.blendMesh.applyWeight('run', 1);
            helper = ROOT.helper = new THREE.SkeletonHelper(ROOT.blendMesh);
            ROOT.helper.material.linewidth = 3;
            scene.add(ROOT.helper);
            PROGRAM.AUTO_UPDATE.push(ROOT);
            ROOT.DONE()

        };
        ROOT.blendMesh.loadJSON(path, ROOT.start);
        ROOT.AUTO_UPDATE = function () {
            try {
                var scale = ROOT.gui.getTimeScale();
                var delta = clock.getDelta();
                var stepSize = (!ROOT.isFrameStepping) ? delta * scale : ROOT.timeToStep;
                ROOT.blendMesh.update(stepSize);
                ROOT.helper.update();

            } catch (e) {
                console.log('ERROR : ' + e)
            }

        };

    },

};

// static
function createScene(name, geometry, materials, x, y, z, b, R) {
    window['' + name] = new THREE.Mesh(geometry, new THREE.MultiMaterial(materials));
    window['' + name].position.set(x, y, z);
    window['' + name].scale.set(3, 3, 3);
    R.LOADED_OBJECT();
    scene.add(window['' + name]);
}

// skinning
function createSceneSkin(geometry, materials, x, y, z, s, ROOT, name_) {
    //ensureLoop( geometry.animation );
    geometry.computeBoundingBox();
    var bb = geometry.boundingBox;
    /*
    var path = "textures/cube/Park2/";
    var format = '.jpg';
    var urls = [
    path + 'posx' + format, path + 'negx' + format,
    path + 'posy' + format, path + 'negy' + format,
    path + 'posz' + format, path + 'negz' + format
    ]; */
    for (var i = 0; i < 1; i++) {

        var m = RM.COLORFUN.Chrome2;

        m.skinning = true;
        m.morphTargets = true;

        m.specular.setHSL(0, 0, 0.1);

        m.color.setHSL(0.6, 0, 0.6);
        //m.map = map;
        //m.envMap = envMap;
        //m.bumpMap = bumpMap;
        //m.bumpScale = 2;
        //m.combine = THREE.MixOperation;
        //m.reflectivity = 0.75;

    }

    ROOT.mesh = new THREE.SkinnedMesh(geometry, new THREE.MultiMaterial(materials));
    ROOT.mesh.name = "Knight Mesh";
    ROOT.mesh.position.set(x, y - bb.min.y * s, z);
    ROOT.mesh.scale.set(s, s, s);
    scene.add(ROOT.mesh);
    ROOT.mesh.castShadow = true;
    ROOT.mesh.receiveShadow = true;
    mesh2 = new THREE.SkinnedMesh(geometry, new THREE.MultiMaterial(materials));
    mesh2.name = "Lil' Bro Mesh";
    mesh2.position.set(x - 240, y - bb.min.y * s, z + 500);
    mesh2.scale.set(s / 2, s / 2, s / 2);
    mesh2.rotation.y = THREE.Math.degToRad(60);
    mesh2.visible = false;
    mesh2.castShadow = true;
    mesh2.receiveShadow = true;
    scene.add(mesh2);
    helper = new THREE.SkeletonHelper(ROOT.mesh);
    helper.material.linewidth = 3;
    helper.visible = false;
    scene.add(helper);
    ROOT.mixer = new THREE.AnimationMixer(ROOT.mesh);
    bonesClip = geometry.animations[0];
    facesClip = THREE.AnimationClip.CreateFromMorphTargetSequence('facialExpressions', ROOT.mesh.geometry.morphTargets, 3);

}

function onStartAnimation(event) {
    var data = event.detail;
    blendMesh.stopAll();
    blendMesh.unPauseAll();
    for (var i = 0; i < data.anims.length; ++i) {
        blendMesh.play(data.anims[i], data.weights[i]);
    }
    isFrameStepping = false;
}

function onStopAnimation(event) {
    blendMesh.stopAll();
    isFrameStepping = false;
}

function onPauseAnimation(event) {
    (isFrameStepping) ? blendMesh.unPauseAll() : blendMesh.pauseAll();
    isFrameStepping = false;
}

function onStepAnimation(event) {

    blendMesh.unPauseAll();
    isFrameStepping = true;
    timeToStep = event.detail.stepSize;
}

function onWeightAnimation(event) {
    var data = event.detail;
    for (var i = 0; i < data.anims.length; ++i) {
        blendMesh.applyWeight(data.anims[i], data.weights[i]);
    }
}

function onCrossfade(event) {

    var data = event.detail;
    blendMesh.stopAll();
    blendMesh.crossfade(data.from, data.to, data.time);
    isFrameStepping = false;

}

function onWarp(event) {

    var data = event.detail;
    blendMesh.stopAll();
    blendMesh.warp(data.from, data.to, data.time);
    isFrameStepping = false;

}

function onShowSkeleton(event) {

    var shouldShow = event.detail.shouldShow;
    helper.visible = shouldShow;

}

function onShowModel(event) {

    var shouldShow = event.detail.shouldShow;
    blendMesh.showModel(shouldShow);

}
