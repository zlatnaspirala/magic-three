/////////////////////////////////
// VIDEO ////////////////////////
/////////////////////////////////


function VIDEO_TEXTURE (monitor_ ) {

var ROOT = this;
ROOT.LOADED = function(){};

ROOT.video = document.getElementById( monitor_ );
var DIV_CONTENT_STREAMS =  document.getElementById( 'HOLDER_STREAMS' );	

ROOT.videoImage = document.createElement('canvas');
ROOT.videoImage.id = monitor_ + "IMAGE_";
ROOT.videoImage.setAttribute('width', '640px' );
ROOT.videoImage.setAttribute('height', '480px' );
DIV_CONTENT_STREAMS.appendChild(ROOT.videoImage); 

ROOT.videoImageContext = ROOT.videoImage.getContext( '2d' );
ROOT.videoImageContext.fillStyle = '#0000FF';
ROOT.videoImageContext.fillRect( 0, 0, ROOT.videoImage.width, ROOT.videoImage.height );

ROOT.videoTexture = new THREE.Texture( ROOT.videoImage );
ROOT.videoTexture.minFilter = THREE.LinearFilter;
ROOT.videoTexture.magFilter = THREE.LinearFilter;

ROOT.movieMaterial = new THREE.MeshBasicMaterial( { map: ROOT.videoTexture, overdraw: true, side:THREE.DoubleSide } );
var movieGeometry = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
ROOT.movieScreen = new THREE.Mesh( movieGeometry, ROOT.movieMaterial );

ROOT.movieScreen.position.set(0,500,1000);
scene.add(ROOT.movieScreen);

ROOT.AUTO_UPDATE = function(){

 //ROOT.video.play();
 if ( ROOT.video.readyState === ROOT.video.HAVE_ENOUGH_DATA ) 
	{
		ROOT.videoImageContext.drawImage( ROOT.video, 0, 0, ROOT.videoImage.width, ROOT.videoImage.height );
		if ( ROOT.videoTexture ) 
			ROOT.videoTexture.needsUpdate = true;
	}	

};
console.log('Video 3d canvas texture created.');
PROGRAM.AUTO_UPDATE.push(ROOT);




}