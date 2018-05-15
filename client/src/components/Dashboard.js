import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

// Use a React functional component for simplicity
// - as functional components are stateless, they completely
//   avoid the use of use of 'this' keyword
// FOR:
//  https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
// AGAINST:
//  https://medium.freecodecamp.org/7-reasons-to-outlaw-reacts-functional-components-ff5b5ae09b7c
const Dashboard = () => {
    return (
        <div>
            <SurveyList />
            <div className="fixed-action-btn">
                <Link to="/surveys/new" className="btn-floating btn-large red">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;