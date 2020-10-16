import React from 'react';
import './popup.css';
import LoginPage from '../Login';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import '../TopBar/topbar.css';

function LoginButton() {

    // Get the modal
    var modal = document.getElementById("myModal");

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
            <Button className = "log-in-btn" variant="contained" color="primary" id="myBtn" onClick={()=> {handleBtnClick()}}>Log In</Button>


            <div id="myModal" class="modal">

                <div class="modal-content">
                    <span class="close" onClick={()=>{handleSpanClick()}}>&times;</span>
                    <LoginPage/>
                    
                </div>

            </div>
        </div>
    );

}

export default LoginButton;