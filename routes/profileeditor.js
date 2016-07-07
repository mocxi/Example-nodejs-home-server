var express = require('express');
var router = express.Router();
bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var pythonShell = require('python-shell');
var spawn = require("child_process").spawnSync;
var jsonViewer = require('../routes/JsonUtil.js');
var server = require('../server.js');

var LayoutConfig = require('../config/LayoutConfig');
var vidPath = 'public/video/';
// LayoutConfig.title = "Upload";
LayoutConfig.status = "None";

var credentialPrototype = 

router.get('/', function(req, res) {
    // console.log("status: " + req.query.q);    
    LayoutConfig.title = "ProfileEditor";
    // LayoutConfig.status = "None";
//    console.log(server.reloadVideoList());
//    if(LayoutConfig.Submit_status == "Successful"){
//	    console.log(server.reloadVideoList());
//    }
    //console.log('LayoutConfig.Submit_status: ' + LayoutConfig.Submit_status);
    
    res.render('ProfileEditor', LayoutConfig);
    LayoutConfig.Submit_status = "None";
    LayoutConfig.previous = "ProfileEditor";
});

router.get("/DownloadProfile", function(req, res){
	var file = __dirname + '/../TestScripts/profileOut.json';
	res.download(file);
});

router.post("/submitProfile", function(req, res, next){
    // var status = 404;
    console.log('submitProfile');
    console.log(req.body);
    console.log(req.body.credential);
    if(req.body.credential)
    {
    	//if(req.body.credential    
	arg = [];
	arg.push('TestScripts/ProfileUtilsCommand.py');
	arg.push(req.body.credential);
	arg.push(req.body.action);
	console.log('Get info!!!!');

	if(req.body.environment === 'on')
		if(req.body.password === 'axjfPT9K4csfFDrUkHLxenncvnDajpVy93a7TFtgXTbtpkvWq4w4ZmbzWWYCmChzPwc32pBusLsE9gfSpHQa994p2pxv4WCGS75bZLkg9rRDVVtCy8YxGNQ7gSW6kHG3')
			arg.push('True');
		else if(req.body.action === '5')
			arg.push('True');
		else
		{
			LayoutConfig.Submit_status = "Error";
			LayoutConfig.ErrorText = "Wrong password!!!";
			console.log(LayoutConfig.ErrorText + " req.body.password");
			return next();
		}
	else
		arg.push('False');
	//if(req.body.isTV === 'on')
	//	arg.push('True');
	var options = {
	//	pythonPath: '../../../../DevTools/Python27',
		args: arg
	}
	//var process = spawn('TestScripts/ProfileUtilsCommand.py', arg);
	var process = spawn('python', arg);
	console.log('sqawn log: \n' + process.stdout);
	//pythonShell.run('TestScripts/ProfileUtilsCommand.py', options, function(err, results){
	//	if (err) throw err;
	//	console.log('results: %j', results);
	//});
	//console.log(arg);
	LayoutConfig.Submit_status = "Successful";
	LayoutConfig.PostLog = process.stdout;
	LayoutConfig.Credential = req.body.credential;
	LayoutConfig.LastAction = req.body.action;
	if(req.body.action === '5')
	{
		//LayoutConfig.ProfileJson = jsonViewer(require('../TestScripts/profileOut.json'));
		LayoutConfig.ProfileJson = require('../TestScripts/profileOut.json');
	}
	return next();
    }
    else{
	//LayoutConfig.ProfileJson = jsonViewer(require('../TestScripts/profileOut.json'));
        console.log("No data found!!!");
        LayoutConfig.Submit_status = "Error";
	LayoutConfig.ErrorText = "Recheck the info!";
        next();
        // next('route');
    }
}, function(req, res){
    //backURL=req.header('Referer') || '/';
    
    //Remove temp file
    LayoutConfig.previous = 'submitProfile';
    res.redirect('back');
    res.end();
});

module.exports = router;
