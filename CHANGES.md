
# CHANGES
## MAGIC-THREE Project





### 0.3.0
  Tested on android 

  Delay 4s to fix:
```json
sdp-error InvalidStateError: Failed to execute 'createAnswer' on 'RTCPeerConnection': PeerConnection cannot create an answer in a state other than have-remote-offer or have-local-pranswer.

RTCMultiConnection3.js:2960 setLocalDescription error InvalidStateError: Failed to execute 'setLocalDescription' on 'RTCPeerConnection': Failed to set local offer sdp: Called in wrong state: have-remote-offer
```

### 0.1.1

 Fix net player rotation.
 Use raycaster from three.js best solution for triggering and detecting bullet vs net_PLAYERS...
 


### 0.1.0

Make it possible edit in runtime:
```js
addEventListener('config.map.blockingVolumes.visible', (e) => {
  boxHelper.visible = e.detail.map.blockingVolumes.visible;
})
```
