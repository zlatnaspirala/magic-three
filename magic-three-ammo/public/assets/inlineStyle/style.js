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