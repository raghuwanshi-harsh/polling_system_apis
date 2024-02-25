const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbuser:dbuserpass@cluster0.9ekmoeb.mongodb.net/');

const db = mongoose.connection;

db.on('error',console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
