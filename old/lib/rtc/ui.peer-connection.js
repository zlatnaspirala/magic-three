//////////////////////////////////////////////////////
// MuazKhan.com   MIT License - WebRTC-Experiment.com/licence
//////////////////////////////////////////////////////


var rtcMultiConnection = new RTCMultiConnection();

rtcMultiConnection.session = { data: true };

rtcMultiConnection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};


// var SIGNALING_SERVER = 'wss://wsnodejs.nodejitsu.com:443';

var SIGNALING_SERVER = (location.protocol == 'https:' ? 'wss' : 'ws') + '://'+ document.domain +':10066/';

var isSSL = (location.protocol == 'https:' ? 'yes' : 'no');

rtcMultiConnection.openSignalingChannel = function(config) {
    config.channel = config.channel || this.channel;
	
    var websocket;
 
    websocket = new WebSocket(SIGNALING_SERVER);	
		
	 
 
	
    websocket.channel = config.channel;
    websocket.onopen = function() {
        websocket.push(JSON.stringify({
            open: true,
            channel: config.channel
        }));
        if (config.callback)
            config.callback(websocket);
    };
    websocket.onmessage = function(event) {
        config.onmessage(JSON.parse(event.data));
    };
    websocket.push = websocket.send;
    websocket.send = function(data) {
        if (websocket.readyState != 1) {
                    return setTimeout(function() {
                        websocket.send(data);
                    }, 1000);
        }
                
        websocket.push(JSON.stringify({
            data: data,
            channel: config.channel
        }));
    };
};
rtcMultiConnection.customStreams = { };

/*
// http://www.rtcmulticonnection.org/docs/fakeDataChannels/
rtcMultiConnection.fakeDataChannels = true;
if(rtcMultiConnection.UA.Firefox) {
rtcMultiConnection.session.data = true;
}
*/

rtcMultiConnection.autoTranslateText = false;

rtcMultiConnection.REMOTE_USERS = [];

rtcMultiConnection.onopen = function(e) {
    getElement('#allow-webcam').disabled = false;
    getElement('#allow-mic').disabled = false;
    getElement('#share-files').disabled = false;
    getElement('#allow-screen').disabled = false;

	
    addNewMessage({
        header: e.extra.username,
        message: 'Data connection is opened between you and ' + e.extra.username + '.',
        userinfo: getUserinfo(rtcMultiConnection.blobURLs[rtcMultiConnection.userid], 'lib/rtc/html/images/info.png'),
        color: e.extra.color
    });

	rtcMultiConnection.REMOTE_USERS.push(rtcMultiConnection.userid); //???
	
    numbersOfUsers.innerHTML = parseInt(numbersOfUsers.innerHTML) + 1;
	
	HUD.NARATOR.TEXT.SET_TEXT("Connected with " + e.extra.username );
	HUD.USER_TEXT.TEXT.SET_TEXT("Chat with " + e.extra.username );
	
	
	 CUBE1.OBJECT.translateY(-2000);
	 CUBE2.OBJECT.translateY(-2000);
	
	setTimeout(function(){
	
		//HUD.USER_TEXT.TEXT.SET_TEXT(' ');
	    HUD.MENU.KEYBOARD.CAPTURE_CHAR = '';
		
	}, 200);
	
		HUD.MENU.KEYBOARD.ACTION_ON_KEY_ENTER = function () {

			
				if (HUD.USER_TEXT.TEXT.text.length > 0) {
					
					rtcMultiConnection.send(HUD.USER_TEXT.TEXT.text);
					console.log('ENTER FOR CHAT');
					setTimeout( function () {
					HUD.USER_TEXT.TEXT.SET_TEXT(" ");
					HUD.MENU.KEYBOARD.CAPTURE_CHAR = '';
					} , 250 );
					
				}
				else{					
					alert("MSG is null");
				}

				
		};
	
};

var whoIsTyping = document.querySelector('#who-is-typing');
rtcMultiConnection.onmessage = function(e) {
    if (e.data.typing) {
        whoIsTyping.innerHTML = e.extra.username + ' is typing ...';
        return;
    }

    if (e.data.stoppedTyping) {
        whoIsTyping.innerHTML = '';
        return;
    }

    whoIsTyping.innerHTML = '';

    addNewMessage({
        header: e.extra.username,
        message: 'Text message from ' + e.extra.username + ':<br /><br />' + (rtcMultiConnection.autoTranslateText ? linkify(e.data) + ' ( ' + linkify(e.original) + ' )' : linkify(e.data)),
        userinfo: getUserinfo(rtcMultiConnection.blobURLs[e.userid], 'lib/rtc/html/images/chat-message.png'),
        color: e.extra.color
    });
	
    document.title = e.data;
	
	HUD.REMOTE_USER_TEXT.TEXT.SET_TEXT(e.extra.username + ":" + e.data)
	
};

var sessions = { };
rtcMultiConnection.onNewSession = function(session) {
    if (sessions[session.sessionid]) return;
    sessions[session.sessionid] = session;

    session.join();

    addNewMessage({
        header: session.extra.username,
        message: 'Making handshake with room owner....!',
        userinfo: '<img src="lib/rtc/html/images/action-needed.png">',
        color: session.extra.color
    });
};

rtcMultiConnection.onRequest = function(request) {
    rtcMultiConnection.accept(request);
    addNewMessage({
        header: 'New Participant',
        message: 'A participant found. Accepting request of ' + request.extra.username + ' ( ' + request.userid + ' )...',
        userinfo: '<img src="lib/rtc/html/images/action-needed.png">',
        color: request.extra.color
    });
};

rtcMultiConnection.onCustomMessage = function(message) {
    if (message.hasCamera || message.hasScreen) {
		
		//#######################//#######################
		//#######################//#######################
		// SEE REMOTE WEBCAM 
		      this.disabled = true;

                    message.session.oneway = true;
                    rtcMultiConnection.sendMessage({
                        renegotiate: true,
                        streamid: message.streamid,
                        session: message.session
                    });
					
					console.log(message.session + "<<<<<<<<<<message.session<<<<<<<<<<<")
					console.log(message.streamid + "<<<<<<<<<<message.streamid<<<<<<<<<<<")
			//#######################//#######################
			//#######################//#######################
		   
		
		

	    console.log('enabled webcam !2@ +++>>' + message.extra.username);
	
        var msg = message.extra.username + ' enabled webcam. <button id="preview">Preview</button> ---- <button id="share-your-cam">Share Your Webcam</button>';

		
        if (message.hasScreen) {
            msg = message.extra.username + ' is ready to share screen. <button id="'+message.extra.username+'">View His Screen</button> ---- <button id="share-your-cam">Share Your Screen</button>';
        }

        addNewMessage({
            header: message.extra.username,
            message: msg,
            userinfo: '<img src="lib/rtc/html/images/action-needed.png">',
            color: message.extra.color,
            callback: function(div) {
                div.querySelector('#preview').onclick = function() {
                    this.disabled = true;

                    message.session.oneway = true;
                    rtcMultiConnection.sendMessage({
                        renegotiate: true,
                        streamid: message.streamid,
                        session: message.session
                    });
                };

                div.querySelector('#share-your-cam').onclick = function() {
                    this.disabled = true;

                    if (!message.hasScreen) {
                        session = { audio: true, video: true };

                        rtcMultiConnection.captureUserMedia(function(stream) {
                            rtcMultiConnection.renegotiatedSessions[JSON.stringify(session)] = {
                                session: session,
                                stream: stream
                            }
                        
                            rtcMultiConnection.peers[message.userid].peer.connection.addStream(stream);
                            div.querySelector('#preview').onclick();
                        }, session);
                    }

                    if (message.hasScreen) {
                        var session = { screen: true };

                        rtcMultiConnection.captureUserMedia(function(stream) {
                            rtcMultiConnection.renegotiatedSessions[JSON.stringify(session)] = {
                                session: session,
                                stream: stream
                            }
                            
                            rtcMultiConnection.peers[message.userid].peer.connection.addStream(stream);
                            div.querySelector('#preview').onclick();
                        }, session);
                    }
                };
            }
        });
    }

    if (message.hasMic) {
        addNewMessage({
            header: message.extra.username,
            message: message.extra.username + ' enabled microphone. <button id="listen">Listen</button> ---- <button id="share-your-mic">Share Your Mic</button>',
            userinfo: '<img src="lib/rtc/html/images/action-needed.png">',
            color: message.extra.color,
            callback: function(div) {
                div.querySelector('#listen').onclick = function() {
                    this.disabled = true;
                    message.session.oneway = true;
                    rtcMultiConnection.sendMessage({
                        renegotiate: true,
                        streamid: message.streamid,
                        session: message.session
                    });
                };

                div.querySelector('#share-your-mic').onclick = function() {
                    this.disabled = true;

                    var session = { audio: true };

                    rtcMultiConnection.captureUserMedia(function(stream) {
                        rtcMultiConnection.renegotiatedSessions[JSON.stringify(session)] = {
                            session: session,
                            stream: stream
                        }
                        
                        rtcMultiConnection.peers[message.userid].peer.connection.addStream(stream);
                        div.querySelector('#listen').onclick();
                    }, session);
                };
            }
        });
    }

    if (message.renegotiate) {
        var customStream = rtcMultiConnection.customStreams[message.streamid];
        if (customStream) {
            rtcMultiConnection.peers[message.userid].renegotiate(customStream, message.session);
        }
    }
};


rtcMultiConnection.blobURLs = { };
rtcMultiConnection.STREAM_FOR_PREVIEW = '';
rtcMultiConnection.ONSTREAM = function(){};

rtcMultiConnection.onstream = function(e) {
    if (e.stream.getVideoTracks().length) {
        rtcMultiConnection.blobURLs[e.userid] = e.blobURL;
        /*
        if( document.getElementById(e.userid) ) {
            document.getElementById(e.userid).muted = true;
        }
        */
        addNewMessage({
            header: e.extra.username,
            message: e.extra.username + ' enabled webcam.',
            userinfo: '<video id="' + e.userid + '" src="' + URL.createObjectURL(e.stream) + '" autoplay muted=true volume=0></vide>',
            color: e.extra.color
        });
    } else {
        addNewMessage({
            header: e.extra.username,
            message: e.extra.username + ' enabled microphone.',
            userinfo: '<audio src="' + URL.createObjectURL(e.stream) + '" controls muted=true volume=0></vide>',
            color: e.extra.color
        });
    }
	

		console.log('enabled webcam !! ON STREAM  thisi si blob : ' + e.blobURL + " >>>>>>>>>> thsi is id :  " + e.userid );
		console.log('enabled webcam !! ON STREAM  thisi si stream id  : ' + e.streamid + " >>>>>>>>>> thsi is e.mediaElement :  " + e.mediaElement);
	
	e.mediaElement.id = e.streamid;
	rtcMultiConnection.STREAM_FOR_PREVIEW = e.streamid;
    usersContainer.appendChild(e.mediaElement);
	
	 rtcMultiConnection.ONSTREAM(e);  
	
	
};

rtcMultiConnection.sendMessage = function(message) {
    message.userid = rtcMultiConnection.userid;
    message.extra = rtcMultiConnection.extra;
    rtcMultiConnection.sendCustomMessage(message);
};

rtcMultiConnection.ONCLOSE = function(){};
rtcMultiConnection.onclose = rtcMultiConnection.onleave = function(event) {
	
	console.log(event.extra.username + ' leave the room');
	
	rtcMultiConnection.REMOTE_USERS.unset(rtcMultiConnection.userid);
	 
	 
	 
	 numbersOfUsers.innerHTML = parseInt(numbersOfUsers.innerHTML) - 0.5;
	 
    addNewMessage({
        header: event.extra.username,
        message: event.extra.username + ' left the room.',
        userinfo: getUserinfo(rtcMultiConnection.blobURLs[event.userid], 'lib/rtc/html/images/info.png'),
        color: event.extra.color
    });
	
   rtcMultiConnection.ONCLOSE(event);
   
};
