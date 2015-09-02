import { validateEmail, validateDisplayName, validatePassword } from '../../utilities/RegexValidators';

import React, { Component, PropTypes } from 'react';

const initialFormState = {
      errorMessage:  null,
      isEmailFieldIncorrect : false,
      isPasswordFieldIncorrect : false
};

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign({}, initialFormState);
    this.handleOnClickLogin = this.handleOnClickLogin.bind(this);
  }

  getInputContainerClass(inputIncorrect){
    return ("form-group " + (inputIncorrect ? "has-error" : "") );
  }

  findErrorsInLoginForm(formData) {
    // Only finding one error at a time. 
    let newState = Object.assign({}, initialFormState);

    // Checking email
    if (formData.email === "") {
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
      newState.errorMessage = "Passwords must contain at least 6 valid characters";
      newState.isPasswordFieldIncorrect = true;
    }

    return newState;
  }

  handleOnClickLogin(){
    var formData = {
      email : this.refs.email.getDOMNode().value.trim(),
      password : this.refs.password.getDOMNode().value.trim(),
    }

    let newState = this.findErrorsInLoginForm(formData);
    this.setState(newState);
    if (!newState.errorMessage){
      this.props.onClickLogin(formData);
    } 
  }

  componentDidMount(){
    React.findDOMNode(this.refs.email).focus();
  }

  componentDidUpdate(){
    console.log(this.props.serverError);
    if(this.props.serverError === "Email not found."){ //TODO fix this - use constants
      if(!this.state.isEmailFieldIncorrect){ 
        let newState = Object.assign({}, this.state);
        newState.isEmailFieldIncorrect = true;
        this.setState(newState);
      }
      React.findDOMNode(this.refs.email).focus();
    }
    if(this.props.serverError === "Incorrect password."){ //TODO fix this - use constants
      if(!this.state.isPasswordFieldIncorrect){ 
        let newState = Object.assign({}, this.state);
        newState.isPasswordFieldIncorrect = true;
        this.setState(newState);
      }
      React.findDOMNode(this.refs.password).focus();
    }
  }

  render() {
    var loader; //TODO implement a better loader
    var errorLabel;
    if (this.props.isFetchingData){
      loader = <p> loading </p>;
    }
    //TODO create a "FormErrorMessage" component
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
        { loader }
        { errorLabel }
        <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}> 
          <input className="form-control" type="text" placeholder="Email" ref="email"/>
        </div> 
        <div className={this.getInputContainerClass(this.state.isPasswordFieldIncorrect)}> 
          <input className="form-control" type="password" placeholder="Password" ref="password" />
        </div> 

          <button onClick={this.handleOnClickLogin}> Login </button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onClickLogin: PropTypes.func.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
  serverError: PropTypes.string
};


