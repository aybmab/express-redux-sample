import React, { Component, PropTypes } from 'react';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.transferToUserPage = this.transferToUserPage.bind(this);
  }
  transferToUserPage(){
    this.props.onClickUserName(this.props.creator.id)
  }
  render() {
    var content = this.props.text;
    var author = "@"+ this.props.creator.displayName;
    var savedStatus;
    if (!this.props.isSaved) {
      savedStatus = <span> "(not saved yet)" </span>;
    } else if(this.props.failedToAdd) {  
     savedStatus = <span>"(failed to save)";</span>
    } 

    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? "line-through" : "none",
          cursor: this.props.completed ? "default" : "pointer"
        }}>
        <span>{content} </span> 

         - posted by: <a onClick={this.transferToUserPage} style={{
              href: "#"
            }}> {author} 

        </a>  {savedStatus}  

      </li>
    );
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};