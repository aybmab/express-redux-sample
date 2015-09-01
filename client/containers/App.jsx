import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//Actions
import { attemptLogout } from '../actions/AuthActions';

//Components
import Navbar from '../components/Navbar';
import SignUpForm from '../components/authentication/SignUpForm';
import LoginForm from '../components/authentication/LoginForm';

class StatusBox extends Component {
  render() {
    var status;
    var error = "None";

    if (this.props.userAuthSession){
      if (this.props.userAuthSession.isLoggedIn){
        status = "Logged in as '"+this.props.userAuthSession.userObject.displayName+"'.";
      }
      else if (this.props.userAuthSession.fetchingAuthUpdate){
        status = "Retrieving user info...";
      }
      else {
        status = "Not logged in.";
      }
    } else {
      status = "Something went wrong...";
    }

    if (this.props.userAuthSession.error){
      error = this.props.userAuthSession.error;
    }

    return (        
      <div> 
        <p> Login Status: </p>
        <p> status: {status} </p>
        <p> error: {error} </p>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Injected by connect() call:
    const { dispatch, userAuthSession } = this.props;

    // Injected by React Router
    const { location, children } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);

    var content;
    var landingPage; //TODO move this to components/static_pages
    if (children === undefined){
      landingPage = <h1> Here's my landing page :) </h1>;
    }

    return (
      <div>
        <Navbar userAuthSession={userAuthSession}
                logout={() => dispatch(attemptLogout())}/>
        { landingPage }
        { children }
        { content }
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

function select(state) {
  return {
    universalTodos: state.universalTodos,
    unsavedUniversalTodos: state.unsavedUniversalTodos,
    userAuthSession: state.userAuthSession
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);