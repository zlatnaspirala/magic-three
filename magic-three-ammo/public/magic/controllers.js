import {PointerLockControls} from 'three/addons/controls/PointerLockControls.js';
import * as PointerLockControlsMobile from 'three/addons/controls/mobileController.js';
import {ANYLOG, byId, isMobile, toUnicodeVariant} from './utility.js';

export function createFPSController() {

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

    var domRight = document.createElement('div');
    domRight.id = 'mobRight';
    domRight.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 85%;
      top: 90%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.2);
      margin: auto;
      align-items: center;
    `)
    domRight.innerText = `RIGHT`;
    domRight.addEventListener('touchstart', (e) => {
      console.log('TEST RIGHT')
      this.moveRight = true;
    })
    domRight.addEventListener('touchend', (e) => {
      this.moveRight = false;
    })
    document.body.append(domRight)

    var domLeft = document.createElement('div');
    domLeft.id = 'mobLeft';
    domLeft.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 70%;
      top: 90%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.2);
      margin: auto;
      align-items: center;
    `)
    domLeft.innerText = `LEFT`;
    domLeft.addEventListener('touchstart', (e) => {
      // actionSpace()
      console.log('TEST domLeft')
      this.moveLeft = true;
    })
    domLeft.addEventListener('touchend', (e) => {
      this.moveLeft = false;
    })
    document.body.append(domLeft)

    var domUp = document.createElement('div');
    domUp.id = 'mobUp';
    domUp.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 78%;
      top: 86%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.2);
      margin: auto;
      align-items: center;
    `)
    domUp.innerText = `UP`;
    domUp.addEventListener('touchstart', (e) => {
      // actionSpace()
      console.log('TEST domUp')
      this.moveForward = true;
    })
    domUp.addEventListener('touchend', (e) => {
      this.moveForward = false;
    })
    document.body.append(domUp)

    var domDown = document.createElement('div');
    domDown.id = 'mobDown';
    domDown.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 78%;
      top: 94%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.1);
      margin: auto;
      align-items: center;
    `)
    domDown.innerText = `DOWN`;
    domDown.addEventListener('touchstart', (e) => {
      this.moveBackward = true;
    })
    domDown.addEventListener('touchend', (e) => {
      this.moveBackward = false;
    })
    document.body.append(domDown)

    var domAngleAxis = document.createElement('div');
    domAngleAxis.id = 'domAngleAxis';
    domAngleAxis.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 9%;
      top: 82%;
      width: 28%;
      height: 28%;
      background: rgba(255,255,255,0.1);
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


  if(isMobile == false) {
    this.controls = new PointerLockControls(this.camera, document.body);
  } else {
    this.controls = new PointerLockControlsMobile.PointerLockControls(this.camera, document.body);
  }

  const blocker = document.getElementById('blocker');
  const instructions = document.getElementById('instructions');

  addEventListener('hide-blocker', () => {
    setTimeout(() => {
      instructions.style.display = 'none';
      blocker.style.display = 'none';
      blocker.classList.add('bounceIn')
      blocker.classList.remove('hideMe')
    }, 500)
  })
  this.controls.minPolarAngle = 0;
  this.controls.maxPolarAngle = Math.PI / 2;

  this.controls.JUMP = false;
  this.controls.PREVENT_INPUT_JUMP = false;

  var CLICK = 'click';
  if(isMobile == true) {
    console.log('%c MOBILE DEVICE ☢️', ANYLOG)
    CLICK = 'touchstart';
  }

  const aboutBtn = document.getElementById('aboutBtn');
  aboutBtn.addEventListener("click", () => {
    console.log('your chance is: ' + toUnicodeVariant('100% free project at https://github.com/zlatnaspirala/magic-three', 'bold WARGAMES', 'bold'));
    alert(`${toUnicodeVariant(`HANG3D REBORN ☢️ \n
        Magic-Three is threejs vs ammojs project.
        HANG3D REBORN is FPS example with networking. ☢️\n
        Credits && Licence
          - https://threejs.org/
          - https://github.com/kripken/ammo.js/
          - In Assets i use great https://mixamo.com/
          - Mobile controller used from 
            https://github.com/KEY4d-LAB/crypto-art-town
          - Networking based on https://github.com/muaz-khan/RTCMultiConnection
          - Font wargames used from https://www.dafont.com/wargames.font \n
          Source code : https://github.com/zlatnaspirala/magic-three
        Hosted on maximumroulette.com \n`, 'bold sans', 'bold')}
      `)
  })

  const videoChatBtn = document.getElementById('videoChatBtn');
  videoChatBtn.addEventListener("click", (e) => {
    console.log('ACTIVATE CAMERA: to the other side', e.target.innerHTML);
    // if(App.net.connection.session.video == true) {
      byId('matrix-net').style.display = 'block';
      App.net.titleStatus.click();
      // App.net.connection.session.video = false;
      // App.net.joinRoomBtn.click();
      e.target.innerHTML = "NET ⚪"
    // } else {
    //   byId('matrix-net').style.display = 'block';
    //   App.net.titleStatus.click();
    //   // App.net.connection.session.video = true
    //   // App.net.joinRoomBtn.click();
    //   // e.target.innerHTML = "CAMERA 🔴"
    // }
  })

  const playBtn = document.getElementById('playBtn');
  playBtn.addEventListener(CLICK, () => {
    console.log("UNLOCK")
    this.LOCK = false;
    if(isMobile == false) {
      this.controls.lock();
    } else {

      blocker.classList.remove('bounceIn')
      blocker.classList.add('hideMe')

      dispatchEvent(new CustomEvent('hide-blocker'))

      byId('mobSpace').style.display = 'grid';
      byId('mobRight').style.display = 'grid';
      byId('mobLeft').style.display = 'grid';
      byId('mobUp').style.display = 'grid';
      byId('mobDown').style.display = 'grid';
      byId('domAngleAxis').style.display = 'grid';
    }
  });

  this.controls.addEventListener('lock', () => {
    console.log('LOCK')
    this.LOCK = true;
    blocker.classList.remove('bounceIn')
    blocker.classList.add('hideMe')
    dispatchEvent(new CustomEvent('hide-blocker'))
  });

  this.controls.addEventListener('unlock', () => {
    console.log('UNLOCK')
    this.LOCK = false;
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
      if(this.config.playerController.mobile.hudControls == false) {
        var now = new Date().getTime()
        var delta = now - _;
        if((delta < 500) && (delta > 0)) {
          // double click - space
          actionSpace()
          return;
        } else {}
        _ = new Date().getTime()
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

  }
}
