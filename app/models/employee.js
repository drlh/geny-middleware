"use strict"

module.exports = function(sequelize, DataTypes) {
	var Employee = sequelize.define('employee', {
		email_employee : {
			type : DataTypes.STRING,
			primaryKey : true,
			field : 'email_employee'
		},
		firstname : {
			type : DataTypes.STRING,
			allowNull : false
		},
		lastname : {
			type : DataTypes.STRING,
			allowNull : false
		},
		phone : DataTypes.STRING,
		mobile : DataTypes.STRING,
		position : DataTypes.STRING,
		picture : DataTypes.STRING
	}, {
		tableName : 'employees',
		timestamps : false,
		classMethods : {
			associate : function(models) {
				Employee.hasMany(models.contact, {
					foreignKey : 'email_employee'
				});
			}
		}
	});

	return Employee;
};