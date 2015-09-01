import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import SignUpForm from '../components/authentication/SignUpForm';
import { attemptSignUp } from '../actions/AuthActions';

class MainSignUpPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.userAuthSession.isLoggedIn){
      console.log("user is logged in, transition home");
      this.context.router.transitionTo('/dash');
    }
  }
  componentDidUpdate() {
    if (this.props.userAuthSession.isLoggedIn){
      console.log("user is logged in, transition home");
      this.context.router.transitionTo('/dash');
    }
  }

  render() {
    const { dispatch, userAuthSession } = this.props;
    // TODO is fetching logged in status, show loader...
    return (        
      <div> 
        <h1> Sign Up </h1>
        <SignUpForm onClickSignUp={(email, password, displayName) =>
                        dispatch(attemptSignUp(email, password, displayName))}  />
      </div>
    );
  }
}

MainSignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};


function select(state) {
  return {
    userAuthSession: state.userAuthSession
  };
}

export default connect(select)(MainSignUpPage);