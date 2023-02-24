import {PointerLockControls} from 'three/addons/controls/PointerLockControls.js';

export function createFPSController() {
  this.controls = new PointerLockControls(this.camera, document.body);
  const blocker = document.getElementById('blocker');
  const instructions = document.getElementById('instructions');

  this.controls.JUMP = false;

  instructions.addEventListener('click', () => {
    console.log("LOCK CLICK")
    this.controls.lock();
  });

  this.controls.addEventListener('lock', function() {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
  });

  this.controls.addEventListener('unlock', function() {
    blocker.style.display = 'block';
    instructions.style.display = '';
  });

  this.scene.add(this.controls.getObject());

  const onKeyDown = (event) => {
    switch(event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = true;
        break;
      case 'Space':
        // if(this.canJump === true) this.velocity.y += 350;
        console.log('ssssssssssssssssssssssssss')
        if (this.controls.JUMP == false) {
          this.controls.JUMP = true;
          setTimeout(() => {
            this.controls.JUMP = false
          }, 3000);
        }

        break;
    }

    switch(event.keyCode) {
      // case 87: //W: FORWARD
      //   this.moveDirection.forward = 1
      //   break;

      // case 83: //S: BACK
      //   this.moveDirection.back = 1
      //   break;

      // case 65: //A: LEFT
      //   this.moveDirection.left = 1
      //   break;

      // case 68: //D: RIGHT
      //   this.moveDirection.right = 1
      //   break;

      case 38: //↑: FORWARD
        this.kMoveDirection.forward = 1
        break;

      case 40: //↓: BACK
        this.kMoveDirection.back = 1
        break;

      case 37: //←: LEFT
        this.kMoveDirection.left = 1
        break;

      case 39: //→: RIGHT
        this.kMoveDirection.right = 1
        break;

    }

  };

  const onKeyUp = (event) => {
    switch(event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = false;
        break;
    }

    switch(event.keyCode) {
      // case 87: //FORWARD
      //   this.moveDirection.forward = 0
      //   break;

      // case 83: //BACK
      //   this.moveDirection.back = 0
      //   break;

      // case 65: //LEFT
      //   this.moveDirection.left = 0
      //   break;

      // case 68: //RIGHT
      //   this.moveDirection.right = 0
      //   break;

      case 38: //↑: FORWARD
        this.kMoveDirection.forward = 0
        break;

      case 40: //↓: BACK
        this.kMoveDirection.back = 0
        break;

      case 37: //←: LEFT
        this.kMoveDirection.left = 0
        break;

      case 39: //→: RIGHT
        this.kMoveDirection.right = 0
        break;
    }
  };
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}
