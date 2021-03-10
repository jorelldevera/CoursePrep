import React, {useState, useEffect} from 'react';
import '../../style/popup.css';
import LoginPage from '../Login';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import '../TopBar/topbar.css';

function LoginButton() {



    // Get the modal
    var modal = document.getElementById("myModal");
    var modal_content = document.getElementById("myModalContent");
    var appContainer = document.getElementById("course-prep-content");

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        console.log("click");
        if (event.target == modal) {
            // modal.style.display = "none";
            modal.style.zIndex = -1;
            modal.style.opacity = 0;
            modal_content.style.transform = "scale(1.2)";
            // appContainer.style.transform = "scale(1)";
        }
    }

    function handleBtnClick(){
        //modal.style.display = "block";
        modal.style.zIndex = 1;
        modal.style.opacity = 1;
        modal_content.style.transform = "scale(1)";
        // appContainer.style.transform = "scale(.9)";
    }

    function handleSpanClick(){
        //modal.style.display = "none";
        modal.style.zIndex = -1;
        modal.style.opacity = 0;
        modal_content.style.transform = "scale(1.2)";
        // appContainer.style.transform = "scale(1)";
    }

    return(
        <div>
            <Button className = "log-in-btn" variant="contained" color="primary" id="myBtn" onClick={()=> {handleBtnClick()}}>Log In</Button>

            <div id="myModal" className="modal">
                <div id="myModalContent" className="modal-content-login" >
                    <span class="close" onClick={()=>{handleSpanClick()}}>&times;</span>
                    <LoginPage/>   
                </div>
            </div>
        </div>
    );

}

export default LoginButton;