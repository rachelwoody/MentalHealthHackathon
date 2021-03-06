require('dotenv').config();
const express = require('express');
const path = require('path');
// express-validator is a wrapper around validator.js that validates and sanitizes string inputs. In production, your users will try to type in all kinds of nonsense into your forms --- even things your site wasn't intended to deal with! express-validator plugs into the Express.js ecosystem and helps keep you and your code safe.
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser'); //this basically allows us to get the request body from each well, request.
const logger = require('morgan');
// const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
// const expressFileupload = require('express-fileupload');
//Initialize a REST client in a single line:

const app = express();
// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
const exphbs = require('express-handlebars');

// shortcut so you don't have to name your file extensions .handlebars but .hbs
app.engine('hbs', exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: require("handlebars-helpers")()
}));
app.set('view engine', 'hbs');

// database connection
// require('./data/refugee-db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '../public'));
app.use(methodOverride('_method'));
// app.use(expressFileupload({}));

// require routers (mountable route handlers. This instead of passing in the whole app to each module.)
// const checkAuth = require('./middleware/checkAuth');
// const sendText = require('./middleware/sendText');
const indexRouter = require('./controllers/index');
// const twilio = require('./routes/twilio');

// specific custom auth checking middleware.

// app.use(checkAuth);
// app.use('/', checkAuth);
// app.use('/login', sendText);

// app.use('/', journalRouter);
// app.use('/', usersRouter);
// app.use('/', settingsRouter);
app.use('/', indexRouter);
// app.use('/', twilio);

// error handler - later.
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });


// for heroku
const port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;