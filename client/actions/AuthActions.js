/*
 * action types
 */

export const Clicked_SignUp = 'Clicked_SignUp';
export const SignUp_Success = 'SignUp_Success';
export const SignUp_Fail = 'SignUp_Fail';

export const Clicked_Login = 'Clicked_Login';
export const Login_Success = 'Login_Success';
export const Login_Fail = 'Login_Fail';

export const Started_Session_Check = 'Started_Session_Check';
export const Checked_Session_Status = 'Checked_Session_Status';

export const Clicked_Logout = 'Clicked_Logout';
export const Logout_Success = 'Logout_Success';

// Note: Considered creating a new actions file for navigation
//				related actions. For now, will leave these here.
export const Navigate_Away_From_Auth_Form = 'Navigate_Away_From_Auth_Form';

/*
 * other constants
 */


/*
 * action creators
 */

export function clickedSignUp() {
	return { type: Clicked_SignUp }
}

export function signUpSuccess(userObject) {
	return { type: SignUp_Success, userObject };
}

export function signUpFail(error) {
	return { type: SignUp_Fail, error };
}

export function attemptSignUp(email, password, displayName) {
  return (dispatch) => {
    dispatch(clickedSignUp());

    $.ajax({
			type: 'POST',
			url: '/signup',
			data: {email, password, displayName} })
			.done(function(data) {
				if (data.error){
					dispatch(signUpFail(data.error));
				} else {
					dispatch(signUpSuccess(data));
				}
			})
			.fail(function(a,b,c,d) {
			  // console.log('failed to signup',a,b,c,d);
			  dispatch(signUpFail("TODO find the error..."));
			});
  }
}


export function clickedLogin() {
	return { type: Clicked_Login };
}

export function loginSuccess(userObject) {
	return { type: Login_Success, userObject };
}

export function loginFail(error) {
	return { type: Login_Fail, error };
}


export function attemptLogin(email, password) {
  return (dispatch) => {
    dispatch(clickedLogin());

    $.ajax({
			type: 'POST',
			url: '/login',
			data: {email, password} })
			.done(function(data) {
				if (data.error){
					dispatch(loginFail(data.error));
				} else {
					dispatch(loginSuccess(data));
				}
			})
			.fail(function(a,b,c,d) {
			  // console.log('failed to login',a,b,c,d);
			  dispatch(loginFail("TODO find the error..."));
			});
  }
}


export function startedSessionCheck() {
	return { type: Started_Session_Check };
}

export function checkedSessionStatus(result) {
	return { type: Checked_Session_Status, result };
}

export function checkSessionStatus(email, password) {
  return (dispatch) => {
    dispatch(startedSessionCheck());

    $.ajax({
			type: 'POST',
			url: '/checkSession',
			data: {} })
			.done(function(result) {
				dispatch(checkedSessionStatus(result));
			})
			.fail(function(a,b,c,d) {
			  // console.log('failed to check',a,b,c,d);
			  dispatch(checkedSessionStatus("TODO find the error..."));
			});
  }
}


export function clickedLogout() {
	return { type: Clicked_Logout }; 
}

export function logoutSuccess() {
	return { type: Logout_Success };
}

export function attemptLogout(){
  return (dispatch) => {
    dispatch(clickedLogout());

    $.ajax({
	      type: 'POST',
	      url: '/logout'})
			  .done(function() {
					dispatch(logoutSuccess());
			  })
			  .fail(function() {
			  	// Not the redux way, but I think it's fair enough.
			    alert("Can't log you out at the moment. Try again in a bit");
			  });
  }
}


export function navigatedAwayFromAuthFormPage() {
	return { type: Navigate_Away_From_Auth_Form }
}
