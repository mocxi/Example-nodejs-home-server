//Requirement moudules
var express = require('express');
var LocalStrategy = require('passport-local');
var router = express.Router();
var passport = require('passport');
var funct = require('../config/function');
router.get('/', function(reg, res){
	res.render('login');
});

var parser = require('body-parser');

router.use(passport.initialize());
router.use(passport.session());
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('body-parser').json());
router.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));



// Use the LocalStrategy within Passport to login/”signin” users.

passport.use('local-signin', new LocalStrategy(
	{passReqToCallback : true}, //allows us to pass back the request to the callback
	function(req, username, password, done) {
	funct.localAuth(username, password)
	.then(function (user) {
		console.log('local-signin');
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
	console.log('local-signin end');
	}
));

passport.use(new LocalStrategy.Strategy(
  function(username, password, cb) {
	  console.log('local');
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }
 )
);

passport.serializeUser(function(user, cb) {
	console.log('serializeUser');
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

router.post('/',passport.authenticate('local-signin', {
	successRedirect: '/',
	failureRedirect: 'login'
	})
);
/*router.post('/', function(req, res, next) {
    console.log("reached auth endpoint");
    console.log(req.body);
    passport.authenticate('local-signin', {
        session: false
    }, function(err, user, info) {
            console.log("Test:" + user);
            if (err) {
                console.log("Error1");
                return next(err);
            }
            if (!user) {
                console.log("Error2");
                return res.status(401).json( {
                    error: 'Auth Error!'
                });
            }
            console.log("Error3");
            var token = jwt.encode({
                username: user.email
            }, "hanswurst");
            res.json({
                token: token
            });
        })(req, res, next);
});*/
/*router.post('/', passport.authenticate('local'), function(req, res) {
	console.log('login postttttttttttttttttt');
});*/

module.exports = router;
