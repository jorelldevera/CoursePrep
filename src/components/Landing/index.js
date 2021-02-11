
import React from 'react';
import './landing.css';
import Dashboard from '../Dashboard'
import { AuthUserContext } from '../Session'

const LandingPage = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <LandingPageAuth /> : <LandingPageNonAuth/>
            }
        </AuthUserContext.Consumer>
    </div>
);  


const LandingPageNonAuth = () => {
    return (
        <div>
            <h1 className='landing-header'>Course Prep</h1>
        </div>
    );
}

const LandingPageAuth = () => {
    return (
        <React.Fragment>
            <Dashboard/>
        </React.Fragment>
    );
}

export default LandingPage;