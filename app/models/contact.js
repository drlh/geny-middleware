"use strict"

module.exports = function(sequelize, DataTypes) {
	var Contact = sequelize.define('contact', {
		email_contact : {
			type : DataTypes.STRING,
			primaryKey : true,
			field : 'email_contact'
		},
		firstname : {
			type : DataTypes.STRING,
			allowNull : false
		},
		lastname : {
			type: DataTypes.STRING,
			allowNull : false
		},
		company : {
			type: DataTypes.STRING,
			allowNull : false
		},
		position : DataTypes.STRING,
		status : {
			type : DataTypes.ENUM,
			values : [ 'NEW', 'INTERESTING', 'UNINTERESTING', 'CONTACTED', 'INTERESTED', 'NEGOTIATION', 'DEAL' ],
			defaultValue : 'NEW',
			allowNull : false
		},
		phone : DataTypes.STRING,
		picture : DataTypes.STRING,
		permalink : DataTypes.STRING
	}, {
		tableName : 'contacts',
		timestamps : false,
		classMethods : {
			associate : function(models) {
				Contact.belongsTo(models.employee, {foreignKey: 'email_employee'});
			}
		}
	});

	return Contact;
};