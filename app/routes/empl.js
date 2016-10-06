//EMPLOYEE ROUTES
//==============================================================
module.exports = function(app) {

	var empl = require('../controllers/empl');

	app.get('/api/empl', empl.findEmployee);
	
	app.post('/api/empl', empl.createEmployee);
}