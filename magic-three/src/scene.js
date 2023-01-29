import * as THREE from 'three';
import {is} from "./helper";
import { createCamera } from "./camera";
import {initCannon} from './physics';
import CANNON from 'cannon';
import {myMatCR} from './materials';

import { Octree } from 'three/addons/math/Octree.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';

export class Magic {

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({antialias: true});
  camera = createCamera();
  mats = new myMatCR("res/images/cube/reflection/");

  constructor(renderSize) {
    this.rootElements = [];

    this.CANNON_SCENE = new initCannon(this.scene, this.mats);

    if (is(renderSize)) {
      renderer.setSize(renderSize.w, renderSize.h);
    } else {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }


    // test 
    const fillLight1 = new THREE.HemisphereLight( 0x4488bb, 0x002244, 0.5 );
			fillLight1.position.set( 2, 1, 1 );
			scene.add( fillLight1 );
      
    this.camera.position.z = 1;
    this.scene.background = new THREE.Color( 0x88ccee );
    this.scene.fog = new THREE.Fog( 0x88ccee, 0, 50 );

    document.body.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(this.draw);
  }


  autoUpdate = () => {
    this.CANNON_SCENE.AUTO_UPDATE();
  }

  draw = (t) => {
    this.renderer.render(this.scene, this.camera);
    this.autoUpdate();
  }
}
