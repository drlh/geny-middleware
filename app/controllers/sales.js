var DB			= require('../models/index.js');
var Contact 	= DB.contact;
var Employee 	= DB.employee;
var sequelize 	= DB.sequelize;

exports.getAllContacts = function(req, res){
	var query = Contact.findAll({
		include : [{
			model : Employee,
			required : true
		}]
	});
	
	query.then(
			function(contacts){
				if(contacts.length>0){
					res.statusCode = 200;
					res.send({
						error: false,
						message:"Es wurden "  + contacts.length + " Kontakte  gefunden.",
						contacts: contacts
					});
					return;
				}else{
					res.statusCode = 404;
					res.send({
						error: true,
						message:"Es wurden keine Kontakte  gefunden."
					});
					return;
				}
			}
		).catch(
			function(err){
				res.statusCode = 500;
				res.send({
					error: true,
					message:"Fehler beim Suchen der Kontakte.",
					err_msg: err
				});
				return;
			}
		);
};

exports.getContactDetails = function(req, res){
	var query = Employee.findAll();
	
	query.then(
			function(contacts){
				if(contacts.length>0){
					res.statusCode = 200;
					res.send({
						error: false,
						message:"Es wurden "  + contacts.length + " Kontakte  gefunden.",
						contacts: contacts
					});
					return;
				}else{
					res.statusCode = 404;
					res.send({
						error: false,
						message:"Es wurden keine Kontakte  gefunden."
					});
					return;
				}
			}
		).catch(
			function(err){
				res.statusCode = 500;
				res.send({
					error: true,
					message:"Fehler beim Suchen der Staedte.",
					err_msg: err
				});
				return;
			}
		);
};

exports.updateContactStatus = function(req, res){
	
	if(!req.body){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Es wurden keine Daten uebergeben."
		});
		return;
	}else if(!req.body.email_contact){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Es wurden keine Kunden-ID uebergeben."
		});
		return;
	}else if(!req.body.status){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Es wurden kein Status uebergeben."
		});
		return;
	}else {
		var email_contact = req.body.email_contact;
		var status = req.body.status;
		
		Contact.findOne({
			where : {
				email_contact : email_contact
			}
		}).then(function(details) {
			details.update({
				status : status
			}).then(function(contact){
				res.statusCode = 200;
				res.send({
					error: false,
					message: "Der Kontakt wurde erfolgreich aktualisiert.",
					contact : contact
				});
				return;
			}).catch(function(err){
				res.statusCode = 500;
				res.send({
					error: true,
					message: "Fehler beim Aktualisieren des Kontaktes.",
					err_msg: err
				});
				return;
			});
		}).catch(function(err){
			res.statusCode = 500;
			res.send({
				error: true,
				message: "Kontakt konnte nicht gefunden werden",
				err_msg: err
			});
			return;
		});
	}
	
};

exports.getAllEmployees = function(req, res){};

exports.getEmployeeDetails = function(req, res){};

exports.getContactsStatus = function(req, res){
	
	var NEW	= 0, INTERESTING = 0, UNINTERESTING = 0;
	
	var where = {
			status : "NEW"
	}
	
	var sql = 'SELECT COUNT(DISTINCT email_employee) AS dist_empl, COUNT(email_contact) as dist_cont FROM contacts';
	
	Contact.count({where : where}).then(function (result) {
			 NEW = result;
			 where.status = "INTERESTING";
				Contact.count({where : where}).then(function (result) {
					INTERESTING = result;
					 where.status = "UNINTERESTING";
						Contact.count({where : where}).then(function (result) {
							UNINTERESTING = result;
							sequelize.query(sql, { raw: true }).then(function(result){
								
								var d = result[0][0];
								var response = {
										NEW : NEW,
										INTERESTING : INTERESTING,
										UNINTERESTING : UNINTERESTING,
										total : d.dist_cont,
										empl : d.dist_empl
								}
								 res.statusCode=200;
								 res.send({
								 error: false,
								 result: response
								 });
								 return;
							});
						 });
				 });
		 });
	
};
