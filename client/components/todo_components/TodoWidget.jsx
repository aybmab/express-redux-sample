//TODO move "isLoggedIn logic" out
import React, { Component, PropTypes } from 'react';

import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

export default class TodoWidget extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    return (
      <div> 
        <h3> {this.props.title} </h3>
        <AddTodo
          onAddClick={this.props.onAddClick} />
        <TodoList
          todos={this.props.todos}
          unsavedTodos={this.props.unsavedTodos}
          onTodoClick={this.props.onTodoClick}
          onClickUserName={this.props.onClickUserName} />
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


//TODO add footer back:
        // <Footer
        //   filter={this.filter}
        //   onFilterChange={this.props.onFilterChange} />

