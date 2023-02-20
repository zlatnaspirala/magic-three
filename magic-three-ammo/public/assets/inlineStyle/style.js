
import t from "../../magic/multi-lang.js";

console.log(`TEST FUNC !@# ${t('play')}`)

export let startUpScreen = () => `
  <p style="font-size:36px">
    ${t('play')}
  </p>
  <p>
    Move: WASD<br/>
    Jump: SPACE<br/>
    Look: MOUSE
  </p>`;
