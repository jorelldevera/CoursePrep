import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import '../../style/popup.css';

import Button from '@material-ui/core/Button';

const LoginPage = () => (
    <div>
        <div className = "title-text">
            <h1>Login</h1>
        </div>
        <LoginForm />
        <SignUpLink />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class LoginFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const {email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE });
                this.props.history.push(ROUTES.LANDING);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form className = "login-content" onSubmit={this.onSubmit}>
                <div className="form-item">
                    <h2>Email: </h2>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <br></br>
                <div className="form-item">
                    <h2>Password: </h2>
                    <input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <br></br>
                <Button className = "login-modal-button"disabled={isInvalid} type="submit"> Sign In </Button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const LoginForm = compose(
    withRouter,
    withFirebase,
)(LoginFormBase)

export default LoginPage;

export { LoginForm };
