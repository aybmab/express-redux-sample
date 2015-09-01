import 'babel-core/polyfill';
import React from 'react';
import Root from './containers/Root';

let rootElement = document.body;

React.render(
  <Root />,
  rootElement
);
