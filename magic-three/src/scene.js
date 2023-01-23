
export const scene = new THREE.Scene();

export const renderer = new THREE.WebGLRenderer({antialias: true});

export function draw(time) {

  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);

}

export class Magic {

  constructor() {
    this.elements = [];
  }

  draw = (t) => {}
}
