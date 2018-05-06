import React from 'react';

// Destructuring (and nested destructuring) of this.props parameter
const SurveyField = ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{ label }</label>
            {/* Use spread operator to copy all input events onto our input element */}
            <input {...input} style={{ marginBottom: '5px' }}/>
            <div className="red-text" style={{ marginBottom: '20px' }}>
                { touched && error }
            </div>
        </div>
    );
};

export default SurveyField;