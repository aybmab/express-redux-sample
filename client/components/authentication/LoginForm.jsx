import React, { Component, PropTypes } from 'react';

export default class LoginForm extends Component {
  constructor(){
    super();
    this.handleOnClickLogin = this.handleOnClickLogin.bind(this);
  }
  isValidInput(username, password){
    if ((username.trim() === "") || (password.trim() === ""))
      return false;
    return true;
  }
  handleOnClickLogin(){
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;

    if (this.isValidInput(username, password)){
      this.props.onClickLogin(username, password);
    } else{
      alert("Input not valid");
    }
  }
  render() {
    return (        
      <div> 
        <input type="text" placeholder="username" ref="username"/> <br/>
        <input type="password" placeholder="password" ref="password" /> <br/>
        <button onClick={this.handleOnClickLogin}> Login </button>
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