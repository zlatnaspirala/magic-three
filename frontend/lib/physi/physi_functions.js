
var box,handleCollision;

			function COLLISION_BOX  () {
			
			
		var box_geometry = new THREE.BoxGeometry( 40, 40, 40 );
		
		  handleCollision = function( collided_with, linearVelocity, angularVelocity ) {
				switch ( ++this.collisions ) {
					
					case 1:
						//this.material.color.setHex(0xcc8855);
						break;
					
					case 2:
						//this.material.color.setHex(0xbb9955);
						break;
					
					case 3:
						//this.material.color.setHex(0xaaaa55);
						break;
					
					case 4:
						//this.material.color.setHex(0x99bb55);
						break;
					
					case 5:
						//this.material.color.setHex(0x88cc55);
						break;
					
					case 6:
						//this.material.color.setHex(0x77dd55);
						break;
				}
			};
			
			
			var createBox = function() {
				  var material;
				  	console.log( "OK")
				var loader = new THREE.TextureLoader();
				material = Physijs.createMaterial(
					new THREE.MeshLambertMaterial({ map: loader.load( 'res/textures/ground/ground1.jpg' ) }),
					.6, // medium friction
					.3 // low restitution
				);
				material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
				material.map.repeat.set( .5, .5 );
				
				//material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/rocks.jpg' ) });
				box = new Physijs.BoxMesh(
					box_geometry,
					material
				);
				box.collisions = 0;
				
				
				
				
				box.position.set(
					Math.random() * 115 - 7.5,
					525,
					Math.random() * 115 - 7.5
				);
				
				box.rotation.set(
					Math.random() * Math.PI,
					Math.random() * Math.PI,
					Math.random() * Math.PI
				);
				
				box.castShadow = true;
				box.addEventListener( 'collision', handleCollision );
				console.log(box+"OK1")
				box.addEventListener( 'ready', COLLISION_BOX );
				console.log(box+"OK2")
				scene.add( box );
				console.log(box+"OK3")
			};
		
		
		createBox()
		
  
};
	
	
	COLLISION_BOX()