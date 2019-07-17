const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const session = require("express-session");
const usersRouter = require("./routes/users");
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig["development"]);
const http = require("http");
require("dotenv").config();
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");

// express server
const app = express();
//Websocket Server

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: true,
  maxAge: 600
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

const SocketServer = require("ws");
var server = http.createServer(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Create empty arrays and objects
let clientList = [];
let currentUser = {};
let eventsList = [];
let userCredentials = false;

// Authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },

    function(username, password, done) {
      knex
        .select("*")
        .from("users")
        .where("email", username)
        .first()
        .then(user => {
          if (!user) return done(null, false, { message: 'Invalid Email' });
          if (password !== user.password) {
            return done(null, false, { message: 'Invalid Password' });
          } else {
            currentUser.id = user.id;
            currentUser.firstName = user.first_name;
            currentUser.lastName = user.last_name;
            currentUser.email = user.email;
            currentUser.hometown = user.hometown;
            currentUser.avatarURL = user.avatar_url;
            currentUser.aboutMe = user.about_me;
            currentUser.experiences = user.experiences;
            currentUser.currentLocation = ourLocation;
            currentUser.type = "incomingClientList";
            userCredentials = true;
            clientList.push({
              id: user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              hometown: user.hometown,
              experiences: "All",
              avatarURL: user.avatar_url,
              currentLocation: ourLocation,
              aboutMe: user.about_me,
              type: "incomingClientList"
          });
            return done(null, currentUser);
          }
        })
        .catch(err => {
          return (err);
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//Select first ten users in the database to show on the map
knex
  .select("*")
  .from("users")
  .where("id", "<", 10)
  .then(results => {
    let i = 1;
    results.forEach(userObj => {
      clientList.push({
        id: i,
        firstName: userObj.first_name,
        hometown: userObj.hometown,
        experiences: fakeExperience[i],
        avatarURL: userObj.avatar_url,
        currentLocation: fakeLocations[i], //generateRandomPoint({lat:45.530336999999996, lng:-73.60290119999999}, 100),
        aboutMe: userObj.about_me,
        type: "incomingClientList"
      });
      i++;
    });
  });

//Socket Server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

const uuidv4 = require("uuid/v4");
const wss = new SocketServer.Server({ server });

//Create broadcast function to send data to all clients
wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    client.send(message);
  });
};

//Function that generates random geolation around our location.
function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  //Convert Radius from meters to degrees.
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x / Math.cos(y0);

  //Resulting point.
  return { lat: y + y0, lng: xp + x0 };
}

function generateRandomPoints(center, radius, count) {
  var points = [];
  for (var i = 0; i < count; i++) {
    points.push(generateRandomPoint(center, radius));
  }
  return points;
}

const ourLocation = { lat: 0, lng: 0 }; //{ lat: 45.530336999999996, lng: -73.60290119999999};
const id = uuidv4();
const geolocations = generateRandomPoints(ourLocation, 100, 20);

//Create experiences for selected users who show on the map
const fakeExperience = [
  "all",
  "food",
  "drinks",
  "all",
  "all",
  "culture",
  "drinks",
  "food",
  "culture"
];

//Create locations for users who show on the map
const fakeLocations = [
  { lat: 45.525063, lng: -73.59943 },

  { lat: 45.5246127, lng: -73.5987241 },
  {
    lat: 45.52744,
    lng: -73.59643
  },
  {
    lat: 45.527255,
    lng: -73.597953
  },
  {
    lat: 45.5274897,
    lng: -73.5984506
  },
  {
    lat: 45.5311081,
    lng: -73.5995769
  },
  {
    lat: 45.5351011,
    lng: -73.5995709
  },
  {
    lat: 45.5241357,
    lng: -73.5970109
  },
  {
    lat: 45.5279216,
    lng: -73.5965196
  },
  {
    lat: 45.5277183,
    lng: -73.5944831
  },
  {
    lat: 45.5303865,
    lng: -73.5988069
  },
  {
    lat: 45.5263447,
    lng: -73.5983598
  },
  {
    lat: 45.5261267,
    lng: -73.5972654
  },
  {
    lat: 45.52714,
    lng: -73.59613
  }
];


wss.on("connection", ws => {
  console.log("Client connected");
  //Send clientList to front end upon user login
  if (userCredentials === true) {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({ clientList }));
    });
  
    ws.send(JSON.stringify({eventsList}));
  
  
    ws.on("message", function incoming(message) {
      const messageObj = JSON.parse(message);
  
    
      switch (messageObj.type) {
        //Send chat messages backt to front-end
        case "outgoingMessage":
          messageObj.type = "incomingMessage";
          messageObj.id = uuidv4();
          wss.broadcast(JSON.stringify(messageObj));
          break;
        //Update current user's real time location in the clientList
        case "outgoingCurrUserInfo":
          clientList.forEach(function(client) {
            if (client.id === messageObj.id) {
              client.currentLocation = messageObj.myLocation;
              //DO not change, this is updating clientlist and below broadcasting!
            }
          });
          wss.broadcast(JSON.stringify({ clientList }));
          break;
        //Update current user's selected experience in the clientList
        case "experiencePick":
          clientList.forEach(function(client) {
            if (client.id === messageObj.id) {
              client.experiences = messageObj.experiences;
              //DO not change, this is updating clientlist and below broadcasting!
            }
          });
          wss.broadcast(JSON.stringify({ clientList }));
          break;
        //Create current user's event
        case "newEventPin":
          messageObj.uuid = uuidv4();
          eventsList.push(messageObj);
          wss.broadcast(JSON.stringify({ eventsList }));
          break;
        //Remove current user's event
        case "removeEvent":
          eventsList = eventsList.filter(oneEvent => {
            if (oneEvent.uuid !== messageObj.uuid) {
              return oneEvent;
            }
          });
          wss.broadcast(JSON.stringify({ eventsList }));
          break;
      }
    });
  
  
  
    ws.on('close', () => {
      
      console.log("Client disconnected")
  
      //Current user is removed from clientList on disconnection.
  
      
      clientList = clientList.filter(client => client.id !== currentUser.id)
      wss.broadcast(JSON.stringify({ clientList }));
  
    })
  }
  
});
