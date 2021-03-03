
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
            {/* <h1 className='landing-header'>Landing Page</h1> */}
            <div className='landing-center-container'>
                <div className='landing-left'>
                    <h2 className='landing-text'>CoursePrep is a new way to exchange practice material</h2>
                    <p>Create your own practice questions</p>
                    <p>Share material to the class feed</p>
                    <p>Save questions to your profile</p>
                </div>
                <div className='landing-right'>
                    <img className='landing-img' src='/courseprep.png' />
                </div>
            </div>
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