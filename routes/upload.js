var express = require('express');
var router = express.Router();
var util = require("util");
var fs = require("fs");

var multer  = require('multer');
var upload = multer({ dest: 'upload/' });

var server = require('../server.js');

var LayoutConfig = require('../config/LayoutConfig');
var vidPath = 'public/video/';
// LayoutConfig.title = "Upload";
LayoutConfig.status = "None";


router.get('/', function(req, res) {
    // console.log("status: " + req.query.q);
    console.log('Upload page loading!')
    LayoutConfig.title = "Upload";
        
    res.render('Upload', LayoutConfig);
    LayoutConfig.Upload_status = "None";
    LayoutConfig.previous = "Upload";
});

router.post("/uploadVideo", upload.single('VidFile'), function(req, res, next){
    // var status = 404;
    if(req.file)
    {
        console.log("get file!");
        var tmp_path = req.file.path;

        /** The original name of the uploaded file
        stored in the variable "originalname". **/
        var target_path = vidPath + req.file.originalname;
        //Check file if exists best solution
        fs.exists(target_path, function(exists){
            if(exists){
                console.log('exists');
                LayoutConfig.Upload_status = "Conflict";
                next();
            }
            else{
                console.log('not exists');
                /** A better way to copy the uploaded file. **/
                var src = fs.createReadStream(tmp_path);
                var dest = fs.createWriteStream(target_path);
                src.pipe(dest);
                src.on('end', function() { 
		    //reload Vid list json
		    console.log(server.reloadVideoList());
                    LayoutConfig.Upload_status = "Successful";
                    console.log('uploadVideo, Successful');
                    next();
                });
                
                src.on('error', function(err) {
                    console.log('uploadVideo, Error');
                    LayoutConfig.Upload_status = "Error";
                    next();
                });
            }
        });
    }
    else{
        console.log("no file selected!");
        LayoutConfig.Upload_status = "Error";
        next();
        // next('route');
    }
}, function(req, res){
    //backURL=req.header('Referer') || '/';
    
    //Remove temp file
    if(req.file)
        fs.unlink(req.file.path);
    LayoutConfig.previous = 'uploadVideo';
    res.redirect('back');
    res.end();
});

module.exports = router;
