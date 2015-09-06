/*
 * action types
 */
export const Start_Fetching_User_Profile = 'Start_Fetching_User_Profile';
export const Fetch_User_Profile_Success = 'Fetch_User_Profile_Success';
export const Fetch_User_Profile_Fail = 'Fetch_User_Profile_Fail';
export const Reload_Profile_Page = 'Reload_Profile_Page';


/*
 * other constants
 */

/*
 * action creators
 */

export function startFetchingUserProfile() {
  return { type: Start_Fetching_User_Profile };
}


export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startFetchingUserProfile());

    $.ajax({
			type: 'GET',
			url: ('/api/v1/users/' + userId) })
			.done(function(data) {
				if (data.error){
					dispatch(fetchUserProfileFail(data.error));
				} else {
					dispatch(fetchUserProfileSuccess(data.userData));
				}
			})
			.fail(function(a,b,c,d) {
				console.log("GET '/api/v1/users/' has actual failure: ", a, b, c, d)
			  dispatch(fetchUserProfileFail()); //TODO figure out what to pass
			});
  }
}

export function fetchUserProfileSuccess(userData) {
	return { type: Fetch_User_Profile_Success, userData };
}

export function fetchUserProfileFail(error) {
	return { type: Fetch_User_Profile_Fail, error };
}

export function reloadingProfilePage() {
	return { type: Reload_Profile_Page };
}


