import {PointerLockControls} from 'three/addons/controls/PointerLockControls.js';
import * as PointerLockControlsMobile from 'three/addons/controls/mobileController.js';
import {ANYLOG, byId, isMobile} from './utility';

export function createFPSController() {
  if(isMobile == false) {
    this.controls = new PointerLockControls(this.camera, document.body);
  } else {
    this.controls = new PointerLockControlsMobile.PointerLockControls(this.camera, document.body);
  }

  const blocker = document.getElementById('blocker');
  const instructions = document.getElementById('instructions');

  this.controls.minPolarAngle = 0;
  this.controls.maxPolarAngle = Math.PI / 2;

  this.controls.JUMP = false;
  this.controls.PREVENT_INPUT_JUMP = false;

  var CLICK = 'click';
  if(isMobile == true) {
    console.log('%c MOBILE DEVICE ☢️', ANYLOG)
    CLICK = 'touchstart';
  }

  instructions.addEventListener(CLICK, () => {
    // console.log("LOCK ACTION")
    if(isMobile == false) {
      this.controls.lock();
    } else {
      instructions.style.display = 'none';
      blocker.style.display = 'none';

      byId('mobSpace').style.display = 'grid';
      byId('domAngleAxis').style.display = 'grid';
    }
  });

  this.controls.addEventListener('lock', ()=> {
    // alert('LOCK WORKS ON MOBILE')
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

    var canvasDOM = document.getElementsByTagName('canvas')[0];

    canvasDOM.addEventListener('touchend', (e) => {
      this.moveLeft = false;
      this.moveRight = false;
      this.moveBackward = false;
      if(this.config.playerController.alwaysRun == false) this.moveForward = false;
    })

    var actionSpace = () => {
      if(this.controls.PREVENT_INPUT_JUMP == false) {
        this.controls.JUMP = true;
        this.controls.PREVENT_INPUT_JUMP = true;
        setTimeout(() => {
          this.controls.PREVENT_INPUT_JUMP = false;
        }, this.config.playerController.movementSpeed.jumpLimitInterval);
      }
    }

    var _;
    canvasDOM.addEventListener('touchstart', (e) => {
      var firstTouch = e.changedTouches[0];
      if(this.config.playerController.mobile.hudControls == false &&
        this.config.playerController.mobile.invisibleControls == true) {
        var now = new Date().getTime();
        var delta = now - _;
        if((delta < 500) && (delta > 0)) {
          // double click - space
          actionSpace()
          return;
        } else {}
        _ = new Date().getTime();
        if(firstTouch.clientY > window.innerHeight / 100 * 70) {
          if(firstTouch.clientX < window.innerWidth / 100 * 30) {
            this.moveLeft = true;
          } else if(firstTouch.clientX > window.innerWidth / 100 * 70) {
            this.moveRight = true;
          } else {
            this.moveBackward = true;
          }
        }
        if(firstTouch.clientY < window.innerHeight / 100 * 50) {
          this.moveForward = true;
        }
      }
    })

    if(this.config.playerController.mobile.hudControls == true) {
      var domSpace = document.createElement('div');
      domSpace.id = 'mobSpace';
      domSpace.setAttribute('style', `
        text-align: center;
        display: none;
        position:absolute;
        left: 80%;
        top: 80%;
        width: 14%;
        height: 4%;
        background: rgba(255,255,255,0.2);
        margin: auto;
        align-items: center;
      `)
      domSpace.innerText = `JUMP`;
      domSpace.addEventListener('touchstart', (e) => {
        actionSpace()
      })
      document.body.append(domSpace)

      var domAngleAxis = document.createElement('div');
      domAngleAxis.id = 'domAngleAxis';
      domAngleAxis.setAttribute('style', `
        text-align: center;
        display: none;
        position:absolute;
        left: 10%;
        top: 85%;
        width: 24%;
        height: 24%;
        background: rgba(255,255,255,0.2);
        margin: auto;
        align-items: center;
      `)
      domAngleAxis.innerHTML = `
        
      `;
      domAngleAxis.addEventListener('touchstart', (e) => {
        // actionSpace()
      })
      document.body.append(domAngleAxis)

    }

  }
}
