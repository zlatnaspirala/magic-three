/**
 * @description Main Appication Instance
 * @author Nikola Lukic
 * @email zlatnaspirala@gmail.com
 */
import Application from './Application.js';
import config from './config.js';
import myGamePlayMagicMap from './public/assets/maps/free-for-all.js';

let App = new Application(config, myGamePlayMagicMap);

// global
window.App = App;