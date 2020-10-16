import React from 'react'
import { AuthUserContext } from '../Session'
import * as ROUTES from '../../constants/routes'
import Button from '@material-ui/core/Button';
import './topbar.css';
import LoginButton from '../LoginButton';
import SignUpButton from '../SignUpButton';

function TopBar(){

    function handleClick(){

    }

    return(
        <div className = "top-bar-container">
            <div className = "top-bar-left">
                <h1>
                    CoursePrep
                </h1>
            </div>
            <div className='top-bar-center'>

            </div>
            <div className ="top-bar-right">
                <LoginButton/>
                <SignUpButton/>
            </div>
        </div>
    )
}

export default TopBar