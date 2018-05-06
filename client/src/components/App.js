// Root component
// Render layer control - React Router

// Note: Front-end makes use of ES 2015 modules:
// Characterised by following statements:
//  - import
//  - export default

// CSS module import
import 'materialize-css/dist/css/materialize.min.css';

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {

    // Lifecycle method automatically called after component is mounted
    // https://reactjs.org/docs/react-component.html#componentdidmount
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        // Materialize CSS works best with a root container that all rendered
        // content placed within. Makes the UI responsive
        return (
            <BrowserRouter>
                { /* BrowserRouter can only have a single child ... hence 'div' */ }
                <div className="container">
                    { /* As Header is not tied to a route, it is always visible */ }
                    <Header />
                    <Route exact path="/" component={ Landing } />
                    <Route exact path="/surveys" component={ Dashboard } />
                    <Route path="/surveys/new" component={ SurveyNew } />
                </div>
            </BrowserRouter>
        );
    }
};

// Connect Parameters: mapStateToProps, actions
export default connect(null, actions)(App);