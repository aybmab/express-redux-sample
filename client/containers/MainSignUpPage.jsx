import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import SignUpForm from '../components/authentication/SignUpForm';
import { attemptSignUp, navigatedAwayFromAuthFormPage } from '../actions/AuthActions';

class MainSignUpPage extends Component {
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
    return (        
      <div style={{width: '33%', textAlign: 'center', marginLeft: '100px'}}> 
        <h1> Sign Up </h1>
        <SignUpForm onClickSignUp={(formData) => {
                      dispatch(attemptSignUp(formData.email, formData.password, formData.displayName))
                    }} 
                    isFetchingData={userAuthSession.fetchingAuthUpdate}
                    serverError={userAuthSession.error} />
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