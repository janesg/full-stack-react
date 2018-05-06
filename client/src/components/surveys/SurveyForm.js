import React, { Component } from 'react';
// Helper class that acts like 'connect' between component and Redux store
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

    renderFields() {
        // Create form fields from generic field template
        return (
            formFields.map((field, index) => {
                return <Field key={index} label={field.label} type="text" name={field.name} component={SurveyField} />
            })
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    { this.renderFields() }
                    <Link to='/surveys' className="red btn-flat left white-text">Cancel</Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">arrow_forward</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    // Handle case were validate runs when form first rendered and no values
    // Make this check before general 'no value' checking
    errors.recipients = validateEmails(values.recipients || '');

    formFields.forEach(({ name, noValueMsg }) => {
        if (!values[name] || !values[name].trim()) {
            errors[name] = noValueMsg;
        }
    });

    return errors;
}

// form: is the namespace in the Redux store for this particular form
// ES6 destructuring to set the validate property with function of same name
// Don't let redux form destroy all the entered data when switch from form to review and back
export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(SurveyForm);