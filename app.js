const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const jwt = require('jsonwebtoken')

const indexRouter = require('./src/controllers/index');
const usersRouter = require('./src/controllers/users');

const cors = require('cors')

var app = express();


const publicAPIs = [
  '/api/users/login',
  '/api/users/register'
]
const secret = "tttgalaxy-secret-key"

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// var whitelist = ['https://www.tttgalaxy.co.uk', 'localhost:3000', 'http://www.tttgalaxy.co.uk']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }


checkAuthenticate = (req, res, next) => {
  if (publicAPIs.includes(req.url)) return next();
  let token = req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.send({error: createError(401), data: err})
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    res.send({error: createError(401)})
  }
}

// app.use(cors(corsOptions))
app.use(cors())
app.use(checkAuthenticate)


// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);

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
