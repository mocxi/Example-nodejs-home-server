var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.render('index',{title:'Dashboard'});
});

router.get('/login', function(req, res) {
  res.render('login',{title:'login'});
});

router.get('/profile', function(req, res) {
  res.render('profile',{title:'profile'});
});

router.get('/general', function(req, res) {
  res.render('general',{title:'general'});
});
router.get('/buttons', function(req, res) {
  res.render('buttons',{title:'buttons'});
});
router.get('/buttons', function(req, res) {
  res.render('buttons',{title:'buttons'});
});
router.get('/panels', function(req, res) {
  res.render('panels',{title:'panels'});
});

router.get('/calendar', function(req, res) {
  res.render('calendar',{title:'calendar'});
});

router.get('/gallery', function(req, res) {
  res.render('gallery',{title:'gallery'});
});

router.get('/todo_list', function(req, res) {
  res.render('todo_list',{title:'todo_list'});
});

router.get('/blank', function(req, res) {
  res.render('blank',{title:'blank'});
});

router.get('/lock_screen', function(req, res) {
  res.render('lock_screen',{title:'lock_screen'});
});

router.get('/form_component', function(req, res) {
  res.render('form_component',{title:'form_component'});
});

router.get('/basic_table', function(req, res) {
  res.render('basic_table',{title:'basic_table'});
});

router.get('/responsive_table', function(req, res) {
  res.render('responsive_table',{title:'responsive_table'});
});

router.get('/morris', function(req, res) {
  res.render('morris',{title:'morris'});
});

router.get('/chartjs', function(req, res) {
  res.render('chartjs',{title:'chartjs'});
});

router.get('/video', function(req, res) {
  res.sendfile('./views/video.html',{title:'chartjs'});
});

module.exports = router;