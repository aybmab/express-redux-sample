import React, { Component, PropTypes } from 'react';

export default class SignUpForm extends Component {
  constructor(){
    super();
    this.handleOnClickSignUp = this.handleOnClickSignUp.bind(this);
  }
  isValidInput(displayName, username, password, confirmedPassword){
    if ((displayName.trim() === "") || (username.trim() === "") || (password.trim() === "") 
      || (confirmedPassword.trim() === "") )
      return false;
    if (password.trim() !== confirmedPassword.trim())
      return false;
    return true;
  }
  handleOnClickSignUp(){
    var displayName = this.refs.displayName.getDOMNode().value;
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var passwordConfirm = this.refs.confirmPassword.getDOMNode().value;

    if (this.isValidInput(displayName, username, password, passwordConfirm)){
      this.props.onClickSignUp(username, password, displayName);
    } else{
      alert("Input not valid");
    }
  }
  render() {
    return (        
      <div> 
        <input type="text" placeholder="display name" ref="displayName"/> <br/>
        <input type="text" placeholder="username" ref="username"/> <br/>
        <input type="password" placeholder="password" ref="password" /> <br/>
        <input type="password" placeholder="confirm password" ref="confirmPassword" /> <br/>
        <button onClick={this.handleOnClickSignUp}> Sign Up </button>
      </div>
    );
  }

}

// Footer.propTypes = {
//   onFilterChange: PropTypes.func.isRequired,
//   filter: PropTypes.oneOf([
//     'Show_All',
//     'Show_Completed',
//     'Show_Active'
//   ]).isRequired
// };