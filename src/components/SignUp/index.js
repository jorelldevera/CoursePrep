import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import '../../style/popup.css';
import './signup.css';

import Button from '@material-ui/core/Button';

const SignUpPage = () => (
    <div>
        <div className = "title-text">
            <h1>Sign Up</h1>
        </div>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.LANDING);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            email.substring(email.indexOf('@') + 1) !== "wwu.edu" ||
            username === '';

        return (
            <div className="login-content">
                <form onSubmit={this.onSubmit}>
                    <div>
                        <div className="form-item">
                            <h2>Full Name:</h2>
                            <input
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Full Name"
                                />
                                <br></br>
                        </div>
                        <div className="form-item">
                            <h2>Email:</h2>
                            <input
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                                />
                                <br></br>
                        </div>
                        <div className="form-item">
                            <h2>Password:</h2>
                            <input
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                                />
                                <br></br>
                        </div>
                        <div className="form-item">
                            <h2>Re-Type Password:</h2>
                            <input
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                                />
                                <br></br>
                        </div>
                    </div>
                    <br></br>
                    <Button className = "signup-modal-button" disabled={isInvalid} type="submit">Sign Up</Button>

                    {error && <p className = "p-black">{error.message}</p>}
                </form>
            </div>
        );
    }
}

const SignUpLink = () => (
    <p>
        
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };