var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

const mongoose = require('mongoose');
const mongoDB = "mongodb://127.0.0.1:27017/bookdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

var app = express();

if (process.env.NODE_ENV === "development") {
  var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  console.log("CORS works!");
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

module.exports = app;
