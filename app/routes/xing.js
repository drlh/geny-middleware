//XING ROUTES
//==============================================================
module.exports = function(app) {

	var xing = require('../controllers/xing');
	
//	app.get('/handle_xing_callback', xing.xingCallback);
	app.get('/api/xing/me', xing.getMe);
	app.get('/api/xing/profile', xing.getProfile);   			// Daten zu einem User
	app.get('/api/xing/contactids', xing.getAllContactIds);
	app.get('/api/xing/contacts', xing.getAllContacts); 		// Wenn weniger als 100 Kontakte
	app.get('/api/xing/sign', xing.reqSignature);
	app.get('/api/xing/logout', xing.logout);
	
}