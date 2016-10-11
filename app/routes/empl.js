//EMPLOYEE ROUTES
//==============================================================
module.exports = function(app) {

	var empl = require('../controllers/empl');

	app.get('/api/empl', empl.getEmployee);
	app.get('/api/empl/status/:employee_email', empl.getEmployeeContactStatus);
	
	app.post('/api/empl', empl.addEmployee);
	app.post('/api/empl/conctact/add', empl.addContact);
	app.post('/api/empl/contacts', empl.addAllContacts);
	
	app.delete('/api/empl/contacts/:email', empl.removeContacts);
}