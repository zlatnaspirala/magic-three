
	
var REGIME = 'webcam';

//AR globals
var detectMarkersEnabled	= true;
var markerToObject3DEnabled	= true;
var webglRenderEnabled		= true;
var onRenderFcts = [];
var markerObject3D = new THREE.Object3D()



	var detectMarkersStats = new Stats();
	detectMarkersStats.setMode( 1 );
	document.body.appendChild( detectMarkersStats.domElement );
        detectMarkersStats.domElement.style.position = 'absolute'
	detectMarkersStats.domElement.style.bottom = '0px'
	detectMarkersStats.domElement.style.right = '0px'
	
		var renderStats = new Stats();
	renderStats.setMode( 0 );
	document.body.appendChild( renderStats.domElement );
    renderStats.domElement.style.position = 'absolute'
	renderStats.domElement.style.bottom = '0px'
	renderStats.domElement.style.left = '0px'
	
 
scene.add(markerObject3D);
	
	(function(){
		var geometry = new THREE.PlaneGeometry(1,1,10,10)
		var material = new THREE.MeshBasicMaterial( {
			wireframe : true
		})
		var mesh = new THREE.Mesh(geometry, material);
		markerObject3D.add( mesh );

		var mesh = new THREE.AxisHelper
		markerObject3D.add( mesh );
	})();
	
	
	(function(){
	  var textureLoader__ = new THREE.TextureLoader();
	  var texture1__ = textureLoader__.load( "lib/threexWebAr/js/marker/256.png" );
				
		var material = new THREE.SpriteMaterial({
			map: texture1__ ,
		});
		
		
		var geometry = new THREE.BoxGeometry(1,1,1)
		var object3d = new THREE.Sprite(material );
		object3d.scale.set( 2, 2, 1 );
		markerObject3D.add(object3d)
	})()
	
	
	
//////////////////////////////////////////////////
var jsArucoMarker	= new THREEx.JsArucoMarker()

	if( REGIME == 'video' ){
		var videoGrabbing = new THREEx.VideoGrabbing()
		jsArucoMarker.videoScaleDown = 2
	}else if( REGIME == 'webcam' ){
		var videoGrabbing = new THREEx.WebcamGrabbing()
		jsArucoMarker.videoScaleDown = 2
	}else if( REGIME == 'image' ){
		var videoGrabbing = new THREEx.ImageGrabbing()
		jsArucoMarker.videoScaleDown = 10
	}else console.assert(false);
	

   videoGrabbing.domElement.setAttribute('id' , 'video_for_ar')
   document.body.appendChild(videoGrabbing.domElement)
////
	markerObject3D.visible	= false

onRenderFcts.push(function(){
		if( detectMarkersEnabled === false )	return
		
		var domElement	= videoGrabbing.domElement
		detectMarkersStats.begin();
		var markers	= jsArucoMarker.detectMarkers(domElement)
		detectMarkersStats.end();

		if( markerToObject3DEnabled === false )	return
		markerObject3D.visible = false
		// see if this.markerId has been found
		markers.forEach(function(marker){
			// if( marker.id !== 265 )	return
			jsArucoMarker.markerToObject3D(marker, markerObject3D)
			markerObject3D.visible = true
		})
	})
	
	onRenderFcts.push(function(){	
		renderStats.begin();
		if( webglRenderEnabled === true ){
			renderer.render( scene, camera );
		}
		renderStats.end();
	})
	
	
		var previousTime = performance.now();
var  MARKER = new Object();
 MARKER.AUTO_UPDATE= function(){
	
 onRenderFcts.forEach(function(onRenderFct){onRenderFct(performance.now(), performance.now() - previousTime)
		previousTime	= performance.now()
});

 };
PROGRAM.AUTO_UPDATE.push( 
MARKER
   )
	
	
	
	
	