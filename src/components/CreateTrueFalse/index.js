import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

function CreateTrueFalse({closeOnSubmit}) {

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
    const [hint1, setHint1] = useState("")
    const [hint2, setHint2] = useState("")
    const [hint3, setHint3] = useState("")
    const [hint4, setHint4] = useState("")
    const [hint5, setHint5] = useState("")

    var questionMetaData = {
        avg_score: 0,
        course_ID: 1,
        creation_time: 0,
        department_ID: 1,
        tags: [],
        text: "",
        times_answered: 0,
        type: 3,
    }

    var questionData = {
        author_ID: 1,
        correct_answer: "",
        hints: [],
        text: "",
    }

    function handleRadio(e){
        setButtonDisabled(false);
        setCorrect(e);
    }

    function handleSubmit(){
        console.log("testing pushing...")
        console.log(text);
        if (hint1 != "") {questionData.hints.push(hint1)}
        if (hint2 != "") {questionData.hints.push(hint2)}
        if (hint3 != "") {questionData.hints.push(hint3)}
        if (hint4 != "") {questionData.hints.push(hint4)}
        if (hint5 != "") {questionData.hints.push(hint5)}
        questionData.correct_answer = correct;
        questionData.text = text;
        questionData.author_ID = firebase.auth().W;
        questionMetaData.text = text;
        questionMetaData.creation_time = Date.now();
        closeOnSubmit();

        
        var key = firebase.database().ref('question_metadata/').push().key;
        // console.log(key);
        var updates = {};
        updates["question_metadata/" + key] = questionMetaData;
        updates["truefalse/" + key] = questionData;
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

            <h2>Enter hints (optional):</h2>

            <label for="hint1">1: </label>
            <input type="text" id="hint1" placeholder="" onChange={(e)=>{setHint1(e.target.value)}}/><br/>

            <label for="hint2">2: </label>
            <input type="text" id="hint2" placeholder="" onChange={(e)=>{setHint2(e.target.value)}}/><br/>

            <label for="hint3">3: </label>
            <input type="text" id="hint3" placeholder="" onChange={(e)=>{setHint3(e.target.value)}}/><br/>

            <label for="hint4">4: </label>
            <input type="text" id="hint4" placeholder="" onChange={(e)=>{setHint4(e.target.value)}}/><br/>

            <label for="hint5">5: </label>
            <input type="text" id="hint5" placeholder="" onChange={(e)=>{setHint5(e.target.value)}}/><br/>

            <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
        </React.Fragment>

    )
}

export default CreateTrueFalse;