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
 profileEditorSite = require("./routes/profileeditor"),
 loginSite = require("./routes/login"),
 pythonShell = require('python-shell'),
 passport = require('passport'),
 funct = require('./config/function'),
 LocalStrategy = require('passport-local'),
 os = require('os'),
 printIPAddr = require('./IPAddress');

var app = express();
var port = 4000;
var hostUrl = os.hostname() + port;
//config
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(require('stylus').middleware(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public')))

/*passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));
*/
//app.use(passport.initialize());
//app.use(passport.session());

//function
app.use('/', index);
app.use('/playvideo', videoSite);
app.use('/upload', uploadSite);
app.use('/login', loginSite);
app.use('/profileeditor', profileEditorSite);

module.exports.hostUrl = hostUrl;

module.exports.reloadVideoList = function(){
	pythonShell.run('GetVideoPath.py', function(err, msg){
		if (err) throw err;
		console.log(msg);
		console.log('finished');
		index.reloadVidList();
	});
	return "Reload Video List";
};

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
	console.log('window.location.host: ' + hostUrl);
	printIPAddr();
});
