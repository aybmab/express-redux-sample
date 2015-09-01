/**
	* Sample model
	*/
var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');


var todoModel = {

	convertRowToObject: function(row) {
		// console.log("passed me row:", row);
		return {
			id: row.id,
			clientUUID: row.client_uuid,
			creator: {
				id: row.creator_id,
				email: row.creator_email,
				displayName: row.creator_display_name
			},
			text: row.text,
			complete: (row.completed === 1)
		};
	},

	createUniversalTodo : function(text, clientUUID, creatorId, callback) {
		var dbConnection = dbConnectionCreator();
		var createTodoSqlString = constructCreateUniversalTodoSqlString(text, clientUUID, creatorId);
		dbConnection.query(createTodoSqlString, function(error, results, fields){
			if (error) {
				dbConnection.destroy();
				// return res.json({error: error, when: "inserting"});
				return (callback({error: error, when: "inserting"}));
			} else {
				var getTodoSqlString = constructGetUniversalTodoSqlString(results.insertId);
				dbConnection.query(getTodoSqlString, function(error, results, fields){
					dbConnection.destroy();
					if (error) {
						return res.json({error: error, when: "reading"});
						return (callback({error: error, when: "reading"}));
					} else {
						// return res.json({todo: todoModel.convertRowToObject(results[0])} );
						return (callback({todo: todoModel.convertRowToObject(results[0])} ));
					}
				});
			}
		});
	},

	getAllUniversalTodos: function(callback){
		var dbConnection = dbConnectionCreator();
		var sqlString = createGetAllUniversalTodosSqlString();
		dbConnection.query(sqlString, function(error, results, fields){
			dbConnection.destroy();
			if (error) {
				return callback({error: error});
			} else {
				var todos = {};
				results.forEach(function(result){
					todos[result.id] = todoModel.convertRowToObject(result);
				});
				return callback({todos: todos });
			}
		});
	}
};

function constructCreateUniversalTodoSqlString(text, clientUUID, creatorId){
	var query = "INSERT INTO universal_todos SET " +
														"  text = " + mysql.escape(text) +
														", client_uuid = " + mysql.escape(clientUUID) +
														", creator_id = " + mysql.escape(creatorId);
	return query;	
}

function constructGetUniversalTodoSqlString(todoId){
	var query = " SELECT  universal_todos.*, " +
											" users.id AS creator_id, "+
											" users.email AS creator_email, "+
											" users.display_name AS creator_display_name " +

							" FROM universal_todos LEFT JOIN users " +
							" ON universal_todos.creator_id = users.id" +
							" WHERE  universal_todos.id = " + mysql.escape(todoId);
	return query;	
}

function createGetAllUniversalTodosSqlString(){
	var query = " SELECT  universal_todos.*, " +
											" users.id AS creator_id, "+
											" users.email AS creator_email, "+
											" users.display_name AS creator_display_name " +

							" FROM universal_todos LEFT JOIN users " +
							" ON universal_todos.creator_id = users.id";
	return query;	
}


module.exports = todoModel;