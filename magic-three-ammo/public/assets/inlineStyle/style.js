import {label} from "../../magic/multi-lang.js";
let t= label.t;

export let startUpScreen = () => `
  <button id="playBtn">
    ${t('play')}
  </button>
  <p>
  ${t('move')}: ${t('wasd')}<br/>
  ${t('jump')}: ${t('space')}<br/>
  ${t('look')}: ${t('mouse')}
  </p>
  <br>
  <br>
  <small>Created by @zlatnaspirala <a href='https://github.com/zlatnaspirala/'>github</a></small>
  <small>Project source code : <a href='https://github.com/zlatnaspirala/magic-three'>github</a></small>
  <small>Based on <a href='https://threejs.org/'>Three.js</a> and <a href="https://github.com/kripken/ammo.js/">Ammo.js</a></small>
  <small>Licence GPL v3</small>
`;

export let dieScreen = () => `
  <p style="font-size:36px">
    ${t('you.die')}
  </p>
`;