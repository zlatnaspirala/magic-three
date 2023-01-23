
import * as THREE from 'three';

/**
 * @description
 * Optimal arg with default values
 */
// export const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);

export const createCamera = (fov = 70, aspect = window.innerWidth / window.innerHeight, near = 0.01, far = 10) => {
  return new THREE.PerspectiveCamera(fov, aspect, near, far);
}