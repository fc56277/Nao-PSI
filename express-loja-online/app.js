var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog");
//var userRouter = require('./routes/user');

var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://fc56292:mPFyAfkivzGYvBQV@cluster0.dtza9rt.mongodb.net/ProjetoPSI17";
// const mongoDB = "mongodb://psi017:psi017@localhost:27017/psi017?retryWrites=true&authSource=psi017";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: 'foo',
  store: MongoStore.create({
    mongoUrl: mongoDB,
    mongooseConnection: mongoose.connection
  }),
  resave: false,
  saveUninitialized: false
}));

// ALTERNATIVA - FALAR COM PROFESSORA
// app.use(session({
//   secret: 'foo',
//   resave: false,
//   saveUninitialized: false
// }));


// Middleware for parsing JSON request body
//app.use(express.json());
app.use(cors({ origin: ["http://appserver.alunos.di.fc.ul.pt:3017"], credentials: true }));
// app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', catalogRouter); // Add catalog routes to middleware chain.
app.use('/api/users', usersRouter);
//app.use('/api/user', userRouter);

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

module.exports = app;
