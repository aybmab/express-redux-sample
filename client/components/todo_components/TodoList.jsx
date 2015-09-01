import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
  render() {
    var todos = this.props.todos;
    var unsavedTodos = this.props.unsavedTodos;
    var todoElements = [];

    Object.keys(todos).forEach( (todoId) => {
        todoElements.push(<Todo {...todos[todoId]}
                key={todos[todoId].clientUUID}
                isSaved={true}
                onClick={() => this.props.onTodoClick(index)} />);
      }
    );
    Object.keys(unsavedTodos).forEach( (todoId) => {
        todoElements.push(<Todo {...unsavedTodos[todoId]}
                key={unsavedTodos[todoId].clientUUID}
                isSaved={false}
                onClick={() => this.props.onTodoClick(index)} />);
      }
    );

    return (
      <ul>
        {todoElements}
      </ul>
    );
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.object.isRequired
};