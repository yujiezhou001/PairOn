const express = require('express');
const flash=require("connect-flash");
const faker=require("faker")
const router = express.Router();
const passport = require('passport');
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig["development"]);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/current_user', (req, res) => {
  console.log("Current User:", req.user)
  res.json({userObj: req.user, authorize: true})
})

router.post('/chat', function(req, res, next) {
  res.json({
    test: "you hit chat"
  })
});

router.post('/register', function(req, res, next) {
  const { firstname, lastname, email, password, hometown } = req.body;
  const avartar_url = faker.internet.avatar();
  const registerObject = {};
  registerObject.first_name = firstname;
  registerObject.last_name = lastname;
  registerObject.email = email;
  registerObject.password = password;
  registerObject.hometown = hometown;
  registerObject.avatar_url = avartar_url;
  registerObject.hometown_latitude = null;
  registerObject.hometown_longitude = null;
  registerObject.about_me = null;
  registerObject.type = "real";
  knex('users')
    .insert([registerObject])
    .into('users')
    .returning(['id', 'first_name', 'last_name', 'email', 'password', 'hometown', 'avatar_url', 'about_me', 'type', 'created_at', 'updated_at'])
    .then(results => {
      const user = results[0];
      req.login(user, function(err) {
        console.log("Req.User:", user);
        if (err) { return next(err); }
        res.json({userObj: req.user, authorize: true})
      });
    })
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json({userObj: req.user, authorize: true})
  });


router.get('/logout', function(req, res){
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid');
    res.json({authorize: false, userObj: {}}) //Inside a callback… bulletproof!
  });
});

router.post('/users/:id', function(req, res, next) {
  res.json({
    test: "you hit submit"
  })
});

module.exports = router;
