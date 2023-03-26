
let map = {
  breakable: [
    {
      name: "doors",
      mass: 100,
      scale: {x: 20, y: 17, z: 1.5},
      pos: {x: 0, y: 1, z: 47},
      quat: [0, 0, 0, 1],
      matFlag: 'matHang3dIcon' // new
    }
  ],
  boxs: [
    {
      name: "myMidBox1",
      net: false,
      mass: 0,
      scale: {x: 15, y: 1, z: 5},
      pos: {x: 0, y: 1, z: 20},
      quat: [0, 0, 0, 1],
      matFlag: 'Bronze'
    },
    // {
    //   name: "myMidBox2",
    //   net: true,
    //   mass: 10,
    //   scale: {x: 15, y: 15, z: 15},
    //   pos: {x: 11, y: 11, z: 20},
    //   quat: [0, 0, 0, 1],
    //   matFlag: 'glass'
    // },
  ],
  tubes: [
    {
      name: "myTube1",
      mass: 1000,
      scale: [5, 5, 20, 32],
      pos: {x: -20, y: 1, z: 50},
      quat: [0, 0, 0, 1]
    },
    {
      name: "myTube2",
      mass: 1000,
      scale: [5, 5, 20, 32],
      pos: {x: 20, y: 1, z: 50},
      quat: [0, 0, 0, 1]
    }
  ],
  torus: [
    // {
    //   name: "myTorus1",
    //   mass: 1000,
    //   scale: [10, 3, 16, 100],
    //   pos: {x: 30, y: 1, z: 1},
    //   quat: [0, 0, 0, 1]
    // }
  ],
  pointLights: [
    {
      name: 'l1',
      color: 0xff0040,
      radius: 2,
      intensity: 150,
      pos: {x: 30, y: 122, z: 10},
      helper: true
    }
  ],
  objMtls: [
    // {
    //   path: 'assets/objects/env/wall1.obj',
    //   name: 'myWall_1',
    //   pos: {x:-100, y:-0.5, z:-42}
    // }
  ],
  objMtlsArray: [
    {
      path: 'assets/objects/env/wall1.obj',
      name: 'myWall',
      instances: [
        {pos: {x: -100, y: -0.5, z: -62}},
        {pos: {x: -100, y: -0.5, z: 43.5}},
        {pos: {x: 100, y: -0.5, z: -62}},
        {pos: {x: 100, y: -0.5, z: 43.5}},
        {
          pos: {x: 52.8, y: -0.5, z: 86.5},
          rot: {x: 0, y: 90, z: 0}
        },
        {
          pos: {x: -52.8, y: -0.5, z: 86.5},
          rot: {x: 0, y: 90, z: 0}
        },
        {
          pos: {x: 52.8, y: -0.5, z: -89.5},
          rot: {x: 0, y: 90, z: 0}
        },
        {
          pos: {x: -52.8, y: -0.5, z: -89.5},
          rot: {x: 0, y: 90, z: 0}
        },
      ]
    }
  ]
};

export default map;
