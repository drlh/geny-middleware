var DB			= require('../models/index.js');
var Contact 	= DB.contact;
var Employee 	= DB.employee;
var sequelize 		= require('sequelize');



exports.getEmployee = function(req, res){
	if(!req.query.email_employee){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Keine Email mitgegeben"
		});
		return;
	}else  {
		Employee.findOne({
			where : {
				email_employee : req.query.email_employee
			}
		}).then(function(details) {
			res.statusCode = 200;
			res.send({
				error: false,
				employee: details
			});
			return;
		}).catch(function(err){
			res.statusCode = 500;
			res.send({
				error: true,
				message: "Employee konnte nicht gefunden werden",
				err_msg: err
			});
			return;
		});
	}
	
};

exports.getEmployeeContactStatus = function(req, res){
	
	var empl_email = req.params.employee_email;

	if(!empl_email){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Keine Email mitgegeben"
		});
		return;
	}else{
		var NEW	= 0, INTERESTING = 0, UNINTERESTING = 0, CONTACTED = 0,INTERESTED = 0,
		NEGOTIATION = 0, DEAL = 0;
		
		var where = {
				email_employee	: empl_email,
				status : "NEW"
		}
		
		Contact.count({where : where}).then(function (result) {
				 NEW = result;
				 where.status = "INTERESTING";
					Contact.count({where : where}).then(function (result) {
						INTERESTING = result;
						 where.status = "UNINTERESTING";
							Contact.count({where : where}).then(function (result) {
								UNINTERESTING = result;
								 where.status = "CONTACTED";
									Contact.count({where : where}).then(function (result) {
										CONTACTED = result;
										 where.status = "INTERESTED";
											Contact.count({where : where}).then(function (result) {
												INTERESTED = result;
												 where.status = "NEGOTIATION";
												 Contact.count({where : where}).then(function (result) {
													 NEGOTIATION = result;
													 where.status = "DEAL";
													 Contact.count({where : where}).then(function (result) {
														 DEAL = result;
														 Contact.count({where : {
															 email_employee : empl_email}}).then(function (result) {
																var response = {
																		NEW : NEW,
																		INTERESTING : INTERESTING,
																		UNINTERESTING : UNINTERESTING,
																		CONTACTED : CONTACTED,
																		INTERESTED : INTERESTED,
																		NEGOTIATION : NEGOTIATION,
																		DEAL : DEAL,
																		TOTAL : result
																}
															 res.statusCode=200;
															 res.send({
															 error: false,
															 result: response
															 });
															 return;
														})
													})
												 });												 
											 });
									 });
							 });
					 });
			 });
	}
};

exports.addEmployee = function(req, res){
	if(!req.body && req.body != '{}'){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Leeren body empfangen"
		});
		return;
	}else{
		
		console.log(req.body);
		var email_employee 	= req.body.email_employee,
			firstname 		= req.body.firstname,
			lastname 		= req.body.lastname,
			position		= req.body.position,
			phone			= req.body.phone,
			picture			= req.body.picture;
		
		Employee.create({
			email_employee : email_employee,
			firstname : firstname,
			lastname : lastname,
			position : position,
			phone : phone,
			picture : picture 

		}).then(function(employee){
			res.statusCode = 201;
			res.send({
				error: false,
				message: "Employee erstellt",
				employee: employee
			});
			return;
		}).catch(function(err){
			res.statusCode=500;
			res.send({
				error: true,
				message: "Fehler beim Erstellen des Employees oder Employee bereits v.h.",
				error_msg: err
			});
			return;
		});		
	}
};

exports.addContact = function(req, res){
	
};

/**
 * Fügt alle Kontakte aus dem übergebenen Array in die Datenbank ein
 */
exports.addAllContacts = function(req, res){
	if(!req.body && req.body != '{}'){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Leeren body empfangen"
		});
		return;
	}else{
		
		var contacts = req.body.contacts;
		
		Contact.bulkCreate(contacts).then(function(employee){
			res.statusCode = 201;
			res.send({
				error: false,
				message: "Kontakte hinzugefügt",
				employee: employee
			});
			return;
		}).catch(function(err){
			res.statusCode=500;
			res.send({
				error: true,
				message: "Fehler beim Erstellen der Kontakte.",
				error_msg: err
			});
			return;
		});		
	}
};


/**
 * Löscht alle verbundenen Kontakte, die mit der Email zusammen hängen
 */
exports.removeContacts = function(req, res){
	
	if(!req.params){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Leeren body empfangen"
		});
		return;
	}else if(req.params.email == undefined){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Keine Email mitgegeben"
		});
		return;
	}else{
		var empl_email = req.params.email;
		Contact.destroy({where: {
			email_employee : empl_email
			}
		}).then(function(details) {
			res.statusCode = 200;
			res.send({
				error: false,
				message : "Kontakte die zum User: " + empl_email + "gehören,  wurden gelöscht"
			});
			return;
		}).catch(function(err){
			res.statusCode = 500;
			res.send({
				error: true,
				message: "Kontakte die zum User: " + empl_email + "gehören,  kannten nicht gelöscht werden",
				err_msg: err
			});
			return;
		});
	};
};

