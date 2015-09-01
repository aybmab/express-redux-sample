import {  Received_All_Universal_Todos,
          Optimistically_Add_Universal_Todo, 
          Optimistic_Add_Universal_Success, Optimistic_Add_Universal_Fail } from '../actions/TodoActions';


//TODO create function that flips loader for retrieving all todos


export function updateUniversalTodoList(universalTodosState = {} , action) {
  switch (action.type){

    case Received_All_Universal_Todos:
      // console.log("Received_All_Universal_Todos with", action.todos);
      return Object.assign({}, action.todos);
    
    case Optimistic_Add_Universal_Success:
      var setToAdd = {};
      setToAdd[action.todo.id] = action.todo;
      return Object.assign({}, universalTodosState, setToAdd);

    default: 
      return universalTodosState;
  }
}


export function updateUniversalUnsavedTodoList(universalUnsavedTodosState = {} , action) {
  switch (action.type){
    
    case Optimistically_Add_Universal_Todo:
      var todo = {
        clientUUID : action.clientUUID,
        text : action.text,
        completed: false,
        creator: action.user
      }
      var setToAdd = {};
      setToAdd[todo.clientUUID] = todo;
      return Object.assign({}, universalUnsavedTodosState, setToAdd);

    case Optimistic_Add_Universal_Success:
      var setToAdd = Object.assign({}, universalUnsavedTodosState);
      delete setToAdd[action.todo.clientUUID];
      return setToAdd;

    case Optimistic_Add_Universal_Fail:
      var setToAdd = Object.assign({}, universalUnsavedTodosState);
      setToAdd[action.todo.clientUUID].failedToAdd = true;
      return setToAdd;

    default: 
      return universalUnsavedTodosState;
  }
}