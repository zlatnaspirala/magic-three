
import * as THREE from "three";
import {MathUtils, Quaternion} from "three";
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
  });

  map.objMtls.forEach((obj, index) => {
    this.loader.objMtl(
      obj.path,
      obj.name).then((o) => {
        console.info('Set position after load.', o);
        o.position.set(obj.pos.x, obj.pos.y, obj.pos.z);
      });
  });

  map.objMtlsArray.forEach((obj, index) => {
    this.loader.objMtl(
      obj.path,
      obj.name).then((o) => {

        obj.instances.forEach((oo, index) => {
          let object = o.clone();
          if(index > 0) {
            object.position.set(oo.pos.x, oo.pos.y, oo.pos.z);
            console.warn('ARRAY OF INSTANCES =>', oo);
            if(typeof oo.rot != 'undefined') {
              object.rotateX(MathUtils.degToRad(oo.rot.x));
              object.rotateY(MathUtils.degToRad(oo.rot.y));
              object.rotateZ(MathUtils.degToRad(oo.rot.z));
            }

            var box3 = new THREE.Box3();
            var size = new THREE.Vector3();
            var boxHelper = new THREE.BoxHelper(object);
            box3.setFromObject(boxHelper);
            box3.getSize(size);
            console.log(size);
            this.scene.add(boxHelper);
            console.warn(`load blocking volumes index => ${boxHelper.position.x} => `);
            const m = 0;
            const e = new THREE.Vector3(size.x/2, size.y/2, size.z/2);
            this.pos.set(object.position.x, object.position.y, object.position.z);
            this.quat.set(boxHelper.quaternion._x, boxHelper.quaternion._y, boxHelper.quaternion._z, o.quaternion._w);
             this.createBlockingBox(
              e,
              this.pos,
              this.quat,
              this.materials.assets.basic,
              o.name || 'random-' + MathUtils.randInt(0, 99999),
              false
            );


            this.scene.add(object);
          } else {

            o.position.set(oo.pos.x, oo.pos.y, oo.pos.z);
            if(typeof oo.rot != 'undefined') {
              // o.quaternion.set(MathUtils.degToRad(oo.rot.x), MathUtils.degToRad(oo.rot.y), MathUtils.degToRad(oo.rot.z));
              object.rotateX(MathUtils.degToRad(oo.rot.x));
              object.rotateY(MathUtils.degToRad(oo.rot.y));
              object.rotateZ(MathUtils.degToRad(oo.rot.z));
            }

            var box3 = new THREE.Box3();
            var size = new THREE.Vector3();
            var boxHelper = new THREE.BoxHelper(o);
            box3.setFromObject(boxHelper);
            box3.getSize(size);
            console.log(size);
            this.scene.add(boxHelper);
            console.warn(`load blocking volumes index => ${boxHelper.position.x} => `);
            const m = 0;
            const e = new THREE.Vector3(size.x/2, size.y/2, size.z/2);
            this.pos.set(o.position.x, o.position.y, o.position.z);
            this.quat.set(boxHelper.quaternion._x, boxHelper.quaternion._y, boxHelper.quaternion._z, o.quaternion._w);
             this.createBlockingBox(
              e,
              this.pos,
              this.quat,
              this.materials.assets.basic,
              o.name || 'random-' + MathUtils.randInt(0, 99999),
              false
            );

          }
        });
      });
  });

};
