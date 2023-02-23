
import t from "../../magic/multi-lang.js";

export let startUpScreen = () => `
  <p style="font-size:36px">
    ${t('play')}
  </p>
  <p>
  ${t('move')}: ${t('wasd')}<br/>
  ${t('jump')}: ${t('space')}<br/>
  ${t('look')}: ${t('mouse')}
  </p>
  <br>
  <br>
  <small>Project source code : <a href='https://github.com/zlatnaspirala/magic-three'>github</a></small>
  <small>Based on <a href='https://threejs.org/'>Three.js</a> and <a href="https://github.com/kripken/ammo.js/">Ammo.js</a></small>
  `;

