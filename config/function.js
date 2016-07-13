// functions.js/
var bcrypt = require('bcryptjs'),
    Q = require('q'),
    config = require('../config'), //config file contains all tokens and other private info
    Datastore = require('nedb'),
    db = new Datastore({filename: 'db/UserDatabase.db'}); //config.db holds Orchestrate token
db.loadDatabase(function(err){
	console.log('loadDatabase!');
    console.log(err);
});
console.log(config.db);
//used in local-signup strategy
exports.localReg = function (username, password) {
  var deferred = Q.defer();
  var hash = bcrypt.hashSync(password, 8);
  var user = {
    "username": username,
    "password": hash,
    "extra" : {
        
        "avatar": "db/user/avatar/Fallout_y.jpg",
        "birth_day": "1Jan2000",
        "gender": true        
 functional   }
    "date_created": new Date().toISOString(),
    "date_updated": new Date().toISOString()
  }

  console.log(user);
  //check if username is already assigned in our database
  //wip modify to run with nedb
  db.find('local-users', username)
  .then(function (result){ //case in which user already exists in db
    console.log('username already exists');
    deferred.resolve(false); //username already exists
  })
  .fail(function (result) {//case in which user does not already exist in db
      console.log(result.body);
      if (result.body.message == 'The requested items could not be found.'){
        console.log('Username is free for use');
        db.put('local-users', username, user)
        .then(function () {
          console.log("USER: " + user);
          deferred.resolve(user);
        })
        .fail(function (err) {
          console.log("PUT FAIL:" + err.body);
          deferred.reject(new Error(err.body));
        });
      } else {
        deferred.reject(new Error(result.body));
      }
  });

  return deferred.promise;
};

//check if user exists
    //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
      //if password matches take into website
  //if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (username, password) {
	var deferred = Q.defer();
	console.log('localAuth');
	
	db.put('users', 'batman', {
		"name": "Bruce Wayne",
		"hometown": "Gotham City",
		"cape": true
	})
	.then(function (res) {
		console.log('put!');
		console.log(res); // prints response
	})
	.fail(function (err) {
		console.log('put!');
		console.log(err); // prints error
	});
	// db.get('local-users', username)
	// .then(function (result){
			// console.log("FOUND USER");
			// var hash = result.body.password;
			// console.log(hash);
			// console.log(bcrypt.compareSync(password, hash));
			// if (bcrypt.compareSync(password, hash)) {
				// deferred.resolve(result.body);
			// }
			// else {
			  // console.log("PASSWORDS NOT MATCH");
			  // deferred.resolve(false);
			// }
	// }).fail(function (err){
		// if (err.body.message == 'The requested items could not be found.'){
			// console.log("COULD NOT FIND USER IN DB FOR SIGNIN");
			// deferred.resolve(false);
		// } else {
			// deferred.reject(new Error(err));
			// console.log('localAuth error!');
		// }
	// });
	
	db.get('users', 'batman')
	.then(function (res) {
		console.log('get!');
		console.log(res.body); // prints response body
		console.log(res.body.name); // prints 'Bruce Wayne'
		deferred.resolve(res.body);
	})
	.fail(function (err) {
		console.log('get!');
		console.log(err); // prints error
		deferred.resolve(false);
	});
	
	console.log('localAuth waiting for deferred return promise!');
	return deferred.promise;
}
