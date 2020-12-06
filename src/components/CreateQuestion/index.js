import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import './CreateQuestion.css'

function QuestionCreate({setTypeSelected}){


    /**
     * Question Types:
     *      fill_in_blank
     *      multiple_choice
     *      multiple_select
     *      truefalse
     *      written_answer
     */


    const [type, setType] = useState("");
    


    function handleButton(e){
        setTypeSelected(e)
    }


    return(
        <div className="vert-buttons">
            <Button  onClick={()=> {handleButton("fill_in_blank")}}> Fill in the Blank </Button>
            <Button  onClick={()=> {handleButton("multiple_choice")}}> Multiple Choice </Button>
            <Button  onClick={()=> {handleButton("multiple_select")}}> Multiple Select </Button>
            <Button  onClick={()=> {handleButton("truefalse")}}> True or False </Button>
            <Button  onClick={()=> {handleButton("written_answer")}}> Written Answer </Button>
        </div>
    );
}

export default QuestionCreate;