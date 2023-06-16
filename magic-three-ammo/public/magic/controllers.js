import {PointerLockControls} from 'three/addons/controls/PointerLockControls.js';
import * as PointerLockControlsMobile from 'three/addons/controls/mobileController.js';

import {isMobile} from './utility';

export function createFPSController() {

  if (isMobile == false) {
    this.controls = new PointerLockControls(this.camera, document.body);
  } else {
    this.controls = new PointerLockControlsMobile.PointerLockControls(this.camera, document.body);
  }

  const blocker = document.getElementById('blocker');
  const instructions = document.getElementById('instructions');

  this.controls.minPolarAngle = 0; // radians
  this.controls.maxPolarAngle = Math.PI / 2; // radians

  this.controls.JUMP = false;
  this.controls.PREVENT_INPUT_JUMP = false;

  var CLICK = 'click';
  if(isMobile == true) {
    console.log('MOBILE DEVICE')
    CLICK = 'touchstart';
  }

  instructions.addEventListener(CLICK, () => {
    console.log("LOCK ACTION")
    if (isMobile == false) {
      this.controls.lock();
    } else {
      instructions.style.display = 'none';
      blocker.style.display = 'none';
    }
  });

  this.controls.addEventListener('lock', function() {
    alert('LOCK WORKS ON MOBILE')
    instructions.style.display = 'none';
    blocker.style.display = 'none';
  });

  this.controls.addEventListener('unlock', function() {
    blocker.style.display = 'block';
    instructions.style.display = '';
  });

  this.scene.add(this.controls.getObject());

  if(isMobile == false) {
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
          if(this.controls.PREVENT_INPUT_JUMP == false) {
            this.controls.JUMP = true;
            this.controls.PREVENT_INPUT_JUMP = true;
            setTimeout(() => {
              this.controls.PREVENT_INPUT_JUMP = false;
            }, this.config.playerController.movementSpeed.jumpLimitInterval);
          }
          break;
      }

      switch(event.keyCode) {
        case 38: //↑: FORWARD
          this.kMoveDirection.forward = 1;
          break;

        case 40: //↓: BACK
          this.kMoveDirection.back = 1;
          break;

        case 37: //←: LEFT
          this.kMoveDirection.left = 1;
          break;

        case 39: //→: RIGHT
          this.kMoveDirection.right = 1;
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
  } else {

    document.addEventListener('touchmove', (e) => {
      var firstTouch = e.changedTouches[0];
      
      // return ;
      if (firstTouch.clientY > window.innerHeight /100*70) {
        if (firstTouch.clientX < window.innerWidth /100*30) {
          console.log(' LEFT  ???? ', this.moveLeft );
          this.moveLeft = true;
        
        } else if (firstTouch.clientX > window.innerWidth /100*70) {
          this.moveRight = true;
          console.log(' RIGHT  ');
        } else {
          this.moveBackward = true;
          console.log(' BACK  ');
        }
      }

      if (firstTouch.clientY < window.innerHeight /100*50) {
        this.moveForward = true;
        console.log(' FORWAND ');
      }

      return;
      //   case 'ArrowUp':
      //   case 'KeyW':
      //     this.moveForward = true;
      //     break;
      //   case 'ArrowLeft':
      //   case 'KeyA':
      //     this.moveLeft = true;
      //     break;
      //   case 'ArrowDown':
      //   case 'KeyS':
      //     this.moveBackward = true;
      //     break;
      //   case 'ArrowRight':
      //   case 'KeyD':
      //     this.moveRight = true;
      //     break;
      //   case 'Space':
      //     if(this.controls.PREVENT_INPUT_JUMP == false) {
      //       this.controls.JUMP = true;
      //       this.controls.PREVENT_INPUT_JUMP = true;
      //       setTimeout(() => {
      //         this.controls.PREVENT_INPUT_JUMP = false;
      //       }, this.config.playerController.movementSpeed.jumpLimitInterval);
      //     }
      //     break;
      // }
    })

  }
}
