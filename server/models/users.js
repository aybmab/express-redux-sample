var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');

var userModel = {

	convertRowToUserProfileObject: function(row) {
		return {
			id: row.id,
			email: row.email,
			displayName: row.display_name
		};
	},

	getUserSettings : function(userId, callback) {
		var dbConnection = dbConnectionCreator();
		var getUserSettingsSqlString = constructGetUserSettingsSqlString(userId);
		dbConnection.query(getUserSettingsSqlString, function(error, results, fields){
			if (error) {
				dbConnection.destroy();
				// return res.json({error: error, when: "inserting"});
				return (callback({error: error}));
			} else if (results.length === 0) {
				return (callback({error: "User not found."}));
			} else {
				return (callback({userData: userModel.convertRowToUserProfileObject(results[0])} ));
			}
		});
	}
};

function constructGetUserSettingsSqlString(userId){
	var query = " SELECT  id, " +
											" email, "+
											" display_name " +

							" FROM users " +
							" WHERE  id = " + mysql.escape(userId);
	return query;	
}


module.exports = userModel;