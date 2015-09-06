import {  Start_Fetching_User_Profile,
          Fetch_User_Profile_Success, Fetch_User_Profile_Fail,
          Reload_Profile_Page
        } from '../actions/ProfileActions';

const defaultStartState = { profileLoaded: false, //true even if results failed
                            isFetchingProfile: false, 
                            userData: null,
                            error: null
                          }

export function updateProfileData(userProfileState = defaultStartState , action) {
  
  switch (action.type){
    
    case Start_Fetching_User_Profile:
      return Object.assign({}, defaultStartState,{isFetchingProfile: true });

    case Fetch_User_Profile_Success:
      return {
        profileLoaded: true,
        isFetchingProfile: false, 
        userData: action.userData,
        error: null
      };


    case Fetch_User_Profile_Fail:
      return {
        profileLoaded: true,
        isFetchingProfile: false, 
        userData: null,
        error: action.error
      };

    case Reload_Profile_Page:
      return Object.assign({}, defaultStartState);

    default: 
      return userProfileState;
  }
}