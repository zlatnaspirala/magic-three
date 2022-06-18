  
  
  SYS.VOICE = new Object();
  
if ('speechSynthesis' in window) {
 // Synthesis support
speechSynthesis.getVoices().forEach(function(voice) {console.log(voice.name, voice.default ? '(default)' :'');});
 
  
SYS.VOICE.SPEAK = function(text){
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[10]; 
	msg.voiceURI = 'native';
	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 2; //0 to 2
	msg.text = text;
	msg.lang = 'en-US';
	msg.onend = function(e) {console.log('SPEAK Finished in ' + event.elapsedTime + ' seconds.');};
	speechSynthesis.speak(msg); 
 };
  
 SYS.DEBUG.LOG("voice.js say : speechSynthesis loaded."); 
}


if ('webkitSpeechRecognition' in window) {


SYS.VOICE.LISTEN = function(){
 
	var ROOT_LISTENER = this;
 
	ROOT_LISTENER.recognition = new webkitSpeechRecognition();

	ROOT_LISTENER.words_and_action = [];
	ROOT_LISTENER.words = {};
	ROOT_LISTENER.embbed_action = [];
	ROOT_LISTENER.detect_word = function( word , action ){

   //one way 
	//var voice_listener = { 'word' : word , 'action' : action };
	//ROOT_LISTENER.words_and_action.push(voice_listener);
   
   //
   // eval( ' ROOT_LISTENER.words.'+word+' = voice_listener '  );
   
   
};

ROOT_LISTENER.recognition.continuous = true;
ROOT_LISTENER.recognition.interimResults = true;
ROOT_LISTENER.recognition.interim = true;
ROOT_LISTENER.recognition.onstart = function() { console.log("START") }  
ROOT_LISTENER.recognition.onerror = function(event) {

//console.log("ON ERROR" + event)
SYS.DEBUG.WARNING("Voice listener error type : "  + event.error );  


};
ROOT_LISTENER.recognition.onend = function() { console.log("ON END") }
ROOT_LISTENER.recognition.onresult = function (event) {

  SYS.DEBUG.WARNING("Voice listener : "  + event );  
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
		
		
     console.log( event.results[i][0].transcript + " You tell ." )
    
   if (  event.results[i][0].transcript.indexOf (' ') != -1  ) {
		
		//console.log(  "  eeeeeeeeee" )
		
		//try{
		//eval( ' if (typeof  ROOT_LISTENER.words.'+String__+' != "undefined" )  {   ROOT_LISTENER.words.'+String__+'.action();   } '  );
		//}catch(e){
				//console.log(  "  11111111111111 " )
			
			for ( var x=0; x< ROOT_LISTENER.embbed_action.length ; x++){
				
				 if ( typeof   event.results[i][0].transcript.indexOf (ROOT_LISTENER.embbed_action[x]) != -1 ) {
					 
					eval( ' if (typeof  ROOT_LISTENER.embbed_action[x]  != "undefined" )  {   window[ROOT_LISTENER.embbed_action[x]]() ;   } '  );
					 
				 }
				
			}
			
			
		//}
		
		
	 }
	 else {
		 
	 eval( ' if (typeof  ROOT_LISTENER.words.'+event.results[i][0].transcript+' != "undefined" )  {   ROOT_LISTENER.words.'+event.results[i][0].transcript+'.action();   } '  );
		 
		 
	 }
	  

		

  }
  }
}

//ROOT_LISTENER.recognition = recognition;


}






SYS.DEBUG.LOG("SpeechRecognition support");  
}