const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig['development']);
const http = require('http');
require('dotenv').config();

// express server
const app = express();
//Websocket Server

const SocketServer = require('ws');
var server = http.createServer(app);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//Express Server
const PORT = 3001;
server.listen(PORT, ()=>{
  console.log(`Server running at port ${PORT}`)
})


const uuidv4 = require('uuid/v4');
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// Function that generates random geolation around our location.
function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius/111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x/Math.cos(y0);

  // Resulting point.
  return {lat: y+y0, lng: xp+x0};
}

function generateRandomPoints(center, radius, count) {
  var points = [];
  for (var i=0; i<count; i++) {
    points.push(generateRandomPoint(center, radius));
  }
  return points;
}

const ourLocation = {lat: 45.5269919, lng:-73.5967626};
// const clientList = {};
const id = uuidv4();
const geolocations = generateRandomPoints(ourLocation, 100, 20);

const fakeExperience = ['All',
                        'Food',
                        'Drink',
                        'All',
                        'All',
                        'Culture',
                        'Drink',
                        'Food',
                        'Culture'
                        ]

wss.on('connection', (ws) => {
  console.log('Client connected');
// once login authentication working - wrap all this code in "Usercredentials valid?"

  let clientList =[];

  knex
    .select("*")
    .from("users")
    .where('id', '<',10)
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
          aboutMe: userObj.about_me }
        );
        i++;
        //console.log(results);
      })
      console.log(clientList[0].currentLocation)
    })
    .then(results => {
    const realUserId = 10; // Once login authentication implemented this value comes from the Cookie.

    knex
      .select('*')
      .from("users")
      .where('id', realUserId)
      .then(result => {
        clientList.push({
          id: realUserId,
          firstName: result.first_name,
          lastName: result.last_name,
          email: result.email,
          password: result.password,
          hometown: result.hometown,
          experiences: "All",
          avatarURL: result.avatar_url,
          currentLocation: ourLocation,
          aboutMe: result.about_me});
      })
    .finally(results=>{
      wss.clients.forEach(function each(client){
        client.send(JSON.stringify({clientList}));
      })
    })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  });

  ws.on('close', () => console.log('Client disconnected'));

});
