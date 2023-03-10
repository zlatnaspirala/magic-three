
import * as THREE from "three";
import {MathUtils} from "three";
import map from "../assets/maps/free-for-all.js";

// This is binded funcs - this refered to the mani app class.
export function loadMap() {

  map.breakable.forEach((b, index) => {
    console.info(`load dynamic boxs index => ${this} this 2test => `, b);
    const m = b.mass;
    const e = new THREE.Vector3(b.scale.x, b.scale.y, b.scale.z);
    this.pos.set(b.pos.x, b.pos.y, b.pos.z);
    this.quat.set(b.quat[0], b.quat[1], b.quat[2], b.quat[3]);
    this.createBreakableBox(
      m,
      e,
      this.pos,
      this.quat,
      this.materials.assets.defaultGlass,
      b.name
    );
  });

  map.boxs.forEach((b, index) => {
    console.info(`load dynamic boxs index => ${index} this test => `, b);
    const m = b.mass;
    const e = new THREE.Vector3(b.scale.x, b.scale.y, b.scale.z);
    this.pos.set(b.pos.x, b.pos.y, b.pos.z);
    this.quat.set(b.quat[0], b.quat[1], b.quat[2], b.quat[3]);
    this.createSimpleBox(
      m,
      e,
      this.pos,
      this.quat,
      this.materials.assets.default,
      b.name || 'random-' + MathUtils.randInt(0, 99999),
      b.net || false,
      b.matFlag || false
    );
  });

  map.tubes.forEach((b, index) => {
    this.pos.set(b.pos.x, b.pos.y, b.pos.z);
    this.quat.set(b.quat[0], b.quat[1], b.quat[2], b.quat[3]);
    this.createCilinder(
      b.mass,
      [b.scale[0], b.scale[1], b.scale[2], b.scale[3]],
      this.pos,
      this.quat,
      this.materials.assets.defaultGlass,
      b.name
    );
  });

  map.torus.forEach((b, index) => {
    this.pos.set(b.pos.x, b.pos.y, b.pos.z);
    this.quat.set(b.quat[0], b.quat[1], b.quat[2], b.quat[3]);
    this.createTorus(
      b.mass,
      [b.scale[0], b.scale[1], b.scale[2], b.scale[3]],
      this.pos,
      this.quat,
      this.materials.assets.Bronze,
      b.name
    );
  });

  map.pointLights.forEach((l, index) => {
    console.info(`load map point lights index => ${index}  => `, l);
    // this.pos.set(b.pos.x, b.pos.y, b.pos.z);
    let light = new THREE.PointLight(l.color, l.radius, l.intensity);
    light.position.set(l.pos.x, l.pos.y, l.pos.y);
    const sphere = new THREE.SphereGeometry(0.5, 8, 4);
    if(typeof l.helper !== 'undefined' && l.helper == true) light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: l.color})));

    this.scene.add(light);

  })


};
