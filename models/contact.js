"use strict"

module.exports = function(sequelize, DataTypes) {
	var Contact = sequelize.define('contact', {
		email_contact : {
			type : DataTypes.INTEGER,
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
		phone : DataTypes.STRING,
		picture : DataTypes.STRING
	}, {
		tableName : 'contacts',
		timestamps : false,
		classMethods : {
			associate : function(models) {
				User.hasOne(models.employee, {
					as : 'Employee',
					foreignKey: 'email_employee'
				});
			}
		}
	});

	return Contact;
};