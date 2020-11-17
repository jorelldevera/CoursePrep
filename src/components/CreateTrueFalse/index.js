import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

function CreateTrueFalse() {

    /**
     * 
     * should metadata have user id field?
     * what is type?
     * 
     * Still Need:
     *      tags
     *      hints
     */


    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [correct, setCorrect] = useState("");
    const [text, setText] = useState("");

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

    var trueFalseData = {
        author_ID: 1,
        correct_answer: "",
        hints: null,
        text: "",
    }

    function handleRadio(e){
        setButtonDisabled(false);
        setCorrect(e);
    }

    function handleSubmit(){
        console.log("testing pushing...")
        console.log(text);
        trueFalseData.correct_answer = correct;
        trueFalseData.text = text;
        trueFalseData.author_ID = firebase.auth().W;
        questionMetaData.text = text;
        questionMetaData.creation_time = Date.now();

        
        var key = firebase.database().ref('question_metadata/').push().key;
        // console.log(key);
        var updates = {};
        updates["question_metadata/" + key] = questionMetaData;
        updates["truefalse/" + key] = trueFalseData;
        firebase.database().ref().update(updates);
    }

    return(
        <React.Fragment>
            <h1>True False</h1>
            <h2>Enter Question:</h2>
            <input type="text" placeholder="Question Text" onChange={(e)=>{setText(e.target.value)}} />
            <br></br>
            <h2>Select Correct Answer:</h2>

            <input type="radio" id="true" name = "answer" value="true" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="true">True</label><br/>

            <input type="radio" id="false" name = "answer" value="false" onChange={(e)=>{handleRadio(e.target.value)}}/>
            <label for="false">False</label><br/>

            <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
        </React.Fragment>

    )
}

export default CreateTrueFalse;