
## Backend part based on multiRTC3.
For now only signaling pricipe is implemented.
If you wanna start host server and broadcaster[webRtc] then:

```js
cd backend
npm i
npm run magic
```

Setup in backend/magic-three.server.js your own domain: 
If you put "*" in public server someone can use your web app cross domain.
This will be automated in future.
```js
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'https://localhost:9001');
    res.setHeader('Access-Control-Allow-Origin', 'https://maximumroulette:9001');
```

I force default browser port 443! To make all works fine (CORS problems).
For `localhost` cert also better https. For public server you need classic ssl setup.

Navigate (most simple way to fix localhost cert problem is to click advanced -> Proceed to localhost (unsafe))
https://localhost/public/module.html

If still networking not work then goto:
https://localhost:9001/
click advanced -> Proceed to localhost (unsafe)

Finally when you see html text:
```txt
********************************************************** 
* MatrixNet         version: 0.2.0                       * 
* Type of network - BROADCASTER                          * 
* Source: https://github.com/zlatnaspirala/matrix-engine * 
**********************************************************
```
Server is allowed for localhost.

After all goto https://localhost/public/module.html
Must work now.
You can easy manage paths. Default is `https` protocol and also recommended in multiplayer mode.
