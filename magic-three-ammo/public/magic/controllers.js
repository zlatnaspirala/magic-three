import {PointerLockControls} from 'three/addons/controls/PointerLockControls.js';
import * as PointerLockControlsMobile from 'three/addons/controls/mobileController.js';
import {ANYLOG, BIGLOG, byId, fullScreen, isAndroid, isMobile, isTouchableDevice, REDLOG, toUnicodeVariant} from './utility.js';

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
      width: ${this.config.playerController.mobile.hudBtnsWidth};
      height: ${this.config.playerController.mobile.hudBtnsHeight};
      background: rgba(255,255,255,0.2);
      background-image: url(assets/icons/down.png);
      margin: auto;
      align-items: center;
    `)
    domSpace.innerText = `JUMP`;
    domSpace.addEventListener('touchstart', (e) => {
      e.preventDefault();
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
      e.preventDefault();
      console.log('TEST RIGHT')
      this.moveRight = true;
    })
    domRight.addEventListener('touchend', (e) => {
      e.preventDefault();
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
      e.preventDefault();
      console.log('TEST domLeft')
      this.moveLeft = true;
    })
    domLeft.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.moveLeft = false;
    })
    document.body.append(domLeft)

    // test fire
    var domFire = document.createElement('div');
    domFire.id = 'domFire';
    domFire.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 60%;
      top: 80%;
      width: 13%;
      height: 6%;
      background: rgba(255,155,155,0.2);
      margin: auto;
      align-items: center;
    `)
    domFire.innerText = `FIRE`;
    domFire.addEventListener('touchstart', (e) => {
      e.preventDefault();
      console.log('TEST FIRE MOB')
      dispatchEvent(new CustomEvent(`onFireProcedure`, {}))
      // this.moveLeft = true;
    })
    domFire.addEventListener('touchend', (e) => {
      e.preventDefault();
      // this.moveLeft = false;
    })
    document.body.append(domFire)

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
      e.preventDefault();
      console.log('TEST domUp')
      this.moveForward = true;
    })
    domUp.addEventListener('touchend', (e) => {
      e.preventDefault();
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
      e.preventDefault();
      this.moveBackward = true;
    })
    domDown.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.moveBackward = false;
    })
    document.body.append(domDown)

    var domAngleAxis = document.createElement('div');
    domAngleAxis.id = 'domAngleAxis';
    domAngleAxis.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 4%;
      top: 74.5%;
      width: 46%;
      height: 23%;
      background: var(--bgRadial1);
      margin: auto;
      align-items: center;
      opacity:0.3;
    `)
    domAngleAxis.innerHTML = `
    
    `;
    domAngleAxis.addEventListener('touchstart', (e) => {
      e.preventDefault();
      // actionSpace()
    })
    document.body.append(domAngleAxis)
  }

  if(isTouchableDevice() == false) {
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
  if(isTouchableDevice() == true) {
    console.log('%c MOBILE DEVICE ☢️', ANYLOG)
    CLICK = 'touchstart';
    if(isAndroid) {
      console.log('%c ANDROID DEVICE ', ANYLOG)
    }
  }

  const aboutBtn = document.getElementById('aboutBtn');
  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(`%cOpen Source Project: ${toUnicodeVariant('100% free project at https://github.com/zlatnaspirala/magic-three')}`, REDLOG);
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

  const fullScreenBtn = document.getElementById('fullScreenBtn');
  fullScreenBtn.addEventListener("click", fullScreen)

  const playBtn = document.getElementById('playBtn');
  playBtn.addEventListener(CLICK, (e) => {
    e.preventDefault();
    console.log("%c UNLOCK", ANYLOG)
    this.LOCK = false;
    if(isTouchableDevice() == false) {
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
      byId('domFire').style.display = 'grid';
    }
  });

  this.controls.addEventListener('lock', () => {
    console.log('%cLOCK', ANYLOG)
    this.LOCK = true;
    blocker.classList.remove('bounceIn')
    blocker.classList.add('hideMe')
    dispatchEvent(new CustomEvent('hide-blocker'))
  });

  this.controls.addEventListener('unlock', () => {
    console.log('%cUNLOCK', ANYLOG)
    this.LOCK = false;
    blocker.style.display = 'block';
    instructions.style.display = '';
  });

  this.scene.add(this.controls.getObject());

  if(isTouchableDevice() == false) {
    const onKeyDown = (event) => {
      switch(event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = true;
          dispatchEvent(new CustomEvent('fixDesktopControls', {}))
          break;
        case 'ArrowLeft':
        case 'KeyA':
          dispatchEvent(new CustomEvent('fixDesktopControls', {}))
          this.moveLeft = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          dispatchEvent(new CustomEvent('fixDesktopControls', {}))
          this.moveBackward = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          dispatchEvent(new CustomEvent('fixDesktopControls', {}))
          this.moveRight = true;
          break;
        case 'Space':
          dispatchEvent(new CustomEvent('fixDesktopControls', {}))
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
      e.preventDefault();
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
      e.preventDefault();
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
