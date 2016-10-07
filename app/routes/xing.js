//XING ROUTES
//==============================================================
module.exports = function(app) {

	var xing = require('../controllers/xing');

	app.get('/api/xing/callback', xing.xingCallback);
	app.get('/api/xing/me', xing.getMe);
	app.get('/api/xing/me/path', xing.getPathFromMe);
	app.get('/api/xing/user', xing.getUser); // Daten zu einem User
	app.get('/api/xing/user/find', xing.findUser); // Daten zu einem User
	app.get('/api/xing/contactids', xing.getAllContactIds);
	app.get('/api/xing/contacts', xing.getAllContacts); // Wenn weniger als 100
														// Kontakte
	app.get('/api/xing/sign', xing.reqSignature);
	app.get('/api/xing/logout', xing.logout);

	// var routes = [
	// {
	// source: '/api/xing/me',
	// dest: '/v1/users/me.json',
	// func: ()=>{}
	// }
	// ];
	//
	// routes.forEach(function(item){
	// if(!item.source || !item.dest) return console.log('ERROR');
	//
	// app.get(item.source, xing.request(item.dest, item.func));
	//	
	// });

}