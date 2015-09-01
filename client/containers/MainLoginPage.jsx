import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import LoginForm from '../components/authentication/LoginForm';
import { attemptLogin } from '../actions/AuthActions';

class MainLoginPage extends Component {
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
        <h1> Login </h1>
        <LoginForm onClickLogin={(email, password) =>
                          dispatch(attemptLogin(email, password))}  />
      </div>
    );
  }

}

MainLoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};


function select(state) {
  return {
    userAuthSession: state.userAuthSession
  };
}

export default connect(select)(MainLoginPage);