import { combineReducers } from 'redux';
import { updateUserInfo } from './AuthReducer';
import { updateUniversalTodoList, updateUniversalUnsavedTodoList } from './TodoReducer';

// import { Add_Todo, Complete_Todo, Set_Visibility_Filter, VisibilityFilters  } from '../actions/TodoActions';
// const { Show_All } = VisibilityFilters;


// function updateVisibilityFilter(visibilityFilterState = Show_All, action){
//   switch (action.type){

//     case Set_Visibility_Filter:
//       return action.filter;

//     default:
//       return visibilityFilterState;
//   }
// }


// TODO check if this works:
const RootReducer = combineReducers({
  // visibilityFilter: updateVisibilityFilter,
  universalTodos: updateUniversalTodoList,
  unsavedUniversalTodos: updateUniversalUnsavedTodoList,
  userAuthSession: updateUserInfo

});

export default RootReducer;

