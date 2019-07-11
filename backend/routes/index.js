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
        console.log("Registered User:", user);
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
    // res.redirect('/')
  });


router.get('/logout', function(req, res){
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid');
    res.json({authorize: false, userObj: {}}) //Inside a callback… bulletproof!
  });
});

router.post('/users/:id', function(req, res, next) {
  const { firstname, lastname, hometown, email, password, aboutme } = req.body;
  const user_id = req.user.id;
  const profileObject = {};
  console.log("This is from updated profile", user_id)
  profileObject.first_name = firstname;
  profileObject.last_name = lastname;
  profileObject.email = email;
  profileObject.password = password;
  profileObject.hometown = hometown;
  profileObject.about_me = aboutme;
  if (profileObject.first_name.length === 0) {
    delete profileObject.first_name;
  }
  if (profileObject.last_name.length === 0) {
    delete profileObject.last_name;
  }
  if (profileObject.email.length === 0) {
    delete profileObject.email;
  }
  if (profileObject.password.length === 0) {
    delete profileObject.password;
  }
  if (profileObject.hometown.length === 0) {
    delete profileObject.hometown;
  }
  if (profileObject.about_me.length === 0) {
    delete profileObject.about_me;
  }
  knex("users")
    .where("id", user_id)
    .update(profileObject)
    .returning(['id', 'first_name', 'last_name', 'email', 'password', 'hometown', 'avatar_url', 'about_me', 'type', 'created_at', 'updated_at'])
    .then(results => {
      const user = results[0];
      req.login(user, function(err) {
        console.log("Updated:", user);
        if (err) { return next(err); }
        res.json({userObj: user, authorize: true})
      });
    });
});

module.exports = router;
