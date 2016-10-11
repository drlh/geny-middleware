var _ = require('lodash');
var request = require('request');
var frontend = require('../../config/frontend');
var keys = require('../../config/appkeys');
var tools = require('../tools');

var oauth = null;
console.log(keys)
var signature_parameters = null;

// CONSTANTS
const apiBaseUrl = "https://api.xing.com:";
const url_succesful_login = "http://localhost:8080/#/empl/login";
const userfields = '&user_fields=id,display_name,active_email,first_name,last_name,photo_urls.size_256x256,business_address.phone,business_address.mobile_phone,gender,professional_experience.primary_company.name,professional_experience.primary_company.title,permalink';

// EXPORTS

exports.xingCallback = function(req, res) {

	var ouath_authentication = req.query;
	createKeys(ouath_authentication);
// res.end(JSON.stringify(req.query, null, 2));
	res.redirect('/api/xing/sign');
};

exports.auth = function(req, res) {

	res.redirect('/connect/xing');
};

exports.getMe = function(req, res) {
	
	request(apiBaseUrl + '/v1/users/me.json'+ createSuffix(), function (error, response, data) {
	  if (!error && response.statusCode == 200) {
		  
		  data = JSON.parse(""+data);
		  
		  res.end(JSON.stringify({
		    	"error" : false,
		    	"data" : data.users[0]
		    }, null, 2));
	  }
	})
};

exports.getUser = function(req, res) {
	
	if(!req.query || !req.query.user){
		console.log("Fail");
		res.statusCode = 400;
		res.send({
			error: true,
			message: "Es wurden keine Suchkriterien uebergeben."
		});
		return;
	}else{
		request(apiBaseUrl + '/v1/users/'+req.query.user+'.json'+ createSuffix()+userfields, function (error, response, data) {
			  if (!error && response.statusCode == 200) {
				  
				  data = JSON.parse(""+data);
				  
				  res.end(JSON.stringify({
				    	"error" : false,
				    	"data" : data.users
				    }, null, 2));
			  }
			})
	}
};

exports.findUser = function(req, res) {
	
	if(!req.query || !req.query.keywords){
		console.log("Fail");
		res.statusCode = 400;
		res.send({
			error: true,
			message: "Es wurden keine Suchkriterien uebergeben."
		});
		return;
	}else{
		var keywords = '&keywords='+req.query.keywords;
		request(apiBaseUrl + '/v1/users/find.json'+ createSuffix() + keywords + userfields, function (error, response, data) {
			  if (!error && response.statusCode == 200) {
				  
				  data = JSON.parse(""+data);
				  
				  res.end(JSON.stringify({
				    	"error" : false,
				    	"data" : data.users
				    }, null, 2));
			  }
			})
	}
};

exports.getAllContactIds = function(req, res) {
	
	request(apiBaseUrl + '/v1/users/me/contact_ids.json'+ createSuffix(), function (error, response, data) {
		  if (!error && response.statusCode == 200) {
			  
			  data = JSON.parse(""+data);
			  
			  var total_contacts = data.contact_ids.items.length
			  
			  res.end(JSON.stringify({
			    	"error" : false,
			    	"total_contacts" : total_contacts,
			    	"data" : data
			    }, null, 2));
		  }
		})
};

exports.getAllContacts = function(req, res) {
	
	request(apiBaseUrl + '/v1/users/me/contacts.json'+ createSuffix() + userfields + '&limit=100', function (error, response, data) {
		  if (!error && response.statusCode == 200) {
			  
			  data = JSON.parse(""+data);
			  
			  res.end(JSON.stringify({
			    	"error" : false,
			    	"data" : data
			    }, null, 2));
		  }
		})
};

exports.getPathFromMe = function(req, res) {
	
	if(!req.query || !req.query.user){
		console.log("Fail");
		res.statusCode = 400;
		res.send({
			error: true,
			message: "Es wurden keine Suchkriterien uebergeben."
		});
		return;
	}else{
		request(apiBaseUrl + '/v1/users/me/network/'+req.query.user+'/paths.json'+ createSuffix() + userfields, function (error, response, data) {
			  if (!error && response.statusCode == 200) {
				  
				  data = JSON.parse(""+data);
				  
				  res.end(JSON.stringify({
				    	"error" : false,
				    	"data" : data.users
				    }, null, 2));
			  }
			})
	}
};

exports.reqSignature = function(req, res) {

	var url = "https://api.xing.com/v1"
	var s = createSignaturePlain();

	var data = {
		signature : s,
		token : signature_parameters,
		oauth : oauth
	}
	res.redirect(url_succesful_login);
};

exports.logout = function(req, res) {
	oauth = null;
	signature_parameters = null;
	req.session = null;

	res.redirect(frontend.full);
};

function createSignaturePlain() {
	if (signature_parameters != null && oauth != null) {
		return oauth.consumer_secret + "%26" + oauth.oauth_token_secret;
	}
	return "error in calculating a signature";
};

function createKeys(ouath_authentication) {

	signature_parameters = {
		consumer_key : keys.test.consumer_key,
		oauth_token : ouath_authentication.access_token,
		oauth_nonce : tools.getNonce(),
		oauth_signature_method : 'PLAINTEXT',
		oauth_timestamp : tools.getTimestamp(),
		oauth_version : '1.0'
	};

	oauth = {
		consumer_key : keys.test.consumer_key,
		consumer_secret : keys.test.consumer_secret,
		oauth_token : ouath_authentication.access_token,
		oauth_token_secret : ouath_authentication.access_secret
	};

};

function createSuffix() {
	
	var suffix = 	"?oauth_consumer_key="+ oauth.consumer_key 
					+"&oauth_token=" + oauth.oauth_token 
					+"&oauth_signature_method=PLAINTEXT"
					+"&oauth_timestamp=" + tools.getTimestamp() 
					+"&oauth_nonce=" + tools.getNonce()
					+"&oauth_version=1.0"
					+"&oauth_signature=" + createSignaturePlain();
	
	return suffix;
};