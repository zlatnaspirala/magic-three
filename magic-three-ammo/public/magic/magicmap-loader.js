
import * as THREE from "three";
import map from "../assets/maps/free-for-all.js";

// This is binded funcs
export function loadMap() {

  console.log('TEST MAP LOADER. map => ', map);

  map.breakable.forEach((b, index) => {
    console.info(`load breakable index => ${index} item => `, b);
    const m = b.mass;
    const e = new THREE.Vector3(b.scale.x, b.scale.y, b.scale.z);
    this.pos.set(b.pos.x, b.pos.y, b.pos.z);
    this.quat.set(b.quat[0], b.quat[1], b.quat[2], b.quat[3]);
    this.createBreakableBox(
      m,
      e,
      this.pos,
      this.quat,
      App.materials.assets.Yellow_glass
    );
  });

  map.boxs.forEach((b, index) => {
    console.info(`load dynamic boxs index => ${index} item => `, b);
    const m = b.mass;
    const e = new THREE.Vector3(b.scale.x, b.scale.y, b.scale.z);
    this.pos.set(b.pos.x, b.pos.y, b.pos.z);
    this.quat.set(b.quat[0], b.quat[1], b.quat[2], b.quat[3]);
    this.createSimpleBox(
      m,
      e,
      this.pos,
      this.quat,
      App.materials.assets.Yellow_glass
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
      App.materials.assets.Yellow_glass
    );

  })

};
