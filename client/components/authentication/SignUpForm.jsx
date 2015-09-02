import { validateEmail, validateDisplayName, validatePassword } from '../../utilities/RegexValidators';

import React, { Component, PropTypes } from 'react';

const initialFormState = {
      errorMessage:  null,
      isDisplayNameFieldIncorrect : false,
      isEmailFieldIncorrect : false,
      isPasswordFieldIncorrect : false,
      isConfirmPasswordFieldIncorrect : false
};

export default class SignUpForm extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign({}, initialFormState);
    this.handleOnClickSignUp = this.handleOnClickSignUp.bind(this);
  }

  getInputContainerClass(inputIncorrect){
    return ("form-group " + (inputIncorrect ? "has-error" : "") );
  }

  findErrorsInSignupForm(formData) {
    // Only finding one error at a time. 
    let newState = Object.assign({}, initialFormState);
    // Checking display name
    if (formData.displayName === "") {
      newState.errorMessage = "A display name is required";
      newState.isDisplayNameFieldIncorrect = true;
    } 
    else if (!validateDisplayName(formData.displayName)) {
      newState.errorMessage = "Please enter a valid display name containing alphanumerics, dashes (-), and/or underscores (_)";
      newState.isDisplayNameFieldIncorrect = true;
    }
    // Checking email
    else if (formData.email === "") {
      newState.errorMessage = "Email is required";
      newState.isEmailFieldIncorrect = true;
    } 
    else if (!validateEmail(formData.email)) {
      newState.errorMessage = "Please enter a valid email address";
      newState.isEmailFieldIncorrect = true;
    }
    // Checking password
    else if (formData.password === "") {
      newState.errorMessage = "Password is required";
      newState.isPasswordFieldIncorrect = true;
    } 
    else if(!validatePassword(formData.password)) {
      newState.errorMessage = "Your password must contain at least 6 valid characters";
      newState.isPasswordFieldIncorrect = true;
    }
    // Checking confirmed password
    else if (formData.confirmedPassword === "") {
      newState.errorMessage = "Please confirm your password";
      newState.isConfirmPasswordFieldIncorrect = true;
    } 
    else if (formData.confirmedPassword !== formData.password) {
      newState.errorMessage = "The passwords don't match";
      newState.isConfirmPasswordFieldIncorrect = true;
      newState.isPasswordFieldIncorrect = true;
    }

    this.setState(newState);
    if (!newState.errorMessage){
      return false; // no error
    } else {
      return true;
    }
  }

  handleOnClickSignUp(){
    var formData = {
      displayName : this.refs.displayName.getDOMNode().value.trim(),
      email : this.refs.email.getDOMNode().value.trim(),
      password : this.refs.password.getDOMNode().value.trim(),
      confirmedPassword : this.refs.confirmPassword.getDOMNode().value.trim()
    }

    let errors = this.findErrorsInSignupForm(formData);
    if (!errors){
      this.props.onClickSignUp(formData);
    }
  }

  componentDidMount(){
    React.findDOMNode(this.refs.displayName).focus();
  }

  componentDidUpdate(){
    if(this.props.serverError === "That email is already being used."){ //TODO fix this - use constants
      if(!this.state.isEmailFieldIncorrect){ 
        let newState = Object.assign({}, this.state);
        newState.isEmailFieldIncorrect = true;
        this.setState(newState);
      }
      React.findDOMNode(this.refs.email).focus();
    }
  }

  render() {
    var loader; //TODO implement a better loader
    var errorLabel;
    if (this.props.isFetchingData){
      loader = <p> loading </p>;
    }
    //TODO create an "FormErrorMessage" component
    if(this.state.errorMessage){
      errorLabel = (
        <div className={this.getInputContainerClass(true)}> 
          <label className="control-label">{this.state.errorMessage}</label>
        </div> );
    }
    else if(this.props.serverError){
      errorLabel = (
        <div className={this.getInputContainerClass(true)}> 
          <label className="control-label">{this.props.serverError}</label>
        </div> );
    }
    return ( 
      <div>
        {loader}
        {errorLabel}
        <div className={this.getInputContainerClass(this.state.isDisplayNameFieldIncorrect)}> 
          <input className="form-control" type="text" placeholder="Display Name" ref="displayName"/>
        </div> 
        <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}> 
          <input className="form-control" type="text" placeholder="Email" ref="email"/>
        </div> 
        <div className={this.getInputContainerClass(this.state.isPasswordFieldIncorrect)}> 
          <input className="form-control" type="password" placeholder="Password" ref="password" />
        </div> 
        <div className={this.getInputContainerClass(this.state.isConfirmPasswordFieldIncorrect)}> 
          <input className="form-control" type="password" placeholder="Confirm Password" ref="confirmPassword" />
        </div> 
          <button onClick={this.handleOnClickSignUp}> Sign Up </button>
      </div>
    );
  }

}

SignUpForm.propTypes = {
  onClickSignUp: PropTypes.func.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
  serverError: PropTypes.string
};


