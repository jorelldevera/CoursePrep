import React from 'react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const SignOutButton = ({ firebase }) => (
    // <button type="button" onClick={firebase.doSignOut}> SignOut </button>

    <Button variant="contained" color='primary' onClick={() => {
        // <Button type="button" onClick={() => {
        firebase.doSignOut()
        return(
            <Link to={ROUTES.LANDING}></Link>
        );
    }}> SignOut </Button>
);

export default withFirebase(SignOutButton);