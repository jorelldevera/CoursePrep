import React from 'react';
import './popup.css';
import LoginPage from '../Login';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import '../TopBar/topbar.css';

function LoginPopUp() {

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    //var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    //var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    // btn.onclick = function() {
    //     modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //     modal.style.display = "none";
    // }

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
            <Button className = "sign-in-btn" variant="contained" color="primary" id="myBtn" onClick={()=> {handleBtnClick()}}>Log In</Button>


            <div id="myModal" class="modal">

                <div class="modal-content">
                    <span class="close" onClick={()=>{handleSpanClick()}}>&times;</span>
                    <LoginPage/>
                </div>

            </div>
        </div>
    );

}

export default LoginPopUp;