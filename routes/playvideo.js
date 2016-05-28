var express = require('express');
var router = express.Router();
// var video = require('../VideoModule');
var video = require('vid-streamer');

var newVidSetting = {
	"mode": "development",
	"forceDownload": false,
	"random": false,
	"rootFolder": "./public/video/",
	"rootPath": "",
	"server": "VidStreamer.js/0.1.4"
}
//video.settings(newVidSetting);
router.get('/*', video);
// router.get('/', function(req, res) {
  // res.send('Welcome to video!');
// });

module.exports = router;