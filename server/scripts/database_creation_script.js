//TODO IMPORTANT figure out how to make timestamps work with timezone changes


//--------------------------------------------------------------------------------------------------------//
//-------------------------------------------- query strings ---------------------------------------------//
//--------------------------------------------------------------------------------------------------------//

             
var createUserTableQuery = ""+
		"CREATE TABLE users ( " +

		"	id                    	INT UNSIGNED NOT NULL AUTO_INCREMENT, " +
		"	display_name						VARCHAR(100) NULL, " +
		"	email										VARCHAR(45) NULL, " +
		"	password								VARCHAR(255) NULL, " +
		"	last_updated						DATETIME DEFAULT CURRENT_TIMESTAMP, " +
		"	date_created						DATETIME DEFAULT CURRENT_TIMESTAMP, " +

		"	PRIMARY KEY(id) " +

		");";

var createUniversalTodoListTableQuery = ""+
		"CREATE TABLE universal_todos ( " +

		"	id                    	INT UNSIGNED NOT NULL AUTO_INCREMENT, " +
		"	client_uuid             TEXT NOT NULL, " +
		"	creator_id              INT UNSIGNED NOT NULL REFERENCES users(id), " +
		"	text										TEXT , " +
		"	completed								BOOLEAN DEFAULT false, " +
		"	date_completed					DATETIME, " +
		"	date_created						DATETIME DEFAULT CURRENT_TIMESTAMP, " +

		"	PRIMARY KEY(id) " +

		");";
           

var createPersonalTodoListTableQuery = ""+
		"CREATE TABLE personal_todos ( " +

		"	id                    	INT UNSIGNED NOT NULL AUTO_INCREMENT, " +
		"	client_uuid             TEXT NOT NULL, " +
		"	creator_id              INT UNSIGNED NOT NULL REFERENCES users(id), " +
		"	text										TEXT , " +
		"	completed								BOOLEAN DEFAULT false, " +
		"	date_completed					DATETIME, " +
		"	date_created						DATETIME DEFAULT CURRENT_TIMESTAMP, " +

		"	PRIMARY KEY(id) " +

		");";


//-------------------------------------------- query strings ---------------------------------------------//
//--------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------//


var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');

var dbConnection = dbConnectionCreator();

var listOfActions = [	createDropFunction("users"), 							createTable("users", createUserTableQuery),
											createDropFunction("universal_todos"), 		createTable("universal_todos", createUniversalTodoListTableQuery),
											createDropFunction("personal_todos"), 		createTable("personal_todos", createPersonalTodoListTableQuery),
											endClientConnection];
var currentIndex = 0;

function runNextQueries(){
	var action = listOfActions[currentIndex++];
	action();
}

function createDropFunction(table){
	return function(){
		console.log("Dropping table: ", table);
		var query = "DROP TABLE IF EXISTS "+ table +" CASCADE";
		dbConnection.query(query, function(error,b,c,d){
			runNextQueries();
		});
	}
}

function createTable(tableName, query){
	return function(){
		console.log("Creating table: ", tableName);
		dbConnection.query(query, function(error,b,c,d){
			if (error) console.log("error: ", error);
			runNextQueries();
		});	
	}
}

function endClientConnection(){
	console.log("done creating tables!");
	dbConnection.destroy();
}

runNextQueries(currentIndex);


