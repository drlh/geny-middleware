"use strict"

// Modules
var express = require('express');
var logger = require('morgan');
var session = require('express-session');
//var fs = require("fs");

var Grant = require('grant-express');
var grant = new Grant(require('./config.json'));

// MODULES
var frontend = require('./config/frontend');


// Initialize express
var app = express()
app.use(logger('dev'));

// REQUIRED:
app.use(session({
	secret : '071018184da8093ecadaec78ac251963c9a39b9c'
}));
// mount grant
app.use(grant);



//==================API-ROUTES=================================
require('./app/routes/xing')(app); //get the xing routes
//require('./app/routes/empl')(app); //get the employee routes
require('./app/routes/sales')(app); //get the sales routes

//==================SERVER=====================================
app.listen(3000, function() {
	console.log('Express server listening on port ' + 3000);
});