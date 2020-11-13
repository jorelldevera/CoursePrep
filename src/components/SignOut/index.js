import React from 'react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const SignOutButton = ({ firebase }) => (
    // <button type="button" onClick={firebase.doSignOut}> SignOut </button>

    <button type="button" onClick={() => {
        firebase.doSignOut()
        return(
            <Link to={ROUTES.LANDING}></Link>
        );
    }}> SignOut </button>
);

export default withFirebase(SignOutButton);