
import * as THREE from 'three';

// init
import { createCamera } from "./src/camera";
import { scene, renderer, draw } from './src/scene';

const camera = createCamera();
camera.position.z = 1;

// CONTENT
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(draw);
document.body.appendChild(renderer.domElement);
