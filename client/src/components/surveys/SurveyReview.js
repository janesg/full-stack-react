import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

// Destructure props to get the callback function
// + return value of mapStateToProps
// + actions (passed as parameter into connect statement)
// + history from withRouter
const SurveyReview = ({ onBack, formValues, submitSurvey, history }) => {

    const reviewFields = formFields.map(({ label, name }, index) => {
        return (
            <div key={ index }>
                <label>{ label }</label>
                <div>{ formValues[name] }</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm the details you entered</h5>
            { reviewFields }
            <button className="yellow darken-1 btn-flat left white-text"
                    onClick={ onBack }>
                Back
            </button>
            {/* Wrap submitSurvey with arrow function otherwise it will be run immediately */}
            <button
                onClick={ () => submitSurvey(formValues, history) }
                className="teal btn-flat right white-text">
                Send Out Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    // Note use of surveyForm namespace (that was set in SurveyForm)
    // to access the particular state of form we're interested in
    // Whatever we return from mapStateToProps will turn up as properties
    // on props and be passed to SurveyReview component
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));