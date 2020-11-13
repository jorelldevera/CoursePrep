import React, {useState, useEffect} from 'react';
import './popup.css';
import Button from '@material-ui/core/Button';
function CreateQuestionButton () {

    var modal;
    useEffect( () => {
        modal = document.getElementById("questionModal");
    }, [])
    if(modal)(
        console.log("modal not null")
    )
    if(!modal){
        console.log("modal null")
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function handleBtnClick() {
        modal.style.display = "block";
    }

    function handleSpanClick(){
        modal.style.display = "none";
    }

    return (

        <div>
            <Button  onClick={()=> {handleBtnClick()}}> Create Question </Button>
            <div id="questionModal" class="modal">

                <div class="modal-content">
                    <span class="close" onClick={()=>{handleSpanClick()}}>&times;</span>
                    <h1>Test</h1>
                    
                </div>

            </div>
        </div>
        
    );
}

export default CreateQuestionButton;