
import {Magic} from "./js/magic-base";

/**
 * @description
 * Main instance
 */
let Application = new Magic();

/**
 * @description
 * Add you 3d elements.
 */

// Application.addChain()

const options = {
  position: {x: 10, y: 10, z: 10},
  dimension: [1,1,1] 
};

Application.addMagicBox(options);

console.info('Magic is here.');
