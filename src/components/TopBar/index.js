import React from 'react'
import { AuthUserContext } from '../Session'
import * as ROUTES from '../../constants/routes'
import Button from '@material-ui/core/Button';
import './topbar.css';
import LoginPopUp from '../PopUp';

function TopBar(){

    function handleClick(){

    }

    return(
        <div className = "top-bar-container">
            <div className = "top-bar-left">
            
            </div>
            <div className ="top-bar-right">
                <LoginPopUp/>
                {/* <Button className = "sign-in-btn" variant="contained" color="primary" onClick={()=> {handleClick()}}>Log In</Button> */}

            </div>
        </div>
    )
}

export default TopBar