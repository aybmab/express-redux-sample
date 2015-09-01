import { receivedAllUniversalTodos, optimisticUniversalAddSuccess } from '../actions/TodoActions';

var socket = io();

export function linkSocketToStore(dispatch) {
	// Add listeners that dispatch actions here.
	socket.on("current-universal-todos", function(result){
		// console.log("got all todos!", result);
		if(result.error){
			//TODO handle some how
			alert("something went wrong retrieving all todos");
		} else {
			dispatch(receivedAllUniversalTodos(result.todos));
		}
	});

	socket.on("new-todo", function(result){
		// console.log("got a new todo!", result);
		if(result.error){
			//Do nothing
		} else {
			dispatch(optimisticUniversalAddSuccess(result.todo));
		}
	});


}

// Add functions that emit socket events:
export function registerToUniversalTodo() {
	socket.emit("viewing");
}
