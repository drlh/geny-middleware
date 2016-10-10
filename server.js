"use strict"

// Modules
var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
// var fs = require("fs");

var Grant = require('grant-express');
var grant = new Grant(require('./config.json'));

// MODULES
var frontend = require('./config/frontend');

// ==================CONFIG APP=================================
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(bodyParser.json());
app.use(session({
	secret : '071018184da8093ecadaec78ac251963c9a39b9c'
}));
app.use(grant);

app.use(function(req, res, next) {
	// Website you wish to allow to connect
	// res.setHeader('Access-Control-Allow-Origin', ''+frontend.url+':8080');
	res.setHeader('Access-Control-Allow-Origin', '' + frontend.full);
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods',
			'GET, POST,  PUT,  DELETE, OPTIONS');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers',
			'X-Requested-With,content-type');
	// Set to true if you need the website to include cookies in the requests
	// sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	// Pass to next layer of middleware
	next();
});

// ==================API-ROUTES=================================
require('./app/routes/xing')(app); // get the xing routes
require('./app/routes/empl')(app); // get the employee routes
require('./app/routes/sales')(app); // get the sales routes

// ==================SERVER=====================================
app.listen(3000, function() {
	console.log('Express server listening on port ' + 3000);
});