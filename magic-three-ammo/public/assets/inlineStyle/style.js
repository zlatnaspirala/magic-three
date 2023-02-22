
import t from "../../magic/multi-lang.js";

export let startUpScreen = () => `
  <p style="font-size:36px">
    ${t('play')}
  </p>
  <p>
  ${t('move')}: ${t('wasd')}<br/>
  ${t('jump')}: ${t('space')}<br/>
  ${t('look')}: ${t('mouse')}
  </p>`;
