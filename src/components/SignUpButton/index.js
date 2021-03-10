import React from 'react';
import '../../style/popup.css';
import SignUpPage from '../SignUp';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import '../TopBar/topbar.css';

function SignUpButton() {

    // Get the modal
    var modal = document.getElementById("signup-modal");
    var modal_content = document.getElementById("signup-content");
    var appContainer = document.getElementById("course-prep-content");

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.zIndex = -1;
            modal.style.opacity = 0;
            modal_content.style.transform = "scale(1.2)";
            //appContainer.style.transform = "scale(1)";
        }
    }

    function handleBtnClick(){
        modal.style.zIndex = 1;
        modal.style.opacity = 1;
        modal_content.style.transform = "scale(1)";
        //appContainer.style.transform = "scale(.9)";
    }

    function handleSpanClick(){
        modal.style.zIndex = -1;
        modal.style.opacity = 0;
        modal_content.style.transform = "scale(1.2)";
        //appContainer.style.transform = "scale(1)";
    }

    return(
        <div>
            <Button className = "sign-up-btn" variant="contained" color='secondary' id="myBtn" onClick={()=> {handleBtnClick()}}>Sign Up</Button>

            <div id="signup-modal" class="modal">
                <div id="signup-content" class="modal-content">
                    <span class="close" onClick={()=>{handleSpanClick()}}>&times;</span>
                    <SignUpPage/>
                </div>
            </div>
        </div>
    );

}

export default SignUpButton;