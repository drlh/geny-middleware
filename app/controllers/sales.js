var DB			= require('../models/index.js');
var Contact 	= DB.contact;

exports.getAllContacts = function(req, res){
	var query = Contact.findAll();
	
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

exports.getContactDetails = function(req, res){
	var query = Contact.findAll();
	
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