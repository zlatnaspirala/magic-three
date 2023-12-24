



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
