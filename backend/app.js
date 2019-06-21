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
require('dotenv').config();
// express server
const server = express();
require('dotenv').config();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
server.use(bodyParser.json());

server.use('/', indexRouter);
server.use('/users', usersRouter);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// var server = http.createServer(app);

//Express Server
const PORT = 3001;
server.listen(PORT, ()=>{
  console.log(`Server running at port ${PORT}`)
})

//Websocket Server
const SocketServer = require('ws').Server;
// const http = require('http');
// const uuidv4 = require('uuid/v4');
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
const clientList = {};
const id = uuidv4();
const geolocation =[
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]


wss.on('connection', (ws) => {
  console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
