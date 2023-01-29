import * as THREE from 'three';

/**
 * @description
 * Only materials
 */

export class myMatCR {

 constructor(path_to_images) {

  this.path_to_images = path_to_images;
  this.urls = [
    this.path_to_images + "px.jpg", this.path_to_images + "nx.jpg",
    this.path_to_images + "py.jpg", this.path_to_images + "ny.jpg",
    this.path_to_images + "pz.jpg", this.path_to_images + "nz.jpg"
  ];

  this.textureCube = new THREE.CubeTextureLoader().load(this.urls);
  this.textureCube.format = THREE.RGBFormat;

  var frontTexture = new THREE.TextureLoader().load(this.path_to_images + "px.jpg");

  this.assets = {
    "front": new THREE.MeshPhongMaterial({
      shininess: 1,
      map: frontTexture
    }),
    "Orange": new THREE.MeshLambertMaterial({
      color: 0xff6600,
      envMap: this.textureCube,
      combine: THREE.MixOperation,
      reflectivity: 0.1
    }),
    "Blue": new THREE.MeshLambertMaterial({
      color: 0x001133,
      envMap: this.textureCube,
      combine: THREE.MixOperation,
      reflectivity: 0.3
    }),
    "Red": new THREE.MeshLambertMaterial({
      color: 0x660000,
      envMap: this.textureCube,
      combine: THREE.MixOperation,
      reflectivity: 0.25
    }),
    "Black": new THREE.MeshLambertMaterial({
      color: 0x000000,
      envMap: this.textureCube,
      combine: THREE.MixOperation,
      reflectivity: 0.15
    }),
    "White": new THREE.MeshLambertMaterial({
      color: 0xffffff,
      envMap: this.textureCube,
      combine: THREE.MixOperation,
      reflectivity: 0.25
    }),
    "Carmine": new THREE.MeshPhongMaterial({
      color: 0x770000,
      specular: 0xffaaaa,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation
    }),
    "Gold": new THREE.MeshPhongMaterial({
      color: 0xaa9944,
      specular: 0xbbaa99,
      shininess: 50,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation
    }),
    "Bronze": new THREE.MeshPhongMaterial({
      color: 0x150505,
      specular: 0xee6600,
      shininess: 10,
      envMap: this.textureCube,
      combine: THREE.MixOperation,
      reflectivity: 0.25
    }),
    "Chrome": new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation
    }),
    "Chrome1": new THREE.MeshPhongMaterial({
      color: 0x696969,
      specular: 0xf8c78d,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation,
      reflectivity: 0.5
    }),
    "Chrome2": new THREE.MeshPhongMaterial({
      color: 0x8f8f8f,
      specular: 0xf8c78d,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation,
      reflectivity: 0.4
    }),
    "Chrome3": new THREE.MeshPhongMaterial({
      color: 0x000000,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation,
      reflectivity: 0.4
    }),
    "Orange_metal": new THREE.MeshLambertMaterial({
      color: 0xff6600,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation
    }),
    "Blue_metal": new THREE.MeshLambertMaterial({
      color: 0x001133,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation
    }),
    "Red_metal": new THREE.MeshLambertMaterial({
      color: 0x770000,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation
    }),
    "Green_metal": new THREE.MeshLambertMaterial({
      color: 0x007711,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation
    }),
    "Black_metal": new THREE.MeshLambertMaterial({
      color: 0x222222,
      envMap: this.textureCube,
      combine: THREE.MultiplyOperation
    }),

    "Pure_chrome": new THREE.MeshLambertMaterial({
      color: 0xffffff,
      envMap: this.textureCube
    }),
    "Dark_chrome": new THREE.MeshLambertMaterial({
      color: 0x444444,
      envMap: this.textureCube
    }),
    "Darker_chrome": new THREE.MeshLambertMaterial({
      color: 0x222222,
      envMap: this.textureCube
    }),

    "Black_glass": new THREE.MeshLambertMaterial({
      color: 0x101016,
      envMap: this.textureCube,
      opacity: 0.975,
      transparent: true
    }),
    "Dark_glass": new THREE.MeshLambertMaterial({
      color: 0x101046,
      envMap: this.textureCube,
      opacity: 0.25,
      transparent: true
    }),
    "Blue_glass": new THREE.MeshLambertMaterial({
      color: 0x668899,
      envMap: this.textureCube,
      opacity: 0.75,
      transparent: true
    }),
    "Light_glass": new THREE.MeshBasicMaterial({
      color: 0x223344,
      envMap: this.textureCube,
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
  }
 }
}