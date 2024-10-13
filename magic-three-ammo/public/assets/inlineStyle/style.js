import {label} from "../../magic/multi-lang.js";
import {isMobile} from "../../magic/utility.js";
let t= label.t;

export let startUpScreen = () => `
  <button data-label="play" id="playBtn"></button>
  <p>
  <span data-label="move" >${t('move')}</span>: <span data-label="wasd" >${t('wasd')}</span> <br/>
  <span data-label="jump" >${t('jump')}</span>: <span data-label="space" >${t('space')}</span> <br/>
  <span data-label="look" >${t('look')}</span>: <span data-label="mouse" >${t('mouse')}</span>
  </p>
  <br>
  ${ ( isMobile ? "For mobile devices video streaming disabled on startup." : " This app use webcam device." ) }
  <br>
  <small><span data-label="createdBy"></span> @zlatnaspirala <a href='https://github.com/zlatnaspirala/'>github</a></small>
  <small><span data-label="Project"></span> : <a href='https://github.com/zlatnaspirala/magic-three'>github</a></small>
  <small><span data-label="Based"></span> <a href='https://threejs.org/'>Three.js</a> && <a href="https://github.com/kripken/ammo.js/">Ammo.js</a></small>
  <small>Licence GPL v3</small>
`;

export let dieScreen = () => `
  <p style="font-size:36px">
    ${t('you.die')}
  </p>
`;