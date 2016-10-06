"use strict"

// Modules
var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var fs = require("fs");

var Grant = require('grant-express');
var grant = new Grant(require('./config.json'));

// MODULES
var tools = require('./app/tools');
var frontend = require('./config/frontend');

// VARIABLES
var oauth_var = null;
var signature_parameters = null;


// Initialize express
var app = express()
app.use(logger('dev'));

// REQUIRED:
app.use(session({
	secret : '071018184da8093ecadaec78ac251963c9a39b9c'
}));
// mount grant
app.use(grant);

app.get('/handle_xing_callback', function(req, res) {

	var ouath_authentication = req.query;
	createKeys(ouath_authentication);
	res.redirect('/api/xing/sign');
});
app.get('/api/xing/sign', function(req, res) {

	var url = "https://api.xing.com/v1"
	var s = createSignaturePlain();

	var data = {
		signature : s,
		token : signature_parameters,
		oauth : oauth_var
	}
	res.end(JSON.stringify(data, null, 2));
});

//app.get('/api/xing/logout', function(req, res) {
//	
//});


// FUNCTIONS
function createSignaturePlain() {
	if (signature_parameters != null && oauth_var != null) {
		return oauth_var.consumer_secret + "%26" + oauth_var.oauth_token_secret;
	}
	return "error in calculating a signature";
};

function createKeys(ouath_authentication) {

	signature_parameters = {
		consumer_key : "fd305e7cfa9ce4a82581",
		oauth_token : ouath_authentication.access_token,
		oauth_nonce : tools.getNonce(),
		oauth_signature_method : 'PLAINTEXT',
		oauth_timestamp : tools.getTimestamp(),
		oauth_version : '1.0'
	};

	oauth_var = {
		consumer_key : "fd305e7cfa9ce4a82581",
		consumer_secret : "071018184da8093ecadaec78ac251963c9a39b9c",
		oauth_token : ouath_authentication.access_token,
		oauth_token_secret : ouath_authentication.access_secret
	};

};




//==================API-ROUTES=================================
require('./app/routes/xing')(app); //get the xing routes
//require('./app/routes/empl')(app); //get the employee routes
require('./app/routes/sales')(app); //get the sales routes

//==================SERVER=====================================
app.listen(3000, function() {
	console.log('Express server listening on port ' + 3000);
});