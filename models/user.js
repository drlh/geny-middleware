"use strict"

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('user', {
		user_id : {
			type : DataTypes.INTEGER,
			primaryKey : true,
			autoIncrement : true,
			field : 'user_id'
		},
		firstname : DataTypes.STRING,
		lastname : DataTypes.STRING,
		mail : {
			type : DataTypes.STRING,
			allowNull : false,
			unique : true
		},
		mobile : DataTypes.STRING,
		usertype : {
			type : DataTypes.ENUM,
			values : [ 'clerk', 'technician', 'admin' ],
			defaultValue : 'technician',
			allowNull : false
		},
		password : {
			type : DataTypes.STRING,
			allowNull : false
		},
		salt : {
			type : DataTypes.STRING,
			allowNull : false
		},
		active : DataTypes.BOOLEAN
	}, {
		tableName : 'user',
		timestamps : false,
		classMethods : {
			associate : function(models) {
				User.belongsToMany(models.mission, {
					through : 'user_mission',
					foreignKey : 'user_id',
					otherKey : 'mission_id',
					as : 'Missions'
				});
				User.hasMany(models.holiday, {
					as : 'Holidays',
					foreignKey: 'user_id'
				});
				User.hasMany(models.user_device, {
					as : { singular: 'Device', plural: 'Devices'},
					foreignKey: 'user_id'
				})
			}
		}
	});

	return User;
};