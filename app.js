"use strict"

// Modules
var express = require('express'), logger = require('morgan'), session = require('express-session');
var fs = require("fs");

var Grant = require('grant-express'), grant = new Grant(
		require('./config.json')), oauthSignature = require('oauth-signature');

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
	res.end(JSON.stringify(req.query, null, 2));
});
app.get('/sign', function(req, res) {
	
//	console.log
//	var query = req.query;
//	console.log(query.url);
	
	var url = "https://api.xing.com/v1"
	var s = createSignaturePlain();
	
	var data = {
			signature: s,
			token : signature_parameters,
			oauth : oauth_var
	}
	res.end(JSON.stringify(data, null, 2));
});

app.get('/logout', function(req, res) {
	req.session = null;
	oauth_var = null;
	signature = null;
	signature_parameters = null;
	req.session.destroy();
});

app.listen(3000, function() {
	console.log('Express server listening on port ' + 3000)
});

// FUNCTIONS
function createSignature(url){
	var httpMethod = 'GET';
	if(signature_parameters != null && oauth_var != null){
		var s = oauthSignature.generate(httpMethod, url, signature_parameters, oauth_var.consumer_secret ,oauth_var.oauth_token_secret);
		console.log(s);
		return s;
	}
	
	return "error in calculating a signature";
};

function createSignaturePlain(){
	if(signature_parameters != null && oauth_var != null){
		
		console.log(oauth_var);
		console.log(signature_parameters);
		
		return oauth_var.consumer_secret +"%26"+oauth_var.oauth_token_secret;
	}
	return "error in calculating a signature";
};

function createKeys(ouath_authentication) {

//	console.log(getAppkeys());
//	
//	var xingApp = getAppkeys();
	signature_parameters = {
//			consumer_key : xingApp.consumer_key,
			consumer_key : "fd305e7cfa9ce4a82581",
			oauth_token : ouath_authentication.access_token,
			oauth_nonce : getNonce(),
	        oauth_signature_method : 'PLAINTEXT',
	        oauth_timestamp : getTimestamp(),
	        oauth_version : '1.0'
	};
	
	oauth_var = {
//			consumer_key : xingApp.consumer_key,
			consumer_key : "fd305e7cfa9ce4a82581",
//			consumer_secret : xingApp.consumer_secret,
			consumer_secret : "071018184da8093ecadaec78ac251963c9a39b9c",
			oauth_token : ouath_authentication.access_token,
			oauth_token_secret : ouath_authentication.access_secret
	};

};

//function getAppkeys() {
//	var d = null;
//	fs.readFileSync('config.json', 'utf-8' ,function(err, data) {
//		if (err) {
//			console.log(err);
//			process.exit(1);
//		}
//		
//		console.log(data);
//		
//		data = JSON.parse(data);
//		d = {
//				consumer_key : data.xing.key,
//				consumer_secret : data.xing.secret
//		};
//		console.log("d:"+JSON.stringify(d));
//		return d;
//	});
//};

function getNonce() {
	return Math.random().toString(36).substring(5);
};

function getTimestamp() {
	return Date.now();
};