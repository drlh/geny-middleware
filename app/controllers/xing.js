var _ = require('lodash');
var http = require('http');
var frontend = require('../../config/frontend');
var keys = require('../../config/appkeys');
var tools = require('../tools');

var oauth_var = null;

console.log(keys);
var signature_parameters = null;
var url_suffix = null;

exports.xingCallback = function(req, res) {

	var ouath_authentication = req.query;
	createKeys(ouath_authentication);
	res.redirect('/api/xing/sign');
};

exports.getMe = function(req, res) {
};

exports.getProfile = function(req, res) {
};

exports.getAllContactIds = function(req, res) {
};

exports.getAllContacts = function(req, res) {
};

exports.reqSignature = function(req, res) {

	var url = "https://api.xing.com/v1"
	var s = createSignaturePlain();

	var data = {
		signature : s,
		token : signature_parameters,
		oauth : oauth_var
	}
	res.end(JSON.stringify(data, null, 2));
};

exports.logout = function(req, res) {
	oauth_var = null;
	signature_parameters = null;
	req.session = null;

	res.redirect(frontend.full);
};

function createSignaturePlain() {
	if (signature_parameters != null && oauth_var != null) {
		return oauth_var.consumer_secret + "%26" + oauth_var.oauth_token_secret;
	}
	return "error in calculating a signature";
};

function createKeys(ouath_authentication) {

	signature_parameters = {
		consumer_key : keys.consumer_key,
		oauth_token : ouath_authentication.access_token,
		oauth_nonce : tools.getNonce(),
		oauth_signature_method : 'PLAINTEXT',
		oauth_timestamp : tools.getTimestamp(),
		oauth_version : '1.0'
	};

	oauth_var = {
		consumer_key : keys.consumer_key,
		consumer_secret : keys.consumer_secret,
		oauth_token : ouath_authentication.access_token,
		oauth_token_secret : ouath_authentication.access_secret
	};

};

function createSuffix() {
	if(url_suffix == null){
		
	}
	return url_suffix;
};