
/**
 * @description
 * MatrixNet - Main networking class
 * for matrix-engine workplace.
 */
const ServerConfig = require("./server-config.js");
const serverConfig = new ServerConfig();

var Broadcaster = require("./broadcaster");
broadcaster = new Broadcaster(serverConfig);

if (serverConfig.ownHosting == true) {

  var express = require("express");
  var cors = require("cors");
  var https = require("https");
  var hostingHTTP = express();

  if (serverConfig.serverMode === "dev") {
    options = {
      key: fs.readFileSync(serverConfig.certPathSelf.pKeyPath),
      cert: fs.readFileSync(serverConfig.certPathSelf.pCertPath),
      ca: fs.readFileSync(serverConfig.certPathSelf.pCBPath),
    };
  } else if (serverConfig.serverMode === "prod") {
    options = {
      key: fs.readFileSync(serverConfig.certPathProd.pKeyPath),
      cert: fs.readFileSync(serverConfig.certPathProd.pCertPath),
      ca: fs.readFileSync(serverConfig.certPathProd.pCBPath),
    };
  } else {
    console.warn(
      "Something wrong with serverConfig certPathProd/certPathSelf path."
    );
  }
}

var Reset = '\x1b[0m';
console.log('\x1b[42m', 'Magic-Three-Server running... 🤘 [Enjoy]', Reset);
