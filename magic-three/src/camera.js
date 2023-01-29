
import * as THREE from 'three';

/**
 * @description
 * Optimal arg with default values
 */

export const createCamera = (fov = 70, aspect = window.innerWidth / window.innerHeight, near = 0.01, far = 10) => {
  return new THREE.PerspectiveCamera(fov, aspect, near, far);
}