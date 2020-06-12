const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConnect');
const passport = require('passport');

const app = express();

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
const index = require('./api/routes/index');
const user = require('./api/routes/user');
const annotations = require('./api/routes/annotations');

const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);
  next();
};

app.use(logRequestStart);

//connect database
connectDB();

// passport-Setup
app.use(passport.initialize());
app.use((req, res, next) => {
  //CORS

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin'
  );
  next();
});

require('./config/passport')(passport);

app.use('/api', index);
app.use('/api/user', user);
app.use('/api/annotation', annotations);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
