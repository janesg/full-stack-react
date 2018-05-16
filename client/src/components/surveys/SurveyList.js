import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {

    // Fetch the surveys when component first mounted
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        // Reverse list so that newest is at the top
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card darken-1" key={ survey._id }>
                    <div className="card-content">
                        <span className="card-title">{ survey.title }</span>
                        <p>
                            { survey.body }
                        </p>
                        <p className="right">
                            Sent on: { new Date(survey.dateSent).toLocaleDateString() }
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: { survey.yesCount }</a>
                        <a>No: { survey.noCount }</a>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                { this.renderSurveys() }
            </div>
        );
    }
}

// ES6 used to destructure state.surveys
function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);