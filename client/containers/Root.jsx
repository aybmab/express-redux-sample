// Note: This is probably an overloaded class.... TODO move the store creation to index.js
// Redux
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from '../reducers/RootReducer';
import { checkSessionStatus } from '../actions/AuthActions';
import { linkSocketToStore, registerToUniversalTodo } from '../utilities/ServerSocket';

// React + React Router
import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

// views (containers)
import App from './App';
import MainSignUpPage from './MainSignUpPage';
import MainLoginPage from './MainLoginPage';
import Dashboard from './Dashboard';

// Static Pages
import AboutUs from '../components/static_pages/AboutUs';
import SettingsPage from '../components/static_pages/SettingsPage';


// Set up store
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
  // loggerMiddleware // neat middleware that logs actions //TODO get a better logger
)(createStore);

const store = createStoreWithMiddleware(RootReducer);
linkSocketToStore(store.dispatch);
store.dispatch(checkSessionStatus());


// Set up routes
var routes = (
  <Route path="/" component={App}>
    <Route path="signup" component={MainSignUpPage}/>
    <Route path="login" component={MainLoginPage}/>

    <Route path="about" component={AboutUs}/>
    <Route path="settings" component={SettingsPage}/>

    <Route path="dash" component={Dashboard}/>
  </Route>
);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
		    {() => <Router history={history} children={routes}/>}
		  </Provider>
    );
  }
};
