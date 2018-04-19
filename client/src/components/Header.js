import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login With Google</a>
                    </li>
                );
            default:
                return (
                    <li>
                        <a href="/api/logout">Logout</a>
                    </li>
                );
        }
    }

    render() {
        // Note: for JSX we use className attribute rather than class
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={ this.props.auth ? '/surveys' : '/' }
                        className="left brand-logo"
                    >
                        Campaigner
                    </Link>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

// ES6 refactoring: destructure state.auth and reduce as property names the same
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);