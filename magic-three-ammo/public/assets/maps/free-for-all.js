
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
      name: "myMidBox1",
      net: true,
      mass: 10,
      scale: {x:5, y:5, z:5},
      pos: {x:0 , y:1, z:20},
      quat: [0,0,0,1],
      matFlag: 'Bronze'
    },
    // {
    //   name: "myMidBox2",
    //   net: true,
    //   mass: 10,
    //   scale: {x:10, y:10, z:10},
    //   pos: {x:200 , y:1, z:200},
    //   quat: [0,0,0,1],
    //   matFlag: 'Bronze'
    // }
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
