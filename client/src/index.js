// Data layer control - Redux
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Params for createStore: array of reducers, initial state, middlewares
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Create Provider component containing store at root
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
