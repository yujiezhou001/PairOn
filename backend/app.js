const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
// app.use(passport.session());

app.use(passport.initialize());
//app.use(passport.session());

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

// User Authentication
// knex.select("*")
// .from("users")
// .where("email", username)
// .then(user => console.log(user));
// }
// ))

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
          console.log("THIS IS DIRECTLY FROM CONSOLE LOG:", user);
          if (!user) return done(null, false);
          if (password !== user.password) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.id);
//   });

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: 'Invalid username or password.'})
//   );

//Socket Server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

const uuidv4 = require("uuid/v4");
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// Create broadcast function to send data to all clients
wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    client.send(message);
  });
};

// Function that generates random geolation around our location.
function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x / Math.cos(y0);

  // Resulting point.
  return { lat: y + y0, lng: xp + x0 };
}

function generateRandomPoints(center, radius, count) {
  var points = [];
  for (var i = 0; i < count; i++) {
    points.push(generateRandomPoint(center, radius));
  }
  return points;
}

const ourLocation = { lat: 0, lng: 0 };
const id = uuidv4();
const geolocations = generateRandomPoints(ourLocation, 100, 20);

const fakeExperience = [
  "All",
  "Food",
  "Drinks",
  "All",
  "All",
  "Culture",
  "Drinks",
  "Food",
  "Culture"
];

wss.on("connection", ws => {
  console.log("Client connected");
  ws.id = uuidv4();

  // once login authentication working - wrap all this code in "Usercredentials valid?"
  ws.on("message", function incoming(message) {
    const messageObj = JSON.parse(message);
    console.log("This is from received message:", messageObj);
  });

  const clientList = [];
  const currentUser = {};

  knex
    .select("*")
    .from("users")
    .where("id", "<", 10) // when login is implement : where (type = "fake")
    .then(results => {
      let i = 1;
      results.forEach(userObj => {
        clientList.push({
          id: i,
          firstName: userObj.first_name,
          hometown: userObj.hometown,
          experiences: fakeExperience[i],
          avatarURL: userObj.avatar_url,
          currentLocation: generateRandomPoint(ourLocation, 100),
          aboutMe: userObj.about_me,
          type: "incomingClientList"
        });
        i++;
        //console.log(results);
      });
    })
    .then(results => {
      const realUserId = 10; // Once login authentication implemented this value comes from the JWT.

      knex
        .select("*")
        .from("users")
        .where("id", realUserId)
        .then(result => {
          //const user = result[0]
          [user] = result;
          clientList.push({
            id: realUserId,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            password: user.password,
            hometown: user.hometown,
            experiences: "All",
            avatarURL: user.avatar_url,
            currentLocation: ourLocation,
            aboutMe: user.about_me,
            type: "incomingClientList"
          });
        })
        .finally(results => {
          console.log("hiiiiii", wss.clients.size);
          wss.clients.forEach(function each(client) {
            client.send(JSON.stringify({ clientList }));
            // console.log("CLIENT LIST SENT TO FRONT-END", wss.clients[10]);
          });
        });

      ws.on("message", function incoming(message) {
        const messageObj = JSON.parse(message);
        messageObj.id = uuidv4();

        console.log("This is from received message:", messageObj);

        switch (messageObj.type) {
          case "outgoingMessage":
            messageObj.type = "incomingMessage";

            // FIX!!!! THIS DOES NOT WORK -- SEE OBJECT FORMAT
            console.log("THIS HERRR IS CLIENT:", ws);
            wss.clients.forEach(function each(client) {
              if (messageObj.recipientId === client.id) {
                client.send(JSON.stringify(messageObj));
              }
            });

            break;
          case "outgoingClientList":
            messageObj.type = "incomingClientList";
            wss.broadcast(JSON.stringify(messageObj));
            break;
          case "outgoingCurrUserInfo":
            ourLocation.lat = messageObj.myLocation.lat;
            ourLocation.lng = messageObj.myLocation.lng;

            // messageObj.type = "incomingCurrUserInfo";
            // const realUserObj = {
            //   type: messageObj.type,
            //   currentUser: currentUser,
            //   id: messageObj.id
            // };

            // wss.broadcast(JSON.stringify(messageObj));
            // console.log("BACKEND - REAL USER OBJ", realUserObj);
            break;
          case "experiencePick":
            clientList.forEach(function(client) {
              if (client.id === messageObj.id) {
                client.experiences = messageObj.experiences;
                // console.log("EXP PICK - FR BACKEND:", messageObj);
              }
            });
            wss.broadcast(JSON.stringify(messageObj));
            break;
        }
      });

      // if (messageObj.type === "outgoingMessage") {
      //   messageObj.type = "incomingMessage";
      // } else if (messageObj.type === "outgoingClientList") {
      //   messageObj.type = "incomingClientList";
      // } else if (messageObj.type === "outgoingCurrUserInfo") {
      //   console.log(messageObj.currentLocation);
      //   ourLocation.lat = messageObj.myLocation.lat;
      //   ourLocation.lng = messageObj.myLocation.lng;

      //   console.log("OUR LOCATION:", ourLocation);
      // } else if (messageObj.type === "experiencePick") {
      //   clientList.forEach(function(client) {
      //     if (client.id === messageObj.id) {
      //       client.experiences = messageObj.experiences;
      //       console.log("EXP PICK - FR BACKEND:", messageObj);
      //     }
      //   });
      // }

      // console.log("MESSAGE RCD IN BACKEND:", messageObj);
      // wss.broadcast(JSON.stringify(messageObj));

      // Set up a callback for when a client closes the socket. This usually means they closed their browser.

      //receiving experience change + sending it back to all users
      // ws.on("message", function incoming(message) {
      //   let messageObj = JSON.parse(message);
      //   // console.log(messageObj)

      //   switch (messageObj.type) {
      //     case "experiencePick":
      //       clientList.forEach(function(client) {
      //         if (client.id === messageObj.id) {
      //           client.experiences = messageObj.experiences;
      //           console.log(messageObj);
      //         }
      //       });

      //       // SAME AS BROADCAST ABOVE
      //       wss.clients.forEach(function each(client) {
      //         client.send(JSON.stringify({ clientList }));
      //       });
      //       break;

      // case "updatedLocation":
      //   wss.clients.forEach(function each(client){
      //     client.send(JSON.stringify(messageObject));
      //   })
      // break;

      // });
      ws.on("close", () => console.log("Client disconnected"));
    });
});
