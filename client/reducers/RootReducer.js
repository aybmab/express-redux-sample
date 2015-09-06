import { combineReducers } from 'redux';
import { updateUserInfo } from './AuthReducer';
import { updateUniversalTodoList, updateUniversalUnsavedTodoList } from './TodoReducer';
import { updateProfileData } from './ProfileReducer';

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

const RootReducer = combineReducers({
  // visibilityFilter: updateVisibilityFilter, //TODO implement or remove...
  universalTodos: updateUniversalTodoList,
  unsavedUniversalTodos: updateUniversalUnsavedTodoList,
  userAuthSession: updateUserInfo,

  //For viewing profiles.
  userProfileData: updateProfileData

});

export default RootReducer;

