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
LayoutConfig.ActionList = {
    "1" : "Full Profile",
    "2" : "Full Inventory",
    "3" : "Clear Activities",
    "4" : "Clear Profile",
    "5" : "Get Profile",
    "6" : "Push: XP | Credits",
    "7" : "Clear power user"
};

var credentialPrototype = /((anonymous|google|facebook):.*=)/;

router.get('/', function(req, res) {
    // console.log("status: " + req.query.q);    
    LayoutConfig.title = "ReportEditor";
    // LayoutConfig.status = "None";
//    console.log(server.reloadVideoList());
//    if(LayoutConfig.Submit_status == "Successful"){
//	    console.log(server.reloadVideoList());
//    }
    //console.log('LayoutConfig.Submit_status: ' + LayoutConfig.Submit_status);
    
    res.render('ReportEditor', LayoutConfig);
    LayoutConfig.Submit_status = "None";
    LayoutConfig.previous = "ProfileEditor";
});


router.post("/submitReport", function(req, res, next){
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

		LayoutConfig.LastAction = req.body.action;
		arrayResult = req.body.credential.match(credentialPrototype);
		if(arrayResult)
		{
				//console.log(arrayResult);
		}
		else
		{
				LayoutConfig.Submit_status = "Error";
				LayoutConfig.ErrorText = "Credential wrong format!!!";
				return next();
		}

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

		if(req.body.isTV === 'on')
            arg.push('True');
        else
            arg.push('False');
        if(req.body.action === '6')
        {
            if(req.body.inputXP)
            {
                arg.push('--xp');
                arg.push(req.body.inputXP);
            }
            if(req.body.inputCredits)
            {
                arg.push('--credits');
                arg.push(req.body.inputCredits);
            }
        }

		//	arg.push('True');
		var options = {
		//	pythonPath: '../../../../DevTools/Python27',
			args: arg
		}
        console.log(options);
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
