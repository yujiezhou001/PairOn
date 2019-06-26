const express = require('express');
const bodyParser = require("body-parser");
const flash=require("connect-flash");
const router = express.Router();
const passport = require('passport')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/current_user', (req, res) => {
  res.json({userObj: req.user, authorize: true})
})

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


// router.post('/login',
//   passport.authenticate('local', 
//     { 
//       successRedirect: '/', 
//       failureRedirect: '/login' 
//     }
//   )
// );

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json({userObj: req.user, authorize: true})
  });


  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  
// router.post('/login', function(req, res, next) {
//   res.send({
//     email: req.body.username,
//     password: req.body.password,
//     test: "you hit login"
//   })
// });

router.post('/users/:id', function(req, res, next) {
  res.json({
    test: "you hit submit"
  })
});

module.exports = router;
