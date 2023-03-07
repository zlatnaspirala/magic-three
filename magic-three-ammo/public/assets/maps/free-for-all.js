
let map = {
  breakable: [
    {
      name: "myBreakAbleBox1",
      mass: 100,
      scale: {x:2, y:5, z:2},
      pos: {x:3 , y:1, z:1},
      quat: [0,0,0,1]
    }
  ],
  boxs: [
    {
      name: "myMidBox1",
      net: true,
      mass: 10,
      scale: {x:5, y:5, z:5},
      pos: {x:0 , y:1, z:20},
      quat: [0,0,0,1],
      matFlag: 'Bronze'
    },
  ],
  tubes: [
    {
      name: "myTube1",
      mass: 1000,
      scale: [5, 5, 20, 32],
      pos: {x:-20 , y:1, z:1},
      quat: [0,0,0,1]
    },
    {
      name: "myTube2",
      mass: 1000,
      scale: [5, 5, 20, 32],
      pos: {x:20 , y:1, z:1},
      quat: [0,0,0,1]
    }
  ],
  torus: [
    {
      name: "myTorus1",
      mass: 1000,
      scale: [10, 3, 16, 100],
      pos: {x:30 , y:1, z:1},
      quat: [0,0,0,1]
    }
  ],
  pointLights: [
    {
      name: 'l1',
      color: 0xff0040,
      radius: 2,
      intensity: 50,
      pos: {x:30 , y:2, z:10},
      helper: true
    },
    {
      name: 'l2',
      color: 0xeeee40,
      radius: 2,
      intensity: 150,
      pos: {x:-30 , y:2, z:10},
      helper: true
    }
  ]
};

export default map;
