const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

// used for session cookie
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = new MongoStore(
  {
    mongooseConnection: db,
    autoRemove: 'disabled'
  },
  function(err){
    console.log(err || 'connect-mongodb setup ok')
  }
);

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: 'polling_system_api',
    // ToDo change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: sessionStore,
  })
  );
  
// Use express router
app.use('/', require('./routes'));
    
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
