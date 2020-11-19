import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

function CreateFillInBlank({closeOnSubmit}) {

    /**
     * 
     * should metadata have user id field?
     * what is type?
     * 
     * Still Need:
     *      tags
     *      hints
     */


    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [text, setText] = useState("");
    const [authAnswer, setAuthAnswer] = useState("");

    var questionMetaData = {
        avg_score: 0,
        course_ID: 1,
        creation_time: 0,
        department_ID: 1,
        tags: null,
        text: "",
        times_answered: 0,
        type: 2,
    }

    var fillInBlankData = {
        author_ID: 1,
        author_answer: "",
        hints: null,
        text: "",
    }

    function handleSubmit(){
        if (text == "" || authAnswer == "") {
            console.log("one of the fields is empty.")
        }
        else {
            console.log("testing pushing...")
            console.log(text);
            fillInBlankData.author_answer = authAnswer;
            fillInBlankData.text = text;
            fillInBlankData.author_ID = firebase.auth().W;
            questionMetaData.text = text;
            questionMetaData.creation_time = Date.now();
            
            var key = firebase.database().ref('question_metadata/').push().key;
            // console.log(key);
            var updates = {};
            updates["question_metadata/" + key] = questionMetaData;
            updates["fill_in_blank/" + key] = fillInBlankData;
            firebase.database().ref().update(updates);
            closeOnSubmit();
        }
    }

    return(
        <React.Fragment>
            <h1>Fill in the Blank</h1>
            <h2>Enter Question:</h2>
            <input type="text" placeholder="Question Text" onChange={(e)=>{setText(e.target.value)}} />
            <br></br>
            <h2>Enter Author Answer:</h2>

            <input type="text" placeholder="Your answer..." onChange={(e)=>{setAuthAnswer(e.target.value)}}/>

            <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
        </React.Fragment>

    )
}

export default CreateFillInBlank;