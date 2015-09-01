import {  Clicked_SignUp, SignUp_Success, SignUp_Fail,
          Clicked_Login, Login_Success, Login_Fail,
          Started_Session_Check, Checked_Session_Status,
          Clicked_Logout, Logout_Success } from '../actions/AuthActions';

const defaultStartState = { isLoggedIn: false, 
                            fetchingAuthUpdate: false, 
                            userObject: null,
                            error: null
                          }

export function updateUserInfo(userAuthState = defaultStartState , action) {
  switch (action.type){
    
    case Started_Session_Check:
    case Clicked_Login:
    case Clicked_SignUp:
    case Clicked_Logout:
      return Object.assign({}, userAuthState, {
        fetchingAuthUpdate: true
      });

    case Login_Success:
    case SignUp_Success:
      return Object.assign({}, userAuthState, {
        isLoggedIn: true,
        fetchingAuthUpdate: false,
        userObject: action.userObject,
        error: null
      });

    case Login_Fail:
    case SignUp_Fail:
      return Object.assign({}, userAuthState, {
        isLoggedIn: false,
        fetchingAuthUpdate: false,
        error: action.error
      });

    case Checked_Session_Status:
      if (action.result.isLoggedIn){
        return Object.assign({}, userAuthState, {
          isLoggedIn: true,
          fetchingAuthUpdate: false,
          userObject: action.result.userObject,
          error: null
        });
      }
      // set to default conditions 
      // (ignore errors and let login/signup handle server errors)
      return  Object.assign({}, defaultStartState);

    case Logout_Success:
      return Object.assign({}, defaultStartState);

    default: 
      return userAuthState;
  }
}