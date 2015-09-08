var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');

var userModel = {

	convertRowsToUserProfileObject: function(rows) {
		var todos = {};
		rows.forEach(function(todo){
			if(todo.todo_id !== null){
				todos[todo.todo_id] = todo.text;
			}
		});		

		var userInfo = {
			id: rows[0].user_id,
			email: rows[0].email,
			displayName: rows[0].display_name
		}
		return {
			userInfo : userInfo,
			userCreatedTodos : todos
		};
	},

	getUserProfile : function(userId, callback) {
		var dbConnection = dbConnectionCreator();
		var getUserSettingsSqlString = constructGetUserProfileSqlString(userId);
		console.log("ANGEL: getting user details");
		dbConnection.query(getUserSettingsSqlString, function(error, results, fields){
			if (error) {
				dbConnection.destroy();
				console.log("error: ", error);
				return (callback({error: error}));
			} else if (results.length === 0) {
				return (callback({error: "User not found."}));
			} else {
				return (callback({userData: userModel.convertRowsToUserProfileObject(results)} ));
			}
		});
	}
};

function constructGetUserProfileSqlString(userId){
	var query = " SELECT  users.id AS user_id, " +
											" users.email, "+
											" users.display_name, " +
											" universal_todos.id AS todo_id, " +
											" universal_todos.text " +

							" FROM users LEFT JOIN universal_todos " +
							" ON universal_todos.creator_id = users.id" +
							" WHERE  users.id = " + mysql.escape(userId);
	return query;	
}


module.exports = userModel;