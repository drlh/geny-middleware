"use strict"

//Modules
var tools = require('./tools')();
var express = require('express')
  , logger = require('morgan')
  , session = require('express-session');

var Grant = require('grant-express')
  , grant = new Grant(require('./config.json'))
  , oauthSignature = require('oauth-signature');

var security = {};

console.log(getAppkeys());


//Initialize express
var app = express()
app.use(logger('dev'));

// REQUIRED:
app.use(session({secret:'071018184da8093ecadaec78ac251963c9a39b9c'}));
// mount grant
app.use(grant);

app.get('/handle_xing_callback', function (req, res) {
  //console.log(req.query);
  tools.getAppkeys();
  
  res.end(JSON.stringify(req.query, null, 2))
});

app.get('/logout', function(req, res) {
	req.session = null;
	req.session.destroy();
});

app.listen(3000, function() {
  console.log('Express server listening on port ' + 3000)
});


//FUNCTIONS
function getNonce(){
	return Math.random().toString(36).substring(5);
}

function getTimestamp() {
	return Date.now();
}