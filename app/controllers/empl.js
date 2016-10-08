

exports.addContact = function(req, res){
	if(!req.body){
		res.statusCode = 400;
		res.send({
			error: false,
			message: "Leeren body empfangen"
		});
		return;
	}else{
		var email_contact 	= req.body.email_contact,
			firstname 	= req.body.firstname,
			lastname 		= req.body.lastname,
			company		= req.body.company,
			position	= req.body.position,
			phone	= req.body.phone,
			picture		= req.body.picture;
		
		User.create({
			email_contact: email_contact,
			firstname: firstname,
			lastname: lastname,
			company: company,
			position: position,
			phone: phone,
			active: active,
			picture: picture
		}).then(function(contact){
			res.statusCode = 201;
			res.send({
				error: false,
				message: "User erstellt",
				contact: contact
			});
			return;
		}).catch(function(err){
			res.statusCode=500;
			res.send({
				error: true,
				message: "Fehler beim Erstellen des Kontaktes",
				error_msg: err
			});
			return;
		});		
	}
};

exports.addAllContacts = function(req, res){};
exports.removeContacts = function(req, res){};
