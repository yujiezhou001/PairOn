var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/chat', function(req, res, next) {
  res.json({
    test: "you hit chat"
  })
});

router.post('/register', function(req, res, next) {
  res.json({
    test: "you hit register"
  })
});

router.post('/login', function(req, res, next) {
  res.json({
    test: "you hit login"
  })
});

router.post('/users/:id', function(req, res, next) {
  res.json({
    test: "you hit submit"
  })
});

module.exports = router;
