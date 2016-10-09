//SALES ROUTES
//==============================================================
module.exports = function(app) {

	var sales = require('../controllers/sales');

	app.get('/api/sales/contacts', sales.getAllContacts);
	app.get('/api/sales/contact', sales.getContactDetails);
	
	app.get('/api/sales/employees', sales.getAllEmployees);
	app.get('/api/sales/employee', sales.getEmployeeDetails);
	
}