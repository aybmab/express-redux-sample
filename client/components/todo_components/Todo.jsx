import React, { Component, PropTypes } from 'react';

export default class Todo extends Component {
  render() {
    var text = this.props.text + " (created by "+ this.props.creator.displayName +")";
    if (!this.props.isSaved) (text = text+ " (not saved yet)");
    if (this.props.failedToAdd) (text = text+ " (failed to save)");

    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? "line-through" : "none",
          cursor: this.props.completed ? "default" : "pointer"
        }}>
        {text} 
      </li>
    );
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};