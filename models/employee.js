"use strict"

module.exports = function(sequelize, DataTypes) {
	var Employee = sequelize.define('employee', {
		email_employee : {
			type : DataTypes.INTEGER,
			primaryKey : true,
			field : 'email_employee'
		},
		firstname : {
			type : DataTypes.STRING,
			allowNull : false
		},
		lastname : {
			type: DataTypes.STRING,
			allowNull : false
		},
		phone : DataTypes.STRING,
		position : DataTypes.STRING,
		picture : DataTypes.STRING
	}, {
		tableName : 'employees',
		timestamps : false
	});

	return Employee;
};