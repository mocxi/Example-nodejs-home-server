var express = require('express'),
 fs = require('fs'),
 //stylus = require('stylus'),
 http = require('http'),
 path = require('path'),
 morgan = require('morgan'),
 pug = require('pug'),
 vidStreamer = require("vid-streamer"),
 index = require("./routes/index"),
 videoSite = require("./routes/playvideo"),
 uploadSite = require("./routes/upload"),
 printIPAddr = require('./IPAddress');

var app = express();

//config
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(require('stylus').middleware(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public')))

//function
app.use('/', index);
app.use('/playvideo', videoSite);
app.use('/upload', uploadSite);

// app.get('/', function(req, res){
	// res.render('index',
	// {title: 'Home'}
	// )
// });

// app.get('/PlayVideo', function(req, res){
	// res.render('PlayVideo',
	// {title: 'Video'}
	// )
// });// app.get("/videos/", vidStreamer);
//run
app.listen(app.get('port'), function () {
	console.log('MyPage listening on port ' + app.get('port') + '!');
	printIPAddr();
});