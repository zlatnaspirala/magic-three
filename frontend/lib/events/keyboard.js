//########################################################
// OTHER KEYBOARD STAFF 
//########################################################

function KEYBOARD( c ){

var ROOT = this;
ROOT.c = c;
ROOT.CAPTURE_CHAR = "";
ROOT.LAST_CAPTURE_CHAR = "";

ROOT.preventBackSpace = true;


ROOT.ACTION_ON_KEY_DOWN = function(){};
ROOT.ACTION_ON_KEY_ENTER = function(){};
 
c.addEventListener('keydown', function(e)
{	
	 
	 //SYS.DEBUG.LOG(" SYS --> , key pressed: " + e.keyCode );
 	 //SYS.SOUND.GEN( 50 , e.keyCode * 20 );
     // COMMAND LINES
	switch(e.keyCode)
		{
		
		case 13:
		ROOT.ACTION_ON_KEY_ENTER();
		
		case 8:
		
		if ( ROOT.preventBackSpace ==  true){e.preventDefault();SYS.DEBUG.LOG("prevent default for backspace.");   }
        SYS.DEBUG.LOG("pressed backspace.");   	 	
    	case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
	 	SYS.DEBUG.LOG("LEFT command -->> Show command line ");   		 
		break;
		case 38: // up
				 
				 
		break;
		case 39: // right
			 
		break;
		case 40: // down
		
		break;
		
		
		};
 
 

//@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@
// SPECIAL FOR TEXTBOX
//@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@
//SYS.DEBUG.LOG("KEYBOARD-->> Show users types : " + e.keyCode );   		
var keynum;
if(window.event){ keynum = e.keyCode;}else{if(e.which){ keynum = e.which;}}
//console.log(String.fromCharCode(keynum));

if (e.keyCode == 8) {
SYS.DEBUG.LOG("delete last char!");   		
ROOT.CAPTURE_CHAR = remove_last( ROOT.CAPTURE_CHAR );

}
else {
ROOT.CAPTURE_CHAR+=(String.fromCharCode(keynum));
ROOT.LAST_CAPTURE_CHAR = (String.fromCharCode(keynum));
}


//@@@@@@@@@@@@@@@@@@@@@@@@@
ROOT.ACTION_ON_KEY_DOWN();
//@@@@@@@@@@@@@@@@@@@@@@@@@

}, false);


//##############################################################################//##############################################################################
//##############################################################################//##############################################################################
c.addEventListener('keyup', function(e)
{
    
	 //SYS.DEBUG.LOG(" GAME RUNNING , key up : " + e.keyCode );
	 //SYS.SOUND.GEN( 50 , e.keyCode * 20 );
  
	 
	 	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 69:
	 		
		case 37: // left
 
		
		break;
		case 38: // up
		 
		
		break;
		case 39: // right
	 
		
		break;
		case 40: // down
 
		
		break;
		};
	 
 

}, false); 


ROOT.DESTROY = function(){

ROOT.c.removeEventListener('keydown');
ROOT.c.removeEventListener('keydown'); 

};


}