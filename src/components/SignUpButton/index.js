import React from 'react';
import './popup.css';
import SignUpPage from '../SignUp';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import '../TopBar/topbar.css';

function SignUpButton() {

    // Get the modal
    var modal = document.getElementById("signup-modal");

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function handleBtnClick(){
        modal.style.display = "block";
    }

    function handleSpanClick(){
        modal.style.display = "none";
    }

    return(
        <div>
            <Button className = "sign-up-btn" variant="contained" color='secondary' id="myBtn" onClick={()=> {handleBtnClick()}}>Sign Up</Button>

            <div id="signup-modal" class="modal">
                <div class="modal-content">
                    <span class="close" onClick={()=>{handleSpanClick()}}>&times;</span>
                    <SignUpPage/>
                </div>
            </div>
        </div>
    );

}

export default SignUpButton;