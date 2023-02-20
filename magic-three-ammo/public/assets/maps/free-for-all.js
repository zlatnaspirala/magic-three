
let map = {
  breakable: [
    {
      mass: 100,
      scale: {x:2, y:5, z:2},
      pos: {x:3 , y:1, z:1},
      quat: [0,0,0,1]
    }
  ],
  boxs: [
    {
      mass: 10,
      scale: {x:2, y:5, z:2},
      pos: {x:0 , y:1, z:20},
      quat: [0,0,0,1]
    }
  ],
  tubes: [
    {
      mass: 1000,
      scale: [5, 5, 20, 32],
      pos: {x:-20 , y:1, z:1},
      quat: [0,0,0,1]
    },
    {
      mass: 1000,
      scale: [5, 5, 20, 32],
      pos: {x:20 , y:1, z:1},
      quat: [0,0,0,1]
    }
  ],
  torus: [
    {
      mass: 1000,
      scale: [10, 3, 16, 100],
      pos: {x:30 , y:1, z:1},
      quat: [0,0,0,1]
    }
  ]
};

export default map;
