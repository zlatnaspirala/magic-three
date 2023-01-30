import * as THREE from 'three';
import {getDom, is, getCanvasDom} from "./helper";
import { createCamera } from "./camera";
import {initCannon} from './physics';
import CANNON from 'cannon';
import {myMatCR} from './materials';

import { Capsule, GLTFLoader, Octree , OctreeHelper } from 'three-addons';

export class Magic {

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({antialias: true});
  camera = createCamera();
  mats = new myMatCR("res/images/cube/reflection/");

  constructor(renderSize) {
    this.rootElements = [];

    this.clock = new THREE.Clock();
    this.CANNON_SCENE = new initCannon(this.scene, this.mats);

    if (is(renderSize)) {
      renderer.setSize(renderSize.w, renderSize.h);
    } else {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    document.body.appendChild(this.renderer.domElement);

 


    this.camera.position.z = 1;
    this.scene.background = new THREE.Color( 0x88ccee );
    this.scene.fog = new THREE.Fog( 0x88ccee, 0, 50 );

    
    this.renderer.setAnimationLoop(this.draw);
  }


  autoUpdate = () => {
    var delta = this.clock.getDelta();

    // this.camControls.update(delta);
    this.CANNON_SCENE.AUTO_UPDATE();
  }

  draw = (t) => {
    this.renderer.render(this.scene, this.camera);
    this.autoUpdate();
  }
}
