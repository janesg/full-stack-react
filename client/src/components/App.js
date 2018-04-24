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

// Dummy functional components
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>New Survey</h2>;

class App extends Component {

    // Lifecycle method automatically called after component is mounted
    // https://reactjs.org/docs/react-component.html#componentdidmount
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        // Materialize CSS works best with a root container that all content placed within
        // Makes the UI responsive
        return (
            <div className="container">
                { /* BrowserRouter can only have a single child ... hence 'div' */ }
                <BrowserRouter>
                    <div>
                        { /* As Header is not tied to a route, it is always visible */ }
                        <Header />
                        <Route exact path="/" component={ Landing } />
                        <Route exact path="/surveys" component={ Dashboard } />
                        <Route path="/surveys/new" component={ SurveyNew } />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

// Connect Parameters: mapStateToProps, actions
export default connect(null, actions)(App);