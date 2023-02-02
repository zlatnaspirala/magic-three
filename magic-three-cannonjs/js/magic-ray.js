

export class Raycaster {

  RECALL = function () {};
  raycaster = new THREE.Raycaster();
  INTERSECTED = 0;
  mouse = new THREE.Vector2();

  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('click', this.onDocumentclick, false);
  }

  onDocumentMouseMove = (event) => {
      event.preventDefault();
      // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  };

  onDocumentclick = (event) => {
      event.preventDefault();
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y =  - (event.clientY / window.innerHeight) * 2 + 1;
      this.INTERSECTED = null;
  };

  updateRay = () => {
      try {
          this.raycaster.setFromCamera(this.mouse, this.camera);
          var intersects = this.raycaster.intersectObjects(this.scene.children, true);
          if (intersects.length > 0) {
              if (this.INTERSECTED != intersects[0].object) {
                  this.INTERSECTED = intersects[0].object;
                  this.RECALL(this.INTERSECTED);
                  console.log( 'recall for ' + this.INTERSECTED.name );
              }
          } else {
              this.INTERSECTED = null;
          }
      } catch (e) {
          console.log("error in raycaster" + e)
      }
  };

   DESTROY = function () {
      document.removeEventListener('mousemove', this.onDocumentMouseMove);
      document.removeEventListener('click', this.onDocumentclick);
      // PROGRAM.AUTO_UPDATE.unset(this); !!!!
  };

}
