// Root component
// Render layer control - React Router
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Dummy functional components
const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>New Survey</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
    return (
        <div>
            { /* BrowserRouter can only have a single child ... hence 'div' */ }
            <BrowserRouter>
                <div>
                    { /* As Header not tied to a route, it is always visible */ }
                    <Header />
                    <Route exact path="/" component={ Landing } />
                    <Route exact path="/surveys" component={ Dashboard } />
                    <Route path="/surveys/new" component={ SurveyNew } />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;