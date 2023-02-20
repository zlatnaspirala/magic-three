
/**
 * @description
 * Main instance DEV Mode
 * Important note
 * Dont import unused modules.
 */
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
// import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {createRandomColor, getDom} from "./public/libs/utils.js";
import {createFPSController} from "./public/magic/controllers.js";
import {MagicPhysics} from "./public/magic/physics.js";
import {updateControls} from "./public/magic/updater.js";
import config from './config.js';
import {MagicMaterials} from "./public/magic/materials.js";
import {MagicLoader} from "./public/magic/loaders.js";
import {runCache} from "./public/magic/utility.js";

/**
 * @description
 * Main instance PROD MODE
 * Important note
 * Dont import unused modules.
 */
import * as THREE from "three";
// import Stats from "three/addons/libs/stats.module.js";
// import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {createRandomColor, getDom} from "./public/libs/utils.js";
import {createFPSController} from "./public/magic/controllers.prod.js";
import {MagicPhysics} from "./public/magic/physics.prod.js";
import {updateControls} from "./public/magic/updater.prod.js";
import config from './config.js';
import {MagicMaterials} from "./public/magic/materials.prod.js";
import {MagicLoader} from "./public/magic/loaders.prod.js";
import {runCache} from "./public/magic/utility.prod.js";
