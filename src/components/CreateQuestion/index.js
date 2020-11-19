import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';

function QuestionCreate({setTypeSelected}){


    /**
     * Question Types:
     *      fill_in_blank
     *      multiple_choice
     *      multiple_select
     *      truefalse
     *      written_answer
     */


    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [type, setType] = useState("");

    function handleSubmit(){
        console.log("type = " + type);
        setTypeSelected(type);
    }

    function handleRadio(e){
        setButtonDisabled(false);
        setType(e);
    }


    return(
        <div>
            <input type="radio" id="fill_in_blank" name = "question_type" value="fill_in_blank" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="fill_in_blank">Fill in the Blank</label><br/>

            <input type="radio" id="multiple_choice" name = "question_type" value="multiple_choice" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="multiple_choice">Multiple Choice</label><br/>

            <input type="radio" id="multiple_select" name = "question_type" value="multiple_select" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="multiple_select">Multiple Select</label><br/>

            <input type="radio" id="truefalse" name = "question_type" value="truefalse" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="truefalse">True or False</label><br/>

            <input type="radio" id="written_answer" name = "question_type" value="written_answer" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="written_answer">Written Answer</label><br/>

            <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
        </div>
    );
}

export default QuestionCreate;