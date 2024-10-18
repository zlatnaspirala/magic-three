

let defaultMat = 'Bronze';
let map = {
  breakable: [
    // {
    //   name: "hang3dLogo",
    //   mass: 10,
    //   scale: {x: 4, y: 4, z: 1},
    //   pos: {x: 0, y: 21, z: 50.4},
    //   quat: [0, 0, 0, 1],
    //   matFlag: 'matHang3dIcon'
    // },
    // {
    //   name: "glassWindow1",
    //   mass: 1,
    //   scale: {x: 6, y: 5, z: 0.1},
    //   pos: {x: 0, y: 10, z: 20.4},
    //   quat: [0, 0, 0, 1],
    //   matFlag: 'glass'
    // }
  ],
  boxs: [
    {
      name: "hang3dLogo",
      net: false,
      mass: 10,
      scale: {x: 4, y: 4, z: 1},
      pos: {x: 0, y: 21, z: 50.4},
      quat: [0, 0, 0, 1],
      matFlag: 'matHang3dIcon',
      collide: false,
      state: 4
    },
    {
      name: "bottom-platform-left2-bottom",
      net: false,
      mass: 0,
      scale: {x: 15, y: 15, z: 0.5},
      pos: {x: -65, y: 12, z: 45},
      quat: [0, 0, 0, 1],
      matFlag: defaultMat,
      collide: false,
      state: 4
    },
    {
      name: "ver-platform-left2-Right",
      net: false,
      mass: 0,
      scale: {x: 0.5, y: 15, z: 36},
      pos: {x: -50, y: 12, z: 10},
      quat: [0, 0, 0, 1],
      matFlag: defaultMat,
      collide: false,
      state: 4
    },
    {
      name: "ver-platform-left2-Left",
      net: false,
      mass: 0,
      scale: {x: 0.5, y: 15, z: 36},
      pos: {x: -80, y: 12, z: 10},
      quat: [0, 0, 0, 1],
      matFlag: defaultMat,
      collide: false,
      state: 4
    },
    {
      name: "ver-platform-left2",
      net: false,
      mass: 0,
      scale: {x: 0.5, y: 15, z: 30},
      pos: {x: -65, y: 12, z: 10},
      quat: [0, 0, 0, 1],
      matFlag: defaultMat,
      collide: false,
      state: 4
    },
    {
      name: "hor-platform-left2",
      net: false,
      mass: 0,
      scale: {x: 16, y: 0.5, z: 36},
      pos: {x: -65, y: 12, z: 10},
      quat: [0, 0, 0, 1],
      matFlag: defaultMat,
      collide: false,
      state: 4
    },
    {
      name: "ver-platform-left",
      net: false,
      mass: 0,
      scale: {x: 0.5, y: 15, z: 50},
      pos: {x: -25, y: 12, z: 10},
      quat: [0, 0, 0, 1],
      matFlag: defaultMat,
      collide: false,
      state: 4
    },
    {
      name: "hor-platform-left",
      net: false,
      mass: 0,
      scale: {x: 16, y: 0.5, z: 56},
      pos: {x: -25, y: 12, z: 10},
      quat: [0, 0, 0, 1],
      matFlag: defaultMat,
      collide: false,
      state: 4
    },
    {
      name: "ver-platform-right",
      net: false,
      mass: 0,
      scale: {x: 0.5, y: 15, z: 50},
      pos: {x: 25, y: 12, z: 10},
      quat: [0, 0, 0, 1],
      matFlag: defaultMat,
      collide: false,
      state: 4
    },
    {
      name: "hor-platform-right",
      net: false,
      mass: 0,
      scale: {x: 16, y: 0.5, z: 56},
      pos: {x: 25, y: 12, z: 10},
      quat: [0, 0, 0, 1],
      matFlag: defaultMat,
      collide: false,
      state: 4
    },
    {
      name: "pilarTop",
      net: false,
      mass: 0,
      scale: {x: 20, y: 2, z: 2},
      pos: {x: 0, y: 15, z: 50},
      quat: [0, 0, 0, 1],
      matFlag: 'Bronze',
      collide: true,
      state: 4
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
      mass: 0,
      scale: [5, 5, 20, 32],
      pos: {x: -20, y: 9, z: 50},
      quat: [0, 0, 0, 1]
    },
    {
      name: "myTube2",
      mass: 0,
      scale: [5, 5, 20, 32],
      pos: {x: 20, y: 9, z: 50},
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
      color: 0xff0000,
      radius: 8,
      intensity: 20,
      pos: {x: 24, y: 25, z: 28},
      helper: true
    },
    // {
    //   name: 'l2',
    //   color: 0x22ff20,
    //   radius: 8,
    //   intensity: 20,
    //   pos: {x: 24, y: 25, z: 38},
    //   helper: true
    // },
    {
      name: 'l3',
      color: 0x22ff20,
      radius: 8,
      intensity: 20,
      pos: {x: 24, y: 25, z: -10},
      helper: true
    },
    // {
    //   name: 'l4',
    //   color: 0x22ff20,
    //   radius: 8,
    //   intensity: 20,
    //   pos: {x: 24, y: 25, z: -20},
    //   helper: true
    // },
    {
      name: 'r1',
      color: 0xff0000,
      radius: 8,
      intensity: 20,
      pos: {x: -24, y: 25, z: 28},
      helper: true
    },
    // {
    //   name: 'r2',
    //   color: 0x22ff20,
    //   radius: 8,
    //   intensity: 20,
    //   pos: {x: -24, y: 25, z: 38},
    //   helper: true
    // },
    {
      name: 'r3',
      color: 0x22ff20,
      radius: 8,
      intensity: 20,
      pos: {x: -24, y: 25, z: -10},
      helper: true
    },
    // {
    //   name: 'r4',
    //   color: 0x22ff20,
    //   radius: 8,
    //   intensity: 20,
    //   pos: {x: -24, y: 25, z: -20},
    //   helper: true
    // },

    // down center
    {
      name: 'ldown1',
      color: 0xff0000,
      radius: 8,
      intensity: 20,
      pos: {x: 24, y: 10, z: 28},
      helper: true,
      mobileSupport: false
    },
    {
      name: 'ldown2',
      color: 0x22ff20,
      radius: 8,
      intensity: 20,
      pos: {x: 24, y: 10, z: 38},
      helper: true,
      mobileSupport: false
    },
    {
      name: 'ldown3',
      color: 0x22ff20,
      radius: 8,
      intensity: 20,
      pos: {x: 24, y: 10, z: -10},
      helper: true,
      mobileSupport: false
    },
    {
      name: 'ldown4',
      color: 0x22ff20,
      radius: 8,
      intensity: 20,
      pos: {x: 24, y: 10, z: -20},
      helper: true,
      mobileSupport: false
    },

    {
      name: 'rdown1',
      color: 0xff0000,
      radius: 8,
      intensity: 20,
      pos: {x: -24, y: 10, z: 28},
      helper: true,
      mobileSupport: false
    },
    {
      name: 'rdown2',
      color: 0x22ff20,
      radius: 8,
      intensity: 20,
      pos: {x: -24, y: 10, z: 38},
      helper: true,
      mobileSupport: false
    },
    {
      name: 'rdown3',
      color: 0x22ff20,
      radius: 8,
      intensity: 20,
      pos: {x: -24, y: 10, z: -10},
      helper: true,
      mobileSupport: false
    },
    {
      name: 'rdown4',
      color: 0x22ff20,
      radius: 8,
      intensity: 20,
      pos: {x: -24, y: 10, z: -20},
      helper: true,
      mobileSupport: false
    },

  ],
  objMtls: [
    {
      path: 'assets/objects/env/center.obj',
      name: 'center',
      pos: {x:0, y:-2, z:-52},
      rot: {x: 0, y: 90, z:0}
    },
    // {
    //   path: 'assets/objects/env/lamp1.obj',
    //   name: 'lamp',
    //   pos: {x:24, y:25, z:24},
    //   rot: {x: 0, y: 90, z:0}
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
  ],
  stairs: [
    // {
    //   name: 'stairs1',
    //   pos: {x:0, y: 0, z: 15},
    //   quat: [0, 0, 0, 1],
    //   scale: {x: 10, y: 0.3, z: 56},
    //   stairs: {
    //     num: 19,
    //     width: 2.7,
    //     height: 0.6
    //   },
    //   matFlag: 'BlackBronze'
    // }
  ]
};

export default map;
