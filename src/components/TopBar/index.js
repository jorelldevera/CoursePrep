import React from 'react'
import { AuthUserContext } from '../Session'
import * as ROUTES from '../../constants/routes'
import Button from '@material-ui/core/Button';
import './topbar.css';
import LoginButton from '../LoginButton';
import SignUpButton from '../SignUpButton';
import SignOutButton from '../SignOut';


const TopBar = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <TopBarAuth /> : <TopBarNonAuth/>
            }
        </AuthUserContext.Consumer>
     </div>
)

const TopBarAuth = () => {
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
                Test
                <SignOutButton/>
            </div>
        </div>
    );
}


const TopBarNonAuth = () => {

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