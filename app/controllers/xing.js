var frontend = require('../../config/frontend');

exports.xingCallback = function(req, res){ };

exports.getMe = function(req, res){ };

exports.getProfile = function(req, res){ };

exports.getAllContactIds = function(req, res){ };

exports.getAllContacts = function(req, res){ };

exports.reqSignature = function(req, res){ };

exports.logout = function(req, res){ 
	oauth_var = null;
	signature_parameters = null;
	req.session = null;

	res.redirect(frontend.full);
};


//	app.get('/handle_xing_callback', xing.xingCallback);
//	app.get('/api/xing/me', xing.getMe);
//	app.get('/api/xing/profile', xing.getProfile);   			// Daten zu einem User
//	app.get('/api/xing/contactids', xing.getAllContactIds);
//	app.get('/api/xing/contacts', xing.getAllContacts); 		// Wenn weniger als 100 Kontakte
//	app.get('/api/xing/sign', xing.reqSignature);
//	app.get('/api/xing/logout', xing.logout);