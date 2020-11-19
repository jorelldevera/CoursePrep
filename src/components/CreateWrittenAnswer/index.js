import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

function CreateWrittenAnswer() {

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
        type: 3,
    }

    var writtenAnswerData = {
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
            writtenAnswerData.author_answer = authAnswer;
            writtenAnswerData.text = text;
            writtenAnswerData.author_ID = firebase.auth().W;
            questionMetaData.text = text;
            questionMetaData.creation_time = Date.now();
            
            var key = firebase.database().ref('question_metadata/').push().key;
            // console.log(key);
            var updates = {};
            updates["question_metadata/" + key] = questionMetaData;
            updates["written_answer/" + key] = writtenAnswerData;
            firebase.database().ref().update(updates);
        }
    }

    return(
        <React.Fragment>
            <h1>Written Answer</h1>
            <h2>Enter Question:</h2>
            <input type="text" placeholder="Question Text" onChange={(e)=>{setText(e.target.value)}} />
            <br></br>
            <h2>Enter Author Answer:</h2>

            <input type="text" placeholder="Your answer..." onChange={(e)=>{setAuthAnswer(e.target.value)}}/>

            <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
        </React.Fragment>

    )
}

export default CreateWrittenAnswer;