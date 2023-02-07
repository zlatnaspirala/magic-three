
	var sky,sunSphere;

			function initSky( GUI ) {

				// Add Sky Mesh
				sky = new THREE.Sky();
				sky.mesh.name = 'SKY';
				
				scene.add( sky.mesh );

				// Add Sun Helper
				sunSphere = new THREE.Mesh(
					new THREE.SphereBufferGeometry( 20000, 16, 16 ),
					new THREE.MeshBasicMaterial( { color: 0xffffff } )
				);
				sunSphere.position.y = - 700000;
				//sunSphere.visible = false;
				scene.add( sunSphere );

				
				
				
				/// GUI

				var effectController  = {
					turbidity: 1,
					reileigh: 0.1,
					mieCoefficient: 0.005,
					mieDirectionalG: 0.8,
					luminance: 1,
					inclination: 0.49, // elevation / inclination
					azimuth: 0.25, // Facing front,
					sun: ! true
				};

				var distance = 400000;

				
					
				function guiChanged() {

					var uniforms = sky.uniforms;
					uniforms.turbidity.value = effectController.turbidity;
					uniforms.reileigh.value = effectController.reileigh;
					uniforms.luminance.value = effectController.luminance;
					uniforms.mieCoefficient.value = effectController.mieCoefficient;
					uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

					var theta = Math.PI * ( effectController.inclination - 0.5 );
					var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

					sunSphere.position.x = distance * Math.cos( phi );
					sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
					sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

					sunSphere.visible = effectController.sun;

					sky.uniforms.sunPosition.value.copy( sunSphere.position );

					renderer.render( scene, camera );

				}

				
				if (typeof GUI != 'undefined') { 
				if ( GUI == true) { 
			
				var gui = new dat.GUI();

				gui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( guiChanged );
				gui.add( effectController, "reileigh", 0.0, 4, 0.001 ).onChange( guiChanged );
				gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
				gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
				gui.add( effectController, "luminance", 0.0, 2 ).onChange( guiChanged );
				gui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( guiChanged );
				gui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( guiChanged );
				gui.add( effectController, "sun" ).onChange( guiChanged );

				guiChanged(); 
				}
				else {
					guiChanged(); 
				}
      }


			}

			