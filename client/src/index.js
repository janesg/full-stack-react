// Data layer control - Redux
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Temporary test code for exercising Mailer
import axios from 'axios';
window.axios = axios;

// Type following directly into browser console to create and send email:
// const survey = { title: 'my title', subject: 'my subject', recipients: 'gary.janes065@gmail.com', body: 'This is the Body of the email' };
// axios.post('/api/surveys', survey);

// Params for createStore: array of reducers, initial state, middlewares
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Create Provider component containing store at root
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
