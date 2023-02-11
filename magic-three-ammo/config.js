
/**
 * @description
 * MagicThree config file.
 */
const config = {
  cache: true,
  map: {
    floorWidth: 200,
    floorHeight: 200,
  },
  playerController: {
    type: 'FPS', // FPS | orbit
    movementType: 'velocity', // velocity | kinematic
    cameraInitPosition: {x: 0, y: 5, z: 10}
  }
}

export default config;
