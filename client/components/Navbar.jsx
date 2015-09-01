import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class UserDropdown extends Component {
  render() {
    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" 
                    data-toggle="dropdown" 
                    role="button" 
                    aria-haspopup="true" 
                    aria-expanded="false">

                    My Account <span className="caret"></span>
        </a>

        <ul className="dropdown-menu">
          <li><Link to="/settings"> Settings </Link></li>
          <li role="separator" className="divider"></li>
          <li onClick={this.props.logout}><a href="#">Logout</a></li>
        </ul>
      </li>
    );
  }
}

export default class Navbar extends Component {
  render() {
    var todos;
    var loginTab;
    var signupTab;
    var userDropdown;
    if (this.props.userAuthSession.isLoggedIn) {
      todos =  <li><Link to="/dash"> Todos </Link></li>;
      userDropdown = (<UserDropdown logout={this.props.logout}/>);
    } else {
      loginTab = <li><Link to="/login"> Login </Link></li>;
      signupTab = <li><Link to="/signup"> Sign Up</Link></li>;
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <Link className="navbar-brand" to="/"> Sample App</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right"> 

              { todos }

              <li><Link to="/about">About Us</Link></li>

              { loginTab }
              { signupTab }

              { userDropdown }
              
            </ul>
          </div>

        </div>
      </nav>

    );
  }
}
