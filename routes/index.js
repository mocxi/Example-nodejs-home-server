var express = require('express');
var router = express.Router();
var vidList = require('../config/VidList');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

var LayoutConfig = require('../config/LayoutConfig');

router.get('/', function(req, res) {
  // res.render('index',{title:'Dashboard', menu:{Dashboard: "Dashboard", m2: "menu2", m3: "menu3"}});
  LayoutConfig.title = "Dashboard";
  res.render('index', LayoutConfig);
});

router.get('/VideoList', function(req, res) {
    LayoutConfig.title = "VideoList";
    LayoutConfig.video = vidList.video;
    res.render('VideoList', LayoutConfig);
})

router.get('/login', function(req, res) {
  res.render('login',{title:'login'});
});

router.get('/profile', function(req, res) {
  res.render('profile',{title:'profile'});
});

router.get('/*', function(req, res, next) {
  // console.log(req.url);
  // console.log(req.params.filepath);
  if (req.url === '/' || req.url === '/login' || req.url.search('/playvideo') !== -1)
  {
      console.log("next()" + req.url);
      return next();
  }
  // LayoutConfig.title = ".*";
  res.render(req.url.replace('/',''),LayoutConfig);
});
// router.get('/buttons', function(req, res) {
  // res.render('buttons',{title:'buttons'});
// });
// router.get('/buttons', function(req, res) {
  // res.render('buttons',{title:'buttons'});
// });
// router.get('/panels', function(req, res) {
  // res.render('panels',{title:'panels'});
// });

// router.get('/calendar', function(req, res) {
  // res.render('calendar',{title:'calendar'});
// });

// router.get('/gallery', function(req, res) {
  // res.render('gallery',{title:'gallery'});
// });

// router.get('/todo_list', function(req, res) {
  // res.render('todo_list',{title:'todo_list'});
// });

// router.get('/blank', function(req, res) {
  // res.render('blank',{title:'blank'});
// });

// router.get('/lock_screen', function(req, res) {
  // res.render('lock_screen',{title:'lock_screen'});
// });

// router.get('/form_component', function(req, res) {
  // res.render('form_component',{title:'form_component'});
// });

// router.get('/basic_table', function(req, res) {
  // res.render('basic_table',{title:'basic_table'});
// });

// router.get('/responsive_table', function(req, res) {
  // res.render('responsive_table',{title:'responsive_table'});
// });

// router.get('/morris', function(req, res) {
  // res.render('morris',{title:'morris'});
// });

// router.get('/chartjs', function(req, res) {
  // res.render('chartjs',{title:'chartjs'});
// });

// router.get('/video', function(req, res) {
  // res.sendfile('./views/video.html',{title:'chartjs'});
// });

module.exports = router;