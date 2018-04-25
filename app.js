// Note: Back-end makes use of CommonJS modules:
// Characterised by following statements:
//  - require
//  - module.exports
// https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/

// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// Ensure model is created before passport uses it
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// Wire up middlewares for route handlers
app.use(bodyParser.json());
app.use(
    // Limit on total size of all cookies for a domain <= 4093 bytes
    // We are only using internal user id so well within limit
    //  - stick all data in the cookie -> use cookie-session
    // If we had lots more session data then:
    //  - use express-session instead of cookie-session
    //  - this just passes a session id in cookie and is used to look up
    //    the related session data in an external store (e.g. database/cache)
    cookieSession({
        // 30 Days in milliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// Set up routes
// Required file exports a function which we then call with app as parameter
require('./routes/index')(app);
require('./routes/auth')(app);
require('./routes/billing')(app);

// Handle Production config
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production built assets
    // e.g. main.js, main.css etc
    app.use(express.static('client/build'));

    // Express will serve up index.html
    // if it doesn't recognise the route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;
