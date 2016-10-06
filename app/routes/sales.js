//EMPLOYEE ROUTES
//==============================================================
module.exports = function(app) {

	var sales = require('../controllers/sales');

	app.get('/api/sales/contacts', sales.getAllContacts);
	
}