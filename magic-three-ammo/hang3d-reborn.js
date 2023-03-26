
import Application from './Application.js';
import config from './config.js';
import myGamePlayMagicMap from './public/assets/maps/free-for-all.js';

let App = new Application(config, myGamePlayMagicMap);

// App.activateNet();

// Remove this after all
// this is only for easy access from console
window.App = App;
