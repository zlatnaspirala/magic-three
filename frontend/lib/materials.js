
function MATERIALS() {

    var ROOT = this;

    var path = "res/textures/reflection/";
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];

    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    reflectionCube.format = THREE.RGBFormat;

    var refractionCube = new THREE.CubeTextureLoader().load(urls);
    refractionCube.mapping = THREE.CubeRefractionMapping;
    refractionCube.format = THREE.RGBFormat;

    ROOT.cubeMaterial3 = new THREE.MeshLambertMaterial({
            color: 0xff6600,
            envMap: reflectionCube,
            combine: THREE.MixOperation,
            reflectivity: 0.3
        });
    ROOT.cubeMaterial2 = new THREE.MeshLambertMaterial({
            color: 0xffee00,
            envMap: refractionCube,
            refractionRatio: 0.95
        });
    ROOT.cubeMaterial1 = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            envMap: reflectionCube
        });

    var map = new THREE.TextureLoader().load('res/textures/freesource/pattern1.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    //map.anisotropy = 16;
    ROOT.materialLambertDouble = new THREE.MeshLambertMaterial({
            map: map,
            side: THREE.DoubleSide
        });

    var host_tex = new THREE.TextureLoader().load('res/textures/freesource/host.jpg');
    ROOT.materialLambertDoubleHostBTN = new THREE.MeshLambertMaterial({
            map: host_tex,
            side: THREE.DoubleSide
        });

    var host_tex = new THREE.TextureLoader().load('res/textures/freesource/join.jpg');
    ROOT.materialLambertDoubleJoinBTN = new THREE.MeshLambertMaterial({
            map: host_tex,
            side: THREE.DoubleSide
        });

    var gt = new THREE.TextureLoader().load("res/textures/ground/ground2.jpg");

    ROOT.PhongMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: gt
        });
    ROOT.LambertMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            map: gt
        });

    ROOT.materials_asset = [];

    ROOT.CREATE_CUBE_REFRACTION = function (path_to_images, nameOfThis_materialGroup) {

        var ROOT = this;

        ROOT.path_to_images = path_to_images;
        ROOT.urls = [
            ROOT.path_to_images + "px.jpg", ROOT.path_to_images + "nx.jpg",
            ROOT.path_to_images + "py.jpg", ROOT.path_to_images + "ny.jpg",
            ROOT.path_to_images + "pz.jpg", ROOT.path_to_images + "nz.jpg"
        ];

        ROOT.textureCube = new THREE.CubeTextureLoader().load(ROOT.urls);
        ROOT.textureCube.format = THREE.RGBFormat;

        var frontTexture = new THREE.TextureLoader().load(ROOT.path_to_images + "px.jpg");

        ROOT[nameOfThis_materialGroup] = {

            "front": new THREE.MeshPhongMaterial({
                shininess: 1,
                map: frontTexture
            }),
            "Orange": new THREE.MeshLambertMaterial({
                color: 0xff6600,
                envMap: ROOT.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.1
            }),
            "Blue": new THREE.MeshLambertMaterial({
                color: 0x001133,
                envMap: ROOT.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.3
            }),
            "Red": new THREE.MeshLambertMaterial({
                color: 0x660000,
                envMap: ROOT.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.25
            }),
            "Black": new THREE.MeshLambertMaterial({
                color: 0x000000,
                envMap: ROOT.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.15
            }),
            "White": new THREE.MeshLambertMaterial({
                color: 0xffffff,
                envMap: ROOT.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.25
            }),

            "Carmine": new THREE.MeshPhongMaterial({
                color: 0x770000,
                specular: 0xffaaaa,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Gold": new THREE.MeshPhongMaterial({
                color: 0xaa9944,
                specular: 0xbbaa99,
                shininess: 50,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Bronze": new THREE.MeshPhongMaterial({
                color: 0x150505,
                specular: 0xee6600,
                shininess: 10,
                envMap: ROOT.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.25
            }),
            "Chrome": new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0xffffff,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Chrome1": new THREE.MeshPhongMaterial({
                color: 0x696969,
                specular: 0xf8c78d,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation,
                reflectivity: 0.5
            }),
            "Chrome2": new THREE.MeshPhongMaterial({
                color: 0x8f8f8f,
                specular: 0xf8c78d,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation,
                reflectivity: 0.4
            }),
            "Chrome3": new THREE.MeshPhongMaterial({
                color: 0x000000,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation,
                reflectivity: 0.4
            }),

            "Orange_metal": new THREE.MeshLambertMaterial({
                color: 0xff6600,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Blue_metal": new THREE.MeshLambertMaterial({
                color: 0x001133,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Red_metal": new THREE.MeshLambertMaterial({
                color: 0x770000,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Green_metal": new THREE.MeshLambertMaterial({
                color: 0x007711,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Black_metal": new THREE.MeshLambertMaterial({
                color: 0x222222,
                envMap: ROOT.textureCube,
                combine: THREE.MultiplyOperation
            }),

            "Pure_chrome": new THREE.MeshLambertMaterial({
                color: 0xffffff,
                envMap: ROOT.textureCube
            }),
            "Dark_chrome": new THREE.MeshLambertMaterial({
                color: 0x444444,
                envMap: ROOT.textureCube
            }),
            "Darker_chrome": new THREE.MeshLambertMaterial({
                color: 0x222222,
                envMap: ROOT.textureCube
            }),

            "Black_glass": new THREE.MeshLambertMaterial({
                color: 0x101016,
                envMap: ROOT.textureCube,
                opacity: 0.975,
                transparent: true
            }),
            "Dark_glass": new THREE.MeshLambertMaterial({
                color: 0x101046,
                envMap: ROOT.textureCube,
                opacity: 0.25,
                transparent: true
            }),
            "Blue_glass": new THREE.MeshLambertMaterial({
                color: 0x668899,
                envMap: ROOT.textureCube,
                opacity: 0.75,
                transparent: true
            }),
            "Light_glass": new THREE.MeshBasicMaterial({
                color: 0x223344,
                envMap: ROOT.textureCube,
                opacity: 0.25,
                transparent: true,
                combine: THREE.MixOperation,
                reflectivity: 0.25
            }),

            "Red_glass": new THREE.MeshLambertMaterial({
                color: 0xff0000,
                opacity: 0.75,
                transparent: true
            }),
            "Yellow_glass": new THREE.MeshLambertMaterial({
                color: 0xffffaa,
                opacity: 0.75,
                transparent: true
            }),
            "Orange_glass": new THREE.MeshLambertMaterial({
                color: 0x995500,
                opacity: 0.75,
                transparent: true
            }),

            "Orange_glass_50": new THREE.MeshLambertMaterial({
                color: 0xffbb00,
                opacity: 0.5,
                transparent: true
            }),
            "Red_glass_50": new THREE.MeshLambertMaterial({
                color: 0xff0000,
                opacity: 0.5,
                transparent: true
            }),

            "Fullblack_rough": new THREE.MeshLambertMaterial({
                color: 0x000000
            }),
            "Black_rough": new THREE.MeshLambertMaterial({
                color: 0x050505
            }),
            "Darkgray_rough": new THREE.MeshLambertMaterial({
                color: 0x090909
            }),
            "Red_rough": new THREE.MeshLambertMaterial({
                color: 0x330500
            }),

            "Darkgray_shiny": new THREE.MeshPhongMaterial({
                color: 0x000000,
                specular: 0x050505
            }),
            "Gray_shiny": new THREE.MeshPhongMaterial({
                color: 0x050505,
                shininess: 20
            })

        };

    }

    ROOT.CREATE_CUBE_REFRACTION_ONE_IMAGE = function (path_to_images, nameOfThis_materialGroup) {

        var ROOT2 = this;
        ROOT2.path_to_images = path_to_images;
        ROOT2.urls = [

            ROOT2.path_to_images + ".png", ROOT2.path_to_images + ".png",
            ROOT2.path_to_images + ".png", ROOT2.path_to_images + ".png",
            ROOT2.path_to_images + ".png", ROOT2.path_to_images + ".png"
        ];

        ROOT2.textureCube = new THREE.CubeTextureLoader().load(ROOT2.urls);
        ROOT2.textureCube.format = THREE.RGBFormat;

        var frontTexture = new THREE.TextureLoader().load(ROOT2.path_to_images);

        ROOT[nameOfThis_materialGroup] = {

            "front": new THREE.MeshPhongMaterial({
                shininess: 1,
                map: frontTexture
            }),
            "Orange": new THREE.MeshLambertMaterial({
                color: 0xff6600,
                envMap: ROOT2.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.1
            }),
            "Blue": new THREE.MeshLambertMaterial({
                color: 0x001133,
                envMap: ROOT2.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.3
            }),
            "Red": new THREE.MeshLambertMaterial({
                color: 0x660000,
                envMap: ROOT2.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.25
            }),
            "Black": new THREE.MeshLambertMaterial({
                color: 0x000000,
                envMap: ROOT2.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.15
            }),
            "White": new THREE.MeshLambertMaterial({
                color: 0xffffff,
                envMap: ROOT2.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.25
            }),

            "Carmine": new THREE.MeshPhongMaterial({
                color: 0x770000,
                specular: 0xffaaaa,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Gold": new THREE.MeshPhongMaterial({
                color: 0xaa9944,
                specular: 0xbbaa99,
                shininess: 50,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Bronze": new THREE.MeshPhongMaterial({
                color: 0x150505,
                specular: 0xee6600,
                shininess: 10,
                envMap: ROOT2.textureCube,
                combine: THREE.MixOperation,
                reflectivity: 0.25
            }),
            "Chrome": new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0xffffff,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Chrome1": new THREE.MeshPhongMaterial({
                color: 0x696969,
                specular: 0xf8c78d,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation,
                reflectivity: 0.5
            }),
            "Chrome2": new THREE.MeshPhongMaterial({
                color: 0x8f8f8f,
                specular: 0xf8c78d,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation,
                reflectivity: 0.4
            }),
            "Chrome3": new THREE.MeshPhongMaterial({
                color: 0x000000,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation,
                reflectivity: 0.4
            }),

            "Orange_metal": new THREE.MeshLambertMaterial({
                color: 0xff6600,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Blue_metal": new THREE.MeshLambertMaterial({
                color: 0x001133,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Red_metal": new THREE.MeshLambertMaterial({
                color: 0x770000,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Green_metal": new THREE.MeshLambertMaterial({
                color: 0x007711,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation
            }),
            "Black_metal": new THREE.MeshLambertMaterial({
                color: 0x222222,
                envMap: ROOT2.textureCube,
                combine: THREE.MultiplyOperation
            }),

            "Pure_chrome": new THREE.MeshLambertMaterial({
                color: 0xffffff,
                envMap: ROOT2.textureCube
            }),
            "Dark_chrome": new THREE.MeshLambertMaterial({
                color: 0x444444,
                envMap: ROOT2.textureCube
            }),
            "Darker_chrome": new THREE.MeshLambertMaterial({
                color: 0x222222,
                envMap: ROOT2.textureCube
            }),

            "Black_glass": new THREE.MeshLambertMaterial({
                color: 0x101016,
                envMap: ROOT2.textureCube,
                opacity: 0.975,
                transparent: true
            }),
            "Dark_glass": new THREE.MeshLambertMaterial({
                color: 0x101046,
                envMap: ROOT2.textureCube,
                opacity: 0.25,
                transparent: true
            }),
            "Blue_glass": new THREE.MeshLambertMaterial({
                color: 0x668899,
                envMap: ROOT2.textureCube,
                opacity: 0.75,
                transparent: true
            }),
            "Light_glass": new THREE.MeshBasicMaterial({
                color: 0x223344,
                envMap: ROOT2.textureCube,
                opacity: 0.25,
                transparent: true,
                combine: THREE.MixOperation,
                reflectivity: 0.25
            }),

            "Red_glass": new THREE.MeshLambertMaterial({
                color: 0xff0000,
                opacity: 0.75,
                transparent: true
            }),
            "Yellow_glass": new THREE.MeshLambertMaterial({
                color: 0xffffaa,
                opacity: 0.75,
                transparent: true
            }),
            "Orange_glass": new THREE.MeshLambertMaterial({
                color: 0x995500,
                opacity: 0.75,
                transparent: true
            }),

            "Orange_glass_50": new THREE.MeshLambertMaterial({
                color: 0xffbb00,
                opacity: 0.5,
                transparent: true
            }),
            "Red_glass_50": new THREE.MeshLambertMaterial({
                color: 0xff0000,
                opacity: 0.5,
                transparent: true
            }),

            "Fullblack_rough": new THREE.MeshLambertMaterial({
                color: 0x000000
            }),
            "Black_rough": new THREE.MeshLambertMaterial({
                color: 0x050505
            }),
            "Darkgray_rough": new THREE.MeshLambertMaterial({
                color: 0x090909
            }),
            "Red_rough": new THREE.MeshLambertMaterial({
                color: 0x330500
            }),

            "Darkgray_shiny": new THREE.MeshPhongMaterial({
                color: 0x000000,
                specular: 0x050505
            }),
            "Gray_shiny": new THREE.MeshPhongMaterial({
                color: 0x050505,
                shininess: 20
            })

        };

    }

}

var RM = new MATERIALS();
var s = new RM.CREATE_CUBE_REFRACTION("res/textures/reflection1/", 'COLORFUN');
