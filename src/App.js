import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes.js';
import reducers from './reducers';

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'something',
      authDomain: 'some-domain.firebaseapp.com',
      databaseURL: 'https://some-domain.firebaseio.com',
      projectId: 'some-domain',
      storageBucket: 'some-domain.appspot.com',
      messagingSenderId: '000000000000'
    });
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}
