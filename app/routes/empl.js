//EMPLOYEE ROUTES
//==============================================================
module.exports = function(app) {

	var empl = require('../controllers/empl');

//	app.get('/api/empl', empl.findEmployee);
//	
//	app.post('/api/empl', empl.createEmployee);
	app.post('/api/empl/conctacts/add', empl.addContact);
	app.post('/api/empl/addconctacts', empl.addAllContacts);
	app.delete('/api/empl/contacts', empl.removeContacts);
}