import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import '../../style/popup.css';
import Button from '@material-ui/core/Button';
import CreateQuestion from '../CreateQuestion';
import QuestionCreate from '../CreateQuestion';
import CreateTrueFalse from '../CreateTrueFalse';
import CreateFillInBlank from '../CreateFillInBlank';
import CreateMultipleChoice from '../CreateMultipleChoice';
import CreateMultipleSelect from '../CreateMultipleSelect';
import CreateWrittenAnswer from '../CreateWrittenAnswer';


function CreateQuestionButton () {

    const[typeSelected, setTypeSelected] = useState("");
    const[questionType, setQuestionType] = useState({});
    var modal;
    var modal_content;
    var middleFeed;
    var sideBar;
    var appContainer = document.getElementById("course-prep-content");
    useEffect( () => {
        sideBar = document.getElementById("sideBar");
        middleFeed = document.getElementById("middle-feed");
        modal = document.getElementById("questionModal");
        modal_content = document.getElementById("question-content");
    }, )
    if(modal)(
        console.log("modal not null")
    )
    if(!modal){
        console.log("modal null")
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            //modal.style.display = "none";
            modal.style.zIndex = -1;
            modal.style.opacity = 0;
            modal_content.style.transform = "scale(1.2)";
            appContainer.style.transform = "scale(1)";
            middleFeed.style.transform = "scale(1)";
            sideBar.style.transform = "scale(1)";
        }
    }

    function handleBtnClick() {
        //modal.style.display = "block";
        modal.style.zIndex = 1;
        modal.style.opacity = 1;
        modal_content.style.transform = "scale(1)";
        //appContainer.style.transform = "scale(.9)";
        modal.style.transform = "scale(1)";
        middleFeed.style.transform = "scale(.9)";
        sideBar.style.transform = "scale(.9)";
    }

    function handleSpanClick(){
        //modal.style.display = "none";
        modal.style.zIndex = -1;
        modal.style.opacity = 0;
        modal_content.style.transform = "scale(1.2)";
        appContainer.style.transform = "scale(1)";
        middleFeed.style.transform = "scale(1)";
        sideBar.style.transform = "scale(1)";
        setTypeSelected("")
    }
    function handleSubmit(){

    }
    /**
     * Question Types:
     *      fill_in_blank
     *      multiple_choice
     *      multiple_select
     *      truefalse
     *      written_answer
     */
    function getQuestionType(){
        var question;
        if(typeSelected == "fill_in_blank"){
            question = <CreateFillInBlank closeOnSubmit={handleSpanClick}/>;
        }
        else if(typeSelected == "multiple_choice"){
            question = <CreateMultipleChoice closeOnSubmit={handleSpanClick}/>;
        }
        else if(typeSelected == "multiple_select"){
            question = <CreateMultipleSelect closeOnSubmit={handleSpanClick}/>;
        }
        else if(typeSelected == "truefalse"){
            question = <CreateTrueFalse closeOnSubmit={handleSpanClick}/>;
        }
        else if(typeSelected == "written_answer"){
            question = <CreateWrittenAnswer closeOnSubmit={handleSpanClick}/>;
        }

        return(
            <React.Fragment>
                <button onClick ={()=> {setTypeSelected("")}}>back</button>
                {question}
            </React.Fragment>
        )
    }

    return (

        <div>
            <Button  onClick={()=> {handleBtnClick()}}> Create Question </Button>
            <div id="questionModal" class="modal">

                <div id="question-content" class="modal-content">
                    <span class="close" onClick={()=>{handleSpanClick()}}>&times;</span>

                        {typeSelected == "" ?
                            <CreateQuestion setTypeSelected={setTypeSelected}/> :
                            getQuestionType()                   
                        }
                </div>

            </div>
        </div>
        
    );
}

export default CreateQuestionButton;