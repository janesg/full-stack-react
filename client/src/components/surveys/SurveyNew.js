import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component {

    // We're using component-level state to control which survey form is displayed
    // This is state no other component is interested in so no point in implementing
    // full Redux action, action producer, reducer

    // Classic React way of initialising component state is via constructor
    // constructor(props) {
    //     super(props);
    //
    //     this.state = { showReview: false };
    // }

    // create-react-app comes with Babel plug-in that converts
    // condensed syntax following to constructor commented out above
    state = { showReview: false };

    renderContent() {
        if (this.state.showReview) {
            return <SurveyReview onBack={() =>
                this.setState({ showReview: false })
            }/>;
        }

        // In callback function, 'this' refers to SurveyNew component
        // To change a component's internal state we have to call setState
        // and pass new version of the complete state
        // https://joelgriffith.net/top-5-react-gotchas/
        return <SurveyForm onSurveySubmit={() =>
            this.setState({ showReview: true })
        }/>;
    }

    render() {
        return (
            <div>
                { this.renderContent() }
            </div>
        );
    }
}

// Use reduxForm to clear out form values
// When SurveyNew component is unmounted we want the form values
// (for the specified form) destroyed...which is default behaviour
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);