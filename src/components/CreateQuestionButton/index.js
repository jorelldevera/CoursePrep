import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './popup.css';
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
    useEffect( () => {
        modal = document.getElementById("questionModal");
    },)
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
            question = <CreateFillInBlank/>;
        }
        else if(typeSelected == "multiple_choice"){
            question = <CreateMultipleChoice/>;
        }
        else if(typeSelected == "multiple_select"){
            question = <CreateMultipleSelect/>;
        }
        else if(typeSelected == "truefalse"){
            question = <CreateTrueFalse/>;
        }
        else if(typeSelected == "written_answer"){
            question = <CreateWrittenAnswer/>;
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

                <div class="modal-content">
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