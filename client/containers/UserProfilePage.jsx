import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUserProfile, reloadingProfilePage } from '../actions/ProfileActions';



class UserTodoList extends Component {
  render(){
    var todoElements;

    var todoObjects = this.props.todos;

    if(Object.keys(todoObjects).length === 0){
      todoElements = <p> This user hasn't created any todos. </p>;
    } else {
      todoElements = [];
      
      Object.keys(todoObjects).forEach(function(todo, value){
        todoElements.push(<li> {todoObjects[todo]}</li>);
      });
      todoElements = <ul> {todoElements} </ul>;
    }

    return(
        <div>
          {todoElements}
        </div>
      );
  }
}



class UserProfilePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.routerWillLeave = this.routerWillLeave.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(fetchUserProfile(this.props.params.id));
    this.context.router.addTransitionHook(this.routerWillLeave);
  }

  componentWillUpdate(){
    const { dispatch, userProfileData, params } = this.props;
    if(!userProfileData.profileLoaded && !userProfileData.isFetchingProfile){
      dispatch(fetchUserProfile(params.id));
    }
  }

  componentWillUnmount() {
      this.context.router.removeTransitionHook(this.routerWillLeave);
  }

  routerWillLeave (nextState, router) {
    this.props.dispatch(reloadingProfilePage());
  }

  render() {
    const { dispatch, userAuthSession, userProfileData } = this.props;

    var content;
    if (!userProfileData.profileLoaded){
      content = <p> Loading </p>;
    } 
    else if (userProfileData.error) {
      content = <p> Sorry Something went wrong: {userProfileData.error} </p>;
    } else {
      content = <div>
                  <p> display name: {userProfileData.userData.userInfo.displayName} </p>
                  <p> email: {userProfileData.userData.userInfo.email} </p>
                </div>;
    }

    var todoList;
    if (userProfileData !== undefined){
      if(userProfileData.userData !== null){
        if (userProfileData.userData.userCreatedTodos !== null){
          todoList = <UserTodoList todos={userProfileData.userData.userCreatedTodos}/>;
        }
      }
    }

    return (        
      <div> 
        <h1> Profile Page </h1>
        <h2> User id: {this.props.params.id} </h2>
        {content}
        {todoList}
      </div>
    );
  }
}

UserProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};


function select(state) {
  return {
    userAuthSession: state.userAuthSession,
    userProfileData: state.userProfileData,
  };
}

export default connect(select)(UserProfilePage);