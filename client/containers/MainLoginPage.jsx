import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import LoginForm from '../components/authentication/LoginForm';
import { attemptLogin, navigatedAwayFromAuthFormPage } from '../actions/AuthActions';

class MainLoginPage extends Component {
  constructor(props) {
    super(props);
  }
  transferToDashboardIfLoggedIn(){
    if (this.props.userAuthSession.isLoggedIn){
      this.context.router.transitionTo('/dash');
    } 
  }
  componentWillMount() {
    this.transferToDashboardIfLoggedIn();
  }
  componentDidUpdate() {
    this.transferToDashboardIfLoggedIn();
  }
  componentWillUnmount() {
    this.props.dispatch(navigatedAwayFromAuthFormPage());
  }
  render() {
    const { dispatch, userAuthSession } = this.props;
    // TODO is fetching logged in status, show loader...
    return (        
      <div style={{width: '33%', textAlign: 'center', marginLeft: '100px'}}> 
        <h1> Login </h1>
        <LoginForm onClickLogin={(formData) => {
                      dispatch(attemptLogin(formData.email, formData.password))
                    }} 
                    isFetchingData={userAuthSession.fetchingAuthUpdate}
                    serverError={userAuthSession.error} />
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