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
        type: 2,
    }

    var questionData = {
        author_ID: 1,
        author_answer: "",
        hints: [],
        text: "",
    }



    function handleSubmit(){
        if (text == "" || authAnswer == "") {
            console.log("one of the fields is empty.")
        }
        else {
            console.log("testing pushing...")
            console.log(text);
            questionData.author_answer = authAnswer;
            questionData.text = text;
            questionData.author_ID = firebase.auth().W;
            if (hint1 != "") {questionData.hints.push(hint1)}
            if (hint2 != "") {questionData.hints.push(hint2)}
            if (hint3 != "") {questionData.hints.push(hint3)}
            if (hint4 != "") {questionData.hints.push(hint4)}
            if (hint5 != "") {questionData.hints.push(hint5)}
            questionMetaData.text = text;
            questionMetaData.creation_time = Date.now();
            
            var key = firebase.database().ref('question_metadata/').push().key;
            // console.log(key);
            var updates = {};
            updates["question_metadata/" + key] = questionMetaData;
            updates["fill_in_blank/" + key] = questionData;
            firebase.database().ref().update(updates);
            closeOnSubmit();
        }
    }

    return(
        <React.Fragment>
            <h1>Fill in the Blank</h1>
            <h2>Enter Question:</h2>
            <div className="questiontext">
                <input type="text" placeholder="Question Text" onChange={(e)=>{setText(e.target.value)}} />
            </div>
            <br></br>
            <h2>Enter Author Answer:</h2>

            <div className="answertext">
                <input type="text" placeholder="Your answer..." onChange={(e)=>{setAuthAnswer(e.target.value)}}/>
            </div>

            <h2>Enter hints (optional):</h2>

            <div className="hinttext">
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
            </div>

            <Button id = "submit button" variant="contained" disabled = {buttonDisabled} onClick={()=> {handleSubmit()}}>Submit</Button>
        </React.Fragment>

    )
}

export default CreateFillInBlank;