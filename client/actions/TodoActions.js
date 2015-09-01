/*
 * action types
 */
export const Received_All_Universal_Todos = 'Received_All_Universal_Todos';

export const Add_Universal_Todo = 'Add_Universal_Todo';
export const Optimistically_Add_Universal_Todo = 'Optimistically_Add_Universal_Todo';
export const Optimistic_Add_Universal_Success = 'Optimistic_Add_Universal_Success';
export const Optimistic_Add_Universal_Fail = 'Optimistic_Add_Universal_Fail';



/*
 * other constants
 */

/*
 * action creators
 */

// TODO create action for when firing off initila fetch and use loader flag.

export function receivedAllUniversalTodos(todos) {
  return { type: Received_All_Universal_Todos, todos };
}


export function optimisticallyAddUniversalTodo(text, clientUUID, user) {
  return { type: Optimistically_Add_Universal_Todo, text, clientUUID, user };
}

export function addUniversalTodo(text, clientUUID, user) {
  return (dispatch) => {
    dispatch(optimisticallyAddUniversalTodo(text, clientUUID, user));

    $.ajax({
			type: 'POST',
			url: '/api/v1/todos/universal/addTodo',
			data: {text, clientUUID} })
			.done(function(data) {
				if (data.error){
					console.log("add todo worked but error: ", data);
						dispatch(optimisticUniversalAddFail());
					} else {
						console.log("add todo success", data);
						dispatch(optimisticUniversalAddSuccess(data.todo));
					}
				})
			.fail(function(a,b,c,d) {
				console.log("actual failure: ", a, b, c, d)
			  dispatch(optimisticUniversalAddFail()); //TODO figure out what to pass
			});
  }
}

export function optimisticUniversalAddSuccess(todo) {
	return { type: Optimistic_Add_Universal_Success, todo };
}

export function optimisticUniversalAddFail(error) {
	return { type: Optimistic_Add_Universal_Fail, error };
}







//TODO actually use these
export function completeTodo(index) {
  return { type: Complete_Todo, index };
}

export function setVisibilityFilter(filter) {
  return { type: Set_Visibility_Filter, filter };
}
