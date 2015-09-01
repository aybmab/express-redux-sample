
var socketio = require('socket.io');
var todoModel = require('../models/todos');
var io;

module.exports = {

	setServer: function(server){
		io = socketio(server);

		io.on('connection', function(socket){
		  console.log('a user connected');

		  socket.on('viewing', function(){
		    todoModel.getAllUniversalTodos(function(results){
		    	socket.emit("current-universal-todos", results);
		    });
		  });

		  socket.on('disconnect', function(){
		    console.log('user disconnected');
		  });
		});
	},

	notifyAllListenersOfNewTodo: function(todo){
		io.emit('new-todo', todo);
	}

}